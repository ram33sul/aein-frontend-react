import React from 'react'
import styles from './Search.module.css'
function Search({placeholder, setValue}) {

    setValue = setValue || (() => {});
    
  return (
    <input onChange={(e) => setValue(e.target.value)} placeholder={placeholder || 'Search...'} className={styles.input} />
  )
}

export default Search