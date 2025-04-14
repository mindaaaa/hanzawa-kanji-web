import React from 'react';

export default function ResultSummary({ total, correct, onRestart }) {
  const rate = ((correct / total) * 100).toFixed(2);
  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>퀴즈 완료! 🎉</h2>
      <p>{`${correct} / ${total}`}</p>
      <p>{rate}%</p>
      <button onClick={onRestart}>처음으로</button>
    </div>
  );
}
