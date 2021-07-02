import {combineReducers} from "redux";
import chats_R from "./reducers/chats_R";

export const rootReducer = combineReducers({
    chats: chats_R,
});