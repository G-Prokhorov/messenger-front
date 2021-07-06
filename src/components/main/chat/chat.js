import React, {useEffect, useRef, useState} from "react";
import Message from "../message/message";
import {useDispatch, useSelector} from "react-redux";
import {setMessage} from "../../store/actions/message_A";
import getMessage from "./getMessage";
import connect from "../../ws";
import InputChat from "./inputChat";
import "./styleChat.css"
import store from "../../store/store";
import {newMessageAlert} from "../../store/actions/alert_A";

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
            if (!state.messages.has(state.currentChat)) {
                let message = await getMessage(state.currentChat);
                dispatch(setMessage(state.currentChat, message.data.reverse()));
            }
            setMessages(state.messages.get(state.currentChat));
        }
    }, [state.currentChat]);

    useEffect(() => {
        if (state.messages.has(state.currentChat)) {
            setMessages(state.messages.get(state.currentChat));
        }
    }, [state.alert])

    return <div id="chat">
        <div id="messagesScroll">
            <div id="messages">
                {messages.map((message, key) => {
                    let float = "left";
                    if (state.user.username === message.user.username) {
                        float = "right";
                    }
                    return <Message key={key} float={float} text={message.message}/>
                })}
                <AlwaysScrollToBottom/>
            </div>
        </div>
        <InputChat setMesArr={setMesArr}/>
    </div>

    function AlwaysScrollToBottom() {
        const elementRef = useRef();
        useEffect(() => {
            document.querySelector("#messagesScroll").style.scrollBehavior = "unset";
            elementRef.current.scrollIntoView();
        }, []);
        return <div ref={elementRef}/>;
    };
}