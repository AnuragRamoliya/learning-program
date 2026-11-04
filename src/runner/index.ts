import type { CodingProblem, RunOutput } from '../data/types.js';
import { runJavaScript } from './javascriptRunner.js';

export function runCode(language: string, source: string, problem: CodingProblem): Promise<RunOutput> {
  if (language === 'javascript') return runJavaScript(source, problem);
  return Promise.reject(new Error(`Language "${language}" is not supported yet.`));
}
