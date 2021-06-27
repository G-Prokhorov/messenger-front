import React, {useState} from "react";
import logo from "../img/logo.png";
import axios from "axios";
import {useHistory} from "react-router-dom";

export default function Header() {
    const [click, setClick] = useState(false);

    const handleClick = () => {
        setClick(!click);
    }

    let logout = async () => {
        await axios.get("http://localhost:5050/logout", {withCredentials: true});
        window.location.reload();
    }

    return <header className="center-between">
        <div className="center-center">
            <div className="list center-center" onClick={handleClick}
                 style={{width: click ? "35%" : "100px", justifyContent: click ? "space-around" : "center", paddingRight: click ? "50px" : "0"}}>
                <svg style={{transform: click ? "rotate(180deg)" : "rotate(360deg)"}} xmlns="http://www.w3.org/2000/svg"
                     width="55" height="55" fill="rgba(255, 255, 255, 0.4)"
                     className="bi bi-chevron-bar-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                          d="M4.146 3.646a.5.5 0 0 0 0 .708L7.793 8l-3.647 3.646a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708 0zM11.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13a.5.5 0 0 1 .5-.5z"/>
                </svg>
                <a style={{display: click ? 'block' : 'none', opacity: click ? "1" : "0"}}>Settings</a>
                <a onClick={logout} style={{display: click ? 'block' : 'none', opacity: click ? "1" : "0"}} className="red">Log Out</a>
            </div>
            <img width="50" height="50" className="logo" src={logo} alt="logo"/>
            <h1>Message</h1>
        </div>
        <div className="profile center-between">
            <h2>Gregory</h2>
            <div className="avatar">
                <p>G</p>
            </div>
        </div>
    </header>
}