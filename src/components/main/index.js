import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import withAuth from "../withAuth";
import axios from "axios";

import "./style.css"
import logo from "../img/logo.png";
import Contact from "./list/contact";
import Header from "./header/header";
import Chat from "./chat/chat";
import ChatsList from "./list/chatsList";

export default function Main() {
    withAuth();

    return <div className="box">
        <main>
            <Header/>
            <ChatsList/>
            <Chat/>
        </main>
    </div>
}