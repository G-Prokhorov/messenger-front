import React, {useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import withAuth from "../withAuth";

export default function Main() {
    withAuth();

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
        </div>
    </div>;
}