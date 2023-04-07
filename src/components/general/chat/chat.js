import React, { useEffect, useState } from 'react'
import styles from './chat.module.css'
import ProfilePicture from '../ProfilePicture/ProfilePicture'
import UsernameText from '../UsernameText/UsernameText'
import Message from '../Message/Message'
import Button3 from '../Button3/Button3'
import MoodButton from '../MoodButton/MoodButton'
import { useSelector } from 'react-redux'

function Chat({online, valueChat, onExit, toUser, ws}) {

  const [ message, setMessage ] = useState('');
  const [ style, setStyle ] = useState({transform: 'translateX(100%)'});
  const [ allMessages, setAllMessages ] = useState([]);
  const [ scrollBehavior, setScrollBehavior ] = useState('');
  const [ sendLoading, setSendLoading ] = useState(false);

  const user = useSelector((state) => state.user);
  const fromUserId = user?._id;

  useEffect(() => {
    if(valueChat){
      setStyle({transform: 'translateX(100%)'});
    } else {
      setStyle({transform: 'translateX(0%)'});
    }
  },[valueChat]);


  ws.onmessage = (message) => {
    message = JSON.parse(message.data);
    if(message.type === "getMessages"){
      setAllMessages(message.messageData);
    } else if (message.type === "sendMessage"){
      setMessage('');
      setAllMessages([...allMessages,message.data]);
      setSendLoading(false)
    }
  }

  const scrollToBottom = () => {
    const chat = document.getElementById("chat-body");
    chat.scrollTop = chat.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
    if(ws.readyState === 1){
      ws.send(JSON.stringify({from: fromUserId, to: toUser?._id, type: "getMessages"}));
    }
  },[fromUserId, toUser, ws]);


  const handleSendMessage = () => {
    setSendLoading(true);
    setScrollBehavior('smooth');
    const from = {
      _id: user?._id,
      name: user?.name,
      email: user?.email,
      username: user?.username,
      mobile: user?.mobile
    };
    const to = {
      _id: toUser?._id,
      name: toUser?.name,
      email: toUser?.email,
      username: toUser?.username,
      mobile: toUser?.mobile
    }
    const messageData = {from, to, content: message, type: 'sendMessage'};
    ws.send(JSON.stringify(messageData));
  }

  useEffect(() => {
    scrollToBottom();
    setScrollBehavior('')
  },[allMessages]);

  return (
    <div className={styles.wrapper} style={style}>
      <div className={styles.container} id='chat-body' style={{ scrollBehavior }}>
        <div className={styles.header}>
            <ProfilePicture borderWidth='0'/>
            <div className={styles["username-online"]}>
                <div className={styles.online}> 
                    online
                </div>
                <UsernameText username={toUser?.username}/>
            </div>
            <div className={styles["close-chat"]} onClick={onExit}>
              X
            </div>
        </div>
        <div className={styles.body}>
          {
            allMessages.map((msg) => {
              const { content, mood, sendAt, from, to, _id} = msg;
              return <Message key={_id} content={content} mood={mood} sendAt={sendAt} from={from} to={to._id} fill={from._id === fromUserId} />
            })
          }
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
              <Button3 imageType='send' size='30px' onClick={handleSendMessage} loading={sendLoading}/>
              : '' }

          </div>
        </div>
    </div>
  )
}

export default Chat;