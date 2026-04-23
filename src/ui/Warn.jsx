import styles from './Warn.module.css';

function Warn({ className = '', children, ...rest }) {
  return (
    <span
      role='alert'
      className={[styles.warn, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </span>
  );
}

export default Warn;
