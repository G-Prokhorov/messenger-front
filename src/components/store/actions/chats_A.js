import {ADD_CHAT, ADD_CHATID, CHANGE_SENDER, SET_CHATS, UPDATE_LAST, UPDATE_LAST_NUM, UPDATE_NUM} from "../actionsList";
import axios from "axios";
import serverUrl from "../../serverUrl";

export function setChats(value) {
    return {
        type: SET_CHATS,
        value: value,
    }
}

export function updateNumberUnread(chatId, value) {
    return {
        type: UPDATE_NUM,
        value: value,
        chatId: chatId
    }
}

export function updateLast(chatId, name, username, message, img = false) {
    return {
        type: UPDATE_LAST,
        name: name,
        username: username,
        message: message,
        chatId: chatId,
        img: img,
    }
}

export function updateLastAndNum(chatId, name, username, message, num, img = false) {
    return {
        type: UPDATE_LAST_NUM,
        name: name,
        username: username,
        message: message,
        chatId: chatId,
        value: num,
        img: img,
    }
}

export function asyncSetChats() {
    return async function (dispatch) {
        let chats = await axios.get(`${serverUrl}/chat`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch(setChats(chats.data));
    }
}

export function addChat(value) {
    return {
        type: ADD_CHAT,
        value: value,
    }
}

export function changeSender(oldName, newName) {
    return {
        type: CHANGE_SENDER,
        old: oldName,
        new: newName,
    }
}