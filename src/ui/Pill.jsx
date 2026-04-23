import styles from './Pill.module.css';

function Pill({ on = false, onClick, className = '', children, ...rest }) {
  return (
    <button
      type='button'
      aria-pressed={on}
      onClick={onClick}
      className={[styles.pill, on ? styles.on : '', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Pill;
