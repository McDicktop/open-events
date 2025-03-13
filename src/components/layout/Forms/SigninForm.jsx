import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/user.api";
import O2Auth from "../../common/O2Auth";
import InputField from "../../common/InputField";
import EmailIcon from "../../../assets/EmailIcon";
import PasswordIcon from "../../../assets/PasswordIcon";
import { O2AUTH_PROVIDERS } from "../../../constants";

function SigninForm() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e, key) => {
        setUser((prev) => ({ ...prev, [key]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await loginUser(user);

        if (!res.message) {
            localStorage.setItem("token", res.token);
            navigate("/");
            return;
        }
        console.log(res.response.data.message);
    };

    return (
        <form className="flex flex-col justify-center items-center gap-[24px] border border-gray-200 rounded-3xl shadow-lg py-[40px] px-14 w-full max-w-[480px] bg-white">

            <div className="text-[32px] leading-[42px] font-semibold text-center text-gray-850 select-none">
                Welcome back!
            </div>

            <div className="flex flex-col gap-[16px] mt-1 w-full">
                <div className="flex flex-col gap-[12px]">
                    <InputField
                        type="email"
                        value={user.email}
                        handleChange={(e) => handleChange(e, "email")}
                        placeholder="Enter your email address"
                        icon={<EmailIcon />}
                    />
                    <InputField
                        type="password"
                        value={user.password}
                        handleChange={(e) => handleChange(e, "password")}
                        placeholder="Enter your password"
                        isPassword={true}
                        icon={<PasswordIcon />}
                    />
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
                    Don't have an account yet?
                </div>
                <div
                    className="text-[16px] font-semibold cursor-pointer text-blue-600 underline"
                    onClick={() => navigate("/signup")}
                >
                    Sign up
                </div>
            </div>

        </form>
    );
}

export default SigninForm;
