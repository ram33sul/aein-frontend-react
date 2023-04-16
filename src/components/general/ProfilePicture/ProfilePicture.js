import React from 'react'
import styles from './ProfilePicture.module.css'
function ProfilePicture({imageSrc, size, borderColor, borderWidth, onClick}) {

    size = size ?? '50px';
    borderColor = borderColor ?? '';
    borderWidth = borderWidth ?? '';
    onClick = onClick ?? (() => {});
  return (
    <div className={styles.container} style={{borderColor, borderWidth, width: size, height: size, minWidth: size, minHeight: size}} onClick={onClick}>
        { imageSrc ? <img src={imageSrc} alt='profile' className={styles.image} /> :
        <div className={styles["round-wrapper"]}> <div className={styles.round} />
        <div className={styles.round} /> </div>}
    </div>
  )
}

export default ProfilePicture