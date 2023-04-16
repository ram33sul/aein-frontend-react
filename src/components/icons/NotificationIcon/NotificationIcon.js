import React from 'react'

function NotificationIcon({active, height, width}) {

    height = height ?? '30px';
    width = width ?? '30px';
    const foregroundColor = 'var(--foreground-color)';

  return (
    <div style={{height, width}}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="notification-icon" clipPath="url(#clip0_0_1)">
                <path id="triangle" d="M58.0183 30.9634L92.0394 59.4106C101 66.9035 95.702 81.5 84.0211 81.5H15.9789C4.29802 81.5 -1.00042 66.9034 7.96058 59.4106L41.9817 30.9634C46.6229 27.0826 53.3771 27.0826 58.0183 30.9634Z" stroke={foregroundColor} strokeWidth="5" fill={active ? foregroundColor : 'none'}/>
                <circle id="circle1" cx="50" cy="15" r="12.5" stroke={foregroundColor} strokeWidth="5" fill={active ? foregroundColor : 'none'}/>
                <circle id="circle2" cx="50" cy="90" r="7.5" stroke={foregroundColor} strokeWidth="5" fill={active ? foregroundColor : 'none'}/>
            </g>
        </svg>
    </div>
  )
}

export default NotificationIcon;