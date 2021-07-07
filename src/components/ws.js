import {setMessage, updateMessage} from "./store/actions/message_A";
import store from "./store/store";
import getMessage from "./main/chat/getMessage";
import {newMessageAlert} from "./store/actions/alert_A";
import {updateLastAndNum} from "./store/actions/chats_A";

export default function connect(setSocket) {
    let webSocket = new WebSocket("ws://localhost:5055");
    let timeOut;
    let first = true;
    webSocket.onmessage = async (event) => {
        if (first) {
            first = false;
            setSocket(webSocket);
            return;
        }
        const parse = JSON.parse(event.data);

        let state = store.getState();

        if (!state.messages.has(parse.chatId)) {
            let message = await getMessage(parse.chatId);
            store.dispatch(setMessage(parse.chatId, message.data.reverse()));
        } else {
            store.dispatch(updateMessage(parse.chatId, parse.message, parse.sender));
        }

        store.dispatch(updateLastAndNum(parse.chatId, parse.name, parse.sender, parse.message, 1));
        store.dispatch(newMessageAlert());
    }

    webSocket.onclose = () => {
        timeOut = setTimeout(() => {
            connect(setSocket);
        }, 2000);
    }

    webSocket.onerror = () => {
        first = true;
        setSocket(null);
        webSocket.close();
    }

    webSocket.onopen = () => {
        clearTimeout(timeOut);
    }
}