import type { LessonBlock, LocalizedText } from '../../types.js';

const b = (en: string, gu: string): LocalizedText => ({ en, gu });

export const recursionLesson: LessonBlock[] = [
  {
    type: 'intro',
    text: b(
      'Recursion is a way to solve a problem by having a function solve a smaller version of the same problem. It is useful when a task naturally breaks into similar sub-tasks, such as counting down, walking a tree, or exploring choices.',
      'Recursion એટલે function દ્વારા એ જ problem નું નાનું સ્વરૂપ ઉકેલવું. Counting down, tree માં આગળ વધવું અથવા અલગ choices તપાસવી જેવી સમસ્યાઓમાં આ રીત ઉપયોગી છે.',
    ),
  },
  {
    type: 'analogy',
    text: b(
      'Imagine opening nested boxes. Each box contains a smaller box, until the last one is empty. The empty box is the stopping point; without it, you would keep opening boxes forever.',
      'એકની અંદર એક નાનાં boxes છે એવી કલ્પના કરો. દરેક box માં વધુ નાનું box છે, જ્યાં સુધી છેલ્લું ખાલી ન મળે. ખાલી box રોકાવાનો આધાર છે; તે ન હોય તો પ્રક્રિયા ક્યારેય અટકે નહીં.',
    ),
  },
  {
    type: 'heading',
    text: b('The two essential parts', 'બે જરૂરી ભાગો'),
  },
  {
    type: 'list',
    items: [
      b(
        'Base case: the smallest version of the problem, which can be answered immediately.',
        'Base case: problem નું સૌથી નાનું સ્વરૂપ, જેનો જવાબ તરત આપી શકાય.',
      ),
      b(
        'Recursive case: make progress by calling the function again with a smaller input.',
        'Recursive case: નાનું input આપીને function ને ફરી call કરો, જેથી ઉકેલ તરફ આગળ વધો.',
      ),
      b(
        'Each call has its own local values and waits on the call stack for the smaller call to return.',
        'દરેક call ના પોતાના local values હોય છે અને નાનો call પાછો આવે ત્યાં સુધી તે call stack પર રાહ જુએ છે.',
      ),
    ],
  },
  {
    type: 'heading',
    text: b('Example: factorial', 'ઉદાહરણ: factorial'),
  },
  {
    type: 'text',
    text: b(
      'The factorial of n (written n!) is n × (n − 1) × ... × 1. We define 0! as 1. The repeated relationship n! = n × (n − 1)! gives us a natural recursive solution.',
      'n નું factorial (n!) એટલે n × (n − 1) × ... × 1. 0! ને 1 માનીએ છીએ. n! = n × (n − 1)! નો વારંવાર લાગુ પડતો સંબંધ recursive ઉકેલ આપે છે.',
    ),
  },
  {
    type: 'code',
    language: 'javascript',
    caption: b('A recursive factorial', 'Recursive factorial'),
    code: 'function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\n\nfactorial(4);',
  },
  {
    type: 'walkthrough',
    title: b('Read the function from top to bottom', 'Function ને ઉપરથી નીચે વાંચો'),
    steps: [
      {
        line: 1,
        text: b('The function receives the current number n.', 'Function હાલની n સંખ્યા મેળવે છે.'),
      },
      {
        line: 2,
        text: b(
          'When n is 1 or smaller, return 1 and stop making calls.',
          'n 1 કે તેનાથી નાનું હોય ત્યારે 1 આપો અને નવા calls રોકો.',
        ),
      },
      {
        line: 3,
        text: b(
          'Otherwise, pause this call and ask for factorial(n - 1).',
          'નહીં તો હાલનો call રોકીને factorial(n - 1) નો જવાબ માંગો.',
        ),
      },
      {
        line: 6,
        text: b(
          'For factorial(4), the calls reach factorial(1), then return back up.',
          'factorial(4) માં calls factorial(1) સુધી જાય છે અને પછી જવાબો પાછા ઉપર આવે છે.',
        ),
      },
    ],
  },
  {
    type: 'trace',
    input: 'factorial(4)',
    columns: [
      b('Call', 'Call'),
      b('Work waiting to finish', 'બાકી રહેલું કામ'),
      b('Returned value', 'પાછો મળેલો જવાબ'),
    ],
    rows: [
      ['factorial(4)', '4 × factorial(3)', '24'],
      ['factorial(3)', '3 × factorial(2)', '6'],
      ['factorial(2)', '2 × factorial(1)', '2'],
      ['factorial(1)', 'base case returns 1', '1'],
      [b('Unwind', 'પાછા આવવું'), '2 × 1, then 3 × 2, then 4 × 6', '24'],
    ],
  },
  {
    type: 'callout',
    variant: 'warning',
    title: b(
      'Check that every call moves toward the base case',
      'દરેક call base case તરફ જાય છે તેની ખાતરી કરો',
    ),
    text: b(
      'If the input does not get smaller (or otherwise closer to a stopping condition), the calls may continue until JavaScript runs out of call-stack space. Try factorial(4), factorial(3), factorial(2), factorial(1) on paper before coding.',
      'Input નાનું ન થાય (અથવા રોકાવાની શરતની નજીક ન જાય) તો JavaScript ની call-stack memory પૂરી થાય ત્યાં સુધી calls ચાલતા રહી શકે છે. Code લખતા પહેલાં factorial(4), factorial(3), factorial(2), factorial(1) કાગળ પર લખો.',
    ),
  },
  {
    type: 'complexity',
    time: 'O(n)',
    space: 'O(n)',
    why: b(
      'There is one call per number down to 1, and those calls occupy stack frames until they return.',
      '1 સુધી દરેક સંખ્યા માટે એક call થાય છે અને પાછા ફર્યા સુધી તે stack frame માં રહે છે.',
    ),
  },
  {
    type: 'list',
    title: b('A safe recursion checklist', 'Recursion માટે સલામત checklist'),
    ordered: true,
    items: [
      b('State the base case first.', 'પહેલાં base case નક્કી કરો.'),
      b('Make each call reduce the remaining work.', 'દરેક call માં બાકીનું કામ ઓછું કરો.'),
      b(
        'Trust that the smaller call returns the answer for its smaller input.',
        'નાના input માટેનો જવાબ નાના call પાસેથી આવશે તે માન્ય રાખો.',
      ),
      b(
        'Combine that answer with the current call’s work.',
        'નાના call ના જવાબને હાલના call ના કામ સાથે જોડો.',
      ),
    ],
  },
  {
    type: 'practice-link',
    text: b('Try the factorial problem', 'Factorial problem અજમાવો'),
  },
];

