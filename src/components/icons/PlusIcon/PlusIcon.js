import React from 'react'
import styles from './PlusIcon.module.css'
function PlusIcon({size, onClick}) {
    size = size ?? '50px';
    onClick = onClick ?? (() => {});
  return (
    <div className={styles.container} onClick={onClick} style={{height: size, width: size, minWidth: size}}>
        <div className={styles.line} />
        <div className={styles.line} />
    </div>
  )
}

export default PlusIcon