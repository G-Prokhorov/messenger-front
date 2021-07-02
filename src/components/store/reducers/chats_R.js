import {SET_CHATS} from "../actionsList";

const initialState = []

export default function (state = [], action) {
    switch (action.type) {
        case SET_CHATS:
            return action.value;
        default:
            return state;
    }
}