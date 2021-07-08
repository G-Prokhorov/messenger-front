import React, {useEffect, useState} from "react";
import Message from "../message/message";
import {useDispatch, useSelector} from "react-redux";
import {addPrevMes, setMessage} from "../../store/actions/message_A";
import getMessage from "./getMessage";
import connect from "../../ws";
import InputChat from "./inputChat";
import "./styleChat.css"
import {addFullChat} from "../../store/actions/fullChats_A";

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [mesArr, setMesArr] = useState([]);
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
                    chatId: state.currentChat,
                    message: message,
                }));
                copy.shift();
            });
            setMesArr(copy);
            send = false;
        }
    }, [mesArr, socket]);

    useEffect(async () => {
        if (state.currentChat) {
            if (!state.messages.has(state.currentChat) && !state.fullChats.includes(state.currentChat)) {
                try {
                    let message = await getMessage(state.currentChat, '0');
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

                    setMessages([])
                    return;
                }
            }

            if (state.messages.has(state.currentChat)) {
                setMessages(state.messages.get(state.currentChat));
            } else {
                setMessages([]);
            }

        }
    }, [state.currentChat]);

    useEffect(() => {
        if (state.messages.has(state.currentChat)) {
            setMessages(state.messages.get(state.currentChat));
        }
    }, [state.alertMessage]);

    useEffect(scrollChat, [messages]);

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
                <p id="infoMessage" style={{display: messages.length === 0 ? "block" : "none"}}>
                    {state.currentChat ? "Write a first message" : "Select a chat to start messaging"}
                </p>
            </div>
        </div>
        <InputChat setMesArr={setMesArr}/>
    </div>

    function scrollChat() {
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

    async function checkScroll() {
        let div = document.querySelector("#messagesScroll");
        if (div.scrollTop === 0) {
            if (!state.fullChats.includes(state.currentChat)) {
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
            }

        }
    }
}