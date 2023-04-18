import React, { useEffect, useState } from 'react'
import styles from './BlockedUsers.module.css'
import Loading from '../../general/Loading/Loading';
import axios from 'axios';
import { useSelector } from 'react-redux';
import UserOverlook from '../../general/UserOverlook/UserOverlook';
function BlockedUsers() {

    const [ loading, setLoading ] = useState(true);
    const [ usersList, setUsersList ] = useState([]);

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
        { loading ? <Loading /> : 
            <div className={styles["list-container"]} >
                {
                    usersList.map((user) => {
                        return <UserOverlook user={user} />
                    })
                }
            </div>
        }
    </div>
  )
}

export default BlockedUsers