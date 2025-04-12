import React from 'react';

export default function ResultSummary({ total, correct, onRestart }) {
  const rate = ((correct / total) * 100).toFixed(1);
  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>퀴즈 완료! 🎉</h2>
      <p>총 문항 수: {total}</p>
      <p>정답률: {rate}%</p>
      <button onClick={onRestart}>처음으로</button>
    </div>
  );
}
