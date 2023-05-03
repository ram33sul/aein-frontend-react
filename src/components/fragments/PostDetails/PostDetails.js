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
                <CommentBox postId={id}/> : 
            activePage === 'replies' ?
                <RepliesBox postId={id} /> :
            ''
        }
    </div>
  )
}

export default PostDetails