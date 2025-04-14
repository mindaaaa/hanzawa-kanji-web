import React from 'react';
import KanjiCard from './KanjiCard.jsx';

export default function QuestionCard({
  currentQuiz,
  allChoices,
  flipped,
  selectedAnswer,
  handleAnswerClick,
  displayMode,
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
              {choice.display[displayMode]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
