const BASE_API = 'http://localhost:40324/api/v1/hanzawa-kanji';

function cleanParams(params = {}) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value != null)
  );
}

export function buildQueryString(params = {}) {
  const query = new URLSearchParams(params).toString();

  return query ? `?${query}` : '';
}

export function buildApiUrl(params = {}) {
  const cleanedUrl = cleanParams(params);
  return `${BASE_API}${buildQueryString(cleanedUrl)}`;
}
