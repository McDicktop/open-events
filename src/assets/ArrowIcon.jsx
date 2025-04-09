import React from "react";

function ArrowIcon({ className = "w-4 h-4", strokeWidth = "2" }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            strokeWidth={strokeWidth}
        >
            <path
                d="M8 20.75C8.19906 20.751 8.39011 20.6717 8.53 20.53L16.53 12.53C16.8224 12.2372 16.8224 11.7628 16.53 11.47L8.53 3.47003C8.23449 3.19467 7.77399 3.2028 7.48837 3.48841C7.20276 3.77402 7.19464 4.23452 7.47 4.53003L14.94 12L7.47 19.47C7.17754 19.7628 7.17754 20.2372 7.47 20.53C7.60988 20.6717 7.80093 20.751 8 20.75Z"
                fill="black"
            />
        </svg>
    );
}

export default ArrowIcon;
