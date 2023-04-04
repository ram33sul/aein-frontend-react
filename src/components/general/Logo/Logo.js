import React from 'react'
import style from './Logo.module.css'
function Logo({width, height}) {

    const changeMode = () => {
        const mode = JSON.parse(localStorage.getItem('aein-app-mode'));
        if(mode){
            document.documentElement.style.setProperty('--background-color','white');
            document.documentElement.style.setProperty('--foreground-color','black');
            localStorage.setItem('aein-app-mode',JSON.stringify(false));
        } else {
            document.documentElement.style.setProperty('--background-color','black');
            document.documentElement.style.setProperty('--foreground-color','white');
            localStorage.setItem('aein-app-mode',JSON.stringify(true));
        }
    }
  return (
    <div className={style.container} onClick={changeMode}>
        <img src='./icons/gold/Aein-logo-gold.PNG' alt='aein-logo' style={{width: width || '100px', height: height || ''}}/>
    </div>
  )
}

export default Logo