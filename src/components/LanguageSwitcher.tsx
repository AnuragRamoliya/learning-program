import { useI18n } from '../i18n/useI18n.js';

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useI18n();
  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1 text-xs dark:border-slate-700 dark:bg-slate-900"
      role="group"
      aria-label={t('language.label')}
    >
      <button
        className={`rounded-full px-2.5 py-1.5 font-semibold ${language === 'en' ? 'bg-indigo-600 text-white dark:bg-indigo-500' : 'text-slate-600 dark:text-slate-300'}`}
        aria-pressed={language === 'en'}
        onClick={() => setLanguage('en')}
      >
        {t('language.english')}
      </button>
      <button
        className={`rounded-full px-2.5 py-1.5 font-semibold ${language === 'gu' ? 'bg-indigo-600 text-white dark:bg-indigo-500' : 'text-slate-600 dark:text-slate-300'}`}
        aria-pressed={language === 'gu'}
        onClick={() => setLanguage('gu')}
      >
        {t('language.gujarati')}
      </button>
    </div>
  );
}
