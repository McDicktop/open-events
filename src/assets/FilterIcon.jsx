import React from "react";

function FilterIcon({ className = 'w-4 h-4', strokeWidth = '2'}) {
  return (
    <svg
      className={className}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="list-check">
        <path
          id="Icon"
          d="M9 33H39M9 21H39M9 45H27M38.7944 45.9943L46.4788 53.6787C47.6503 54.8502 49.5498 54.8502 50.7214 53.6787L64.923 39.4771"
          stroke="black"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export default FilterIcon;
