import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import withAuth from "../withAuth";
import axios from "axios";

import "./style.css"
import logo from "../img/logo.png";
import Contact from "./contact";
import Header from "./header";
import Chat from "./chat";

export default function Main() {
    withAuth();

    let logout = async () => {
        await axios.get("http://localhost:5000/logout", {withCredentials: true});
    }

    return <div className="box">
        <main>
            <Header />
            <div className="chats">
                <Contact name={"Gregory"} message={"last message last message last message last message"}/>
                <Contact name={"Gregory"} message={"last message last message last message last message"}/>
                <Contact name={"Gregory"} message={"last message last message last message last message"}/>
            </div>
            <Chat />
        </main>
    </div>
}