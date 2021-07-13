import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import './globalstyle.css';
import Register from "./signUp&login/register.js";
import Main from "./main";
import Login from "./signUp&login/login";
import SetName from "./setName/setName";
import RestorePage from "./signUp&login/restorePage";

function Redirect(props) {
    return null;
}

function App() {
    return <>
        <Router>
            <Switch>
                <Route path="/register">
                    <Register/>
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route  path="/setName">
                    <SetName/>
                </Route>
                <Route path="/restore">
                    <RestorePage/>
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