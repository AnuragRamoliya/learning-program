import type { LessonBlock, LocalizedValue } from '../data/types.js';
import { tr } from '../data/types.js';
import { useI18n } from '../i18n/useI18n.js';

function HighlightedCode({ code }: { code: string }) {
  const tokens = code.split(
    /(\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b(?:const|let|var|function|return|if|else|for|while|new|true|false|null|throw)\b|\b\d+(?:\.\d+)?\b)/g,
  );
  return (
    <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm leading-6 text-slate-100">
      <code className="language-javascript">
        {tokens.map((token, index) => {
          const color = token.startsWith('//')
            ? 'text-slate-400'
            : /^["'`]/.test(token)
              ? 'text-emerald-300'
              : /^(const|let|var|function|return|if|else|for|while|new|throw)$/.test(token)
                ? 'text-violet-300'
                : /^\d/.test(token)
                  ? 'text-amber-300'
                  : '';
          return (
            <span className={color} key={index}>
              {token}
            </span>
          );
        })}
      </code>
    </pre>
  );
}

function GrowthChart() {
  const { t } = useI18n();
  const lines = [
    { label: 'O(1)', color: '#10b981', values: [18, 18, 18, 18, 18, 18] },
    { label: 'O(log n)', color: '#6366f1', values: [32, 27, 24, 21, 19, 17] },
    { label: 'O(n)', color: '#0ea5e9', values: [38, 35, 31, 26, 21, 14] },
    { label: 'O(n log n)', color: '#f59e0b', values: [42, 37, 31, 24, 17, 8] },
    { label: 'O(n²)', color: '#ef4444', values: [44, 42, 37, 29, 17, 2] },
  ];
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
      <svg
        viewBox="0 0 560 220"
        role="img"
        aria-label={`${t('visual.operations')} growth chart: O(1), O(log n), O(n), O(n log n), O(n²)`}
        className="w-full"
      >
        <path d="M45 15V180H535" fill="none" stroke="currentColor" opacity=".35" />
        {[0, 1, 2, 3].map((line) => (
          <path d={`M45 ${30 + line * 38}H535`} stroke="currentColor" opacity=".12" key={line} />
        ))}
        {lines.map((line) => (
          <g key={line.label}>
            <polyline
              points={line.values
                .map((value, index) => `${50 + index * 92},${value * 3.3}`)
                .join(' ')}
              fill="none"
              stroke={line.color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x="0"
              y={line.values.at(-1)! * 3.3 + 4}
              fill={line.color}
              fontSize="12"
              fontFamily="system-ui"
            >
              {line.label}
            </text>
          </g>
        ))}
        <text x="270" y="207" fill="currentColor" fontSize="12" fontFamily="system-ui">
          {t('visual.inputSize')} →
        </text>
        <text
          x="12"
          y="110"
          fill="currentColor"
          fontSize="12"
          fontFamily="system-ui"
          transform="rotate(-90 12 110)"
        >
          {t('visual.operations')}
        </text>
      </svg>
    </div>
  );
}

function BinarySearchVisual({ data }: { data: Record<string, unknown> }) {
  const { t } = useI18n();
  const values = Array.isArray(data.arr) ? data.arr : [];
  const target = data.target;
  const steps: Array<{ left: number; mid: number; right: number }> = [];
  let left = 0;
  let right = values.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    steps.push({ left, mid, right });
    if (values[mid] === target) break;
    if (values[mid] < (target as number)) left = mid + 1;
    else right = mid - 1;
  }
  return (
    <div
      className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
      role="img"
      aria-label={`Binary search steps: find ${String(target)} in ${values.join(', ')}`}
    >
      {steps.map((step, stepIndex) => (
        <div className="flex flex-wrap items-end gap-1.5" key={stepIndex}>
          <span className="w-16 shrink-0 pb-2 text-xs font-semibold text-slate-500">
            {t('visual.step')} {stepIndex + 1}
          </span>
          {values.map((value, index) => {
            const role =
              index === step.mid
                ? 'mid'
                : index === step.left
                  ? 'low'
                  : index === step.right
                    ? 'high'
                    : '';
            const active = index >= step.left && index <= step.right;
            return (
              <div className="text-center" key={index}>
                <div
                  className={`grid size-9 place-items-center rounded-lg border font-mono text-xs ${index === step.mid ? 'border-indigo-600 bg-indigo-600 font-bold text-white' : active ? 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800' : 'border-slate-100 bg-slate-50 text-slate-400 dark:border-slate-800 dark:bg-slate-950'}`}
                >
                  {String(value)}
                </div>
                <span className="text-[0.65rem] text-slate-500">{role || index}</span>
              </div>
            );
          })}
          <span className="pb-2 text-xs text-slate-500">
            low={step.left}, mid={step.mid}, high={step.right}
          </span>
        </div>
      ))}
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Target: <b>{String(target)}</b>
      </p>
    </div>
  );
}

