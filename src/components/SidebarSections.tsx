import { memo } from 'react';
import { Link } from 'react-router-dom';
import { tr, type Course, type CourseProgress, type Topic } from '../data/types.js';
import { topicMax, topicScore } from '../hooks/scoring.js';
import { isTopicComplete } from '../hooks/courseNavigation.js';
import { useI18n } from '../i18n/useI18n.js';

export type TopicFilter = 'all' | 'not-started' | 'in-progress' | 'completed';

interface TopicStatus {
  score: number;
  max: number;
  started: boolean;
  completed: boolean;
}

interface SidebarSectionsProps {
  groups: Array<[Course['topics'][number]['lv'], Course['topics']]>;
  state: CourseProgress;
  currentTopicId?: string;
  courseId: string;
  query: string;
  filter: TopicFilter;
  openSections: Record<string, boolean>;
  onToggleSection: (section: string) => void;
  onTopicOpen: () => void;
}

function statusFor(topic: Topic, state: CourseProgress): TopicStatus {
  const quiz = state.quiz[topic.id];
  const code = state.code[topic.id];
  const quizStarted = Boolean(quiz?.submitted || quiz?.answers.some((answer) => answer !== null));
  const codingStarted = Boolean(
    code?.attempted ||
    code?.hintsUsed ||
    (code?.source && code.source !== topic.pr?.starters.javascript),
  );
  const completed = isTopicComplete(topic, state);
  return {
    score: topicScore(topic, state),
    max: topicMax(topic),
    started: quizStarted || codingStarted,
    completed,
  };
}

function matchesFilter(status: TopicStatus, filter: TopicFilter) {
  if (filter === 'not-started') return !status.started;
  if (filter === 'in-progress') return status.started && !status.completed;
  if (filter === 'completed') return status.completed;
  return true;
}

function sameStatuses(a: SidebarSectionsProps, b: SidebarSectionsProps) {
  for (const [, topics] of a.groups) {
    for (const topic of topics) {
      const first = statusFor(topic, a.state);
      const second = statusFor(topic, b.state);
      if (
        first.score !== second.score ||
        first.max !== second.max ||
        first.started !== second.started ||
        first.completed !== second.completed
      )
        return false;
    }
  }
  return true;
}

function SidebarSectionsView({
  groups,
  state,
  currentTopicId,
  courseId,
  query,
  filter,
  openSections,
  onToggleSection,
  onTopicOpen,
}: SidebarSectionsProps) {
  const { language, t } = useI18n();
  const normalizedQuery = query.trim().toLocaleLowerCase();

  return (
    <div className="space-y-1">
      {groups.map(([section, topics]) => {
        const sectionKey = tr(section, 'en');
        const sectionName = tr(section, language);
        const sectionMatches =
          !normalizedQuery || sectionName.toLocaleLowerCase().includes(normalizedQuery);
        const visibleTopics = topics.filter((topic) => {
          const topicMatches =
            sectionMatches || tr(topic.t, language).toLocaleLowerCase().includes(normalizedQuery);
          return topicMatches && matchesFilter(statusFor(topic, state), filter);
        });
        if (visibleTopics.length === 0) return null;

        const done = topics.filter((topic) => statusFor(topic, state).completed).length;
        const percent = topics.length ? Math.round((done / topics.length) * 100) : 0;
        const isOpen = Boolean(normalizedQuery) || (openSections[sectionKey] ?? false);

        return (
          <section
            className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
            key={sectionKey}
          >
            <button
              className="w-full px-3 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800"
              aria-expanded={isOpen}
              onClick={() => onToggleSection(sectionKey)}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="min-w-0 truncate text-xs font-bold uppercase tracking-wide">
                  {sectionName}
                </span>
                <span className="flex shrink-0 items-center gap-2 text-[0.7rem] text-slate-500 dark:text-slate-400">
                  {done}/{topics.length}
                  <svg
                    className={`size-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 7.47a.75.75 0 0 1 1.06 0L10 11.19l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.53a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </span>
              <span className="mt-2 block h-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <span
                  className="block h-full rounded-full bg-emerald-500"
                  style={{ width: `${percent}%` }}
                />
              </span>
            </button>
            {isOpen && (
              <div className="border-t border-slate-100 p-1.5 dark:border-slate-800">
                {visibleTopics.map((topic) => {
                  const status = statusFor(topic, state);
                  const active = currentTopicId === topic.id;
                  return (
                    <Link
                      key={topic.id}
                      to={`/course/${courseId}/${topic.id}?tab=learn`}
                      onClick={onTopicOpen}
                      aria-current={active ? 'page' : undefined}
                      className={`flex min-h-10 items-center gap-2 rounded-lg px-2 py-2 text-sm ${active ? 'bg-indigo-50 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200' : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}
                    >
                      <span
                        className={`grid size-5 shrink-0 place-items-center rounded text-[0.65rem] font-bold ${topic.pr ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300' : 'text-slate-400'}`}
                        aria-label={topic.pr ? t('nav.hasCodingPractice') : t('nav.quizOnly')}
                      >
                        {topic.pr ? '</>' : '•'}
                      </span>
                      <span className="min-w-0 flex-1 truncate">{tr(topic.t, language)}</span>
                      <span className="shrink-0 rounded-full bg-slate-100 px-1.5 py-0.5 text-[0.65rem] tabular-nums text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {status.score}/{status.max}
                      </span>
                      {status.completed && (
                        <span
                          className="shrink-0 text-xs font-bold text-emerald-600 dark:text-emerald-400"
                          aria-label={t('nav.topicCompleted')}
                        >
                          ✓
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

export default memo(
  SidebarSectionsView,
  (previous, next) =>
    previous.groups === next.groups &&
    previous.currentTopicId === next.currentTopicId &&
    previous.courseId === next.courseId &&
    previous.query === next.query &&
    previous.filter === next.filter &&
    previous.openSections === next.openSections &&
    sameStatuses(previous, next),
);
