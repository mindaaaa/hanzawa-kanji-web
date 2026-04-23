import { Link } from 'react-router-dom';
import useDocumentTitle from '../shared/hooks/useDocumentTitle.js';
import styles from './Home.module.css';

const MODES = [
  {
    to: '/study',
    num: '01',
    name: '공부 모드',
    desc: '상용한자 전체 훑어보기',
    color: 'paper',
  },
  {
    to: '/limited',
    num: '02',
    name: '유한 모드',
    desc: '10 / 20 / 30 문제 정해서 풀기',
    color: 'yellow',
  },
  {
    to: '/infinite',
    num: '03',
    name: '무한 모드 ∞',
    desc: '끝없이 풀기',
    color: 'coral',
  },
];

const colorClass = {
  paper: '',
  yellow: styles.modeYellow,
  coral: styles.modeCoral,
};

function Home() {
  useDocumentTitle('상용한자 학습 · 한자와칸지');
  return (
    <div className={styles.home}>
      <div className={styles.grid}>
        <section className={styles.hero}>
          <h1>
            오늘은<br />
            뭐 <em>해볼래?</em>
          </h1>
          <p className={styles.sub}>
            상용한자 2,136자. 모드를 골라 천천히 훑거나 퀴즈로 확인해보세요.
          </p>
          <span className={styles.bigChar} aria-hidden='true'>愛</span>
        </section>

        <nav className={styles.modes} aria-label='학습 모드 선택'>
          {MODES.map((mode) => (
            <Link
              key={mode.to}
              to={mode.to}
              className={[styles.mode, colorClass[mode.color]].filter(Boolean).join(' ')}
            >
              <span className={styles.num}>{mode.num}</span>
              <span>
                <div className={styles.ko}>{mode.name}</div>
                <div className={styles.jp}>{mode.desc}</div>
              </span>
              <span className={styles.arrow} aria-hidden='true'>→</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default Home;
