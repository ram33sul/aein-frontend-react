import React, { useContext, useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import Logo from '../../general/Logo/Logo'
import Navicon from '../../general/Navicon/Navicon'
import ProfilePicture from '../../general/ProfilePicture/ProfilePicture'
import UsernameText from '../../general/UsernameText/UsernameText'
import useMediaQuery from '../../../customHooks/mediaQuery'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { NotificationContext } from '../../../context/notificationContext'

function Navbar({active}) {

    const [ notificationsCount, setNotificationsCount] = useState(0)
    
    const params = new URLSearchParams(window.location.search);

    const feed = active === 'feed' ? true : false;
    const explore = active === 'explore' ? true : false;
    const notifications = active === 'notifications' ? true : false;
    const settings = active === 'settings' ? true : false;
    const messages = active === 'messages' ? true : false;

    const isMessage = useMediaQuery('(max-width: 650px)');
    const icon = isMessage ? 'Messages' : 'Settings'
    const iconActive = icon === 'Settings' ? settings : messages;

    const user = useSelector((state) => state.user.user)
    const username = user.username;
    const profilePic = user.profilePicUrl;

    const navigate = useNavigate()
 
    const { notificationWs } = useContext(NotificationContext);

    useEffect(() => {
        notificationWs.onopen = () => {
            notificationWs.send(JSON.stringify({
                type: "GET_NOTIFICATIONS_COUNT"
            }))
        }
        if(notificationWs.readyState === 1){
            notificationWs.send(JSON.stringify({
                type: "GET_NOTIFICATIONS_COUNT"
            }))
        }
        notificationWs.onmessage = (res) => {
            const { data, type } = JSON.parse(res.data)
            if(type === 'GET_NOTIFICATIONS_COUNT'){
                setNotificationsCount(data)
            } else {
                notificationWs.send(JSON.stringify({
                    type: "GET_NOTIFICATIONS_COUNT"
                }))
            }
        }
    },[notificationWs])

  return (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            <div className={styles.logo}>
                <Logo width='70px' />
            </div>
            <div className={styles['buttons-container']}>
                <Navicon icon='feed' label='Feed' active={feed} onClick={() => navigate('/')}/>
                <Navicon icon='explore' label='Explore' active={explore} onClick={() => navigate('/explore')}/>
                <Navicon count={notificationsCount > 9 ? '9+' : notificationsCount} icon='notifications' label='Notifications' active={notifications} onClick={() => navigate('/notifications')}/>
                <Navicon icon={icon.toLowerCase()} label={icon} active={iconActive} onClick={() => navigate(`/${icon.toLowerCase()}`)}/>
            </div>
            <div className={styles.profileWrap} onClick={() => navigate(`/profile?username=${username}`)}>
                <ProfilePicture size='40px' borderWidth='0' imageSrc={profilePic}/>
                <div className={styles.username}>
                <UsernameText username={username ?? 'username'} active={active === 'profile' && username === params.get("username")}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar