import React, { useEffect, useState } from 'react';
import styles from './Feed.module.css';
import Search from '../../general/Search/Search';
import Status from '../../general/Status/Status';
import Post from '../../general/Post/Post';
import Line from '../../general/Line/Line';
import FilterIcon from '../../icons/FilterIcon/FilterIcon';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Feed() {

  const [ posts, setPosts ] = useState([]);
  const state = useSelector(state => state);
  const user = state.user.user

  useEffect(() => {
    axios.get(`/post/getPosts?userId=${user._id}`).then((response) => {
      setPosts(response.data);
    }).catch((error) => {
      console.log(error);
    })
  },[user._id])

  return (
    <div className={styles.container}>
        <div className={styles.header}>
        <div className={styles['search-and-buttons']}>
            <Search placeholder='Search feed...' />
            <FilterIcon size='40px' />
        </div>
        <Status />
        <div className={styles.line}>
        <Line width='100%'/>
        </div>
        </div>
        <div className={styles['post-container']}>
            {
              posts.length ?
              posts.map((post) => {
                return <Post post={post} />
              }) : 'No posts to show'
            }
            <Post />
            <Post />
            <Post />
            <Post />
            <div className={styles.extraSpace}>
            </div>
        </div>
    </div>
  )
}

export default Feed