export const mathsLesson: LessonBlock[] = [
  {
    type: 'intro',
    text: b(
      'Math patterns help us replace repeated work with a short rule. In coding problems, common tools include remainders for digits and parity, factor pairs for divisibility, and careful loop bounds for primes and printed patterns.',
      'Math patterns વારંવારના કામને ટૂંકા નિયમથી ઉકેલવામાં મદદ કરે છે. Coding માં digits અને even/odd માટે remainder, divisibility માટે factor pairs અને prime તપાસવા માટે યોગ્ય loop bounds સામાન્ય tools છે.',
    ),
  },
  {
    type: 'analogy',
    text: b(
      'Think of factors as partners. If 29 had a factor larger than its square root, it would have a matching factor smaller than the square root. Once all smaller partners are ruled out, no larger one can remain.',
      'Factors ને જોડીદાર તરીકે વિચારો. 29 નો કોઈ factor તેના square root કરતાં મોટો હોય તો તેની સાથે નાનો factor પણ હશે. બધા નાના જોડીદારો તપાસ્યા પછી મોટો factor બાકી રહી શકતો નથી.',
    ),
  },
  {
    type: 'heading',
    text: b('Three small math tools', 'ગણિતનાં ત્રણ નાના tools'),
  },
  {
    type: 'table',
    columns: [
      b('Question', 'પ્રશ્ન'),
      b('Useful operation', 'ઉપયોગી operation'),
      b('Example', 'ઉદાહરણ'),
    ],
    rows: [
      [b('Is n even?', 'n even છે?'), 'n % 2', '8 % 2 === 0'],
      [b('What is the last digit?', 'છેલ્લો digit કયો?'), 'n % 10', '347 % 10 === 7'],
      [
        b('Remove the last digit', 'છેલ્લો digit દૂર કરો'),
        'Math.floor(n / 10)',
        'Math.floor(347 / 10) === 34',
      ],
    ],
  },
  {
    type: 'text',
    text: b(
      'The remainder operator (%) gives what is left after division. For positive whole numbers, n % 2 is 0 for even numbers and 1 for odd numbers. Repeatedly taking n % 10 and then Math.floor(n / 10) lets you inspect a number one digit at a time.',
      'Remainder operator (%) ભાગાકાર પછી બચેલો ભાગ આપે છે. ધન પૂર્ણાંક માટે even સંખ્યામાં n % 2 શૂન્ય અને odd માં એક થાય છે. n % 10 લીધા પછી Math.floor(n / 10) કરતા જઈને દરેક digit અલગ તપાસી શકાય છે.',
    ),
  },
  {
    type: 'heading',
    text: b('Example: test whether a number is prime', 'ઉદાહરણ: સંખ્યા prime છે કે નહીં'),
  },
  {
    type: 'text',
    text: b(
      'A prime number is an integer greater than 1 with exactly two positive divisors: 1 and itself. Values 0, 1, and negatives are not prime. To test a candidate, try divisors from 2 upward; if one divides evenly, the number is composite.',
      'Prime સંખ્યા 1 કરતાં મોટો એવો પૂર્ણાંક છે જેના માત્ર બે ધન divisors હોય: 1 અને તે પોતે. 0, 1 અને ઋણ સંખ્યાઓ prime નથી. Candidate તપાસવા 2 થી divisors અજમાવો; કોઈ divisor બાકી વગર ભાગે તો સંખ્યા composite છે.',
    ),
  },
  {
    type: 'code',
    language: 'javascript',
    caption: b('Check divisors only as far as needed', 'જરૂર હોય ત્યાં સુધી જ divisors તપાસો'),
    code: 'function isPrime(n) {\n  if (n < 2) return false;\n  for (let d = 2; d * d <= n; d++) {\n    if (n % d === 0) return false;\n  }\n  return true;\n}\n\nisPrime(29);',
  },
  {
    type: 'walkthrough',
    title: b('Why the square-root boundary works', 'Square-root સુધી તપાસવું કેમ પૂરતું છે'),
    steps: [
      {
        line: 2,
        text: b(
          'Reject every value below 2 immediately.',
          '2 કરતાં નાની દરેક value ને તરત નકારી દો.',
        ),
      },
      {
        line: 3,
        text: b(
          'Continue while d × d is at most n; this avoids calculating a rounded square root.',
          'd × d, n જેટલું કે નાનું હોય ત્યાં સુધી ચાલુ રાખો; rounded square root ની ગણતરી કરવાની જરૂર રહેતી નથી.',
        ),
      },
      {
        line: 4,
        text: b(
          'A zero remainder proves that d is a divisor.',
          'Remainder શૂન્ય હોય તો d divisor છે તે સાબિત થાય છે.',
        ),
      },
      {
        line: 7,
        text: b('If no divisor was found, return true.', 'કોઈ divisor ન મળે તો true આપો.'),
      },
    ],
  },
  {
    type: 'trace',
    input: 'isPrime(29)',
    columns: [
      b('d', 'd'),
      b('d × d <= 29?', 'd × d <= 29?'),
      b('29 % d', '29 % d'),
      b('Decision', 'નિર્ણય'),
    ],
    rows: [
      ['2', '4 <= 29', '1', b('keep checking', 'તપાસ ચાલુ રાખો')],
      ['3', '9 <= 29', '2', b('keep checking', 'તપાસ ચાલુ રાખો')],
      ['4', '16 <= 29', '1', b('keep checking', 'તપાસ ચાલુ રાખો')],
      ['5', '25 <= 29', '4', b('keep checking', 'તપાસ ચાલુ રાખો')],
      ['6', '36 > 29', b('not evaluated', 'તપાસ્યું નથી'), b('stop; prime', 'રોકો; prime')],
    ],
  },
  {
    type: 'callout',
    variant: 'tip',
    title: b(
      'Pattern printing: rows outside, columns inside',
      'Pattern printing: બહાર rows, અંદર columns',
    ),
    text: b(
      'For a rectangle, the outer loop chooses a row and the inner loop prints the items in that row. For a triangle, the inner loop can run from 1 through the current row number. Write the first few rows by hand to discover the loop bounds.',
      'Rectangle માટે outer loop row પસંદ કરે છે અને inner loop તે row ના items print કરે છે. Triangle માં inner loop 1 થી હાલના row number સુધી ચાલી શકે છે. Loop bounds શોધવા પહેલાં શરૂઆતની rows હાથથી લખો.',
    ),
  },
  {
    type: 'complexity',
    time: 'O(√n)',
    space: 'O(1)',
    why: b(
      'The divisor loop stops after roughly the square root of n and stores only a few variables.',
      'Divisor loop લગભગ n ના square root પછી અટકે છે અને થોડા variables જ રાખે છે.',
    ),
  },
  {
    type: 'practice-link',
    text: b('Try the prime-number problem', 'Prime-number problem અજમાવો'),
  },
];

