import styles from './QuizSidebar.module.css';

function pad2(n) {
  return String(n).padStart(2, '0');
}

function QuizSidebar({
  variant = 'limited',
  title,
  current,
  total,
  progressPercent,
  highlight = false,
  children,
}) {
  const variantClass = variant === 'infinite' ? styles.infinite : '';
  const highlightClass = highlight ? styles.highlight : '';
  const hasTotal = total != null;
  const hasProgress = progressPercent != null;

  return (
    <aside
      className={[styles.sidebar, variantClass, highlightClass].filter(Boolean).join(' ')}
    >
      {title && <div className={styles.title}>{title}</div>}

      <div className={styles.counter}>
        {pad2(current)}
        {hasTotal && (
          <>
            <span className={styles.slash}>/</span>
            <span className={styles.total}>{total}</span>
          </>
        )}
        {!hasTotal && variant === 'infinite' && (
          <span className={styles.total}> / ∞</span>
        )}
      </div>

      {hasProgress && (
        <div className={styles.bar}>
          <span style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }} />
        </div>
      )}

      {children && <div className={styles.status}>{children}</div>}
    </aside>
  );
}

export default QuizSidebar;
