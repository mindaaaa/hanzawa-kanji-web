import React, { useState } from 'react';
import styles from '../css/KanjiCard.module.css';

export default function KanjiCard({ kanji }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={styles['card-wrapper']}>
      <div
        className={`${styles.card} ${flipped ? styles.flipped : ''}`}
        onClick={() => setFlipped(!flipped)}
      >
        <div className={styles.front}>{kanji.value}</div>
        <div className={styles.back}>
          <div className={styles.korean}>
            {kanji.korean.map((item, i) => (
              <div key={i}>
                {item.kun} {item.on}
              </div>
            ))}
          </div>
          <p className={styles.on}>
            <span className={styles.label}>음</span>
            <span className={styles.value}>{kanji.onyomi.join(', ')}</span>
          </p>
          <p className={styles.kun}>
            <span className={styles.label}>훈</span>
            <span className={styles.value}>{kanji.kunyomi.join(', ')}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
