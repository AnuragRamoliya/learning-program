import type { TestResult } from '../data/types.js';
import { useI18n } from '../i18n/useI18n.js';

interface TestResultsProps {
  results: TestResult[] | null;
}

export default function TestResults({ results }: TestResultsProps) {
  const { t } = useI18n();
  if (!results) return null;
  return (
    <div className="mt-4 grid gap-2" aria-live="polite">
      {results.map((result, index) => (
        <article
          className={`overflow-hidden rounded-lg p-3 text-sm break-words ${result.pass ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-50 text-rose-800 dark:bg-rose-950 dark:text-rose-300'}`}
          key={index}
        >
          <b>
            {result.pass ? t('test.pass') : t('test.fail')} · {t('lesson.test')} {index + 1}
          </b>
          <div>
            {t('test.input')}: <code className="font-mono">{JSON.stringify(result.input)}</code>
          </div>
          <div>
            {t('test.got')}:{' '}
            {result.error ? (
              <span>
                {t('test.runtimeError')}:{' '}
                {result.error === 'Time limit exceeded (possible infinite loop)'
                  ? t('runner.timeLimit')
                  : result.error}
                {result.errorLine ? ` (${t('test.errorLine')} ${result.errorLine})` : ''}
              </span>
            ) : (
              <code className="font-mono">
                {result.got === undefined ? 'undefined' : JSON.stringify(result.got)}
              </code>
            )}
          </div>
          <div>
            {t('test.expected')}:{' '}
            <code className="font-mono">
              {result.expected === undefined ? 'undefined' : JSON.stringify(result.expected)}
            </code>
          </div>
          <div className="mt-1 text-xs opacity-75">
            {t('lesson.time')}: {result.timeMs} {t('lesson.ms')}
          </div>
        </article>
      ))}
    </div>
  );
}
