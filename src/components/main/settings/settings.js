import React, {useState} from "react";

import "./styleSettings.css";
import Plus from "../plus";
import {useDispatch, useSelector} from "react-redux";
import {op_cl_action} from "../../store/actions/setting_A";
import {confirm, confirmFunc, password} from "../../signUp&login/passwordValidation";

export default function Settings() {
    const show = useSelector(state => state.settings);
    const dispatch = useDispatch();
    const [info, setInfo] = useState({
        name: "",
        previous: "",
        password: "",
        confirm: "",
    });

    const [err, setErr] = useState({
        err2: {
            text: "",
            show: false,
        },
        err3: {
            text: "",
            show: false,
        },
    });

    const handleChange = (event) => {
        setInfo((prev) => {
            return {
                ...prev,
                [event.target.id]: event.target.value,
            }
        });
    }

    const validation = (event) => {
        console.log(event.target.id)
        switch (event.target.id) {
            case "password":
                password(info, setErr);
                break;
            case "confirm":
                confirmFunc(info, setErr);
                break;
        }
    }

    return <div id="settings" className="center-center" style={{display: show ? "flex" : "flex"}}>
        <div>
            <div id="headerSetting" className="center-between">
                <h2>Settings</h2>
                <button onClick={() => dispatch(op_cl_action(false))}>
                    <Plus clicked={true}/>
                </button>
            </div>
            <div className="settingsBlock" id="changeNameDiv">
                <label htmlFor="name">Change name</label>
                <div className="center-left">
                    <input onChange={handleChange} value={info.name} placeholder="Write a new name..." type="text"
                           id="name"/>
                    <button className="blueBth" disabled={!info.name}>Change</button>
                </div>
            </div>
            <div className="settingsBlock" id="passwordChange">
                <label htmlFor="name">Change password</label>
                <div className="center-between">
                    <input onChange={handleChange} value={info.previous} placeholder="Write a previous password..."
                            type="password" id="previous"/>
                    <input onChange={handleChange} value={info.confirm}
                           onBlur={validation} placeholder="Confirm a new password..." type="password" id="confirm"/>
                    <input onChange={handleChange} value={info.password}
                           onBlur={validation} placeholder="Write a new password..." type="password" id="password"/>
                    <button className="blueBth" disabled={(!(info.previous && err.err2.text === "ok" && err.err3.text === "ok"))}>Change</button>
                </div>
                <p className="err" style={err.err2.text !== "ok" || err.err3.text !== "ok" ? {
                    opacity: 1,
                    display: "block",
                } : {
                    opacity: 0,
                    display: "none",
                }}>{err.err2.text === "ok" ? err.err3.text === "ok" ? "" : err.err3.text : err.err2.text }</p>
            </div>
            <div className="settingsBlock" id="restorePassword">
                <label htmlFor="name">Restore password</label>
                <div className="center-center">
                    <button className="blueBth" disabled={!info.name}>Change</button>
                </div>
            </div>
        </div>

    </div>
}