import React, {useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {addChat} from "../../store/actions/chats_A";

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
            let res = await axios.put("http://localhost:5050/createChat", {
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
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" className="plus"
                 style={{transform: clicked ? "rotate(45deg)" : "none"}}
                 viewBox="0 0 16 16">
                <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
            </svg>
        </button>
        <div id="inputDivAdd" className="addChat center-between" style={styleInput}>
            <input style={{
                display: clicked ? "block" : "none",
                width: clicked ? "70%" : "0",
            }} type="text" onChange={handleChange} value={text} placeholder="Write a user name..."/>
            <button type="submit" style={{
                display: clicked ? "block" : "none",
                width: clicked ? "25%" : "0",
            }} onClick={handleSubmit}
                    disabled={!text.match(/^@./)}>Add
            </button>
        </div>
    </div>
}