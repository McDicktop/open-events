import logo from "../assets/oneventlogo.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UpdateForm from "./layout/Forms/UpdateForm";

import { useSelector, useDispatch } from "react-redux";
import { setToken, setIsCompleted, updateUserInfo } from "../features/userSlice";

import { getUserData } from "../services/user.api";

function Main() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                const res = await getUserData(token);
                if (!res.message) {
                    const { _id, status } = res;
                    dispatch(setToken(token));
                    dispatch(setIsCompleted(status));
                    dispatch(updateUserInfo({ id: _id }));
                    return;
                }
                console.log(res.message); ///////////////////
            }
        };

        fetchUserData();
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        dispatch(setToken(null));
        dispatch(setIsCompleted(null));
        dispatch(updateUserInfo({
            id: null,
            email: '',
            name: '',
            surname: '',
        }));
    };

    return (
        <>
            {!user.token && (
                <div className="border border-[4px] h-[100vh] ">
                    <div className="flex justify-end gap-4 p-4 border">
                        <button
                            className="border w-20 py-1 rounded-lg cursor-pointer font-semibold bg-gray-200"
                            onClick={() => navigate("/signin")}
                        >
                            Sign In
                        </button>
                        <button
                            className="border w-20 py-1 rounded-lg cursor-pointer font-semibold bg-gray-200"
                            onClick={() => navigate("/signup")}
                        >
                            Sign Up
                        </button>
                    </div>

                    <div
                        className="h-[200px]  mx-auto bg-contain bg-no-repeat bg-center"
                        style={{ backgroundImage: `url('${logo}')` }}
                    ></div>
                </div>
            )}

            {user.token && !user.isCompleted && <UpdateForm />}

            {user.token && user.isCompleted && (
                <>
                    <div>Welcome back</div>
                    <button
                        className="border w-20 py-1 rounded-lg cursor-pointer font-semibold bg-gray-200"
                        onClick={() => logout()}
                    >
                        Log out
                    </button>
                </>
            )}
        </>
    );
}

export default Main;
