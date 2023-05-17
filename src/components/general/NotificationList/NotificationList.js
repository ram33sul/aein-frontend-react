import { useEffect, useState } from 'react';
import styles from './NotificationList.module.css';
import axios from 'axios';
import Loading from '../Loading/Loading';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import { useNavigate } from 'react-router-dom';

function NotificationList({data}) {

    const [ notificationUser, setNotificationUser ] = useState(null);
    const [ notificationError, setNotificationError ] = useState('');
    const [ loading, setLoading ] = useState(true);

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`/user/userDetails?id=${data?.from}`).then((response) => {
            setNotificationUser(response.data);
        }).catch((error) => {
            setNotificationError("Error fetching the notification")
        }).finally(() => {
            setLoading(false)
        })
    },[data])

    return (
        <div className={styles.container}>
            {
                loading ?
                <Loading /> :
                notificationError ?
                notificationError :
                <>
                    <div className={styles['wrapper']}>
                        <ProfilePicture size='30px' borderWidth={0} imageSrc={notificationUser?.profilePicUrl} onClick={() => navigate(`/profile?username=${notificationUser?.username}`)}/>
                        <div className={styles['message']}>
                            <strong>{notificationUser.username}</strong> 
                            {
                                data?.type === 'FOLLOW' ?
                                <span style={{cursor: "pointer"}} onClick={() => navigate(`/profile?username=${notificationUser?.username}`)}> started following you.</span>
                                : data?.type === 'LIKE' ?
                                <span style={{cursor: "pointer"}} onClick={() => navigate(`/postDetails?id=${data?.on}`)}> liked your post.</span>
                                : data?.type === 'DISLIKE' ?
                                <span style={{cursor: "pointer"}} onClick={() => navigate(`/postDetails?id=${data?.on}`)}> disliked your post.</span>
                                : data?.type === 'COMMENT' ?
                                <span style={{cursor: "pointer"}} onClick={() => navigate(`/postDetails?id=${data?.on}`)}> commented on your post.</span>
                                : data?.type === 'REPLY' ?
                                <span style={{cursor: "pointer"}} onClick={() => navigate(`/postDetails?id=${data?.on}`)}> replied on your post.</span> :''
                            }
                        </div>
                                            <div className={styles["time-date-wrapper"]}>
                        <div className={styles.time}>
                            {new Date(data?.at ?? 0)?.toLocaleTimeString()}
                        </div>
                        <div className={styles.date}>
                            {new Date(data?.at ?? 0)?.toLocaleDateString()}
                        </div>
                    </div>
                    </div>
                </>
        }
        </div>
    )
}

export default NotificationList;