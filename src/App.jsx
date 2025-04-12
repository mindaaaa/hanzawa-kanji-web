import { useState } from 'react';
import InfiniteMode from './pages/InfiniteMode.jsx';
import LimitedMode from './pages/LimitedMode.jsx';
import StudyMode from './pages/StudyMode.jsx';

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
