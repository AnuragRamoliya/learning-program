import type { LessonBlock, LocalizedText } from '../../types.js';

const b = (en: string, gu: string): LocalizedText => ({ en, gu });

export const binarySearchLesson: LessonBlock[] = [
  {
    type: 'intro',
    text: b(
      'Binary search finds a target in a sorted collection by repeatedly discarding the half that cannot contain it. Instead of checking every item, it uses the order of the data to make a much smaller search after each comparison.',
      'Binary search sorted collection માં target શોધવા માટે દરેક પગલે જે અડધામાં target ન હોઈ શકે તે દૂર કરે છે. દરેક item તપાસવાને બદલે તે data ના ક્રમનો ઉપયોગ કરીને search વિસ્તાર ઝડપથી નાનો કરે છે.',
    ),
  },
  {
    type: 'analogy',
    text: b(
      'If someone is thinking of a number from 1 to 100, guess 50 first. “Higher” removes 1–50; “lower” removes 51–100. Repeating this question finds the answer in only a few guesses.',
      'કોઈ 1 થી 100 વચ્ચેની સંખ્યા વિચારે તો પહેલાં 50 પૂછો. “મોટી” કહે તો 1–50 દૂર; “નાની” કહે તો 51–100 દૂર. આ રીતે થોડા જ અંદાજમાં જવાબ મળે છે.',
    ),
  },
  {
    type: 'heading',
    text: b('The important requirement: sorted data', 'જરૂરી શરત: sorted data'),
  },
  {
    type: 'text',
    text: b(
      'After checking the middle value, we need to know which side could contain the target. That conclusion is only valid when the values are sorted. Searching an unsorted array with binary search can skip the answer. The method returns an index, so keep track of the original array indexes as the range shrinks.',
      'વચ્ચેની value તપાસ્યા પછી target કઈ બાજુ હોઈ શકે તે નક્કી કરવું પડે છે. Values sorted હોય ત્યારે જ આ નિર્ણય સાચો છે. Unsorted array પર binary search કરવાથી જવાબ રહી શકે. આ રીત index આપે છે, એટલે range નાનો થાય ત્યારે મૂળ array ના indexes જાળવો.',
    ),
  },
  {
    type: 'table',
    columns: [b('Name', 'નામ'), b('Meaning', 'અર્થ'), b('Initial value', 'શરૂઆતની value')],
    rows: [
      ['low', b('First possible index', 'શક્ય પહેલો index'), '0'],
      ['high', b('Last possible index', 'શક્ય છેલ્લો index'), 'arr.length - 1'],
      [
        'mid',
        b('Middle index to inspect', 'તપાસવાનો વચ્ચેનો index'),
        'Math.floor((low + high) / 2)',
      ],
    ],
  },
  {
    type: 'code',
    language: 'javascript',
    caption: b('Iterative binary search', 'Iterative binary search'),
    code: 'function binarySearch(arr, target) {\n  let low = 0;\n  let high = arr.length - 1;\n  while (low <= high) {\n    const mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}\n\nbinarySearch([1, 3, 5, 7, 9], 7);',
  },
  {
    type: 'walkthrough',
    title: b('Keep shrinking the valid range', 'શક્ય range ને નાનો કરતા જાઓ'),
    steps: [
      { line: 2, text: b('Start at the first valid index.', 'શક્ય પહેલા index થી શરૂ કરો.') },
      {
        line: 3,
        text: b(
          'Start high at the last valid index, not arr.length.',
          'high ને છેલ્લાં valid index પર મૂકો, arr.length પર નહીં.',
        ),
      },
      {
        line: 4,
        text: b(
          'The loop runs while at least one candidate remains.',
          'ઓછામાં ઓછો એક candidate બાકી હોય ત્યાં સુધી loop ચાલે છે.',
        ),
      },
      {
        line: 5,
        text: b('Inspect the midpoint of the current range.', 'હાલની range નો મધ્યબિંદુ તપાસો.'),
      },
      {
        line: 7,
        text: b(
          'If the middle is smaller, every index up to mid can be discarded.',
          'વચ્ચેની value નાની હોય તો mid સુધીના બધા indexes કાઢી શકાય.',
        ),
      },
      {
        line: 8,
        text: b(
          'Otherwise discard the middle and everything to its right.',
          'નહીં તો mid અને તેની જમણી બાજુના indexes કાઢો.',
        ),
      },
      {
        line: 10,
        text: b(
          'An empty range means the target was not present.',
          'Range ખાલી થાય તો target હાજર નહોતું.',
        ),
      },
    ],
  },
  {
    type: 'trace',
    input: 'binarySearch([1,3,5,7,9], 7)',
    columns: [
      b('low', 'low'),
      b('high', 'high'),
      b('mid', 'mid'),
      b('arr[mid]', 'arr[mid]'),
      b('Action', 'કામ'),
    ],
    rows: [
      ['0', '4', '2', '5', b('5 < 7; low becomes 3', '5 < 7; low 3 થાય')],
      ['3', '4', '3', '7', b('found at index 3', 'index 3 પર મળ્યું')],
    ],
  },
  {
    type: 'callout',
    variant: 'warning',
    title: b('Avoid infinite loops at the boundaries', 'Boundaries પર infinite loop ટાળો'),
    text: b(
      'When the middle value is too small, set low = mid + 1; when too large, set high = mid - 1. Moving past mid guarantees that the next range is smaller. Using low = mid or high = mid can repeat the same midpoint forever.',
      'વચ્ચેની value નાની હોય તો low = mid + 1 અને મોટી હોય તો high = mid - 1 કરો. mid થી આગળ વધવાથી આગળની range નાની બને છે. low = mid કે high = mid કરવાથી એ જ midpoint વારંવાર આવી શકે.',
    ),
  },
  {
    type: 'complexity',
    time: 'O(log n)',
    space: 'O(1)',
    why: b(
      'The remaining range is halved on each iteration, and the iterative version stores only a few indexes.',
      'દરેક iteration માં બાકી range અડધી થાય છે અને iterative રીત થોડા indexes જ રાખે છે.',
    ),
  },
  { type: 'practice-link', text: b('Try binary search', 'Binary search અજમાવો') },
];

