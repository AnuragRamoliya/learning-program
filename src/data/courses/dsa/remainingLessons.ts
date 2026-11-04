import type { LessonBlock, LocalizedText, LocalizedValue } from '../../types.js';

const b = (en: string, gu: string): LocalizedText => ({ en, gu });
const intro = (text: LocalizedText): LessonBlock => ({ type: 'intro', text });
const heading = (text: LocalizedText): LessonBlock => ({ type: 'heading', text });
const text = (value: LocalizedText): LessonBlock => ({ type: 'text', text: value });
const code = (caption: LocalizedText, source: string): LessonBlock => ({
  type: 'code',
  language: 'javascript',
  caption,
  code: source,
});
const trace = (
  input: string,
  columns: LocalizedValue[],
  rows: LocalizedValue[][],
): LessonBlock => ({ type: 'trace', input, columns, rows });
const table = (columns: LocalizedValue[], rows: LocalizedValue[][]): LessonBlock => ({
  type: 'table',
  columns,
  rows,
});
const callout = (
  title: LocalizedText,
  value: LocalizedText,
  variant: 'tip' | 'warning' | 'note' = 'tip',
): LessonBlock => ({ type: 'callout', title, text: value, variant });
const complexity = (time: string, space: string, why: LocalizedText): LessonBlock => ({
  type: 'complexity',
  time,
  space,
  why,
});
const list = (title: LocalizedText, items: LocalizedText[]): LessonBlock => ({
  type: 'list',
  title,
  items,
});

