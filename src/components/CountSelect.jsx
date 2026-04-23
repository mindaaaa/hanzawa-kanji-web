import styles from './CountSelect.module.css';

const DEFAULT_OPTIONS = [10, 20, 30];

const DESCRIPTIONS = {
  10: { head: '가볍게', sub: '처음 시작하는 사람도 부담 없음' },
  20: { head: '딱 좋게', sub: '집중력 적당히 유지되는 그 길이' },
  30: { head: '진득하게', sub: '제대로 돌려보고 싶은 날' },
};

function CountSelect({ options = DEFAULT_OPTIONS, selected, onSelect }) {
  return (
    <div className={styles.wrap}>
      <div>
        <h2 className={styles.title}>
          今日は、<br />
          <em>何問？</em>
        </h2>
        <span className={styles.marker}>✦ 처음엔 10개 추천!</span>
        <p className={styles.note}>
          문제 수를 정하면 바로 시작.<br />
          풀다가 틀려도 괜찮으니 편하게.
        </p>
      </div>

      <div className={styles.opts} role='radiogroup' aria-label='문제 수 선택'>
        {options.map((opt) => {
          const desc = DESCRIPTIONS[opt] ?? { head: `${opt}문제`, sub: null };
          const isActive = selected === opt;
          return (
            <button
              key={opt}
              type='button'
              role='radio'
              aria-checked={isActive}
              className={[styles.opt, isActive ? styles.active : ''].filter(Boolean).join(' ')}
              onClick={() => onSelect(opt)}
            >
              <span className={styles.big}>{opt}</span>
              <span>
                <span className={styles.head}>{desc.head}</span>
                {desc.sub && <span className={styles.sub}>{desc.sub}</span>}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CountSelect;
