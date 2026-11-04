import { useEffect, useMemo, useState, type ReactNode } from 'react';
import en from './en.json';
import gu from './gu.json';
import type { Language } from '../data/types.js';
import { I18nContext, type I18nValue } from './context.js';

const translations: Record<Language, Record<string, string>> = { en, gu };

function initialLanguage(): Language {
  return localStorage.getItem('lp_lang') === 'gu' ? 'gu' : 'en';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const setLanguage = (nextLanguage: Language) => {
    localStorage.setItem('lp_lang', nextLanguage);
    setLanguageState(nextLanguage);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<I18nValue>(
    () => ({
      language,
      setLanguage,
      t: (key) => {
        const translated = translations[language][key];
        if (translated) return translated;
        if (import.meta.env.DEV) console.warn(`Missing ${language} UI translation: ${key}`);
        return translations.en[key] ?? key;
      },
    }),
    [language],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
