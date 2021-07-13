import {useHistory} from "react-router-dom";
import axios from "axios";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {userAll} from "./store/actions/user_A";

export default function withAuth() {
    console.log("auth");
    const history = useHistory();
    const dispatch = useDispatch();

    return useEffect(async () => {
        try {
            let res = await axios.get("http://localhost:5050/checkTokens", {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            dispatch(userAll(res.data.username, res.data.name, res.data.email));
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