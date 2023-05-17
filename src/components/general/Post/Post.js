import React, { useEffect, useState } from 'react'
import styles from './Post.module.css'
import ProfilePicture from '../ProfilePicture/ProfilePicture'
import UsernameText from '../UsernameText/UsernameText'
import WithUsernameText from '../WithUsernameText/WithUsernameText'
import Message from '../Message/Message'
import Line from '../Line/Line'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import LikeIcon from '../../icons/LikeIcon/LikeIcon'
import DislikeIcon from '../../icons/DislikeIcon/DislikeIcon'
import CommentIcon from '../../icons/CommentIcon/CommentIcon'
import ReplyIcon from '../../icons/ReplyIcon/ReplyIcon'
import ShareIcon from '../../icons/ShareIcon/ShareIcon'
import PostButtons from '../../higherorder/PostButtons/PostButtons'
import { useSelector } from 'react-redux'
import MoreOptionIcon from '../../icons/MoreOptionIcon/MoreOptionIcon'
function Post({postData}) {

    const [ postedUser, setPostedUser ] = useState({});
    const [ withUser, setWithUser ] = useState({});
    const [ post, setPost ] = useState(postData);
    const user = useSelector(state => state.user.user);
    const [ isDeleted, setIsDeleted ] = useState(false);

    const navigate = useNavigate()

    const [ params ] = useSearchParams();
    const activePage = params.get('activePage');

    const [ moreOptions, setMoreOptions ] = useState(false);

    const handleDeletePost = () => {
        axios.get(`/post/postBlock?id=${post?._id}`).then((response) => {
            setIsDeleted(true)
        }).catch((error) => {
            alert("Some error occured while deleting")
        })
    }
    useEffect(() => {
        if(post){
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
        }
    },[post])

    useEffect(() => {
        setPost(postData);
    },[postData])

  return (
    <div className={styles.container}>
        { isDeleted ? <div className={styles["deleted-message"]}>
            Post is deleted
        </div> : '' }
        {
        post ? <>
        <div className={styles.header}>
            <ProfilePicture size='40px' imageSrc={postedUser?.profilePicUrl} borderWidth='0' onClick={() => navigate(`/profile?userId=${postedUser?._id}`)}/>
            <UsernameText username={postedUser?.username} onClick={() => navigate(`/profile?userId=${postedUser?._id}`)}/>
            <WithUsernameText username={withUser?.username} onClick={() => navigate(`/profile?userId=${withUser?._id}`)}/>
            {
                postData?.userId === user?._id && !isDeleted ?
                <div style={{marginLeft: 'auto', position: 'relative'}}>
                    <MoreOptionIcon onClick={() => setMoreOptions(!moreOptions)}/>
                    {
                        moreOptions ? 
                        <div className={styles["delete-post-button"]} onClick={handleDeletePost}>
                            Delete
                        </div> : ""
                    } 
                </div> :
                ''
            }
        </div>
        <div className={styles['messages-wrapper']} >
            <div onClick={() => navigate(`/postDetails?id=${post._id}&activePage=replies`)}>
            {
                post.messages.map((message) => {
                    const { _id, content, mood, sendAt, seen, from} = message;
                    return <Message key={_id} content={content} mood={mood} sendAt={post?.showTime ? sendAt : ''} fill={from === post?.userId} seen={post?.showSeen ? seen : ''}/>
                })
            }
            </div>
            <Line width='100%' />
            <div className={styles['actions-container']} >
                <div className={styles['actions-container-1']} >
                    <PostButtons postedUser={postedUser} Component={LikeIcon} postId={post?._id} count={post?.likes?.length} active={post?.likes?.includes(user?._id)} setPostFunction={setPost}/>
                    <PostButtons postedUser={postedUser} Component={DislikeIcon} postId={post?._id} count={post?.dislikes?.length} active={post?.dislikes?.includes(user?._id)} setPostFunction={setPost} />
                    <PostButtons postedUser={postedUser} Component={CommentIcon} postId={post?._id} count={post?.commentsCount} active={activePage==='comments'} onClick={() => navigate(`/postDetails?id=${post._id}&activePage=comments`)}/>
                    <PostButtons postedUser={postedUser} Component={ReplyIcon} postId={post?._id} count={post?.repliesCount} active={activePage==='replies'} onClick={() => navigate(`/postDetails?id=${post._id}&activePage=replies`)} />
                </div>
                <PostButtons Component={ShareIcon} postId={post?._id} count={post?.sharesCount} />
            </div>
        </div> </> : 'Loading' }
    </div>
  )
}

export default Post