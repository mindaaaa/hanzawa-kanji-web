import styles from './Button.module.css';

function Button({
  variant = 'primary',
  type = 'button',
  disabled = false,
  onClick,
  children,
  className = '',
  ...rest
}) {
  const variantClass = variant === 'primary' ? '' : styles[variant];
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={[styles.btn, variantClass, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
