import React, { useState, useEffect, useRef, useMemo } from 'react';
import KanjiCard from '../../components/KanjiCard.jsx';
import { buildApiUrl } from '../../utils/queryHelpers.js';

export default function LimitedMode() {
  const [quizList, setQuizList] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [error, setError] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayMode, setDisplayMode] = useState('meaning');

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

  useEffect(() => {
    fetchQuizList();
  }, []);

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
  // const correctAnswer = useMemo(() => {
  //   if (!currentQuiz) return '';
  //   return getMeaningAndReading(currentQuiz);
  // }, [currentQuiz]);
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

  // function pickRandomType(kanji) {
  //   const types = [];

  //   if ((kanji.onyomi || []).length > 0) types.push('onyomi');
  //   if ((kanji.kunyomi || []).length > 0) types.push('kunyomi');
  //   if (types.length === 0) return null;

  //   return shuffle(types)[0];
  // }

  function handleNext() {
    setFlipped(false);
    setQuizIndex((prev) => prev + 1);
  }

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

      <div style={{ margin: '1rem 0' }}>
        {allChoices.map((choice, index) => (
          <button
            key={index}
            style={{
              margin: '0.5rem',
              padding: '1rem 2rem',
              fontSize: '1.2rem',
            }}
          >
            {getDisplayText(choice, displayMode)}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => setDisplayMode('meaning')}>뜻 보기</button>
        <button onClick={() => setDisplayMode('reading')}>읽기 보기</button>
      </div>

      <div style={{ marginTop: '1rem' }}>
        {flipped && quizIndex < quizList.length - 1 && (
          <button onClick={handleNext}>다음 문제</button>
        )}
        {flipped && quizIndex === quizList.length - 1 && <p>🎉 퀴즈 완료!</p>}
      </div>
    </div>
  );
}
