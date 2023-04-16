import React from 'react'
import styles from './Button3.module.css'
import Loading from '../Loading/Loading';
function Button3({fill, imageType, size, onClick, loading}) {

    imageType = imageType ?? 'filter'
    size = size ?? '40px';
    const backgroundColor = fill ? 'var(--foreground-color)' : 'var(--background-color)';
    const color = fill ? 'var(--background-color)' : 'var(--foreground-color)';

    const foregroundColor = getComputedStyle(document.body).getPropertyValue('--foreground-color').trim();
    let imageSrc = `./icons/${fill ? foregroundColor : foregroundColor}/${imageType}-icon-${fill ? foregroundColor : foregroundColor}.png`;

    onClick = (loading || !onClick) ? (() => {}) : onClick;

  return (
    <div onClick={onClick} className={styles.container} style={{height: size, width: size, minWidth: size, minHeight: size, backgroundColor, color}}>
        <img src={imageSrc} alt='icon' className={styles.image}/>
        { loading ? <div className={styles.loading}> <Loading scale='0.4'/> </div> : '' }
    </div>
  )
}

export default Button3