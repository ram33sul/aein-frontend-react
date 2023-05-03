import React from 'react';
import styles from './Loading.module.css'

function Loading({ scale, position, top, left, right, bottom }) {
    scale = scale ?? 1;
  return (
    <div className={styles.container} style={{transform: `scale(${scale})`, position, top, left, right, bottom}}>
        <div className={styles["round"]}></div>
        <div className={styles["round"]}></div>
        <div className={styles["round"]}></div>
    </div>
  )
}

export default Loading