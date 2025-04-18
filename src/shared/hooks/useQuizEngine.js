import React, { useState, useRef, useMemo, useEffect } from 'react';
import { fetchQuizItems } from '../api/fetchQuizItems.js';
import { shuffle } from '../../utils/shuffle.js';

// TODO: constants화 처리
export default function useQuizEngine({ mode = 'LIMITED', quizLimit }) {
  /* 공통 상태 */
  const [quizList, setQuizList] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [alertVisible, setAlertVisible] = useState(false);
  const [choicePool, setChoicePool] = useState([]);

  /* INFINITEMODE 관련 상태*/
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

      if (choicePool.length < 200) {
        const poolData = await fetchQuizItems({ mode: 'RANDOM', limit: 200 });
        const newChoices = poolData.items.filter(
          (item) => !choicePool.some((existing) => existing.id === item.id)
        );
        setChoicePool((prev) => [...prev, ...shuffle(newChoices)]);
      }

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

  const allChoices = useMemo(() => {
    const isQuizUnavailable = !currentQuiz || quizList.length === 0;
    if (isQuizUnavailable) return [];

    const filtered = choicePool.filter((item) => item.id !== currentQuiz.id);
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
      const isDuplicateChoice =
        seenIds.has(formatted.id) || seenDisplay.has(formatted.display);
      if (isDuplicateChoice) break;

      seenDisplay.add(formatted.display);
      seenIds.add(formatted.id);
      uniqueChoices.push(formatted);

      if (uniqueChoices.length >= 4) break;
    }

    return shuffle(uniqueChoices);
  }, [currentQuiz, quizList, choicePool]);

  useEffect(() => {
    const shouldRefetchPool = answeredCount > 0 && answeredCount % 50 === 0;

    if (shouldRefetchPool && !loading) {
      const fetchMoreChoices = async () => {
        try {
          const data = await fetchQuizItems({
            mode: 'RANDOM',
            limit: 100,
          });

          const existingIds = new Set(choicePool.map((item) => item.id));
          const newItems = data.items.filter(
            (item) => !existingIds.has(item.id)
          );

          setChoicePool((prev) => [...prev, ...shuffle(newItems)]);
        } catch (err) {
          console.error('⚠️ 보기 후보 추가에 실패했습니다.', err);
        }
      };

      fetchMoreChoices();
    }
  }, [answeredCount, loading, choicePool]);

  const handleAnswerClick = (choice) => {
    setSelectedAnswer(choice);
  };

  const handleShowAnswer = () => {
    if (!selectedAnswer) {
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 2000);
      return;
    }

    const isAnswerCorrect = selectedAnswer.id === currentQuiz.id;
    const correct = isAnswerCorrect;
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
