import React, { useEffect, useState } from "react";
import styles from './Profile.module.css';
import ProfilePicture from "../../general/ProfilePicture/ProfilePicture";
import UsernameText from "../../general/UsernameText/UsernameText";
import Post from "../../general/Post/Post";
import axios from "axios";
import Loading from "../../general/Loading/Loading";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLogout } from "../../../redux/user/userActions";
import { wsDisconnect } from "../../../redux/webSocket/wsActions";
import MoreOptionIcon from "../../icons/MoreOptionIcon/MoreOptionIcon";

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
    const [ moreOptions, setMoreOptions ] = useState(false);
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

    const handleChangeTheme = () => {
        const theme = JSON.parse(localStorage.getItem("aein-app-theme"));
        if(theme === 'dark'){
            document.documentElement.style.setProperty('--background-color','white');
            document.documentElement.style.setProperty('--foreground-color','black');
            localStorage.setItem("aein-app-theme", JSON.stringify("light"));
        } else {
            document.documentElement.style.setProperty('--background-color','black');
            document.documentElement.style.setProperty('--foreground-color','white');
            localStorage.setItem("aein-app-theme", JSON.stringify("dark"));
        }
    }

    useEffect(() => {
        axios.get(`/user/userDetails?username=${username}&email=${email}`).then((response) => {
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
                        <div className={styles["header-button"]} onClick={() => navigate('/editProfile')}>
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
                        <MoreOptionIcon onClick={() => setMoreOptions(!moreOptions)} onBlur={() => setMoreOptions(!moreOptions)}/>
                        { moreOptions ? user.username === loggedInUser ? 
                            <div className={styles["more-options"]} onBlur={() => setMoreOptions(false)}>
                                <div className={styles["more-options-option"]} onClick={handleLogout}>
                                    Logout
                                </div>
                                <div className={styles["more-options-option"]} onClick={handleChangeTheme}>
                                    Change theme
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