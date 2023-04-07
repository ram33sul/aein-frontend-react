import React from 'react'
import styles from './Search.module.css'
function Search({placeholder, onChange, value}) {

    onChange = onChange || (() => {});

  return (
    <input onChange={onChange} value={value} placeholder={placeholder || 'Search...'} className={styles.input} />
  )
}

export default Search