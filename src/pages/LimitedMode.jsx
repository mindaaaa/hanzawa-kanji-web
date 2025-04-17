import React, { useState, useEffect } from 'react';
import ChoiceButtons from '../components/ChoiceButtons.jsx';
import ResultSummary from '../components/ResultSummary.jsx';
import QuestionCard from '../components/QuestionCard.jsx';
import useQuizEngine from '../shared/hooks/useQuizEngine.js';

export default function LimitedMode() {
  const [quizLimit, setQuizLimit] = useState(null);
  const {
    loading,
    error,
    quizList,
    quizIndex,
    currentQuiz,
    allChoices,
    selectedAnswer,
    isCorrect,
    flipped,
    alertVisible,
    correctCount,
    isQuizFinished,
    handleAnswerClick,
    handleShowAnswer,
    handleNext,
    fetchQuiz,
  } = useQuizEngine({ quizLimit });

  useEffect(() => {
    if (quizLimit !== null) {
      fetchQuiz();
    }
  }, [quizLimit]);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      {loading && <p>로딩 중...🐌</p>}
      {quizLimit && !loading && quizList.length === 0 && (
        <p>⚠️ 문제가 없습니다</p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!quizLimit && (
        <>
          <h3>문제 수를 선택하세요!</h3>
          <ChoiceButtons
            options={[10, 20, 30]}
            selected={quizLimit}
            onSelect={(value) => setQuizLimit(value)}
          />
        </>
      )}

      {quizLimit && currentQuiz && (
        <>
          <h2>
            퀴즈 {quizIndex + 1} / {quizList.length}
          </h2>

          <QuestionCard
            currentQuiz={currentQuiz}
            allChoices={allChoices}
            flipped={flipped}
            selectedAnswer={selectedAnswer}
            handleAnswerClick={handleAnswerClick}
            isCorrect={isCorrect}
          />

          <div style={{ marginTop: '1rem' }}>
            <button onClick={handleShowAnswer}>정답 보기</button>

            {alertVisible && (
              <div style={{ color: 'red', marginTop: '1rem' }}>
                ⚠️ 보기를 먼저 선택해주세요.
              </div>
            )}

            <button onClick={handleNext} disabled={!flipped}>
              다음 문제
            </button>
          </div>

          {isQuizFinished && (
            <ResultSummary
              total={quizList.length}
              correct={correctCount}
              onRestart={() => window.location.reload()}
            />
          )}
        </>
      )}
    </div>
  );
}
