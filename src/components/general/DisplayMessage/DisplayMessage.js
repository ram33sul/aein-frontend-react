import React from 'react';
import styles from './DisplayMessage.module.css';

function DisplayMessage({message, color, onClick}) {

    message = message ?? 'message';
    color = color ?? '';
    onClick = onClick ?? (() => {});
  return (
    <div className={styles.background}>
        <div className={styles.container}>
            <div className={styles.message} style={{color}}>
                {message}
            </div>
            <div className={styles.button} onClick={onClick}>
                OKAY
            </div>
        </div>
    </div>
  )
};

export default DisplayMessage;