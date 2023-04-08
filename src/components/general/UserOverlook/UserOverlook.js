import React from 'react'
import styles from './UserOverlook.module.css'
import { useNavigate } from 'react-router-dom'
import ProfilePicture from '../ProfilePicture/ProfilePicture'
import UsernameText from '../UsernameText/UsernameText'

function UserOverlook({user}) {

    const navigate = useNavigate()
  return (
    <div className={styles["search-result"]} onClick={() => navigate(`/profile?username=${user?.username}`)}>
        <ProfilePicture borderWidth='0'/>
        <div className={styles["search-result-section"]}>
            <UsernameText username={user?.username} />
            <div className={styles["search-result-name"]}>
                {user?.name}
        </div>
    </div>
</div>
  )
}

export default UserOverlook