import {SET_CHATS} from "../actionsList";

const initialState = []

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CHATS:
            return action.value;
        default:
            return state;
    }
}