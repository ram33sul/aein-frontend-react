import React, { useContext, useEffect, useState} from 'react';
import styles from './CommentBox.module.css';
import InputMessage from '../InputMessage/InputMessage';
import Comment from '../Comment/Comment';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useScrollToBottom } from '../../../services/services';
import { NotificationContext } from '../../../context/notificationContext';

function CommentBox({postId, incrementCommentsCount, decrementCommentsCount, postUserId}) {

    const user = useSelector(state => state.user.user);
    const [ comments, setComments ] = useState(null);

    const commentsWrapper = useScrollToBottom(comments)

    const { notificationWs } = useContext(NotificationContext);

    const handleSendComment = (comment) => {
        return new Promise((resolve, reject) => {
            axios.post('/post/comment', {
                userId: user._id,
                postId,
                content: comment
            }).then((response) => {
                console.log(response);
                // setComments(comments => [...comments, {
                //     _id: comments?.length,
                //     userId: user?._id,
                //     postId,
                //     content: comment
                // }])
                setComments(response.data);
                incrementCommentsCount?.()
                resolve(true)
                if(notificationWs.readyState === 1){
                    notificationWs.send(JSON.stringify({data: {to: postUserId, on: postId}, type: "COMMENT"}))
                }
            }).catch((error) => {
                reject(false)
                console.log(error);
            })
        })
    }


    useEffect(() => {
        axios.get(`/post/comments?postId=${postId}`).then((response) => {
            setComments(response.data)
        }).catch((error) => {
            console.log(error);
        })

    },[postId])
    return(
        <div className={styles.container} >
            {   (comments && comments.length) ?
                <div className={styles["comments-wrapper"]} ref={commentsWrapper}>
                {
                    comments.map((comment) => {
                        return <Comment {...comment} key={comment._id} decrementCommentsCount={decrementCommentsCount}/>
                    })
                } </div> : ''
            }
            <InputMessage onSend={handleSendComment} />
        </div>
    )
}


export default CommentBox;