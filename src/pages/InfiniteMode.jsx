import { useEffect } from 'react';
import QuestionCard from '../components/QuestionCard.jsx';
import QuizSidebar from '../components/QuizSidebar.jsx';
import ResultSummary from '../components/ResultSummary.jsx';
import Button from '../ui/Button.jsx';
import Warn from '../ui/Warn.jsx';
import useQuizEngine from '../shared/hooks/useQuizEngine.js';
import styles from './InfiniteMode.module.css';

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

  useEffect(() => {
    fetchQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const shouldPrefetchMore =
      quizList.length > 0 && quizIndex >= quizList.length - 5;
    if (shouldPrefetchMore) {
      fetchQuiz();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizIndex, quizList]);

  if (loading && quizList.length === 0) {
    return <div className={styles.status}>문제 불러오는 중...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (isQuizFinished || isEnded) {
    return (
      <div className={styles.page}>
        <ResultSummary
          total={answeredCount}
          correct={correctCount}
          onRestart={() => window.location.reload()}
        />
      </div>
    );
  }

  if (!currentQuiz) {
    return <div className={styles.status}>⚠️ 문제를 불러오지 못했어요</div>;
  }

  const current = quizIndex + 1;
  const isCorrectNow = flipped && isCorrect === true;

  return (
    <div className={styles.page}>
      <div className={styles.quiz}>
        <QuizSidebar
          variant='infinite'
          title={isCorrectNow ? '✦ 정답!' : '∞ 무한 모드'}
          current={current}
          highlight={isCorrectNow}
        >
          <span>풀어본 문제 {answeredCount}개</span>
          <span>맞은 문제 {correctCount}개</span>
          <div className={styles.sidebarQuit}>
            <Button variant='ghost' onClick={handleEndQuiz}>
              ✕ 그만하기
            </Button>
          </div>
        </QuizSidebar>

        <div className={styles.main}>
          <QuestionCard
            currentQuiz={currentQuiz}
            allChoices={allChoices}
            flipped={flipped}
            selectedAnswer={selectedAnswer}
            handleAnswerClick={handleAnswerClick}
            isCorrect={isCorrect}
          />

          <div className={styles.actions}>
            {!flipped && (
              <Button variant='primary' onClick={handleShowAnswer}>
                정답 보기 ✦
              </Button>
            )}
            {flipped && (
              <Button variant='yellow' onClick={handleNext}>
                다음 문제 →
              </Button>
            )}
            {alertVisible && <Warn>보기를 먼저 골라줘!</Warn>}
          </div>
        </div>
      </div>
    </div>
  );
}
