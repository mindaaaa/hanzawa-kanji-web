import { NavLink, Route, Routes } from 'react-router-dom';
import InfiniteMode from './pages/InfiniteMode.jsx';
import LimitedMode from './pages/LimitedMode.jsx';
import StudyMode from './pages/StudyMode.jsx';

function App() {
  return (
    <>
      <nav>
        <NavLink to="/study">공부 모드</NavLink>
        <NavLink to="/limited">유한 모드</NavLink>
        <NavLink to="/infinite">무한 모드</NavLink>
      </nav>

      <main style={{ marginTop: '2rem' }}>
        <Routes>
          <Route path="/" element={<p>모드를 선택해주세요.</p>} />
          <Route path="/study" element={<StudyMode />} />
          <Route path="/limited" element={<LimitedMode />} />
          <Route path="/infinite" element={<InfiniteMode />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
