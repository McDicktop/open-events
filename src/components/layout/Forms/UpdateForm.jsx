import { useState } from "react";
// import { formatDate, isDateValid } from "../../../utils";
// import man from "../../../assets/man.png";
// import woman from "../../../assets/woman.png";
import { updateUser } from "../../../services/user.api";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsCompleted, updateUserInfo } from "../../../features/userSlice";

function UpdateForm() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const [userInfo, setUserInfo] = useState({
        firstname: "Gleb",
        lastname: "Ovcharov",
        dateOfBirth: 1234,
        address: { country: "Russia", city: "Moscow", street: "Valovaya" },
        avatar: "url(...)",
        // status: true,

        
    });

    // const handleChange = (e, key) => {
    //     if (key === "dateOfBirth") {
    //         const formattedDate = formatDate(e.target.value);
    //         setUser((prev) => ({ ...prev, ["dateOfBirth"]: formattedDate }));
    //         return;
    //     }

    //     if (key === "firstname" || key === "lastname") {
    //         setUser((prev) => ({ ...prev, [key]: e.target.value }));
    //         return;
    //     }
    //     setUser((prev) => ({
    //         ...prev,
    //         ["address"]: {
    //             ...prev["address"],
    //             [key]: e.target.value,
    //         },
    //     }));
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUser(userInfo, user.token);
        dispatch(setIsCompleted(true));
        dispatch(updateUserInfo(user));
    };

    return (
        <div className="flex w-full h-screen bg-blue-50/80 flex items-center justify-center absolute top-0 left-0">
            <form className="flex flex-col justify-center items-center gap-[24px] border border-gray-200 rounded-3xl shadow-lg py-[40px] px-14 w-full max-w-[480px] bg-white">
                <div className="flex flex-col justify-center">
                    <div className="text-[32px] leading-[42px] font-semibold text-center text-gray-850 select-none">
                        Let's continue!
                    </div>
                    <p className="text-[16px] leading-[24px] mt-1 text-justify text-gray-500 w-[320px]">
                        Step 2: enter your name, date of birth and place you
                        live
                    </p>
                </div>

                <div className="flex flex-col items-center">
                    <div>
                        <input
                            className={`text-[16px] leading-[32px] h-[32px] outline-none border`}
                            type="text"
                            placeholder="Enter firstname"
                        />
                        <input
                            className={`text-[16px] leading-[32px] h-[32px] outline-none border`}
                            type="text"
                            placeholder="Enter lastname"
                        />
                    </div>

                    <button
                        className="w-full py-2 border mt-[8px] border-blue-400 rounded-xl text-[18px] font-semibold bg-blue-400 text-white cursor-pointer select-none duration-300 hover:bg-blue-500"
                        onClick={handleSubmit}
                    >{`Next`}</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateForm;
