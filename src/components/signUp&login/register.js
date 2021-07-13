import React, {useEffect, useState} from "react";

import "./loginStyle.css";
import "./registerStyle.css";

import logo from "../img/logo.png";
import axios from "axios";
import {changeErr, confirmFunc, password} from "./passwordValidation";
import InputBox from "./inputBox";
import {useHistory} from "react-router-dom";
import serverUrl from "../serverUrl";

export default function Register() {
    let history = useHistory();

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
        err4: {
            text: "",
            show: false,
        },
        err5: {
            text: "",
            show: false,
        }
    });

    const [data, setData] = useState({
        username: "",
        password: "",
        confirm: "",
        email: "",
        key: "",
    });
    const [next, setNext] = useState(false);
    const [disable, setDisable] = useState(true);
    const [send, setSend] = useState(false);

    useEffect(() => {
        if (send) {
            setDisable(true);
            let timeout = setTimeout(() => {
                setDisable(false);
            }, 120000);
            return () => clearTimeout(timeout);
        }
    }, [send]);

    const handleChange = (event) => {
        if (event.target.id === "username" && event.target.value.length > 30) {
            changeErr("err1", "cannot be more than 30 characters", true);
            return;
        }

        if ((event.target.id === "password" || event.target.id === "confirm") && event.target.value.length > 50) {
            changeErr("err2", "cannot be more than 50 characters", true);
            return;
        }

        setData((prev) => {
            return {
                ...prev,
                [event.target.id]: event.target.value,
            }
        });
    }

    const handleSubmit = async () => {
        try {
            let result = await axios.post(`${serverUrl}/register`, {
                username: data.username,
                password: data.password,
                confirm: data.confirm,
                email: data.email,
                key: data.key,
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (result.status === 200) {
                history.push("/setName");
            }
        } catch (e) {
            console.error("error, " + e);
        }
    }

    const validation = async (event) => {
        switch (event.target.id) {
            case "username":
                if (!validateUsername(data.username)) {
                    changeErr("err1", "can only include of the alphabets characters, number, -, _ and .", true, setErr);
                } else {
                    let result = await axios.get(`${serverUrl}/checkUser?username=` + data.username);
                    if (result.data === "clear") {
                        changeErr("err1", "ok", false, setErr);
                    } else if (result.data === "exist") {
                        changeErr("err1", "user already exist", true, setErr);
                    } else {
                        changeErr("err1", "incomprehensible error", true, setErr);
                    }
                }
                break;
            case "password":
                password(data, setErr)
                break;
            case "confirm":
                confirmFunc(data, setErr)
                break;
            case "email":
                if (!validateEmail(data.email)) {
                    changeErr("err4", "invalid email", true, setErr);
                } else {
                    changeErr("err4", "ok", false, setErr);
                }
                break;
            default:
                break;
        }
    }

    const goNext = async () => {
        setNext(true);
        await sendCode();
    }

    const sendCode = async () => {
        try {
            await axios.post(`${serverUrl}/sendCodeEmail/register`, {
                email: data.email,
            });
        } catch (e) {
            changeErr('err5', e.response.data, true, setErr);
        }
        setSend(true);
    }

    return <main className="loginPage">
        <div className="registerForm formBack">
            <div className="form" style={{right: next ? "100%" : "0"}}>
                <img width="70" height="70" className="logo" src={logo} alt="logo"/>
                <h1>Sign Up</h1>
                <InputBox label={"Email"} change={handleChange} blur={validation} val={data.email}
                          errText={err.err4.text} errShow={err.err4.show} id={"email"} type={"text"}/>
                <InputBox label={"Username"} change={handleChange} blur={validation} val={data.username}
                          errText={err.err1.text} errShow={err.err1.show} id={"username"} type={"text"}/>
                <InputBox label={"Password"} change={handleChange} blur={validation} val={data.password}
                          errText={err.err2.text} errShow={err.err2.show} id={"password"} type={"password"}/>
                <InputBox label={"Confirm"} change={handleChange} blur={validation} val={data.confirm}
                          errText={err.err3.text} errShow={err.err3.show} id={"confirm"} type={"password"}/>
                <button className="submit" onClick={goNext}
                        disabled={!(err.err1.text === "ok" && err.err2.text === "ok" && err.err3.text === "ok")}>NEXT
                </button>
            </div>
            <div className="form confirmCode" style={{left: next ? "0" : "100%"}}>
                <img width="70" height="70" className="logo" src={logo} alt="logo"/>
                <h1>Confirm Email</h1>
                <p className="infoP">A key has been sent to {data.email} to verify your email</p>
                <InputBox label={"Key"} change={handleChange} blur={() => {
                }} val={data.key}
                          errText={err.err5.text} errShow={err.err5.show} id={"key"} type={"text"}/>
                <div id="sendAgain" className="center-center">
                    <button className="submit" onClick={sendCode}
                            disabled={disable}>SEND AGAIN
                    </button>
                    <div id="line">
                        <hr className={send ? "countdown" : ""}/>
                    </div>
                </div>
                <button className="submit" onClick={handleSubmit}
                        disabled={!data.key}>SIGN UP
                </button>
                <a onClick={() => {
                    setNext(false)
                }}>{'<'}back</a>
            </div>
        </div>
    </main>

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function validateUsername(username) {
        let re = new RegExp("^[a-zA-Z0-9_.-]*$");
        return re.test(String(username));
    }
}