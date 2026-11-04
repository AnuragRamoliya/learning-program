import type { ProblemExplanation as ProblemExplanationData } from '../data/types.js';
import { tr } from '../data/types.js';
import { useI18n } from '../i18n/useI18n.js';

export default function ProblemExplanation({
  explanation,
}: {
  explanation: ProblemExplanationData;
}) {
  const { language, t } = useI18n();
  return (
    <section className="mt-5 grid gap-4 border-t border-emerald-200 pt-5 dark:border-emerald-900">
      <div>
        <h3 className="mb-1 text-lg font-semibold">{t('lesson.howItWorks')}</h3>
        <p className="text-sm leading-6">{tr(explanation.idea, language)}</p>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-6">
          {explanation.steps.map((step, index) => (
            <li key={index}>{tr(step, language)}</li>
          ))}
        </ol>
      </div>

      <div>
        <h3 className="mb-2 font-semibold">{t('lesson.stepByStep')}</h3>
        <p className="mb-2 break-words font-mono text-xs text-slate-600 dark:text-slate-300">
          {explanation.trace.input}
        </p>
        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
          <table className="w-full min-w-max border-collapse text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                {explanation.trace.columns.map((column, index) => (
                  <th
                    className="border-b border-slate-200 px-3 py-2 font-semibold dark:border-slate-700"
                    key={index}
                  >
                    {tr(column, language)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {explanation.trace.rows.map((row, rowIndex) => (
                <tr className="even:bg-slate-50 dark:even:bg-slate-800/50" key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      className="border-t border-slate-100 px-3 py-2 align-top dark:border-slate-800"
                      key={cellIndex}
                    >
                      {tr(cell, language)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-semibold">{t('lesson.complexity')}</h3>
        <p className="text-sm">
          {t('lesson.timeComplexity')}: <b>{explanation.complexity.time}</b> ·{' '}
          {t('lesson.spaceComplexity')}: <b>{explanation.complexity.space}</b>
        </p>
        <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {tr(explanation.complexity.why, language)}
        </p>
        {explanation.brute && (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wide">
                {t('lesson.bruteForce')}
              </h4>
              <p className="mt-1 text-xs">{explanation.brute.complexity}</p>
              <pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded bg-slate-900 p-2 text-xs text-indigo-100">
                <code>{explanation.brute.code}</code>
              </pre>
            </div>
            <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-950">
              <h4 className="text-xs font-bold uppercase tracking-wide">{t('lesson.optimized')}</h4>
              <p className="mt-1 text-xs">
                {explanation.complexity.time} time, {explanation.complexity.space} space
              </p>
              <p className="mt-2 text-xs leading-5">{tr(explanation.complexity.why, language)}</p>
            </div>
          </div>
        )}
      </div>

      <div>
        <h3 className="mb-2 font-semibold">{t('lesson.commonMistakes')}</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          {explanation.mistakes.map((mistake, index) => (
            <li key={index}>{tr(mistake, language)}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
