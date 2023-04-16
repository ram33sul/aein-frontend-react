import React from 'react'
import style from './Navicon.module.css'
import ExploreIcon from '../../icons/Explore/ExploreIcon';
import FeedIcon from '../../icons/Feed/FeedIcon';
import NotificationIcon from '../../icons/NotificationIcon/NotificationIcon';
import MessagesIcon from '../../icons/MessagesIcon/MessagesIcon';
import SettingsIcon from '../../icons/SettingsIcon/SettingsIcon';

function Navicon({src, alt, label, imageWidth, width, active, onClick, icon}) {

    onClick = onClick ?? (() => {});

  return (
    <div className={style.container} style={{width: width || 'fit-content', opacity: active ? 1 : ''}} onClick={onClick}>
        {icon === 'feed' ? <FeedIcon active={active}/> : 
        icon === 'explore' ? <ExploreIcon active={active}/> :
        icon === 'notifications' ? <NotificationIcon active={active}/> :
        icon === 'settings' ? <SettingsIcon active={active}/> :
        <MessagesIcon active={active} />
        }
        { label ? <div className={style.label}>{label}</div> : ''}
    </div>
  )
}

export default Navicon