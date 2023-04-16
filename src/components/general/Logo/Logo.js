import React from 'react'
import style from './Logo.module.css'
function Logo({width, height}) {

    const changeMode = () => {
        const theme = JSON.parse(localStorage.getItem("aein-app-theme"));
        if(theme === 'dark'){
            document.documentElement.style.setProperty('--background-color','white');
            document.documentElement.style.setProperty('--foreground-color','black');
            localStorage.setItem("aein-app-theme", JSON.stringify("light"));
        } else {
            document.documentElement.style.setProperty('--background-color','black');
            document.documentElement.style.setProperty('--foreground-color','white');
            localStorage.setItem("aein-app-theme", JSON.stringify("dark"));
        }
    }
  return (
    <div className={style.container} onClick={changeMode}>
        <img src='./icons/gold/Aein-logo-gold.PNG' alt='aein-logo' style={{width: width || '100px', height: height || ''}}/>
    </div>
  )
}

export default Logo