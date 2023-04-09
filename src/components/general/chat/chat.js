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
  const [ isOnline, setIsOnline ] = useState(false);

  const user = useSelector((state) => state.user.user);
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
      if(message.data.to._id === fromUserId && ws.readyState === 1){
        ws.send(JSON.stringify({ viewedUser: fromUserId, sentUser: toUser._id, type: "markSeen"}));
      }
      setSendLoading(false)
    } else if (message.type === "markSeen") {
      setAllMessages(allMessages.map((message) => {
        return {...message, seen: true};
      }));
    } else if (message.type === "isOnline") {
      if(message.isOnline) {
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
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
      ws.send(JSON.stringify({userIdToBeChecked: toUser?._id, userIdWhoIsChecking: fromUserId, type: "isOnline"}));
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

  useEffect(() => {
      if(ws.readyState === 1){
        ws.send(JSON.stringify({ viewedUser: fromUserId, sentUser: toUser._id, type: "markSeen"}));
      }
  },[fromUserId, toUser, ws])
  return (
    <div className={styles.wrapper} style={style}>
      <div className={styles.container} id='chat-body' style={{ scrollBehavior }}>
        <div className={styles.header}>
            <ProfilePicture borderWidth='0'/>
            <div className={styles["username-online"]}>
              { isOnline ? 
                <div className={styles.online}> 
                    online
                </div> : 
                <div className={styles["not-online"]}> 
                  not-online
                </div>}
                <UsernameText username={toUser?.username}/>
            </div>
            <div className={styles["close-chat"]} onClick={onExit}>
              X
            </div>
        </div>
        <div className={styles.body}>
          {
            allMessages.map((msg) => {
              const { content, mood, sendAt, from, to, _id, seen} = msg;
              return <Message key={_id} content={content} mood={mood} sendAt={sendAt} from={from} to={to._id} fill={from._id === fromUserId} seen={seen}/>
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