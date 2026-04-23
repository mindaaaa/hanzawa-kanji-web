import styles from './Sticker.module.css';

function Sticker({ variant = 'coral', className = '', children, ...rest }) {
  const variantClass = variant === 'coral' ? '' : styles[variant];
  return (
    <span
      className={[styles.sticker, variantClass, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </span>
  );
}

export default Sticker;
