import React from 'react'
import styles from './Post.module.css'
import ProfilePicture from '../ProfilePicture/ProfilePicture'
import UsernameText from '../UsernameText/UsernameText'
import WithUsernameText from '../WithUsernameText/WithUsernameText'
import Message from '../Message/Message'
import Line from '../Line/Line'
import ButtonPost from '../ButtonPost/ButtonPost'
function Post({post}) {
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <ProfilePicture size='40px' />
            <UsernameText username='alexander'/>
            <WithUsernameText username='john_abraham' />
        </div>
        <div className={styles['messages-wrapper']} >
            <Message content='kjd dh nd jgdn knd skd dkjh dkfd kjdhf dkfhdkjhf kdjh dkjfd kjhfd kjhfjkd fkdfkjdhf d dkjfhkjdf j kdd djf djhfjd duhdj djhf jdhf j' />
            <Message content='dkjfh dfkjhd fdkhfdk dfdhfd dkhdhff khd fhk' fill/>
            <Line width='100%' />
            <div className={styles['actions-container']} >
                <div className={styles['actions-container-1']} >
                    <ButtonPost type='like' size='30px'/>
                    <ButtonPost type='dislike' size='30px' />
                    <ButtonPost type='comment' size='30px'/>
                    <ButtonPost type='reply' size='30px'/>
                </div>
                <ButtonPost type='share' size='30px'/>
            </div>
        </div>
    </div>
  )
}

export default Post