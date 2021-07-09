import axios from "axios";
import {setMessage} from "../../store/actions/message_A";

export default async function getMessage(currentChat, start, limit = 25) {
    return await axios.post("http://localhost:5050/getMessage", {
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