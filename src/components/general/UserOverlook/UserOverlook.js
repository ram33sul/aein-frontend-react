import React from 'react'
import styles from './UserOverlook.module.css'
import { useNavigate } from 'react-router-dom'
import ProfilePicture from '../ProfilePicture/ProfilePicture'
import UsernameText from '../UsernameText/UsernameText'

function UserOverlook({user, imageSize, usernameFontSize, nameFontSize, gap}) {

    const navigate = useNavigate()
  return (
    <div className={styles["search-result"]} style={{gap: gap ?? ''}} onClick={() => navigate(`/profile?username=${user?.username}`)}>
        <ProfilePicture borderWidth='0' imageSrc={user?.profilePicUrl} size={imageSize}/>
        <div className={styles["search-result-section"]}>
            <UsernameText username={user?.username} fontSize={usernameFontSize}/>
            <div className={styles["search-result-name"]} style={{fontSize: nameFontSize ?? ''}}>
                {user?.name ?? 'name'}
        </div>
    </div>
</div>
  )
}

export default UserOverlook