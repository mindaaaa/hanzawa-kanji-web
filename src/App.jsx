import { Route, Routes } from 'react-router-dom';
import Topbar from './components/Topbar.jsx';
import Home from './pages/Home.jsx';
import InfiniteMode from './pages/InfiniteMode.jsx';
import LimitedMode from './pages/LimitedMode.jsx';
import StudyMode from './pages/StudyMode.jsx';

function App() {
  return (
    <>
      <Topbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/study" element={<StudyMode />} />
          <Route path="/limited" element={<LimitedMode />} />
          <Route path="/infinite" element={<InfiniteMode />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
