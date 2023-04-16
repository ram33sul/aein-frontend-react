import React from 'react'
import style from './Input.module.css'
function Input({label, width, type, value, onChange, error}) {

  label = label ?? "Label";
  width = width ?? '100%';
  type = type ?? 'text';
  onChange = onChange ?? (() => {});
  const opacity = error ? '1' : ''; 
  const maxWidth = width ?? '300px';

  return (
    <div className={style.container} style={{ width, maxWidth}}>
        <input className={style.input} type={type} value={value} onChange={onChange} style={{borderColor:error ? 'red' : '', color:error ? 'red' : '', opacity}} required/>
        <div className={style.label} style={{color:error ? 'red' : '', opacity}}>
            {error ? error : label}
        </div>
        {/* { error ?
                <span className={style.error}>{error}</span>
                : ''
            } */}
    </div>
  )
}

export default Input