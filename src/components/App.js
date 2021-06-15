import React from "react";

import './globalstyle.css';
import SignUp from "./signUp/signUp.js";

function App() {

    return <>
        <SignUp />
        <div className="back">
            <div id="circle1" className="circle"/>
            <div id="circle2" className="circle"/>
            <div id="circle3" className="circle"/>
            <div id="circle4" className="circle"/>
        </div>
    </>;
}

export default App;