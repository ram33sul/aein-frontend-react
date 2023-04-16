import React from 'react'

function ExploreIcon({ active, height, width}) {

    height = height ?? '30px';
    width = width ?? '30px';

    const foregroundColor = 'var(--foreground-color)';
    const backgroundColor = 'var(--background-color)';
  return (
    <div style={{width, height}} >
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="explore-icon" clipPath="url(#clip0_1_2)" fill='none'>
            <circle id="circle" cx="50" cy="50" r="45" stroke={foregroundColor} strokeWidth="10" fill={active ? foregroundColor : 'none'}/>
            <path id="triangle1" d="M21.0711 22.0711L53.7113 42.4638L41.4638 54.7113L21.0711 22.0711Z" fill={active ? backgroundColor : foregroundColor}/>
            <path id="triangle2" d="M77.4264 78.4264L57.0336 45.7862L44.7862 58.0336L77.4264 78.4264Z" fill={active ? backgroundColor : foregroundColor}/>
        </g>
    </svg>
    </div>
  )
}

export default ExploreIcon