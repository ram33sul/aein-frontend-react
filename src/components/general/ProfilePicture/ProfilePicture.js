import React from 'react'
import styles from './ProfilePicture.module.css'
function ProfilePicture({imageSrc, size, borderColor, borderWidth}) {

    size = size || '50px';
    imageSrc = imageSrc || '';
    borderColor = borderColor || '';
    borderWidth = borderWidth || '';

  return (
    <div className={styles.container} style={{borderColor, borderWidth, width: size, height: size, minWidth: size}}>
        <img src='/images/ronaldo.jpeg' alt='profile' className={styles.image} />
    </div>
  )
}

export default ProfilePicture