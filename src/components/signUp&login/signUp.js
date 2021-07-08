import React, {useState} from "react";

import "./loginStyle.css";
import "./style.css";

import logo from "../img/logo.png";
import axios from "axios";
import {changeErr, confirm, password} from "./passwordValidation";

export default function SignUp() {
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

    const [data, setData] = useState({
        username: "",
        password: "",
        confirm: "",
    });

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

    const validateUsername = (username) => {
        let re = new RegExp("^[a-zA-Z0-9_.-]*$");
        return re.test(String(username));
    }
    const handleSubmit = async () => {
        try {
            let result = await axios.post("http://localhost:5050/register", {
                username: data.username,
                password: data.password,
                confirm: data.confirm,
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (result.status === 200) {
                history.push("/");
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
                    let result = await axios.get("http://localhost:5050/checkUser?username=" + data.username);
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
                confirm(data, setErr)
                break;
            default:
                break;
        }
    }

    return <main className="loginPage">
        <div className="form">
            <img width="70" height="70" className="logo" src={logo} alt="logo"/>
            <h1>Sign Up</h1>
            <div className="inputBox">
                <label form="username">Username</label>
                <input id="username" onChange={handleChange} onBlur={validation} autoComplete="off"
                       type="username" value={data.username}/>
                <span id="a">@</span>
                <p className="err" style={{
                    opacity: err.err1.show ? 1 : 0,
                    display: err.err1.show ? "block" : "none"
                }}>{err.err1.text}</p>
            </div>
            <div className="inputBox">
                <label form="password">Password</label>
                <input id="password" onChange={handleChange} onBlur={validation} type="password" value={data.password}/>
                <p className="err" style={{
                    opacity: err.err2.show ? 1 : 0,
                    display: err.err2.show ? "block" : "none"
                }}>{err.err2.text}</p>
            </div>
            <div className="inputBox">
                <label form="confirm">Confirm</label>
                <input id="confirm" onChange={handleChange} onBlur={validation} type="password" value={data.confirm}/>
                <p className="err" style={{
                    opacity: err.err3.show ? 1 : 0,
                    display: err.err3.show ? "block" : "none"
                }}>{err.err3.text}</p>
            </div>
            <button className="submit" onClick={handleSubmit}
                    disabled={!(err.err1.text === "ok" && err.err2.text === "ok" && err.err3.text === "ok")}>SIGN UP
            </button>
        </div>
    </main>
}