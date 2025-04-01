import React from 'react';
import { buildApiUrl } from '../utils/queryHelpers';

export function getKanjiUrl(params = {}) {
  return buildApiUrl(params);
}
