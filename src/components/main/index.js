import React from "react";
import withAuth from "../withAuth";

import "./style.css"
import Header from "./header/header";
import Chat from "./chat/chat";
import ChatsList from "./list/chatsList";
import Settings from "./settings/settings";

export default function Main() {
    withAuth();

    return <div className="box">
        <main>
            <Header/>
            <ChatsList/>
            <Chat/>
        </main>
        <Settings/>
    </div>
}