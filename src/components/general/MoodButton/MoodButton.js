import React from 'react';
import styles from './MoodButton.module.css';

function MoodButton({ name, color, fill }) {

    name = name ?? 'name';
    color = color ?? 'green';


    const borderColor = color;
    const backgroundColor = fill ? color : '';
    color = fill ? 'white' : color;

  return (
    <div className={styles.container} style={{ color, borderColor, backgroundColor }}>
        { name }
    </div>
  )
};

export default MoodButton;