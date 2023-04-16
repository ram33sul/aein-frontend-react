import React from 'react'
import styles from './ButtonPost.module.css'
function ButtonPost({type, action, size, count}) {

    type = type === 'like' ? 'heart' : type;
    type = type || 'heart';
    size = size || '40px';
    count = count || 0;
    const foregroundColor = getComputedStyle(document.body).getPropertyValue('--foreground-color').trim();
    const imageSrc = `/icons/${foregroundColor}/${type}-icon-${foregroundColor}.png`;

  return (
    <div className={styles.container}>
        <div className={styles['image-wrapper']} style={{width: size, height: size, minHeight: size, minWidth: size}}>
            <img src={imageSrc} alt='icon' className={styles.image}/>
        </div>
        <div className={styles.count}>
            {count}
        </div>
    </div>
  )
}

export default ButtonPost