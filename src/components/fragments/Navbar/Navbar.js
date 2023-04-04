import React from 'react'
import styles from './Navbar.module.css'
import Logo from '../../general/Logo/Logo'
import Navicon from '../../general/Navicon/Navicon'
import ProfilePicture from '../../general/ProfilePicture/ProfilePicture'
import UsernameText from '../../general/UsernameText/UsernameText'
import useMediaQuery from '../../../customHooks/mediaQuery'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { fetchUserLogout } from '../../../redux/user/userActions'
import { useSelector } from 'react-redux'

function Navbar({active}) {

    const feed = active === 'feed' ? true : false;
    const explore = active === 'explore' ? true : false;
    const notifications = active === 'notifications' ? true : false;
    const settings = active === 'settings' ? true : false;
    const messages = active === 'messages' ? true : false;

    const isMessage = useMediaQuery('(max-width: 650px)');
    const icon = isMessage ? 'messages' : 'settings'
    const iconActive = icon === 'settings' ? settings : messages;
    const src = `./icons/black/${icon === 'messages' ? 'Aein' : 'settings'}-icon-black.png`;

    const dispatch = useDispatch();
    const username = useSelector((state) => state.user.username);

    const handleLogout = () => {
        axios.get('/logout').then((response) => {
            dispatch(fetchUserLogout());
        }).catch((error) => {
            console.log(error);
        })
    }
 

  return (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            <div className={styles.logo}>
                <Logo width='70px' />
            </div>
            <div className={styles['buttons-container']}>
                <Navicon src='./icons/black/feed-icon-black.png' alt='feed-icon' label='Feed' active={feed}/>
                <Navicon src='./icons/black/explore-icon-black.png' alt='feed-icon' label='Explore' active={explore}/>
                <Navicon src='./icons/black/Aein-icon-black.png' alt='feed-icon' label='Notifications' active={notifications}/>
                <Navicon src={src} alt='feed-icon' label={icon} active={iconActive}/>
            </div>
            <div className={styles.profileWrap} onClick={handleLogout}>
                <ProfilePicture size='40px' borderWidth='0'/>
                <div className={styles.username}>
                <UsernameText username={username ?? 'username'} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar