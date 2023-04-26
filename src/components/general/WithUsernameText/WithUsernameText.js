import React from 'react'
import styles from './WithUsernameText.module.css'
function WithUsernameText({username, fontSize, onClick}) {

    username = username || 'username';
    fontSize = fontSize || '15px';
    
  return (
    <div className={styles.container} style={{fontSize}} onClick={onClick}>
        with {username}
    </div>
  )
}

export default WithUsernameText