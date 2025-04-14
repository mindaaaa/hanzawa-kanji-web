import React, { useState } from 'react';
import styles from '../shared/css/KanjiCard.module.css';
import ReadingRow from './ReadingRow.jsx';

const areEqual = (prev, next) => {
  return prev.kanji.id === next.kanji.id && prev.flipped === next.flipped;
};

function KanjiCard({ kanji, flipped: flippedProp, onClick, backContent }) {
  const [internalFlip, setInternlFlip] = useState(false);
  const isControlled = flippedProp !== undefined;
  const flipped = isControlled ? flippedProp : internalFlip;

  return (
    <div className={styles['card-wrapper']}>
      <div
        className={`${styles.card} ${flipped ? styles.flipped : ''}`}
        onClick={() => {
          if (!isControlled) setInternlFlip((prev) => !prev);
          if (onClick) return onClick();
        }}
      >
        <div className={styles.front}>{kanji.value}</div>
        <div className={styles.back}>
          {backContent ? (
            backContent
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(KanjiCard, areEqual);
