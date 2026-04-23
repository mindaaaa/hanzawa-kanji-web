import { Link, NavLink } from 'react-router-dom';
import styles from './Topbar.module.css';

const NAV_ITEMS = [
  { to: '/study', label: '공부' },
  { to: '/limited', label: '유한' },
  { to: '/infinite', label: '무한' },
];

function Topbar({ logo = '半澤漢字' }) {
  return (
    <header className={styles.topbar}>
      <Link to='/' className={styles.logo} aria-label='홈으로'>
        {logo}
      </Link>

      <nav className={styles.nav} aria-label='학습 모드'>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [styles.link, isActive ? styles.linkActive : ''].filter(Boolean).join(' ')
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Topbar;
