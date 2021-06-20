import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import withAuth from "../withAuth";
import axios from "axios";

export default function Main() {
    withAuth();

    let logout = async () => {
        await axios.get("http://localhost:5000/logout", {withCredentials: true});
    }

    let add = () => {
        setCount(count + 1)
    }

    let [count, setCount] = useState(0);

    return <div style={{
        minHeight: "100vh",
        textAlign: "center",
        color: "#FFFFFF"
    }}>
        <h1>With auth</h1>
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
            <button onClick={logout}>Log out</button>
            <h2>Count {count}</h2>
            <button onClick={add}>Add</button>
        </div>
    </div>;
}