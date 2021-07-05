import {SET_USER_ALL} from "../actionsList";

export function userAll(username, name) {
    return {
        type: SET_USER_ALL,
        username: username,
        name: name,
    }
}