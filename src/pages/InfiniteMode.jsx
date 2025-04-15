import React, { useState, useEffect, useRef, useMemo } from 'react';
import { buildApiUrl } from '../utils/queryHelpers.js';
import QuestionCard from '../components/QuestionCard.jsx';
import { shuffle } from '../utils/shuffle.js';

export default function InfiniteMode() {
  const [quizList, setQuizList] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const quizIdRef = useRef(crypto.randomUUID());

  const fetchQuizList = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const url = buildApiUrl({
        quizId: quizIdRef.current,
        mode: 'RANDOM',
      });

      const data = await fetch(url).then((res) => res.json());
      setQuizList(shuffle(data.items));
    } catch (error) {
      console.error('문제 불러오기 실패💥', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizList();
  }, []);

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

  const handleAnswerClick = (choice) => {
    setSelectedAnswer(choice);
  };

  const handleShowAnswer = () => {
    if (!selectedAnswer) {
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 2000);
      return;
    }

    const correct = selectedAnswer.id === currentQuiz.id;
    setIsCorrect(correct);
    setTimeout(() => {
      setFlipped(true);
    }, 100);
  };

  const handleNext = () => {
    const isLast = quizIndex >= quizList.length - 1;
    const nextIndex = isLast ? 0 : quizIndex + 1;
    const nextList = isLast ? shuffle([...quizList]) : quizList;

    setQuizList(nextList);
    setQuizIndex(nextIndex);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setFlipped(false);
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      {loading && <p>🐢 로딩 중...</p>}
      {!loading && currentQuiz && (
        <>
          <h2>무한 퀴즈 모드 🔁</h2>

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
    </div>
  );
}
