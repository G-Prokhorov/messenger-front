import React from "react";
import "./styleMessage.css";

export default function Message(props) {
    return <div>
        {props.img ?
            <img height={400} className={props.float === "left" ? "messageLeft message messageImg" : "messageRight message messageImg"}
                src={props.text} alt="image"/>
            :
            <p className={props.float === "left" ? "messageLeft message" : "messageRight message"}>
                {props.text}
            </p>
        }

    </div>
}