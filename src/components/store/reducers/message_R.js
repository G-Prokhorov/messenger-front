import {SET_MESSAGE} from "../actionsList";

const initialState = new Map();

export default function message_R(state = initialState, action) {
    switch (action.type) {
        case SET_MESSAGE:
            return state.set(action.key, action.messages);
        default:
            return state;
    }
}