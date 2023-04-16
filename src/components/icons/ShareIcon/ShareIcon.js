import React from 'react'

function ShareIcon({active, height, width}) {

    height = height ?? '20px';
    width = width ?? '20px';
    const foregroundColor = 'var(--foreground-color)';
    const backgroundColor = 'var(--background-color)';
  return (
    <div style={{width, height}}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_0_1)">
    <rect width="100" height="100" fill="white"/>
    <path d="M42.6937 95.0098L4.80778 4.85168L94.9659 42.7376L42.6937 95.0098Z" stroke={foregroundColor} strokeWidth="5"/>
    <path d="M5.5 6L69.5 69.5" stroke={foregroundColor} strokeWidth="5"/>
    </g>
    </svg>
    </div>
  )
}

export default ShareIcon;