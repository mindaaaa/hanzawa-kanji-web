import React from 'react';
import KanjiCard from './KanjiCard.jsx';
import { shuffle } from '../utils/shuffle.js';

export default function QuestionCard({
  currentQuiz,
  allChoices,
  flipped,
  selectedAnswer,
  handleAnswerClick,
  displayMode,
}) {
  function getDisplayText(kanji, mode = 'meaning') {
    if (!kanji) return '없음 / 없음';

    const { korean, kunyomi = [], onyomi = [] } = kanji;

    if (mode === 'meaning') {
      const { kun = '-', on = '-' } = shuffle(korean)[0] || {};
      return `${kun} / ${on}`;
    }

    if (mode === 'reading') {
      const shuffledKunyomi = shuffle(kunyomi)[0] || '-'; // TODO: '-' 최상단에 뽑기
      const shuffledOnyomi = shuffle(onyomi)[0] || '-';
      return `${shuffledKunyomi} / ${shuffledOnyomi}`;
    }
    throw new Error('잘못된 모드입니다🤯');
  }

  const correctAnswer = currentQuiz;

  return (
    <div>
      <div>
        <KanjiCard key={currentQuiz.id} kanji={currentQuiz} flipped={flipped} />
      </div>

      <div style={{ margin: '1rem 0' }}>
        {allChoices.map((choice, index) => {
          const isCorrectAnswer = choice.id === correctAnswer.id;
          const isSelected = choice.id === selectedAnswer?.id;

          return (
            <button
              key={index}
              onClick={() => handleAnswerClick(choice)}
              disabled={selectedAnswer !== null} // TODO: null과 엄격한 비교! 주의하자
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
                  selectedAnswer && !isCorrectAnswer && !isSelected ? 0.6 : 1,
              }}
            >
              {getDisplayText(choice, displayMode)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
