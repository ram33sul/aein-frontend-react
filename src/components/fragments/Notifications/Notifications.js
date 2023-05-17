import styles from './Notifications.module.css';
import { useContext, useEffect, useState } from 'react';
import { NotificationContext } from '../../../context/notificationContext';
import Loading from '../../general/Loading/Loading';
import NotificationList from '../../general/NotificationList/NotificationList';

function Notifications() {

    const [ notifications, setNotications ] = useState([]);
    const [ notificationLoading, setNoticationsLoading ] = useState(true)
    const [ notificationsError, setNoticationsError ] = useState('');
    const { notificationWs } = useContext(NotificationContext)


    useEffect(() => {
        if(notificationWs.readyState === 1){
            notificationWs.send(JSON.stringify({type: "GET_NOTIFICATIONS"}))
            notificationWs.send(JSON.stringify({type: "SEEN_NOTIFICATIONS"}))
        }
        notificationWs.onopen = () => {
            notificationWs.send(JSON.stringify({type: "GET_NOTIFICATIONS"}))
            notificationWs.send(JSON.stringify({type: "SEEN_NOTIFICATIONS"}))
        }

        notificationWs.onmessage = (response) => {
            const { data, type, error } = JSON.parse(response.data)
            if(type === 'GET_NOTIFICATIONS'){
                if(error){
                    setNoticationsError("Cannot fetch notifications")
                } else {
                    setNotications(data)
                }
            } else {
                if(notificationWs.readyState === 1){
                    notificationWs.send(JSON.stringify({type: "GET_NOTIFICATIONS"}))
                    notificationWs.send(JSON.stringify({type: "SEEN_NOTIFICATIONS"}))
                }
            }
            setNoticationsLoading(false)
        }
    },[notificationWs])

    return (
        <div className={styles.container}>
            {
                notificationLoading ? 
                <Loading /> :
                notificationsError ?
                notificationsError :
                notifications.length === 0 ?
                'No notifications yet' :
                notifications.map(notification => {
                    return <NotificationList key={notification?._id} data={notification} />
                })
            }
        </div>
    )
}

export default Notifications;