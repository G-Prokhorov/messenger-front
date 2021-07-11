import {ADD_CHAT, ADD_CHATID, SET_CHATS, UPDATE_LAST, UPDATE_LAST_NUM, UPDATE_NUM} from "../actionsList";

const initialState = []

export default function (state = initialState, action) {
    let index;
    let newState;
    switch (action.type) {
        case SET_CHATS:
            return action.value.sort(sortFunc);
        case UPDATE_NUM:
            newState = JSON.parse(JSON.stringify(state));
            index = newState.findIndex(chat => chat.id_chat === action.chatId);
            if (Number.isInteger(index)) {
                newState[index].numberOfUnread -= action.value;
            }
            return newState;
        case UPDATE_LAST:
            newState = JSON.parse(JSON.stringify(state));
            index = newState.findIndex(chat => chat.id_chat === action.chatId);
            if (Number.isInteger(index)) {
                newState[index].numberOfUnread = 0;
                newState[index].sender_name = action.name;
                newState[index].sender_username = action.username;
                newState[index].message = action.message;
                newState[index].lastupdate = new Date();
                newState[index].img = action.img;
            }
            return newState.sort(sortFunc);
        case UPDATE_LAST_NUM:
            newState = JSON.parse(JSON.stringify(state));
            index = newState.findIndex(chat => chat.id_chat === action.chatId);
            if (Number.isInteger(index)) {
                newState[index].numberOfUnread += action.value;
                newState[index].sender_name = action.name;
                newState[index].sender_username = action.username;
                newState[index].message = action.message;
                newState[index].lastupdate = new Date();
                newState[index].img = action.img;
            }
            return newState.sort(sortFunc);
        case ADD_CHAT:
            newState = JSON.parse(JSON.stringify(state));
            newState.unshift(action.value);
            return newState;
        default:
            return state.sort(sortFunc);
    }
}

function sortFunc(a, b) {
    let aDate = new Date(a.lastupdate);
    let bDate = new Date(b.lastupdate);
    if (aDate < bDate) {
        return 1;
    }

    if (aDate > bDate) {
        return -1;
    }

    return 0;
}