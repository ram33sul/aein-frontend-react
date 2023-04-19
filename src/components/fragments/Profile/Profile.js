import React, { useEffect, useState } from "react";
import styles from './Profile.module.css';
import ProfilePicture from "../../general/ProfilePicture/ProfilePicture";
import UsernameText from "../../general/UsernameText/UsernameText";
import Post from "../../general/Post/Post";
import axios from "axios";
import Loading from "../../general/Loading/Loading";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLogout, fetchUserSuccess } from "../../../redux/user/userActions";
import { wsDisconnect } from "../../../redux/webSocket/wsActions";
import MoreOptionIcon from "../../icons/MoreOptionIcon/MoreOptionIcon";
import DisplayMessage from "../../general/DisplayMessage/DisplayMessage";


function Profile() {

    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const ws = state.webSocket.ws;
    const [ params ] = useSearchParams();
    const username = params.get("username");
    const email = params.get("email");
    const [ pageLoading, setPageLoading ] = useState(true);
    const [ user, setUser ] = useState({});
    const loggedInUser = state.user.user.username;
    const profilePic = user.profilePicUrl;
    const [ moreOptions, setMoreOptions ] = useState(false);
    const [ isFollowing, setIsFollowing ] = useState('loading');
    const [ followLoading, setFollowLoading ] = useState(false);
    const [ showDisplayMessage, setShowDisplayMessage ] = useState(false)
    const [ shareProfileLoading, setShareProfileLoading ] = useState(false)
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.get('/user/logout').then((response) => {
            ws.close();
            dispatch(wsDisconnect());
            dispatch(fetchUserLogout());
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleFollow = () => {
        setFollowLoading(true);
        axios.post('user/follow',{
            followingUserId: state.user.user._id,
            followedUserId: user._id
        }).then((response) => {
            dispatch(fetchUserSuccess(response.data))
        }).catch((error) => {
            setShowDisplayMessage({message: error.response.data[0].message, color: 'red'});
        }).finally(() => {
            setFollowLoading(false);
        })
    }

    const handleUnfollow = () =>{
        setFollowLoading(true);
        axios.post('user/unfollow',{
            unfollowingUserId: state.user.user._id,
            unfollowedUserId: user._id
        }).then((response) => {
            dispatch(fetchUserSuccess(response.data))
        }).catch((error) => {
            showDisplayMessage({message: error.response.data[0].message, color: 'red'})
        }).finally(() => {
            setFollowLoading(false);
        })
    }

    const handleBlockuser = () => {
        axios.post('user/blockUser', {
            userId: state.user.user._id,
            userIdToBeBlocked: user._id
        }).then((response) => {
            dispatch(fetchUserSuccess(response.data))
            setShowDisplayMessage({message: `user (${username}) Blocked successfully`, color: 'green'})
        }).catch((error) => {
            setShowDisplayMessage({message: error.response.data[0].message, color: 'red'})
        })
    }

    const handleShareProfileClick = () => {
        setShareProfileLoading(true);
        axios.get(`/user/shareProfile?userId=${user._id}`).then((response) => {
            setShowDisplayMessage({message: `url: ${response.data.url}`, color: 'blue'})
        }).catch((error) => {
            setShowDisplayMessage({message: "Error occured while loading!", color: 'red'})
        }).finally(() => {
            setShareProfileLoading(false)
        })
    }

    useEffect(() => {
        axios.get(`/user/userDetails?username=${username}&email=${email}`).then((response) => {
            if(state.user.user.blockedUsers.includes(response.data._id)){
                return;
            }
            setUser(response.data);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setPageLoading(false);
        })
    },[username, email, user, state])

    useEffect(() => {
        if(!user._id){
            return;
        }
        if(state.user.user.following.includes(user._id)){
            return setIsFollowing('yes');
        }
        setIsFollowing('no')
    },[state, user])


    return(
        
        <div className={styles.container} style={{overflowY: showDisplayMessage.message ? 'hidden' : ''}}>
            {showDisplayMessage.message ? <DisplayMessage message={showDisplayMessage.message} color={showDisplayMessage.color} onClick={showDisplayMessage.color === 'green' ? () => navigate('/') : () => setShowDisplayMessage(false)}/> : ''}
            {pageLoading ? <Loading /> : user.username ? <>
            <div className={styles.username}>
                <UsernameText fontSize='20px'  username={user.username ?? 'loading'}/>
            </div>
            <div className={styles.header}>
                <div className={styles["header-section"]}>
                    <div className={styles["header-follow-section"]}>
                        <div className={styles["header-follow-count"]}>
                            {user.followers?.length ?? 'loading'}
                        </div>
                        <div className={styles["header-follow-label"]} >
                            Followers
                        </div>
                    </div>
                    { user.username === loggedInUser ?
                        <div className={styles["header-button"]} onClick={() => navigate('/editProfile')}>
                            Edit profile
                        </div> : <>
                        {
                            isFollowing === 'yes' ?
                            <div className={styles["header-button"]} style={{backgroundColor: 'var(--foreground-color)', color: 'var(--background-color)', borderColor: 'var(--foreground-color)'}} onClick={handleUnfollow}>
                                { followLoading ? <Loading scale='0.7' /> :                            
                                'Unfollow' }
                            </div> :
                            isFollowing === 'no' ?
                            <div className={styles["header-button"]} style={{backgroundColor: 'var(--gold-color)', color: 'var(--background-color)', borderColor: 'var(--gold-color)'}} onClick={handleFollow}>                            
                                 { followLoading ? <Loading scale='0.7' /> :                            
                                'Follow' }
                            </div> :
                            <div className={styles["header-button"]} style={{backgroundColor: 'var(--background-color)', color: 'var(--background-color)', borderColor: 'var(--foreground-color)'}}>                            
                                <Loading scale='0.7'/>
                            </div>
                        } </>
                    } 
                </div>

                <div className={styles["header-middle"]}>
                    <ProfilePicture size='100px' borderWidth='0' imageSrc={profilePic}/>
                </div>

                <div className={styles["header-section"]}>
                    <div className={styles["header-follow-section"]}>
                        <div className={styles["header-follow-count"]}>
                            {user.following?.length ?? 'loading'}
                        </div>
                        <div className={styles["header-follow-label"]} >
                            Following
                        </div>
                    </div>
                    <div className={styles["header-button"]} style={{opacity: shareProfileLoading ? '0.3' : ''}} onClick={shareProfileLoading ? () => {} : handleShareProfileClick}>
                        Share Profile
                    </div>
                </div>
            </div>
            <div className={styles.bio}>
                <div className={styles["bio-header"]}>
                    <div className={styles.name}>
                        {user.name ?? 'loading'}
                    </div>
                    <div className={styles["more-options-button"]}>
                        <MoreOptionIcon onClick={() => setMoreOptions(!moreOptions)} onBlur={() => setMoreOptions(!moreOptions)}/>
                        { moreOptions ? user.username === loggedInUser ? 
                            <div className={styles["more-options"]} onBlur={() => setMoreOptions(false)}>
                                <div className={styles["more-options-option"]} onClick={handleLogout}>
                                    Logout
                                </div>
                                <div className={styles["more-options-option"]} onClick={() => navigate('/settings')}>
                                    Settings
                                </div>
                                {/* <div className={styles["more-options-option"]}>
                                    Change color mode
                                </div> */}
                            </div> : 
                            <div className={styles["more-options"]}>
                                <div className={styles["more-options-option"]} onClick={handleBlockuser}>
                                    Block user
                                </div>
                                <div className={styles["more-options-option"]}>
                                    Send message
                                </div>
                            </div> : ''
                        }
                    </div>
                </div>
                <div className={styles["bio-text"]}>
                    {user.bio.length ? user.bio : <span style={{opacity: '0.5', transition: 'var(--transition),color 0s'}}>no bio yet...</span>}
                </div>
            </div>
            <div className={styles.body}>
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
            </> : <div style={{textAlign: "center"}}> No such User! </div>}
        </div>
    )
}

export default Profile;