import { useCallback, useEffect, useRef, useState } from 'react';
import { FixedSizeGrid } from 'react-window';
import KanjiCell from './KanjiCell.jsx';
import styles from './LibraryGrid.module.css';

const MIN_COLUMNS = 3;
const TARGET_CELL = 120;
const PREFETCH_ROWS_AHEAD = 4;

function LibraryGrid({ items, onLoadMore, hasMore = false, loading = false }) {
  const containerRef = useRef(null);
  const [dims, setDims] = useState({ width: 0, height: 0 });
  const [flippedIds, setFlippedIds] = useState(() => new Set());

  const handleToggle = useCallback((kanji) => {
    setFlippedIds((prev) => {
      const next = new Set(prev);
      if (next.has(kanji.id)) next.delete(kanji.id);
      else next.add(kanji.id);
      return next;
    });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      setDims({ width: rect.width, height: rect.height });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 영역 = container - padding 4px × 2
  const innerWidth = Math.max(0, dims.width - 8);
  const innerHeight = Math.max(0, dims.height - 8);

  const columnCount = Math.max(
    MIN_COLUMNS,
    Math.floor(innerWidth / TARGET_CELL),
  );
  const cellSize = columnCount > 0 ? Math.floor(innerWidth / columnCount) : 0;
  const rowCount = columnCount > 0 ? Math.ceil(items.length / columnCount) : 0;

  const handleItemsRendered = ({ visibleRowStopIndex }) => {
    if (!hasMore || loading || !onLoadMore) return;
    const rowsLeft = rowCount - 1 - visibleRowStopIndex;
    if (rowsLeft < PREFETCH_ROWS_AHEAD) {
      onLoadMore();
    }
  };

  return (
    <div ref={containerRef} className={styles.container}>
      {items.length === 0 && !loading && (
        <div className={styles.empty}>한자가 아직 없어요</div>
      )}

      {cellSize > 0 && rowCount > 0 && (
        <FixedSizeGrid
          columnCount={columnCount}
          rowCount={rowCount}
          columnWidth={cellSize}
          rowHeight={cellSize}
          width={innerWidth}
          height={innerHeight}
          onItemsRendered={handleItemsRendered}
        >
          {({ columnIndex, rowIndex, style }) => {
            const index = rowIndex * columnCount + columnIndex;
            const kanji = items[index];
            return (
              <div className={styles.slot} style={style}>
                {kanji && (
                  <KanjiCell
                    kanji={kanji}
                    displayNumber={index + 1}
                    flipped={flippedIds.has(kanji.id)}
                    onClick={handleToggle}
                  />
                )}
              </div>
            );
          }}
        </FixedSizeGrid>
      )}
    </div>
  );
}

export default LibraryGrid;
