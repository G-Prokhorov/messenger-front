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
                setMessages(state.messages.get(state.currentChat));
                if (chatInfo.numberOfUnread === 0) {
                    return;
                }

                let scrollDiv = document.querySelector("#messagesScroll");
                if (scrollDiv.offsetHeight === scrollDiv.scrollHeight) {
                    dispatch(updateNumberUnread(state.currentChat, chatInfo.numberOfUnread))
                    //send that all read
                }

                let messages = document.querySelector("#messages");
                let child = Array.from(messages.childNodes);
                let heightAll = messages.offsetHeight;
                child = child.slice(-1 * chatInfo.numberOfUnread).map(c => {
                    return heightAll - c.offsetTop;
                });
                setPosArr(child);
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
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                    setRead(0);
                } catch (e) {
                    console.error("Could not mark message");
                }
            }

        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [countRead]);

    useEffect(async () => {
        if (state.messages.has(state.currentChat)) {
            await setMessages(state.messages.get(state.currentChat));
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
                    if (state.user.username === message.user.username) {
                        float = "right";
                    }
                    return <Message key={key} float={float} text={message.message}/>
                })}
                {/*<div>*/}
                {/*    <img className="message messageLeft messageImg" src={"data:image/jpeg;base64,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"} alt="image" />*/}
                {/*</div>*/}
            </div>
            <p id="infoMessage" style={{display: messages.length === 0 ? "block" : "none"}}>
                {state.currentChat ? "Write a first message" : "Select a chat to start messaging"}
            </p>
        </div>
        <InputChat setMesArr={setMesArr}/>
    </div>

    function scrollChat() {
        if (scroll) {
            setScroll(false);
            let div = document.querySelector("#messagesScroll");
            let chatInfo = state.chats.find(chat => chat.id_chat === state.currentChat);
            if (chatInfo && div.scrollHeight !== div.offsetHeight) {
                if (chatInfo.numberOfUnread <= 1) {
                    div.scrollTo(0, div.scrollHeight);
                    return;
                }

                let num = chatInfo.numberOfUnread - 1;
                let messagesChild = document.querySelector("#messages").childNodes;
                div.scrollTo(0, (messagesChild[messagesChild.length - num].offsetTop - div.offsetHeight));
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
}