import assert from 'node:assert/strict';
import { Buffer } from 'node:buffer';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { fileURLToPath, URL } from 'node:url';
import { deserialize, serialize } from 'node:v8';
import ts from 'typescript';

const topicsPath = fileURLToPath(new URL('../src/data/courses/dsa/topics.ts', import.meta.url));
const topicsSource = await readFile(topicsPath, 'utf8');
const transpile = async (relativePath) => {
  const source = await readFile(fileURLToPath(new URL(relativePath, import.meta.url)), 'utf8');
  return ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
};
const dataUrl = (source) => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
const bigOLessonUrl = dataUrl(await transpile('../src/data/courses/dsa/bigoLesson.ts'));
const foundationLessonsUrl = dataUrl(
  await transpile('../src/data/courses/dsa/foundationLessons.ts'),
);
const foundationLocalizations = (
  await transpile('../src/data/courses/dsa/foundationLocalizations.ts')
).replace("from './foundationLessons.js';", `from '${foundationLessonsUrl}';`);
const foundationLocalizationsUrl = dataUrl(foundationLocalizations);
const algorithmLessonsUrl = dataUrl(await transpile('../src/data/courses/dsa/algorithmLessons.ts'));
const algorithmLocalizations = (
  await transpile('../src/data/courses/dsa/algorithmLocalizations.ts')
).replace("from './algorithmLessons.js';", `from '${algorithmLessonsUrl}';`);
const algorithmLocalizationsUrl = dataUrl(algorithmLocalizations);
const remainingLessonsUrl = dataUrl(await transpile('../src/data/courses/dsa/remainingLessons.ts'));
const remainingLocalizations = (
  await transpile('../src/data/courses/dsa/remainingLocalizations.ts')
).replace("from './remainingLessons.js';", `from '${remainingLessonsUrl}';`);
const remainingLocalizationsUrl = dataUrl(remainingLocalizations);
const compiledTopics = ts
  .transpileModule(topicsSource, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
    },
  })
  .outputText.replace("from './bigoLesson.js';", `from '${bigOLessonUrl}';`)
  .replace("from './foundationLocalizations.js';", `from '${foundationLocalizationsUrl}';`)
  .replace("from './algorithmLocalizations.js';", `from '${algorithmLocalizationsUrl}';`)
  .replace("from './remainingLocalizations.js';", `from '${remainingLocalizationsUrl}';`);
const { topics } = await import(
  `data:text/javascript;base64,${Buffer.from(compiledTopics).toString('base64')}`
);
const codingTopics = topics.filter((topic) => topic.pr);
const englishText = (value) => (typeof value === 'string' ? value : value.en);

test('DSA course contains 27 topics in the requested 25-section order', () => {
  const sectionOrder = [
    ...new Set(topics.map((topic) => (typeof topic.lv === 'string' ? topic.lv : topic.lv.en))),
  ];
  assert.equal(topics.length, 27);
  assert.equal(sectionOrder.length, 25);
  assert.deepEqual(sectionOrder, [
    'Fundamentals',
    'Maths Pattern & Recursion',
    'Array & String',
    'Searching',
    'Sorting',
    'Bit Manipulation',
    'Hashing',
    'Two-Pointer',
    'Sliding Window',
    'Prefix Sum',
    'Backtracking',
    'Linked List',
    'Stack',
    'Queue',
    'Deque',
    'Binary Tree',
    'Binary Search Tree',
    'Heap',
    'Graph',
    'Greedy',
    'Dynamic Programming',
    'Number Theory',
    'Trie',
    'String Matching',
    'Range Query',
  ]);
});

test('all 23 reference solutions pass their problem tests', async (t) => {
  assert.equal(codingTopics.length, 23);
  for (const topic of codingTopics) {
    await t.test(topic.pr.fn, () => {
      const solution = new Function(`${topic.pr.solutions.javascript}\nreturn ${topic.pr.fn};`)();
      for (const [input, expected] of topic.pr.tests) {
        const got = solution(...deserialize(serialize(input)));
        assert.deepEqual(got, expected, `${topic.pr.fn}(${JSON.stringify(input)})`);
      }
    });
  }
});

