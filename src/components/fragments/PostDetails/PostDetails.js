import React, { useEffect, useState } from 'react'
import styles from './PostDetails.module.css'
import Post from '../../general/Post/Post'
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import CommentBox from '../../general/CommentBox/CommentBox';
import RepliesBox from '../../general/RepliesBox.js/RepliesBox';
function PostDetails() {
    
    const [ params ] = useSearchParams();

    const [ postData, setPostData ] = useState(null);
    const id = params.get("id");
    const activePage = params.get("activePage");

    const incrementCommentsCount = () => {
        setPostData({
            ...postData,
            commentsCount: postData?.commentsCount+1
        })
    }

    const decrementCommentsCount = () => {
        setPostData({
            ...postData,
            commentsCount: postData?.commentsCount-1
        })
    }

    const incrementRepliesCount = () => {
        setPostData({
            ...postData,
            repliesCount: postData?.repliesCount+1
        })
    }


    useEffect(() => {
        if(id){
            axios.get(`/post/postDetails?id=${id}`).then((response) => {
                setPostData(response.data);
            }).catch(error => {
                console.log(error.response.data);
            })
        }
    },[id])

  return (
    <div className={styles.container}>
        <Post postData={postData} />
        {   activePage === 'comments' ? 
                <CommentBox postUserId = {postData?.userId} postId={id} incrementCommentsCount={incrementCommentsCount} decrementCommentsCount={decrementCommentsCount}/> : 
            activePage === 'replies' ?
                <RepliesBox postUserId = {postData?.userId} postId={id} incrementRepliesCount={incrementRepliesCount} /> :
            ''
        }
    </div>
  )
}

export default PostDetails