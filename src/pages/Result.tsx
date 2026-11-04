import { Link, useOutletContext } from 'react-router-dom';
import ScoreCard from '../components/ScoreCard.js';
import { courseTotals, topicMax, topicScore } from '../hooks/scoring.js';
import type { CourseOutletContext } from './courseContext.js';
import { useI18n } from '../i18n/useI18n.js';
import { tr } from '../data/types.js';

export default function Result() {
  const { course, state } = useOutletContext<CourseOutletContext>();
  const { language, t } = useI18n();
  const totals = courseTotals(course, state);
  const grade =
    totals.percent >= 85
      ? t('result.expert')
      : totals.percent >= 60
        ? t('result.solid')
        : totals.percent >= 30
          ? t('result.keepPractising')
          : t('result.beginning');

  return (
    <div className="mx-auto max-w-4xl print:text-black">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400">
            {t('result.courseSummary')}
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {tr(course.title, language)}
          </h1>
        </div>
        <button
          className="w-fit rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 print:hidden"
          onClick={() => window.print()}
        >
          {t('result.print')}
        </button>
      </div>
      <section className="mb-8 flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 print:border-0 print:bg-white">
        <ScoreCard {...totals} />
        <div>
          <h2 className="mb-1 text-xl font-semibold">{grade}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {totals.complete} / {course.topics.length} {t('result.quizzesCompleted')}
          </p>
        </div>
      </section>
      <h2 className="mb-4 text-xl font-semibold">{t('result.topicResults')}</h2>
      {course.topics.map((topic) => {
        const quiz = state.quiz[topic.id];
        const code = state.code[topic.id];
        return (
          <article
            className="mb-4 break-inside-avoid rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 print:border-slate-300 print:bg-white"
            key={topic.id}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="font-semibold">{tr(topic.t, language)}</h3>
              <b>
                {topicScore(topic, state)} / {topicMax(topic)}
              </b>
            </div>
            {!quiz?.submitted ? (
              <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
                {t('result.quizNotAttempted')}
              </p>
            ) : (
              topic.mcq.map((question, index) => {
                const answer = quiz.answers[index];
                const correct = answer === question.a;
                return (
                  <div
                    className="border-t border-slate-200 py-3 text-sm dark:border-slate-800"
                    key={index}
                  >
                    <b>{tr(question.q, language)}</b>
                    <p className="my-1">
                      {t('result.yourAnswer')}:{' '}
                      <span
                        className={
                          correct
                            ? 'font-semibold text-emerald-700 dark:text-emerald-400'
                            : 'font-semibold text-rose-700 dark:text-rose-400'
                        }
                      >
                        {tr(question.o[answer ?? -1] || t('result.noAnswer'), language)}
                      </span>
                      {!correct && (
                        <>
                          {' '}
                          · {t('result.correctAnswer')}:{' '}
                          <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                            {tr(question.o[question.a], language)}
                          </span>
                        </>
                      )}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400">{tr(question.e, language)}</p>
                  </div>
                );
              })
            )}
            {topic.pr && (
              <p className="my-3 text-sm">
                {t('result.coding')}:{' '}
                <b
                  className={
                    (code?.passed ?? code?.pass)
                      ? 'text-emerald-700 dark:text-emerald-400'
                      : 'text-slate-500'
                  }
                >
                  {(code?.passed ?? code?.pass)
                    ? t('result.passedAllTests')
                    : t('result.notPassed')}
                </b>
                {(code?.hintsUsed ?? 0) > 0 && (
                  <span className="ml-2 text-slate-500 dark:text-slate-400">
                    ·{' '}
                    {(code?.hintsUsed ?? 0) >= topic.pr.explanation.hints.length
                      ? t('lesson.solvedWithHints')
                      : `${t('lesson.hintsUsed')}: ${code?.hintsUsed ?? 0}`}
                  </span>
                )}
                {code?.bestRunTime !== null && code?.bestRunTime !== undefined && (
                  <span className="ml-2 text-slate-500 dark:text-slate-400">
                    · {t('result.bestRun')}: {code.bestRunTime.toFixed(2)} {t('lesson.ms')}
                  </span>
                )}
              </p>
            )}
            <Link
              className="inline-flex rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-indigo-700 hover:border-indigo-500 print:hidden dark:border-slate-700 dark:text-indigo-300"
              to={`/course/${course.id}/${topic.id}?tab=learn`}
            >
              {t('result.openTopic')}
            </Link>
          </article>
        );
      })}
    </div>
  );
}
