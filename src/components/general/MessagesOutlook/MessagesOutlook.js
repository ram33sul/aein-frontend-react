import React from 'react'
import styles from './MessagesOutlook.module.css'
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import UsernameText from '../UsernameText/UsernameText';
function MessagesOutlook({imageSrc, username, message, notificationCount, setValueChat}) {

    imageSrc = imageSrc || '';
    username = username || 'username';
    message = message || 'messages this jl sljf s ljd fdlfjd dljf dfj dfdjfdf jdfjdf jd qlj dfj dfkjdf djfjd fdjfhd jdfd jdfjdhf kdfh kfhk kdfjkhdfj dkjfhkjdhf dkfkjd mjdh kdhf h dfkh dkhdf kdhf dkfhdf dfihf ddkfhdf ';
    notificationCount = notificationCount || 9;
  return (
    <div className={styles.container} onClick={setValueChat ? () => setValueChat(true) : () => {}}>
        <ProfilePicture size='50px' borderWidth='0'/>
        <div className={styles['username-message-notificationCount']}>
            <div className={styles['username-notificationCount']}>
                <UsernameText content={username} size='15px' />
                <div className={styles.notificationCount}>
                    {notificationCount}
                </div>
                <div className={styles['notificationCount-plus']}>
                    {notificationCount > 9 ? '+' : ''}
                </div>
            </div>
            <div className={styles.message}>
                {message}
            </div>
        </div>
    </div>
  )
}

export default MessagesOutlook