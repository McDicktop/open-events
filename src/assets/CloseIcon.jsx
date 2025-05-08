import React from 'react'

function CloseIcon({ className = 'w-4 h-4', strokeWidth = '2' }) {
    return (
        <svg className={className} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="close">
                <path id="Icon" d="M18 18L54 54M54 18L18 54" stroke="black" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
            </g>
        </svg>

    )
}

export default CloseIcon