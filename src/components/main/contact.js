import React from "react";

export default function Contact(props) {
    return <div className="contact center-center">
        <div className="avatar">
            <p>{props.name[0].toUpperCase()}</p>
        </div>
        <div className="chatInfo">
            <h2>{props.name}</h2>
            <p>{props.message}</p>
        </div>
    </div>
}