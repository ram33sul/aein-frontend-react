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
    const state = useSelector((state) => state)
    const user = state.user.user;
    const ws = state.webSocket.ws;
    const fromUserId = user?._id;

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    }

    ws.onopen = () => {
        ws.send(JSON.stringify({userId: fromUserId, type: "getOverallMessages"}));
    };

    ws.onmessage = (response) => {
        response = JSON.parse(response.data);
        if(response.type === 'getOverallMessages'){
            setOverallMessages(response.data.filter((messageData) => !user.blockedUsers.includes(messageData.foreignUser._id)));
        } else if(response.type === 'sendMessage'){
            if(response.data.to === fromUserId){
                ws.send(JSON.stringify({userId: fromUserId, type: "getOverallMessages"}));
            }
        } else if(response.type === 'share'){
            ws.send(JSON.stringify({userId: fromUserId, type: "getOverallMessages"}));
        }
        setSearchLoading(false)
    }

    useEffect(() => {
        setSearchUsers([]);
        if(searchInput.length !== 0){
            setSearchLoading(true);
            axios.get(`/user/usersList?keyword=${searchInput}`).then((response) => {
                setSearchUsers(response.data.users.filter((eachUser) => eachUser._id !== fromUserId && !user.blockedUsers.includes(eachUser._id)));
            }).catch((error) => {
                console.log(error.response.data.messages);
            }).finally(() => {
                setSearchLoading(false);
            })
        }
    },[searchInput, fromUserId, user]);

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
            { chat ? <Chat onExit={() => setChat(null)} toUser={chat}/> : <>
            <div className={styles.header}>
                <Search value={searchInput} onChange={handleSearchInput}/>
            </div>
            {
                searchInput.length !== 0 ?
                    (searchLoading ? 
                        <Loading /> : 
                    searchUsers.length ?
                            (searchUsers.map((user, index) => {
                                return (<MessagesOutlook onClick={() => setChat(user)} username={user.username} key={user._id} message={`${user.name}`} bold={true} imageSrc={user.profilePicUrl}/>)
                            })) :
                        'no results found') :
                    ( overallMessages.length !==0 ? (overallMessages.map((data) => {
                        return(<MessagesOutlook onClick={() => setChat(data.foreignUser)} username={data.foreignUser.username} imageSrc={data.foreignUser.profilePicUrl} key={data.messageId} message={data.content} messageType={data.type} bold={data.newMessageCount && data.newMessageCount > 0} notificationCount={data.newMessageCount}/>)
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