export const remainingLessons: Record<string, LessonBlock[]> = {
  two: [
    intro(
      b(
        'Two pointers are two indexes that move through a collection to avoid checking every pair. On a sorted array, pointers at opposite ends can find a target sum in one pass; pointers moving in the same direction can compact or filter values.',
        'Two pointers એટલે collection માં આગળ વધતા બે indexes, જે દરેક જોડી તપાસવાની જરૂર ઘટાડે છે. Sorted array માં બંને છેડાના pointers target sum એક pass માં શોધી શકે; એક જ દિશામાં જતા pointers values ને compact કે filter કરી શકે.',
      ),
    ),
    {
      type: 'analogy',
      text: b(
        'Two people search a bookshelf: one starts at the left end and one at the right. They walk toward each other, using the order of the books to decide who should move.',
        'બે લોકો bookshelf શોધે છે: એક ડાબેથી અને બીજો જમણેથી શરૂ કરે છે. તેઓ એકબીજા તરફ ચાલે છે અને પુસ્તકોના ક્રમ પરથી નક્કી કરે છે કે કોણ ખસે.',
      ),
    },
    heading(b('Opposite ends and same direction', 'વિરુદ્ધ છેડા અને એક જ દિશા')),
    table(
      [
        b('Pattern', 'પદ્ધતિ'),
        b('Pointer movement', 'Pointer ની દિશા'),
        b('Common use', 'સામાન્ય ઉપયોગ'),
      ],
      [
        [
          b('Opposite ends', 'વિરુદ્ધ છેડા'),
          'left →    ← right',
          b('Sorted pair sum, palindrome', 'Sorted pair sum, palindrome'),
        ],
        [
          b('Read/write', 'Read/write'),
          'slow →    fast →',
          b('Remove duplicates in place', 'જગ્યા પર duplicates દૂર કરો'),
        ],
      ],
    ),
    text(
      b(
        'For a sorted pair-sum problem, a sum that is too small means the left value must increase, so move left right. A sum that is too large means the right value must decrease, so move right left. For in-place removal, fast scans and slow marks the next write position.',
        'Sorted pair-sum માં સરવાળો નાનો હોય તો ડાબી value વધારવી પડે, એટલે left ને જમણે ખસેડો. સરવાળો મોટો હોય તો જમણી value ઘટાડવી પડે, એટલે right ને ડાબે ખસેડો. In-place removal માં fast scan કરે છે અને slow આગળની write જગ્યા બતાવે છે.',
      ),
    ),
    code(
      b('Find two values in a sorted array', 'Sorted array માં બે values શોધો'),
      'function twoSumSorted(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n  while (left < right) {\n    const sum = arr[left] + arr[right];\n    if (sum === target) return [left, right];\n    if (sum < target) left++;\n    else right--;\n  }\n  return [];\n}\n\ntwoSumSorted([1, 2, 4, 7], 6);',
    ),
    trace(
      'twoSumSorted([1,2,4,7], 6)',
      [b('left', 'left'), b('right', 'right'), b('Sum', 'સરવાળો'), b('Decision', 'નિર્ણય')],
      [
        ['0', '3', '1 + 7 = 8', b('too large; move right left', 'મોટો; right ડાબે ખસેડો')],
        ['0', '2', '1 + 4 = 5', b('too small; move left right', 'નાનો; left જમણે ખસેડો')],
        ['1', '2', '2 + 4 = 6', b('found indexes [1, 2]', 'indexes [1, 2] મળ્યા')],
      ],
    ),
    callout(
      b('The input order matters', 'Input નો ક્રમ મહત્વનો છે'),
      b(
        'The pointer decision depends on sorted order. Sort first if the task allows it, accounting for the O(n log n) sorting cost, or use a Map when original indexes must be kept. Use left < right when two different elements are required.',
        'Pointer નો નિર્ણય sorted ક્રમ પર આધારિત છે. Task મંજૂરી આપે તો પહેલાં sort કરો અને O(n log n) ખર્ચ ગણો, અથવા મૂળ indexes જાળવવા Map વાપરો. બે અલગ elements જરૂરી હોય ત્યારે left < right વાપરો.',
      ),
      'warning',
    ),
    complexity(
      'O(n)',
      'O(1)',
      b(
        'Each pointer moves inward at most n times, and the algorithm keeps only two indexes.',
        'દરેક pointer વધુમાં વધુ n પગલાં અંદર જાય છે અને algorithm માત્ર બે indexes રાખે છે.',
      ),
    ),
    list(b('Try these next', 'આગળ આ અજમાવો'), [
      b(
        'Check a palindrome while ignoring spaces and punctuation.',
        'Spaces અને punctuation અવગણીને palindrome તપાસો.',
      ),
      b('Merge two sorted arrays.', 'બે sorted arrays ભેગી કરો.'),
      b('Find the pair sum closest to a target.', 'Target ની સૌથી નજીકનો pair sum શોધો.'),
    ]),
  ],
  win: [
    intro(
      b(
        'A sliding window is a contiguous range that moves through an array or string. Instead of rebuilding the range’s data from scratch, update it as items enter on the right and leave on the left.',
        'Sliding window array અથવા string માં ખસતો contiguous ભાગ છે. દરેક વખતે શરૂઆતથી ગણતરી કરવાને બદલે જમણી બાજુથી item આવે અને ડાબી બાજુથી જાય તેમ window update કરો.',
      ),
    ),
    {
      type: 'analogy',
      text: b(
        'Looking out of a train window: you notice what enters on one side and what leaves on the other, rather than studying the whole landscape again.',
        'ટ્રેનની બારીમાંથી બહાર જોતા એક બાજુથી શું આવે અને બીજી બાજુથી શું જાય તે જ જુઓ; આખું દૃશ્ય ફરીથી તપાસવાની જરૂર નથી.',
      ),
    },
    heading(b('Two window shapes', 'Window ના બે પ્રકાર')),
    table(
      [b('Kind', 'પ્રકાર'), b('Rule', 'નિયમ'), b('Typical problem', 'સામાન્ય પ્રશ્ન')],
      [
        [
          b('Fixed size k', 'નિશ્ચિત size k'),
          b('Add incoming; subtract outgoing.', 'આવતું ઉમેરો; જતું બાદ કરો.'),
          b('Maximum sum of k items', 'k items નો મહત્તમ સરવાળો'),
        ],
        [
          b('Variable size', 'બદલાતું size'),
          b('Expand right; shrink left while invalid.', 'જમણે વધારો; નિયમ તૂટે તો ડાબેથી ઘટાડો.'),
          b('Longest valid substring', 'સૌથી લાંબી માન્ય substring'),
        ],
      ],
    ),
    text(
      b(
        'For a fixed window, sum the first k values once, then update the sum by adding arr[i] and subtracting arr[i-k]. For a variable window, move right to include values; while the window violates its rule, remove values from the left. Record the best answer whenever the window is valid.',
        'Fixed window માટે પહેલાં k values નો સરવાળો એક વાર કરો, પછી arr[i] ઉમેરો અને arr[i-k] બાદ કરો. Variable window માટે right ખસેડીને values ઉમેરો; નિયમ તૂટે ત્યાં સુધી left તરફથી values કાઢો. Window માન્ય હોય ત્યારે શ્રેષ્ઠ જવાબ સાચવો.',
      ),
    ),
    code(
      b('Largest sum of k consecutive values', 'સળંગ k values નો મહત્તમ સરવાળો'),
      'function maxSumK(arr, k) {\n  let sum = 0;\n  for (let i = 0; i < k; i++) sum += arr[i];\n  let best = sum;\n  for (let i = k; i < arr.length; i++) {\n    sum += arr[i] - arr[i - k];\n    best = Math.max(best, sum);\n  }\n  return best;\n}\n\nmaxSumK([2, 1, 5, 1, 3, 2], 3);',
    ),
    trace(
      'maxSumK([2,1,5,1,3,2], 3)',
      [b('Window', 'Window'), b('Update', 'ફેરફાર'), b('Sum', 'સરવાળો'), b('Best', 'શ્રેષ્ઠ')],
      [
        ['[2,1,5]', b('first window', 'પહેલી window'), '8', '8'],
        ['[1,5,1]', '8 - 2 + 1', '7', '8'],
        ['[5,1,3]', '7 - 1 + 3', '9', '9'],
        ['[1,3,2]', '9 - 5 + 2', '6', '9'],
      ],
    ),
    callout(
      b('Negative values can change the strategy', 'ઋણ values પદ્ધતિ બદલી શકે છે'),
      b(
        'The “shrink while sum >= target” shortcut relies on non-negative values. Negative numbers can make a sum go up or down unpredictably as the window shrinks; use prefix sums with a Map for those cases. Update the best answer inside the shrink loop.',
        '“sum >= target હોય ત્યાં સુધી shrink” shortcut non-negative values પર આધારિત છે. Negative numbers હોય તો window નાની કરતાં sum અનિશ્ચિત રીતે વધી કે ઘટી શકે; એવા કેસમાં prefix sums અને Map વાપરો. Shrink loop ની અંદર best answer update કરો.',
      ),
      'warning',
    ),
    complexity(
      'O(n)',
      'O(1) to O(k)',
      b(
        'Each pointer moves forward at most n times; a frequency Map or other window state may use extra space.',
        'દરેક pointer વધુમાં વધુ n વાર આગળ વધે છે; frequency Map કે બીજી window state વધારાની જગ્યા લઈ શકે છે.',
      ),
    ),
    list(b('Look for these clues', 'આ સંકેતો શોધો'), [
      b(
        'Words such as contiguous, substring, subarray, longest, or shortest.',
        'Contiguous, substring, subarray, longest અથવા shortest જેવા શબ્દો.',
      ),
      b(
        'Longest substring with at most K distinct characters.',
        'વધુમાં વધુ K જુદા characters ધરાવતી સૌથી લાંબી substring.',
      ),
      b(
        'Maximum of every window of size K (a deque helps).',
        'Size K ની દરેક window નો maximum (deque મદદ કરે છે).',
      ),
    ]),
  ],
  pre: [
    intro(
      b(
        'A prefix-sum array stores running totals. Once it is built, any inclusive range sum is one subtraction, so many queries on an unchanged array are fast.',
        'Prefix-sum array running totals સાચવે છે. એક વાર બને પછી inclusive range નો સરવાળો એક subtraction થી મળે છે, એટલે ન બદલાતી array પર ઘણા queries ઝડપથી થાય છે.',
      ),
    ),
    {
      type: 'analogy',
      text: b(
        'A bank passbook records the balance after each transaction. The amount spent between two dates is the later balance minus the earlier balance; there is no need to add every transaction again.',
        'Bank passbook દરેક transaction પછીનું balance બતાવે છે. બે તારીખ વચ્ચેનો ખર્ચ પાછળનું balance minus પહેલાનું balance છે; દરેક transaction ફરી ઉમેરવાની જરૂર નથી.',
      ),
    },
    heading(b('Use a leading zero to simplify ranges', 'Range સરળ કરવા શરૂઆતમાં zero રાખો')),
    table(
      [b('Array index', 'Array index'), '0', '1', '2', '3', '4'],
      [
        ['arr', '3', '1', '4', '2', '5'],
        ['prefix index', '0', '1', '2', '3', '4', '5'],
        ['prefix value', '0', '3', '4', '8', '10', '15'],
      ],
    ),
    text(
      b(
        'Build prefix with prefix[0] = 0 and prefix[i + 1] = prefix[i] + arr[i]. For an inclusive range [left, right], subtract prefix[left] from prefix[right + 1]. The extra leading zero avoids a special case when left is 0.',
        'prefix[0] = 0 રાખીને prefix[i + 1] = prefix[i] + arr[i] વડે બનાવો. Inclusive range [left, right] માટે prefix[right + 1] માંથી prefix[left] બાદ કરો. શરૂઆતનો zero left 0 હોય ત્યારે અલગ case ટાળે છે.',
      ),
    ),
    code(
      b(
        'Build once, answer each range in constant time',
        'એક વાર બનાવો, દરેક range નો જવાબ constant time માં',
      ),
      'function rangeSums(arr, queries) {\n  const prefix = [0];\n  for (const value of arr) {\n    prefix.push(prefix[prefix.length - 1] + value);\n  }\n  return queries.map(([left, right]) => prefix[right + 1] - prefix[left]);\n}\n\nrangeSums([1, 2, 3, 4], [[0, 1], [1, 3], [2, 2]]);',
    ),
    trace(
      'rangeSums([1,2,3,4], [[0,1],[1,3],[2,2]])',
      [b('Query', 'Query'), b('Prefix calculation', 'Prefix ગણતરી'), b('Sum', 'સરવાળો')],
      [
        ['[0,1]', 'prefix[2] - prefix[0] = 3 - 0', '3'],
        ['[1,3]', 'prefix[4] - prefix[1] = 10 - 1', '9'],
        ['[2,2]', 'prefix[3] - prefix[2] = 6 - 3', '3'],
      ],
    ),
    callout(
      b('Updates need a different structure', 'Updates માટે જુદું structure જરૂરી'),
      b(
        'Prefix sums are ideal when the array stays fixed. If values change frequently, rebuilding the prefix array costs O(n) per update; use a Fenwick tree or segment tree for both updates and queries. Negative values are fine for range sums; the Map-based subarray-sum pattern also handles them.',
        'Array સ્થિર હોય ત્યારે prefix sums ઉત્તમ છે. Values વારંવાર બદલાય તો દરેક update પછી ફરી બનાવવામાં O(n) લાગે; update અને query બંને માટે Fenwick tree કે segment tree વાપરો. Range sums માં negative values ચાલે છે; Map વાળી subarray-sum પદ્ધતિ પણ તેને સંભાળે છે.',
      ),
      'note',
    ),
    complexity(
      'O(n + q) for build and q queries',
      'O(n)',
      b(
        'Building reads n values once; each query uses one subtraction and the prefix array stores n + 1 totals.',
        'બનાવતાં n values એક વાર વાંચાય છે; દરેક query એક subtraction કરે છે અને prefix array n + 1 totals રાખે છે.',
      ),
    ),
    list(b('Try these next', 'આગળ આ અજમાવો'), [
      b(
        'Find an equilibrium index where left and right sums match.',
        'ડાબા અને જમણા સરવાળા સમાન હોય તે equilibrium index શોધો.',
      ),
      b(
        'Find the longest subarray whose sum is zero.',
        'સરવાળો zero હોય તેવી સૌથી લાંબી subarray શોધો.',
      ),
      b('Count subarrays whose sum is divisible by K.', 'સરવાળો K વડે ભાગાય તેવી subarrays ગણો.'),
    ]),
  ],
  back: [
    intro(
      b(
        'Backtracking builds a candidate answer one choice at a time. When a choice cannot lead to a useful answer, undo it and try another. It is an organized way to explore combinations, permutations, paths, and other possibility trees.',
        'Backtracking દરેક વખતે એક choice લઈને candidate answer બનાવે છે. Choice થી ઉપયોગી જવાબ ન મળે તો તેને undo કરીને બીજી અજમાવો. Combinations, permutations, paths અને બીજા possibilities ને વ્યવસ્થિત રીતે તપાસવાની આ રીત છે.',
      ),
    ),
    {
      type: 'analogy',
      text: b(
        'Solve a maze by walking down a path. At a dead end, return to the last junction and take a different turn.',
        'Maze ઉકેલવા એક રસ્તે આગળ ચાલો. Dead end આવે તો છેલ્લાં junction પર પાછા જઈ બીજો વળાંક લો.',
      ),
    },
    heading(b('Choose → explore → un-choose', 'પસંદ કરો → તપાસો → પસંદગી પાછી લો')),
    table(
      [b('Action', 'ક્રિયા'), b('Subset example', 'Subset ઉદાહરણ')],
      [
        [b('Choose', 'પસંદ કરો'), 'cur.push(value)'],
        [b('Explore', 'તપાસો'), 'go(nextIndex, cur)'],
        [b('Un-choose', 'પસંદગી પાછી લો'), 'cur.pop()'],
      ],
    ),
    text(
      b(
        'Define what a partial answer looks like, and decide when it is complete. At a complete answer, save a copy. Otherwise loop over the choices that remain, make one choice, recurse, and undo it. Pruning skips a choice as soon as it cannot possibly work.',
        'Partial answer કેવો છે તે નક્કી કરો અને ક્યારે પૂર્ણ થાય તે ઓળખો. પૂર્ણ જવાબ મળે ત્યારે તેની copy સાચવો. નહીં તો બાકી choices પર loop ચલાવો, એક પસંદ કરો, recurse કરો અને પછી undo કરો. કોઈ choice સફળ થઈ જ ન શકે ત્યારે pruning તેને વહેલી છોડી દે છે.',
      ),
    ),
    code(
      b('Generate every subset', 'દરેક subset બનાવો'),
      'function subsets(nums) {\n  const result = [];\n  function go(start, current) {\n    result.push([...current]);\n    for (let i = start; i < nums.length; i++) {\n      current.push(nums[i]);\n      go(i + 1, current);\n      current.pop();\n    }\n  }\n  go(0, []);\n  return result;\n}\n\nsubsets([1, 2]);',
    ),
    trace(
      'subsets([1,2])',
      [
        b('Choice path', 'Choice નો રસ્તો'),
        b('Saved subset', 'સાચવેલો subset'),
        b('Next action', 'આગળની ક્રિયા'),
      ],
      [
        ['start', '[]', b('choose 1', '1 પસંદ કરો')],
        ['choose 1', '[1]', b('choose 2', '2 પસંદ કરો')],
        ['choose 1, 2', '[1,2]', b('un-choose 2, then 1', '2 પછી 1 પાછું લો')],
        ['choose 2', '[2]', b('finish', 'પૂર્ણ')],
      ],
    ),
    callout(
      b('Save a copy and always undo', 'Copy સાચવો અને પસંદગી પાછી લો'),
      b(
        'result.push(current) stores a reference to a list that will keep changing; use result.push([...current]). Also make sure every recursive choice is undone before trying the next branch, or later answers inherit old values.',
        'result.push(current) એવી list નો reference રાખે છે જે બદલાતી રહેશે; result.push([...current]) વાપરો. આગળની branch પહેલાં દરેક પસંદગી undo કરો, નહીં તો પછીના જવાબમાં જૂની values રહી જશે.',
      ),
      'warning',
    ),
    complexity(
      'O(2ⁿ · n) for subsets',
      'O(n) auxiliary stack, plus output',
      b(
        'There are 2ⁿ subsets and copying each one may take O(n); generating all answers is inherently exponential.',
        '2ⁿ subsets છે અને દરેક copy માં O(n) લાગી શકે; બધા જવાબો બનાવવા exponential કામ સ્વાભાવિક છે.',
      ),
    ),
    list(b('Classic practice', 'મહત્વની practice'), [
      b('Generate all valid parentheses for n pairs.', 'n pairs માટે બધા valid parentheses બનાવો.'),
      b(
        'Place four queens so none attack each other.',
        'એકબીજાને attack ન કરે એવી ચાર queens મૂકો.',
      ),
      b('Search for a word in a character grid.', 'Character grid માં શબ્દ શોધો.'),
    ]),
  ],
  ll: [
    intro(
      b(
        'A linked list is a chain of nodes. Each node stores a value and a pointer to the next node; nodes do not need to be next to one another in memory. You reach a position by following links from the head.',
        'Linked list nodes ની સાંકળ છે. દરેક node value અને આગળના node નો pointer રાખે છે; memory માં nodes બાજુબાજુ હોવા જરૂરી નથી. Head થી links અનુસરીને position સુધી પહોંચો.',
      ),
    ),
    {
      type: 'analogy',
      text: b(
        'A treasure hunt: each clue tells you where the next clue is. You cannot jump directly to clue five; follow the chain from the start.',
        'Treasure hunt માં દરેક clue આગળનું clue ક્યાં છે તે કહે છે. પાંચમા clue પર સીધા કૂદી શકાતું નથી; શરૂઆતથી સાંકળ અનુસરો.',
      ),
    },
    heading(b('Nodes and links', 'Nodes અને links')),
    table(
      [b('Operation', 'Operation'), b('Typical cost', 'સામાન્ય ખર્ચ'), b('Why', 'કારણ')],
      [
        [
          b('Read by position', 'Position પરથી વાંચો'),
          'O(n)',
          b('Follow links from the head.', 'Head થી links અનુસરો.'),
        ],
        [
          b('Insert/remove at head', 'Head પર ઉમેરો/દૂર કરો'),
          'O(1)',
          b('Change the head pointer.', 'Head pointer બદલો.'),
        ],
        [
          b('Insert after a known node', 'જાણીતા node પછી ઉમેરો'),
          'O(1)',
          b('Reconnect a fixed number of links.', 'થોડા links ફરી જોડો.'),
        ],
      ],
    ),
    text(
      b(
        'To reverse a list, keep prev, current, and next. Save current.next before changing it, point current backward to prev, then advance both pointers. Fast and slow pointers solve other problems: slow moves one link and fast moves two to find the middle or detect a cycle.',
        'List reverse કરવા prev, current અને next રાખો. current.next બદલતાં પહેલાં સાચવો, current ને prev તરફ જોડો, પછી બંને pointers આગળ વધારો. Fast અને slow pointers બીજી સમસ્યાઓ ઉકેલે છે: slow એક link અને fast બે links જાય તો middle મળે અથવા cycle પકડાય.',
      ),
    ),
    code(
      b('Reverse a singly linked list', 'Singly linked list reverse કરો'),
      'function reverseList(head) {\n  let previous = null;\n  let current = head;\n  while (current) {\n    const next = current.next;\n    current.next = previous;\n    previous = current;\n    current = next;\n  }\n  return previous;\n}',
    ),
    trace(
      'reverseList(1 → 2 → 3 → null)',
      [
        b('Step', 'પગલું'),
        b('previous', 'previous'),
        b('current', 'current'),
        b('Link changed', 'બદલાયેલ link'),
      ],
      [
        [b('start', 'શરૂઆત'), 'null', '1 → 2 → 3', b('none', 'કંઈ નહીં')],
        ['1', '1 → null', '2 → 3', b('1 points back to null', '1 હવે null તરફ')],
        ['2', '2 → 1 → null', '3', b('2 points back to 1', '2 હવે 1 તરફ')],
        ['3', '3 → 2 → 1 → null', 'null', b('new head is 3', 'નવો head 3')],
      ],
    ),
    callout(
      b('Save the next link before rewiring', 'Link બદલતાં પહેલાં આગળનો link સાચવો'),
      b(
        'If you overwrite current.next before saving it, the rest of the list is lost. Draw each node and arrow while tracing pointer code; many linked-list bugs are lost or incorrectly reused pointers.',
        'current.next સાચવતાં પહેલાં overwrite કરશો તો list નો બાકી ભાગ ખોવાઈ જશે. Pointer code trace કરતી વખતે દરેક node અને arrow દોરો; ઘણી ભૂલો pointer ખોવાઈ જવા કે ખોટી રીતે વપરાવાથી થાય છે.',
      ),
      'warning',
    ),
    complexity(
      'O(n)',
      'O(1)',
      b(
        'Each node is visited a constant number of times, and only a few pointers are stored.',
        'દરેક node ને નિશ્ચિત વખત જોવામાં આવે છે અને થોડા pointers જ રાખવામાં આવે છે.',
      ),
    ),
    list(b('Classic linked-list problems', 'Linked-list ના સામાન્ય પ્રશ્નો'), [
      b('Remove the Nth node from the end in one pass.', 'એક pass માં અંતથી Nમો node દૂર કરો.'),
      b('Check whether a linked list is a palindrome.', 'Linked list palindrome છે કે નહીં તપાસો.'),
      b('Add two numbers stored as linked lists.', 'Linked lists માં રહેલી બે સંખ્યાઓ ઉમેરો.'),
    ]),
  ],
  sq: [
    intro(
      b(
        'A stack is LIFO: Last In, First Out. Add and remove values at the top. Stacks are useful whenever the most recent unfinished item should be handled first.',
        'Stack LIFO છે: Last In, First Out. Values ને ઉપર ઉમેરો અને ઉપરથી જ કાઢો. સૌથી તાજેતરનું અધૂરું કામ પહેલાં સંભાળવું હોય ત્યારે stack ઉપયોગી છે.',
      ),
    ),
    {
      type: 'analogy',
      text: b(
        'A pile of plates: place a plate on top and take the top plate first. Undo and browser Back also return to the most recent action or page.',
        'વાસણોની થપ્પી: ઉપર plate મૂકો અને સૌથી ઉપરની plate પહેલાં લો. Undo અને browser Back પણ તાજેતરની ક્રિયા કે page પર પહેલાં પાછાં જાય છે.',
      ),
    },
    heading(b('Push, pop, and peek', 'Push, pop અને peek')),
    table(
      [b('Operation', 'Operation'), b('Meaning', 'અર્થ'), b('Typical cost', 'સામાન્ય ખર્ચ')],
      [
        ['push(x)', b('Add x to the top', 'x ને ટોચ પર ઉમેરો'), 'O(1)'],
        ['pop()', b('Remove and return the top', 'ટોચનું કાઢી પાછું આપો'), 'O(1)'],
        ['peek()', b('Read the top without removing', 'કાઢ્યા વગર ટોચ વાંચો'), 'O(1)'],
      ],
    ),
    text(
      b(
        'For brackets, push opening symbols. On a closing symbol, the top must be its matching opener. A monotonic stack keeps indexes in an increasing or decreasing order; when a new value resolves earlier waiting values, pop them and record the answer.',
        'Brackets માટે opening symbols push કરો. Closing symbol આવે ત્યારે stack ની ટોચે તેનો matching opener હોવો જોઈએ. Monotonic stack indexes ને વધતા કે ઘટતા ક્રમમાં રાખે છે; નવી value પહેલાંની રાહ જોતી values નો જવાબ આપે ત્યારે તેમને pop કરીને જવાબ નોંધો.',
      ),
    ),
    code(
      b('Validate matching brackets', 'Matching brackets તપાસો'),
      'function validParentheses(s) {\n  const pairs = { ")": "(", "]": "[", "}": "{" };\n  const stack = [];\n  for (const ch of s) {\n    if (pairs[ch]) {\n      if (stack.pop() !== pairs[ch]) return false;\n    } else {\n      stack.push(ch);\n    }\n  }\n  return stack.length === 0;\n}\n\nvalidParentheses("{[()]}");',
    ),
    trace(
      'validParentheses("{[()]}")',
      [b('Character', 'અક્ષર'), b('Action', 'કામ'), b('Stack after action', 'કામ પછી Stack')],
      [
        ['{', b('push', 'push'), '{'],
        ['[', b('push', 'push'), '{ ['],
        ['(', b('push', 'push'), '{ [ ('],
        [')', b('pop matching (', 'matching ( pop'), '{ ['],
        [']', b('pop matching [', 'matching [ pop'), '{'],
        ['}', b('pop matching {', 'matching { pop'), b('empty → true', 'ખાલી → true')],
      ],
    ),
    callout(
      b('Check before popping', 'Pop કરતાં પહેલાં તપાસો'),
      b(
        'A closing bracket with an empty stack is invalid, and after the scan the stack must be empty. Check stack.length before relying on pop in variations that do not compare the returned value. Other stack patterns include postfix evaluation, undo, DFS, and next-greater-element.',
        'ખાલી stack હોય ત્યારે closing bracket આવે તો તે invalid છે; scan પછી stack ખાલી હોવો જોઈએ. Pop નું returned value compare ન કરતા હોય તેવી રીતમાં pop પહેલાં stack.length તપાસો. Postfix evaluation, undo, DFS અને next-greater-element પણ stack patterns છે.',
      ),
      'warning',
    ),
    complexity(
      'O(n)',
      'O(n)',
      b(
        'Each character is pushed or popped at most once; in the worst case the stack holds n open symbols.',
        'દરેક character વધુમાં વધુ એક વાર push કે pop થાય છે; worst case માં stack n open symbols રાખે છે.',
      ),
    ),
    list(b('Try these next', 'આગળ આ અજમાવો'), [
      b(
        'Evaluate the postfix expression ["2","1","+","3","*"].',
        'Postfix expression ["2","1","+","3","*"] ઉકેલો.',
      ),
      b('Find the stock span for each day.', 'દરેક દિવસ માટે stock span શોધો.'),
      b('Decode the string "3[a2[c]]".', '"3[a2[c]]" string decode કરો.'),
    ]),
  ],
  queue: [
    intro(
      b(
        'A queue is FIFO: First In, First Out. Add new items at the back and remove items from the front. Queues process work in arrival order and are the standard tool for breadth-first search.',
        'Queue FIFO છે: First In, First Out. નવી વસ્તુ પાછળ ઉમેરો અને આગળથી કાઢો. Queue કામને આવ્યાના ક્રમમાં process કરે છે અને breadth-first search માટેનું પ્રમાણભૂત tool છે.',
      ),
    ),
    {
      type: 'analogy',
      text: b(
        'A line at a ticket counter: the first person who arrives is served first.',
        'Ticket counter ની લાઇનમાં પહેલાં આવેલ વ્યક્તિને પહેલાં સેવા મળે છે.',
      ),
    },
    heading(b('A queue can wrap around', 'Queue ફરી શરૂઆત સુધી ફરી શકે છે')),
    table(
      [b('Front', 'આગળ'), b('Next', 'આગળનું'), b('Next', 'આગળનું'), b('Back', 'પાછળ')],
      [['dequeue →', '10', '20', '30  ← enqueue']],
    ),
    text(
      b(
        'Enqueue adds to the back; dequeue removes from the front. In JavaScript, Array.shift() moves the remaining items and can cost O(n). For larger queues use a head index, a linked list, or a circular buffer. A circular queue reuses empty slots at the front by wrapping indexes around the fixed array.',
        'Enqueue પાછળ ઉમેરે છે; dequeue આગળથી કાઢે છે. JavaScript માં Array.shift() બાકીના items ખસેડે છે અને O(n) લાગી શકે. મોટી queues માટે head index, linked list અથવા circular buffer વાપરો. Circular queue fixed array માં indexes wrap કરીને આગળની ખાલી જગ્યાઓ ફરી વાપરે છે.',
      ),
    ),
    code(
      b('Queue with a head index', 'Head index વડે Queue'),
      'class Queue {\n  constructor() {\n    this.items = [];\n    this.head = 0;\n  }\n  enqueue(value) { this.items.push(value); }\n  dequeue() {\n    if (this.isEmpty()) return undefined;\n    return this.items[this.head++];\n  }\n  peek() { return this.items[this.head]; }\n  isEmpty() { return this.head >= this.items.length; }\n  size() { return this.items.length - this.head; }\n}',
    ),
    trace(
      'QueueUsingStacks: push 1, 2, 3; then pop',
      [
        b('Operation', 'Operation'),
        b('Input stack', 'Input stack'),
        b('Output stack', 'Output stack'),
        b('Returned', 'મળ્યું'),
      ],
      [
        ['push 1,2,3', '[1,2,3]', '[]', '—'],
        [b('transfer when output is empty', 'Output ખાલી હોય ત્યારે ખસેડો'), '[]', '[3,2,1]', '—'],
        ['pop()', '[]', '[3,2]', '1'],
      ],
    ),
    callout(
      b('BFS depends on FIFO order', 'BFS FIFO ક્રમ પર આધારિત છે'),
      b(
        'A queue lets breadth-first search finish all nodes one edge away before moving farther, which gives the fewest edges in an unweighted graph. Mark nodes visited when enqueuing them so the same node is not added repeatedly.',
        'Queue વડે breadth-first search પહેલાં એક edge દૂરના બધા nodes પૂર્ણ કરે છે; unweighted graph માં આ સૌથી ઓછા edges આપે છે. Node enqueue કરતી વખતે visited mark કરો જેથી તે વારંવાર ઉમેરાય નહીં.',
      ),
      'note',
    ),
    complexity(
      'O(1) amortized for enqueue/dequeue',
      'O(n)',
      b(
        'A head-index queue advances one index per removal; a queue implemented with two stacks moves each item only a constant number of times.',
        'Head-index queue દરેક removal પર એક index વધારે છે; બે stacks વાળી queue દરેક item ને નિશ્ચિત વખત જ ખસેડે છે.',
      ),
    ),
    list(b('Common queue uses', 'Queue ના સામાન્ય ઉપયોગો'), [
      b(
        'Level-by-level traversal and shortest paths in unweighted graphs.',
        'Level-by-level traversal અને unweighted graph ના shortest paths.',
      ),
      b(
        'Task scheduling, message buffers, and streaming data.',
        'Task scheduling, message buffers અને streaming data.',
      ),
      b(
        'Reverse the first K queue items or implement a fixed-size circular queue.',
        'Queue ના પહેલા K items reverse કરો અથવા fixed-size circular queue બનાવો.',
      ),
    ]),
  ],
  deque: [
    intro(
      b(
        'A deque (double-ended queue) supports adding and removing items at both the front and back. It can act as either a queue or a stack and is especially useful for maintaining candidates in a sliding window.',
        'Deque (double-ended queue) આગળ અને પાછળ બંને છેડેથી items ઉમેરવા અને કાઢવા દે છે. તે queue કે stack બંનેની જેમ કામ કરી શકે છે અને sliding window ના candidates રાખવા ખાસ ઉપયોગી છે.',
      ),
    ),
    {
      type: 'analogy',
      text: b(
        'A train with doors at both ends: passengers can get on or off at either end.',
        'બંને છેડે દરવાજા ધરાવતી ટ્રેન: મુસાફરો કોઈ પણ છેડેથી ચડી કે ઊતરી શકે.',
      ),
    },
    heading(b('Keep only useful maximum candidates', 'મહત્તમ માટે ઉપયોગી candidates જ રાખો')),
    table(
      [b('Deque end', 'Deque નો છેડો'), b('Action', 'ક્રિયા'), b('Why', 'કારણ')],
      [
        [
          b('Front', 'આગળ'),
          b('Remove indexes outside the window.', 'Window બહારના indexes કાઢો.'),
          b('They are no longer valid.', 'તે હવે માન્ય નથી.'),
        ],
        [
          b('Back', 'પાછળ'),
          b('Remove values <= the new value.', 'નવી value થી <= values કાઢો.'),
          b(
            'The new value is a better maximum candidate.',
            'નવી value વધુ સારી maximum candidate છે.',
          ),
        ],
        [
          b('Front', 'આગળ'),
          b('Read the current maximum.', 'હાલનો maximum વાંચો.'),
          b('Candidates are decreasing by value.', 'Candidates value મુજબ ઘટતા ક્રમમાં છે.'),
        ],
      ],
    ),
    text(
      b(
        'Store indexes rather than values so you can tell when an item leaves the window. For each new index, first remove expired indexes from the front, then remove dominated values from the back, and finally append the new index. Once k items have been seen, the front index points to the maximum.',
        'Values ને બદલે indexes રાખો જેથી item window છોડે ત્યારે ઓળખી શકાય. દરેક નવા index માટે પહેલાં આગળથી expired indexes કાઢો, પછી પાછળથી નબળી values કાઢો અને અંતે નવો index ઉમેરો. k items આવ્યા પછી આગળનો index maximum બતાવે છે.',
      ),
    ),
    code(
      b('Maximum of every window of size k', 'Size k ની દરેક window નો maximum'),
      'function maxSliding(nums, k) {\n  const deque = [];\n  const result = [];\n  for (let i = 0; i < nums.length; i++) {\n    while (deque.length && deque[0] <= i - k) deque.shift();\n    while (deque.length && nums[deque[deque.length - 1]] <= nums[i]) deque.pop();\n    deque.push(i);\n    if (i >= k - 1) result.push(nums[deque[0]]);\n  }\n  return result;\n}\n\nmaxSliding([1, 3, -1, -3, 5, 3, 6, 7], 3);',
    ),
    trace(
      'maxSliding([1,3,-1,-3,5,3,6,7], 3)',
      [b('Window', 'Window'), b('Deque values', 'Deque values'), b('Maximum', 'મહત્તમ')],
      [
        ['[1,3,-1]', '[3,-1]', '3'],
        ['[3,-1,-3]', '[3,-1,-3]', '3'],
        ['[-1,-3,5]', '[5]', '5'],
        ['[-3,5,3]', '[5,3]', '5'],
        ['[5,3,6]', '[6]', '6'],
        ['[3,6,7]', '[7]', '7'],
      ],
    ),
    callout(
      b('The array illustration is not an O(1) deque', 'Array illustration O(1) deque નથી'),
      b(
        'The example uses shift() for clarity, but JavaScript array shift() is O(n). A real deque backed by a linked list or circular buffer supports both ends in O(1). The monotonic-window algorithm is O(n) when its deque operations are O(1).',
        'સમજ માટે ઉદાહરણ shift() વાપરે છે, પરંતુ JavaScript array નું shift() O(n) છે. Linked list કે circular buffer પર બનેલું વાસ્તવિક deque બંને છેડે O(1) આપે છે. Deque operations O(1) હોય ત્યારે monotonic-window algorithm O(n) છે.',
      ),
      'warning',
    ),
    complexity(
      'O(n)',
      'O(k)',
      b(
        'Each index enters and leaves the deque at most once; at most k current-window indexes are needed.',
        'દરેક index deque માં વધુમાં વધુ એક વાર આવે અને જાય છે; હાલની window ના વધુમાં વધુ k indexes જરૂરી છે.',
      ),
    ),
    list(b('Try these next', 'આગળ આ અજમાવો'), [
      b('Find the minimum of every window of size K.', 'Size K ની દરેક window નો minimum શોધો.'),
      b(
        'Find the longest subarray where max - min <= limit.',
        'max - min <= limit હોય તેવી સૌથી લાંબી subarray શોધો.',
      ),
      b('Implement a circular deque.', 'Circular deque બનાવો.'),
    ]),
  ],
  tree: [
    intro(
      b(
        'A tree is made of nodes connected in parent-child relationships. A binary tree gives each node at most two children, called left and right. The top node is the root; nodes without children are leaves.',
        'Tree parent-child સંબંધથી જોડાયેલા nodes નું structure છે. Binary tree દરેક node ને વધુમાં વધુ બે children આપે છે: left અને right. સૌથી ઉપરનો node root છે; children વગરના nodes leaves છે.',
      ),
    ),
    {
      type: 'analogy',
      text: b(
        'A family tree or company chart: one person at the top, with people branching below.',
        'Family tree કે company chart: ઉપર એક વ્યક્તિ અને તેની નીચે branches માં બીજા લોકો.',
      ),
    },
    heading(b('Tree vocabulary and traversal order', 'Tree ના શબ્દો અને traversal નો ક્રમ')),
    table(
      [
        b('Traversal', 'Traversal'),
        b('Visit order', 'જોવાનો ક્રમ'),
        b('For this tree', 'આ tree માટે'),
      ],
      [
        ['Inorder', 'left, node, right', '4, 2, 5, 1, 3, 6'],
        ['Preorder', 'node, left, right', '1, 2, 4, 5, 3, 6'],
        ['Postorder', 'left, right, node', '4, 5, 2, 6, 3, 1'],
        ['Level order', b('row by row (BFS)', 'દરેક level (BFS)'), '1 | 2,3 | 4,5,6'],
      ],
    ),
    text(
      b(
        'A tree is recursive: each node contains a left subtree and a right subtree, which are trees too. Depth-first problems often solve both subtrees and combine their answers. Level-order traversal uses a queue to finish one level before the next.',
        'Tree recursive છે: દરેક node પાસે left અને right subtree હોય છે, અને તે પણ trees જ છે. Depth-first પ્રશ્નોમાં બંને subtrees ઉકેલી તેમના જવાબ જોડાય છે. Level-order traversal queue વડે એક level પૂરું કરીને પછીનું કરે છે.',
      ),
    ),
    code(
      b('Maximum depth in number of nodes', 'Nodes ની સંખ્યામાં મહત્તમ depth'),
      'function maxDepth(node) {\n  if (!node) return 0;\n  return 1 + Math.max(maxDepth(node.left), maxDepth(node.right));\n}',
    ),
    trace(
      'maxDepth on the tree with root 1, children 2 and 3',
      [
        b('Node', 'Node'),
        b('Left depth', 'ડાબી depth'),
        b('Right depth', 'જમણી depth'),
        b('Returned depth', 'મળેલી depth'),
      ],
      [
        ['2', '1', '1', '2'],
        ['3', '0', '1', '2'],
        ['1', '2', '2', '3'],
      ],
    ),
    callout(
      b(
        'Start recursive tree functions with the empty case',
        'Recursive tree function માં empty case પહેલાં લખો',
      ),
      b(
        'For maxDepth, null has depth 0. For a tree with one node, the result is 1. “Level by level” suggests BFS with a queue; paths and depth usually suggest DFS. An empty tree is a valid input, not an error by itself.',
        'maxDepth માટે null ની depth 0 છે. એક node વાળા tree નો જવાબ 1 છે. “Level by level” માટે queue સાથે BFS; paths અને depth માટે સામાન્ય રીતે DFS. Empty tree પણ માન્ય input છે, પોતે error નથી.',
      ),
      'note',
    ),
    complexity(
      'O(n)',
      'O(h) recursion stack',
      b(
        'Every node is visited once; recursive stack space is proportional to height h (up to n for a skewed tree).',
        'દરેક node એક વાર જોવાય છે; recursive stack જગ્યા height h જેટલી છે (skewed tree માં n સુધી).',
      ),
    ),
    list(b('Classic tree problems', 'Tree ના સામાન્ય પ્રશ્નો'), [
      b('Invert a binary tree.', 'Binary tree ને mirror કરો.'),
      b('Check whether a tree is height-balanced.', 'Tree height-balanced છે કે નહીં તપાસો.'),
      b('Find the right-side view of a tree.', 'Tree નો right-side view શોધો.'),
    ]),
  ],
  bst: [
    intro(
      b(
        'A Binary Search Tree (BST) is a binary tree with an ordering rule: values in the left subtree are smaller than the node, and values in the right subtree are larger. This rule applies to every descendant, not only direct children.',
        'Binary Search Tree (BST) એ ordering rule ધરાવતું binary tree છે: left subtree ની values node કરતાં નાની અને right subtree ની values મોટી હોય છે. આ નિયમ દરેક descendant પર લાગુ પડે છે, માત્ર સીધા children પર નહીં.',
      ),
    ),
    {
      type: 'analogy',
      text: b(
        'In a “guess the number” game, go left for a smaller value and right for a larger one. Every comparison removes one side of the search.',
        '“Guess the number” રમતમાં નાની value માટે ડાબે અને મોટી માટે જમણે જાઓ. દરેક comparison search નો એક ભાગ દૂર કરે છે.',
      ),
    },
    heading(b('Ordering gives useful operations', 'Ordering ઉપયોગી operations આપે છે')),
    table(
      [
        b('Operation', 'Operation'),
        b('How the rule helps', 'નિયમની મદદ'),
        b('Typical time', 'સામાન્ય સમય'),
      ],
      [
        [
          b('Search / insert', 'Search / insert'),
          b('Choose left or right at each node.', 'દરેક node પર ડાબે કે જમણે પસંદ કરો.'),
          'O(h)',
        ],
        [
          b('Inorder traversal', 'Inorder traversal'),
          b(
            'Left, node, right visits ascending values.',
            'Left, node, right થી values વધતા ક્રમે મળે.',
          ),
          'O(n)',
        ],
        [
          b('kth smallest', 'kth smallest'),
          b('Stop at the kth inorder value.', 'kમા inorder value પર રોકો.'),
          'O(h + k)',
        ],
      ],
    ),
    text(
      b(
        'A balanced BST has height about log n, but inserting already sorted values can make a chain with height n. To validate a BST, pass allowed minimum and maximum bounds down: the right child inherits the node as its lower bound, and the left child inherits it as its upper bound.',
        'Balanced BST ની height લગભગ log n હોય છે, પરંતુ પહેલેથી sorted values ઉમેરવાથી n height ની સાંકળ બની શકે છે. BST validate કરવા allowed minimum અને maximum bounds નીચે મોકલો: right child ને node lower bound અને left child ને upper bound મળે છે.',
      ),
    ),
    code(
      b('Validate all ancestor bounds', 'બધા ancestor bounds તપાસો'),
      'function isValidBST(node, low = -Infinity, high = Infinity) {\n  if (!node) return true;\n  if (node.val <= low || node.val >= high) return false;\n  return isValidBST(node.left, low, node.val) &&\n    isValidBST(node.right, node.val, high);\n}',
    ),
    trace(
      'isValidBST(root 5; left 1; right 4 with children 3 and 6)',
      [
        b('Node', 'Node'),
        b('Allowed range', 'માન્ય range'),
        b('Check', 'તપાસ'),
        b('Result', 'પરિણામ'),
      ],
      [
        ['5', '(-∞, ∞)', b('inside', 'અંદર'), b('check children', 'children તપાસો')],
        ['1', '(-∞, 5)', b('inside', 'અંદર'), b('valid', 'માન્ય')],
        ['4', '(5, ∞)', b('below lower bound', 'Lower bound કરતાં નાનું'), b('invalid', 'અમાન્ય')],
      ],
    ),
    callout(
      b(
        'Checking only a node and its children is not enough',
        'માત્ર node અને તેના children તપાસવા પૂરતું નથી',
      ),
      b(
        'A value can be less than its parent but still violate a bound set by a higher ancestor. Carry the entire valid range down the tree; strict bounds also make the duplicate-value policy explicit.',
        'કોઈ value parent કરતાં નાની હોવા છતાં ઉપરના ancestor નો bound તોડી શકે છે. આખી માન્ય range tree માં નીચે મોકલો; Strict bounds duplicates ની policy પણ સ્પષ્ટ કરે છે.',
      ),
      'warning',
    ),
    complexity(
      'O(h) search, insert, or delete',
      'O(h) recursive stack',
      b(
        'Each operation follows one root-to-leaf path; h is O(log n) when balanced and O(n) when skewed.',
        'દરેક operation root થી leaf સુધી એક રસ્તો અનુસરે છે; balanced હોય તો h = O(log n), skewed હોય તો O(n).',
      ),
    ),
    list(b('Try these next', 'આગળ આ અજમાવો'), [
      b('Build a balanced BST from a sorted array.', 'Sorted array માંથી balanced BST બનાવો.'),
      b('Find the inorder successor of a node.', 'Node નો inorder successor શોધો.'),
      b('Delete a node from a BST.', 'BST માંથી node દૂર કરો.'),
    ]),
  ],
  heap: [
    intro(
      b(
        'A heap is a complete binary tree stored compactly in an array. In a min-heap every parent is no greater than its children, so the minimum is at the root; a max-heap keeps the maximum there. A heap is not fully sorted.',
        'Heap એ array માં compact રીતે રાખેલું complete binary tree છે. Min-heap માં દરેક parent તેના children કરતાં મોટો નથી, એટલે minimum root પર હોય છે; max-heap માં maximum root પર હોય છે. Heap સંપૂર્ણ sorted નથી.',
      ),
    ),
    {
      type: 'analogy',
      text: b(
        'A hospital emergency room: the most urgent patient is treated next, regardless of arrival order.',
        'Hospital emergency room માં સૌથી તાત્કાલિક દર્દીને પહેલાં સારવાર મળે છે, તે ક્યારે આવ્યો તેની પરવા વગર.',
      ),
    },
    heading(b('Array indexes reveal the tree', 'Array indexes tree બતાવે છે')),
    table(
      [b('For index i', 'Index i માટે'), b('Index formula', 'Index નું સૂત્ર')],
      [
        [b('Parent', 'Parent'), 'Math.floor((i - 1) / 2)'],
        [b('Left child', 'Left child'), '2 * i + 1'],
        [b('Right child', 'Right child'), '2 * i + 2'],
        [b('Peek / push / pop', 'Peek / push / pop'), 'O(1) / O(log n) / O(log n)'],
      ],
    ),
    text(
      b(
        'Push appends at the end and sifts the value upward until the heap rule holds. Pop saves the root, moves the last item to the root, then sifts it down by swapping with the smaller child in a min-heap. For the kth largest of n values, keep a min-heap of size k and discard the smallest whenever the heap grows too large.',
        'Push છેલ્લે ઉમેરે છે અને heap rule સાચો થાય ત્યાં સુધી value ને ઉપર ખસેડે છે. Pop root સાચવે છે, છેલ્લો item root પર મૂકે છે અને પછી min-heap માં નાના child સાથે swap કરીને નીચે ખસેડે છે. n values માં kth largest માટે size k નો min-heap રાખો અને મોટો થાય ત્યારે સૌથી નાનું કાઢો.',
      ),
    ),
    code(
      b('Maintain the k largest values in a min-heap', 'Min-heap માં k સૌથી મોટી values રાખો'),
      'function kthLargest(nums, k) {\n  const heap = [];\n  const push = (value) => {\n    heap.push(value);\n    let i = heap.length - 1;\n    while (i > 0) {\n      const parent = Math.floor((i - 1) / 2);\n      if (heap[parent] <= heap[i]) break;\n      [heap[parent], heap[i]] = [heap[i], heap[parent]];\n      i = parent;\n    }\n  };\n  const pop = () => {\n    const smallest = heap[0];\n    const last = heap.pop();\n    if (heap.length) {\n      heap[0] = last;\n      let i = 0;\n      while (true) {\n        const left = 2 * i + 1;\n        const right = left + 1;\n        let child = i;\n        if (left < heap.length && heap[left] < heap[child]) child = left;\n        if (right < heap.length && heap[right] < heap[child]) child = right;\n        if (child === i) break;\n        [heap[i], heap[child]] = [heap[child], heap[i]];\n        i = child;\n      }\n    }\n    return smallest;\n  };\n  for (const value of nums) {\n    push(value);\n    if (heap.length > k) pop();\n  }\n  return heap[0];\n}\n\nkthLargest([3, 2, 1, 5, 6, 4], 2);',
    ),
    trace(
      'kthLargest([3,2,1,5,6,4], 2)',
      [
        b('Value', 'Value'),
        b('Heap after keeping 2 largest', '2 સૌથી મોટી રાખ્યા પછી Heap'),
        b('Removed', 'કાઢ્યું'),
      ],
      [
        ['3', '[3]', '—'],
        ['2', '[2,3]', '—'],
        ['1', '[2,3]', '1'],
        ['5', '[3,5]', '2'],
        ['6', '[5,6]', '3'],
        ['4', '[5,6]', '4'],
      ],
    ),
    callout(
      b('Min-heap for the k largest feels backwards', 'k સૌથી મોટી માટે Min-heap ઊલટું લાગે'),
      b(
        'The root is the smallest of the k kept candidates. If a new value is larger, it can replace that smallest candidate; after all values are processed, the root is the kth largest. A max-heap is used for the k smallest.',
        'Root રાખેલા k candidates માં સૌથી નાનું છે. નવી value મોટી હોય તો તે નાનાને બદલી શકે; બધી values પછી root kth largest છે. k સૌથી નાની માટે max-heap વાપરો.',
      ),
      'note',
    ),
    complexity(
      'O(n log k)',
      'O(k)',
      b(
        'Each of n values enters a heap of at most k values, and a push or pop costs O(log k).',
        'n values માંથી દરેક વધુમાં વધુ k values ના heap માં જાય છે; push કે pop O(log k) છે.',
      ),
    ),
    list(b('Heap clues and practice', 'Heap ના સંકેતો અને practice'), [
      b(
        '“Top K”, “kth largest”, or “always pick the smallest next”.',
        '“Top K”, “kth largest” અથવા “હંમેશાં આગળનું સૌથી નાનું લો”.',
      ),
      b(
        'Merge K sorted arrays or find the K closest points.',
        'K sorted arrays ભેગી કરો અથવા K નજીકના points શોધો.',
      ),
      b(
        'Find the running median with one min-heap and one max-heap.',
        'એક min-heap અને એક max-heap વડે running median શોધો.',
      ),
    ]),
  ],
  graph: [
    intro(
      b(
        'A graph is a set of vertices (nodes) connected by edges. Edges may be directed, undirected, or weighted. Graphs model maps, social networks, dependencies, and grids; a tree is a connected graph with no cycles.',
        'Graph vertices (nodes) અને edges નો સમૂહ છે. Edges directed, undirected અથવા weighted હોઈ શકે. Graph maps, social networks, dependencies અને grids દર્શાવે છે; tree એ cycle વગરનો connected graph છે.',
      ),
    ),
    {
      type: 'analogy',
      text: b(
        'A city map: cities are nodes and roads are edges. BFS finds the fewest roads in an unweighted map; Dijkstra finds the least total distance when roads have positive costs.',
        'City map માં શહેરો nodes અને રસ્તા edges છે. Unweighted map માં BFS સૌથી ઓછા રસ્તા શોધે છે; positive costs હોય તો Dijkstra કુલ સૌથી ઓછું અંતર શોધે છે.',
      ),
    },
    heading(b('Choose a graph representation', 'Graph representation પસંદ કરો')),
    table(
      [
        b('Representation', 'Representation'),
        b('Stores', 'શું રાખે છે'),
        b('Useful when', 'ક્યારે ઉપયોગી'),
      ],
      [
        [
          b('Adjacency list', 'Adjacency list'),
          b('Neighbors for each node', 'દરેક node ના neighbors'),
          b('Graph is sparse', 'Graph માં edges ઓછા હોય'),
        ],
        [
          b('Adjacency matrix', 'Adjacency matrix'),
          b('Edge for every pair', 'દરેક જોડી વચ્ચે edge'),
          b(
            'Graph is dense or edge lookup is frequent',
            'Graph dense હોય કે edge lookup વારંવાર થાય',
          ),
        ],
      ],
    ),
    text(
      b(
        'BFS uses a queue and visits by distance in an unweighted graph. DFS uses recursion or a stack to explore deeply. Always record visited nodes to avoid cycles. Other common tools include topological sort for dependencies, Dijkstra for positive edge weights, Union-Find for merging components, and Prim/Kruskal for minimum spanning trees.',
        'BFS queue વાપરીને unweighted graph માં distance પ્રમાણે જાય છે. DFS recursion કે stack વડે ઊંડે explore કરે છે. Cycle ટાળવા visited nodes નોંધો. બીજા tools માં dependency માટે topological sort, positive edge weights માટે Dijkstra, components જોડવા Union-Find અને minimum spanning tree માટે Prim/Kruskal આવે છે.',
      ),
    ),
    code(
      b('Breadth-first search with visited-on-enqueue', 'Enqueue કરતી વખતે visited mark કરતું BFS'),
      'function bfs(adj, start) {\n  const visited = new Set([start]);\n  const queue = [start];\n  let head = 0;\n  const order = [];\n  while (head < queue.length) {\n    const node = queue[head++];\n    order.push(node);\n    for (const neighbor of adj[node]) {\n      if (!visited.has(neighbor)) {\n        visited.add(neighbor);\n        queue.push(neighbor);\n      }\n    }\n  }\n  return order;\n}\n\nconst graph = [[1, 2], [0, 3], [0, 3], [1, 2, 4], [3]];\nbfs(graph, 0);',
    ),
    trace(
      'bfs([[1,2],[0,3],[0,3],[1,2,4],[3]], 0)',
      [
        b('Queue', 'Queue'),
        b('Visit', 'જોવો'),
        b('New neighbors', 'નવા neighbors'),
        b('Next queue', 'આગળની Queue'),
      ],
      [
        ['[0]', '0', '1, 2', '[1, 2]'],
        ['[1, 2]', '1', '3', '[2, 3]'],
        ['[2, 3]', '2', b('none; 0 and 3 visited', 'નહીં; 0 અને 3 visited'), '[3]'],
        ['[3]', '3', '4', '[4]'],
        ['[4]', '4', b('none', 'નહીં'), '[]'],
      ],
    ),
    callout(
      b('Mark visited when adding to the queue', 'Queue માં ઉમેરતી વખતે visited mark કરો'),
      b(
        'If you wait until removing a node, the same neighbor may be queued many times. A visited set prevents cycles and duplicate work. For large graphs, a head index avoids the O(n) cost of repeatedly calling Array.shift().',
        'Node કાઢ્યા પછી visited કરશો તો એ જ neighbor ઘણી વાર queue માં આવી શકે. Visited set cycles અને duplicate કામ અટકાવે છે. મોટા graph માં Array.shift() નો વારંવાર O(n) ખર્ચ ટાળવા head index વાપરો.',
      ),
      'warning',
    ),
    complexity(
      'O(V + E)',
      'O(V)',
      b(
        'With an adjacency list, every vertex and edge is inspected a constant number of times; the queue and visited set hold vertices.',
        'Adjacency list માં દરેક vertex અને edge નિશ્ચિત વખત તપાસાય છે; queue અને visited set vertices રાખે છે.',
      ),
    ),
    list(b('Match the clue to the graph tool', 'સંકેત પ્રમાણે graph tool પસંદ કરો'), [
      b('Fewest steps in an unweighted graph: BFS.', 'Unweighted graph માં ઓછામાં ઓછા steps: BFS.'),
      b(
        'Does a path exist or how many groups: DFS or Union-Find.',
        'Path છે કે નહીં અથવા કેટલા groups: DFS કે Union-Find.',
      ),
      b(
        'Dependencies or course order: topological sort.',
        'Dependencies કે course order: topological sort.',
      ),
    ]),
  ],
  greedy: [
    intro(
      b(
        'A greedy algorithm chooses the best-looking allowed option at each step and does not undo earlier choices. It can be fast and simple, but a locally best choice is not always globally best; the rule needs a proof or a clear problem-specific argument.',
        'Greedy algorithm દરેક પગલે શ્રેષ્ઠ દેખાતો માન્ય વિકલ્પ પસંદ કરે છે અને અગાઉના નિર્ણયો પાછા ફેરવતો નથી. તે ઝડપી અને સરળ હોઈ શકે, પણ સ્થાનિક શ્રેષ્ઠ પસંદગી હંમેશાં વૈશ્વિક શ્રેષ્ઠ નથી; નિયમ માટે પુરાવો કે સમસ્યા-વિશિષ્ટ કારણ જરૂરી છે.',
      ),
    ),
    {
      type: 'analogy',
      text: b(
        'For familiar coin systems, give change by handing over the largest coin that still fits. This rule works for some systems, but not every set of coin values.',
        'પરિચિત coin systems માં બાકી રકમમાં ફિટ થાય તેવો સૌથી મોટો coin આપીને change આપો. આ નિયમ કેટલીક systems માટે ચાલે છે, પરંતુ દરેક coin set માટે નહીં.',
      ),
    },
    heading(
      b(
        'Activity selection: sort by finish time',
        'Activity selection: પૂરા થવાના સમય પ્રમાણે sort કરો',
      ),
    ),
    table(
      [b('Meeting', 'Meeting'), 'A (1–3)', 'B (2–4)', 'C (3–5)', 'D (0–6)', 'E (5–7)', 'F (8–9)'],
      [
        [
          b('Decision', 'નિર્ણય'),
          b('Take', 'લો'),
          b('Skip', 'છોડો'),
          b('Take', 'લો'),
          b('Skip', 'છોડો'),
          b('Take', 'લો'),
          b('Take', 'લો'),
        ],
      ],
    ),
    text(
      b(
        'Sort intervals by their end time. Take the first interval, then take another whenever its start is at or after the last chosen end. Choosing the earliest finish leaves as much room as possible for later meetings. Greedy can fail for coin change: with coins {1, 3, 4} and amount 6 it picks 4+1+1, while 3+3 uses fewer coins.',
        'Intervals ને end time પ્રમાણે sort કરો. પહેલું interval લો, પછી start છેલ્લાં પસંદ કરેલા end જેટલું કે આગળ હોય ત્યારે આગળનું લો. સૌથી વહેલું પૂરું થતું પસંદ કરવાથી આગળની meetings માટે વધુ જગ્યા રહે છે. Coin change માં greedy નિષ્ફળ થઈ શકે: {1, 3, 4} અને 6 માટે તે 4+1+1 લે છે, જ્યારે 3+3 માં ઓછા coins છે.',
      ),
    ),
    code(
      b(
        'Choose the maximum number of non-overlapping activities',
        'એકબીજા સાથે ન અથડાતી મહત્તમ activities પસંદ કરો',
      ),
      'function maxActivities(intervals) {\n  const sorted = [...intervals].sort((a, b) => a[1] - b[1]);\n  let end = -Infinity;\n  let count = 0;\n  for (const [start, finish] of sorted) {\n    if (start >= end) {\n      count++;\n      end = finish;\n    }\n  }\n  return count;\n}\n\nmaxActivities([[1, 2], [2, 3], [1, 4]]);',
    ),
    trace(
      'maxActivities([[1,2],[2,3],[1,4]])',
      [
        b('Sorted by finish', 'Finish પ્રમાણે ક્રમ'),
        b('Interval', 'Interval'),
        b('Decision', 'નિર્ણય'),
        b('Count', 'ગણતરી'),
      ],
      [
        ['2', '[1,2]', b('take; end = 2', 'લો; end = 2'), '1'],
        ['3', '[2,3]', b('take; starts at 2', 'લો; 2 થી શરૂ'), '2'],
        ['4', '[1,4]', b('skip; overlaps', 'છોડો; અથડાય છે'), '2'],
      ],
    ),
    callout(
      b('Test the greedy rule before trusting it', 'Greedy નિયમ પર વિશ્વાસ પહેલાં તપાસો'),
      b(
        'Write down why the local choice preserves an optimal solution, or search for a small counterexample. If one exists, the problem may need dynamic programming or another strategy. Common greedy sort keys include end time, value-to-weight ratio, and cost.',
        'સ્થાનિક પસંદગી શ્રેષ્ઠ ઉકેલ જાળવે છે તેનું કારણ લખો અથવા નાનું counterexample શોધો. Counterexample મળે તો dynamic programming કે બીજી રીત જરૂરી હોઈ શકે. સામાન્ય greedy sort keys માં end time, value-to-weight ratio અને cost આવે છે.',
      ),
      'warning',
    ),
    complexity(
      'O(n log n)',
      'O(n) for the sorted copy',
      b(
        'Sorting intervals dominates the linear scan that selects compatible activities.',
        'Intervals sort કરવાનો ખર્ચ compatible activities ના linear scan કરતાં મોટો છે.',
      ),
    ),
    list(b('Greedy clues and practice', 'Greedy ના સંકેતો અને practice'), [
      b(
        'Scheduling, intervals, “earliest”, “cheapest”, or minimum/maximum count.',
        'Scheduling, intervals, “earliest”, “cheapest” અથવા minimum/maximum count.',
      ),
      b(
        'Find minimum railway platforms or removals for non-overlapping intervals.',
        'ઓછામાં ઓછા railway platforms કે non-overlapping intervals માટે removals શોધો.',
      ),
      b(
        'Try gas station, job sequencing, or fractional knapsack.',
        'Gas station, job sequencing અથવા fractional knapsack અજમાવો.',
      ),
    ]),
  ],
  dp: [
    intro(
      b(
        'Dynamic Programming solves problems with overlapping subproblems by remembering answers, so the same smaller problem is not solved repeatedly. It is useful when the problem also has optimal substructure: larger answers can be built from answers to smaller states.',
        'Dynamic Programming overlapping subproblems ના જવાબો યાદ રાખે છે, જેથી એ જ નાની સમસ્યા વારંવાર ઉકેલવી ન પડે. Optimal substructure પણ હોવું જોઈએ: મોટા જવાબો નાની states ના જવાબોથી બને.',
      ),
    ),
    {
      type: 'analogy',
      text: b(
        'Keep a cheat sheet of answers. If you have already solved a smaller calculation, look it up instead of repeating the work.',
        'જવાબોની cheat sheet રાખો. નાની ગણતરી ઉકેલી હોય તો કામ ફરી કરવાને બદલે જવાબ જુઓ.',
      ),
    },
    heading(b('Top-down and bottom-up', 'Top-down અને bottom-up')),
    table(
      [b('Style', 'રીત'), b('How it works', 'કેવી રીતે કામ કરે'), b('Storage', 'Storage')],
      [
        [
          b('Memoization', 'Memoization'),
          b('Recursion computes a state on demand.', 'જરૂર પડે ત્યારે recursion state ગણે.'),
          b('Cache results by state.', 'State પ્રમાણે પરિણામ cache કરો.'),
        ],
        [
          b('Tabulation', 'Tabulation'),
          b('Fill states from small to large.', 'નાનીથી મોટી states भरो.'),
          b('Table or rolling variables.', 'Table કે rolling variables.'),
        ],
      ],
    ),
    text(
      b(
        'Use five steps: define exactly what dp[i] or dp[i][j] means; write the recurrence; set base cases; choose an order where dependencies are already known; then read the required state. For climbing stairs, ways[n] = ways[n-1] + ways[n-2], because the last move came from one or two steps below.',
        'પાંચ પગલાં વાપરો: dp[i] કે dp[i][j] નો અર્થ સ્પષ્ટ લખો; recurrence બનાવો; base cases મૂકો; dependencies પહેલેથી જાણીતી હોય તેવો order પસંદ કરો; પછી જરૂરી state વાંચો. Stairs માટે ways[n] = ways[n-1] + ways[n-2], કારણ કે છેલ્લી ચાલ એક કે બે પગથિયાં નીચેથી આવી.',
      ),
    ),
    code(
      b('Count ways to climb one or two steps at a time', 'એક કે બે પગથિયાં ચઢવાના રસ્તા ગણો'),
      'function climbStairs(n) {\n  let oneBefore = 1;\n  let twoBefore = 1;\n  for (let step = 2; step <= n; step++) {\n    [oneBefore, twoBefore] = [twoBefore, oneBefore + twoBefore];\n  }\n  return twoBefore;\n}\n\nclimbStairs(4);',
    ),
    trace(
      'climbStairs(4)',
      [b('Step', 'પગલું'), b('Previous counts', 'અગાઉની ગણતરીઓ'), b('Ways now', 'હાલના રસ્તા')],
      [
        ['0 and 1', '1, 1', b('base values', 'base values')],
        ['2', '1 + 1', '2'],
        ['3', '1 + 2', '3'],
        ['4', '2 + 3', '5'],
      ],
    ),
    callout(
      b('Write the state meaning in words', 'State નો અર્થ શબ્દોમાં લખો'),
      b(
        'A recurrence is hard to debug when its state is vague. Write “dp[i] means ...” before coding. Common families include stairs and robber (1-D), grid paths (2-D), LCS/edit distance (strings), knapsack/coin change, LIS, and stock trading.',
        'State અસ્પષ્ટ હોય ત્યારે recurrence debug કરવી મુશ્કેલ છે. Code પહેલાં “dp[i] નો અર્થ ...” લખો. સામાન્ય પ્રકારોમાં stairs અને robber (1-D), grid paths (2-D), LCS/edit distance (strings), knapsack/coin change, LIS અને stock trading આવે છે.',
      ),
      'note',
    ),
    complexity(
      'O(n)',
      'O(1)',
      b(
        'Each step is processed once and only the two previous counts are stored.',
        'દરેક step એક વાર process થાય છે અને અગાઉની બે ગણતરીઓ જ રાખવામાં આવે છે.',
      ),
    ),
    list(b('Try these next', 'આગળ આ અજમાવો'), [
      b('Count unique paths in an m by n grid.', 'm by n grid માં unique paths ગણો.'),
      b('Find the longest increasing subsequence.', 'સૌથી લાંબી વધતી subsequence શોધો.'),
      b('Compute the edit distance between two words.', 'બે શબ્દો વચ્ચે edit distance ગણો.'),
    ]),
  ],
  nt: [
    intro(
      b(
        'Number theory gives tools for integer problems: primes, greatest common divisor (GCD), least common multiple (LCM), remainders, and combinations. The right math observation can replace many repeated checks.',
        'Number theory પૂર્ણાંકની સમસ્યાઓ માટે primes, greatest common divisor (GCD), least common multiple (LCM), remainders અને combinations ના tools આપે છે. યોગ્ય ગણિતી વિચાર વારંવારની તપાસ બદલી શકે છે.',
      ),
    ),
    {
      type: 'analogy',
      text: b(
        'The Sieve of Eratosthenes crosses out multiples of 2, then 3, then 5. Values left uncrossed are prime.',
        'Sieve of Eratosthenes માં 2, પછી 3, પછી 5 ના multiples પર લીટી કરો. બાકી રહેલી સંખ્યાઓ prime છે.',
      ),
    },
    heading(b('Prime sieve and modular arithmetic', 'Prime sieve અને modular arithmetic')),
    table(
      [b('Tool', 'Tool'), b('Rule', 'નિયમ'), b('Example', 'ઉદાહરણ')],
      [
        [b('GCD', 'GCD'), 'gcd(a, b) = gcd(b, a % b)', 'gcd(12, 18) = 6'],
        [b('LCM', 'LCM'), 'a / gcd(a,b) * b', 'lcm(12, 18) = 36'],
        [b('Modular sum', 'Modular sum'), '(a + b) % m', 'keep intermediate values small'],
        [
          b('Sieve', 'Sieve'),
          b('Cross multiples starting at p².', 'p² થી multiples પર લીટી કરો.'),
          'primes through 30',
        ],
      ],
    ),
    text(
      b(
        'To find every prime through n, start with a boolean array. For each still-prime p up to √n, mark p², p²+p, and so on as composite; smaller multiples already had a smaller prime factor. Fast modular exponentiation squares the base and halves the exponent each step.',
        'n સુધીના બધા primes માટે boolean array બનાવો. √n સુધીના દરેક હજી-prime p માટે p², p²+p વગેરે composite mark કરો; નાના multiples પહેલેથી નાના prime વડે mark થયા છે. Fast modular exponentiation base ને square કરે અને exponent ને દરેક પગલે અડધો કરે છે.',
      ),
    ),
    code(
      b('Count primes using the sieve', 'Sieve વડે primes ગણો'),
      'function countPrimes(n) {\n  if (n < 2) return 0;\n  const prime = Array(n + 1).fill(true);\n  prime[0] = false;\n  prime[1] = false;\n  for (let p = 2; p * p <= n; p++) {\n    if (!prime[p]) continue;\n    for (let multiple = p * p; multiple <= n; multiple += p) {\n      prime[multiple] = false;\n    }\n  }\n  return prime.filter(Boolean).length;\n}\n\ncountPrimes(10);',
    ),
    trace(
      'countPrimes(10)',
      [
        b('Prime p', 'Prime p'),
        b('Multiples newly crossed', 'નવા mark કરેલા multiples'),
        b('Candidates left', 'બાકી candidates'),
      ],
      [
        ['2', '4, 6, 8, 10', '2, 3, 5, 7'],
        ['3', '9', '2, 3, 5, 7'],
        [b('count', 'ગણતરી'), '—', '4'],
      ],
    ),
    callout(
      b('Large integers need BigInt', 'મોટા integers માટે BigInt જરૂરી'),
      b(
        'JavaScript Number loses integer precision above 2^53 - 1. Use BigInt for large products and modular powers, and remember that BigInt and Number cannot be mixed in arithmetic without an explicit conversion.',
        'JavaScript Number, 2^53 - 1 ઉપર integer precision ગુમાવે છે. મોટા ગુણાકાર અને modular powers માટે BigInt વાપરો; arithmetic માં BigInt અને Number ને explicit conversion વગર ભેળવી શકાતા નથી.',
      ),
      'warning',
    ),
    complexity(
      'O(n log log n)',
      'O(n)',
      b(
        'The sieve marks multiples for each prime and stores one boolean for every integer through n.',
        'Sieve દરેક prime ના multiples mark કરે છે અને n સુધીના દરેક integer માટે એક boolean રાખે છે.',
      ),
    ),
    list(b('Useful patterns', 'ઉપયોગી પદ્ધતિઓ'), [
      b(
        'Many primes in a range: use a sieve; one number: trial division.',
        'Range માં ઘણા primes: sieve; એક સંખ્યા: trial division.',
      ),
      b(
        'Large powers or “answer modulo M”: use modular exponentiation.',
        'મોટી powers કે “જવાબ modulo M”: modular exponentiation વાપરો.',
      ),
      b(
        'Practice Euler’s totient, nCr modulo M, and trailing zeroes in n!.',
        'Euler’s totient, nCr modulo M અને n! ના trailing zeroes અજમાવો.',
      ),
    ]),
  ],
  trie: [
    intro(
      b(
        'A trie (prefix tree) stores words one character at a time. Words with the same beginning share nodes, and a flag marks whether a complete word ends at a node. Operations depend on word length rather than the number of stored words.',
        'Trie (prefix tree) શબ્દોને એક અક્ષર કરીને સાચવે છે. સરખી શરૂઆત ધરાવતા શબ્દો nodes share કરે છે અને node પરનો flag પૂર્ણ શબ્દનો અંત બતાવે છે. Operations સંગ્રહેલા શબ્દોની સંખ્યા કરતાં શબ્દની length પર આધારિત છે.',
      ),
    ),
    {
      type: 'analogy',
      text: b(
        'Phone autocomplete: after typing “ca”, follow the shared c → a path, then list words below it.',
        'Phone autocomplete માં “ca” લખ્યા પછી shared c → a path અનુસરો અને પછી તેની નીચેના શબ્દો બતાવો.',
      ),
    },
    heading(b('A path is not always a word', 'Path હંમેશાં શબ્દ નથી')),
    table(
      [
        b('Query', 'Query'),
        b('Path exists?', 'Path છે?'),
        b('End-of-word flag?', 'શબ્દના અંતનો flag?'),
        b('Answer', 'જવાબ'),
      ],
      [
        ['search("car")', b('yes', 'હા'), b('yes', 'હા'), b('found', 'મળ્યો')],
        ['search("ca")', b('yes', 'હા'), b('no', 'ના'), b('not a word', 'શબ્દ નથી')],
        ['startsWith("ca")', b('yes', 'હા'), b('not required', 'જરૂરી નથી'), b('true', 'true')],
      ],
    ),
    text(
      b(
        'Insert walks each character, creating a child node when missing, then marks the final node as a word. Search follows the same path but succeeds only if the final node’s end flag is set. startsWith only needs the path to exist. Autocomplete walks to the prefix node and explores its descendants.',
        'Insert દરેક અક્ષર પર ચાલે છે, child node ન હોય તો બનાવે છે, અને છેલ્લાં node ને word તરીકે mark કરે છે. Search એ જ path અનુસરે છે, પણ છેલ્લાં node નો end flag set હોય ત્યારે જ સફળ થાય છે. startsWith માટે path હોવો પૂરતો છે. Autocomplete prefix node સુધી જઈ તેના descendants શોધે છે.',
      ),
    ),
    code(
      b('Insert and search a word', 'શબ્દ insert અને search કરો'),
      'class TrieNode {\n  constructor() {\n    this.children = new Map();\n    this.isEnd = false;\n  }\n}\nclass Trie {\n  constructor() { this.root = new TrieNode(); }\n  insert(word) {\n    let node = this.root;\n    for (const ch of word) {\n      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());\n      node = node.children.get(ch);\n    }\n    node.isEnd = true;\n  }\n  search(word) {\n    let node = this.root;\n    for (const ch of word) {\n      node = node.children.get(ch);\n      if (!node) return false;\n    }\n    return node.isEnd;\n  }\n}',
    ),
    trace(
      'insert("cat"), insert("car"), search("ca"), startsWith("ca")',
      [
        b('Operation', 'Operation'),
        b('Path', 'Path'),
        b('End flag', 'End flag'),
        b('Result', 'પરિણામ'),
      ],
      [
        [
          'insert cat',
          'root → c → a → t',
          b('mark t', 't mark કરો'),
          b('word stored', 'શબ્દ સંગ્રહાયો'),
        ],
        [
          'insert car',
          'root → c → a → r',
          b('mark r', 'r mark કરો'),
          b('shared c,a nodes', 'c,a nodes share થયા'),
        ],
        ['search ca', 'root → c → a', b('not set', 'set નથી'), b('false', 'false')],
        ['startsWith ca', 'root → c → a', b('not needed', 'જરૂરી નથી'), b('true', 'true')],
      ],
    ),
    callout(
      b('Search must check the end marker', 'Search એ end marker તપાસવો જોઈએ'),
      b(
        'A prefix such as “ca” may lead to nodes but not be a complete word. Returning true just because the path exists confuses search(word) with startsWith(prefix).',
        '“ca” જેવા prefix સુધી nodes હોઈ શકે, પણ તે પૂર્ણ શબ્દ ન હોય. Path છે એટલા માટે true આપશો તો search(word) અને startsWith(prefix) ભેળવાઈ જશે.',
      ),
      'warning',
    ),
    complexity(
      'O(L) per insert or search',
      'O(total characters stored)',
      b(
        'Each operation walks L characters; nodes are created for prefixes not already shared.',
        'દરેક operation L અક્ષરો ચાલે છે; પહેલેથી share ન થતા prefixes માટે nodes બને છે.',
      ),
    ),
    list(b('Trie use cases', 'Trie ના ઉપયોગો'), [
      b(
        'Autocomplete, spell check, and word search on a board.',
        'Autocomplete, spell check અને board માં word search.',
      ),
      b(
        'Longest common prefix or wildcard word search.',
        'Longest common prefix કે wildcard word search.',
      ),
      b('A bit trie can find maximum XOR pairs.', 'Bit trie maximum XOR pairs શોધી શકે છે.'),
    ]),
  ],
  sm: [
    intro(
      b(
        'String matching finds a pattern inside a text. The naive method tries every starting position and may compare the pattern repeatedly. KMP reuses prefix information, Rabin–Karp uses rolling hashes, and the Z algorithm uses prefix-match lengths.',
        'String matching text માં pattern શોધે છે. Naive રીત દરેક શરૂઆતની position અજમાવે છે અને pattern વારંવાર compare કરી શકે છે. KMP prefix માહિતી ફરી વાપરે છે, Rabin–Karp rolling hashes અને Z algorithm prefix-match lengths વાપરે છે.',
      ),
    ),
    {
      type: 'analogy',
      text: b(
        'Ctrl+F in a document. A smarter search does not restart from the beginning after every mismatch; it keeps what the matching prefix already taught it.',
        'Document માં Ctrl+F. સમજદાર search દરેક mismatch પછી શરૂઆતથી શરૂ કરતું નથી; પહેલેથી મળેલા prefix માંથી શીખેલી માહિતી રાખે છે.',
      ),
    },
    heading(b('KMP remembers matching prefixes', 'KMP matching prefixes યાદ રાખે છે')),
    table(
      ['Index', '0', '1', '2', '3', '4', '5'],
      [
        [b('Pattern', 'Pattern'), 'A', 'B', 'A', 'B', 'A', 'C'],
        ['LPS', '0', '0', '1', '2', '3', '0'],
      ],
    ),
    text(
      b(
        'LPS means Longest Proper Prefix that is also a Suffix. For “ABABA”, the value 3 says “ABA” is both a prefix and a suffix. When a mismatch happens after a partial match, KMP moves the pattern index to lps[j - 1]; the text index never moves backward.',
        'LPS એટલે Longest Proper Prefix that is also a Suffix. “ABABA” માટે 3 નો અર્થ “ABA” prefix પણ છે અને suffix પણ. Partial match પછી mismatch થાય ત્યારે KMP pattern index ને lps[j - 1] પર મૂકે છે; text index પાછળ જતો નથી.',
      ),
    ),
    code(
      b('Naive first-match search', 'Naive first-match search'),
      'function findPattern(text, pattern) {\n  if (pattern.length === 0) return 0;\n  for (let start = 0; start + pattern.length <= text.length; start++) {\n    let j = 0;\n    while (j < pattern.length && text[start + j] === pattern[j]) j++;\n    if (j === pattern.length) return start;\n  }\n  return -1;\n}\n\nfindPattern("hello", "ll");',
    ),
    trace(
      'findPattern("hello", "ll")',
      [b('Start', 'શરૂઆત'), b('Compared characters', 'સરખાવેલા અક્ષરો'), b('Outcome', 'પરિણામ')],
      [
        ['0', '"h" vs "l"', b('mismatch; next start', 'mismatch; આગળની શરૂઆત')],
        ['1', '"e" vs "l"', b('mismatch; next start', 'mismatch; આગળની શરૂઆત')],
        ['2', '"l" = "l", then "l" = "l"', b('match at index 2', 'index 2 પર match')],
      ],
    ),
    callout(
      b('Hash matches need a real comparison', 'Hash match પછી સાચી સરખામણી જરૂરી'),
      b(
        'Rabin–Karp hashes can collide, so verify the actual substring when hashes match. For one small search, indexOf is usually sufficient; KMP is helpful for long text or repeated patterns.',
        'Rabin–Karp hashes collide થઈ શકે છે, એટલે hash મળે ત્યારે actual substring સરખાવો. એક નાની search માટે indexOf સામાન્ય રીતે પૂરતું છે; લાંબા text કે repeated patterns માટે KMP ઉપયોગી છે.',
      ),
      'note',
    ),
    complexity(
      'O(nm) naive; O(n + m) KMP',
      'O(1) naive; O(m) KMP',
      b(
        'Naive search may compare m characters at each of n starts; KMP builds an m-length LPS table and scans the text once.',
        'Naive search n starts પર m અક્ષરો સરખાવી શકે; KMP m-length LPS table બનાવી text એક વાર scan કરે છે.',
      ),
    ),
    list(b('String matching practice', 'String matching practice'), [
      b('Find all occurrences of a pattern in text.', 'Text માં pattern ની બધી occurrences શોધો.'),
      b(
        'Find how many repeats of A contain B as a substring.',
        'A ને કેટલી વાર repeat કરતાં B substring બને તે શોધો.',
      ),
      b(
        'Find the longest prefix that is also a suffix.',
        'Prefix પણ અને suffix પણ હોય તેવો લાંબામાં લાંબો ભાગ શોધો.',
      ),
    ]),
  ],
  rq: [
    intro(
      b(
        'Range-query structures answer repeated questions about an array interval while values may also change. Prefix sums make static range sums fast, but an update would require rebuilding them. Fenwick and segment trees support both point updates and range queries in logarithmic time.',
        'Range-query structures array ના interval વિશેના વારંવારના પ્રશ્નોનો જવાબ આપે છે, જ્યારે values બદલાઈ પણ શકે છે. Static range sums માટે prefix sums ઝડપી છે, પરંતુ update પછી ફરી બનાવવા પડે. Fenwick અને segment trees point updates અને range queries બંને logarithmic time માં કરે છે.',
      ),
    ),
    {
      type: 'analogy',
      text: b(
        'A tournament bracket: each match stores the result for a group. If one player changes, update only the matches on that player’s path rather than replaying the whole tournament.',
        'Tournament bracket માં દરેક match એક group નો result રાખે છે. એક player બદલાય તો આખું tournament ફરી રમવાને બદલે તેના path ના matches update કરો.',
      ),
    },
    heading(b('Segment tree and Fenwick tree', 'Segment tree અને Fenwick tree')),
    table(
      [
        b('Structure', 'Structure'),
        b('Best fit', 'યોગ્ય ઉપયોગ'),
        b('Typical operations', 'સામાન્ય operations'),
      ],
      [
        [
          b('Segment tree', 'Segment tree'),
          b('Sum, min, max, GCD, custom combine', 'Sum, min, max, GCD, custom combine'),
          b('Point update and range query', 'Point update અને range query'),
        ],
        [
          b('Fenwick tree (BIT)', 'Fenwick tree (BIT)'),
          b('Prefix/range sums with point updates', 'Point updates સાથે prefix/range sums'),
          b('Compact, short implementation', 'Compact અને ટૂંકો અમલ'),
        ],
      ],
    ),
    text(
      b(
        'A segment-tree node stores the answer for its range. A query combines the nodes that exactly cover the requested interval; an update recomputes only ancestors on the path to the root. A Fenwick tree uses lowbit(i) = i & -i: updates walk upward by adding lowbit, and prefix queries walk downward by subtracting it.',
        'Segment-tree node પોતાની range નો જવાબ રાખે છે. Query માંગેલા interval ને ઢાંકતા nodes જોડે છે; update root સુધીના path પરના ancestors જ ફરી ગણે છે. Fenwick tree lowbit(i) = i & -i વાપરે છે: update lowbit ઉમેરી ઉપર જાય છે અને prefix query તેને બાદ કરીને નીચે જાય છે.',
      ),
    ),
    code(
      b(
        'Fenwick tree with zero-based public indexes',
        'Zero-based public indexes સાથે Fenwick tree',
      ),
      'class Fenwick {\n  constructor(n) {\n    this.n = n;\n    this.bit = Array(n + 1).fill(0);\n  }\n  add(index, delta) {\n    for (let i = index + 1; i <= this.n; i += i & -i) {\n      this.bit[i] += delta;\n    }\n  }\n  prefix(index) {\n    let sum = 0;\n    for (let i = index + 1; i > 0; i -= i & -i) {\n      sum += this.bit[i];\n    }\n    return sum;\n  }\n  range(left, right) {\n    return this.prefix(right) - (left > 0 ? this.prefix(left - 1) : 0);\n  }\n}',
    ),
    trace(
      'SegmentTree([2,1,5,3]).query(1,2)',
      [
        b('Step', 'પગલું'),
        b('Covered node', 'ઢાંકતો node'),
        b('Added sum', 'ઉમેરાયેલ સરવાળો'),
        b('Running total', 'ચાલુ સરવાળો'),
      ],
      [
        ['1', 'index [1] = 1', '1', '1'],
        ['2', 'index [2] = 5', '5', '6'],
        [b('finish', 'પૂર્ણ'), b('range [1,2]', 'range [1,2]'), '—', '6'],
      ],
    ),
    callout(
      b(
        'Choose the simplest structure that supports the operations',
        'જરૂરી operations માટેનું સૌથી સરળ structure પસંદ કરો',
      ),
      b(
        'A fixed array with many range-sum queries needs only prefix sums. Point updates plus sum queries fit a Fenwick tree. Min/max, custom combine operations, or lazy range updates call for a segment tree. Be careful not to mix zero-based array positions with one-based Fenwick indexes.',
        'સ્થિર array માં ઘણા range-sum queries માટે prefix sums પૂરતા છે. Point updates અને sum queries માટે Fenwick tree યોગ્ય છે. Min/max, custom combine કે lazy range updates માટે segment tree વાપરો. Zero-based array positions ને one-based Fenwick indexes સાથે ભેળવશો નહીં.',
      ),
      'warning',
    ),
    complexity(
      'O(log n) per update or query',
      'O(n)',
      b(
        'Each operation follows or combines a logarithmic number of tree ranges; the structures store a linear number of values.',
        'દરેક operation logarithmic સંખ્યાની tree ranges અનુસરે કે જોડે છે; structures linear સંખ્યામાં values રાખે છે.',
      ),
    ),
    list(b('Try these next', 'આગળ આ અજમાવો'), [
      b('Range minimum query with point updates.', 'Point updates સાથે range minimum query.'),
      b(
        'Count smaller values to the right using a Fenwick tree.',
        'Fenwick tree વડે જમણી બાજુની નાની values ગણો.',
      ),
      b(
        'Support range add and range sum with lazy propagation.',
        'Lazy propagation વડે range add અને range sum કરો.',
      ),
    ]),
  ],
};
