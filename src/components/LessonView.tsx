import type { Topic } from '../data/types.js';
import { useI18n } from '../i18n/useI18n.js';
import LessonBlocks from './LessonBlocks.js';

interface LessonViewProps {
  topic: Topic;
  onPractice: () => void;
  onQuiz: () => void;
}

export default function LessonView({ topic, onPractice, onQuiz }: LessonViewProps) {
  const { t } = useI18n();
  return (
    <article className="font-serif leading-7">
      <LessonBlocks blocks={topic.learn} onQuiz={onQuiz} />
      {typeof topic.learn === 'string' && (
        <>
          <h2 className="mb-3 mt-6 font-sans text-xl font-semibold tracking-tight">
            {t('lesson.example')}
          </h2>
          <pre className="block w-full max-w-full overflow-x-auto">
            <code>{topic.code}</code>
          </pre>
        </>
      )}
      <button
        className="mt-4 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 font-sans text-sm font-semibold text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400"
        onClick={onPractice}
      >
        {t('lesson.nextPractice')}
      </button>
    </article>
  );
}
