import React from 'react'

function NotificationIcon({active, height, width}) {

    height = height ?? '30px';
    width = width ?? '30px';
    const foregroundColor = 'var(--foreground-color)';

  return (
    <div style={{height, width}}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="notification-icon" clipPath="url(#clip0_0_1)">
                <rect width="100" height="100" fill="none"/>
                <path id="triangle" d="M56.4146 32.8813L90.4358 61.3285C97.6046 67.3228 93.3658 79 84.0211 79H15.9789C6.6342 79 2.39543 67.3228 9.56424 61.3285L43.5854 32.8813C47.2983 29.7767 52.7017 29.7767 56.4146 32.8813Z" stroke={foregroundColor} strokeWidth="10" fill={active ? foregroundColor : 'none'}/>
                <circle id="circle1" cx="50" cy="15" r="10" stroke={foregroundColor} strokeWidth="10" fill={active ? foregroundColor : 'none'}/>
                <circle id="circle2" cx="50" cy="90" r="5" stroke={foregroundColor} strokeWidth="10" fill={active ? foregroundColor : 'none'}/>
            </g>
        </svg>
    </div>

  )
}

export default NotificationIcon;