import React from "react";

function ProfileIcon({ className = "w-4 h-4", strokeWidth = "2" }) {
    return (
        <svg
            className={className}
            viewBox="0 0 72 72"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
        >
            <g id="user">
                <g id="Icon">
                    <path
                        d="M51 60C54.3137 60 57.1363 57.2698 56.3852 54.0424C54.5169 46.0141 48.269 42 36 42C23.731 42 17.4831 46.0141 15.6148 54.0424C14.8637 57.2698 17.6863 60 21 60H51Z"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M36 33C42 33 45 30 45 22.5C45 15 42 12 36 12C30 12 27 15 27 22.5C27 30 30 33 36 33Z"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
            </g>
        </svg>
    );
}

export default ProfileIcon;
