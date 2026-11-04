import { useEffect, useState } from 'react';
import { Link, useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor.js';
import LessonView from '../components/LessonView.js';
import ProblemExplanation from '../components/ProblemExplanation.js';
import QuizView from '../components/QuizView.js';
import TestResults from '../components/TestResults.js';
import { tr, type RunOutput, type TestResult } from '../data/types.js';
import { runCode } from '../runner/index.js';
import type { CourseOutletContext } from './courseContext.js';
import { useI18n } from '../i18n/useI18n.js';

type LessonTab = 'learn' | 'practice' | 'quiz';
const tabs: LessonTab[] = ['learn', 'practice', 'quiz'];
const cardClass =
  'rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900';
const buttonClass =
  'inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-700';
const primaryButtonClass =
  'inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-wait disabled:opacity-60 dark:bg-indigo-500';

export default function Lesson() {
  const { course, state, progress } = useOutletContext<CourseOutletContext>();
  const { language, t } = useI18n();
  const { topicId } = useParams();
  const topic = course.topics.find((item) => item.id === topicId);
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedTab = searchParams.get('tab');
  const tab: LessonTab = tabs.includes(requestedTab as LessonTab)
    ? (requestedTab as LessonTab)
    : 'learn';
  const saved = topic ? state.code[topic.id] : undefined;
  const [source, setSource] = useState('');
  const [loadedTopicKey, setLoadedTopicKey] = useState('');
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [answerVisible, setAnswerVisible] = useState(false);

  useEffect(() => {
    const topicKey = `${course.id}:${topic?.id ?? ''}`;
    if (loadedTopicKey === topicKey) return;
    setLoadedTopicKey(topicKey);
    setSource(saved?.source || topic?.pr?.starters.javascript || '');
    setResults(null);
    setLogs([]);
    setAnswerVisible(false);
  }, [course.id, loadedTopicKey, saved?.source, topic]);

  useEffect(() => {
    if (topic && state.lastVisitedTopicId !== topic.id) {
      progress.setLastVisited(course.id, topic.id);
    }
  }, [course.id, progress, state.lastVisitedTopicId, topic]);

  if (!topic) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="mb-3 text-3xl font-bold">{t('lesson.topicNotFound')}</h1>
        <Link
          className="text-indigo-600 underline dark:text-indigo-400"
          to={`/course/${course.id}`}
        >
          {t('lesson.backToCourse')}
        </Link>
      </div>
    );
  }

  const currentTopic = topic;
  const previousTopic = course.topics[course.topics.findIndex((item) => item.id === topic.id) - 1];
  const topicIndex = course.topics.findIndex((item) => item.id === currentTopic.id);
  const nextTopic = course.topics[topicIndex + 1];

  function goTab(nextTab: LessonTab) {
    setSearchParams({ tab: nextTab });
  }
  const quiz = state.quiz[currentTopic.id];

  async function runTests() {
    if (!currentTopic.pr) return;
    setRunning(true);
    setResults(null);
    setLogs([]);
    setAnswerVisible(false);
    let output: RunOutput;
    try {
      output = await runCode('javascript', source, currentTopic.pr);
    } catch (error) {
      setRunning(false);
      setResults(
        currentTopic.pr.tests.map(([input, expected]) => ({
          pass: false,
          got: null,
          expected,
          input,
          error: error instanceof Error ? error.message : String(error),
          timeMs: 0,
        })),
      );
      return;
    }
    const testResults = output.results;
    setResults(testResults);
    setLogs(output.logs);
    const passed = testResults.length > 0 && testResults.every((result) => result.pass);
    const totalTime = testResults.reduce((total, result) => total + result.timeMs, 0);
    const previousBest = saved?.bestRunTime ?? null;
    progress.setCode(course.id, currentTopic.id, {
      source,
      pass: passed,
      passed,
      attempted: true,
      hintsUsed: saved?.hintsUsed ?? 0,
      bestRunTime: passed
        ? previousBest === null
          ? totalTime
          : Math.min(previousBest, totalTime)
        : previousBest,
    });
    setRunning(false);
  }

  function updateCode(value: string) {
    setSource(value);
    setResults(null);
    setLogs([]);
    setAnswerVisible(false);
    progress.setCode(course.id, currentTopic.id, {
      source: value,
      pass: false,
      passed: false,
      attempted: true,
      hintsUsed: saved?.hintsUsed ?? 0,
      bestRunTime: saved?.bestRunTime ?? null,
    });
  }

  function revealNextHint() {
    if (!currentTopic.pr) return;
    const hintsUsed = Math.min(
      currentTopic.pr.explanation.hints.length,
      (saved?.hintsUsed ?? 0) + 1,
    );
    progress.setCode(course.id, currentTopic.id, {
      source,
      pass: saved?.passed ?? saved?.pass ?? false,
      passed: saved?.passed ?? saved?.pass ?? false,
      attempted: true,
      hintsUsed,
      bestRunTime: saved?.bestRunTime ?? null,
    });
  }

  function showAnswer() {
    if (window.confirm(t('lesson.confirmAnswer'))) {
      setAnswerVisible(true);
    }
  }

  function saveQuizDraft(answers: Array<number | undefined>) {
    progress.setQuiz(course.id, currentTopic.id, {
      answers: answers.map((answer) => answer ?? null),
      submitted: false,
    });
  }

  const earnedQuizPoints = quiz?.submitted
    ? quiz.answers.filter((answer, index) => answer === currentTopic.mcq[index].a).length
    : 0;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-5 text-sm text-slate-500 dark:text-slate-400">
        <Link className="text-indigo-600 dark:text-indigo-400" to="/">
          {t('lesson.courses')}
        </Link>
        <span> / </span>
        {tr(currentTopic.lv, language)}
      </div>
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <div className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400">
            {tr(currentTopic.lv, language)}
          </div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
            {tr(currentTopic.t, language)}
          </h1>
        </div>
        <span className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          {earnedQuizPoints + ((saved?.passed ?? saved?.pass) ? 2 : 0)} /{' '}
          {currentTopic.mcq.length + (currentTopic.pr ? 2 : 0)} points
        </span>
      </div>
      <div
        className="mt-6 flex gap-1 border-b border-slate-200 dark:border-slate-800"
        role="tablist"
      >
        {tabs.map((item) => (
          <button
            key={item}
            role="tab"
            aria-selected={tab === item}
            className={`border-b-2 px-4 py-2.5 text-sm capitalize ${tab === item ? 'border-indigo-600 font-semibold text-indigo-700 dark:text-indigo-300' : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}
            onClick={() => goTab(item)}
          >
            {t(`tabs.${item}`)}
          </button>
        ))}
      </div>

      <div className="mt-5">
        {tab === 'learn' && (
          <LessonView
            topic={currentTopic}
            onPractice={() => goTab('practice')}
            onQuiz={() => goTab('quiz')}
          />
        )}
        {tab === 'practice' &&
          (currentTopic.pr ? (
            <section className="grid gap-4">
              <article className={cardClass}>
                <h2 className="mb-3 text-xl font-semibold">{t('lesson.practice')}</h2>
                <div
                  className="mb-3 font-serif leading-7 [&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1 [&_code]:font-mono [&_.tip]:rounded-r-lg [&_.tip]:border-l-4 [&_.tip]:border-indigo-500 [&_.tip]:bg-indigo-50 [&_.tip]:px-3 [&_.tip]:py-2 dark:[&_code]:bg-slate-800 dark:[&_.tip]:bg-indigo-950"
                  dangerouslySetInnerHTML={{ __html: tr(currentTopic.pr.d, language) }}
                />
                <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
                  JavaScript · {currentTopic.pr.fn}()
                </p>
                <CodeEditor value={source} onChange={updateCode} />
                <div className="mt-3 flex flex-wrap gap-2">
                  <button className={primaryButtonClass} onClick={runTests} disabled={running}>
                    {running ? t('lesson.running') : t('lesson.runTests')}
                  </button>
                  <button
                    className={buttonClass}
                    onClick={() => {
                      const starter = currentTopic.pr?.starters.javascript || '';
                      setSource(starter);
                      updateCode(starter);
                      setResults(null);
                    }}
                  >
                    {t('lesson.resetCode')}
                  </button>
                </div>
                <TestResults results={results} />
                {results && (
                  <section className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950">
                    <h3 className="text-sm font-semibold">{t('lesson.output')}</h3>
                    <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap rounded bg-slate-900 p-3 font-mono text-xs text-indigo-100">
                      <code>{logs.length ? logs.join('\n') : t('lesson.noConsoleOutput')}</code>
                    </pre>
                  </section>
                )}
                {results && results.some((result) => !result.pass) && (
                  <section className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/40">
                    <h3 className="font-semibold">{t('lesson.needHint')}</h3>
                    <div className="mt-2 grid gap-2">
                      {currentTopic.pr.explanation.hints
                        .slice(0, saved?.hintsUsed ?? 0)
                        .map((hint, index) => (
                          <p className="text-sm leading-6" key={index}>
                            <b>
                              {t('lesson.hint')} {index + 1}:
                            </b>{' '}
                            {tr(hint, language)}
                          </p>
                        ))}
                    </div>
                    {(saved?.hintsUsed ?? 0) < currentTopic.pr.explanation.hints.length && (
                      <button className={`${buttonClass} mt-3`} onClick={revealNextHint}>
                        {t('lesson.needHint')}
                      </button>
                    )}
                    {(saved?.hintsUsed ?? 0) >= currentTopic.pr.explanation.hints.length && (
                      <button className={`${buttonClass} mt-3`} onClick={showAnswer}>
                        {t('lesson.showAnswer')}
                      </button>
                    )}
                  </section>
                )}
                {results?.length && results.every((result) => result.pass) ? (
                  <section className="mt-5 rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-100">
                    <h3 className="text-lg font-bold">{t('lesson.perfect')}</h3>
                    <p className="mt-1 text-sm font-semibold">{t('lesson.pointsEarned')}: +2</p>
                    <div className="mt-3">
                      <h4 className="text-sm font-semibold">{t('lesson.testTimes')}</h4>
                      <ul className="mt-1 grid gap-1 text-sm">
                        {results.map((result, index) => (
                          <li key={index}>
                            {t('lesson.test')} {index + 1}: {result.timeMs} {t('lesson.ms')}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {(saved?.hintsUsed ?? 0) > 0 && (
                      <p className="mt-2 text-sm font-semibold">
                        {(saved?.hintsUsed ?? 0) >= currentTopic.pr.explanation.hints.length
                          ? t('lesson.solvedWithHints')
                          : `${t('lesson.hintsUsed')}: ${saved?.hintsUsed ?? 0}`}
                      </p>
                    )}
                    <ProblemExplanation explanation={currentTopic.pr.explanation} />
                    {nextTopic && (
                      <Link
                        className="mt-4 inline-flex rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 dark:bg-emerald-600"
                        to={`/course/${course.id}/${nextTopic.id}?tab=learn`}
                      >
                        {t('lesson.nextTopic')}
                      </Link>
                    )}
                  </section>
                ) : answerVisible ? (
                  <section className="mt-5 rounded-xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-900 dark:bg-indigo-950/40">
                    <h3 className="mb-2 font-semibold">{t('lesson.referenceAnswer')}</h3>
                    <pre className="block w-full max-w-full overflow-x-auto rounded-xl bg-slate-900 p-4 font-mono text-sm leading-relaxed text-indigo-100">
                      <code>{currentTopic.pr.solutions.javascript}</code>
                    </pre>
                    <ProblemExplanation explanation={currentTopic.pr.explanation} />
                  </section>
                ) : null}
              </article>
            </section>
          ) : (
            <article className={cardClass}>
              <h2 className="mb-2 text-xl font-semibold">{t('lesson.practice')}</h2>
              <p className="mb-4 text-slate-600 dark:text-slate-300">
                {t('lesson.practiceComingSoon')}
              </p>
              <button className={primaryButtonClass} onClick={() => goTab('quiz')}>
                {t('lesson.goToQuiz')}
              </button>
            </article>
          ))}
        {tab === 'quiz' && (
          <QuizView
            topic={currentTopic}
            record={quiz}
            onDraft={saveQuizDraft}
            onSubmit={(answers) =>
              progress.setQuiz(course.id, currentTopic.id, { answers, submitted: true })
            }
            onRetake={() =>
              progress.setQuiz(course.id, currentTopic.id, { answers: [], submitted: false })
            }
          />
        )}
      </div>

      <footer className="mt-8 flex items-center justify-between gap-3 border-t border-slate-200 pt-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <span>
          {topicIndex + 1} {t('lesson.of')} {course.topics.length}
        </span>
        <div className="flex items-center gap-4">
          {previousTopic ? (
            <Link className={buttonClass} to={`/course/${course.id}/${previousTopic.id}?tab=learn`}>
              {t('lesson.previousTopic')}
            </Link>
          ) : (
            <button className={buttonClass} disabled>
              {t('lesson.previousTopic')}
            </button>
          )}
          {nextTopic ? (
            <Link className={buttonClass} to={`/course/${course.id}/${nextTopic.id}?tab=learn`}>
              {t('lesson.nextTopic')}
            </Link>
          ) : (
            <button className={buttonClass} disabled>
              {t('lesson.nextTopic')}
            </button>
          )}
          <Link className="text-indigo-600 dark:text-indigo-400" to={`/course/${course.id}/result`}>
            {t('lesson.viewResults')}
          </Link>
        </div>
      </footer>
    </div>
  );
}
