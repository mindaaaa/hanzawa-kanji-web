import mockQuizData from '../../../data/mockQuizData.json';
import mockKanji from '../../../data/mockKanji.json';
import { shuffle } from '../../../utils/shuffle.js';
import { Mode } from '../../constants/index.js';

const DEFAULT_QUIZ_LIMIT = 20;
const DEFAULT_KANJI_LIMIT = 40;
const MOCK_DELAY_MS = 150;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function paginate(source, cursor, limit) {
  const start = Number(cursor ?? 0);
  const end = start + limit;
  const items = source.slice(start, end);
  const nextCursor = end >= source.length ? null : end;
  return { items, cursor: nextCursor };
}

export async function mockFetchQuizItems({ mode, limit, cursor }) {
  await delay(MOCK_DELAY_MS);

  const size = limit ?? DEFAULT_QUIZ_LIMIT;

  if (mode === Mode.RANDOM) {
    const items = shuffle(mockQuizData).slice(0, size);
    return { items, cursor: null };
  }

  return paginate(mockQuizData, cursor, size);
}

export async function mockFetchKanjiItems({ cursor }) {
  await delay(MOCK_DELAY_MS);
  return paginate(mockKanji, cursor, DEFAULT_KANJI_LIMIT);
}
