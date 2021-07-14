import React, {useEffect, useState} from "react";
import Message from "../message/message";
import {useDispatch, useSelector} from "react-redux";
import {addPrevMes, setMessage} from "../../store/actions/message_A";
import getMessage from "./getMessage";
import connect from "../../ws";
import InputChat from "./inputChat";
import "./styleChat.css"
import {addFullChat} from "../../store/actions/fullChats_A";
import {updateNumberUnread} from "../../store/actions/chats_A";
import axios from "axios";

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [mesArr, setMesArr] = useState([]);
    const [scroll, setScroll] = useState(false);
    const [offTop, setOffTop] = useState(false);
    const [positionArr, setPosArr] = useState([]);
    const [countRead, setRead] = useState(0);
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        connect(setSocket);
        return () => {
            socket.close();
            setSocket(null);
        };
    }, []);

    let send = false;
    useEffect(() => {
        if (socket !== null && !send) {
            send = true;
            let copy = mesArr;
            mesArr.forEach(async (message) => {
                await socket.send(JSON.stringify({
                    action: "send message",
                    data: {
                        chatId: state.currentChat,
                        message: message,
                    }
                }));
                copy.shift();
            });
            setMesArr(copy);
            send = false;
        }
    }, [mesArr, socket]);

    useEffect(async () => {
        if (state.currentChat) {
            setPosArr([]);
            let chatInfo = state.chats.find(chat => chat.id_chat === state.currentChat);
            if (!state.messages.has(state.currentChat) && !state.fullChats.includes(state.currentChat)) {
                try {
                    let message = await getMessage(state.currentChat, '0', chatInfo.numberOfUnread + 25);
                    if (message.data.length !== 0) {
                        dispatch(setMessage(state.currentChat, message.data.reverse()));
                    }

                    if (message.data.length < 25) {
                        dispatch(addFullChat(state.currentChat));
                    }
                } catch (e) {
                    if (e.response.data === "Message isn't exist") {
                        dispatch(addFullChat(state.currentChat));
                    }

                    setMessages([]);
                    return;
                }
            }

            if (state.messages.has(state.currentChat)) {
                setScroll(true);
                let num = chatInfo.numberOfUnread;
                if (num !== 0) {
                    let pos = state.messages.get(state.currentChat).length - num;
                    let tmp = JSON.parse((JSON.stringify(state.messages.get(state.currentChat))));
                    tmp.splice(pos, 0, {type: "unreadLabel"});
                    setMessages(tmp);
                } else {
                    setMessages(state.messages.get(state.currentChat));
                }
                await addMessagePosition(chatInfo);
            } else {
                setMessages([]);
            }

        }
    }, [state.currentChat]);

    useEffect(() => {
        const interval = setInterval(async () => {
            if (countRead !== 0) {
                try {
                    await axios.patch("http://localhost:5050/markRead", {
                        chatId: state.currentChat,
                        value: (-1) * countRead,
                    }, {
                        withCredentials: true,
                    });
                } catch (e) {
                    console.error("Could not mark message");
                }
                setRead(0);
            }

        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [countRead]);

    useEffect(async () => {
        if (state.messages.has(state.currentChat)) {
            let chatInfo = state.chats.find(chat => chat.id_chat === state.currentChat);
            let tmp = JSON.parse(JSON.stringify(state.messages.get(state.currentChat)));
            let div = document.querySelector("#messagesScroll");
            let bottom = div.scrollHeight - 10 <= div.scrollTop + div.offsetHeight;

            if (tmp[tmp.length - 1].user.username !== state.user.username && !bottom) {
                let num = chatInfo.numberOfUnread;
                let pos = state.messages.get(state.currentChat).length - num;
                tmp.splice(pos, 0, {type: "unreadLabel"});
            }

            setMessages(tmp);
            if (tmp[tmp.length - 1].user.username === state.user.username || bottom) {
                setScroll(true);
                await scrollChat();
            }

            if (tmp[tmp.length - 1].user.username !== state.user.username) {
                await addMessagePosition(chatInfo);
                await checkScroll();
            }
        }
    }, [state.alertMessage]);

    useEffect(scrollChat, [messages]);

    useEffect(async () => {
        if (offTop) {
            let amount = messages.length;
            try {
                let message = await getMessage(state.currentChat, messages.length);
                if (message.data.length !== 0) {
                    let reverse = message.data.reverse()
                    dispatch(addPrevMes(state.currentChat, reverse));
                    setMessages(state.messages.get(state.currentChat));
                }


                if (message.data.length < 25) {
                    dispatch(addFullChat(state.currentChat));
                }
            } catch (e) {
                if (e.response.data === "Message isn't exist") {
                    dispatch(addFullChat(state.currentChat));
                }
            }
            let child = document.querySelector("#messages").childNodes;
            child[child.length - amount].scrollIntoView();
            setOffTop(false);
        }
    }, [offTop]);

    return <div id="chat">
        <div id="messagesScroll" onScroll={checkScroll}>
            <div id="messages">
                {messages.map((message, key) => {
                    let float = "left";

                    if (message.type === "unreadLabel") {
                        return <div id="unreadStart" key={key} className="unreadLabel center-center">Unreadable message</div>
                    }

                    if (state.user.username === message.user.username) {
                        float = "right";
                    }
                    return <Message key={key} img={message.img} float={float} text={message.message}/>
                })}
            </div>
            <p id="infoMessage" style={{display: messages.length === 0 ? "block" : "none"}}>
                {state.currentChat ? "Write a first message" : "Select a chat to start messaging"}
            </p>
        </div>
        <InputChat ws={socket} setMesArr={setMesArr}/>
    </div>

    async function scrollChat() {
        if (scroll) {
            setScroll(false);
            let div = document.querySelector("#messagesScroll");
            let chatInfo = state.chats.find(chat => chat.id_chat === state.currentChat);
            if (chatInfo && div.scrollHeight !== div.offsetHeight) {
                if (chatInfo.numberOfUnread <= 1) {
                    div.scrollTo(0, div.scrollHeight);
                    return;
                }

                let unreadStart = document.querySelector("#unreadStart");
                if (unreadStart) {
                    unreadStart.scrollIntoView();
                }
            } else if (chatInfo.numberOfUnread !== 0 && div.offsetHeight >=  div.scrollHeight) {
                dispatch(updateNumberUnread(state.currentChat, chatInfo.numberOfUnread))
                await axios.patch("http://localhost:5050/markRead", {
                    chatId: state.currentChat,
                    value: (-1) * chatInfo.numberOfUnread,
                }, {
                    withCredentials: true,
                });
                setRead(0);
            }
        }

    }

    async function checkScroll() {
        let div = document.querySelector("#messagesScroll");
        if (div.scrollTop === 0 && !offTop) {
            if (!state.fullChats.includes(state.currentChat)) {
                setOffTop(true);
            }
        } else if (positionArr.length !== 0) {
            let tmp = div.scrollHeight - div.scrollTop - div.offsetHeight
            for (let i = positionArr.length - 1; i >= 0; i--) {
                if (tmp < positionArr[i]) {
                    setRead(countRead + i + 1);
                    setPosArr(positionArr.slice(i + 1));
                    dispatch(updateNumberUnread(state.currentChat, i + 1));
                    break;
                }
            }
        }
    }

    async function addMessagePosition(chatInfo) {
        if (chatInfo.numberOfUnread === 0) {
            return;
        }
        let M = document.querySelector("#messages");
        let child = Array.from(M.childNodes);

        let heightAll = M.offsetHeight;
        child = child.slice(-1 * chatInfo.numberOfUnread).map(c => {
            return heightAll - c.offsetTop - (c.offsetHeight / 2);
        });
        setPosArr(child);
    }
}