export const arraysLesson: LessonBlock[] = [
  {
    type: 'intro',
    text: b(
      'An array keeps values in an ordered sequence. Each item has an index starting at 0, so arr[0] is the first item and arr[arr.length - 1] is the last. Arrays are useful when you need to scan, reorder, or collect many values.',
      'Array values ને ક્રમમાં રાખે છે. દરેક item નો index 0 થી શરૂ થાય છે, એટલે arr[0] પહેલો item અને arr[arr.length - 1] છેલ્લો item છે. Values scan, reorder અથવા ભેગી કરવા arrays ઉપયોગી છે.',
    ),
  },
  {
    type: 'analogy',
    text: b(
      'Picture a row of numbered lockers. Opening locker 8 by its number is direct. Inserting a new locker at the front is different: all existing items need to shift to make room.',
      'નંબરવાળા lockers ની એક લાઇન વિચારો. નંબર પરથી locker 8 ખોલવું સીધું છે. આગળ નવો locker ઉમેરવો જુદું છે: જગ્યા બનાવવા હાલના items ખસેડવા પડે.',
    ),
  },
  {
    type: 'heading',
    text: b('Array operations and their costs', 'Array operations અને તેમનો ખર્ચ'),
  },
  {
    type: 'table',
    columns: [b('Operation', 'Operation'), b('Typical cost', 'સામાન્ય ખર્ચ'), b('Reason', 'કારણ')],
    rows: [
      [
        b('Read or update by index', 'Index પરથી વાંચવું કે બદલવું'),
        'O(1)',
        b('Jump directly to the indexed slot.', 'Index વાળી જગ્યા પર સીધા જાઓ.'),
      ],
      [
        b('Search an unsorted array', 'Unsorted array માં શોધવું'),
        'O(n)',
        b('May need to inspect every item.', 'દરેક item તપાસવો પડી શકે.'),
      ],
      [
        b('Insert near the front', 'આગળ item ઉમેરવો'),
        'O(n)',
        b('Later items shift to make room.', 'જગ્યા માટે પાછળના items ખસે છે.'),
      ],
      [
        b('Append at the end', 'છેલ્લે ઉમેરવું'),
        b('O(1) amortized', 'સરેરાશ O(1)'),
        b('Most appends do not move existing items.', 'મોટાભાગે હાલના items ખસતા નથી.'),
      ],
    ],
  },
  {
    type: 'heading',
    text: b('Example: move zeroes to the end', 'ઉદાહરણ: zeroes ને અંતે ખસેડો'),
  },
  {
    type: 'text',
    text: b(
      'The task is to keep every non-zero number in its original order, then put the same number of zeroes at the end. A simple, safe plan is to make a new array containing only non-zero values and append zeroes until its length matches the input.',
      'કામ એ છે કે બધા non-zero numbers નો મૂળ ક્રમ જળવાય અને zeroes અંતે આવે. સરળ અને સુરક્ષિત રીત: non-zero values ની નવી array બનાવો અને તેની length input જેટલી થાય ત્યાં સુધી zeroes ઉમેરો.',
    ),
  },
  {
    type: 'code',
    language: 'javascript',
    caption: b('Build a result without changing the input', 'Input બદલ્યા વગર result બનાવો'),
    code: 'function moveZeros(arr) {\n  const result = arr.filter((value) => value !== 0);\n  while (result.length < arr.length) {\n    result.push(0);\n  }\n  return result;\n}\n\nmoveZeros([0, 1, 0, 3, 12]);',
  },
  {
    type: 'walkthrough',
    title: b('Follow the data through the code', 'Code માં data નો પ્રવાહ જુઓ'),
    steps: [
      {
        line: 2,
        text: b(
          'filter creates a new array and keeps values that are not zero, in order.',
          'filter નવી array બનાવે છે અને zero સિવાયની values ને ક્રમમાં રાખે છે.',
        ),
      },
      {
        line: 3,
        text: b(
          'Compare the result length with the original length.',
          'Result ની length ને મૂળ length સાથે સરખાવો.',
        ),
      },
      {
        line: 4,
        text: b(
          'Append one zero for each missing position.',
          'દરેક ખાલી position માટે એક zero ઉમેરો.',
        ),
      },
      {
        line: 6,
        text: b(
          'Return the new array; the input was never edited.',
          'નવી array આપો; input માં ફેરફાર થયો નથી.',
        ),
      },
    ],
  },
  {
    type: 'trace',
    input: 'moveZeros([0,1,0,3,12])',
    columns: [b('Stage', 'તબક્કો'), b('Array', 'Array'), b('What changed?', 'શું બદલાયું?')],
    rows: [
      [b('Input', 'Input'), '[0, 1, 0, 3, 12]', b('Original values', 'મૂળ values')],
      [
        b('After filter', 'Filter પછી'),
        '[1, 3, 12]',
        b('Zeroes removed; order kept', 'Zeroes દૂર; ક્રમ જળવાયો'),
      ],
      [
        b('Append zeroes', 'Zeroes ઉમેરો'),
        '[1, 3, 12, 0, 0]',
        b('Length is back to 5', 'Length ફરી 5 થઈ'),
      ],
    ],
  },
  {
    type: 'callout',
    variant: 'note',
    title: b('Order is part of the requirement', 'ક્રમ પણ requirement નો ભાગ છે'),
    text: b(
      'For input [0, 1, 0, 3, 12], the non-zero result must be [1, 3, 12], not [12, 3, 1]. When a prompt says “keep the order,” prefer a stable pass that never rearranges kept values.',
      'Input [0, 1, 0, 3, 12] માટે non-zero result [1, 3, 12] હોવો જોઈએ, [12, 3, 1] નહીં. Prompt “ક્રમ જાળવો” કહે ત્યારે values ને ફરી ગોઠવ્યા વગર stable રીત વાપરો.',
    ),
  },
  {
    type: 'complexity',
    time: 'O(n)',
    space: 'O(n)',
    why: b(
      'filter examines each input value once, and the new result can hold up to n values.',
      'filter દરેક input value ને એક વાર તપાસે છે અને નવી result માં વધુમાં વધુ n values રહે છે.',
    ),
  },
  {
    type: 'practice-link',
    text: b('Try the move-zeroes problem', 'Move-zeroes problem અજમાવો'),
  },
];

