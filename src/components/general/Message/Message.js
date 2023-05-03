import React from 'react'
import styles from './Message.module.css'
import SeenIcon from '../../icons/SeenIcon/SeenIcon';
function Message({content, mood, fill, seen, sendAt, onClick, active}) {

    content = content || 'content';
    onClick = onClick ?? (() => {});
    const backgroundColor = fill ? (mood?.status ? mood?.color : 'var(--foreground-color)') : 'var(--background-color)';
    const color = fill ? 'var(--background-color)' : (mood?.status ? mood?.color : 'var(--foreground-color)');
    const borderColor = mood?.status ? mood.color : '';
    const marginLeft = fill ? 'auto' : '';
    const borderBottomLeftRadius = fill ? '' : '0';
    const borderBottomRightRadius = fill ? '0' : '';
    const flexDirection = fill ? 'row-reverse' : 'row';
    sendAt = sendAt ? new Date(sendAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '' ;



  return (
    <div className={styles.wrapper} style={{flexDirection, marginLeft, border: active ? '1px solid rgba(128,128,128,0.7)' : '', opacity: active ? 0.3 : '', backgroundColor: active ? 'rgba(128,128,128,0.5)' : '',borderBottomLeftRadius, borderBottomRightRadius}}>
        <div onClick={onClick} className={styles.container} style={{ backgroundColor, color, borderBottomLeftRadius, borderBottomRightRadius, borderColor }}>
            {content}
        </div>
        <div className={styles["time-and-seen"]}>
            { seen && fill ? 
            <div className={styles.seen}>
                <SeenIcon />
            </div> : ''}
            <div className={styles.time}>
                {sendAt}
            </div>
        </div>
    </div>
  )
}

export default Message