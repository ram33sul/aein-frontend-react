import React from 'react'

function FeedIcon({scale, active, height, width, opacity}) {

    height = height ?? '30px';
    width = width ?? '30px';
    const foregroundColor = 'var(--foreground-color)';
    const backgroundColor = 'var(--background-color)';
  return (
    <div style={{height, width }}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" opacity={opacity}>
        <g id="feed-icon" clipPath="url(#clip0_0_1)" fill='none'>
            <rect id="Rectangle1" x="5" y="5" width="90" height="90" rx="25" strokeWidth="10" fill={active ? foregroundColor : 'none'} style={{stroke: foregroundColor}}/>
            <rect id="Rectangle2" x="18" y="19" width="50" height="15" rx="5" fill={active ? backgroundColor : foregroundColor}/>
            <rect id="Rectangle3" x="46" y="43" width="42" height="15" rx="5" fill={active ? backgroundColor : foregroundColor}/>
            <rect id="Rectangle4" x="18" y="67" width="62" height="15" rx="5" fill={active ? backgroundColor : foregroundColor}/>
        </g>
    </svg>
    </div>
  )
}

export default FeedIcon;