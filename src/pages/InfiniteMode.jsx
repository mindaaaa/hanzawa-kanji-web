import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard.jsx';
import QuizMeta from '../components/QuizMeta.jsx';
import QuizMeter from '../components/QuizMeter.jsx';
import ResultSummary from '../components/ResultSummary.jsx';
import Button from '../ui/Button.jsx';
import Warn from '../ui/Warn.jsx';
import useQuizEngine from '../shared/hooks/useQuizEngine.js';
import styles from './InfiniteMode.module.css';

export default function InfiniteMode() {
  const navigate = useNavigate();
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
          onHome={() => navigate('/')}
          onRetry={() => navigate(0)}
        />
      </div>
    );
  }

  if (!currentQuiz) {
    return <div className={styles.status}>⚠️ 문제를 불러오지 못했어요</div>;
  }

  const accuracy = answeredCount > 0 ? (correctCount / answeredCount) * 100 : 0;

  return (
    <div className={styles.page}>
      <div className={styles.quiz}>
        <QuizMeta badge='∞ 무한 모드' onQuit={handleEndQuiz}>
          풀어본 <b>{answeredCount}</b> · 맞은 <b>{correctCount}</b>
        </QuizMeta>

        <div className={styles.main}>
          <QuestionCard
            currentQuiz={currentQuiz}
            allChoices={allChoices}
            flipped={flipped}
            selectedAnswer={selectedAnswer}
            handleAnswerClick={handleAnswerClick}
            isCorrect={isCorrect}
            kanjiAdornment={<QuizMeter value={accuracy} label='정답률' />}
          />
        </div>

        <div className={styles.bottom}>
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
  );
}
