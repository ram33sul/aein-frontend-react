import React, { useEffect, useState } from 'react'
import styles from './BlockedUsers.module.css'
import Loading from '../../general/Loading/Loading';
import axios from 'axios';
import { useSelector } from 'react-redux';
import BlockedListOutlook from '../../general/BlockedListOutlook/BlockedListOutlook';
import DisplayMessage from '../../general/DisplayMessage/DisplayMessage';
function BlockedUsers() {

    const [ loading, setLoading ] = useState(true);
    const [ usersList, setUsersList ] = useState([]);
    const [ showDisplayMessage, setShowDisplayMessage ] = useState({})

    const state = useSelector(state => state);

    useEffect(() => {
        axios.get(`/user/blockedUsersList?userId=${state.user.user._id}`).then((response) => {
            setUsersList(response.data)
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setLoading(false);
        })
    },[state])
  return (
    <div className={styles.container}>
        { showDisplayMessage.message ? <DisplayMessage message={showDisplayMessage.message} color={showDisplayMessage.color} onClick={() => setShowDisplayMessage({})}/> : ''}
        { loading ? <Loading /> : 
            <div className={styles["list-container"]} >
                {   usersList.length ?
                    usersList.map((user) => {
                        return <BlockedListOutlook user={user} messageDisplayFunction={setShowDisplayMessage}/>
                    }) : <div style={{margin: 'auto', color: 'var(--foreground-color)'}}>You haven't blocked anyone </div>
                }
            </div>
        }
    </div>
  )
}

export default BlockedUsers