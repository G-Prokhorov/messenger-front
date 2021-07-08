import React from "react";

import "./styleSettings.css";
import Plus from "../plus";
import {useDispatch, useSelector} from "react-redux";
import {op_cl_action} from "../../store/actions/setting_A";

export default function Settings() {
    let show = useSelector(state => state.settings);
    let dispatch = useDispatch();

    return <div id="settings" className="center-center" style={{display: show ? "flex" : "flex"}}>
        <div>
            <div id="headerSetting" className="center-between">
                <h2>Settings</h2>
                <button onClick={() => dispatch(op_cl_action(false))}>
                    <Plus clicked={true}/>
                </button>
            </div>

        </div>

    </div>
}