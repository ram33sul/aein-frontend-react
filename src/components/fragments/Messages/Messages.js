import React, { useEffect, useState } from 'react'
import styles from './Messages.module.css'
import Search from '../../general/Search/Search'
import MessagesOutlook from '../../general/MessagesOutlook/MessagesOutlook'
import Chat from '../../general/chat/chat'
import axios from 'axios'
import Loading from '../../general/Loading/Loading'
import { useSelector } from 'react-redux'
function Messages() {

    const [ chat, setChat ] = useState(null);
    const [ searchLoading, setSearchLoading ] = useState(false);
    const [ searchUsers, setSearchUsers ] = useState([]);
    const [ searchInput, setSearchInput ] = useState('');
    const [ overallMessages, setOverallMessages ] = useState([]);
    const user = useSelector((state) => state.user.user)
    const fromUserId = user?._id;
    const [ ws, setWs ] = useState({})

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    }

    useEffect(() => {
        setWs(new WebSocket('ws://localhost:5001?userId='+fromUserId))
    },[fromUserId])

    ws.onopen = () => {
        ws.send(JSON.stringify({userId: fromUserId, type: "getOverallMessages"}));
    };

    ws.onmessage = (response) => {
        response = JSON.parse(response.data);
        if(response.type === 'getOverallMessages'){
            setOverallMessages(response.data);
        } else if(response.type === 'sendMessage'){
            if(response.data.to._id === fromUserId){
                ws.send(JSON.stringify({userId: fromUserId, type: "getOverallMessages"}));
            }
        }
        setSearchLoading(false)
    }

    useEffect(() => {
        setSearchUsers([]);
        if(searchInput.length !== 0){
            setSearchLoading(true);
            axios.get(`/usersList?keyword=${searchInput}`).then((response) => {
                setSearchUsers(response.data.users);
            }).catch((error) => {
                console.log(error.response.data.messages);
            }).finally(() => {
                setSearchLoading(false);
            })
        }
    },[searchInput]);

    useEffect(() => {
        if(searchInput.length === 0){
            setSearchLoading(true);
            if(ws.readyState === 1){
                ws.send(JSON.stringify({userId: fromUserId, type: "getOverallMessages"}));
            } else {
                setSearchLoading(false);
            }
        }
    },[searchInput, chat, fromUserId, ws])

  return (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            { chat ? <Chat onExit={() => setChat(null)} toUser={chat} ws={ws}/> : <>
            <div className={styles.header}>
                <Search value={searchInput} onChange={handleSearchInput}/>
            </div>
            {
                searchInput.length !== 0 ?
                    (searchLoading ? 
                        <Loading /> : 
                    searchUsers.length ?
                            (searchUsers.map((user, index) => {
                                return (<MessagesOutlook onClick={() => setChat(user)} username={user.username} key={user._id} message={`${user.name}`} bold={true}/>)
                            })) :
                        'no results found') :
                    ( overallMessages.length !==0 ? (overallMessages.map((data) => {
                        let chat;
                        let username;
                        if(data.from._id === fromUserId){
                            chat = data.to;
                            username = data.to.username;
                        } else {
                            chat = data.from;
                            username = data.from.username;
                        }
                        return(<MessagesOutlook onClick={() => setChat(chat)} username={username} key={data.messageId} message={data.content} bold={data.newMessageCount && data.newMessageCount > 0} notificationCount={data.newMessageCount}/>)
                            })) : 'no messages yet'
                    )
            }
            </>
            }
        </div>
    </div>
  )
}

export default Messages