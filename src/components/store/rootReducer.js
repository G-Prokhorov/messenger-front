import {combineReducers} from "redux";
import chats_R from "./reducers/chats_R";
import currentChat_R from "./reducers/currentChat_R";
import message_R from "./reducers/message_R";
import user_R from "./reducers/user_R";
import alertMessage_R from "./reducers/alertMessage_R";
import fullChats_R from "./reducers/fullChats_R";
import setting_R from "./reducers/setting_R";

export const rootReducer = combineReducers({
    chats: chats_R,
    currentChat: currentChat_R,
    messages: message_R,
    user: user_R,
    alertMessage: alertMessage_R,
    fullChats: fullChats_R,
    settings: setting_R,
});