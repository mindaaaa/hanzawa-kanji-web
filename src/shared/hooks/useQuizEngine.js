import React, { useState, useRef, useMemo } from 'react';
import { fetchQuizItems } from '../api/fetchQuizItems.js';
import { shuffle } from '../../utils/shuffle.js';

export default function useQuizEngine({ mode = 'LIMITED', quizLimit }) {
  const [quizList, setQuizList] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [alertVisible, setAlertVisible] = useState(false);

  const [isEnded, setIsEnded] = useState(false);
  const [cursor, setCursor] = useState(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [answeredCount, setAnsweredCount] = useState(0);

  const quizIdRef = useRef(crypto.randomUUID());

  const isLastQuestion = quizIndex === quizList.length - 1;
  const isQuizFinished = isLastQuestion && flipped;

  const currentQuiz = quizList[quizIndex];

  const fetchQuiz = async () => {
    if (loading || (mode === 'INFINITE' && !hasMore)) return;
    setLoading(true);

    try {
      const data = await fetchQuizItems({
        quizId: quizIdRef.current,
        mode: 'RANDOM',
        ...(mode === 'LIMITED' && { limit: quizLimit }),
        ...(mode === 'INFINITE' && { cursor }),
      });

      setQuizList((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));
        const newItems = data.items.filter((item) => !existingIds.has(item.id));
        return [...prev, ...shuffle(newItems)];
      });

      if (mode === 'INFINITE') {
        setCursor(data.cursor);
        if (!data.cursor) {
          setHasMore(false);
        }
      }
    } catch (err) {
      console.error('문제 불러오기 실패💥', err);
      setError('⚠️ 문제 불러오기 실패, 다시 시도해주세요🙇‍♂️');
    } finally {
      setLoading(false);
    }
  };

  //   // TODO: 이 부분에서 중복 id가 들어오는지 확인
  //   useEffect(() => {
  //     fetchQuizList();
  //   }, []);

  //   useEffect(() => {
  //     if (quizList.length > 0 && quizIndex >= quizList.length - 5) {
  //       fetchQuizList();
  //     }
  //   }, [quizIndex, quizList]);

  const allChoices = useMemo(() => {
    if (!currentQuiz || quizList.length === 0) return [];

    const filtered = quizList.filter((item) => item.id !== currentQuiz.id);
    const choices = shuffle(filtered).slice(0, 10);

    const rawChoices = [currentQuiz, ...choices];

    const formatChoice = (kanji) => {
      const { korean } = kanji;
      const shuffled = shuffle(korean);
      const { kun = '-', on = '-' } = shuffled[0] || {};
      const display = [`${kun} / ${on}`];

      return {
        ...kanji,
        display,
      };
    };

    const uniqueChoices = [];
    const seenDisplay = new Set();
    const seenIds = new Set();

    for (const kanji of rawChoices) {
      const formatted = formatChoice(kanji);

      if (seenIds.has(formatted.id) || seenDisplay.has(formatted.display))
        break;

      seenDisplay.add(formatted.display);
      seenIds.add(formatted.id);
      uniqueChoices.push(formatted);

      if (uniqueChoices.length >= 4) break;
    }

    return shuffle(uniqueChoices);
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

    if (correct) {
      setCorrectCount((prev) => prev + 1);
    }

    setAnsweredCount((prev) => prev + 1);

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

  function handleEndQuiz() {
    setIsEnded(true);
  }

  return {
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
  };
}
