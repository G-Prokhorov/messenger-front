import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentChat} from "../../store/actions/currentChat_A";
import "./styleList.css";

export default function Contact(props) {
    const dispatch = useDispatch()
    const current = useSelector((state) => state.currentChat)

    const handleClick = () => {
        dispatch(setCurrentChat(props.id));
    };

    return <div style={{background: current === props.id ? "rgba(255, 255, 255, 0.08)" : "transparent"}}
                className="contact center-center" onClick={handleClick}>
        < div className="gradient avatar">
            <p>{props.name[0].toUpperCase()}</p>
        </div>
        <div className="chatInfo">
            <h2 className="center-center">{props.name} <span className="unread" style={{display: props.number === 0 ? "none" : "inline-block"}}>{props.number}</span> </h2>
            <p><span className="senderName">{props.sender ? props.sender+":" : "No messages"}</span> {props.img ? "*Photo*" : props.message}</p>
        </div>
    </div>
}