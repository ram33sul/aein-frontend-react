import React from 'react'
import styles from './MoreOptionIcon.module.css'
function MoreOptionIcon({onClick, onBlur}) {
    onClick = onClick ?? (() => {});
    onBlur = onBlur ?? (() => {});
  return (
    <div className={styles.container} onClick={onClick} onBlur={onBlur}>
        <div className={styles.round} />
        <div className={styles.round} />
        <div className={styles.round} />
    </div>
  )
}

export default MoreOptionIcon