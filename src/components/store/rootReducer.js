import {combineReducers} from "redux";
import chats_R from "./reducers/chats_R";
import currentChat_R from "./reducers/currentChat_R";
import message_R from "./reducers/message_R";
import user_R from "./reducers/user_R";
import alert_R from "./reducers/alert_R";
import fullChats_R from "./reducers/fullChats_R";

export const rootReducer = combineReducers({
    chats: chats_R,
    currentChat: currentChat_R,
    messages: message_R,
    user: user_R,
    alert: alert_R,
    fullChats: fullChats_R,
});