export const stringsLesson: LessonBlock[] = [
  {
    type: 'intro',
    text: b(
      'A string is an ordered sequence of characters. Its indexes start at 0, just like an array, but JavaScript strings are immutable: you can read a character, but you cannot replace it in place. String methods create new strings rather than changing the original.',
      'String અક્ષરોની ક્રમબદ્ધ શ્રેણી છે. તેના indexes પણ array ની જેમ 0 થી શરૂ થાય છે, પરંતુ JavaScript strings immutable છે: અક્ષર વાંચી શકાય, પણ એ જ જગ્યાએ બદલી શકાતો નથી. String methods મૂળ string બદલવાને બદલે નવી string બનાવે છે.',
    ),
  },
  {
    type: 'analogy',
    text: b(
      'A string is like text printed on a card. You can point to a letter, but correcting it means making a new card with the updated text.',
      'String ને card પર છપાયેલા લખાણ તરીકે વિચારો. અક્ષર તરફ ઇશારો કરી શકાય, પણ તેને સુધારવા માટે સુધારેલા લખાણ સાથે નવું card બનાવવું પડે.',
    ),
  },
  {
    type: 'heading',
    text: b('Read strings with indexes', 'Indexes વડે string વાંચો'),
  },
  {
    type: 'code',
    language: 'javascript',
    caption: b('Character positions in a word', 'શબ્દમાં અક્ષરોની positions'),
    code: 'const word = "code";\nword[0]; // "c"\nword[3]; // "e"\nword.length; // 4',
  },
  {
    type: 'table',
    columns: [b('Expression', 'Expression'), b('Value', 'Value'), b('Meaning', 'અર્થ')],
    rows: [
      ['word[0]', '"c"', b('First character', 'પહેલો અક્ષર')],
      ['word[word.length - 1]', '"e"', b('Last character', 'છેલ્લો અક્ષર')],
      ['word.length', '4', b('Number of characters', 'અક્ષરોની સંખ્યા')],
    ],
  },
  {
    type: 'heading',
    text: b('Example: check for a palindrome', 'ઉદાહરણ: palindrome તપાસો'),
  },
  {
    type: 'text',
    text: b(
      'A palindrome reads the same forward and backward, such as “Racecar” when letter case is ignored. Normalize the case first, then compare the outside characters and move inward. A mismatch proves the string is not a palindrome, so there is no need to inspect the rest.',
      'Palindrome આગળથી અને પાછળથી એકસરખું વાંચાય છે; અક્ષરના case ને અવગણીએ તો “Racecar” ઉદાહરણ છે. પહેલાં case સરખો કરો, પછી બહારના અક્ષરો સરખાવી અંદર વધો. કોઈ mismatch મળે તો string palindrome નથી, એટલે બાકી તપાસવાની જરૂર નથી.',
    ),
  },
  {
    type: 'code',
    language: 'javascript',
    caption: b('Two pointers move toward the center', 'બે pointers મધ્ય તરફ વધે છે'),
    code: 'function isPalindrome(s) {\n  s = s.toLowerCase();\n  let left = 0;\n  let right = s.length - 1;\n  while (left < right) {\n    if (s[left] !== s[right]) return false;\n    left++;\n    right--;\n  }\n  return true;\n}\n\nisPalindrome("Racecar");',
  },
  {
    type: 'walkthrough',
    title: b('Why two pointers are enough', 'બે pointers કેમ પૂરતા છે'),
    steps: [
      {
        line: 2,
        text: b(
          'Lowercase makes uppercase and lowercase letters compare equally.',
          'Lowercase કરવાથી મોટા અને નાના અક્ષરો સમાન રીતે સરખાય છે.',
        ),
      },
      {
        line: 3,
        text: b('left starts at the first character.', 'left પહેલા અક્ષરથી શરૂ થાય છે.'),
      },
      {
        line: 4,
        text: b('right starts at the last character.', 'right છેલ્લાં અક્ષરથી શરૂ થાય છે.'),
      },
      {
        line: 5,
        text: b(
          'Stop when the pointers meet or cross; the middle needs no pair check.',
          'Pointers મળે કે એકબીજાને ઓળંગે ત્યારે રોકો; મધ્યમાં જોડી તપાસવાની જરૂર નથી.',
        ),
      },
      {
        line: 6,
        text: b(
          'A differing pair is enough to return false immediately.',
          'બંને અક્ષરો જુદા હોય તો તરત false આપી શકાય.',
        ),
      },
      {
        line: 9,
        text: b(
          'If every outside pair matched, return true.',
          'બહારની દરેક જોડી સરખી હોય તો true આપો.',
        ),
      },
    ],
  },
  {
    type: 'trace',
    input: 'isPalindrome("Racecar")',
    columns: [
      b('left', 'left'),
      b('right', 'right'),
      b('Compared characters', 'સરખાવેલા અક્ષરો'),
      b('Result', 'પરિણામ'),
    ],
    rows: [
      ['0', '6', '"r" and "r"', b('match', 'સરખાં')],
      ['1', '5', '"a" and "a"', b('match', 'સરખાં')],
      ['2', '4', '"c" and "c"', b('match', 'સરખાં')],
      ['3', '3', b('pointers meet', 'pointers મળે'), b('return true', 'true આપો')],
    ],
  },
  {
    type: 'callout',
    variant: 'warning',
    title: b('Be precise about what “ignore” means', '“અવગણો” નો અર્થ સ્પષ્ટ રાખો'),
    text: b(
      'This exercise says to ignore letter case and assumes the input contains only letters and digits. It does not ask you to remove spaces or punctuation. Always implement the exact normalization rules in the prompt rather than silently adding extra behavior.',
      'આ exercise માં letter case અવગણવાનું છે અને input માં માત્ર letters અને digits છે એમ માન્યું છે. Spaces કે punctuation દૂર કરવાનું કહ્યું નથી. Prompt ના ચોક્કસ normalization નિયમો જ અમલમાં મૂકો; પોતાની રીતે વધારાનું વર્તન ન ઉમેરો.',
    ),
  },
  {
    type: 'complexity',
    time: 'O(n)',
    space: 'O(n)',
    why: b(
      'The pointers compare at most half the characters, while lowercasing creates a normalized string.',
      'Pointers વધુમાં વધુ અડધા અક્ષરો સરખાવે છે, જ્યારે lowercase કરવાથી નવી normalized string બને છે.',
    ),
  },
  {
    type: 'practice-link',
    text: b('Try the palindrome problem', 'Palindrome problem અજમાવો'),
  },
];
