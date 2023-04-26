import React from 'react'
import styles from './DislikeIcon.module.css'
function DislikeIcon({active, height, width, onClick}) {

    height = height ?? '25px';
    width = width ?? '25px';
    const foregroundColor = 'var(--foreground-color)';
    const backgroundColor = 'var(--background-color)';
  return (
    <div style={{width, height}} onClick={onClick}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
        <circle cx="49.5" cy="49.5" r="42.5" stroke={active ? 'red' : foregroundColor} strokeWidth="10" className={styles.stroke} fill={active ? 'red' : 'none'}/>
        <rect x="25" y="67" width="60" height="10" rx="5" transform="rotate(-45 25 67)" fill={active ? backgroundColor : foregroundColor} className={styles.stroke2}/>
        <rect x="32.0711" y="24.5736" width="60" height="10" rx="5" transform="rotate(45 32.0711 24.5736)" className={styles.stroke2} fill={active ? backgroundColor : foregroundColor}/>
      </svg>
    </div>
    
  )
}

export default DislikeIcon;