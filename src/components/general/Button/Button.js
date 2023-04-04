import React from 'react';
import style from './Button.module.css';

function Button({width, maxWidth, height, content, onClick}){
    return (
        <div className={style.container} style={{width: width || 'fit-content', height: height || 'fit-content', maxWidth: maxWidth || ''}} onClick={onClick} >
            { content || 'SUBMIT'}
        </div>
    )
}

export default Button;