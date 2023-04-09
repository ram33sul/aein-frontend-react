import React from 'react'
import styles from './Navbar.module.css'
import Logo from '../../general/Logo/Logo'
import Navicon from '../../general/Navicon/Navicon'
import ProfilePicture from '../../general/ProfilePicture/ProfilePicture'
import UsernameText from '../../general/UsernameText/UsernameText'
import useMediaQuery from '../../../customHooks/mediaQuery'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Navbar({active}) {

    const theme = useSelector((state) => state.theme);
    
    const params = new URLSearchParams(window.location.search);

    const feed = active === 'feed' ? true : false;
    const explore = active === 'explore' ? true : false;
    const notifications = active === 'notifications' ? true : false;
    const settings = active === 'settings' ? true : false;
    const messages = active === 'messages' ? true : false;

    const isMessage = useMediaQuery('(max-width: 650px)');
    const icon = isMessage ? 'Messages' : 'Settings'
    const iconActive = icon === 'settings' ? settings : messages;
    const src = `./icons/${theme.foregroundColor}/${icon === 'Messages' ? 'Aein' : 'settings'}-icon-${theme.foregroundColor}.png`;

    const username = useSelector((state) => state.user.user.username);

    const navigate = useNavigate()
 

  return (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            <div className={styles.logo}>
                <Logo width='70px' />
            </div>
            <div className={styles['buttons-container']}>
                <Navicon src={`./icons/${theme.foregroundColor}/feed-icon-${theme.foregroundColor}.png`} alt='feed-icon' label='Feed' active={feed} onClick={() => navigate('/')}/>
                <Navicon src={`./icons/${theme.foregroundColor}/explore-icon-${theme.foregroundColor}.png`} alt='feed-icon' label='Explore' active={explore} onClick={() => navigate('/explore')}/>
                <Navicon src={`./icons/${theme.foregroundColor}/Aein-icon-${theme.foregroundColor}.png`} alt='feed-icon' label='Notifications' active={notifications} onClick={() => navigate('/notifications')}/>
                <Navicon src={src} alt='feed-icon' label={icon} active={iconActive} onClick={() => navigate(`/${icon.toLowerCase()}`)}/>
            </div>
            <div className={styles.profileWrap} onClick={() => navigate(`/profile?username=${username}`)}>
                <ProfilePicture size='40px' borderWidth='0'/>
                <div className={styles.username}>
                <UsernameText username={username ?? 'username'} active={active === 'profile' && username === params.get("username")}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar