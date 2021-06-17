import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import './globalstyle.css';
import SignUp from "./signUp&login/signUp.js";
import Main from "./main";
import Login from "./signUp&login/login";

function Redirect(props) {
    return null;
}

function App() {
    return <>
        <Router>
            <Switch>
                <Route path="/register">
                    <SignUp/>
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/">
                    <Main/>
                </Route>
                <Redirect exact={true} from='*' to='/' />
            </Switch>
        </Router>
    </>;
}

export default App;