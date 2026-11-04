import { Component, lazy, Suspense, type ReactNode } from 'react';

const Monaco = lazy(() => import('@monaco-editor/react'));

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

interface BoundaryProps extends EditorProps {
  children: ReactNode;
}

interface BoundaryState {
  failed: boolean;
}

function TextEditor({ value, onChange }: EditorProps) {
  return (
    <textarea
      className="min-h-64 w-full resize-y rounded-xl border border-slate-700 bg-slate-900 p-4 font-mono text-sm leading-relaxed text-indigo-100 focus-visible:outline-indigo-400"
      aria-label="JavaScript code editor"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === 'Tab') {
          event.preventDefault();
          const element = event.currentTarget;
          const start = element.selectionStart;
          const end = element.selectionEnd;
          onChange(`${element.value.slice(0, start)}  ${element.value.slice(end)}`);
          requestAnimationFrame(() => {
            element.selectionStart = element.selectionEnd = start + 2;
          });
        }
      }}
    />
  );
}

class EditorBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { failed: false };

  static getDerivedStateFromError(): BoundaryState {
    return { failed: true };
  }

  render() {
    return this.state.failed ? (
      <TextEditor value={this.props.value} onChange={this.props.onChange} />
    ) : (
      this.props.children
    );
  }
}

export default function CodeEditor({ value, onChange }: EditorProps) {
  return (
    <EditorBoundary value={value} onChange={onChange}>
      <Suspense fallback={<TextEditor value={value} onChange={onChange} />}>
        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
          <Monaco
            height="260px"
            language="javascript"
            theme={window.matchMedia('(prefers-color-scheme: dark)').matches ? 'vs-dark' : 'light'}
            value={value}
            onChange={(nextValue) => onChange(nextValue || '')}
          />
        </div>
      </Suspense>
    </EditorBoundary>
  );
}
