import styles from './Card.module.css';

function Card({
  variant = 'paper',
  shadow = 'lg',
  className = '',
  children,
  ...rest
}) {
  return (
    <div
      className={[styles.card, styles[variant], styles[`shadow-${shadow}`], className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
