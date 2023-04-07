import React from 'react';
import styles from './Loading.module.css'

function Loading({ scale }) {
    scale = scale ?? 1;
  return (
    <div className={styles.container} style={{transform: `scale(${scale})`}}>
        <div className={styles["round"]}></div>
        <div className={styles["round"]}></div>
        <div className={styles["round"]}></div>
    </div>
  )
}

export default Loading