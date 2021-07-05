import {combineReducers} from "redux";
import chats_R from "./reducers/chats_R";
import currentChat_R from "./reducers/currentChat_R";
import message_R from "./reducers/message_R";
import user_R from "./reducers/user_R";

export const rootReducer = combineReducers({
    chats: chats_R,
    currentChat: currentChat_R,
    messages: message_R,
    user: user_R,
});