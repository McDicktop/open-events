import { backend_url } from "./constants";
import axios from "axios";



export const getEvents = async (find) => {

    try {
        const res = await axios.get(backend_url + "event/" + find);
        return res.data;
    } catch (e) {
        return e;
    }
};

export const toggleLikeEvent = async (body, token) => {
    try {
        const res = await axios.patch(backend_url + "event/like", body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error)
        return error;
    }
}