import React from 'react';
import styles from './Button.module.css';
import Loading from '../Loading/Loading';

function Button({width, maxWidth, height, content, onClick, loading}){
    width = width ?? 'fit-content';
    height = height ?? 'fit-content';
    maxWidth = maxWidth ?? '';
    content = content ?? 'SUBMIT';
    onClick = (loading || !onClick) ? (() => {}) : onClick;
    return (
        <div className={styles.container} style={{width, height, maxWidth, color: loading ? 'transparent' : ''}} onClick={onClick} >
            { content }
            { loading ? <div className={styles.loading}><Loading scale={0.8}/> </div> : ''}
        </div>
    )
}

export default Button;