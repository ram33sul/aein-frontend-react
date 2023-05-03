import React from 'react'
import styles from './PostButtons.module.css'
import { useSelector } from 'react-redux';
function PostButtons({Component, count, active, postId, setPostFunction, onClick}) {
    Component = Component ?? <div />
    count ??= 0;
    active ??= false;

    const user = useSelector(state => state?.user?.user)


  return (
    <div className={styles.container} onClick={onClick}>
        <Component active={active} userId={user?._id} postId={postId} setPostFunction={setPostFunction}/>
        <div className={styles.count}>
            {count}
        </div>
    </div>
  )
}

export default PostButtons