import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../common/InputField";
import PasswordScale from "../../common/PasswordScale";
import O2Auth from "../../common/O2Auth";
import { O2AUTH_PROVIDERS } from "../../../constants";

import EmailIcon from "../../../assets/EmailIcon";
import PasswordIcon from "../../../assets/PasswordIcon";
import RepeatPassword from "../../../assets/RepeatPassword";
import { passwordStrength } from "../../../utils";
import { COLORS } from "../../../constants";
import * as EmailValidator from "email-validator";
import { createUser } from "../../../services/user.api";
import { useDispatch } from "react-redux";
import { setToken, updateUserInfo } from "../../../features/userSlice";

function SignupForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        role: "user",
        email: "",
        password: "",
        repeatPassword: "",
    });

    const [borderColor, setBorderColor] = useState({
        email: "border-gray-400",
        repeatPassword: "border-gray-400",
    });

    const handleBlur = (key) => {
        switch (key) {
            case "email": {
                EmailValidator.validate(user.email)
                    ? setBorderColor((prev) => ({
                        ...prev,
                        [key]: "border-green-500",
                    }))
                    : setBorderColor((prev) => ({
                        ...prev,
                        [key]: "border-red-600",
                    }));
                break;
            }
            case "password": {
                if (!user.password && !user.repeatPassword) {
                    setBorderColor((prev) => ({
                        ...prev,
                        ["repeatPassword"]: "border-gray-400",
                    }));
                    return;
                }
                setBorderColor((prev) => ({
                    ...prev,
                    ["repeatPassword"]:
                        user.password === user.repeatPassword
                            ? "border-green-500"
                            : "border-red-600",
                }));
                break;
            }
            default: {
                if (!user.password && !user.repeatPassword) {
                    setBorderColor((prev) => ({
                        ...prev,
                        ["repeatPassword"]: "border-gray-400",
                    }));
                    return;
                }
                setBorderColor((prev) => ({
                    ...prev,
                    [key]:
                        user.password === user.repeatPassword
                            ? "border-green-500"
                            : "border-red-600",
                }));
                break;
            }
        }
    };

    const handleChange = (e, key) => {
        if (key !== "password") {
            setBorderColor((prev) => ({ ...prev, [key]: "border-gray-400" }));
        }
        setUser((prev) => ({ ...prev, [key]: e.target.value }));
    };

    const isFormValid = (arg) => {
        return (
            arg.email &&
            arg.password &&
            arg.password === arg.repeatPassword &&
            (arg.role === 'user' || arg.role === 'creator') &&
            passwordStrength(user.password) > 1 &&
            EmailValidator.validate(user.email) &&
            document.getElementById("rules").checked
        );
    };

    const getColorByStrenght = (password) => {
        if (password.length < 1) return "border-gray-400";
        return `border-${COLORS[passwordStrength(password)]}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid(user)) {
            alert("invalid form data");
            return;
        }

        const res = await createUser(user);


        if (!res.message) {
            localStorage.setItem('token', res.token);

            dispatch(setToken(res.token));
            dispatch(updateUserInfo({ id: res.user._id }));

            navigate('/')
            return;
        }
        alert(res.response.data.message);
    };


    const [hoverOffset, setHoverOffset] = useState(0);

    function handleMouseOver(index) {
        const presentIndex = user.role === "user" ? 0 : 1;

        const distance = Math.abs(index - presentIndex);
        const direction = index > presentIndex ? 1 : -1;
        const step_offset_px = 6;

        setHoverOffset(direction * (distance * step_offset_px));
    }

    function handleMouseLeave() {
        setHoverOffset(0);
    }

    const handleRadioChange = (value) => {
        setUser((prev) => ({ ...prev, ["role"]: value }));
        setHoverOffset(0);
    };

    return (
        <form className="flex flex-col justify-center items-center gap-[24px] border border-gray-200 rounded-3xl shadow-lg py-[40px] px-14 w-full max-w-[480px] bg-white">
            <div className="flex flex-col justify-center">
                <div className="text-[32px] leading-[42px] font-semibold text-center text-gray-850 select-none">
                    Get started!
                </div>
                <p className="text-[16px] leading-[24px] mt-1 text-center text-gray-500">
                    Step 1: choose role then enter email and password
                </p>
            </div>

            <div className="flex justify-center border border-gray-200 bg-gray-100 rounded-3xl p-1 relative w-64">
                <div
                    className={`absolute bg-blue-400 top-1 w-[calc(50%-0.25rem)] h-[calc(100%-0.5rem)] rounded-3xl z-10 ease-in-out duration-300`}
                    style={{
                        left:
                            user.role === "user"
                                ? `calc(0.25rem + ${hoverOffset}px)`
                                : `calc(50% + ${hoverOffset}px)`,
                    }}
                ></div>

                <div
                    className={`w-1/2 text-center relative z-20`}
                    onMouseOver={() => handleMouseOver(0)}
                    onMouseLeave={() => handleMouseLeave()}
                >
                    <input
                        className="hidden"
                        type="radio"
                        id="user"
                        value="user"
                        checked={user.role === "user"}
                        onChange={() => handleRadioChange("user")}
                    />
                    <label
                        htmlFor="user"
                        className={`block w-full cursor-pointer rounded-3xl leading-10 select-none ease-in duration-300 ${user.role === "user"
                            ? "text-white"
                            : "text-gray-700"
                            } font-semibold`}
                    >
                        Participant
                    </label>
                </div>

                <div
                    className={`w-1/2 text-center relative z-20`}
                    onMouseOver={() => handleMouseOver(1)}
                    onMouseLeave={() => handleMouseLeave()}
                >
                    <input
                        className="hidden"
                        type="radio"
                        id="creator"
                        value="creator"
                        checked={user.role === "creator"}
                        onChange={() => handleRadioChange("creator")}
                    />
                    <label
                        htmlFor="creator"
                        className={`block w-full cursor-pointer rounded-3xl leading-10 select-none ease-in duration-300 ${user.role === "creator"
                            ? "text-white"
                            : "text-gray-700"
                            } font-semibold`}
                    >
                        Organizer
                    </label>
                </div>
            </div>

            <div className="flex flex-col gap-[16px] mt-1 w-full">
                <div className="flex flex-col gap-[12px]">
                    <InputField
                        type="email"
                        value={user.email}
                        handleChange={(e) => handleChange(e, "email")}
                        placeholder="Enter your email address"
                        icon={<EmailIcon className={'w-8 h-8'} strokeWidth={'1.5'} />}
                        color={borderColor.email}
                        handleBlur={() => handleBlur("email")}
                    />
                    <InputField
                        type="password"
                        value={user.password}
                        handleChange={(e) => handleChange(e, "password")}
                        placeholder="Enter your password"
                        isPassword={true}
                        icon={<PasswordIcon />}
                        color={getColorByStrenght(user.password)}
                        handleBlur={() => handleBlur("password")}
                    />

                    <PasswordScale password={user.password} />

                    <InputField
                        type="password"
                        value={user.repeatPassword}
                        handleChange={(e) => handleChange(e, "repeatPassword")}
                        placeholder="Enter password again"
                        isPassword={true}
                        icon={<RepeatPassword />}
                        color={borderColor.repeatPassword}
                        handleBlur={() => handleBlur("repeatPassword")}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="rules"
                        className="w-5 h-5 cursor-pointer"
                    />
                    <label
                        htmlFor="rules"
                        className="select-none text-[14px] leading-[18px] text-justify text-gray-500"
                    >
                        I agree with terms of{" "}
                        <span className="text-blue-600 font-semibold underline cursor-pointer">
                            Service
                        </span>{" "}
                        and{" "}
                        <span className="text-blue-600 font-semibold underline cursor-pointer">
                            Privacy Policy
                        </span>
                    </label>
                </div>

                <button
                    className="w-full py-2 border mt-[8px] border-blue-400 rounded-xl text-[18px] font-semibold bg-blue-400 text-white cursor-pointer select-none duration-300 hover:bg-blue-500"
                    onClick={handleSubmit}
                >{`Next`}</button>

                <div className="flex justify-center items-center h-[24px]">
                    <div className="border-b h-[0px] mr-5 w-41 border-gray-300" />
                    <div className="font-bold -mt-1 text-gray-600 select-none">
                        or
                    </div>
                    <div className="border-b h-[0px] ml-5 w-41 border-gray-300" />
                </div>
            </div>


            <O2Auth providers={O2AUTH_PROVIDERS} />

            <div className="flex text-xs gap-2 justify-center select-none">
                <div className="text-[16px] text-gray-500">
                    Already have an account?
                </div>
                <div
                    className="text-[16px] font-semibold cursor-pointer text-blue-600 underline"
                    onClick={() => navigate('/signin')}
                >
                    Log in
                </div>
            </div>
        </form>
    );
}

export default SignupForm;
