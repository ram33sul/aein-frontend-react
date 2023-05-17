import React, {useState, useEffect } from 'react';
import styles from './Comment.module.css';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import UsernameText from '../UsernameText/UsernameText';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Comment({content, userId, _id, postId, decrementCommentsCount}){

    const [ user, setUser ] = useState({});
    const currentUser = useSelector(state => state.user.user)

    const [ isDeleted, setIsDeleted ] = useState(false);

    const handleDeleteComment = () => {
        axios.delete(`/post/deleteComment?commentId=${_id}&postId=${postId}`).then((response) => {
            setIsDeleted(true);
            decrementCommentsCount?.()
        }).catch((error) => {
            console.log(error);
            alert("Error occured while deleting");
        })
    }

    useEffect(() => {
        axios.get(`/user/userDetails?userId=${userId}`).then((response) => {
            setUser(response.data)
        }).catch((error) => {
            console.log(error?.response?.data);
        })
    },[userId])
    return (
        <div className={styles.container}>
            {
                isDeleted ?
                <div className={styles["deleted-message"]}>
                    Comment is deleted
                </div> : ''
            }
            <div className={styles['profilePic-username-wrapper']}>
                <ProfilePicture imageSrc={user.profilePicUrl} borderWidth='0' size='20px' />
                <UsernameText username={user.username} fontSize='13px' opacity='0.5'/>
                {
                    currentUser?._id === user?._id && !isDeleted ?
                    <div className={styles["delete-button"]} onClick={handleDeleteComment}>
                        Delete
                    </div> : ''
                }
            </div>
            <div className={styles.comment}>
                {content}
            </div>
        </div>
    )
}

export default Comment;