export const sortingLesson: LessonBlock[] = [
  {
    type: 'intro',
    text: b(
      'Sorting rearranges values into an order, such as smallest to largest. Sorted data is easier to scan, compare, and search. Different sorting methods trade simplicity, speed, memory, and behavior on nearly sorted input.',
      'Sorting values ને નાના થી મોટા જેવા ક્રમમાં ગોઠવે છે. Sorted data scan, compare અને search કરવામાં સરળ છે. Sorting methods સરળતા, ઝડપ, memory અને લગભગ sorted input પરના વર્તન વચ્ચે trade-off કરે છે.',
    ),
  },
  {
    type: 'analogy',
    text: b(
      'When arranging playing cards, keep one part of your hand sorted. Take the next card, shift larger cards to make room, then insert it in the gap. This is the basic idea of insertion sort.',
      'Playing cards ગોઠવતી વખતે હાથનો એક ભાગ sorted રાખો. આગળનું card લો, મોટા cards ને જગ્યા કરવા ખસેડો અને ખાલી જગ્યામાં card મૂકો. આ insertion sort નો મૂળ વિચાર છે.',
    ),
  },
  {
    type: 'heading',
    text: b('Compare common sorting approaches', 'સામાન્ય sorting રીતોની સરખામણી'),
  },
  {
    type: 'table',
    columns: [
      b('Algorithm', 'Algorithm'),
      b('Main idea', 'મુખ્ય વિચાર'),
      b('Typical time', 'સામાન્ય સમય'),
    ],
    rows: [
      [
        b('Bubble sort', 'Bubble sort'),
        b('Swap out-of-order neighbors.', 'ખોટા ક્રમના પડોશી values બદલો.'),
        'O(n²)',
      ],
      [
        b('Insertion sort', 'Insertion sort'),
        b('Insert each value into a sorted prefix.', 'દરેક value ને sorted prefix માં મૂકો.'),
        'O(n²) worst case',
      ],
      [
        b('Merge sort', 'Merge sort'),
        b('Split, sort halves, then merge.', 'વહેંચો, halves sort કરો, પછી જોડો.'),
        'O(n log n)',
      ],
      [
        b('Quick sort', 'Quick sort'),
        b('Partition around a pivot.', 'Pivot ની આસપાસ વહેંચો.'),
        'O(n log n) average',
      ],
    ],
  },
  {
    type: 'text',
    text: b(
      'This exercise uses insertion sort so the shifting process is visible. It is not the fastest choice for every large input, but it is easy to understand and performs well when a small array is already almost sorted.',
      'આ exercise insertion sort વાપરે છે જેથી shifting દેખાય. દરેક મોટા input માટે આ સૌથી ઝડપી નથી, પરંતુ સમજવામાં સરળ છે અને નાની array લગભગ sorted હોય ત્યારે સારું કામ કરે છે.',
    ),
  },
  {
    type: 'code',
    language: 'javascript',
    caption: b('Insertion sort that returns a copy', 'Copy આપતું insertion sort'),
    code: 'function sortArray(arr) {\n  const sorted = [...arr];\n  for (let i = 1; i < sorted.length; i++) {\n    const key = sorted[i];\n    let j = i - 1;\n    while (j >= 0 && sorted[j] > key) {\n      sorted[j + 1] = sorted[j];\n      j--;\n    }\n    sorted[j + 1] = key;\n  }\n  return sorted;\n}\n\nsortArray([4, 2, 3]);',
  },
  {
    type: 'walkthrough',
    title: b('Grow the sorted prefix', 'Sorted prefix મોટો કરતા જાઓ'),
    steps: [
      {
        line: 2,
        text: b(
          'Copy first so the caller’s input remains unchanged.',
          'પહેલાં copy કરો જેથી caller નું input ન બદલાય.',
        ),
      },
      {
        line: 3,
        text: b(
          'Begin at index 1; the first item alone is already sorted.',
          'Index 1 થી શરૂ કરો; પહેલો item એકલો પહેલેથી sorted છે.',
        ),
      },
      {
        line: 4,
        text: b(
          'Save the current value because its slot may be overwritten.',
          'હાલની value સાચવો, કારણ કે તેની જગ્યા overwrite થઈ શકે.',
        ),
      },
      {
        line: 6,
        text: b(
          'Shift larger values one position to the right.',
          'મોટી values ને એક જગ્યા જમણી તરફ ખસેડો.',
        ),
      },
      {
        line: 9,
        text: b(
          'Put the saved key in the gap left by those shifts.',
          'Shifts પછી ખાલી થયેલી જગ્યામાં સાચવેલી key મૂકો.',
        ),
      },
      { line: 12, text: b('Return the sorted copy.', 'Sorted copy આપો.') },
    ],
  },
  {
    type: 'trace',
    input: 'sortArray([4,2,3])',
    columns: ['i', b('key', 'key'), b('Action', 'કામ'), b('Array after pass', 'Pass પછીની array')],
    rows: [
      ['1', '2', b('shift 4; insert 2', '4 ખસેડો; 2 મૂકો'), '[2, 4, 3]'],
      ['2', '3', b('shift 4; insert 3', '4 ખસેડો; 3 મૂકો'), '[2, 3, 4]'],
    ],
  },
  {
    type: 'callout',
    variant: 'tip',
    title: b('Duplicates stay in the result', 'Duplicates result માં રહે છે'),
    text: b(
      'The comparison uses > rather than >=. Equal values are not shifted past one another, and every input value is copied into the output exactly once. Sorting changes order, not the number of items.',
      'Comparison માં > વપરાય છે, >= નહીં. સમાન values એકબીજાથી આગળ ખસતી નથી અને દરેક input value output માં એક વાર આવે છે. Sorting ક્રમ બદલે છે, items ની સંખ્યા નહીં.',
    ),
  },
  {
    type: 'complexity',
    time: 'O(n²)',
    space: 'O(n)',
    why: b(
      'In the worst case each key shifts across the sorted prefix, and the copied array stores n values.',
      'Worst case માં દરેક key sorted prefix માંથી ખસે છે અને copied array n values રાખે છે.',
    ),
  },
  { type: 'practice-link', text: b('Try insertion sort', 'Insertion sort અજમાવો') },
];

