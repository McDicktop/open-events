import React from "react";

function DropMenu({className = 'w-4 h-4', strokeWidth = '2'}) {
    return (
        <svg
            className={className}
            viewBox="0 0 72 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
        >
            <g id="menu">
                <path
                    id="Icon"
                    d="M12 21H60M12 36H60M12 51H60"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    );
}

export default DropMenu;
