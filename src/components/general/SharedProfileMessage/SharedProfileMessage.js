import React, { useEffect, useState } from 'react'
import styles from './SharedProfileMessage.module.css'
import axios from 'axios'
import UserOverlook from '../UserOverlook/UserOverlook'
import SeenIcon from '../../icons/SeenIcon/SeenIcon'
function SharedProfileMessage({id, seen, sendAt, isSendByUser }) {

    const [ user, setUser ] = useState(null)

    sendAt = sendAt ? new Date(sendAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '' ;

    useEffect(() => {
        axios.get(`/user/userDetails?userId=${id}`).then((response) => {
            setUser(response.data)
        }).catch((error) => {
            console.log(error);
        })
    },[id])
  return (
    <div className={styles.container} style={isSendByUser ? {marginLeft: 'auto', flexDirection: 'row-reverse'} : {}}>
        <div className={styles["user-wrapper"]} style={isSendByUser ? {borderBottomRightRadius: 0} : {borderBottomLeftRadius: 0}}>
            <UserOverlook
                user={user ? user : {}}
                imageSize='30px'
                usernameFontSize='13px'
                nameFontSize='13px'
                gap='5px'/>
        </div>
        <div className={styles["seen-time"]}>
            { !seen || !isSendByUser? '' :
            <div className={styles.seen}>
                <SeenIcon />
            </div> }
            <div className={styles.time}>
                {sendAt}
            </div>
        </div>
    </div>
  )
}

export default SharedProfileMessage