import axios from "axios";
import {setMessage} from "../../store/actions/message_A";

export default async function getMessage(currentChat) {
    return await axios.post("http://localhost:5050/getMessage", {
        chatId: currentChat,
        start: '0',
    }, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    });
}