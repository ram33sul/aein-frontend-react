import React from 'react'

function SettingsIcon({active, height, width}) {

    height = height ?? '30px';
    width = width ?? '30px';
    const foregroundColor = 'var(--foreground-color)';
    const backgroundColor = 'var(--background-color)';
  return (
    <div style={{width, height}}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_1_2)">
        <circle cx="50" cy="50" r="47.5" stroke={active ? backgroundColor : foregroundColor} strokeWidth="5" strokeDasharray="10 10" fill={active ? foregroundColor : 'none'}/>
        <circle cx="49.5" cy="49.5" r="32.5" stroke={foregroundColor} strokeWidth="10" fill={active ? foregroundColor : 'none'}/>
        </g>
        </svg>
    </div>
  )
}

export default SettingsIcon;