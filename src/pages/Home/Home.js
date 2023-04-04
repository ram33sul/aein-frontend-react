import React from 'react'
import styles from './Home.module.css'
import Navbar from '../../components/fragments/Navbar/Navbar'
import Messages from '../../components/fragments/Messages/Messages'
import Feed from '../../components/fragments/Feed/Feed'
import { Route, Routes } from 'react-router-dom'
function Home() {

  return (
    <div className={styles.container}>
        <Routes>
            <Route path='/' element={<><Navbar active='feed' /> <Feed /></>} />
        </Routes>
        <Messages />
    </div>
  )
}

export default Home