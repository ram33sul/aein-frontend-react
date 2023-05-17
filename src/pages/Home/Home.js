import React, { useContext, useEffect, useState } from 'react'
import styles from './Home.module.css'
import Navbar from '../../components/fragments/Navbar/Navbar'
import Messages from '../../components/fragments/Messages/Messages'
import Feed from '../../components/fragments/Feed/Feed'
import { Navigate, Route, Routes } from 'react-router-dom'
import Profile from '../../components/fragments/Profile/Profile'
import Explore from '../../components/fragments/Explore/Explore'
import useMediaQuery from '../../customHooks/mediaQuery'
import { useDispatch, useSelector } from 'react-redux'
import { wsConnect } from '../../redux/webSocket/wsActions'
import EditProfile from '../../components/fragments/EditProfile/EditProfile'
import Settings from '../../components/fragments/Settings/Settings'
import BlockedUsers from '../../components/fragments/BlockedUsers/BlockedUsers'
import PostDetails from '../../components/fragments/PostDetails/PostDetails'
import { NotificationContext } from '../../context/notificationContext'
import Notifications from '../../components/fragments/Notifications/Notifications'
function Home() {

    const [ isWidth, setIsWidth ] = useState('loading');
    const mediaQuery = useMediaQuery('(min-width: 650px)');
    const state = useSelector((state) => state);
    const user = state.user.user;
    const dispatch = useDispatch();

    const { notificationWs, setNotificationWs } = useContext(NotificationContext);

    useEffect(() => {
        dispatch(wsConnect(user._id));
        setIsWidth(mediaQuery);
    },[dispatch, user, mediaQuery])

    useEffect(() => {
      setNotificationWs(new WebSocket('ws://localhost:5002'))
    },[setNotificationWs])


  return (
    <div className={styles.container}>
        <Routes>
            <Route path='' element={<><Navbar active='feed' /> <Feed /></>} />
            <Route path='profile' element={<> <Navbar active='profile' /> <Profile /></>} />
            <Route path='explore' element={<> <Navbar active='explore' /> <Explore /></>} />
            <Route path='messages' element= { isWidth ? <Navigate to="/" /> : <> <Navbar active='messages' /> <Messages/></>} />
            <Route path='editProfile' element={<> <Navbar active='profile' /> <EditProfile /></>} />
            <Route path='settings' element={<> <Navbar active='settings' /> <Settings /></>} />
            <Route path='blockedUsers' element={<> <Navbar active='settings' /> <BlockedUsers /></>} />
            <Route path='postDetails' element={<> <Navbar /> <PostDetails /></>} />
            <Route path='notifications' element={<> <Navbar active='notifications'/> <Notifications /></>} />
            <Route path='*' element={<><Navigate to="/" /></>} />
        </Routes>
        { isWidth ? <Messages/> : ''}
    </div>
  )
}

export default Home