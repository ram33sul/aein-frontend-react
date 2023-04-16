import React from 'react';
import styles from './Feed.module.css';
import Search from '../../general/Search/Search';
import Status from '../../general/Status/Status';
import Post from '../../general/Post/Post';
import Line from '../../general/Line/Line';
import FilterIcon from '../../icons/FilterIcon/FilterIcon';

function Feed() {
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