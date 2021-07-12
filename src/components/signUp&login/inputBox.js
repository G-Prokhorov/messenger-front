import React from "react";

export default function InputBox(props) {
    return <div className="inputBox">
        <label>{props.label}</label>
        <input id={props.id} onChange={props.change} onBlur={props.blur} autoComplete="off"
               type={props.type} value={props.val}/>
        {props.id === "username" ? <span id="a">@</span> : <></>}
        <p className="err" style={{
            opacity: props.errShow ? 1 : 0,
            display: props.errShow ? "block" : "none"
        }}>{props.errText}</p>
    </div>
}