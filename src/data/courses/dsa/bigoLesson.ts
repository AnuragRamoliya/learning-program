import type { LessonBlock, LocalizedText } from '../../types.js';

const b = (en: string, gu: string): LocalizedText => ({ en, gu });

export const bigOLesson: LessonBlock[] = [
  {
    type: 'intro',
    text: b(
      'Big-O tells us how efficient our code is. As the input grows, how much time or memory does it need? It has two parts: Time Complexity (how long code takes) and Space Complexity (how much extra memory it uses). We use Big-O to compare approaches without depending on a particular computer.',
      'Big-O આપણને જણાવે છે કે આપણો code કેટલો efficient છે અને input data વધે ત્યારે code ને execute કરવામાં કેટલો સમય અથવા memory લાગી શકે છે. તેને આપણે બે ભાગમાં સમજીએ: Time Complexity (code execute થવામાં કેટલો સમય લાગે છે) અને Space Complexity (code execute થતી વખતે કેટલી વધારાની memory વપરાય છે). અલગ computers પર આધાર રાખ્યા વગર approaches સરખાવવા માટે આપણે Big-O વાપરીએ છીએ.',
    ),
  },
  {
    type: 'analogy',
    text: b(
      'Finding a name in a phone book: reading every page is O(n); opening the middle and halving the search each time is O(log n); knowing the exact page number is O(1).',
      'Phone book માં નામ શોધવાનું વિચારો: દરેક page વાંચવો તે O(n); વચ્ચેથી ખોલીને દરેક વખતે શોધનો ભાગ અડધો કરવો તે O(log n); ચોક્કસ page number પહેલેથી ખબર હોય તો O(1).',
    ),
  },
  {
    type: 'heading',
    level: 2,
    text: b('1. O(1) — Constant Time', '1. O(1) — Constant Time'),
  },
  {
    type: 'text',
    text: b(
      'The number of operations stays fixed as the input grows. Reading an array item by its index is a common example.',
      'Input મોટો થાય છતાં operations ની સંખ્યા નિશ્ચિત રહે છે. Array માં index પરથી item વાંચવો તેનું સામાન્ય example છે.',
    ),
  },
  {
    type: 'code',
    language: 'javascript',
    caption: b('Read the first item directly', 'પહેલો item સીધો વાંચો'),
    code: 'function getFirstElement(arr) {\n  return arr[0];\n}\n\ngetFirstElement([10, 20, 30, 40, 50]);',
  },
  {
    type: 'walkthrough',
    title: b('What happens here', 'અહીં શું થાય છે'),
    steps: [
      {
        line: 1,
        text: b(
          'The function receives an array of any length.',
          'Function કોઈ પણ length નો array મેળવે છે.',
        ),
      },
      {
        line: 2,
        text: b(
          'It reads only arr[0]; it does not scan the remaining items.',
          'તે ફક્ત arr[0] વાંચે છે; બાકીના items scan કરતું નથી.',
        ),
      },
      {
        line: 5,
        text: b(
          'The example returns 10, with one direct lookup.',
          'Example માં એક સીધી lookup થી 10 મળે છે.',
        ),
      },
    ],
  },
  {
    type: 'table',
    columns: [b('Items', 'Items'), b('Operations', 'Operations')],
    rows: [
      ['5', '1'],
      ['100', '1'],
      ['1000', '1'],
      ['10000', '1'],
    ],
  },
  {
    type: 'complexity',
    time: 'O(1)',
    space: 'O(1)',
    why: b(
      'One fixed array lookup is done for every input size.',
      'દરેક input size માટે એક જ array lookup થાય છે.',
    ),
  },
  {
    type: 'heading',
    level: 2,
    text: b('2. O(log n) — Logarithmic Time', '2. O(log n) — Logarithmic Time'),
  },
  {
    type: 'text',
    text: b(
      'When one step removes about half of the remaining choices, the number of steps grows logarithmically. Binary Search uses this idea and requires a sorted array.',
      'એક step માં બાકી રહેલી શક્યતાઓમાંથી લગભગ અડધી દૂર થાય ત્યારે steps ની સંખ્યા logarithmic રીતે વધે છે. Binary Search આ વિચાર વાપરે છે અને તેના માટે sorted array જરૂરી છે.',
    ),
  },
  {
    type: 'visual',
    kind: 'binary-search',
    data: { arr: [10, 20, 30, 40, 50, 60, 70, 80], target: 70 },
  },
  {
    type: 'code',
    language: 'javascript',
    caption: b('Binary Search on a sorted array', 'Sorted array માં Binary Search'),
    code: 'function binarySearch(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}',
  },
  {
    type: 'walkthrough',
    title: b('What happens here', 'અહીં શું થાય છે'),
    steps: [
      {
        line: 2,
        text: b('left starts at the first valid index.', 'left શરૂઆતના valid index પર શરૂ થાય છે.'),
      },
      {
        line: 3,
        text: b(
          'right starts at the last valid index.',
          'right છેલ્લાં valid index પર શરૂ થાય છે.',
        ),
      },
      {
        line: 4,
        text: b(
          'Continue while the search range still contains an item.',
          'Search range માં item બાકી હોય ત્યાં સુધી આગળ વધો.',
        ),
      },
      {
        line: 5,
        text: b(
          'Check the middle item of the current range.',
          'હાલના range નો વચ્ચેનો item તપાસો.',
        ),
      },
      {
        line: 7,
        text: b(
          'If the middle is too small, discard the left half.',
          'વચ્ચેનો item નાનો હોય તો ડાબો અડધો ભાગ દૂર કરો.',
        ),
      },
      { line: 8, text: b('Otherwise discard the right half.', 'નહીં તો જમણો અડધો ભાગ દૂર કરો.') },
      {
        line: 10,
        text: b(
          'Return -1 when the target is not in the array.',
          'Target array માં ન હોય તો -1 આપો.',
        ),
      },
    ],
  },
  {
    type: 'trace',
    input: 'binarySearch([10,20,30,40,50,60,70,80], 70)',
    columns: ['left', 'right', 'mid', 'arr[mid]', b('Action', 'કામ')],
    rows: [
      ['0', '7', '3', '40', b('40 < 70, left = 4', '40 < 70, left = 4')],
      ['4', '7', '5', '60', b('60 < 70, left = 6', '60 < 70, left = 6')],
      ['6', '7', '6', '70', b('Found, return 6', 'મળી ગયું, 6 return કરો')],
    ],
  },
  {
    type: 'complexity',
    time: 'O(log n)',
    space: 'O(1)',
    why: b(
      'Each check discards half the remaining array, using only a few variables.',
      'દરેક check માં બાકી array નો અડધો ભાગ દૂર થાય છે અને થોડા variables જ વપરાય છે.',
    ),
  },
  {
    type: 'heading',
    level: 2,
    text: b('3. O(n) — Linear Time', '3. O(n) — Linear Time'),
  },
  {
    type: 'text',
    text: b(
      'A single pass over n items is O(n). If the input doubles, the amount of work roughly doubles too.',
      'n items પર એક વાર pass કરવો O(n) છે. Input બમણો થાય તો કામ પણ લગભગ બમણું થાય છે.',
    ),
  },
  {
    type: 'code',
    language: 'javascript',
    caption: b('Print each item once', 'દરેક item એક વાર print કરો'),
    code: 'function printElements(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    console.log(arr[i]);\n  }\n}\n\nprintElements([4, 7, 9]);',
  },
  {
    type: 'walkthrough',
    title: b('What happens here', 'અહીં શું થાય છે'),
    steps: [
      { line: 1, text: b('The function receives the array.', 'Function array મેળવે છે.') },
      {
        line: 2,
        text: b(
          'The index moves from 0 to the last item.',
          'Index 0 થી છેલ્લાં item સુધી આગળ વધે છે.',
        ),
      },
      {
        line: 3,
        text: b(
          'Each loop iteration reads and prints one item.',
          'દરેક loop iteration એક item વાંચે અને print કરે છે.',
        ),
      },
    ],
  },
  {
    type: 'trace',
    input: 'printElements([4,7,9])',
    columns: ['i', b('Read', 'વાંચ્યું'), b('Output so far', 'અત્યાર સુધીનું output')],
    rows: [
      ['0', '4', '4'],
      ['1', '7', '4, 7'],
      ['2', '9', '4, 7, 9'],
    ],
  },
  {
    type: 'complexity',
    time: 'O(n)',
    space: 'O(1)',
    why: b(
      'The loop visits each of n items once and uses a fixed amount of extra memory.',
      'Loop n items માંથી દરેકને એક વાર જુએ છે અને વધારાની memory નિશ્ચિત રહે છે.',
    ),
  },
  {
    type: 'heading',
    level: 2,
    text: b('4. O(n log n) — Linearithmic Time', '4. O(n log n) — Linearithmic Time'),
  },
  {
    type: 'text',
    text: b(
      'Efficient comparison sorting often takes O(n log n). Merge Sort repeatedly splits the input and then combines sorted halves.',
      'Efficient comparison sorting માં ઘણીવાર O(n log n) સમય લાગે છે. Merge Sort input ને વારંવાર વહેંચે છે અને પછી sorted halves ને જોડે છે.',
    ),
  },
  {
    type: 'code',
    language: 'javascript',
    caption: b('A small runnable Merge Sort', 'નાનું અને ચલાવી શકાય એવું Merge Sort'),
    code: 'function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  const merged = [];\n  let i = 0;\n  let j = 0;\n  while (i < left.length && j < right.length) {\n    merged.push(left[i] <= right[j] ? left[i++] : right[j++]);\n  }\n  return merged.concat(left.slice(i), right.slice(j));\n}\n\nmergeSort([4, 1, 3, 2]);',
  },
  {
    type: 'walkthrough',
    title: b('What happens here', 'અહીં શું થાય છે'),
    steps: [
      {
        line: 2,
        text: b(
          'An array with at most one item is already sorted.',
          'એક કે ઓછા items વાળો array પહેલેથી sorted છે.',
        ),
      },
      {
        line: 3,
        text: b('Find the middle so the array can be split.', 'Array ને વહેંચવા middle શોધો.'),
      },
      {
        line: 4,
        text: b('Sort the left half recursively.', 'ડાબા half ને recursive રીતે sort કરો.'),
      },
      {
        line: 5,
        text: b('Sort the right half recursively.', 'જમણા half ને recursive રીતે sort કરો.'),
      },
      {
        line: 7,
        text: b(
          'Use one pointer for each sorted half and create an output array.',
          'દરેક sorted half માટે pointer રાખો અને output array બનાવો.',
        ),
      },
      {
        line: 10,
        text: b(
          'Compare the next unused items and append the smaller one.',
          'આગળના બાકી items સરખાવી નાનો item ઉમેરો.',
        ),
      },
      {
        line: 13,
        text: b(
          'Join the unprocessed tails; each tail is already sorted.',
          'બાકી રહેલા ભાગો પહેલેથી sorted છે, તેમને અંતે જોડો.',
        ),
      },
    ],
  },
  {
    type: 'trace',
    input: 'mergeSort([4,1,3,2])',
    columns: [
      b('Stage', 'તબક્કો'),
      b('Left half', 'ડાબો ભાગ'),
      b('Right half', 'જમણો ભાગ'),
      b('Merged result', 'જોડેલું પરિણામ'),
    ],
    rows: [
      [b('Split', 'વહેંચો'), '[4,1]', '[3,2]', '—'],
      [b('Sort halves', 'ભાગો sort કરો'), '[1,4]', '[2,3]', '—'],
      [b('Merge', 'જોડો'), '[1,4]', '[2,3]', '[1,2,3,4]'],
    ],
  },
  {
    type: 'complexity',
    time: 'O(n log n)',
    space: 'O(n)',
    why: b(
      'There are about log n split levels, and merging across each level processes n items.',
      'લગભગ log n split levels છે અને દરેક level પર merge કરવા n items process થાય છે.',
    ),
  },
  {
    type: 'heading',
    level: 2,
    text: b('5. O(n²) — Quadratic Time', '5. O(n²) — Quadratic Time'),
  },
  {
    type: 'text',
    text: b(
      'A loop inside another loop over the same n items often creates n × n work. It may be fine for small inputs but grows quickly.',
      'એક જ n items પર એક loop ની અંદર બીજો loop હોય તો ઘણીવાર n × n કામ થાય છે. નાના input માટે ચાલે, પણ ઝડપથી વધે છે.',
    ),
  },
  {
    type: 'code',
    language: 'javascript',
    caption: b('Print every ordered pair', 'દરેક ordered pair print કરો'),
    code: 'function printPairs(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length; j++) {\n      console.log(arr[i], arr[j]);\n    }\n  }\n}\n\nprintPairs([1, 2]);',
  },
  {
    type: 'walkthrough',
    title: b('What happens here', 'અહીં શું થાય છે'),
    steps: [
      {
        line: 2,
        text: b(
          'The outer loop selects each first item.',
          'Outer loop દરેક પહેલો item પસંદ કરે છે.',
        ),
      },
      {
        line: 3,
        text: b(
          'For every outer item, the inner loop visits all items again.',
          'દરેક outer item માટે inner loop બધા items ફરી જુએ છે.',
        ),
      },
      {
        line: 4,
        text: b(
          'This prints n pairs for each of n outer choices.',
          'n outer choices માંથી દરેક માટે n pairs print થાય છે.',
        ),
      },
    ],
  },
  {
    type: 'trace',
    input: 'printPairs([1,2])',
    columns: ['i', 'j', b('Pair', 'જોડી')],
    rows: [
      ['0', '0', '(1, 1)'],
      ['0', '1', '(1, 2)'],
      ['1', '0', '(2, 1)'],
      ['1', '1', '(2, 2)'],
    ],
  },
  {
    type: 'complexity',
    time: 'O(n²)',
    space: 'O(1)',
    why: b(
      'The inner loop runs n times for each of n outer-loop iterations.',
      'n outer-loop iterations માંથી દરેક વખતે inner loop n વાર ચાલે છે.',
    ),
  },
  {
    type: 'heading',
    level: 2,
    text: b('6. O(2ⁿ) — Exponential Time', '6. O(2ⁿ) — Exponential Time'),
  },
  {
    type: 'text',
    text: b(
      'An algorithm can become exponential when each call branches into two more calls. Naive recursive Fibonacci repeats the same work many times.',
      'દરેક function call માંથી બે નવા calls નીકળે ત્યારે algorithm exponential બની શકે છે. Naive recursive Fibonacci માં એકસરખું કામ ઘણી વાર ફરી થાય છે.',
    ),
  },
  {
    type: 'code',
    language: 'javascript',
    caption: b('Naive recursive Fibonacci', 'Naive recursive Fibonacci'),
    code: 'function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nfibonacci(4);',
  },
  {
    type: 'walkthrough',
    title: b('What happens here', 'અહીં શું થાય છે'),
    steps: [
      {
        line: 2,
        text: b('The base case returns n for 0 or 1.', '0 અથવા 1 માટે base case n return કરે છે.'),
      },
      {
        line: 3,
        text: b(
          'Each larger n starts two smaller recursive calls.',
          'મોટા n માટે બે નાના recursive calls શરૂ થાય છે.',
        ),
      },
      {
        line: 4,
        text: b(
          'Their results are added, but overlapping calls repeat work.',
          'બંનેના results ઉમેરાય છે, પરંતુ એકસરખા calls ફરી કામ કરે છે.',
        ),
      },
    ],
  },
  {
    type: 'trace',
    input: 'fibonacci(4)',
    columns: [b('Call', 'Call'), b('Calls made', 'કરેલા calls'), b('Result', 'પરિણામ')],
    rows: [
      ['fib(4)', 'fib(3) + fib(2)', '3'],
      ['fib(3)', 'fib(2) + fib(1)', '2'],
      ['fib(2)', 'fib(1) + fib(0)', '1'],
      [b('Repeated work', 'ફરી થયેલું કામ'), 'fib(2) is calculated twice', 'extra calls'],
    ],
  },
  {
    type: 'complexity',
    time: 'O(2ⁿ)',
    space: 'O(n)',
    why: b(
      'Each call can branch twice; the deepest call chain uses n stack frames.',
      'દરેક call માંથી બે branches નીકળી શકે છે; સૌથી ઊંડી chain માં n stack frames રહે છે.',
    ),
  },
  {
    type: 'heading',
    level: 2,
    text: b('Big-O comparison', 'Big-O ની સરખામણી'),
  },
  {
    type: 'table',
    columns: [
      b('Complexity', 'Complexity'),
      b('Name', 'નામ'),
      b('Typical example', 'સામાન્ય example'),
      b('Growth', 'વધારો'),
    ],
    rows: [
      ['O(1)', b('Constant', 'નિશ્ચિત'), 'Array index lookup', b('Excellent', 'ખૂબ સારું')],
      ['O(log n)', b('Logarithmic', 'Logarithmic'), 'Binary Search', b('Excellent', 'ખૂબ સારું')],
      ['O(n)', b('Linear', 'Linear'), 'One loop', b('Good', 'સારું')],
      ['O(n log n)', b('Linearithmic', 'Linearithmic'), 'Merge Sort', b('Good', 'સારું')],
      [
        'O(n²)',
        b('Quadratic', 'Quadratic'),
        'Nested loops',
        b('Slow for large n', 'મોટા n માટે ધીમું'),
      ],
      ['O(2ⁿ)', b('Exponential', 'Exponential'), 'Naive Fibonacci', b('Very slow', 'ખૂબ ધીમું')],
    ],
  },
  {
    type: 'visual',
    kind: 'growth-chart',
    data: { series: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)'] },
  },
  {
    type: 'heading',
    level: 2,
    text: b('How to identify Big-O', 'Big-O કેવી રીતે ઓળખવું'),
  },
  {
    type: 'rules',
    items: [
      {
        title: b('Rule 1: One loop', 'Rule 1: એક loop'),
        code: 'for (let i = 0; i < n; i++) { console.log(i); }',
        answer: 'O(n)',
        reason: b('The loop visits n items once.', 'Loop n items માંથી દરેકને એક વાર જુએ છે.'),
      },
      {
        title: b('Rule 2: Nested loops', 'Rule 2: Nested loops'),
        code: 'for (...) { for (...) { ... } }',
        answer: 'O(n²)',
        reason: b(
          'n iterations are repeated n times.',
          'n iterations ને n વાર ફરી ચલાવવામાં આવે છે.',
        ),
      },
      {
        title: b('Rule 3: Sequential loops', 'Rule 3: એક પછી એક loops'),
        code: 'for (...) { ... }\nfor (...) { ... }',
        answer: 'O(n + n) = O(2n) = O(n)',
        reason: b('Big-O ignores constant factors.', 'Big-O માં constant factors ગણતા નથી.'),
      },
      {
        title: b('Rule 4: Different input sizes', 'Rule 4: અલગ input sizes'),
        code: 'for (const x of arr1) { ... }\nfor (const y of arr2) { ... }',
        answer: 'O(a + b)',
        reason: b(
          'The two arrays can have different lengths.',
          'બંને arrays ની lengths અલગ હોઈ શકે છે.',
        ),
      },
      {
        title: b('Rule 5: The value doubles', 'Rule 5: value બમણી થાય'),
        code: 'for (let i = 1; i < n; i *= 2) { ... }',
        answer: 'O(log n)',
        reason: b(
          'The number of iterations grows with repeated doubling.',
          'દરેક iteration માં value બમણી થવાથી iterations log n જેટલી થાય છે.',
        ),
      },
    ],
  },
  {
    type: 'heading',
    level: 2,
    text: b('Brute force vs optimized', 'Brute force અને optimized approach'),
  },
  {
    type: 'table',
    columns: [
      b('Problem', 'સમસ્યા'),
      b('Brute force', 'Brute force'),
      b('Improved idea', 'વધુ સારી રીત'),
    ],
    rows: [
      [
        b('Find an item in sorted data', 'Sorted data માં item શોધો'),
        'Scan each item: O(n)',
        'Binary Search: O(log n)',
      ],
      [
        b('Sort n items', 'n items sort કરો'),
        'Simple nested-loop sort: O(n²)',
        'Merge Sort: O(n log n)',
      ],
      [
        b('Read a known position', 'જાણીતી position વાંચો'),
        'Search for the position: O(n)',
        'Index lookup: O(1)',
      ],
    ],
  },
  {
    type: 'heading',
    level: 2,
    text: b('Common mistakes', 'સામાન્ય ભૂલો'),
  },
  {
    type: 'list',
    items: [
      b(
        'Keeping constants, such as calling 3n + 10 “O(3n)”; simplify it to O(n).',
        '3n + 10 ને “O(3n)” કહેવું; તેને સરળ કરીને O(n) લખો.',
      ),
      b(
        'Adding sequential loops as if they were nested; sequential O(n) loops are still O(n).',
        'એક પછી એક loops ને nested ગણવા; O(n) ના sequential loops નો કુલ સમય O(n) જ રહે છે.',
      ),
      b(
        'Forgetting that Binary Search needs sorted input.',
        'Binary Search માટે sorted input જરૂરી છે એ ભૂલી જવું.',
      ),
      b(
        'Confusing extra memory with the input storage itself.',
        'Input સાચવતી memory ને extra memory સાથે ગૂંચવવી.',
      ),
    ],
  },
  {
    type: 'callout',
    variant: 'interview',
    text: b(
      'In an interview, state the time and space complexity and explain what part of the code causes it. Mention important assumptions, such as whether the input is sorted.',
      'Interview માં Time અને Space Complexity જણાવો અને code નો કયો ભાગ તેનું કારણ છે તે સમજાવો. Input sorted છે કે નહીં જેવી જરૂરી ધારણાઓ પણ કહો.',
    ),
  },
  { type: 'practice-link', text: b('Test yourself', 'હવે તમારી જાતને ચકાસો') },
];
