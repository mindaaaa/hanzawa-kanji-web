import Button from '../ui/Button.jsx';
import styles from './ResultSummary.module.css';

function getMessage(percent, missed) {
  if (percent === 100) return '완벽! 다 맞췄어요 ✦';
  if (percent >= 80) return `훌륭해요. ${missed}개만 놓쳤어요.`;
  if (percent >= 60) return '나쁘지 않아요. 조금만 더 훑어보면 ✦';
  if (percent >= 40) return '처음엔 다 그래요. 한 번 더 도전해볼까요?';
  return '괜찮아요, 한 자씩 익혀나가요.';
}

export default function ResultSummary({ total, correct, onHome, onRetry }) {
  const missed = Math.max(0, total - correct);
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
  const message = getMessage(percent, missed);

  return (
    <div className={styles.wrap}>
      <span className={styles.badge}>✦ COMPLETE ✦</span>

      <div className={styles.score}>
        {correct}
        <span className={styles.slash}>/</span>
        <span className={styles.total}>{total}</span>
      </div>

      <div className={styles.percent}>딱 {percent}% ✦</div>

      <div className={styles.meta}>
        <div className={styles.cell}>
          <span className={styles.cellLabel}>맞은 문제</span>
          <span className={styles.cellValue}>{correct}</span>
        </div>
        <div className={styles.cell}>
          <span className={styles.cellLabel}>틀린 문제</span>
          <span className={styles.cellValue}>{missed}</span>
        </div>
        <div className={styles.cell}>
          <span className={styles.cellLabel}>전체 문제</span>
          <span className={styles.cellValue}>{total}</span>
        </div>
      </div>

      <p className={styles.message}>{message}</p>

      <div className={styles.actions}>
        {onHome && (
          <Button variant='primary' onClick={onHome}>
            처음으로 ✦
          </Button>
        )}
        {onRetry && (
          <Button variant='blue' onClick={onRetry}>
            다시 도전 →
          </Button>
        )}
      </div>
    </div>
  );
}
