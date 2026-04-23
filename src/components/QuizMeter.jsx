import styles from './QuizMeter.module.css';

function QuizMeter({ value = 0, label = '정답률' }) {
  const clamped = Math.max(0, Math.min(100, value));
  let tierClass = '';
  if (clamped >= 75) tierClass = styles.high;
  else if (clamped >= 40) tierClass = styles.mid;

  return (
    <div
      className={[styles.meter, tierClass].filter(Boolean).join(' ')}
      role='meter'
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <span className={styles.pct}>{Math.round(clamped)}%</span>
      <div className={styles.track}>
        <div className={styles.fill} style={{ height: `${clamped}%` }} />
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

export default QuizMeter;
