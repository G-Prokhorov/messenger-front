import React, {useState} from "react";

import "../loginStyle.css";
import "./style.css";

import logo from "../img/logo.png";

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
        setData((prev) => {
            return {
                ...prev,
                [event.target.id]: event.target.value,
            }
        });
    }

    const changeErr = (name, text, state) => {
        setErr((prev) => {
            return {
                ...prev,
                [name]: {
                    text: text,
                    show: state,
                },
            }
        });
    }

    const validateUsername = (username) => {
        let re = new RegExp("^[a-zA-Z0-9_.-]*$");
        return re.test(String(username));
    }

    const validation = (event) => {
        switch (event.target.id) {
            case "username":
                if (validateUsername(data.username)) {
                    changeErr("err1", "ok", false);
                } else {
                    changeErr("err1", "can only include of the alphabets characters, number, -, _ and .", true);
                }

                break;
            case "password":
                if (data.password.length < 6) {
                    changeErr("err2", "must be more than 6 characters", true);
                } else if (data.password.length > 30) {
                    changeErr("err2", "cannot be more than 30 characters", true);
                } else if (data.password.includes("'") || data.password.includes('"') || data.password.includes("`")) {
                    changeErr("err2", "cannot contain '`'", true);
                } else {
                    changeErr("err2", "ok", false);
                }
                break;
            case "confirm":
                if (data.password !== data.confirm) {
                    changeErr("err3", "password mismatch", true);
                } else {
                    changeErr("err3", "ok", false);
                }
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
            <button className="submit"
                    disabled={!(err.err1.text === "ok" && err.err2.text === "ok" && err.err3.text === "ok")}>SIGN UP
            </button>
        </div>
    </main>
}