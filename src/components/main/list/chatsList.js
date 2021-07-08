import Contact from "./contact";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {asyncSetChats} from "../../store/actions/chats_A";
import "./styleList.css";
import AddChat from "./addChat";

export default function ChatsList() {
    const chats = useSelector((state) => state.chats);
    let [sort, setSort] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncSetChats());
    }, []);

    useEffect(() => {
        let tmp = chats.sort((a, b) => {
            let aDate = new Date(a.lastupdate);
            let bDate = new Date(b.lastupdate);
            if (aDate < bDate) {
                return 1;
            }

            if (aDate > bDate) {
                return -1;
            }

            return 0;
        });

        console.log(chats);
        console.log(tmp)

        setSort(tmp);
    }, [chats]);

    return <div className="chats">
        {sort.map((chat, key) => {
            return <Contact key={key} id={chat.id_chat} name={chat.name} number={chat.numberOfUnread} message={chat.message} sender={chat.sender_name}/>
        })}
        <AddChat/>
    </div>;
}