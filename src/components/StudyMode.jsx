import kanjiList from '../data/kanji.json';
import KanjiCard from './KanjiCard.jsx';
import styles from '../css/StudyMode.module.css';
import React from 'react';

export default function StudyMode() {
  return (
    <div className={styles.list}>
      {kanjiList.map((kanji) => (
        <KanjiCard key={kanji.id} kanji={kanji} />
      ))}
    </div>
  );
}