test('all coding problems have complete, non-empty explanations', async (t) => {
  for (const topic of codingTopics) {
    await t.test(topic.pr.fn, () => {
      const explanation = topic.pr.explanation;
      assert.ok(explanation, 'explanation object is missing');
      assert.ok(englishText(explanation.idea).trim(), 'idea must be non-empty');
      assert.ok(explanation.steps.length >= 3, 'at least three steps are required');
      assert.ok(explanation.steps.every((step) => englishText(step).trim()));
      assert.ok(explanation.trace.input.trim(), 'trace input must be non-empty');
      assert.ok(explanation.trace.columns.length > 0, 'trace columns are required');
      assert.ok(explanation.trace.rows.length > 0, 'trace rows are required');
      assert.ok(
        explanation.trace.rows.every(
          (row) =>
            row.length === explanation.trace.columns.length &&
            row.every((cell) => englishText(cell).trim()),
        ),
        'every trace row must have populated cells for each column',
      );
      assert.ok(explanation.complexity.time.trim());
      assert.ok(explanation.complexity.space.trim());
      assert.ok(englishText(explanation.complexity.why).trim());
      assert.ok(explanation.mistakes.length > 0);
      assert.ok(explanation.mistakes.every((mistake) => englishText(mistake).trim()));
      assert.ok(explanation.hints.length >= 3);
      assert.ok(explanation.hints.every((hint) => englishText(hint).trim()));
      if (explanation.brute) {
        assert.ok(explanation.brute.code.trim());
        assert.ok(explanation.brute.complexity.trim());
      }
    });
  }
});

test('Big-O sample lesson has bilingual blocks, required visuals, and parseable code', () => {
  const bigOLesson = topics.find((topic) => topic.id === 'bigo').learn;
  assert.ok(Array.isArray(bigOLesson));
  assert.equal(bigOLesson.filter((block) => block.type === 'complexity').length, 6);
  assert.ok(bigOLesson.some((block) => block.type === 'visual' && block.kind === 'growth-chart'));
  assert.ok(bigOLesson.some((block) => block.type === 'visual' && block.kind === 'binary-search'));
  const rules = bigOLesson.find((block) => block.type === 'rules');
  assert.equal(rules.items.length, 5);
  for (const block of bigOLesson) {
    for (const value of [block.text, block.title, block.caption, block.why]) {
      if (value && typeof value === 'object') {
        assert.ok(value.en?.trim(), 'bilingual field must have English text');
        assert.ok(value.gu?.trim(), 'bilingual field must have Gujarati text');
      }
    }
    if (block.type === 'code') {
      assert.doesNotThrow(() => new Function(block.code));
      assert.doesNotMatch(block.code, /[\u0A80-\u0AFF]/, 'code blocks must not contain Gujarati');
    }
  }
  const mergeSortBlock = bigOLesson.find(
    (block) => block.type === 'code' && block.caption.en === 'A small runnable Merge Sort',
  );
  const mergeSort = new Function(
    `${mergeSortBlock.code.replace(/\n\nmergeSort\(\[4, 1, 3, 2\]\);$/, '')}\nreturn mergeSort;`,
  )();
  assert.deepEqual(mergeSort([4, 1, 3, 2]), [1, 2, 3, 4]);
});

test('all 27 topics have bilingual structured lessons and practice content', () => {
  const foundationIds = [
    'bigo',
    'rec',
    'maths',
    'arr',
    'str',
    'bs',
    'sort',
    'bit',
    'hash',
    'two',
    'win',
    'pre',
    'back',
    'll',
    'sq',
    'queue',
    'deque',
    'tree',
    'bst',
    'heap',
    'graph',
    'greedy',
    'dp',
    'nt',
    'trie',
    'sm',
    'rq',
  ];
  const assertLocalized = (value, path) => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => assertLocalized(item, `${path}[${index}]`));
      return;
    }
    if (value && typeof value === 'object') {
      if ('en' in value) {
        assert.ok(value.en?.trim(), `${path} needs English text`);
        assert.ok(value.gu?.trim(), `${path} needs Gujarati text`);
        return;
      }
      for (const [key, nestedValue] of Object.entries(value)) {
        assertLocalized(nestedValue, `${path}.${key}`);
      }
    }
  };

  for (const id of foundationIds) {
    const topic = topics.find((item) => item.id === id);
    assert.ok(Array.isArray(topic.learn), `${id} must use structured lesson blocks`);
    assert.ok(topic.learn.length >= 10, `${id} lesson is too short`);
    for (const block of topic.learn) {
      if (block.type === 'code') assert.doesNotThrow(() => new Function(block.code));
    }
    const localizedContent = {
      section: topic.lv,
      title: topic.t,
      learn: topic.learn,
      quiz: topic.mcq,
      ...(topic.pr ? { practice: topic.pr.d, explanation: topic.pr.explanation } : {}),
    };
    assertLocalized(localizedContent, id);
  }
});
