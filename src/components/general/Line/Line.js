import React from 'react'
import style from './Line.module.css'
function Line({width, height, maxWidth}) {

    width = width ?? '80%';
    height = height ?? '1px';
    maxWidth = maxWidth ?? '';

  return (
    <div className={style.container} style={{width, height, maxWidth}}>

    </div>
  )
}

export default Line