import React from 'react'
import styles from './Home.module.css'
import Navbar from '../../components/fragments/Navbar/Navbar'
import Messages from '../../components/fragments/Messages/Messages'
import Feed from '../../components/fragments/Feed/Feed'
import { Navigate, Route, Routes } from 'react-router-dom'
import Profile from '../../components/fragments/Profile/Profile'
import Explore from '../../components/fragments/Explore/Explore'
function Home() {

  return (
    <div className={styles.container}>
        <Routes>
            <Route path='' element={<><Navbar active='feed' /> <Feed /></>} />
            <Route path='profile' element={<> <Navbar active='profile' /> <Profile /></>} />
            <Route path='explore' element={<> <Navbar active='explore' /> <Explore /></>} />
            <Route path='*' element={<><Navigate to="/" /></>} />
        </Routes>
        <Messages />
    </div>
  )
}

export default Home