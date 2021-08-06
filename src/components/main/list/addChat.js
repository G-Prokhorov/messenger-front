import React, {useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {addChat} from "../../store/actions/chats_A";
import Plus from "../plus";
import serverUrl from "../../serverUrl";

export default function AddChat() {
    const [clicked, setClick] = useState(false);
    const [text, setText] = useState("");
    const dispatch = useDispatch();

    const handleClick = () => {
        setClick(!clicked);
    }

    const handleChange = (event) => {
        if (!event.target.value.match(/^@/)) {
            setText("@" + event.target.value);
        } else {
            setText(event.target.value);
        }
    }

    const handleSubmit = async () => {
        handleClick();
        try {
            let res = await axios.post(`${serverUrl}/chat`, {
                users: [text]
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            dispatch(addChat(res.data));
            setText("");
        } catch (e) {
            console.error(e)
        }
    }

    let styleInput = {
        width: clicked ? "100%" : "70px",
        paddingRight: clicked ? "70px" : "0",
    };

    if (window.innerWidth <= 900) {
        styleInput = {
            width: clicked ? "100%" : "70px",
            paddingLeft: clicked ? "80px" : "0",
            paddingRight: "30px",
        };
    }

    return <div id="addChatDiv">
        <button id="addChatBth" className="center-center addChat" onClick={handleClick}>
            <Plus clicked={clicked}/>
        </button>
        <div id="inputDivAdd" className="addChat center-between" style={styleInput}>
            <input style={{
                display: clicked ? "block" : "none",
                width: clicked ? "70%" : "0",
            }} type="text" onChange={handleChange} value={text} placeholder="Write a user name..."/>
            <button className="blueBth" type="submit" style={{
                display: clicked ? "block" : "none",
                width: clicked ? "25%" : "0",
            }} onClick={handleSubmit}
                    disabled={!text.match(/^@./)}>Add
            </button>
        </div>
    </div>
}