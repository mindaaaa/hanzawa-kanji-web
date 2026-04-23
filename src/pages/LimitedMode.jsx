import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CountSelect from '../components/CountSelect.jsx';
import ResultSummary from '../components/ResultSummary.jsx';
import QuestionCard from '../components/QuestionCard.jsx';
import QuizMeta from '../components/QuizMeta.jsx';
import QuizMeter from '../components/QuizMeter.jsx';
import Button from '../ui/Button.jsx';
import Warn from '../ui/Warn.jsx';
import useQuizEngine from '../shared/hooks/useQuizEngine.js';
import styles from './LimitedMode.module.css';

export default function LimitedMode() {
  const navigate = useNavigate();
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
    answeredCount,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizLimit]);

  if (!quizLimit) {
    return (
      <div className={styles.page}>
        <CountSelect selected={quizLimit} onSelect={setQuizLimit} />
      </div>
    );
  }

  if (loading && quizList.length === 0) {
    return <div className={styles.status}>문제 불러오는 중...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!currentQuiz) {
    return <div className={styles.status}>⚠️ 문제가 없어요</div>;
  }

  if (isQuizFinished) {
    return (
      <div className={styles.page}>
        <ResultSummary
          total={quizList.length}
          correct={correctCount}
          onHome={() => navigate('/')}
          onRetry={() => navigate(0)}
        />
      </div>
    );
  }

  const current = quizIndex + 1;
  const total = quizList.length;
  const accuracy = answeredCount > 0 ? (correctCount / answeredCount) * 100 : 0;

  return (
    <div className={styles.page}>
      <div className={styles.quiz}>
        <QuizMeta badge='유한 모드'>
          문제 <b>{current}</b> / {total} · 맞은 <b>{correctCount}</b>
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
