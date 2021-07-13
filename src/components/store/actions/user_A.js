import {SET_NAME, SET_USER_ALL} from "../actionsList";

export function userAll(username, name) {
    return {
        type: SET_USER_ALL,
        username: username,
        name: name,
    }
}

export function setName(name) {
    return {
        type: SET_NAME,
        name: name,
    }
}