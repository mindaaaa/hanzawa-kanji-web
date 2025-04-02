import KanjiCard from './KanjiCard.jsx';
import styles from '../css/StudyMode.module.css';
import React, { useEffect, useState } from 'react';
import { getKanjiUrl } from '../constants/getKanjiUrl.js';
import { FixedSizeGrid, FixedSizeGrid as Grid } from 'react-window';

export default function StudyMode() {
  // 1. 상태 관리 (items, cursor, loading)
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const CARD_WIDTH = 200;
  const CARD_HEIGHT = 260;
  const COLUMN_COUNT = 6;
  const rowCount = Math.ceil(items.length / COLUMN_COUNT);

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
        const isNew = (newItem) =>
          !prev.some((prevItem) => prevItem.id === newItem.id);

        const newItems = data.items.filter(isNew);
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

  // 3. useEffect 초기 fetch
  useEffect(() => {
    fetchKanji();
  }, []);

  // 4. react-window
  return (
    <FixedSizeGrid
      className={styles.list}
      columnCount={COLUMN_COUNT}
      rowCount={rowCount}
      columnWidth={CARD_WIDTH}
      rowHeight={CARD_HEIGHT}
      width={CARD_WIDTH * COLUMN_COUNT + 200} // 여유 padding
      height={1024}
      onItemsRendered={({ visibleRowStopIndex }) => {
        if (visibleRowStopIndex >= rowCount - 1) {
          fetchKanji();
        }
      }}
    >
      {({ columnIndex, rowIndex, style }) => {
        const index = rowIndex * COLUMN_COUNT + columnIndex;
        const kanji = items[index];
        if (!kanji) return null;

        return (
          <div style={style} key={kanji.id}>
            <KanjiCard kanji={kanji} />
          </div>
        );
      }}
    </FixedSizeGrid>
  );
}
