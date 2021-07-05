import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentChat} from "../store/actions/currentChat_A";

export default function Contact(props) {
    const dispatch = useDispatch()
    const current = useSelector((state) => state.currentChat)

    const handleClick = () => {
        dispatch(setCurrentChat(props.id));
    };

    return <div style={{background: current === props.id ? "rgba(255, 255, 255, 0.08)" : "transparent"}}
                className="contact center-center" onClick={handleClick}>
        < div className="avatar">
            <p>{props.name[0].toUpperCase()}</p>
        </div>
        <div className="chatInfo">
            <h2>{props.name}</h2>
            <p>{props.message}</p>
        </div>
    </div>
}