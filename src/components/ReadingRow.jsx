import styles from '../css/KanjiCard.module.css';

export default function ReadingRow({ type, label, value }) {
  return (
    <p className={`${styles[type]} ${!value.length ? styles.hidden : ''}`}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value.join(', ')}</span>
    </p>
  );
}
