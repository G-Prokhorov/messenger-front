import {SET_MESSAGE} from "../actionsList";

export function setMessage(key, messages) {
    return {
        type: SET_MESSAGE,
        key: key,
        messages: messages,
    }
}