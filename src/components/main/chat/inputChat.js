import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import serverUrl from "../../serverUrl";
import addNewMessage from "../../addNewMessage";

export default function InputChat(props) {
    const [text, setText] = useState("");
    const [show, setShow] = useState(false);
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    const handleClick = async () => {
        await addNewMessage(dispatch, state, state.currentChat, text, state.user.username, state.user.name, false);
        props.setMesArr((prev) => [...prev, text]);
        setText("");
    }

    const sendFile = (event) => {
        setShow(false);
        let filesArr = Array.from(event.target.files);
        let data = new FormData();
        data.append("chatId", state.currentChat)
        filesArr = filesArr.map((file) => {
            if (file.type.split("/")[0] === 'image') {
                data.append("files", file);
                return file;
            }
        });
        (async function () {
            try {
                await axios.post(`${serverUrl}/message/sendPhoto`, data, {
                    withCredentials: true,
                });
                let current = state.currentChat;
                let user = state.user;
                filesArr.forEach((file) => {
                    (async function () {
                        try {
                            let url = URL.createObjectURL(file);
                            await addNewMessage(dispatch, state, current, url, user.username, user.name, true);
                        } catch (e) {
                            console.error(e)
                            console.error("Error while locally upload")
                        }
                    })()
                });
            } catch {
                console.error("Couldn't upload file")
            }

        })();
    }

    const handleChange = (event) => {
        setText(event.target.value);
    }

    const handleKeyPress = async (event) => {
        if (event.key === "Enter") {
            await handleClick();
        }
    }

    useEffect(() => {
        setShow(false);
    }, [state.currentChat]);

    return <div className="inputDiv center-center" style={{display: state.currentChat ? "flex" : "none"}}>
        <svg onClick={() => setShow(!show)} xmlns="http://www.w3.org/2000/svg" width="35" height="35"
             fill="currentColor" className="paperclip"
             viewBox="0 0 16 16">
            <path
                d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"/>
        </svg>
        <input onChange={handleChange} onKeyPress={handleKeyPress} placeholder="Write a message..." value={text}
               type="text" id="messageText"/>
        <svg onClick={handleClick} className="sendSvg" xmlns="http://www.w3.org/2000/svg" width="30" height="30"
             viewBox="0 0 16 16">
            <path
                d="M.036 12.314a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.757-.703a.5.5 0 0 1-.278-.65zm0 2a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.757-.703a.5.5 0 0 1-.278-.65zM2.662 8.08c-.456 1.063-.994 2.098-1.842 2.804a.5.5 0 0 1-.64-.768c.652-.544 1.114-1.384 1.564-2.43.14-.328.281-.68.427-1.044.302-.754.624-1.559 1.01-2.308C3.763 3.2 4.528 2.105 5.7 1.299 6.877.49 8.418 0 10.5 0c1.463 0 2.511.4 3.179 1.058.67.66.893 1.518.819 2.302-.074.771-.441 1.516-1.02 1.965a1.878 1.878 0 0 1-1.904.27c-.65.642-.907 1.679-.71 2.614C11.076 9.215 11.784 10 13 10h2.5a.5.5 0 0 1 0 1H13c-1.784 0-2.826-1.215-3.114-2.585-.232-1.1.005-2.373.758-3.284L10.5 5.06l-.777.388a.5.5 0 0 1-.447 0l-1-.5a.5.5 0 0 1 .447-.894l.777.388.776-.388a.5.5 0 0 1 .447 0l1 .5a.493.493 0 0 1 .034.018c.44.264.81.195 1.108-.036.328-.255.586-.729.637-1.27.05-.529-.1-1.076-.525-1.495-.426-.42-1.19-.77-2.477-.77-1.918 0-3.252.448-4.232 1.123C5.283 2.8 4.61 3.738 4.07 4.79c-.365.71-.655 1.433-.945 2.16-.15.376-.301.753-.463 1.13z"/>
        </svg>
        <div id="inputImgDiv" className="center-center" style={{display: show ? "flex" : "none"}}>
            <input type="file" multiple={true} onChange={sendFile} id="imgInput" accept="image/*" name="imgInput"/>
            <svg xmlns="http://www.w3.org/2000/svg" className="uploadSvg"
                 viewBox="0 0 16 16">
                <path
                    d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path
                    d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
            </svg>
            <p>Choose or drop photo</p>
        </div>
    </div>
}