import getMessage from "./main/chat/getMessage";
import store from "./store/store";
import {setMessage, updateMessage} from "./store/actions/message_A";
import {addFullChat} from "./store/actions/fullChats_A";
import {updateLast, updateLastAndNum} from "./store/actions/chats_A";
import {newMessageAlert} from "./store/actions/alertMessage_A";

export default async function addNewMessage(dispatch, state, chatId, message, sender, senderName, img) {
    if (!state.messages.has(chatId) && !state.fullChats.includes(state.currentChat)) {
        try {
            let message = await getMessage(chatId, '0');
            if (message.data.length !== 0) {
                dispatch(setMessage(chatId, message.data.reverse()));
            } else {
                dispatch(updateMessage(chatId, message, sender, img));
            }

            if (message.data.length < 25) {
                dispatch(addFullChat(state.currentChat));
            }
        } catch (e) {
            if (e.response.data === "Message isn't exist") {
                dispatch(setMessage(chatId, []));
                dispatch(addFullChat(state.currentChat));
            }
        }
    } else {
        dispatch(updateMessage(chatId, message, sender, img));
    }

    if (sender === state.user.username) {
        dispatch(updateLast(chatId, senderName, sender, message, img));
    } else {
        dispatch(updateLastAndNum(chatId, senderName, sender, message, 1, img));
    }
    dispatch(newMessageAlert());
}