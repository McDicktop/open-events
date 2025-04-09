function HeartIcon({
    className = "w-4 h-4",
    color = "#fff",
    fill = "transparent",
}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 72 72"
            className={className}
            fill={fill}
        >
            <g id="heart">
                <path
                    id="Icon"
                    d="M58.6066 16.3934C64.4644 22.2513 64.4644 31.7488 58.6066 37.6066L38.1213 58.0919C36.9497 59.2635 35.0502 59.2635 33.8786 58.0919L13.3934 37.6066C7.53553 31.7488 7.53553 22.2513 13.3934 16.3934C18.0504 11.7364 23.6717 10.3105 29.3438 13.0782C31.595 14.1767 34.5468 16.3934 36 19.2891C37.4531 16.3934 40.4049 14.1767 42.6562 13.0782C48.3283 10.3105 53.9496 11.7364 58.6066 16.3934Z"
                    stroke={color}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    );
}

export default HeartIcon;
