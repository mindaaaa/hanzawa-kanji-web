import React, { useState, useEffect } from 'react';
import KanjiCard from '../../components/KanjiCard.jsx';
import { buildApiUrl } from '../../utils/queryHelpers.js';

export default function LimitedMode() {
  const [quizList, setQuizList] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleNext() {
    setFlipped(false);
    setQuizIndex((prev) => prev + 1);
  }

  const fetchQuizList = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const url = buildApiUrl({ quizId: 'yyy', mode: 'RANDOM' });
      const data = await fetch(url).then((res) => res.json());

      setQuizList(data.items);
    } catch (error) {
      console.error('문제 불러오기 실패😨', error);
      alert('⚠️ 문제 불러오기 실패, 다시 시도해주세요🙇‍♂️');
      setQuizList([]);
      setQuizIndex(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizList();
  }, []);

  const currentQuiz = quizList[quizIndex];

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      {loading && <p>로딩 중...🐌</p>}
      {!loading && quizList.length === 0 && <p>⚠️ 문제가 없습니다</p>}
      <h2>
        퀴즈 {quizIndex + 1} / {quizList.length}
      </h2>

      {currentQuiz && (
        <div onClick={() => setFlipped(!flipped)}>
          <KanjiCard
            key={currentQuiz.id}
            kanji={currentQuiz}
            flipped={flipped}
          />
        </div>
      )}

      <div style={{ marginTop: '1rem' }}>
        {flipped && quizIndex < quizList.length - 1 && (
          <button onClick={handleNext}>다음 문제</button>
        )}

        {flipped && quizIndex === quizList.length - 1 && <p>🎉 퀴즈 완료!</p>}
      </div>
    </div>
  );
}
