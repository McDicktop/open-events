import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import HidePass from "../../assets/HidePass";
import ShowPass from "../../assets/ShowPass";

import './InputField.css'

function InputField({
    value,
    handleChange,    
    type,
    placeholder,
    isPassword = false,
    icon,
    color='border-gray-400',
    handleBlur=null
    // handleBlur=()=>(1),
}) {
    const input_id = uuidv4();

    const [isValueVisible, setIsValueVisible] = useState(!isPassword);


    const togglePasswordVisibility = () => {
        setIsValueVisible((prev) => !prev);
    };

    return (
        <div className={`input_wrapper ${color !== 'border-gray-400' ? 'custom' : ''} flex flex-row border ${color} rounded-xl px-3 py-2 w-[100%] gap-3 relative duration-300`}>
            <label
                className="w-[32px] h-[32px] flex items-center justify-center"
                htmlFor={input_id}
            >
                {icon}
            </label>
            <span className="h-[32px] w-[1px] bg-gray-300"></span>
            <input
                className={`text-[16px] leading-[32px] h-[32px] w-[calc(100%-${isPassword ? '98px' : '20px'})] outline-none`}
                type={isPassword ? (isValueVisible ? "text" : type) : type}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                onBlur={handleBlur}
                id={input_id}
            />

            {isPassword && (
                <span
                    className="w-[32px] h-[32px] cursor-pointer absolute right-3 top-2 flex justify-center items-center"
                    onClick={togglePasswordVisibility}
                >
                    {isValueVisible ? <ShowPass /> : <HidePass />}
                </span>
            )}
        </div>
    );
}

export default InputField;
