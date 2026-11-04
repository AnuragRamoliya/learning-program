export type Language = 'en' | 'gu';
export type LocalizedText = { en: string; gu?: string };
export type LocalizedValue = string | LocalizedText;

export function tr(value: LocalizedValue, language: Language, key?: string): string {
  if (typeof value === 'string') return value;
  const translated = value[language];
  if (translated?.trim()) return translated;
  if (import.meta.env.DEV) {
    console.warn(`Missing ${language} translation for "${key ?? value.en.slice(0, 48)}"`);
  }
  return value.en;
}

export interface LessonBlock {
  type:
    | 'intro'
    | 'analogy'
    | 'heading'
    | 'text'
    | 'list'
    | 'code'
    | 'walkthrough'
    | 'trace'
    | 'callout'
    | 'table'
    | 'complexity'
    | 'visual'
    | 'rules'
    | 'practice-link';
  text?: LocalizedValue;
  title?: LocalizedValue;
  level?: 2 | 3;
  items?: Array<
    | LocalizedValue
    | { title: LocalizedValue; code: string; answer: string; reason?: LocalizedValue }
  >;
  ordered?: boolean;
  language?: string;
  code?: string;
  caption?: LocalizedValue;
  steps?: Array<{ line?: number; text: LocalizedValue }>;
  input?: string;
  columns?: LocalizedValue[];
  rows?: LocalizedValue[][];
  variant?: 'tip' | 'warning' | 'note' | 'interview';
  time?: string;
  space?: string;
  why?: LocalizedValue;
  kind?: string;
  data?: Record<string, unknown>;
}

export interface QuizQuestion {
  q: LocalizedValue;
  o: LocalizedValue[];
  a: number;
  e: LocalizedValue;
}

export type TestCase = [input: unknown[], expected: unknown];

export interface ProblemExplanation {
  idea: LocalizedValue;
  steps: LocalizedValue[];
  trace: { input: string; columns: LocalizedValue[]; rows: LocalizedValue[][] };
  complexity: { time: string; space: string; why: LocalizedValue };
  brute?: { code: string; complexity: string };
  mistakes: LocalizedValue[];
  hints: LocalizedValue[];
}

export interface CodingProblem {
  d: LocalizedValue;
  fn: string;
  tests: TestCase[];
  starters: Record<string, string>;
  solutions: Record<string, string>;
  explanation: ProblemExplanation;
}

export interface Topic {
  id: string;
  lv: LocalizedValue;
  t: LocalizedValue;
  learn: string | LessonBlock[];
  code: string;
  mcq: QuizQuestion[];
  pr?: CodingProblem;
}

export interface Course {
  id: string;
  title: LocalizedValue;
  description: LocalizedValue;
  icon: string;
  topics: Topic[];
}

export interface QuizProgress {
  answers: Array<number | null>;
  submitted: boolean;
}

export interface CodeProgress {
  source: string;
  pass: boolean;
  passed: boolean;
  attempted: boolean;
  hintsUsed: number;
  bestRunTime: number | null;
}

export interface CourseProgress {
  lastVisitedTopicId?: string;
  quiz: Record<string, QuizProgress | undefined>;
  code: Record<string, CodeProgress | undefined>;
}

export interface ProgressContextValue {
  get: (courseId: string) => CourseProgress;
  setQuiz: (courseId: string, topicId: string, quiz: QuizProgress) => void;
  setCode: (courseId: string, topicId: string, code: CodeProgress) => void;
  reset: (courseId: string) => void;
  setLastVisited: (courseId: string, topicId: string) => void;
}

export interface CourseTotals {
  earned: number;
  max: number;
  percent: number;
  complete: number;
}

export interface TestResult {
  pass: boolean;
  got: unknown;
  expected: unknown;
  input: unknown[];
  error?: string;
  errorLine?: number;
  timeMs: number;
}

export interface RunOutput {
  results: TestResult[];
  logs: string[];
}
