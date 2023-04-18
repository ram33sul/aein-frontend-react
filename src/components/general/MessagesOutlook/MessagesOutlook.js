import React from 'react'
import styles from './MessagesOutlook.module.css'
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import UsernameText from '../UsernameText/UsernameText';
function MessagesOutlook({imageSrc, username, message, notificationCount, setValueChat, onClick, bold}) {

    imageSrc = imageSrc ?? '';
    username = username ?? 'username';
    message = message ?? 'messages this jl sljf s ljd fdlfjd dljf dfj dfdjfdf jdfjdf jd qlj dfj dfkjdf djfjd fdjfhd jdfd jdfjdhf kdfh kfhk kdfjkhdfj dkjfhkjdhf dkfkjd mjdh kdhf h dfkh dkhdf kdhf dkfhdf dfihf ddkfhdf ';
    notificationCount = notificationCount ?? 0;
    notificationCount = notificationCount > 9 ? 9 : notificationCount;
    onClick = onClick ?? (() => {});
  return (
    <div className={styles.container} onClick={onClick}>
        <ProfilePicture size='50px' borderWidth='0' imageSrc={imageSrc}/>
        <div className={styles['username-message-notificationCount']}>
            <div className={styles['username-notificationCount']}>
                <UsernameText username={username} size='15px' />
                { !notificationCount ? '' : <>
                <div className={styles.notificationCount}>
                    {notificationCount}
                </div>
                <div className={styles['notificationCount-plus']}>
                    {notificationCount > 9 ? '+' : ''}
                </div>
                </>
                }
            </div>
            <div className={styles.message} style={{fontWeight: bold ? 'bold' : '', opacity: bold ? '1' : ''}}>
                {message}
            </div>
        </div>
    </div>
  )
}

export default MessagesOutlook