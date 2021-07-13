import axios from "axios";

export default async function nameSubmit(name) {
    await axios.patch("http://localhost:5050/updateName", {
        name: name
    }, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    });
}