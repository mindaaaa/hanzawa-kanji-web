import React, { useEffect } from 'react';
import QuestionCard from '../components/QuestionCard.jsx';
import ResultSummary from '../components/ResultSummary.jsx';
import useQuizEngine from '../shared/hooks/useQuizEngine.js';

export default function InfiniteMode() {
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
    isEnded,
    alertVisible,
    correctCount,
    answeredCount,
    isQuizFinished,
    handleAnswerClick,
    handleShowAnswer,
    handleEndQuiz,
    handleNext,
    fetchQuiz,
  } = useQuizEngine({ mode: 'INFINITE' });

  // TODO: 이 부분에서 중복 id가 들어오는지 확인
  useEffect(() => {
    fetchQuiz();
  }, []);

  useEffect(() => {
    const shouldPrefetchMore =
      quizList.length > 0 && quizIndex >= quizList.length - 5;
    if (shouldPrefetchMore) {
      fetchQuiz();
    }
  }, [quizIndex, quizList]);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      {loading && <p>🐢 로딩 중...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && currentQuiz && (
        <>
          <h2>무한 퀴즈 모드 ♾️</h2>

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
                ⚠️ 먼저 보기를 선택해주세요!
              </div>
            )}
          </div>

          <div style={{ marginTop: '1rem' }}>
            <button
              onClick={handleNext}
              disabled={!flipped}
              style={{
                opacity: !flipped ? 0.5 : 1,
                cursor: !flipped ? 'not-allowed' : 'pointer',
              }}
            >
              다음 문제
            </button>
          </div>
        </>
      )}

      <button
        onClick={handleEndQuiz}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          fontSize: '0.9rem',
          padding: '0.4rem 0.8rem',
          backgroundColor: '#f5f5f5',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        그만하기
      </button>
      {(isQuizFinished || isEnded) && (
        <ResultSummary
          total={answeredCount}
          correct={correctCount}
          onRestart={() => window.location.reload()}
        />
      )}
    </div>
  );
}
