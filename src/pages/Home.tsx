import { Link } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar.js';
import { comingSoon, courses } from '../data/courses/index.js';
import { continueTopic } from '../hooks/courseNavigation.js';
import { courseTotals } from '../hooks/scoring.js';
import { useProgress } from '../hooks/useProgress.js';
import { useI18n } from '../i18n/useI18n.js';
import LanguageSwitcher from '../components/LanguageSwitcher.js';
import { tr } from '../data/types.js';

export default function Home() {
  const progress = useProgress();
  const { language, t } = useI18n();
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-7 sm:py-14">
      <header className="mb-10 sm:mb-12">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 text-xs font-bold tracking-[0.16em] text-indigo-600 dark:text-indigo-400">
              {t('home.eyebrow')}
            </div>
            <h1 className="mb-3 text-4xl font-bold tracking-tight sm:text-5xl">
              {t('home.title')}
            </h1>
            <p className="text-base text-slate-600 dark:text-slate-400">{t('home.description')}</p>
          </div>
          <LanguageSwitcher />
        </div>
      </header>
      <h2 className="mb-4 text-xl font-semibold tracking-tight">{t('home.availableCourses')}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {courses.map((course) => {
          const courseState = progress.get(course.id);
          const totals = courseTotals(course, courseState);
          const sections = new Set(course.topics.map((topic) => tr(topic.lv, 'en'))).size;
          const codingProblems = course.topics.filter((topic) => topic.pr).length;
          const quizQuestions = course.topics.reduce((count, topic) => count + topic.mcq.length, 0);
          const destination = continueTopic(course, courseState);
          const isStarted = totals.percent > 0;
          return (
            <Link
              className="flex min-h-64 flex-col rounded-2xl border border-slate-200 bg-white p-6 hover:border-indigo-400 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500"
              to={`/course/${course.id}/${destination.id}?tab=learn`}
              key={course.id}
            >
              <div className="mb-5 grid size-11 place-items-center rounded-xl bg-indigo-50 text-xl text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                {course.icon}
              </div>
              <h3 className="mb-2 mt-2 text-xl font-semibold">{tr(course.title, language)}</h3>
              <p className="mb-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {tr(course.description, language)}
              </p>
              <dl className="mb-4 grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                <div>
                  <dt className="sr-only">Sections</dt>
                  <dd>
                    {sections} {t('home.sections')}
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Topics</dt>
                  <dd>
                    {course.topics.length} {t('home.topics')}
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Coding problems</dt>
                  <dd>
                    {codingProblems} {t('home.codingProblems')}
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Quiz questions</dt>
                  <dd>
                    {quizQuestions} {t('home.quizQuestions')}
                  </dd>
                </div>
              </dl>
              <div className="mt-auto">
                <ProgressBar value={totals.percent} />
                <div className="mt-2 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>
                    {totals.percent}% {t('home.complete')}
                  </span>
                  <span>
                    {totals.earned}/{totals.max} points
                  </span>
                </div>
                <span className="mt-4 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white dark:bg-indigo-500">
                  {isStarted ? t('home.continue') : t('home.startCourse')}
                </span>
              </div>
            </Link>
          );
        })}
        {comingSoon.map((name) => (
          <article
            className="flex min-h-64 flex-col rounded-2xl border border-slate-200 bg-white p-6 opacity-60 dark:border-slate-800 dark:bg-slate-900"
            key={name}
          >
            <div className="mb-5 grid size-11 place-items-center rounded-xl bg-slate-100 text-xl text-slate-500 dark:bg-slate-800">
              ◌
            </div>
            <div className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400">
              {t('home.comingSoon')}
            </div>
            <h3 className="mb-2 mt-2 text-xl font-semibold">{name}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t('home.comingSoonDescription')}
            </p>
            <span className="mt-auto w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              {t('home.comingSoonButton')}
            </span>
          </article>
        ))}
      </div>
    </main>
  );
}
