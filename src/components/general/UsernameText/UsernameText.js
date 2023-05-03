import React from 'react'
import styles from './UsernameText.module.css'
function UsernameText({username, fontSize, active, onClick, opacity}) {

    username = username ?? 'username';
    fontSize = fontSize ?? '17px';
    onClick = onClick ?? (() => {})
    opacity ??= 1;
    const color = active ? 'var(--gold-color)' : '';

  return (
    <div className={styles.container} style={{fontSize, color, opacity}} onClick={onClick}>
        {username}
    </div>
  )
}

export default UsernameText