import React from 'react'
import styles from './ButtonPost.module.css'
import { useSelector } from 'react-redux';
function ButtonPost({type, action, size, count}) {

    type = type === 'like' ? 'heart' : type;
    type = type || 'heart';
    size = size || '40px';
    count = count || 0;
    const theme = useSelector((state) => state.theme);
    const imageSrc = `/icons/${theme.foregroundColor}/${type}-icon-${theme.foregroundColor}.png`;

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