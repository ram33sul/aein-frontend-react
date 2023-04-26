import React, { useEffect, useState } from 'react'
import styles from './Explore.module.css'
import Search from '../../general/Search/Search';
import Post from '../../general/Post/Post';
import axios from 'axios';
import Loading from '../../general/Loading/Loading';
import UserOverlook from '../../general/UserOverlook/UserOverlook';
import { useSelector } from 'react-redux';
import FilterIcon from '../../icons/FilterIcon/FilterIcon';
function Explore() {

    const [ searchInput, setSearchInput ] = useState('');
    const [ searchResult, setSearchResult ] = useState([]);
    const [ searchLoading, setSearchLoading ] = useState(false);
    const [ posts, setPosts ] = useState([]);

    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        if(searchInput){
            setSearchLoading(true);
            axios.get(`/user/usersList?keyword=${searchInput}`).then((response) => {
                setSearchResult(response.data.users.filter((data) => data._id !== user._id && !user.blockedUsers.includes(data._id)));
            }).catch((error) => {
                console.log(error);
            }).finally(()=>{
                setSearchLoading(false);
            })
        }
    },[searchInput, user])

    useEffect(() => {
        axios.get(`/post/getExplorePosts?userId=${user?._id}`).then((response) => {
            setPosts(response.data)
        }).catch((error) => {
            console.log(error);
        })
    },[user?._id])

  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles['search-and-buttons']}>
            <Search placeholder='Search Users...' onChange={(e) => setSearchInput(e.target.value)} value={searchInput}/>
            <FilterIcon size='40px' />
            </div>
        </div>
        { searchInput.length === 0 ? 
                <div className={styles["post-body"]}>
                    {
                        posts.length ? posts.map((post) => {
                            return <Post postData={post} key={post._id}/>
                        }) : <div style={{margin: 'auto', color: 'var(--foreground-color)'}}> no posts to show </div>
                    }
                {/* <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post /> */}
            </div>
            : searchLoading ? <div className={styles.loading} > <Loading /> </div>:
            searchResult.length !== 0 ?
            <div className={styles["search-result-body"]}> 
                { searchResult.map((user) => {
                    return  (
                        <UserOverlook user={user} key={user._id}/>
                    )
                })}
            </div> :
            <div className={styles.loading} >
                No results found
            </div>
        }
    </div>
  )
}

export default Explore