import { useEffect, useState } from 'react';
import type { QuizProgress, Topic } from '../data/types.js';
import { tr } from '../data/types.js';
import { useI18n } from '../i18n/useI18n.js';

interface QuizViewProps {
  topic: Topic;
  record: QuizProgress | undefined;
  onSubmit: (answers: number[]) => void;
  onDraft: (answers: (number | undefined)[]) => void;
  onRetake: () => void;
}

const buttonBase =
  'w-full rounded-lg border px-3 py-2.5 text-left transition-colors disabled:cursor-default';

export default function QuizView({ topic, record, onSubmit, onDraft, onRetake }: QuizViewProps) {
  const { language, t } = useI18n();
  const [answers, setAnswers] = useState<(number | undefined)[]>([]);
  const submitted = !!record?.submitted;

  useEffect(() => {
    setAnswers(
      (record?.answers || []).map((answer) => (typeof answer === 'number' ? answer : undefined)),
    );
  }, [record, topic.id]);

  function choose(questionIndex: number, answerIndex: number) {
    setAnswers((current) => {
      const next = [...current];
      next[questionIndex] = answerIndex;
      onDraft(next);
      return next;
    });
  }

  function submit() {
    if (!topic.mcq.every((_, index) => typeof answers[index] === 'number')) {
      window.alert(t('quiz.answerEveryQuestion'));
      return;
    }
    onSubmit(answers as number[]);
  }

  return (
    <section className="grid gap-4">
      {topic.mcq.map((question, questionIndex) => (
        <article
          className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
          key={questionIndex}
        >
          <h3 className="mb-3 font-semibold">
            {questionIndex + 1}. {tr(question.q, language)}
          </h3>
          <div className="grid gap-2">
            {question.o.map((option, optionIndex) => {
              const correct = submitted && optionIndex === question.a;
              const incorrect =
                submitted && answers[questionIndex] === optionIndex && optionIndex !== question.a;
              const selected = !submitted && answers[questionIndex] === optionIndex;
              return (
                <button
                  key={optionIndex}
                  className={`${buttonBase} ${correct ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200' : ''} ${incorrect ? 'border-rose-500 bg-rose-50 text-rose-800 dark:bg-rose-950 dark:text-rose-200' : ''} ${selected ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950' : ''} ${!correct && !incorrect && !selected ? 'border-slate-200 bg-white hover:border-indigo-400 dark:border-slate-700 dark:bg-slate-900' : ''}`}
                  disabled={submitted}
                  onClick={() => choose(questionIndex, optionIndex)}
                >
                  {tr(option, language)}
                </button>
              );
            })}
          </div>
          {submitted && (
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              {answers[questionIndex] === question.a
                ? `${t('quiz.correct')} `
                : `${t('quiz.notQuite')} `}
              {tr(question.e, language)}
            </p>
          )}
        </article>
      ))}
      {submitted ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <b>
            {t('quiz.score')}:{' '}
            {answers.reduce<number>(
              (score, answer, index) => score + (answer === topic.mcq[index].a ? 1 : 0),
              0,
            )}{' '}
            / {topic.mcq.length}
          </b>
          <button
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:border-indigo-500 dark:border-slate-700"
            onClick={onRetake}
          >
            {t('quiz.retake')}
          </button>
        </div>
      ) : (
        <button
          className="w-fit rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 dark:bg-indigo-500"
          onClick={submit}
        >
          {t('quiz.submit')}
        </button>
      )}
    </section>
  );
}
