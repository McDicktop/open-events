import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setToken, setIsCompleted, updateUserInfo } from "./features/userSlice";
import { updateEvents } from "./features/eventsSlice";

import { getUserData } from "./services/user.api";
import { getEvents } from "./services/event.api";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Main from "./components/Main";
import EventDetails from "./components/EventDetails";
import Account from "./components/Account";

import "./App.css";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                const res = await getUserData(token);
                if (!res.message) {
                    const {
                        _id,
                        status,
                        role,
                        email,
                        firstname,
                        lastname,
                        address,
                        avatar,
                        dateOfBirth,
                        events,
                        friends,
                        likes,
                        orders,
                        preferences,
                    } = res;


                    // console.log(firstname, lastname)

                    dispatch(setToken(token));
                    dispatch(setIsCompleted(status));

                    // dispatch(updateUserInfo({ id: _id }));
                    // dispatch(updateUserInfo({ likes }));

                    dispatch(
                        updateUserInfo({
                            id: _id,
                            role,
                            email,
                            firstname,
                            lastname,
                            address,
                            avatar,
                            dateOfBirth,
                            events,
                            friends,
                            likes,
                            orders,
                            preferences,
                        })
                    );

                    return;
                }
                console.log(res?.response?.data?.message); ///////////////////
            }
        };

        const fetchEvents = async () => {
            const res = await getEvents("");
            if (!res.message) {
                dispatch(updateEvents(res));
            } else {
                alert("Couldnt get events!");
            }
        };

        fetchUserData();
        fetchEvents();
    }, []);

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/event/:id" element={<EventDetails />} />
                    <Route path="/account" element={<Account />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;

// store:
//     - user
//         * initialState:
//         - info ({email: '', name: '', suraname: ''}) <Object{}>,
//         - token (null || 'string') <null||String>
//         - isCompleted (null || false || true) <null||Boolean>
