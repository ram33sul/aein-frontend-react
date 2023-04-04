import React, { useState } from 'react'
import styles from './Messages.module.css'
import Search from '../../general/Search/Search'
import MessagesOutlook from '../../general/MessagesOutlook/MessagesOutlook'
import Chat from '../../general/chat/chat'
function Messages() {

    const [ chat, setChat ] = useState(false);

  return (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            { chat ? <Chat setValueChat={setChat}/> : <>
            <div className={styles.header}>
                <Search />
            </div>
            <MessagesOutlook valueChat={chat} setValueChat={setChat}/>
            <MessagesOutlook />
            <MessagesOutlook />
            <MessagesOutlook />
            <MessagesOutlook />
            <MessagesOutlook />
            <MessagesOutlook />
            <MessagesOutlook />
            <MessagesOutlook />
            <MessagesOutlook />
            <MessagesOutlook />
            <MessagesOutlook />
            <MessagesOutlook />
            <MessagesOutlook />
            <MessagesOutlook />
            <MessagesOutlook />
            <MessagesOutlook />
            <MessagesOutlook />
            <MessagesOutlook />
            <MessagesOutlook />
            <MessagesOutlook />
            <MessagesOutlook />
            <MessagesOutlook />
            <MessagesOutlook />
            <MessagesOutlook />
            </>
            }
        </div>
    </div>
  )
}

export default Messages