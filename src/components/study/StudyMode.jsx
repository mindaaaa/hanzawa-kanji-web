import KanjiCard from '../KanjiCard.jsx';
import styles from '../../css/StudyMode.module.css';
import React, { useEffect, useState } from 'react';
import { FixedSizeGrid } from 'react-window';
import { buildApiUrl } from '../../utils/queryHelpers.js';

export default function StudyMode() {
  const CARD_WIDTH = 220;
  const CARD_HEIGHT = 300;

  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // 1. resize 이벤트 등록 (TODO: resize 최적화)
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 2. 열 개수 계산
  const COLUMN_COUNT = Math.max(1, Math.floor(windowSize.width / CARD_WIDTH));
  const ROW_COUNT = Math.ceil(items.length / COLUMN_COUNT);

  const fetchKanji = async () => {
    const isLastPage = () => cursor === null;
    if (isLastPage()) return;
    if (loading) return;

    setLoading(true);

    try {
      const url = buildApiUrl({ quizId: 'yyy', cursor });
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

  useEffect(() => {
    fetchKanji();
  }, []);

  return (
    <>
      <FixedSizeGrid
        className={styles.list}
        columnCount={COLUMN_COUNT}
        rowCount={ROW_COUNT}
        columnWidth={CARD_WIDTH}
        rowHeight={CARD_HEIGHT}
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
          if (!kanji) return null;

          return (
            <div style={style} key={kanji.id}>
              <KanjiCard kanji={kanji} />
            </div>
          );
        }}
      </FixedSizeGrid>
      {loading && <p className={styles.loading}>로딩 중...</p>}
    </>
  );
}
