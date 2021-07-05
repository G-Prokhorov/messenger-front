import {SET_CURRENT} from "../actionsList";

export function setCurrentChat(value) {
    return {
        type: SET_CURRENT,
        value: value,
    }
}