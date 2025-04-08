import React from 'react';
import styles from '../css/KanjiCard.module.css';

function ReadingRow({ type, label, value }) {
  return (
    <p className={`${styles[type]} ${!value.length ? styles.hidden : ''}`}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value.join(', ')}</span>
    </p>
  );
}

const areEqual = (prev, next) =>
  prev.type === next.type &&
  prev.label === next.label &&
  JSON.stringify(prev.value) === JSON.stringify(next.value);

export default React.memo(ReadingRow, areEqual);
