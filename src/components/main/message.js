import React from "react";

export default function Message(props) {
    return <div>
        <p className={props.float === "left" ? "messageLeft message" : "messageRight message" }>
            {props.text}
        </p>
    </div>
}