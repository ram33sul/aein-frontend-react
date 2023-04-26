import React from 'react'
import styles from './ReplyIcon.module.css'
function ReplyIcon({active, height, width, onClick}) {

    height = height ?? '25px';
    width = width ?? '25px';
    const foregroundColor = 'var(--foreground-color)';
  return (
    <div style={{height, width}} onClick={onClick}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
        <path d="M14.7925 58.4362C7.4434 54.7452 7.44339 44.2548 14.7925 40.5638L74.7618 10.4443C81.4118 7.10434 89.25 11.9389 89.25 19.3805V79.6195C89.25 87.0612 81.4118 91.8957 74.7618 88.5557L14.7925 58.4362Z" stroke={foregroundColor} className={styles.stroke} strokeWidth="10"/>
      </svg>
    </div>
  )
}

export default ReplyIcon;