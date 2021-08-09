import store from "./store/store";
import {addChat, updateLast, updateLastAndNum} from "./store/actions/chats_A";
import addNewMessage from "./addNewMessage";

export default async function connect(setSocket) {
    let webSocket = new WebSocket("ws://localhost:8080/ws");
    let timeOut;
    let first = true;
    webSocket.onmessage = async (event) => {
        let state = store.getState();
        if (first) {
            first = false;
            setSocket(webSocket);
            return;
        }
        const parse = JSON.parse(event.data);

        if (!state.chats.find(chat => chat.id_chat === parse.chatId)) {
            store.dispatch(addChat({
                id_chat: parse.chatId,
                username: parse.sender,
                name: parse.name,
                sender_name: "",
                sender_username: "",
                message: "",
                img: false,
                numberOfUnread: 0,
                lastupdate: new Date(),
            }));
        }

        await addNewMessage(store.dispatch, state, parse.chatId, parse.message, parse.sender, parse.name, parse.img)
    }

    webSocket.onclose = (event) => {
        if (event.code === 1003) {
            return;
        }
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