import React, { useState } from 'react'
import styles from './Settings.module.css'
import { changeTheme } from '../../../services/services';
import { useNavigate } from 'react-router-dom';
function Settings() {

  const [ theme, setTheme ] = useState(JSON.parse(localStorage.getItem("aein-app-theme")));

  const navigate = useNavigate()
  const handleChangeTheme = () => {
      setTheme(changeTheme())
  }
  return (
    <div className={styles.container}>
        <div className={styles.section}>
            <div className={styles.label}>
              Theme of app
            </div>
            <div className={styles.button} onClick={handleChangeTheme}>
              Change to <strong>{theme === 'dark' ? 'light' : 'dark'}</strong> mode
            </div>
        </div>
        <div className={styles.section}>
          <div className={styles.label}>
            Privacy settings
          </div>
          <div className={styles.button} onClick={() => navigate('/blockedUsers')}>
            View blocked users
          </div>
        </div>
    </div>
  )
}

export default Settings