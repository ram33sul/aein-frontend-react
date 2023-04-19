import React, { useState } from 'react'
import styles from './BlockedListOutlook.module.css'
import UserOverlook from '../UserOverlook/UserOverlook'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserSuccess } from '../../../redux/user/userActions';

function BlockedListOutlook({user, messageDisplayFunction}) {

    const [ buttonLoading, setButtonLoading ] = useState(false);

    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const handleUnblockClick = () => {
        setButtonLoading(true);
        axios.patch('/user/unblockUser',{
            userId: state.user.user._id,
            unblockUserId: user._id
        }).then((response) => {
            messageDisplayFunction({message: `User (${user.username}) Blocked successfully`, color: 'green'})
            dispatch(fetchUserSuccess(response.data));
        }).catch((error) => {
            messageDisplayFunction({message: "Error occured while blocking the user!", color: 'red'})
        }).finally(() => {
            setButtonLoading(false);
        })
    }

  return (
    <div className={styles.container}>
        <UserOverlook user={user} />
        <div className={styles.button} style={{opacity: buttonLoading ? 0.1 : ''}} onClick={buttonLoading ? (() => {}) : handleUnblockClick}>
            UNBLOCK
        </div>
    </div>
  )
}

export default BlockedListOutlook