export const bitwiseLesson: LessonBlock[] = [
  {
    type: 'intro',
    text: b(
      'Computers represent whole numbers with bits: binary digits that are either 0 or 1. Bitwise operators compare or move these positions directly. They are useful for compact flags and certain number patterns, but the binary representation can be less familiar than ordinary arithmetic.',
      'Computers પૂર્ણાંકોને bits વડે રજૂ કરે છે: binary digits જે 0 અથવા 1 હોય છે. Bitwise operators આ positions ને સીધી compare કે move કરે છે. Compact flags અને કેટલીક number patterns માં તે ઉપયોગી છે, પરંતુ binary representation સામાન્ય arithmetic કરતાં અજાણી લાગી શકે.',
    ),
  },
  {
    type: 'analogy',
    text: b(
      'Think of a row of switches. Each switch is either off (0) or on (1). AND keeps a switch on only when both rows have it on; XOR keeps it on when the two rows differ.',
      'Switches ની એક row વિચારો. દરેક switch બંધ (0) અથવા ચાલુ (1) હોય છે. AND બંને rows માં switch ચાલુ હોય ત્યારે જ ચાલુ રાખે છે; XOR બંને rows જુદી હોય ત્યારે ચાલુ રાખે છે.',
    ),
  },
  {
    type: 'heading',
    text: b('Read the basic operators', 'મૂળ operators સમજો'),
  },
  {
    type: 'table',
    columns: [b('Operator', 'Operator'), b('Meaning', 'અર્થ'), b('Example', 'ઉદાહરણ')],
    rows: [
      ['&', b('AND: both bits must be 1', 'AND: બંને bits 1 હોવા જોઈએ'), '110 & 101 = 100'],
      ['|', b('OR: either bit is 1', 'OR: કોઈ એક bit 1 હોય'), '110 | 101 = 111'],
      ['^', b('XOR: bits differ', 'XOR: bits જુદા હોય'), '110 ^ 101 = 011'],
      ['<<', b('Shift left', 'ડાબે shift'), '0011 << 1 = 0110'],
      ['>>', b('Shift right', 'જમણે shift'), '1100 >> 1 = 0110'],
    ],
  },
  {
    type: 'text',
    text: b(
      'The power-of-two trick depends on two facts. A positive power of two has one set bit: 8 is 1000 in binary. Subtracting one turns that bit off and all lower bits on: 7 is 0111. The two values therefore have no 1-bit in common.',
      'Power-of-two trick બે વાત પર આધારિત છે. ધન power of two માં એક જ set bit હોય છે: binary માં 8 એટલે 1000. એક ઘટાડવાથી તે bit બંધ અને નીચેના બધા bits ચાલુ થાય: 7 એટલે 0111. એટલે બંને values માં કોઈ સામાન્ય 1-bit રહેતો નથી.',
    ),
  },
  {
    type: 'code',
    language: 'javascript',
    caption: b('Check a positive integer for one set bit', 'ધન પૂર્ણાંકમાં એક set bit તપાસો'),
    code: 'function isPowerOfTwo(n) {\n  return n > 0 && (n & (n - 1)) === 0;\n}\n\nisPowerOfTwo(8);',
  },
  {
    type: 'walkthrough',
    title: b('Clear the lowest set bit', 'સૌથી જમણો set bit દૂર કરો'),
    steps: [
      {
        line: 2,
        text: b(
          'Reject zero and negatives; a power of two here is positive.',
          'Zero અને ઋણ સંખ્યાઓ નકારો; અહીં power of two ધન છે.',
        ),
      },
      {
        line: 2,
        text: b(
          'n - 1 changes the lowest set bit and the bits below it.',
          'n - 1 સૌથી જમણા set bit અને તેની નીચેના bits બદલે છે.',
        ),
      },
      {
        line: 2,
        text: b(
          'AND is zero when n had exactly one set bit.',
          'n માં માત્ર એક set bit હોય ત્યારે AND શૂન્ય મળે છે.',
        ),
      },
      {
        line: 5,
        text: b('For 8, compare binary 1000 with 0111.', '8 માટે binary 1000 ને 0111 સાથે સરખાવો.'),
      },
    ],
  },
  {
    type: 'trace',
    input: 'isPowerOfTwo(8)',
    columns: [b('Value', 'Value'), b('Binary (4 bits)', 'Binary (4 bits)'), b('Check', 'તપાસ')],
    rows: [
      ['n = 8', '1000', b('positive', 'ધન')],
      ['n - 1 = 7', '0111', b('subtract one', 'એક ઘટાડો')],
      ['8 & 7', '0000', b('zero; return true', 'શૂન્ય; true આપો')],
    ],
  },
  {
    type: 'callout',
    variant: 'warning',
    title: b(
      'JavaScript bitwise operators use 32-bit integers',
      'JavaScript bitwise operators 32-bit integers વાપરે છે',
    ),
    text: b(
      'JavaScript converts Number operands to signed 32-bit integers for these operators. This common trick is intended for positive integer inputs within the problem’s stated range. For larger integer ranges, use a BigInt-based approach and confirm the constraints first.',
      'JavaScript આ operators માટે Number operands ને signed 32-bit integers માં ફેરવે છે. આ સામાન્ય trick પ્રશ્નની આપેલી range માંના ધન પૂર્ણાંક માટે છે. મોટી integer range માટે BigInt આધારિત રીત વાપરો અને પહેલાં constraints તપાસો.',
    ),
  },
  {
    type: 'complexity',
    time: 'O(1)',
    space: 'O(1)',
    why: b(
      'The check performs a fixed number of operations on a fixed-width integer representation.',
      'આ તપાસ fixed-width integer representation પર નિશ્ચિત સંખ્યાના operations કરે છે.',
    ),
  },
  { type: 'practice-link', text: b('Try the power-of-two problem', 'Power-of-two problem અજમાવો') },
];

