import {SET_CHATS} from "../actionsList";
import axios from "axios";

export function setChats(value) {
    return {
        type: SET_CHATS,
        value: value,
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