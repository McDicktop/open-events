import React from "react";

function EventDefaultIcon({ className = "w-4 h-4", strokeWidth = "2" }) {
    return (
        <svg
            className={className}
            viewBox="0 0 72 72"
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="none"
        >
            <g id="store">
                <path
                    id="Icon"
                    d="M60 34.8633V54C60 57.3137 57.3137 60 54 60H18C14.6863 60 12 57.3137 12 54V34.8633M22.5 29.25C22.5 32.9779 19.4779 36 15.75 36C12.2819 36 9.42472 33.3845 9.04326 30.0185C8.98572 29.5107 9.06529 28.9997 9.1943 28.5052L12.3299 16.4855C13.0191 13.8435 15.4052 12 18.1356 12H53.8644C56.5948 12 58.9809 13.8435 59.6701 16.4855L62.8057 28.5052C62.9347 28.9997 63.0143 29.5107 62.9567 30.0185C62.5753 33.3845 59.7181 36 56.25 36C52.5221 36 49.5 32.9779 49.5 29.25M22.5 29.25C22.5 32.9779 25.5221 36 29.25 36C32.9779 36 36 32.9779 36 29.25M22.5 29.25L24 12M36 29.25C36 32.9779 39.0221 36 42.75 36C46.4779 36 49.5 32.9779 49.5 29.25M36 29.25V12M49.5 29.25L48 12"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </g>
        </svg>
    );
}

export default EventDefaultIcon;
