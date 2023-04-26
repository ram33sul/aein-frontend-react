import React, { useEffect, useState } from 'react'
import styles from './Post.module.css'
import ProfilePicture from '../ProfilePicture/ProfilePicture'
import UsernameText from '../UsernameText/UsernameText'
import WithUsernameText from '../WithUsernameText/WithUsernameText'
import Message from '../Message/Message'
import Line from '../Line/Line'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import LikeIcon from '../../icons/LikeIcon/LikeIcon'
import DislikeIcon from '../../icons/DislikeIcon/DislikeIcon'
import CommentIcon from '../../icons/CommentIcon/CommentIcon'
import ReplyIcon from '../../icons/ReplyIcon/ReplyIcon'
import ShareIcon from '../../icons/ShareIcon/ShareIcon'
import PostButtons from '../../higherorder/PostButtons/PostButtons'
import { useSelector } from 'react-redux'
function Post({postData}) {

    const [ postedUser, setPostedUser ] = useState({});
    const [ withUser, setWithUser ] = useState({});
    const [ post, setPost ] = useState(postData);
    const user = useSelector(state => state.user.user)

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`/user/userDetails?userId=${post?.userId}`).then((response) => {
            setPostedUser(response.data)
        }).catch((error) => {
            console.log(error);
        })
        axios.get(`/user/userDetails?userId=${post?.withUserId}`).then((response) => {
            setWithUser(response.data)
        }).catch((error) => {
            console.log(error);
        })
    },[post?.userId, post?.withUserId])
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <ProfilePicture size='40px' imageSrc={postedUser?.profilePicUrl} borderWidth='0' onClick={() => navigate(`/profile?userId=${postedUser?._id}`)}/>
            <UsernameText username={postedUser?.username} onClick={() => navigate(`/profile?userId=${postedUser?._id}`)}/>
            <WithUsernameText username={withUser?.username} onClick={() => navigate(`/profile?userId=${withUser?._id}`)}/>
        </div>
        <div className={styles['messages-wrapper']} >
            {
                post.messages.map((message) => {
                    const { _id, content, mood, sendAt, seen, from} = message;
                    return <Message key={_id} content={content} mood={mood} sendAt={post?.showTime ? sendAt : ''} fill={from === post?.userId} seen={post?.showSeen ? seen : ''}/>
                })
            }
            <Line width='100%' />
            <div className={styles['actions-container']} >
                <div className={styles['actions-container-1']} >
                    <PostButtons Component={LikeIcon} postId={post?._id} count={post?.likes?.length} active={post?.likes?.includes(user?._id)} setPostFunction={setPost}/>
                    <PostButtons Component={DislikeIcon} postId={post?._id} count={post?.dislikes?.length} active={post?.dislikes?.includes(user?._id)} setPostFunction={setPost} />
                    <PostButtons Component={CommentIcon} postId={post?._id} count={post?.comments?.length} />
                    <PostButtons Component={ReplyIcon} postId={post?._id} count={post?.replies?.length} />
                </div>
                <PostButtons Component={ShareIcon} postId={post?._id} count={post?.shares?.length} />
            </div>
        </div>
    </div>
  )
}

export default Post