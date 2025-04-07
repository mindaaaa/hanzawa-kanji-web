import React, { useState, useEffect } from 'react';
import quizData from '../../data/mockQuizData.json';
import KanjiCard from '../../components/KanjiCard.jsx';

export default function LimitedMode() {
  const [quizList, setQuizList] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setQuizList(quizData);
  }, []);

  const currentQuiz = quizList[quizIndex];

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>
        퀴즈 {quizIndex + 1} / {quizList.length}
      </h2>

      {currentQuiz && (
        <div onClick={() => setFlipped(!flipped)}>
          <KanjiCard key={quizIndex} kanji={currentQuiz} flipped={flipped} />
        </div>
      )}

      <div style={{ marginTop: '1rem' }}>
        {flipped && quizIndex < quizList.length - 1 && (
          <button
            onClick={() => {
              setFlipped(false);
              setQuizIndex((prev) => prev + 1);
            }}
          >
            다음 문제
          </button>
        )}

        {flipped && quizIndex === quizList.length - 1 && <p>🎉 퀴즈 완료!</p>}
      </div>
    </div>
  );
}
