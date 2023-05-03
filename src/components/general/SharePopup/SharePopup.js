import React, { useState, useEffect } from 'react';
import styles from './SharePopup.module.css';
import UserOverlook from '../UserOverlook/UserOverlook';
import axios from 'axios';
import { useSelector } from 'react-redux';

function SharePopup({data, handleClose}){

    const user = useSelector(state => state.user.user);

    const [ isCopied, setIsCopied ] = useState(false)

    const [ users, setUsers ] = useState([]);

    const handleCopy = () => {
        navigator.clipboard.writeText(data.link).then(() => {
            setIsCopied(true)
        }).catch(() => {
            alert("Cannot be copied!")
        })
    }

    useEffect(() => {
        axios.post(`/user/usersDetailsFromArray`, {
            usersList: user?.following,
            userId: user?._id
        }).then((response) => {
            setUsers(response.data)
        }).catch((error) => {
            console.log(error);
        })
    },[user])

    return(
        <div className={styles.background}>
            <div className={styles.container}>
                <div className={styles["close-button"]} onClick={handleClose} >
                    X
                </div>
                <div className={styles["link-copy-wrapper"]}>
                    <div className={styles.link}>
                        {data.link}
                    </div>
                    <div className={styles["copy-button"]} onClick={handleCopy} style={isCopied ? {color: 'var(--foreground-color)', backgroundColor: 'var(--background-color)'} : {}}>
                        { isCopied ? 'COPIED!' : 'COPY'}
                    </div>
                </div>
                { !users.length ? '' : <>
                <div className={styles.heading}>
                    Share to others
                </div>
                {
                    users.map((user) => <List user={user} key={user._id} data={data}/>)
                } </>}
            </div>
        </div>
    )
}

function List({user, data}){

    const state = useSelector(state => state)
    const ws = state.webSocket.ws;
    const userId = state.user.user._id;

    const handleShare = () => {
        if(ws.readyState === 1){
            ws.send(JSON.stringify({
                userId,
                toUserId: user?._id,
                content: data.content,
                messageType: data.type,
                type: 'share'
            }))
        }
    }
    return(
        <div className={styles["users-wrapper"]}>
            <div className={styles["user-share-wrapper"]}>
                <UserOverlook user={user} imageSize='30px' usernameFontSize='13px' nameFontSize='13px' gap='5px'/>
                <div className={styles["share-button"]} onClick={handleShare}>
                    SHARE
                </div>
            </div>
        </div>
    )
}

export default SharePopup;