import KanjiCard from './KanjiCard.jsx';
import styles from '../css/StudyMode.module.css';
import React, { useEffect, useState } from 'react';

export default function StudyMode() {
  // 1. 상태 관리 (items, cursor, loading)
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(false);

  // const observer = useRef(); /* DOM 요소에 접근해야하므로 */

  // 2. fetch 함수

  const fetchKanji = async (nextCursor = null) => {
    if (cursor === null && items.length === 2136) return;
    if (loading) return;
    setLoading(true);

    try {
      const base = 'http://localhost:40324/api/v1/hanzawa-kanji?quizId=yyy';
      const url = nextCursor ? `${base}&cursor=${nextCursor}` : base;

      const res = await fetch(url);
      const data = await res.json();

      setItems((prev) => {
        const newItems = data.items.filter(
          (newItem) => !prev.some((prevItem) => prevItem.id === newItem.id)
        );
        return [...prev, ...newItems];
      });
      setCursor(data.cursor);
    } catch (error) {
      console.error('데이터 불러오기 실패👀', error);
      setItems([]);
      setCursor(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKanji(cursor);
  }, []);

  // 3. observer 연결 함수
  // 4. useEffect 초기 fetch
  // 5. return (마지막 요소에 ref 연결)
  return (
    <div className={styles.list}>
      {items.map((kanji) => (
        <KanjiCard key={kanji.id} kanji={kanji} />
      ))}
      {loading && <p>로딩 중...</p>}
    </div>
  );
}
