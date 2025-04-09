import { backend_url } from "./constants";
import axios from "axios";

export const createUser = async (user) => {
    try {
        const { email, password, role } = user;
        const res = await axios.post(backend_url + "auth/signup", {
            email,
            password,
            role
        });
        return res.data;
    } catch (e) {
        console.log(e)
        return e;
    }
};

export const loginUser = async (user) => {
    try {
        const res = await axios.post(backend_url + "auth/signin", {
            email: user.email,
            password: user.password,
        });
        return res.data;
    } catch (e) {
        console.log(e)
        return e;
    }
};


export const updateUser = async (id, user) => {
    try {
        const { data } = await axios.put(backend_url + "auth/" + id, user);
        return data;
    } catch (e) {
        console.log(e)
        return e;
    }
}

