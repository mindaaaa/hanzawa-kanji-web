import React, { useState, useEffect, useRef, useMemo } from 'react';
import KanjiCard from '../../components/KanjiCard.jsx';
import { buildApiUrl } from '../../utils/queryHelpers.js';

export default function LimitedMode() {
  const [quizList, setQuizList] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [error, setError] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);

  const quizIdRef = useRef(crypto.randomUUID());

  const fetchQuizList = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const url = buildApiUrl({ quizId: quizIdRef.current, mode: 'RANDOM' });
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

  function handleNext() {
    setFlipped(false);
    setQuizIndex((prev) => prev + 1);
  }

  useEffect(() => {
    fetchQuizList();
  }, []);

  const currentQuiz = quizList[quizIndex];

  // 훈, 음 있나 체크하고 랜덤하게 뽑아주기
  // TODO: 음, 훈 중복된 경우 처리
  // function pickRandomType(kanji) {
  //   const types = [];

  //   if (kanji.korean.kun && kanji.korean.kun.length > 0) types.push('kunyomi');
  //   if (kanji.korean.on && kanji.korean.on > 0) types.push('onyomi');

  //   if (types.length === 0) return null;

  //   const randomIndex = Math.floor(Math.random() * types.length);
  //   return types[randomIndex];
  // }

  function getMeaningAndReading(kanji) {
    const { korean } = kanji;
    if (!korean || korean.length === 0) return '없음 / 없음';

    const { kun, on } = korean[0];
    return `${kun} / ${on}`;
  }

  function shuffle(array) {
    const copied = [...array];

    for (let i = copied.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [copied[i], copied[j]] = [copied[j], copied[i]];
    }

    return copied;
  }

  const correctAnswer = useMemo(() => {
    if (!currentQuiz) return '';
    return getMeaningAndReading(currentQuiz);
  }, [currentQuiz]);

  // const type = currentQuiz ? pickRandomType(currentQuiz) : null;

  const allChoices = useMemo(() => {
    if (!currentQuiz || quizList.length === 0) return [];

    const choices = shuffle(
      quizList.filter((item) => item.id !== currentQuiz.id)
    )
      .slice(0, 3)
      .map((item) => getMeaningAndReading(item));

    return shuffle([correctAnswer, ...choices]);
  }, [currentQuiz, quizList]);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      {loading && <p>로딩 중...🐌</p>}
      {!loading && quizList.length === 0 && <p>⚠️ 문제가 없습니다</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

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

      {allChoices.map((choice, index) => (
        <button
          key={index}
          style={{ margin: '0.5rem', padding: '1rem 2rem', fontSize: '1.2rem' }}
        >
          {choice}
        </button>
      ))}

      <div style={{ marginTop: '1rem' }}>
        {flipped && quizIndex < quizList.length - 1 && (
          <button onClick={handleNext}>다음 문제</button>
        )}
        {flipped && quizIndex === quizList.length - 1 && <p>🎉 퀴즈 완료!</p>}
      </div>
    </div>
  );
}
