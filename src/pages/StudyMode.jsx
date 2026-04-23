import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import LibraryGrid from '../components/LibraryGrid.jsx';
import Pill from '../ui/Pill.jsx';
import { fetchKanjiItems } from '../shared/api/fetchKanjiItems.js';
import { shuffle } from '../utils/shuffle.js';
import styles from './StudyMode.module.css';

const TOTAL_KANJI = 2136;

export function StudyModeView({
  items,
  loading,
  hasMore,
  onLoadMore,
  sort,
  onSortChange,
}) {
  const displayItems = useMemo(() => {
    if (sort === 'random') return shuffle(items);
    return items;
  }, [items, sort]);

  const remaining = hasMore ? TOTAL_KANJI - items.length : 0;

  return (
    <div className={styles.study}>
      <header className={styles.head}>
        <h1 className={styles.title}>
          상용한자<br />
          <em>전부</em>, 쭉.
        </h1>
        <p className={styles.sub}>
          2,136자를 한 번에 훑어볼 수 있어요.<br />
          스크롤로 이어지고, 한자를 누르면 뜻과 읽기가 펼쳐집니다.
        </p>
      </header>

      <div className={styles.filters} role='toolbar' aria-label='정렬'>
        <span className={styles.filterLabel}>순서:</span>
        <Pill on={sort === 'id'} onClick={() => onSortChange('id')}>
          번호순
        </Pill>
        <Pill on={sort === 'random'} onClick={() => onSortChange('random')}>
          섞기
        </Pill>
        <span className={styles.scrollHint}>↓ 스크롤로 계속 로드</span>
      </div>

      <div className={styles.gridWrap}>
        <LibraryGrid
          items={displayItems}
          onLoadMore={onLoadMore}
          hasMore={hasMore}
          loading={loading}
        />
      </div>

      <footer className={styles.footer}>
        {loading && <span className={styles.loading}>한자 더 불러오는 중...</span>}
        <span className={styles.remaining}>[ 残り {remaining} ]</span>
      </footer>
    </div>
  );
}

export default function StudyMode() {
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [sort, setSort] = useState('id');
  const loadingRef = useRef(false);

  const fetchMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const data = await fetchKanjiItems({ cursor });
      setItems((prev) => {
        const seen = new Set(prev.map((k) => k.id));
        const fresh = data.items.filter((k) => !seen.has(k.id));
        return [...prev, ...fresh];
      });
      if (data.cursor === null || data.cursor === undefined) {
        setHasMore(false);
        setCursor(null);
      } else {
        setCursor(data.cursor);
      }
    } catch (err) {
      console.error('한자 목록 불러오기 실패', err);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [cursor, hasMore]);

  useEffect(() => {
    fetchMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StudyModeView
      items={items}
      loading={loading}
      hasMore={hasMore}
      onLoadMore={fetchMore}
      sort={sort}
      onSortChange={setSort}
    />
  );
}
