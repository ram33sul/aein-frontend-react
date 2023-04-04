import React, { useEffect, useState } from 'react'
import styles from './chat.module.css'
import ProfilePicture from '../ProfilePicture/ProfilePicture'
import UsernameText from '../UsernameText/UsernameText'
import Message from '../Message/Message'
import Button3 from '../Button3/Button3'
import MoodButton from '../MoodButton/MoodButton'
function Chat({online, username, valueChat, setValueChat}) {

  const [ message, setMessage ] = useState('');

  const [ style, setStyle ] = useState({transform: 'translateX(100%)'});

  useEffect(() => {
    if(valueChat){
      setStyle({transform: 'translateX(100%)'});
    } else {
      setStyle({transform: 'translateX(0%)'});
    }
  },[valueChat]);



  const scrollToBottom = () => {
    const chat = document.getElementById("chat-body");
    chat.scrollTop = chat.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  },[]);


  const handleSendMessage = () => {

    console.log("message: "+message);
  }


  return (
    <div className={styles.wrapper} style={style}>
      <div className={styles.container} id='chat-body'>
        <div className={styles.header}>
            <ProfilePicture borderWidth='0'/>
            <div className={styles["username-online"]}>
                <div className={styles.online}>
                    online
                </div>
                <UsernameText username='username'/>
            </div>
            <div className={styles["close-chat"]} onClick={() => setValueChat(false)}>
              X
            </div>
        </div>
        <div className={styles.body}>
          <Message content='hii' />
          <Message content='how you doing'/>
          <Message content='I am fine!' fill />
          <Message content='what about you ?' fill />
          <Message content='hii' />
            <Message content='how you doing'/>
            <Message content='hii' />
            <Message content='how you doing'/>
            <Message content='what about you ?' fill />
            <Message content='hii' />
            <Message content='how you doing'/>
            <Message content='hii' />
            <Message content='how you doing'/>
            <Message content='what about you ?' fill />
            <Message content='hii' />
            <Message content='how you doing'/>
            <Message content='hii' />
            <Message content='how you doing'/>
            <Message content='what about you ?' fill />
            <Message content='hii' />
            <Message content='how you doing'/>
            <Message content='hii' />
            <Message content='how you doing'/>
            <Message content='how you doing'/>
            <Message content='how you doing'/>
        </div>
        </div>
        <div className={styles["footer-wrapper"]}>
          <div className={styles["mood-container"]}>
              <MoodButton name='alert' color='red'/>
              <MoodButton />
              <MoodButton fill/>
              <MoodButton name='alert' color='red'/>
              <MoodButton />
              <MoodButton fill/>
              <MoodButton name='alert' color='red'/>
              <MoodButton />
              <MoodButton fill/>
              <MoodButton fill/>
              <MoodButton name='alert' color='red'/>
              <MoodButton />
              <MoodButton fill/>
              <MoodButton name='alert' color='red'/>
              <MoodButton />
              <MoodButton name='alert' color='red'/>
              <MoodButton />
              <MoodButton fill/>
              <MoodButton name='alert' color='red'/>
              <MoodButton />
          </div> 
          <div className={styles.footer}>
            <input value={message} placeholder='type here...' className={styles.input} onChange={(e) => setMessage(e.target.value)}/>
            { message.length ? 
              <Button3 imageType='send' size='30px'onClick={handleSendMessage}/>
              : '' }

          </div>
        </div>
    </div>
  )
}

export default Chat;