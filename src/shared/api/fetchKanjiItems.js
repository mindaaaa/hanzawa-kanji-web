import { buildApiUrl } from '../../utils/queryHelpers.js';
import { mockFetchKanjiItems } from './mock/mockFetchers.js';

export async function fetchKanjiItems({ cursor }) {
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    return mockFetchKanjiItems({ cursor });
  }

  const url = buildApiUrl({ cursor });
  const res = await fetch(url);

  if (!res.ok) throw new Error(`HTTP에서 에러가⚠️ ${res.status}🤯`);

  const data = await res.json();
  return data;
}
