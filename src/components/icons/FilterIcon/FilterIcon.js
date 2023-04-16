import React from 'react'
import styles from './FilterIcon.module.css'
function FilterIcon({size, onClick, hi}) {
    size = size ?? '50px';
    onClick = onClick ?? (() => {})
  return (
    <div className={styles.container} onClick={hi} style={{height: size, width: size, minWidth: size}}>
        <div className={styles.line} />
        <div className={styles.line} />
        <div className={styles.line} />
    </div>
  )
}

export default FilterIcon