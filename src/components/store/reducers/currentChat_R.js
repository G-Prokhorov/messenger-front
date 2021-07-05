import {SET_CURRENT} from "../actionsList";

const initialState = "";

export default function currentChat_R(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT:
            return action.value;
        default:
            return state;
    }
}