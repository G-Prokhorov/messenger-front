import {SET_MESSAGE} from "../actionsList";

export function setMessage(key, messages) {
    return {
        action: SET_MESSAGE,
        key: key,
        messages: messages,
    }
}