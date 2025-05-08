import React from "react";

function SearchIcon({ className = 'w-4 h-4', strokeWidth = '2' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="search">
        <path
          id="Icon"
          d="M40.1673 40.1673L57 57M28.5 45C37.6127 45 45 37.6127 45 28.5C45 19.3873 37.6127 12 28.5 12C19.3873 12 12 19.3873 12 28.5C12 37.6127 19.3873 45 28.5 45Z"
          stroke="black"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export default SearchIcon;
