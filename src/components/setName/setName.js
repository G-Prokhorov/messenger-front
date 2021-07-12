import React, {useState} from "react";

import "../signUp&login/loginStyle.css";
import "./styleSetName.css";
import logo from "../img/logo.png";
import InputBox from "../signUp&login/inputBox";
import superheroes from "superheroes";
import axios from "axios";
import {useHistory} from "react-router-dom";
import withAuth from "../withAuth";

export default function SetName() {
    withAuth();

    let [name, setName] = useState("");
    let [err, setErr] = useState("")
    let history = useHistory();

    const handleChange = (event) => {
        setName(event.target.value);
    }

    const generate = () => {
        setName(superheroes.random());
    }

    const handleSubmit = async () => {
        try {
            await axios.patch("http://localhost:5050/updateName", {
                name: name
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            history.push("/");
        } catch (e) {
            setErr(e.response.data);
        }

    }

    return <div className="loginPage">
        <div className="form formBack formName">
            <img width="70" height="70" className="logo" src={logo} alt="logo"/>
            <h1>Let set your name</h1>
            <InputBox label={"My name is..."} change={handleChange} blur={() => {
            }} val={name}
                      errText={""} errShow={""} id={"setName"} type={"text"}/>
            <div className="buttons center-between">
                <button className="submit" onClick={generate}>GENERATE</button>
                <button className="submit" onClick={handleSubmit}
                        disabled={!name}>SET NAME
                </button>
            </div>
            <p className="err">{err}</p>
        </div>
    </div>
}