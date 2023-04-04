import React from 'react'
import style from './Input.module.css'
function Input({label, width, type, value, setValue, error}) {

  label = label ?? "Label";
  width = width ?? '100%';
  type = type ?? 'text';
  const opacity = error ? '1' : ''; 
  const maxWidth = width ?? '300px';

  return (
    <div className={style.container} style={{ width, maxWidth }}>
        <input className={style.input} type={type} value={value} onChange={(e) => setValue(e.target.value)} style={{borderColor:error ? 'red' : '', color:error ? 'red' : '', opacity}} required/>
        <div className={style.label} style={{color:error ? 'red' : '', width: error ? '100%' : '', opacity}}>
            {label}
        </div>
        { error ?
                <span className={style.error}>{error}</span>
                : ''
            }
    </div>
  )
}

export default Input