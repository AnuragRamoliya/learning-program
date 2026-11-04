import { createContext } from 'react';
import type { Language } from '../data/types.js';

export interface I18nValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

export const I18nContext = createContext<I18nValue | null>(null);
