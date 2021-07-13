import React, {useEffect, useState} from "react";

import "./styleSettings.css";
import Plus from "../plus";
import {useDispatch, useSelector} from "react-redux";
import {op_cl_action} from "../../store/actions/setting_A";
import {changeErr, confirmFunc, password} from "../../signUp&login/passwordValidation";
import superheroes from "superheroes";
import nameSubmit from "../../setName/nameSubmit";
import {setName} from "../../store/actions/user_A";
import {changeSender} from "../../store/actions/chats_A";
import axios from "axios";
import serverUrl from "../../serverUrl";

export default function Settings() {
    const show = useSelector(state => state.settings);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [send, setSend] = useState(false);
    const [next, setNext] = useState(false);
    const [info, setInfo] = useState({
        name: "",
        previous: "",
        password: "",
        confirm: "",
        restorePassword: "",
        restoreConfirm: "",
        key: "",
    });

    const [err, setErr] = useState({
        err1: {
            text: "",
            show: false,
        },
        err2: {
            text: "",
            show: false,
        },
        err3: {
            text: "",
            show: false,
        },
    });

    useEffect(() => {
        if (send) {
            let timeout = setTimeout(() => {
                setSend(false);
            }, 120000);
            return () => clearTimeout(timeout);
        }
    }, [send]);

    const generate = () => {
        setInfo((prev) => {
            return {
                ...prev,
                name: superheroes.random(),
            }
        });
    }

    const changePassword = async () => {
        try {
            await axios.patch(`${serverUrl}/changePassword`, {
                oldPassword: info.previous,
                password: info.password,
                confirm: info.confirm,
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        } catch (e) {
            changeErr("err2", e.response.data, true, setErr);
        }
    }

    const handleChange = (event) => {
        setInfo((prev) => {
            return {
                ...prev,
                [event.target.id]: event.target.value,
            }
        });
    }

    const validation = (event) => {
        switch (event.target.id) {
            case "password":
                password(info, setErr);
                if (info.password === info.previous) {
                    changeErr("err2", "old and new password cannot match", true, setErr);
                }
                break;
            case "confirm":
                confirmFunc(info, setErr);
                break;
            case "restorePassword":
                if (info.restorePassword.length < 6) {
                    changeErr("err2", "must be more than 6 characters", true, setErr);
                } else if (info.restorePassword.includes("'") || info.restorePassword.includes('"') || info.restorePassword.includes("`")) {
                    changeErr("err2", "cannot contain '`'", true, setErr);
                } else {
                    changeErr("err2", "ok", false, setErr);
                }
                break;
            case "restoreConfirm":
                if (info.restorePassword !== info.restoreConfirm) {
                    changeErr("err3", "password mismatch", true, setErr);
                } else {
                    changeErr("err3", "ok", false, setErr);
                }
                break;
        }
    }

    const nameChange = async () => {
        try {
            await nameSubmit(info.name);
            dispatch(changeSender(user.name, info.name));
            dispatch(setName(info.name));
        } catch (e) {
            changeErr('err1', e.response.data, true, setErr)
        }
    }

    const restoreCode = async () => {
        try {
            await axios.post(`${serverUrl}/sendCodeEmail/restore`, {
                email: user.email,
            });
            setSend(true);
        } catch (e) {
            setSend(false);
            changeErr('err2', e.response.data, true, setErr);
        }
    }

    const restorePost = async () => {
        try {
            await axios.patch(`${serverUrl}/restorePassword`, {
                email: user.email,
                password: info.password,
                confirm: info.confirm,
                key: info.key,
            });
        } catch (e) {
            setNext(true);
            changeErr('err2', e.response.data, true, setErr);
        }
    }

    return <div id="settings" className="center-center" style={{display: show ? "flex" : "none"}}>
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
                    <button className="blueBth" onClick={generate}>Generate</button>
                    <button className="blueBth" onClick={nameChange} disabled={!info.name}>Change</button>
                </div>
                <p className="err" style={err.err1.show ? {
                    opacity: 1,
                    display: "block",
                } : {
                    opacity: 0,
                    display: "none",
                }}>{err.err1.text}</p>
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
                    <button className="blueBth" onClick={changePassword}
                            disabled={(!(info.previous && err.err2.text === "ok" && err.err3.text === "ok"))}>Change
                    </button>
                </div>
            </div>
            <div className="settingsBlock" id="restorePassword">
                <label htmlFor="name">Restore password</label>
                <div>
                    <div className="center-between bthRestoreDiv" style={{right: next ? "100%" : "0"}}>
                        <input onChange={handleChange} value={info.key}
                               placeholder="Code" type="text" id="key"/>
                        <button onClick={restoreCode} className="blueBth" disabled={send}>Send code</button>
                        <button onClick={() => setNext(true)} disabled={!info.key} className="blueBth">Next</button>
                    </div>
                    <div className="center-between restoreInputDiv" style={{left: next ? "0" : "100%"}}>
                        <input onChange={handleChange} value={info.restorePassword}
                               onBlur={validation} placeholder="Write a new password..." type="password" id="restorePassword"/>
                        <input onChange={handleChange} value={info.restoreConfirm}
                               onBlur={validation} placeholder="Confirm a new password..." type="password" id="restoreConfirm"/>
                        <button className="blueBth" onClick={restorePost}
                                disabled={!(err.err2.text === "ok" && err.err3.text === "ok")}>Change
                        </button>
                    </div>
                    <p className="err" style={err.err2.show || err.err3.show ? {
                        opacity: 1,
                        display: "block",
                    } : {
                        opacity: 0,
                        display: "none",
                    }}>{err.err2.text === "ok" ? err.err3.text === "ok" ? "" : err.err3.text : err.err2.text}</p>
                </div>
            </div>
        </div>
    </div>
}