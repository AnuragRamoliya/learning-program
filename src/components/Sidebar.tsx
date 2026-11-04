import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Course, CourseProgress } from '../data/types.js';
import { continueTopic } from '../hooks/courseNavigation.js';
import { courseTotals } from '../hooks/scoring.js';
import ProgressBar from './ProgressBar.js';
import SidebarSections, { type TopicFilter } from './SidebarSections.js';
import LanguageSwitcher from './LanguageSwitcher.js';
import { useI18n } from '../i18n/useI18n.js';
import { tr } from '../data/types.js';

interface SidebarProps {
  course: Course;
  state: CourseProgress;
  onReset: () => void;
}

interface SidebarPanelProps extends SidebarProps {
  groups: Array<[Course['topics'][number]['lv'], Course['topics']]>;
  topicId?: string;
  openSections: Record<string, boolean>;
  onToggleSection: (section: string) => void;
  onTopicOpen: () => void;
}

const sectionStorageKey = (courseId: string) => `learning-program:${courseId}:open-sections`;

function SidebarPanel({
  course,
  state,
  onReset,
  groups,
  topicId,
  openSections,
  onToggleSection,
  onTopicOpen,
}: SidebarPanelProps) {
  const { language, t } = useI18n();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<TopicFilter>('all');
  const totals = courseTotals(course, state);
  const nextTopic = continueTopic(course, state);
  const filters: Array<[TopicFilter, string]> = [
    ['all', t('nav.all')],
    ['not-started', t('nav.notStarted')],
    ['in-progress', t('nav.inProgress')],
    ['completed', t('nav.completed')],
  ];

  return (
    <div className="flex h-full w-full min-w-0 flex-col bg-white p-4 dark:bg-slate-900 lg:p-5">
      <div className="flex min-w-0 items-center justify-between gap-2">
        <Link className="min-w-0 truncate font-bold tracking-tight" to="/">
          {t('nav.learningProgram')}
        </Link>
        <span className="shrink-0 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          {totals.percent}%
        </span>
      </div>
      <div className="mt-2 flex justify-end">
        <LanguageSwitcher />
      </div>

      <div className="mt-4 rounded-xl bg-slate-100 p-3 dark:bg-slate-800">
        <h2 className="text-sm font-semibold">{tr(course.title, language)}</h2>
        <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
          {totals.earned} / {totals.max} {t('nav.points')} · {totals.percent}%{' '}
          {t('nav.percentComplete')}
        </div>
        <ProgressBar value={totals.percent} />
      </div>

      {nextTopic && (
        <Link
          className="mt-3 inline-flex min-h-10 items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-700 dark:bg-indigo-500"
          to={`/course/${course.id}/${nextTopic.id}?tab=learn`}
          onClick={onTopicOpen}
        >
          {t('nav.continue')}
        </Link>
      )}

      <label className="mt-4">
        <span className="sr-only">{t('nav.search')}</span>
        <input
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
          type="search"
          placeholder={t('nav.search')}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>

      <div className="mt-2 flex flex-wrap gap-1.5" aria-label={t('nav.filterTopics')}>
        {filters.map(([value, label]) => (
          <button
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${filter === value ? 'bg-indigo-600 text-white dark:bg-indigo-500' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`}
            key={value}
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <nav className="scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent mt-3 min-h-0 flex-1 overflow-y-auto overscroll-contain dark:scrollbar-thumb-slate-600">
        <SidebarSections
          groups={groups}
          state={state}
          currentTopicId={topicId}
          courseId={course.id}
          query={query}
          filter={filter}
          openSections={openSections}
          onToggleSection={onToggleSection}
          onTopicOpen={onTopicOpen}
        />
      </nav>

      <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-1">
        <Link
          className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-300 px-3 py-2 text-center text-sm font-semibold hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-700"
          to={`/course/${course.id}/result`}
          onClick={onTopicOpen}
        >
          {t('nav.viewResult')}
        </Link>
        <button
          className="min-h-10 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-700"
          onClick={onReset}
        >
          {t('nav.resetProgress')}
        </button>
      </div>
    </div>
  );
}

export default function Sidebar({ course, state, onReset }: SidebarProps) {
  const { topicId } = useParams();
  const { language, t } = useI18n();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const groups = useMemo(() => {
    const grouped = new Map<string, Course['topics']>();
    for (const topic of course.topics) {
      const sectionKey = tr(topic.lv, 'en');
      const topics = grouped.get(sectionKey) ?? [];
      topics.push(topic);
      grouped.set(sectionKey, topics);
    }
    return [...grouped.entries()].map(
      ([key, topics]): [Course['topics'][number]['lv'], Course['topics']] => [
        course.topics.find((topic) => tr(topic.lv, 'en') === key)?.lv ?? key,
        topics,
      ],
    );
  }, [course.topics]);

  const currentTopic = course.topics.find((topic) => topic.id === topicId);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem(sectionStorageKey(course.id)) || '{}',
      ) as Record<string, boolean> | null;
      return {
        ...(stored ?? {}),
        ...(currentTopic ? { [tr(currentTopic.lv, 'en')]: true } : {}),
      };
    } catch {
      return {};
    }
  });

  useEffect(() => {
    if (currentTopic) {
      setOpenSections((current) => {
        const sectionKey = tr(currentTopic.lv, 'en');
        return current[sectionKey] ? current : { ...current, [sectionKey]: true };
      });
    }
  }, [currentTopic]);

  useEffect(() => {
    localStorage.setItem(sectionStorageKey(course.id), JSON.stringify(openSections));
  }, [course.id, openSections]);

  function toggleSection(section: string) {
    setOpenSections((current) => ({ ...current, [section]: !(current[section] ?? false) }));
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  const panelProps: SidebarPanelProps = {
    course,
    state,
    onReset,
    groups,
    topicId,
    openSections,
    onToggleSection: toggleSection,
    onTopicOpen: closeDrawer,
  };

  return (
    <>
      <aside className="sticky top-0 z-30 hidden h-dvh w-[292px] shrink-0 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:flex">
        <SidebarPanel {...panelProps} />
      </aside>

      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <Link className="font-bold tracking-tight" to="/">
            Learning Program
          </Link>
          <button
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold dark:border-slate-700"
            aria-expanded={drawerOpen}
            aria-controls="mobile-course-navigation"
            onClick={() => setDrawerOpen(true)}
          >
            <span aria-hidden="true">☰</span>
            {t('nav.menu')}
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <span className="truncate">
            {' '}
            {currentTopic ? tr(currentTopic.t, language) : tr(course.title, language)}
          </span>
          <span>{courseTotals(course, state).percent}% complete</span>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 lg:hidden ${drawerOpen ? 'visible' : 'invisible pointer-events-none'}`}
        id="mobile-course-navigation"
      >
        <button
          className={`absolute inset-0 bg-slate-950/50 transition-opacity ${drawerOpen ? 'opacity-100' : 'opacity-0'}`}
          aria-label={t('nav.closeMenu')}
          tabIndex={drawerOpen ? 0 : -1}
          onClick={closeDrawer}
        />
        <aside
          className={`absolute inset-y-0 left-0 flex w-[min(90vw,340px)] flex-col border-r border-slate-200 shadow-xl transition-transform dark:border-slate-800 ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
          aria-label="Course navigation"
        >
          <SidebarPanel {...panelProps} />
        </aside>
      </div>
    </>
  );
}
