import React, { useState } from 'react'
import styles from './AddPost.module.css'
import Message from '../Message/Message'
import axios from 'axios';
import Loading from '../Loading/Loading';
import DisplayMessage from '../DisplayMessage/DisplayMessage';

function AddPost({messages, userId, withUserId, onCancel}) {
    messages = messages ?? [];
    onCancel = onCancel ?? (() => {});
    const [ whoCanReply, setWhoCanReply ] = useState('anyone');
    const [ showSeen, setShowSeen ] = useState(true);
    const [ showTime, setShowTime ] = useState(true);

    const [ confirmLoading, setConfirmLoading ] = useState(false);
    const [ displayMessageShow, setDisplayMessageShow ] = useState({})

    const handlePostConfirm = () => {

        setConfirmLoading(true);
        const postData = {
            messages,
            privacy: {
                whoCanReply,
                showSeen,
                showTime
            },
            withUserId
        }
        axios.post('/post/addPost', postData).then((response) => {
            console.log(response);
            setDisplayMessageShow({message: "Your Chat posted successfully", color: 'green'});
        }).catch((error) => {
            console.log(error);
            setDisplayMessageShow({message: "Your chat cannot be posted!", color: 'red'});
        }).finally(() => {
            setConfirmLoading(false)
        })
    }
  return (
    <div className={styles.container}>
        { displayMessageShow.message ? <DisplayMessage message={displayMessageShow.message} color={displayMessageShow.color} onClick={() => setDisplayMessageShow({})}/> : '' }
        <div className={styles["post-wrapper"]}>
            { messages.map((message) => {
              const { content, mood, sendAt, from, to, _id, seen} = message;
              return <Message key={_id} content={content} mood={mood} sendAt={showTime ? sendAt : null} from={from} to={to} fill={from === userId} seen={showSeen ? seen : null}/>
            })}
        </div>
        <div className={styles["privacy-wrapper"]} >
            <div className={styles.label}>
                Who can reply?
            </div>
            <div className={styles["options-container"]}>
                <div className={styles.option} style={{backgroundColor: whoCanReply === 'anyone' ? 'var(--foreground-color)' : '', color: whoCanReply === 'anyone' ? 'var(--background-color)' : ''}} onClick={() => setWhoCanReply('anyone')}>
                    anyone
                </div>
                <div className={styles.option} style={{backgroundColor: whoCanReply === 'following' ? 'var(--foreground-color)' : '', color: whoCanReply === 'following' ? 'var(--background-color)' : ''}} onClick={() => setWhoCanReply('following')}>
                    following
                </div>
                <div className={styles.option} style={{backgroundColor: whoCanReply === 'none' ? 'var(--foreground-color)' : '', color: whoCanReply === 'none' ? 'var(--background-color)' : ''}} onClick={() => setWhoCanReply('none')}>
                    none
                </div>
            </div>
            <div className={styles.label}>
                Show time?
            </div>
            <div className={styles["options-container"]}>
                <div className={styles.option} style={{backgroundColor: showTime ? 'var(--foreground-color)' : '', color: showTime ? 'var(--background-color)' : ''}} onClick={() => setShowTime(true)}>
                    Yes
                </div>
                <div className={styles.option} style={{backgroundColor: !showTime ? 'var(--foreground-color)' : '', color: !showTime ? 'var(--background-color)' : ''}} onClick={() => setShowTime(false)}>
                    No
                </div>
            </div>
            <div className={styles.label}>
                Show seen?
            </div>
            <div className={styles["options-container"]}>
                <div className={styles.option} style={{backgroundColor: showSeen ? 'var(--foreground-color)' : '', color: showSeen ? 'var(--background-color)' : ''}} onClick={() => setShowSeen(true)}>
                    Yes
                </div>
                <div className={styles.option} style={{backgroundColor: !showSeen ? 'var(--foreground-color)' : '', color: !showSeen ? 'var(--background-color)' : ''}} onClick={() => setShowSeen(false)}>
                    No
                </div>
            </div>
        </div>
        <div className={styles["buttons-container"]}>
            <div className={styles["button"]} onClick={onCancel}>
                CANCEL
            </div>
            <div className={styles["button"]} onClick={handlePostConfirm}>
                { confirmLoading ? <div className={styles.loading}> <Loading scale='0.7' /> </div>:
                'CONFIRM' }
            </div>
        </div>
    </div>
  )
}

export default AddPost