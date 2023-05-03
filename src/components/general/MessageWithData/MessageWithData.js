import React, { useState, useEffect} from 'react'
import styles from './MessageWithData.module.css'
import ProfilePicture from '../ProfilePicture/ProfilePicture'
import axios from 'axios';
import UsernameText from '../UsernameText/UsernameText';
import Message from '../Message/Message';
import { useSelector } from 'react-redux';
function MessageWithData({userId, content, mood, at}) {

    const [ messagedUser, setMessagedUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    const user = useSelector(state => state.user.user);

    const fill = (messagedUser?._id === user?._id);

    useEffect(() => {
        axios.get(`/user/userDetails?userId=${userId}`)
        .then((response) => {
            setMessagedUser(response.data);
        })
        .catch((error) => {
            console.log(error);
        }).finally(() => {
            setLoading(false)
        })
    },[userId])

  return (
    <div className={styles.container}>
        {loading ? '' : <>
        { fill ? '' :
        <div className={styles["user-data-wrapper"]} >
            <ProfilePicture borderWidth='0' size='25px' imageSrc={messagedUser?.profilePicUrl} />
            <UsernameText username={messagedUser?.username} fontSize='15px' />
        </div> }
        <Message content={content} mood={mood} sendAt={at} fill={fill}/> </>}
    </div>
  )
}

export default MessageWithData