import React, { useState } from 'react'
import styles from './ShareIcon.module.css'
import SharePopup from '../../general/SharePopup/SharePopup';
function ShareIcon({active, height, width, postId, profileId, text}) {

    height = height ?? '25px';
    width = width ?? '25px';

    const foregroundColor = 'var(--foreground-color)';

    const [ sharePopup, setSharePopup ] = useState(null);

    const handleClick = () => {
      if(postId){
        return () => {
          const data = {
            link: `localhost:3000/postDetails?id=${postId}`,
            content: postId,
            type: 'post'
          }
          setSharePopup(data)
        }
      }
      if(profileId){
        return () => {
          const data = {
            link: `localhost:3000/profile?userId= ${profileId}`,
            content: profileId,
            type: 'profile'
          }
          setSharePopup(data)
        }
      }
    }



  return (
    sharePopup ? 
    <SharePopup data={sharePopup} handleClose={() => setSharePopup(null)} />
    : 
    <div style={{width, height}} onClick={handleClick()}>
      {
        text ? 
        <div className={styles.text} >
          {text}
        </div> :
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
        <path d="M76.64 10.5413C84.8853 7.10061 93.1605 15.3758 89.7198 23.6211L63.6317 86.1383C60.8915 92.7051 52.3634 94.3898 47.3319 89.3583L10.9027 52.9291C5.87128 47.8977 7.55599 39.3696 14.1227 36.6294L76.64 10.5413Z" stroke={foregroundColor} strokeWidth="10" className={styles.stroke}/>
        <rect x="26" y="67.5685" width="80" height="10" transform="rotate(-45 26 67.5685)" fill={foregroundColor} className={styles.stroke2}/>
      </svg> }
    </div>
  )
}

export default ShareIcon;