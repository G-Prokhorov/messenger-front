import {ADD_PREV, SET_MESSAGE, UPDATE_MESSAGE} from "../actionsList";

export function setMessage(key, messages) {
    return {
        type: SET_MESSAGE,
        key: key,
        messages: messages,
    }
}

export function updateMessage(key, message, username, img = false) {
    return {
        type: UPDATE_MESSAGE,
        key: key,
        message: message,
        username: username,
        img: img,
    }
}

export function addPrevMes(key, messages) {
    return {
        type: ADD_PREV,
        key: key,
        messages: messages,
    }
}