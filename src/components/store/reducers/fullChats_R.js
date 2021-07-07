import {ADD_FULL} from "../actionsList";

const initialState = [];

export default function fullChats_R(state = initialState, action) {
    switch (action.type) {
        case ADD_FULL:
            state.push(action.value)
            return state;
        default:
            return state;
    }
}