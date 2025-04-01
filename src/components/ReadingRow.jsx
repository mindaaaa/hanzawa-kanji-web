import styles from '../css/KanjiCard.module.css';

export default function ReadingRow({ type, label, value }) {
  const isEmpty = !value || (Array.isArray(value) && value.length === 0);

  return (
    <p className={`${styles[type]} ${isEmpty ? styles.hidden : ''}`}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>
        {Array.isArray(value) ? value.join(', ') : value}
      </span>
    </p>
  );
}
