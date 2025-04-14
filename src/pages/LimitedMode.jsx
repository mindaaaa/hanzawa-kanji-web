import React, { useState, useEffect, useRef, useMemo } from 'react';
import { buildApiUrl } from '../utils/queryHelpers.js';
import ChoiceButtons from '../components/ChoiceButtons.jsx';
import ResultSummary from '../components/ResultSummary.jsx';
import { shuffle } from '../utils/shuffle.js';
import QuestionCard from '../components/QuestionCard.jsx';

export default function LimitedMode() {
  const [quizList, setQuizList] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [error, setError] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizLimit, setQuizLimit] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null); // TODO: 사용자가 클릭한 버튼 CSS 처리
  const [correctCount, setCorrectCount] = useState(0);

  const quizIdRef = useRef(crypto.randomUUID());
  const isLastQuestion = quizIndex === quizList.length - 1;
  const isQuizFinished = isLastQuestion && flipped;

  const fetchQuizList = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const url = buildApiUrl({
        quizId: quizIdRef.current,
        mode: 'RANDOM',
        limit: quizLimit,
      });
      const data = await fetch(url).then((res) => res.json());

      setQuizList(data.items);
    } catch (error) {
      console.error('문제 불러오기 실패😨', error);
      setError('⚠️ 문제 불러오기 실패, 다시 시도해주세요🙇‍♂️');
      setQuizList([]);
      setQuizIndex(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (quizLimit !== null) {
      fetchQuizList();
    }
  }, [quizLimit]);

  const currentQuiz = quizList[quizIndex];

  const allChoices = useMemo(() => {
    if (!currentQuiz || quizList.length === 0) return [];

    const filtered = quizList.filter((item) => item.id !== currentQuiz.id);
    const choices = shuffle(filtered).slice(0, 3);

    const formatChoice = (kanji) => {
      const { korean } = kanji;
      const { kun = '-', on = '-' } = shuffle(korean)[0] || {};

      return {
        ...kanji,
        display: [`${kun} / ${on}`],
      };
    };

    return shuffle([currentQuiz, ...choices]).map(formatChoice);
  }, [currentQuiz, quizList]);

  function handleAnswerClick(choice) {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(choice);

    const correct = choice.id === currentQuiz.id;
    setIsCorrect(correct);
    if (correct) {
      setCorrectCount((prev) => prev + 1);
    }

    setTimeout(() => {
      setFlipped(true);
    }, 100);
  }

  function handleNext() {
    setFlipped(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setQuizIndex((prev) => prev + 1);
  } // 파사드 패턴인가봄 ㄷㄷ 알아보기👀

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
          />

          <div style={{ marginTop: '1rem' }}>
            {selectedAnswer && quizIndex < quizList.length - 1 && (
              <button onClick={handleNext}>다음 문제</button>
            )}
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
