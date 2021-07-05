import Contact from "./contact";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {asyncSetChats} from "../store/actions/chats_A";


export default function ChatsList() {
    const chats = useSelector((state) => state.chats)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncSetChats());
    }, []);

    return <div className="chats">
        {chats.map((chat, key) => {
            return <Contact key={key} id={chat.id_chat} name={chat.name} number={chat.numberOfUnread} message={"last message last message last message last message"}/>
        })}
    </div>;
}