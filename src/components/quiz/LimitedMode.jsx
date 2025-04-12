import React, { useState, useEffect, useRef, useMemo } from 'react';
import KanjiCard from '../../components/KanjiCard.jsx';
import { buildApiUrl } from '../../utils/queryHelpers.js';
import ChoiceButtons from '../ChoiceButtons.jsx';

export default function LimitedMode() {
  const [quizList, setQuizList] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [error, setError] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayMode, setDisplayMode] = useState('meaning');
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

  function getDisplayText(kanji, mode = 'meaning') {
    if (!kanji) return '없음 / 없음';

    const { korean, kunyomi = [], onyomi = [] } = kanji;

    if (mode === 'meaning') {
      const { kun = '-', on = '-' } = shuffle(korean)[0] || {};
      return `${kun} / ${on}`;
    }

    if (mode === 'reading') {
      const shuffledKunyomi = shuffle(kunyomi)[0] || '-';
      const shuffledOnyomi = shuffle(onyomi)[0] || '-';
      return `${shuffledKunyomi} / ${shuffledOnyomi}`;
    }
  }

  const correctAnswer = currentQuiz;

  const allChoices = useMemo(() => {
    if (!currentQuiz || quizList.length === 0) return [];

    const filtered = quizList.filter((item) => item.id !== currentQuiz.id);
    const choices = shuffle(filtered).slice(0, 3);

    return shuffle([currentQuiz, ...choices]);
  }, [currentQuiz, quizList]);

  function shuffle(array) {
    const copied = [...array];
    for (let i = copied.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [copied[i], copied[j]] = [copied[j], copied[i]];
    }
    return copied;
  }

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
  }

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

          <div>
            <KanjiCard
              key={currentQuiz.id}
              kanji={currentQuiz}
              flipped={flipped}
            />
          </div>

          <div style={{ margin: '1rem 0' }}>
            {allChoices.map((choice, index) => {
              const isCorrectAnswer = choice.id === correctAnswer.id;
              const isSelected = choice.id === selectedAnswer?.id;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(choice)}
                  disabled={selectedAnswer !== null} // ✅ 선택 후 클릭 방지
                  style={{
                    margin: '0.5rem',
                    padding: '1rem 2rem',
                    fontSize: '1.2rem',
                    cursor: selectedAnswer ? 'not-allowed' : 'pointer',
                    backgroundColor: selectedAnswer
                      ? isCorrectAnswer
                        ? 'lightgreen'
                        : isSelected
                        ? 'salmon'
                        : '#eee'
                      : '',
                    opacity:
                      selectedAnswer && !isCorrectAnswer && !isSelected
                        ? 0.6
                        : 1,
                  }}
                >
                  {getDisplayText(choice, displayMode)}
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: '1rem' }}>
            <button onClick={() => setDisplayMode('meaning')}>뜻 보기</button>
            <button onClick={() => setDisplayMode('reading')}>읽기 보기</button>
          </div>

          <div style={{ marginTop: '1rem' }}>
            {selectedAnswer && quizIndex < quizList.length - 1 && (
              <button onClick={handleNext}>다음 문제</button>
            )}
          </div>

          {isQuizFinished && (
            <div style={{ marginTop: '2rem' }}>
              <h2>퀴즈 완료! 🎉</h2>
              <p>총 문항 수: {quizList.length}</p>
              <p>정답률: {`${(correctCount / quizList.length) * 100}%`}</p>
              <button onClick={() => window.location.reload()}>처음으로</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
