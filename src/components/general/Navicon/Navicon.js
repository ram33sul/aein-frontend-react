import React from 'react'
import style from './Navicon.module.css'
import ExploreIcon from '../../icons/Explore/ExploreIcon';
import FeedIcon from '../../icons/Feed/FeedIcon';
import NotificationIcon from '../../icons/NotificationIcon/NotificationIcon';
import MessagesIcon from '../../icons/MessagesIcon/MessagesIcon';
import SettingsIcon from '../../icons/SettingsIcon/SettingsIcon';

function Navicon({src, alt, label, imageWidth, width, active, onClick, icon, count}) {

    onClick = onClick ?? (() => {});

  return (
    <div className={style.container} style={{width: width || 'fit-content'}} onClick={onClick}>
        {icon === 'feed' ? <FeedIcon active={active} opacity = { active ? 1 : 0.5 }/> : 
        icon === 'explore' ? <ExploreIcon active={active} opacity = { active ? 1 : 0.5 }/> :
        icon === 'notifications' ? <NotificationIcon count={count} active={active} opacity = { active ? 1 : 0.5 }/> :
        icon === 'settings' ? <SettingsIcon active={active} opacity = { active ? 1 : 0.5 }/> :
        <MessagesIcon active={active} />
        }
        { label ? <div className={style.label} style={{opacity: active ? 1 : 0.5}}>{label}</div> : ''}
    </div>
  )
}

export default Navicon