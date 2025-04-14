import React from 'react';
import KanjiCard from './KanjiCard.jsx';

export default function QuestionCard({
  currentQuiz,
  allChoices,
  flipped,
  selectedAnswer,
  handleAnswerClick,
  isCorrect,
}) {
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

          let backgroundColor = '';
          let border = '1px solid #ccc';

          if (isCorrect !== null) {
            backgroundColor = isCorrectAnswer
              ? 'lightgreen'
              : isSelected
              ? 'salmon'
              : '#eee';
          } else if (isSelected) {
            backgroundColor = '#d0e7ff'; // 연한 파랑
            border = '2px solid #3399ff';
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerClick(choice)}
              disabled={isCorrect !== null}
              style={{
                margin: '0.5rem',
                padding: '1rem 2rem',
                fontSize: '1.2rem',
                cursor: isCorrect !== null ? 'not-allowed' : 'pointer',
                backgroundColor,
                border,
                opacity:
                  isCorrect !== null && !isCorrectAnswer && !isSelected
                    ? 0.6
                    : 1,
              }}
            >
              {choice.display[0]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
