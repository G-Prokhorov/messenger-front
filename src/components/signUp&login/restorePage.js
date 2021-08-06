import React, {useEffect, useState} from "react";

import "./loginStyle.css";
import "./styleRestore.css"
import logo from "../img/logo.png";
import InputBox from "./inputBox";
import {changeErr, confirmFunc, password} from "./passwordValidation";
import axios from "axios";
import serverUrl from "../serverUrl";
import {useHistory} from "react-router-dom";

export default function RestorePage() {
    let history = useHistory();
    let [state, setState] = useState(0);
    const [send, setSend] = useState(false);
    const [info, setInfo] = useState({
        email: "",
        password: "",
        confirm: "",
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

    const handleChange = (event) => {
        setInfo((prev) => {
            return {
                ...prev,
                [event.target.id]: event.target.value,
            }
        });
    }

    const handleSubmit = async () => {
        try {
            await axios.patch(`${serverUrl}/settings/restorePassword`, {
                email: info.email,
                password: info.password,
                confirm: info.confirm,
                key: info.key,
            });
            history.push("/login");
        } catch (e) {
            changeErr('err2', e.response.data, true, setErr);
        }

    }

    const validation = async (event) => {
        switch (event.target.id) {
            case "password":
                password(info, setErr)
                break;
            case "confirm":
                confirmFunc(info, setErr)
                break;
            case "email":
                if (!validateEmail(info.email)) {
                    changeErr("err1", "invalid email", true, setErr);
                } else {
                    changeErr("err1", "ok", false, setErr);
                }
                break;
            default:
                break;
        }
    }

    const restoreCode = async () => {
        try {
            setSend(true);
            await axios.post(`${serverUrl}/auth/sendCodeEmail/restore`, {
                email: info.email,
            });
            goNext();
        } catch (e) {
            setSend(false);
            changeErr('err1', e.response.data, true, setErr);
        }
    }

    const goNext = () => setState(state + 1);
    const goPrev = () => setState(state - 1);

    return <div className="loginPage">
        <div className="form formBack restoreForm">
            <img width="70" height="70" className="logo" src={logo} alt="logo"/>
            <h1>Restore Password</h1>
            <div id="restoreInput" className="center-center">
                <div className="restorePart center-center" style={{right: state * 100 + "%"}}>
                    <InputBox label={"Email"} change={handleChange} blur={validation} val={info.email}
                              errText={err.err1.text} errShow={err.err1.show} id={"email"} type={"text"}/>
                    <button onClick={restoreCode} disabled={!(err.err1.text === "ok" && !send)}
                            className="submit">SEND
                    </button>
                </div>
                <div className="restorePart center-between" style={{right: (state * 100 - 100) + "%"}}>
                    <button onClick={goPrev} className="submit">PREV</button>
                    <p className="infoP">A key has been sent to {info.email} to verify your email</p>
                    <div className="inputBox">
                        <label>Key</label>
                        <input onChange={handleChange} id="key" style={{margin: 0}}/>
                    </div>
                    <button onClick={goNext} disabled={!info.key} className="submit">NEXT</button>
                </div>
                <div className="restorePart center-between" style={{right: (state * 100 - 200) + "%"}}>
                    <button onClick={goPrev} className="submit">PREV</button>
                    <InputBox label={"Password"} change={handleChange} blur={validation} val={info.password}
                              errText={err.err2.text} errShow={err.err2.show} id={"password"} type={"password"}/>
                    <InputBox label={"Confirm"} change={handleChange} blur={validation} val={info.confirm}
                              errText={err.err3.text} errShow={err.err3.show} id={"confirm"} type={"password"}/>
                    <button className="submit" onClick={handleSubmit}
                            disabled={!(err.err2.text === "ok" && err.err3.text === "ok")}>CHANGE
                    </button>
                </div>
            </div>
        </div>
    </div>

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}