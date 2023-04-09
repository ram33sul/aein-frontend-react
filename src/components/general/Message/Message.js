import React, { useState } from 'react'
import styles from './Message.module.css'
function Message({content, mood, fill, seen, sendAt}) {

    content = content || 'content';
    const backgroundColor = fill ? 'var(--foreground-color)' : 'var(--background-color)';
    const color = fill ? 'var(--background-color)' : 'var(--foreground-color)';
    const marginLeft = fill ? 'auto' : '';
    const borderBottomLeftRadius = fill ? '' : '0';
    const borderBottomRightRadius = fill ? '0' : '';
    const flexDirection = fill ? 'row-reverse' : 'row';
    sendAt = new Date(sendAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    const [ active, setActive ] = useState(false);


  return (
    <div className={styles.wrapper} style={{flexDirection, marginLeft, border: active ? '1px solid rgba(128,128,128,0.7)' : '', opacity: active ? 0.3 : '', borderBottomLeftRadius, borderBottomRightRadius}}>
        <div onClick={() => setActive(!active)} className={styles.container} style={{ backgroundColor, color, borderBottomLeftRadius, borderBottomRightRadius }}>
            {content}
        </div>
        <div className={styles["time-and-seen"]}>
            { seen && fill ? 
            <div className={styles.seen}>
                seen
            </div> : ''}
            { sendAt && fill?             <div className={styles.time}>
                {sendAt}
            </div> : ''}
        </div>
    </div>
  )
}

export default Message