import React from 'react'
import style from './Logo.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { changeToDark, changeToLight } from '../../../redux/theme/themeActions';
function Logo({width, height}) {

    const dispath = useDispatch();
    const theme = useSelector((state) => state.theme);
    const changeMode = () => {
        if(theme.theme === 'light'){
            dispath(changeToDark());
        } else {
            dispath(changeToLight());
        }
    }
  return (
    <div className={style.container} onClick={changeMode}>
        <img src='./icons/gold/Aein-logo-gold.PNG' alt='aein-logo' style={{width: width || '100px', height: height || ''}}/>
    </div>
  )
}

export default Logo