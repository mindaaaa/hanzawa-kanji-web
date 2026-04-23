import React, { useState } from 'react';
import styles from './KanjiCard.module.css';
import ReadingRow from './ReadingRow.jsx';

const areEqual = (prev, next) =>
  prev.kanji.id === next.kanji.id &&
  prev.flipped === next.flipped &&
  prev.variant === next.variant &&
  prev.backContent === next.backContent;

function KanjiCard({
  kanji,
  flipped: flippedProp,
  onClick,
  backContent,
  variant = 'paper',
}) {
  const [internalFlip, setInternalFlip] = useState(false);
  const isControlled = flippedProp !== undefined;
  const flipped = isControlled ? flippedProp : internalFlip;

  return (
    <div className={styles['card-wrapper']}>
      <div
        className={[styles.card, styles[variant], flipped ? styles.flipped : '']
          .filter(Boolean)
          .join(' ')}
        onClick={() => {
          if (!isControlled) setInternalFlip((prev) => !prev);
          if (onClick) return onClick();
        }}
      >
        <div className={styles.front}>
          <span className={styles.num}>#{String(kanji.id).padStart(4, '0')}</span>
          <span className={styles.char}>{kanji.value}</span>
        </div>
        <div className={styles.back}>
          {backContent ? (
            backContent
          ) : (
            <>
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
