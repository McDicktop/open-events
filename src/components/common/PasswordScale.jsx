import { useState, useEffect } from "react";
import Mark from "../../assets/Mark";
import { passwordStrength } from "../../utils";
import InfoIcon from "../../assets/InfoIcon";
import { COLORS } from "../../constants";

// const COLORS_COPY = [...COLORS]

function PasswordScale({ password }) {
    const [strength, setStrength] = useState(0);
    const [isRules, setIsRules] = useState(false);

    useEffect(() => {
        setStrength(() => {
            if (!password) {
                return 0;
            }
            return passwordStrength(password);
        });
    }, [password]);

    const hasLowerAndUpper = (arg) => {
        return /[A-Z]/.test(arg) && /[a-z]/.test(arg);
    }


    return (
        <div className=" -mb-1">
            <div className="w-full mb-0.5 flex flex-row items-center justify-center">
                {/* {COLORS[strength]} */}
                <div className="flex items-center gap-1 h-[10px] w-[90%]">
                    {Array.from({ length: 4 }).map((el, ind) => (
                        <div
                            key={ind}
                            className={`w-1/4 h-full rounded-lg duration-200 ${ind + 1 <= strength
                                ? COLORS[strength]
                                : "bg-gray-100"
                                }`}
                        ></div>
                    ))}
                </div>

                <span
                    className={` mt-1 self-end flex justify-center gap-1.5 items-center w-[10%]`}
                >
                    <span
                        className={`h-[10px] flex items-center cursor-pointer ${isRules ? "rotate-0" : "rotate-180"
                            } duration-300 ease-in`}
                        onClick={() => {
                            setIsRules((prev) => !prev);
                        }}
                    >
                        <InfoIcon />
                    </span>
                </span>
            </div>

            <div
                className={`text-sm mt-2 mb-1 duration-500 linear overflow-hidden ${isRules ? "max-h-[1000px]" : "max-h-0"
                    } ${isRules ? "opacity-100" : "opacity-0"}`}
            >
                <p className="text-[16px] mb-1 font-semibold">
                    Your password must contain:
                </p>
                <div>
                    <div className="flex gap-2 text-gray-500">
                        <Mark
                            color={
                                password.length < 8
                                    ? "text-gray-500"
                                    : "text-green-500"
                            }
                        />
                        <span>At least 8 characters</span>
                    </div>
                    <div className="flex gap-2 text-gray-500">
                        <Mark
                            color={
                                !/[0-9]/.test(password)
                                    ? "text-gray-500"
                                    : "text-green-500"
                            }
                        />
                        <span>At least one number</span>
                    </div>
                    <div className="flex gap-2 text-gray-500">
                        <Mark
                            color={
                                !hasLowerAndUpper(password)
                                    ? "text-gray-500"
                                    : "text-green-500"
                            }
                        />
                        <span>
                            At least one lowercase and one uppercase letter
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PasswordScale;
