import { Route, Routes } from 'react-router-dom';
import Topbar from './components/Topbar.jsx';
import InfiniteMode from './pages/InfiniteMode.jsx';
import LimitedMode from './pages/LimitedMode.jsx';
import StudyMode from './pages/StudyMode.jsx';

function App() {
  return (
    <>
      <Topbar />
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
