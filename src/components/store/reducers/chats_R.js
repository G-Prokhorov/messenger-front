import {ADD_CHAT, SET_CHATS, UPDATE_LAST, UPDATE_LAST_NUM, UPDATE_NUM} from "../actionsList";

const initialState = []

export default function (state = initialState, action) {
    let index;
    let newState;
    switch (action.type) {
        case SET_CHATS:
            return action.value;
        case UPDATE_NUM:
            newState = JSON.parse(JSON.stringify(state));
            index = newState.findIndex(chat => chat.id_chat === action.chatId);
            if (index) {
                newState[index].numberOfUnread += action.value;
            }
            return state;
        case UPDATE_LAST:
            newState = JSON.parse(JSON.stringify(state));
            index = newState.findIndex(chat => chat.id_chat === action.chatId);
            if (index) {
                newState[index].numberOfUnread = 0;
                newState[index].sender_name = action.name;
                newState[index].sender_username = action.username;
                newState[index].message = action.message;
                newState[index].lastupdate = new Date();
            }
            return newState;
        case UPDATE_LAST_NUM:
            newState = JSON.parse(JSON.stringify(state));
            index = newState.findIndex(chat => chat.id_chat === action.chatId);
            if (index) {
                newState[index].numberOfUnread += action.value;
                newState[index].sender_name = action.name;
                newState[index].sender_username = action.username;
                newState[index].message = action.message;
                newState[index].lastupdate = new Date();
            }
            return newState;
        case ADD_CHAT:
            newState = JSON.parse(JSON.stringify(state));
            newState.unshift(action.value);
            return newState;
        default:
            return state;
    }
}