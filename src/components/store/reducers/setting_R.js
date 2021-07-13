import {SETTINGS} from "../actionsList";

const initialState = true;

export default function setting_R(state = initialState, action) {
    switch (action.type) {
        case SETTINGS:
            return action.value;
        default:
            return state;
    }
}