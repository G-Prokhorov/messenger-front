import axios from "axios";
import {setMessage} from "../../store/actions/message_A";
import serverUrl from "../../serverUrl";

export default async function getMessage(currentChat, start, limit = 25) {
    return await axios.post(`${serverUrl}/getMessage`, {
        chatId: currentChat,
        start: start,
        limit: limit,
    }, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    });
}