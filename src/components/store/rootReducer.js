import {combineReducers} from "redux";
import chats_R from "./reducers/chats_R";
import currentChat_R from "./reducers/currentChat_R";

export const rootReducer = combineReducers({
    chats: chats_R,
    currentChat: currentChat_R,
});