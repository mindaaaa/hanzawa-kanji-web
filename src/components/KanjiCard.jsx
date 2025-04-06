import React, { useState } from 'react';
import styles from '../css/KanjiCard.module.css';
import ReadingRow from './ReadingRow.jsx';

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
          <ReadingRow type='kun' label='훈' value={kanji.kunyomi || []} />
          <ReadingRow type='on' label='음' value={kanji.onyomi || []} />
          <ReadingRow
            type='tra'
            label='정자체'
            value={kanji.traditionalForm ? [kanji.traditionalForm] : []}
          />
        </div>
      </div>
    </div>
  );
}
