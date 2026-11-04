import type { CourseTotals } from '../data/types.js';

export default function ScoreCard({ percent, earned, max }: CourseTotals) {
  return (
    <div className="grid min-w-32 justify-items-center text-xs text-slate-500 dark:text-slate-400">
      <strong className="text-5xl font-bold leading-none tracking-tight text-indigo-600 dark:text-indigo-400">
        {percent}%
      </strong>
      <span className="mt-2">
        {earned} / {max} points earned
      </span>
    </div>
  );
}
