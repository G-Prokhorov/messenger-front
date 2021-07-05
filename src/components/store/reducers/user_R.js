import {SET_USER_ALL} from "../actionsList";

const initialState = {
    username: "@",
    name: ""
}

export default function user_R(state = initialState, action) {
    switch (action.type) {
        case SET_USER_ALL:
            return {
                ...state,
                username: action.username,
                name: action.name,
            }
        default:
            return state;
    }
}