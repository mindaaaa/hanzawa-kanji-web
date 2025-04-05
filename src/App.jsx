import { useState } from 'react';
import InfiniteMode from './components/quiz/InfiniteMode.jsx';
import LimitedMode from './components/quiz/LimitedMode.jsx';
import StudyMode from './components/study/StudyMode.jsx';

function App() {
  const [mode, setMode] = useState('');

  return (
    <>
      <nav>
        <button onClick={() => setMode('study')}>공부 모드</button>
        <button onClick={() => setMode('limited')}>유한 모드</button>
        <button onClick={() => setMode('infinite')}>무한 모드</button>
      </nav>

      <main style={{ marginTop: '2rem' }}>
        {mode === 'study' && <StudyMode />}
        {mode === 'limited' && <LimitedMode />}
        {mode === 'infinite' && <InfiniteMode />}
        {!mode && <p>모드를 선택해주세요.</p>}
      </main>
    </>
  );
}

export default App;
