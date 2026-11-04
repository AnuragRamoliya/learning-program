import type { CodingProblem, RunOutput, TestResult } from '../data/types.js';

const errorLine = (error: unknown): number | undefined => {
  if (typeof error !== 'object' || error === null || !('stack' in error)) return undefined;
  const match = String(error.stack).match(/<anonymous>:(\d+):\d+/);
  return match ? Number(match[1]) : undefined;
};

export function runJavaScript(source: string, problem: CodingProblem): Promise<RunOutput> {
  return new Promise((resolve) => {
    // A disposable worker keeps an infinite loop from blocking the page.
    const workerCode = `
      const lineOf = (error) => {
        const match = String(error && error.stack || '').match(/<anonymous>:(\\d+):\\d+/);
        return match ? Number(match[1]) : undefined;
      };
      const printable = (value) => {
        if (typeof value === 'string') return value;
        try { const json = JSON.stringify(value); return json === undefined ? String(value) : json; }
        catch { return String(value); }
      };
      self.onmessage = ({data}) => {
        const {source, problem} = data;
        const logs = [];
        console.log = (...values) => logs.push(values.map(printable).join(' '));
        let fn;
        try {
          fn = new Function(source + "\\n; return " + problem.fn)();
          if (typeof fn !== 'function') throw new Error('Function "' + problem.fn + '" was not defined.');
        } catch (error) {
          const results = problem.tests.map(([input, expected]) => ({
            pass: false, got: null, expected, input, error: error.message || String(error),
            errorLine: lineOf(error), timeMs: 0
          }));
          self.postMessage({results, logs});
          return;
        }
        const results = problem.tests.map(([input, expected]) => {
          const started = performance.now();
          try {
            const cloned = JSON.parse(JSON.stringify(input));
            const got = fn(...cloned);
            return {
              pass: JSON.stringify(got) === JSON.stringify(expected), got, expected, input,
              timeMs: Math.round((performance.now() - started) * 100) / 100
            };
          } catch (error) {
            return {
              pass: false, got: null, expected, input,
              error: error.message || String(error), errorLine: lineOf(error),
              timeMs: Math.round((performance.now() - started) * 100) / 100
            };
          }
        });
        self.postMessage({results, logs});
      };
    `;
    const blobUrl = URL.createObjectURL(new Blob([workerCode], { type: 'text/javascript' }));
    const worker = new Worker(blobUrl);
    const timeout = window.setTimeout(() => {
      worker.terminate();
      URL.revokeObjectURL(blobUrl);
      resolve({
        results: problem.tests.map(([input, expected]) => ({
          pass: false,
          got: null,
          expected,
          input,
          error: 'Time limit exceeded (possible infinite loop)',
          timeMs: 2000,
        })),
        logs: [],
      });
    }, 2000);
    worker.onmessage = (event: MessageEvent<RunOutput>) => {
      window.clearTimeout(timeout);
      worker.terminate();
      URL.revokeObjectURL(blobUrl);
      resolve(event.data);
    };
    worker.onerror = (event) => {
      window.clearTimeout(timeout);
      worker.terminate();
      URL.revokeObjectURL(blobUrl);
      const results: TestResult[] = problem.tests.map(([input, expected]) => ({
        pass: false,
        got: null,
        expected,
        input,
        error: event.message,
        errorLine: errorLine(event),
        timeMs: 0,
      }));
      resolve({ results, logs: [] });
    };
    worker.postMessage({ source, problem });
  });
}
