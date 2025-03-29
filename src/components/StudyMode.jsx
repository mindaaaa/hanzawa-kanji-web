import KanjiCard from './KanjiCard.jsx';
import styles from '../css/StudyMode.module.css';
import React, { useEffect, useState } from 'react';

export default function StudyMode() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchKanji = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          'http://localhost:40324/api/v1/hanzawa-kanji?quizId=yyy'
        );
        const data = await res.json();

        setItems(data.items);
      } catch (error) {
        console.error('데이터 불러오기 실패👀', error);
      } finally {
        setLoading(false);
      }
    };
    fetchKanji();
  }, []);
  // 1. 상태 관리 (items, cursor, loading)
  // 2. fetch 함수
  // 3. observer 연결 함수
  // 4. useEffect 초기 fetch
  // 5. return (마지막 요소에 ref 연결)
  return (
    <div className={styles.list}>
      {loading && <p>로딩 중...</p>}

      {items.map((kanji) => (
        <KanjiCard key={kanji.id} kanji={kanji} />
      ))}
    </div>
  );
}
