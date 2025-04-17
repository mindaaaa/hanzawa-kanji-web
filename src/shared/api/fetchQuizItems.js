import { buildApiUrl } from '../../utils/queryHelpers.js';

export async function fetchQuizItems({
  quizId,
  mode = 'RANDOM',
  limit,
  cursor,
}) {
  const url = buildApiUrl({
    quizId,
    mode,
    limit,
    cursor,
  });

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP에서 에러가⚠️ ${res.status}🤯`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('문제 불러오기 실패💥', error);
    throw error;
  }
}
