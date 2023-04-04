import React from 'react'
import styles from './Button3.module.css'
function Button3({fill, imageType, size, onClick}) {

    imageType = imageType ?? 'filter'
    size = size ?? '40px';
    const backgroundColor = fill ? 'var(--foreground-color)' : 'var(--background-color)';
    const color = fill ? 'var(--background-color)' : 'var(--foreground-color)';

    let imageSrc = `./icons/${fill ? 'white' : 'black'}/${imageType}-icon-${fill ? 'white' : 'black'}.png`;


  return (
    <div onClick={onClick} className={styles.container} style={{height: size, width: size, minWidth: size, minHeight: size, backgroundColor, color}}>
        <img src={imageSrc} alt='icon' className={styles.image}/>
    </div>
  )
}

export default Button3