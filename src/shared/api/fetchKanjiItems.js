import { buildApiUrl } from '../../utils/queryHelpers.js';

export async function fetchKanjiItems({ cursor }) {
  const url = buildApiUrl({ cursor });
  const res = await fetch(url);

  if (!res.ok) throw new Error(`HTTP에서 에러가⚠️ ${res.status}🤯`);

  const data = await res.json();
  return data;
}
