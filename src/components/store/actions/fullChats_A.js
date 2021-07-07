import {ADD_FULL} from "../actionsList";

export function addFullChat(value) {
    return {
        type: ADD_FULL,
        value: value,
    }
}