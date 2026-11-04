import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { courses } from '../data/courses/index.js';
import type { CodeProgress, CourseProgress, ProgressContextValue } from '../data/types.js';

const ProgressContext = createContext<ProgressContextValue | null>(null);
const storageKey = (courseId: string) => `learning-program:${courseId}`;
const emptyProgress = (): CourseProgress => ({ quiz: {}, code: {} });

function readProgress(courseId: string): CourseProgress {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey(courseId)) || 'null') as
      | Partial<CourseProgress>
      | null;
    if (!saved) return emptyProgress();

    const legacyCode = (saved.code || {}) as Record<string, Partial<CodeProgress> | undefined>;
    const code = Object.fromEntries(
      Object.entries(legacyCode).map(([topicId, record]) => {
        const passed = Boolean(record?.passed ?? record?.pass);
        return [
          topicId,
          {
            source: record?.source || '',
            pass: passed,
            passed,
            attempted: Boolean(record?.attempted ?? record?.source),
            hintsUsed: record?.hintsUsed || 0,
            bestRunTime: record?.bestRunTime ?? null,
          } satisfies CodeProgress,
        ];
      }),
    );
    return { ...emptyProgress(), ...saved, quiz: saved.quiz || {}, code };
  } catch {
    return emptyProgress();
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Record<string, CourseProgress>>(() =>
    Object.fromEntries(courses.map((course) => [course.id, readProgress(course.id)])),
  );

  useEffect(() => {
    courses.forEach((course) => {
      localStorage.setItem(
        storageKey(course.id),
        JSON.stringify(data[course.id] || emptyProgress()),
      );
    });
  }, [data]);

  const update = (courseId: string, change: (current: CourseProgress) => CourseProgress) =>
    setData((current) => ({
      ...current,
      [courseId]: change(current[courseId] || emptyProgress()),
    }));

  const value = useMemo<ProgressContextValue>(
    () => ({
      get: (courseId) => data[courseId] || emptyProgress(),
      setQuiz: (courseId, topicId, quiz) =>
        update(courseId, (current) => ({
          ...current,
          quiz: { ...current.quiz, [topicId]: quiz },
        })),
      setCode: (courseId, topicId, code) =>
        update(courseId, (current) => ({
          ...current,
          code: { ...current.code, [topicId]: code },
        })),
      setLastVisited: (courseId, topicId) =>
        update(courseId, (current) => ({ ...current, lastVisitedTopicId: topicId })),
      reset: (courseId) => update(courseId, emptyProgress),
    }),
    [data],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used inside ProgressProvider');
  return context;
}
