import {ALERT_MESSAGE} from "../actionsList";

const initialState = false;

export default function alert_R(state = initialState, action) {
    switch (action.type) {
        case ALERT_MESSAGE:
            return !state;
        default:
            return state;
    }
}