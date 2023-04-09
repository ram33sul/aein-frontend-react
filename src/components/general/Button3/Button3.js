import React from 'react'
import styles from './Button3.module.css'
import Loading from '../Loading/Loading';
import { useSelector } from 'react-redux';
function Button3({fill, imageType, size, onClick, loading}) {

    const theme = useSelector((state) => state.theme);
    imageType = imageType ?? 'filter'
    size = size ?? '40px';
    const backgroundColor = fill ? theme.foregroundColor : theme.backgroundColor;
    const color = fill ? theme.backgroundColor : theme.foregroundColor;

    let imageSrc = `./icons/${color}/${imageType}-icon-${color}.png`;

    onClick = (loading || !onClick) ? (() => {}) : onClick;

  return (
    <div onClick={onClick} className={styles.container} style={{height: size, width: size, minWidth: size, minHeight: size, backgroundColor, color}}>
        <img src={imageSrc} alt='icon' className={styles.image}/>
        { loading ? <div className={styles.loading}> <Loading scale='0.4'/> </div> : '' }
    </div>
  )
}

export default Button3