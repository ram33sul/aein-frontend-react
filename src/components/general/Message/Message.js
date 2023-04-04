import React from 'react'
import styles from './Message.module.css'
function Message({content, mood, fill}) {

    content = content || 'content';
    const backgroundColor = fill ? 'var(--foreground-color)' : 'var(--background-color)';
    const color = fill ? 'var(--background-color)' : 'var(--foreground-color)';
    const marginLeft = fill ? 'auto' : '';
    const borderBottomLeftRadius = fill ? '' : '0';
    const borderBottomRightRadius = fill ? '0' : '';

  return (
    <div className={styles.container} style={{ backgroundColor, color, marginLeft, borderBottomLeftRadius, borderBottomRightRadius }}>
        {content}
    </div>
  )
}

export default Message