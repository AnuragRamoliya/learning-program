# Learning Program

A frontend only employee learning platform built with React 18, TypeScript, Vite, React Router v6, and Tailwind CSS. Course progress, quiz answers, code submissions, and the English/Gujarati language choice are stored in localStorage. The language switcher is available on the home page and in the course navigation.

## Run it

```sh
npm install
npm run dev
```

Create a production build with `npm run build`; preview it with `npm run preview`. `npm run typecheck` checks TypeScript, `npm run lint` runs ESLint, and `npm run format` formats the project with Prettier (`npm run format:check` checks formatting).

Run `npm run test:explanations` to validate all DSA reference solutions and their explanation data.

## Project structure

- `src/data/courses/`: course registry and course content; DSA has all 27 original topics in `dsa/topics.ts`.
- `src/pages/`: catalog, course shell, lesson tabs, and course result page.
- `src/components/`: sidebar, progress, quiz, editor, and test result UI.
- `src/hooks/useProgress.tsx`: course keyed localStorage state and score calculations.
- `src/runner/`: language dispatch and isolated JavaScript Web Worker runner.
- `src/styles/global.css`: Tailwind CSS import; UI styling uses Tailwind utilities.

## Add a course

1. Create `src/data/courses/python/topics.ts` and export `topics: Topic[]`, using the interfaces in `src/data/types.ts` and the same topic shape as DSA. A topic needs `id`, `lv`, `t`, `learn`, `code`, and `mcq`. Practice is optional; when present use `starters` and `solutions` maps keyed by language, plus language neutral `tests` and a function name `fn`.
2. Import the topic list in `src/data/courses/index.ts` and add a record to `courses` with a unique `id`, `title`, `description`, `icon`, and `topics`.
3. Add the course title to `comingSoon` only while it is not registered. The catalog and course routes read registered courses automatically.

Lesson and practice HTML fields are rendered as trusted course content. Keep that content authored and reviewed with the course data.
