import React from 'react'
import style from './Logo.module.css'
import { changeTheme } from '../../../services/services'
function Logo({width, height}) {

    const changeMode = () => {
        changeTheme()
    }
  return (
    <div className={style.container} onClick={changeMode}>
        <img src='./icons/gold/Aein-logo-gold.PNG' alt='aein-logo' style={{width: width || '100px', height: height || ''}}/>
    </div>
  )
}

export default Logo