import React from 'react';
import styles from './KanjiCell.module.css';

function KanjiCell({ kanji, displayNumber, flipped = false, onClick }) {
  const primary = kanji.korean?.[0];
  const meaning = primary ? `${primary.kun} ${primary.on}` : '';
  const hasKunyomi = kanji.kunyomi?.length > 0;
  const hasOnyomi = kanji.onyomi?.length > 0;
  const badge = String(displayNumber ?? kanji.id).padStart(4, '0');

  return (
    <button
      type='button'
      className={[styles.cell, flipped ? styles.flipped : ''].filter(Boolean).join(' ')}
      onClick={() => onClick?.(kanji)}
      aria-pressed={flipped}
      aria-label={`${kanji.value}${meaning ? ' · ' + meaning : ''}`}
    >
      {!flipped ? (
        <>
          <span className={styles.id}>{badge}</span>
          <span className={styles.char}>{kanji.value}</span>
        </>
      ) : (
        <div className={styles.back}>
          <span className={styles.backChar}>{kanji.value}</span>
          <span className={styles.meaning}>{meaning}</span>
          <span className={styles.readings}>
            {hasKunyomi && (
              <span>
                <b>훈</b>
                {kanji.kunyomi.join(' · ')}
              </span>
            )}
            {hasOnyomi && (
              <span>
                <b>음</b>
                {kanji.onyomi.join(' · ')}
              </span>
            )}
          </span>
        </div>
      )}
    </button>
  );
}

export default React.memo(KanjiCell);
