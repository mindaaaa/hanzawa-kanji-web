import KanjiCard from './KanjiCard.jsx';
import ReadingRow from './ReadingRow.jsx';
import Choice from './Choice.jsx';
import styles from './QuestionCard.module.css';

const LETTERS = ['A', 'B', 'C', 'D'];

function computeState({ choiceId, correctId, selectedId, isRevealed }) {
  const isCorrectAnswer = choiceId === correctId;
  const isSelected = choiceId === selectedId;
  if (!isRevealed) return isSelected ? 'picked' : 'idle';
  if (isCorrectAnswer) return 'correct';
  if (isSelected) return 'wrong';
  return 'faded';
}

export default function QuestionCard({
  currentQuiz,
  allChoices,
  flipped,
  selectedAnswer,
  handleAnswerClick,
  isCorrect,
  kanjiAdornment,
}) {
  const isRevealed = isCorrect !== null;

  return (
    <div className={styles.card}>
      <div className={styles.kanjiSlot}>
        {kanjiAdornment}
        <div className={styles.kanjiCard}>
        <KanjiCard
          key={currentQuiz.id}
          kanji={currentQuiz}
          flipped={flipped}
          variant='coral'
          backContent={
            <>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  color: 'var(--cobalt)',
                  textAlign: 'center',
                  marginBottom: '14px',
                }}
              >
                {currentQuiz.korean.map((item, i) => (
                  <div key={i}>
                    {item.kun} {item.on}
                  </div>
                ))}
              </div>
              <ReadingRow type='kun' label='훈' value={currentQuiz.kunyomi || []} />
              <ReadingRow type='on' label='음' value={currentQuiz.onyomi || []} />
              <ReadingRow
                type='tra'
                label='정자체'
                value={currentQuiz.traditionalForm ? [currentQuiz.traditionalForm] : []}
              />
            </>
          }
        />
        </div>
      </div>

      <div className={styles.choices} role='radiogroup' aria-label='보기'>
        {allChoices.map((choice, i) => {
          const state = computeState({
            choiceId: choice.id,
            correctId: currentQuiz.id,
            selectedId: selectedAnswer?.id,
            isRevealed,
          });
          return (
            <Choice
              key={choice.id}
              state={state}
              letter={LETTERS[i]}
              onClick={() => handleAnswerClick(choice)}
            >
              {choice.display[0]}
            </Choice>
          );
        })}
      </div>
    </div>
  );
}
