import KanjiCard from './KanjiCard.jsx';
import styles from '../css/StudyMode.module.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getKanjiUrl } from '../constants/getKanjiUrl.js';

export default function StudyMode() {
  // 1. 상태 관리 (items, cursor, loading)
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const observer = useRef(); /* DOM 요소에 접근해야하므로 */

  // 2. fetch 함수
  const fetchKanji = async () => {
    const isLastPage = () => cursor === null;
    if (isLastPage()) return;
    if (loading) return;

    setLoading(true);

    try {
      const url = getKanjiUrl({ quizId: 'yyy', cursor });

      const data = await fetch(url).then((res) => res.json());

      setItems((prev) => {
        // TODO: filter 안에 들어간 함수를 별도의 함수로 뺴자
        const newItems = data.items.filter(
          (newItem) => !prev.some((prevItem) => prevItem.id === newItem.id)
        );
        return [...prev, ...newItems];
      });
      setCursor(data.cursor);
    } catch (error) {
      console.error('데이터 불러오기 실패👀', error);
      setItems([]);
      setCursor(undefined);
    } finally {
      setLoading(false);
    }
  };

  // 3. observer 연결 함수
  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && cursor) {
          fetchKanji(cursor);
        }
      });

      if (node) observer.current.observe(node);
    },
    [cursor, loading]
  );

  // 4. useEffect 초기 fetch
  useEffect(() => {
    fetchKanji(cursor);
  }, []);

  // 5. return (마지막 요소에 ref 연결)
  return (
    <div className={styles.list}>
      {items.map((kanji, index) => {
        const isLast = index === items.length - 1;
        return (
          <div ref={isLast ? lastItemRef : null} key={kanji.id}>
            <KanjiCard kanji={kanji} />
          </div>
        );
      })}
      {loading && <p>로딩 중...</p>}
    </div>
  );
}
