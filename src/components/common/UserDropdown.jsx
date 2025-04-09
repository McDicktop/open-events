import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
    setToken,
    setIsCompleted,
    updateUserInfo,
} from "../../features/userSlice";
import { modalProfileHandler } from "../../features/appSlice";
import DropMenu from "../../assets/DropMenu";
import useOutsideClick from "../../hooks/useOutsideClick";

function UserDropdown() {
    const dispatch = useDispatch();
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    useOutsideClick(dropdownRef, () => {
        setIsOpen(false);
    });

    const logout = () => {
        localStorage.removeItem("token");
        dispatch(setToken(null));
        dispatch(setIsCompleted(null));
        dispatch(
            updateUserInfo({
                id: null,
                email: "",
                name: "",
                surname: "",
            })
        );
    };

    return (
        <div
            ref={dropdownRef}
            className="relative flex items-center justify-center gap-2 p-1.5 pl-3 rounded-full border border-gray-300 cursor-pointer z-10 hover:bg-gray-100 duration-300"
            onClick={() => setIsOpen((prev) => !prev)}
        >
            <DropMenu className="w-10 h-6 text-gray-700" strokeWidth="4" />

            <span className="block w-10 h-10 bg-gray-600 rounded-full"></span>

            {isOpen && (
                <div
                    className={`w-48 border rounded-xl absolute -bottom-[calc(34*4px)] right-0 bg-white }`}
                >
                    <p
                        className="hover:bg-gray-100 px-2 py-1 mt-2 h-8 text-sm"
                        onClick={() => logout()}
                    >
                        Log out
                    </p>

                    <p className="hover:bg-gray-100 px-2 py-1 mb-2 h-8 text-sm"
                        // onClick={() => navigate('/account')}
                        onClick={() => dispatch(modalProfileHandler(true))}
                    >
                        Profile
                    </p>

                    <div className="border-t-[1px] border-gray-300"></div>

                    <p className="hover:bg-gray-100 px-2 py-1 mt-2 h-8 mb-2 text-sm">
                        Settings
                    </p>
                </div>
            )}
        </div>
    );
}

export default UserDropdown;
