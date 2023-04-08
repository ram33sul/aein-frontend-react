import React from 'react'
import styles from './UsernameText.module.css'
function UsernameText({username, fontSize, active}) {

    username = username || 'username';
    fontSize = fontSize || '17px';
    const color = active ? 'var(--gold-color)' : '';

  return (
    <div className={styles.container} style={{fontSize, color}}>
        {username}
    </div>
  )
}

export default UsernameText