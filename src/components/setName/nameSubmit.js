import axios from "axios";
import serverUrl from "../serverUrl";

export default async function nameSubmit(name) {
    await axios.patch(`${serverUrl}/settings/updateName`, {
        name: name
    }, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    });
}