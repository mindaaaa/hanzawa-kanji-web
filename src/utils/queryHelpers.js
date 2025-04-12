import { BASE_API } from '../shared/constants';

export function buildApiUrl(params = {}) {
  const cleanedQueryParams = cleanParams(params);
  return `${BASE_API}${buildQueryString(cleanedQueryParams)}`;
}

function cleanParams(params = {}) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value != null)
  );
}

function buildQueryString(params = {}) {
  const query = new URLSearchParams(params).toString();

  return query ? `?${query}` : '';
}
