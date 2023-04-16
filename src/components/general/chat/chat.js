import React, { useEffect, useState } from 'react'
import styles from './chat.module.css'
import ProfilePicture from '../ProfilePicture/ProfilePicture'
import UsernameText from '../UsernameText/UsernameText'
import Message from '../Message/Message'
import Button3 from '../Button3/Button3'
import MoodButton from '../MoodButton/MoodButton'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

function Chat({online, valueChat, onExit, toUser}) {

  const [ message, setMessage ] = useState('');
  const [ style, setStyle ] = useState({transform: 'translateX(100%)'});
  const [ allMessages, setAllMessages ] = useState([]);
  const [ scrollBehavior, setScrollBehavior ] = useState('');
  const [ sendLoading, setSendLoading ] = useState(false);
  const [ isOnline, setIsOnline ] = useState(false);
  const [ mood, setMood ] = useState({});
  const [ selectedMessages, setSelectedMessages ] = useState([]);

  const navigate = useNavigate();
  const state = useSelector((state) =>  state);
  const user = state.user.user;
  const ws = state.webSocket.ws;
  const fromUserId = user?._id;

  const moods = [
    {
      name: 'humour',
      color: 'green',
      status: true
    },{
      name: 'sad',
      color: 'gold',
      status: true
    },{
      name: 'angry',
      color: 'orange',
      status: true
    },{
      name: 'happy',
      color: 'blue',
      status: true
    },{
      name: 'alert',
      color: 'red',
      status: true
    },{
      name: 'facts',
      color: 'purple',
      status: true
    },{
      name: 'amazed',
      color: 'violet',
      status: true
    }
  ]

  const handleMessageClick = (messageId) => {
    return () => {
      if(selectedMessages.includes(messageId)){
        return setSelectedMessages(selectedMessages.filter((message) => message !== messageId));
      }
      setSelectedMessages([...selectedMessages,messageId]);
    }
  }

  const handleMoodSelect = (data) => {
    return () => {
      if(Object.keys(mood).length && mood.name === data.name){
        setMood({});
      } else {
        setMood(data);
      }
    }
  }

  const handleDeleteMessages = () => {
    if(ws.readyState === 1){
      ws.send(JSON.stringify({messages: selectedMessages, userId : fromUserId, type: "deleteMessages"}));
    }
  }

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
      setMood({});
      setAllMessages([...allMessages,message.data]);
      if(message.data.to._id === fromUserId && ws.readyState === 1){
        ws.send(JSON.stringify({viewedUser: fromUserId, sentUser: toUser?._id, type: "markSeen"}));
      }
      setSendLoading(false)
    } else if (message.type === "markSeen") {
      setAllMessages(message.messageData);
    } else if (message.type === "isOnline") {
      if(message.isOnline) {
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    } else if (message.type === 'deleteMessages') {
      if(message.status){
        setAllMessages(allMessages.filter((message) => !selectedMessages.includes(message._id)));
        setSelectedMessages([]);
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
      ws.send(JSON.stringify({from: fromUserId, to: toUser?._id, type: "getMessages", markSeen: {viewedUser: fromUserId, sentUser: toUser._id}}));
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
    const messageData = {from, to, content: message, mood, type: 'sendMessage'};
    ws.send(JSON.stringify(messageData));
  }

  useEffect(() => {
    scrollToBottom();
  },[allMessages, fromUserId, toUser, ws])

  return (
    <div className={styles.wrapper} style={style}>
      <div className={styles.container} id='chat-body' style={{ scrollBehavior }}>
        {!selectedMessages.length ? 
        <div className={styles.header}>
            <ProfilePicture borderWidth='0' onClick={() => navigate(`/profile?username=${toUser?.username}`)}/>
            <div className={styles["username-online"]}>
              { isOnline ? 
                <div className={styles.online}> 
                    Online
                </div> : 
                <div className={styles["not-online"]}> 
                  Offline
                </div>}
                <UsernameText username={toUser?.username} onClick={() => navigate(`/profile?username=${toUser?.username}`)}/>
            </div>
            <div className={styles["close-chat"]} onClick={onExit}>
              X
            </div>
        </div> : 
        <div className={styles.header}>
          <div className={styles["header-button-container"]}>
            <div className={styles["header-button"]} onClick={() => setSelectedMessages([])}>
              UNSELECT
            </div>
            <div className={styles["header-button"]}>
              POST
            </div>
            <div className={styles["header-button"]} onClick={handleDeleteMessages} >
              DELETE
            </div>
          </div>
        </div>  }
        <div className={styles.body}>
          {
            allMessages.map((msg) => {
              const { content, mood, sendAt, from, to, _id, seen} = msg;
              return <Message key={_id} content={content} mood={mood} sendAt={sendAt} from={from} to={to._id} fill={from._id === fromUserId} seen={seen} onClick={handleMessageClick(_id)} active={selectedMessages.includes(_id)}/>
            })
          }
        </div>
        </div>
        <div className={styles["footer-wrapper"]}>
          <div className={styles["mood-container"]}>
            { moods.map((data) => {
              return <MoodButton name={data.name} color={data.color} onClick={handleMoodSelect(data)} fill={data.name === mood.name} key={data.name}/>
            })}
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