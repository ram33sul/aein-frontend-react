import React from 'react'
import styles from './CommentIcon.module.css'
function CommentIcon({active, theme, width, height, onClick}) {

    height = height ?? '25px';
    width = width ?? '25px';
    const foregroundColor = 'var(--foreground-color)';
    const backgroundColor = 'var(--background-color)';
  return (
    <div style={{width, height}} onClick={onClick}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.icon} >
        <rect width="100" height="100" fill={backgroundColor}/>
        <mask id="path-1-inside-1_0_1" fill="white">
          <path fillRule="evenodd" clipRule="evenodd" d="M86.5111 64.6301C88.7583 59.5144 90 53.8958 90 48C90 24.2518 69.8528 5 45 5C20.1472 5 0 24.2518 0 48C0 71.7482 20.1472 91 45 91C53.2429 91 60.9682 88.8822 67.6124 85.185L99.3196 90.0482L86.5111 64.6301Z"/>
        </mask>
        <path className={styles.stroke} d="M86.5111 64.6301L77.3555 60.6083L75.4604 64.9223L77.5808 69.1302L86.5111 64.6301ZM67.6124 85.185L69.1285 75.3006L65.743 74.7813L62.75 76.4468L67.6124 85.185ZM99.3196 90.0482L97.8035 99.9326L116.981 102.874L108.25 85.5481L99.3196 90.0482ZM80 48C80 52.4765 79.0599 56.7282 77.3555 60.6083L95.6667 68.6519C98.4566 62.3006 100 55.315 100 48H80ZM45 15C64.7633 15 80 30.1982 80 48H100C100 18.3053 74.9424 -5 45 -5V15ZM10 48C10 30.1982 25.2367 15 45 15V-5C15.0576 -5 -10 18.3053 -10 48H10ZM45 81C25.2367 81 10 65.8018 10 48H-10C-10 77.6947 15.0576 101 45 101V81ZM62.75 76.4468C57.5703 79.329 51.5156 81 45 81V101C54.9703 101 64.3661 98.4354 72.4749 93.9232L62.75 76.4468ZM100.836 80.1638L69.1285 75.3006L66.0964 95.0694L97.8035 99.9326L100.836 80.1638ZM77.5808 69.1302L90.3893 94.5483L108.25 85.5481L95.4413 60.13L77.5808 69.1302Z" fill={foregroundColor} mask="url(#path-1-inside-1_0_1)"/>
      </svg>
    </div>
  )
}

export default CommentIcon;