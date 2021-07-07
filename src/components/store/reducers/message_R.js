import {ADD_PREV, SET_MESSAGE, UPDATE_MESSAGE} from "../actionsList";

const initialState = new Map();

export default function message_R(state = initialState, action) {
    switch (action.type) {
        case SET_MESSAGE:
            return state.set(action.key, action.messages);
        case UPDATE_MESSAGE:
            let old = state.get(action.key);
            return state.set(action.key, [...old, {
                message: action.message,
                user: {
                    username: action.username,
                }
            }]);
        case ADD_PREV:
            let next = state.get(action.key);
            return state.set(action.key, [...action.messages, ...next]);
        default:
            return state;
    }
}