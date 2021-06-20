import {useHistory} from "react-router-dom";
import axios from "axios";
import {useEffect} from "react";

export default function withAuth() {
    console.log("here")
    const history = useHistory();
    return useEffect(async () => {
        try {
            let res = await axios.get("http://localhost:5000/checkTokens", {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (res.status !== 200) {
                await history.push({
                    pathname: "/login",
                    state: {
                        response: "login"
                    }
                });
            }
        } catch (e) {
            await history.push({
                pathname: "/login",
                state: {
                    response: e
                }
            });
        }
    }, [])
}