import Contact from "./contact";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {asyncSetChats} from "../../store/actions/chats_A";
import "./styleList.css";
import AddChat from "./addChat";

export default function ChatsList() {
    const chats = useSelector((state) => state.chats);;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncSetChats());
    }, []);

    return <div className="chats">
        {chats.map((chat, key) => {
            return <Contact key={key} id={chat.id_chat} img={chat.img} name={chat.name} number={chat.numberOfUnread} message={chat.message} sender={chat.sender_name}/>
        })}
        <AddChat/>
    </div>;
}