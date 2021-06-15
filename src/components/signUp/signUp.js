import React from "react";

import "../loginStyle.css";
import "./style.css";

import logo from "../img/logo.png";

export default function SignUp() {
    return <main className="loginPage">
        <div className="form">
            <img width="70" height="70" className="logo" src={logo} alt="logo"/>
            <h1>Sign Up</h1>
            <div className="inputBox">
                <label form="email">Email</label>
                <input id="email" autoFocus="on" autoComplete="off" type="text" />
                <p className="err">some error</p>
            </div>
            <div className="inputBox">
                <label form="password">Password</label>
                <input id="password" type="password" />
                <p className="err">some error</p>
            </div>
            <div className="inputBox">
                <label form="confirm">Confirm</label>
                <input id="confirm" type="password" />
                <p className="err">some error</p>
            </div>
            <button className="submit">SIGN UP</button>
        </div>
    </main>
}