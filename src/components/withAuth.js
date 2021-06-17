import {useHistory} from "react-router-dom";
import axios from "axios";

export default async function withAuth() {
    const history = useHistory();
    try {
        await axios.get("http://localhost:5000/checkTokens");
    } catch (e) {
        await history.push({
            pathname: "/login",
            state: {
                response: e
            }
        });
    }
}