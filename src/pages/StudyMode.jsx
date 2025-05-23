import KanjiCard from '../components/KanjiCard.jsx';
import styles from '../shared/css/StudyMode.module.css';
import React, { useEffect, useState } from 'react';
import { FixedSizeGrid } from 'react-window';
import { fetchKanjiItems } from '../shared/api/fetchKanjiItems.js';
import { Card, RESIZE_THROTTLE_DELAY } from '../shared/constants/index.js';

export default function StudyMode() {
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = throttle(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, RESIZE_THROTTLE_DELAY);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const COLUMN_COUNT = Math.max(1, Math.floor(windowSize.width / Card.WIDTH));
  const ROW_COUNT = Math.ceil(items.length / COLUMN_COUNT);

  const fetchKanji = async () => {
    const isLastPage = () => cursor === null;
    if (isLastPage()) return;
    if (loading) return;

    setLoading(true);
    try {
      const data = await fetchKanjiItems({ cursor });

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

  useEffect(() => {
    fetchKanji();
  }, []);

  return (
    <>
      <FixedSizeGrid
        className={styles.list}
        columnCount={COLUMN_COUNT}
        rowCount={ROW_COUNT}
        columnWidth={Card.WIDTH}
        rowHeight={Card.HEIGHT}
        width={windowSize.width}
        height={windowSize.height}
        onItemsRendered={({ visibleRowStopIndex }) => {
          const isLastRow = () => {
            return (
              visibleRowStopIndex >= ROW_COUNT - 1 &&
              !loading &&
              cursor !== null
            );
          };
          if (isLastRow()) {
            fetchKanji();
          }
        }}
      >
        {({ columnIndex, rowIndex, style }) => {
          const index = rowIndex * COLUMN_COUNT + columnIndex;
          const kanji = items[index];
          const key = kanji ? kanji.id : `${rowIndex}-${columnIndex}`;

          return (
            <div style={style} key={key}>
              {kanji ? <KanjiCard kanji={kanji} /> : null}
            </div>
          );
        }}
      </FixedSizeGrid>
      {loading && <p className={styles.loading}>로딩 중...</p>}
    </>
  );
}

function throttle(func, delay) {
  let current = 0;

  return function (...args) {
    const now = Date.now();

    if (now - current >= delay) {
      current = now;
      func.apply(this, args);
    }
  };
}
