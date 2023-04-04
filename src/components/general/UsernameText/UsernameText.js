import React from 'react'
import styles from './UsernameText.module.css'
function UsernameText({username, fontSize}) {

    username = username || 'username';
    fontSize = fontSize || '17px';
  return (
    <div className={styles.container} style={{fontSize}}>
        {username}
    </div>
  )
}

export default UsernameText