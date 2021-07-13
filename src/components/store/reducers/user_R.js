import {SET_NAME, SET_USER_ALL} from "../actionsList";

const initialState = {
    username: "",
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
        case SET_NAME: {
            return {
                ...state,
                name: action.name,
            }
        }
        default:
            return state;
    }
}