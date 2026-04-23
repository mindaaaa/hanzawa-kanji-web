import styles from './Choice.module.css';

const DISABLED_STATES = new Set(['correct', 'wrong', 'faded']);

function Choice({ state = 'idle', letter, onClick, children }) {
  const isDisabled = DISABLED_STATES.has(state);
  return (
    <button
      type='button'
      disabled={isDisabled}
      aria-pressed={state === 'picked'}
      className={[styles.choice, styles[state]].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      <span className={styles.letter}>{letter}</span>
      <span className={styles.text}>{children}</span>
    </button>
  );
}

export default Choice;
