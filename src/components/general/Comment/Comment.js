import React, {useState, useEffect } from 'react';
import styles from './Comment.module.css';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import UsernameText from '../UsernameText/UsernameText';
import axios from 'axios';

function Comment({content, userId}){

    const [ user, setUser ] = useState({});

    useEffect(() => {
        axios.get(`/user/userDetails?userId=${userId}`).then((response) => {
            setUser(response.data)
        }).catch((error) => {
            console.log(error?.response?.data);
        })
    },[userId])
    return (
        <div className={styles.container}>
            <div className={styles['profilePic-username-wrapper']}>
                <ProfilePicture imageSrc={user.profilePicUrl} borderWidth='0' size='20px' />
                <UsernameText username={user.username} fontSize='15px'/>
            </div>
            <div className={styles.comment}>
                {content}
            </div>
        </div>
    )
}

export default Comment;