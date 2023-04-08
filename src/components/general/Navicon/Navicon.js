import React from 'react'
import style from './Navicon.module.css'

function Navicon({src, alt, label, imageWidth, width, active, onClick}) {

    onClick = onClick ?? (() => {});
  return (
    <div className={style.container} style={{width: width || 'fit-content', opacity: active ? 1 : ''}} onClick={onClick}>
        <img src={src} style={{width: imageWidth || '40px'}} alt={alt || 'loading'} />
        { label ? <div className={style.label}>{label}</div> : ''}
    </div>
  )
}

export default Navicon