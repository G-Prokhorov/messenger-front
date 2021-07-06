import {SET_CHATS, UPDATE_LAST, UPDATE_LAST_NUM, UPDATE_NUM} from "../actionsList";
import axios from "axios";

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

export function updateLast(chatId, name, username, message) {
    return {
        type: UPDATE_LAST,
        name: name,
        username: username,
        message: message,
        chatId: chatId,
    }
}

export function updateLastAndNum(chatId, name, username, message, num) {
    return {
        type: UPDATE_LAST_NUM,
        name: name,
        username: username,
        message: message,
        chatId: chatId,
        value: num,
    }
}

export function asyncSetChats() {
    return async function (dispatch) {
        let chats = await axios.get("http://localhost:5050/getChat", {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch(setChats(chats.data));
    }
}