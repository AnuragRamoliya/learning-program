interface ProgressBarProps {
  value: number;
}

export default function ProgressBar({ value }: ProgressBarProps) {
  const progress = Math.min(100, Math.max(0, value));

  return (
    <div
      className="mt-3 h-2 w-full min-w-0 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span
        className="block h-full rounded-full bg-indigo-600 transition-[width] dark:bg-indigo-400"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