interface LessonBlocksProps {
  blocks: string | LessonBlock[];
  onQuiz: () => void;
}

export default function LessonBlocks({ blocks, onQuiz }: LessonBlocksProps) {
  const { language, t } = useI18n();
  if (typeof blocks === 'string') {
    return (
      <div
        className="mb-5 max-w-full overflow-x-auto overscroll-x-contain rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 [&_p]:mb-4 [&_ul]:my-3 [&_li]:my-1 [&_table]:my-4 [&_table]:min-w-[36rem] [&_table]:border-collapse [&_th]:whitespace-nowrap [&_th]:border [&_th]:border-slate-300 [&_th]:bg-slate-100 [&_th]:p-2 [&_th]:text-left [&_td]:whitespace-nowrap [&_td]:border [&_td]:border-slate-300 [&_td]:p-2 dark:[&_th]:border-slate-700 dark:[&_th]:bg-slate-800 dark:[&_td]:border-slate-700 [&_.tip]:my-4 [&_.tip]:rounded-r-lg [&_.tip]:border-l-4 [&_.tip]:border-indigo-500 [&_.tip]:bg-indigo-50 [&_.tip]:px-4 [&_.tip]:py-3 dark:[&_.tip]:bg-indigo-950"
        dangerouslySetInnerHTML={{ __html: blocks }}
      />
    );
  }

  return (
    <div className="grid gap-4">
      {blocks.map((block, index) => {
        const text = block.text ? tr(block.text, language) : '';
        if (block.type === 'intro') {
          return (
            <p
              className="rounded-xl border-l-4 border-indigo-500 bg-indigo-50 p-4 text-base leading-7 dark:bg-indigo-950"
              key={index}
            >
              {text}
            </p>
          );
        }
        if (block.type === 'analogy') {
          return (
            <aside
              className="rounded-xl bg-slate-100 p-4 text-sm leading-6 dark:bg-slate-800"
              key={index}
            >
              <b>💡</b> {text}
            </aside>
          );
        }
        if (block.type === 'heading') {
          const Heading = block.level === 3 ? 'h3' : 'h2';
          return (
            <Heading className="pt-2 text-xl font-bold tracking-tight" key={index}>
              {text}
            </Heading>
          );
        }
        if (block.type === 'text') {
          return (
            <p className="leading-7" key={index}>
              {text}
            </p>
          );
        }
        if (block.type === 'list') {
          const List = block.ordered ? 'ol' : 'ul';
          return (
            <List
              className={`${block.ordered ? 'list-decimal' : 'list-disc'} space-y-1 pl-6 leading-7`}
              key={index}
            >
              {block.items?.map((item, itemIndex) => (
                <li key={itemIndex}>{tr(item as LocalizedValue, language)}</li>
              ))}
            </List>
          );
        }
        if (block.type === 'code') {
          return (
            <div className="grid gap-2" key={index}>
              {block.caption && (
                <p className="text-sm font-semibold">{tr(block.caption, language)}</p>
              )}
              <HighlightedCode code={block.code ?? ''} />
            </div>
          );
        }
        if (block.type === 'walkthrough') {
          return (
            <section
              className="rounded-xl border border-slate-200 p-4 dark:border-slate-700"
              key={index}
            >
              <h3 className="mb-3 font-semibold">
                {block.title ? tr(block.title, language) : t('blocks.whatHappens')}
              </h3>
              <ol className="grid gap-2">
                {block.steps?.map((step, stepIndex) => (
                  <li className="grid grid-cols-[auto_1fr] gap-3 text-sm leading-6" key={stepIndex}>
                    {step.line && (
                      <code className="rounded bg-slate-100 px-2 py-0.5 dark:bg-slate-800">
                        L{step.line}
                      </code>
                    )}
                    <span>{tr(step.text, language)}</span>
                  </li>
                ))}
              </ol>
            </section>
          );
        }
        if (block.type === 'trace' || block.type === 'table') {
          const columns = block.columns ?? [];
          const rows = block.rows ?? [];
          return (
            <div
              className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700"
              key={index}
            >
              {block.input && <p className="p-3 font-mono text-xs">{block.input}</p>}
              <table className="w-full min-w-max border-collapse text-left text-sm">
                <thead className="bg-slate-100 dark:bg-slate-800">
                  <tr>
                    {columns.map((column, columnIndex) => (
                      <th
                        className="border-b border-slate-200 px-3 py-2 dark:border-slate-700"
                        key={columnIndex}
                      >
                        {tr(column, language)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr className="even:bg-slate-50 dark:even:bg-slate-800/40" key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td
                          className="border-t border-slate-100 px-3 py-2 dark:border-slate-800"
                          key={cellIndex}
                        >
                          {tr(cell, language)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        if (block.type === 'complexity') {
          return (
            <div
              className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/40"
              key={index}
            >
              <div className="flex flex-wrap gap-2 text-sm font-bold">
                <span className="rounded-full bg-emerald-200 px-3 py-1 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100">
                  {t('blocks.time')}: {block.time}
                </span>
                <span className="rounded-full bg-sky-200 px-3 py-1 text-sky-900 dark:bg-sky-900 dark:text-sky-100">
                  {t('blocks.space')}: {block.space}
                </span>
              </div>
              {block.why && <p className="mt-2 text-sm leading-6">{tr(block.why, language)}</p>}
            </div>
          );
        }
        if (block.type === 'visual') {
          if (block.kind === 'growth-chart') return <GrowthChart key={index} />;
          if (block.kind === 'binary-search')
            return <BinarySearchVisual data={block.data ?? {}} key={index} />;
          return null;
        }
        if (block.type === 'rules') {
          return (
            <div className="grid gap-3" key={index}>
              {(block.items ?? []).map((item, itemIndex) => {
                if (typeof item === 'string' || !('title' in item)) {
                  return <p key={itemIndex}>{tr(item as LocalizedValue, language)}</p>;
                }
                return (
                  <article
                    className="rounded-xl border border-slate-200 p-4 dark:border-slate-700"
                    key={itemIndex}
                  >
                    <h3 className="font-semibold">{tr(item.title, language)}</h3>
                    <pre className="my-2 overflow-x-auto rounded-lg bg-slate-950 p-3 text-xs text-slate-100">
                      <code>{item.code}</code>
                    </pre>
                    <p className="text-sm">
                      {t('blocks.answer')}: <code>{item.answer}</code>
                    </p>
                    {item.reason && <p className="mt-1 text-sm">{tr(item.reason, language)}</p>}
                  </article>
                );
              })}
            </div>
          );
        }
        if (block.type === 'callout') {
          const style =
            block.variant === 'warning'
              ? 'border-amber-500 bg-amber-50 dark:bg-amber-950'
              : block.variant === 'interview'
                ? 'border-violet-500 bg-violet-50 dark:bg-violet-950'
                : 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950';
          return (
            <aside className={`rounded-r-xl border-l-4 p-4 text-sm leading-6 ${style}`} key={index}>
              {text}
            </aside>
          );
        }
        if (block.type === 'practice-link') {
          return (
            <button
              className="w-fit rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 dark:bg-indigo-500"
              key={index}
              onClick={onQuiz}
            >
              {text || t('blocks.testYourself')}
            </button>
          );
        }
        return null;
      })}
    </div>
  );
}
