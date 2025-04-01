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
          {/* korean 표시 */}
          <div className={styles.korean}>
            {kanji.korean.map((item, i) => (
              <div key={i}>
                {item.kun} {item.on}
              </div>
            ))}
          </div>
          {/* TODO: 음과 훈의 코드를 컴포넌트로 빼거나 동일한 로직 재사용이 가능한지 검토 */}
          {/* 훈 (kunyomi) 표시 */}
          <p
            className={`${styles.kun} ${
              !kanji.kunyomi.length ? styles.hidden : ''
            }`}
          >
            <span className={styles.label}>훈</span>
            <span className={styles.value}>
              {kanji.kunyomi.join(', ') || ''}
            </span>
          </p>

          {/* 음 (onyomi) 표시 */}
          <p
            className={`${styles.on} ${
              !kanji.onyomi.length ? styles.hidden : ''
            }`}
          >
            <span className={styles.label}>음</span>
            <span className={styles.value}>
              {kanji.onyomi.join(', ') || ''}
            </span>
          </p>

          {/* 정자체 (traditionalForm) 표시 */}
          <p
            className={`${styles.tra} ${
              !kanji.traditionalForm ? styles.hidden : ''
            }`}
          >
            <span className={styles.label}>정자체</span>
            <span className={styles.value}>{kanji.traditionalForm || ''}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