export const hashingLesson: LessonBlock[] = [
  {
    type: 'intro',
    text: b(
      'A Map stores key-value pairs so later code can look up information by key. A Set stores unique values and answers membership questions. These structures often replace repeated searching through an array, trading extra memory for faster lookups.',
      'Map key-value pairs રાખે છે જેથી code પછી key વડે માહિતી શોધી શકે. Set unique values રાખે છે અને કોઈ value છે કે નહીં તેનો જવાબ આપે છે. આ structures ઘણી વાર array માં વારંવાર શોધવાની જરૂર દૂર કરે છે; બદલામાં વધુ memory વાપરે છે.',
    ),
  },
  {
    type: 'analogy',
    text: b(
      'A coat-check ticket is a key. Instead of scanning every coat, the attendant uses the ticket to jump to the matching place. A Map plays a similar role: store a useful value under a key and retrieve it later.',
      'Coat-check ticket એક key છે. દરેક coat તપાસવાને બદલે attendant ticket વડે યોગ્ય જગ્યાએ જાય છે. Map પણ એવું જ કરે છે: key હેઠળ value સાચવે છે અને પછી પાછી મેળવે છે.',
    ),
  },
  {
    type: 'heading',
    text: b('Map versus Set', 'Map અને Set'),
  },
  {
    type: 'table',
    columns: [
      b('Structure', 'Structure'),
      b('Stores', 'શું રાખે છે'),
      b('Typical question', 'સામાન્ય પ્રશ્ન'),
    ],
    rows: [
      [
        b('Map', 'Map'),
        b('Key → value', 'Key → value'),
        b('What value is stored for this key?', 'આ key માટે કઈ value છે?'),
      ],
      [
        b('Set', 'Set'),
        b('Unique values', 'Unique values'),
        b('Have we seen this value?', 'આ value પહેલાં જોઈ છે?'),
      ],
    ],
  },
  {
    type: 'text',
    text: b(
      'The Two Sum pattern scans once. For each number, compute the complement needed to reach the target. Look for that complement among earlier values; if it is missing, remember the current number and its index. Checking before storing prevents an item from being paired with itself.',
      'Two Sum pattern એક વાર scan કરે છે. દરેક number માટે target સુધી પહોંચવા જરૂરી complement શોધો. અગાઉની values માં complement હોય તો ઉકેલ મળ્યો; ન હોય તો હાલનો number અને index સાચવો. Store કરતાં પહેલાં check કરવાથી item પોતે પોતાની સાથે pair થતો નથી.',
    ),
  },
  {
    type: 'code',
    language: 'javascript',
    caption: b('Remember earlier values and their indexes', 'અગાઉની values અને indexes યાદ રાખો'),
    code: 'function twoSum(nums, target) {\n  const seen = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const need = target - nums[i];\n    if (seen.has(need)) return [seen.get(need), i];\n    seen.set(nums[i], i);\n  }\n}\n\ntwoSum([2, 7, 11, 15], 9);',
  },
  {
    type: 'walkthrough',
    title: b('Look backward with the Map', 'Map વડે પાછળની values જુઓ'),
    steps: [
      { line: 2, text: b('Start with no values seen.', 'શરૂઆતમાં કોઈ value જોઈ નથી.') },
      {
        line: 3,
        text: b(
          'Visit each number once, from left to right.',
          'દરેક number ને ડાબેથી જમણે એક વાર જુઓ.',
        ),
      },
      {
        line: 4,
        text: b(
          'Compute the partner required to make the target.',
          'Target બનાવવા જરૂરી partner ગણો.',
        ),
      },
      {
        line: 5,
        text: b(
          'If an earlier partner exists, return its index and i.',
          'અગાઉનો partner હોય તો તેનો index અને i આપો.',
        ),
      },
      {
        line: 6,
        text: b(
          'Only when none exists, save this number for later items.',
          'Partner ન હોય ત્યારે જ આ number આગળના items માટે સાચવો.',
        ),
      },
    ],
  },
  {
    type: 'trace',
    input: 'twoSum([2,7,11,15], 9)',
    columns: [
      'i',
      b('num', 'num'),
      b('need = target - num', 'need = target - num'),
      b('Map before check', 'Check પહેલાં Map'),
      b('Result', 'પરિણામ'),
    ],
    rows: [
      ['0', '2', '7', '{}', b('not found; store 2 → 0', 'નથી મળ્યું; 2 → 0 સાચવો')],
      ['1', '7', '2', '{2: 0}', b('found index 0 → [0, 1]', 'index 0 મળ્યો → [0, 1]')],
    ],
  },
  {
    type: 'callout',
    variant: 'note',
    title: b(
      'The Map must store indexes, not just values',
      'Map માં માત્ર values નહીં, indexes સાચવો',
    ),
    text: b(
      'The required output is a pair of positions, so each Map value is the index where its key appeared. Checking before set also handles duplicates correctly: with [3, 3] and target 6, the second 3 finds the first 3’s index.',
      'જવાબ positions ની જોડી છે, એટલે Map ની દરેક value એ key કયા index પર આવી તેનો index છે. set કરતાં પહેલાં check કરવાથી duplicates પણ સાચા મળે: [3, 3] અને target 6 માં બીજો 3 પહેલા 3 નો index શોધે છે.',
    ),
  },
  {
    type: 'complexity',
    time: 'O(n)',
    space: 'O(n)',
    why: b(
      'Each number performs one expected-constant-time Map lookup and may add one entry.',
      'દરેક number એક expected-constant-time Map lookup કરે છે અને વધુમાં વધુ એક entry ઉમેરે છે.',
    ),
  },
  { type: 'practice-link', text: b('Try the Two Sum problem', 'Two Sum problem અજમાવો') },
];
