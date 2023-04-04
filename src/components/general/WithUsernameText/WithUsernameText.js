import React from 'react'
import styles from './WithUsernameText.module.css'
function WithUsernameText({username, fontSize}) {

    username = username || 'username';
    fontSize = fontSize || '15px';
    
  return (
    <div className={styles.container} style={{fontSize}}>
        with {username}
    </div>
  )
}

export default WithUsernameText