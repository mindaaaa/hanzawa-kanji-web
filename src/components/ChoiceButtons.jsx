import React from 'react';

export default function ChoiceButtons({ options, onSelect, selected }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          style={{
            padding: '0.8rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: selected === opt ? '#333' : '#eee',
            color: selected === opt ? '#fff' : '#000',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
