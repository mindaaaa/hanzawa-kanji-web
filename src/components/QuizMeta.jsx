import styles from './QuizMeta.module.css';

function QuizMeta({ badge, children, onQuit, quitLabel = '✕ 그만하기' }) {
  return (
    <div className={styles.meta}>
      <div className={styles.left}>
        {badge && <span className={styles.badge}>{badge}</span>}
        {children && <span className={styles.stats}>{children}</span>}
      </div>
      {onQuit && (
        <button type='button' className={styles.quit} onClick={onQuit}>
          {quitLabel}
        </button>
      )}
    </div>
  );
}

export default QuizMeta;
