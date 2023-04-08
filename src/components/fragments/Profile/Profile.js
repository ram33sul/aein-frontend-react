import React, { useEffect, useState } from "react";
import styles from './Profile.module.css';
import ProfilePicture from "../../general/ProfilePicture/ProfilePicture";
import UsernameText from "../../general/UsernameText/UsernameText";
import Post from "../../general/Post/Post";
import axios from "axios";
import Loading from "../../general/Loading/Loading";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLogout } from "../../../redux/user/userActions";

function Profile() {

    const dispatch = useDispatch();
    const [ params ] = useSearchParams();
    const username = params.get("username");
    const email = params.get("email");
    const [ pageLoading, setPageLoading ] = useState(true);
    const [ user, setUser ] = useState({});
    const loggedInUser = useSelector((state) => state.user.username);
    const [ moreOptions, setMoreOptions ] = useState(false);

    const handleLogout = () => {
        axios.get('/logout').then((response) => {
            dispatch(fetchUserLogout());
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        axios.get(`/userDetails?username=${username}&email=${email}`).then((response) => {
            setUser(response.data);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setPageLoading(false);
        })
    },[username,email])


    return(
        
        <div className={styles.container}>
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
                        <div className={styles["header-button"]}>
                            Edit profile
                        </div> :
                        <div className={styles["header-button"]} style={{backgroundColor: 'var(--gold-color)', color: 'var(--background-color)', borderColor: 'var(--gold-color)'}}>
                            Follow
                        </div>
                    }
                </div>

                <div className={styles["header-middle"]}>
                    <ProfilePicture size='100px' borderWidth='0'/>
                </div>

                <div className={styles["header-section"]}>
                    <div className={styles["header-follow-section"]}>
                        <div className={styles["header-follow-count"]}>
                            {user.followers?.length ?? 'loading'}
                        </div>
                        <div className={styles["header-follow-label"]} >
                            Following
                        </div>
                    </div>
                    <div className={styles["header-button"]}>
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
                        <img src="/icons/black/moreoptions-icon-black.png" alt="---" className={styles["more-options-image"]} onClick={() => setMoreOptions(!moreOptions)}/>
                        { moreOptions ? user.username === loggedInUser ? 
                            <div className={styles["more-options"]} onBlur={() => setMoreOptions(false)}>
                                <div className={styles["more-options-option"]} onClick={handleLogout}>
                                    Logout
                                </div>
                                {/* <div className={styles["more-options-option"]}>
                                    Change color mode
                                </div> */}
                            </div> : 
                            <div className={styles["more-options"]}>
                                <div className={styles["more-options-option"]}>
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
                    Professional soccer player <br />
                    From portugal
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