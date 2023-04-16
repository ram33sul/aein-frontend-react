import React from 'react'
import styles from './UsernameText.module.css'
function UsernameText({username, fontSize, active, onClick}) {

    username = username ?? 'username';
    fontSize = fontSize ?? '17px';
    onClick = onClick ?? (() => {})
    const color = active ? 'var(--gold-color)' : '';

  return (
    <div className={styles.container} style={{fontSize, color}} onClick={onClick}>
        {username}
    </div>
  )
}

export default UsernameText