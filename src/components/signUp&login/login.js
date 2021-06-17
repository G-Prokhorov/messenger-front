import React, {useState} from "react";

import "./loginStyle.css";
import "./style.css";

import logo from "../img/logo.png";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";

export default function Login() {
    const history = useHistory();
    const [data, setData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (event) => {
        setData((prev) => {
            return {
                ...prev,
                [event.target.id]: event.target.value,
            }
        });
    }

    const handleSubmit = async () => {
        try {
            let result = await axios.post("http://localhost:5000/login", {
                username: data.username,
                password: data.password,
            }, {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'x-www-form-urlencoded',
                }
            });

            if (result.status === 200) {
                history.push("/");
            }
        } catch (e) {
            console.error("error, " + e);
        }
    }

    return <main className="loginPage">
        <div className="form">
            <img width="70" height="70" className="logo" src={logo} alt="logo"/>
            <h1>Sign Up</h1>
            <div className="inputBox">
                <label form="username">Username</label>
                <input id="username" onChange={handleChange} autoComplete="off"
                       type="username" value={data.username} style={{margin: "0"}}/>
                <span id="a">@</span>
            </div>
            <div className="inputBox">
                <label form="password">Password</label>
                <input id="password" onChange={handleChange} type="password" value={data.password}
                       style={{margin: "0"}}/>
            </div>
            <button className="submit" onClick={handleSubmit}
                    disabled={!(data.username && data.password)}>LOG IN
            </button>
            <p className="question">Don't have an account? <Link to={"/register"}>Register</Link></p>
        </div>
    </main>
}