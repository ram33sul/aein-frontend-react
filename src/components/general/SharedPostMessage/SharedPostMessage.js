import React, { useState, useEffect } from "react";
import styles from './SharedPostMessage.module.css';
import Message from "../Message/Message";
import axios from "axios";
import SeenIcon from "../../icons/SeenIcon/SeenIcon";
import { useNavigate } from 'react-router-dom'

function SharePostMessage({id, seen, sendAt, isSendByUser}) {
    
    const [ messages, setMessages ] = useState([]);
    const [ postedUser, setPostedUser ] = useState(null);
    const [ withUser, setWithUser ] = useState(null)

    const navigate = useNavigate();

    sendAt = sendAt ? new Date(sendAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '' ;

    useEffect(() => {
        axios.get(`/post/postDetails?id=${id}`).then((response) => {
            setMessages(response.data?.messages);
            axios.get(`/user/userDetails?userId=${response.data?.userId}`).then((response) => {
                setPostedUser(response.data)
            }).catch((error) => {
                console.log(error);
            })
            axios.get(`/user/userDetails?userId=${response.data?.withUserId}`).then((response) => {
                setWithUser(response.data)
            }).catch((error) => {
                console.log(error);
            })
        }).catch((error) => {
            console.log(error);
        })
    }, [id])

    return (
        <div className={styles.container}>
            <div className={styles.header} style={isSendByUser ? {marginLeft: 'auto'} : {}}>
                <div className={styles["posted-username"]}>
                    {postedUser ? postedUser.username : 'loading...'}
                </div>
                <div className={styles["with-username"]}>
                    with {withUser ? withUser.username : 'loading...'}
                </div>
            </div>
            <div  className={styles["messages-seen-time"]} style={isSendByUser ? {flexDirection: 'row-reverse'} : {}}>
                <div onClick={() => navigate(`/postDetails?id=${id}`)} className={styles["messages-wrapper"]} style={isSendByUser ? {borderBottomRightRadius: 0} : {borderBottomLeftRadius: 0}}>
                    {
                        messages.map(message => {
                            const {_id, content, mood, from} = message
                            return (
                                <Message
                                key={_id}
                                content={content}
                                mood={mood}
                                fill={from === postedUser?._id}
                            />
                            )
                        })
                    }
                </div>
                <div className={styles["seen-time"]}>
                    { seen && isSendByUser? '' :
                    <div className={styles.seen}>
                        <SeenIcon />
                    </div> }
                    <div className={styles.time}>
                        {sendAt}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SharePostMessage;