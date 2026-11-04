import type { Topic } from '../../types.js';
import { bigOLesson } from './bigoLesson.js';
import { applyFoundationLocalizations } from './foundationLocalizations.js';
import { applyAlgorithmLocalizations } from './algorithmLocalizations.js';
import { applyRemainingLocalizations } from './remainingLocalizations.js';

export const topics: Topic[] = [
  {
    id: 'bigo',
    lv: 'Fundamentals',
    t: 'Big-O Complexity',
    learn:
      '<p><b>Big-O</b> tells you how the running time of code <i>grows</i> as the input size <b>n</b> grows. It ignores machine speed and focuses on growth.</p>\n<div class="tip"><b>Analogy:</b> Finding a name in a phone book. Reading every page is O(n). Opening the middle and halving each time is O(log n). Knowing the page number is O(1).</div>\n<table><tr><th>Big-O</th><th>Name</th><th>Example</th></tr><tr><td>O(1)</td><td>Constant</td><td>Read arr[5]</td></tr><tr><td>O(log n)</td><td>Logarithmic</td><td>Binary search</td></tr><tr><td>O(n)</td><td>Linear</td><td>Loop once</td></tr><tr><td>O(n log n)</td><td>Linearithmic</td><td>Merge sort</td></tr><tr><td>O(n²)</td><td>Quadratic</td><td>Nested loops</td></tr><tr><td>O(2ⁿ)</td><td>Exponential</td><td>Naive Fibonacci</td></tr></table>\n<p>Rule: drop constants and smaller terms. 3n + 10 becomes O(n).</p>',
    code: '// O(n): one loop\nfunction sum(arr){ let s=0; for(const x of arr) s+=x; return s; }\n// O(n²): nested loops\nfunction pairs(arr){ for(const a of arr) for(const b of arr) console.log(a,b); }',
    mcq: [
      {
        q: 'Two nested loops over n items. Complexity?',
        o: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'],
        a: 1,
        e: 'n iterations times n iterations = n².',
      },
      {
        q: 'Which grows slowest as n gets large?',
        o: ['O(n)', 'O(n²)', 'O(log n)', 'O(2ⁿ)'],
        a: 2,
        e: 'log n grows slowest of these.',
      },
    ],
    pr: {
      d: 'Write <code>sumN(n)</code> that returns 1+2+...+n in O(1) time (no loops).',
      fn: 'sumN',
      tests: [
        [[5], 15],
        [[100], 5050],
        [[1], 1],
      ],
      starters: {
        javascript: 'function sumN(n){\n  // your code\n}',
      },
      solutions: {
        javascript: 'function sumN(n){ return n*(n+1)/2; }',
      },
      explanation: {
        idea: 'The sum from 1 to n can be paired from the beginning and end. Each pair adds up to n+1, so the total is n times n+1 divided by 2.',
        steps: [
          'Take n and n + 1.',
          'Multiply them to count the paired values.',
          'Divide by 2 because each pair was counted twice.',
        ],
        trace: {
          input: 'sumN(5)',
          columns: ['n', 'n + 1', 'product', 'result'],
          rows: [['5', '6', '5 × 6 = 30', '30 ÷ 2 = 15']],
        },
        complexity: {
          time: 'O(1)',
          space: 'O(1)',
          why: 'The formula uses the same number of arithmetic operations for every n.',
        },
        brute: {
          code: 'let total = 0;\nfor (let i = 1; i <= n; i++) total += i;',
          complexity: 'O(n) time, O(1) space',
        },
        mistakes: [
          'Using a loop even though the prompt asks for O(1).',
          'Forgetting to divide the product by 2.',
        ],
        hints: [
          'Try pairing the first and last numbers.',
          'Every pair has the same sum.',
          'Use n × (n + 1) ÷ 2.',
        ],
      },
    },
  },
  {
    id: 'rec',
    lv: 'Maths Pattern & Recursion',
    t: 'Recursion',
    learn:
      '<p><b>Recursion</b> means a function calls itself on a smaller problem. Every recursion needs a <b>base case</b> (when to stop) and a <b>recursive case</b>.</p>\n<div class="tip"><b>Analogy:</b> Russian nesting dolls. Open one, find a smaller one inside, repeat until the smallest doll (base case).</div>\n<p>Each call sits on the <b>call stack</b>. Missing a base case causes a stack overflow.</p>',
    code: 'function fact(n){\n  if(n<=1) return 1;      // base case\n  return n*fact(n-1);     // recursive case\n}',
    mcq: [
      {
        q: 'What stops a recursion?',
        o: ['Loop', 'Base case', 'Array', 'Hash'],
        a: 1,
        e: 'The base case returns without recursing.',
      },
      {
        q: 'Missing base case causes?',
        o: ['Faster code', 'Stack overflow', 'Sorted output', 'Nothing'],
        a: 1,
        e: 'Calls pile up until memory runs out.',
      },
    ],
    pr: {
      d: 'Write <code>factorial(n)</code> using recursion. factorial(0) = 1.',
      fn: 'factorial',
      tests: [
        [[5], 120],
        [[0], 1],
        [[1], 1],
        [[7], 5040],
      ],
      starters: {
        javascript: 'function factorial(n){\n  // your code\n}',
      },
      solutions: {
        javascript: 'function factorial(n){ return n<=1?1:n*factorial(n-1); }',
      },
      explanation: {
        idea: 'Factorial multiplies n by the factorial of the next smaller number. The recursion stops at 1, which also handles factorial of 0.',
        steps: [
          'If n is 0 or 1, return 1.',
          'Otherwise call factorial with n - 1.',
          'Multiply n by the returned smaller factorial.',
          'Each call returns until the original call has its answer.',
        ],
        trace: {
          input: 'factorial(4)',
          columns: ['call', 'action', 'return'],
          rows: [
            ['factorial(4)', '4 × factorial(3)', '24'],
            ['factorial(3)', '3 × factorial(2)', '6'],
            ['factorial(2)', '2 × factorial(1)', '2'],
            ['factorial(1)', 'base case', '1'],
          ],
        },
        complexity: {
          time: 'O(n)',
          space: 'O(n)',
          why: 'There is one call for each number down to the base case, stored on the call stack.',
        },
        brute: {
          code: 'let result = 1;\nfor (let i = 2; i <= n; i++) result *= i;',
          complexity: 'O(n) time, O(1) space',
        },
        mistakes: [
          'Leaving out the base case.',
          'Using n instead of n - 1 in the recursive call.',
          'Returning 0 for factorial(0).',
        ],
        hints: [
          'Write down what factorial(4) should call next.',
          'Keep reducing n until it reaches 1 or 0.',
          'Return 1 at the base case; otherwise return n * factorial(n - 1).',
        ],
      },
    },
  },
  {
    id: 'maths',
    lv: 'Maths Pattern & Recursion',
    t: 'Maths & Patterns',
    learn:
      '<p>Many problems reduce to simple maths: even/odd (<code>n%2</code>), digits (<code>n%10</code> and <code>Math.floor(n/10)</code>), divisors, primes. Pattern printing uses nested loops: outer loop = rows, inner loop = columns.</p><div class="tip"><b>Analogy:</b> A prime can\'t be split into equal smaller groups. Factors come in pairs, so checking up to √n is enough.</div>',
    code: 'function isPrime(n){\n  if(n<2) return false;\n  for(let i=2;i*i<=n;i++) if(n%i===0) return false;\n  return true;\n}',
    mcq: [
      {
        q: 'Why test divisors only up to √n?',
        o: ['Primes are small', 'Factors come in pairs', 'JS requires it', 'Avoids negatives'],
        a: 1,
        e: 'Every factor above √n pairs with one below it.',
      },
      {
        q: 'Which gives the last digit of n?',
        o: ['n/10', 'n*10', 'n%10', 'n-10'],
        a: 2,
        e: 'n % 10 is the remainder, the last digit.',
      },
    ],
    pr: {
      d: 'Write <code>isPrime(n)</code>.',
      fn: 'isPrime',
      tests: [
        [[2], true],
        [[1], false],
        [[17], true],
        [[21], false],
      ],
      starters: {
        javascript: 'function isPrime(n){\n  // your code\n}',
      },
      solutions: {
        javascript:
          'function isPrime(n){ if(n<2) return false; for(let i=2;i*i<=n;i++) if(n%i===0) return false; return true; }',
      },
      explanation: {
        idea: 'A number is prime if no whole number from 2 up to its square root divides it. Any larger factor would pair with a smaller factor you already checked.',
        steps: [
          'Return false for numbers below 2.',
          'Try possible divisors starting at 2.',
          'Stop once divisor × divisor is greater than n.',
          'If any divisor divides evenly, return false; otherwise return true.',
        ],
        trace: {
          input: 'isPrime(29)',
          columns: ['divisor', 'divisor² ≤ 29?', '29 % divisor', 'action'],
          rows: [
            ['2', 'yes', '1', 'continue'],
            ['3', 'yes', '2', 'continue'],
            ['4', 'yes', '1', 'continue'],
            ['5', 'yes', '4', 'continue'],
            ['6', 'no', 'not checked', 'prime → true'],
          ],
        },
        complexity: {
          time: 'O(√n)',
          space: 'O(1)',
          why: 'Only divisors up to the square root are tested, with constant extra storage.',
        },
        brute: {
          code: 'for (let d = 2; d < n; d++) {\n  if (n % d === 0) return false;\n}\nreturn n >= 2;',
          complexity: 'O(n) time, O(1) space',
        },
        mistakes: [
          'Calling 1 or numbers below 1 prime.',
          'Checking divisors all the way to n when only √n is needed.',
          'Using d < Math.sqrt(n) and accidentally skipping the square root.',
        ],
        hints: [
          'Handle values below 2 first.',
          'You do not need to check past the square root.',
          'Loop while d * d <= n and test n % d === 0.',
        ],
      },
    },
  },
  {
    id: 'arr',
    lv: 'Array & String',
    t: 'Arrays',
    learn:
      '<p>An <b>array</b> stores items in consecutive memory, so reading by index is instant.</p>\n<div class="tip"><b>Analogy:</b> A row of numbered lockers. Opening locker 7 is instant, but inserting a new locker in the middle means shifting everyone.</div>\n<ul><li>Access by index: O(1)</li><li>Search unsorted: O(n)</li><li>Insert/delete in middle: O(n)</li><li>Append at end: O(1) on average</li></ul>\n<p><b>Pattern:</b> the two-pointer technique uses one pointer to read and one to write.</p>',
    code: 'const a=[4,7,1];\na.push(9);      // [4,7,1,9]\nlet w=0;        // write pointer\nfor(let r=0;r<a.length;r++){ if(a[r]!==7) a[w++]=a[r]; }\na.length=w;     // removes all 7s in O(n)',
    mcq: [
      {
        q: 'Time to read arr[1000]?',
        o: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        a: 0,
        e: 'Index math gives direct access.',
      },
      {
        q: 'Inserting at the start of an array costs?',
        o: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        a: 2,
        e: 'All elements shift right.',
      },
    ],
    pr: {
      d: 'Write <code>moveZeros(arr)</code> that returns a new array with all 0s moved to the end, keeping the order of other numbers.',
      fn: 'moveZeros',
      tests: [
        [[[0, 1, 0, 3, 12]], [1, 3, 12, 0, 0]],
        [[[1, 2]], [1, 2]],
        [[[0, 0]], [0, 0]],
      ],
      starters: {
        javascript: 'function moveZeros(arr){\n  // your code\n}',
      },
      solutions: {
        javascript:
          'function moveZeros(arr){ const r=arr.filter(x=>x!==0); while(r.length<arr.length) r.push(0); return r; }',
      },
      explanation: {
        idea: 'Keep the non-zero values in their original order, then add enough zeroes to make the new array the original length.',
        steps: [
          'Filter out every zero to make a new array.',
          'Compare its length with the input length.',
          'Append zeroes until both lengths match.',
        ],
        trace: {
          input: 'moveZeros([0,1,0,3,12])',
          columns: ['operation', 'array'],
          rows: [
            ['filter non-zero values', '[1, 3, 12]'],
            ['append two zeroes', '[1, 3, 12, 0, 0]'],
          ],
        },
        complexity: {
          time: 'O(n)',
          space: 'O(n)',
          why: 'The array is scanned once and a new result array is built.',
        },
        brute: {
          code: 'const result = [];\nfor (const value of arr) if (value !== 0) result.push(value);\nfor (const value of arr) if (value === 0) result.push(value);',
          complexity: 'O(n) time, O(n) space',
        },
        mistakes: [
          'Changing the order of the non-zero values.',
          'Mutating the input when the prompt asks for a new array.',
          'Adding too many or too few zeroes.',
        ],
        hints: [
          'Build a result instead of moving values in place.',
          'First collect values that are not zero.',
          'Append zeros until the result has the input length.',
        ],
      },
    },
  },
  {
    id: 'str',
    lv: 'Array & String',
    t: 'Strings',
    learn:
      '<p>A <b>string</b> is a sequence of characters. In JavaScript strings are <b>immutable</b>: changing one creates a new string.</p>\n<div class="tip"><b>Analogy:</b> A printed sentence. To fix a typo you reprint the line.</div>\n<p><b>Pattern:</b> two pointers from both ends toward the middle solve palindrome and reverse problems in O(n).</p>',
    code: 'function isPal(s){\n  let i=0,j=s.length-1;\n  while(i<j){ if(s[i++]!==s[j--]) return false; }\n  return true;\n}',
    mcq: [
      {
        q: 'Which is true about JS strings?',
        o: ['Mutable', 'Immutable', 'Always sorted', 'Fixed 8 chars'],
        a: 1,
        e: 'You cannot change a character in place.',
      },
      {
        q: 'Checking a palindrome with two pointers takes?',
        o: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'],
        a: 1,
        e: 'Each character is visited at most once.',
      },
    ],
    pr: {
      d: 'Write <code>isPalindrome(s)</code>. Ignore case; assume only letters and digits.',
      fn: 'isPalindrome',
      tests: [
        [['Racecar'], true],
        [['hello'], false],
        [['a'], true],
        [['abBA'], true],
      ],
      starters: {
        javascript: 'function isPalindrome(s){\n  // your code\n}',
      },
      solutions: {
        javascript:
          'function isPalindrome(s){ s=s.toLowerCase(); let i=0,j=s.length-1; while(i<j){ if(s[i++]!==s[j--]) return false; } return true; }',
      },
      explanation: {
        idea: 'A palindrome reads the same from both ends. Compare matching characters while moving one pointer inward from each end.',
        steps: [
          'Convert the text to lowercase.',
          'Set one index to the first character and one to the last.',
          'Return false at the first mismatch; otherwise move both indexes inward.',
          'If the pointers meet without a mismatch, return true.',
        ],
        trace: {
          input: 'isPalindrome("Racecar")',
          columns: ['i', 'j', 'left', 'right', 'result'],
          rows: [
            ['0', '6', 'r', 'r', 'match'],
            ['1', '5', 'a', 'a', 'match'],
            ['2', '4', 'c', 'c', 'match'],
            ['3', '3', 'e', 'e', 'finished → true'],
          ],
        },
        complexity: {
          time: 'O(n)',
          space: 'O(1)',
          why: 'The pointers inspect at most half the characters and use only two indexes.',
        },
        brute: {
          code: 'const text = s.toLowerCase();\nreturn text === [...text].reverse().join("");',
          complexity: 'O(n) time, O(n) space',
        },
        mistakes: [
          'Forgetting to ignore letter case.',
          'Comparing only adjacent characters.',
          'Moving one pointer in the wrong direction.',
        ],
        hints: [
          'Compare the first and last characters.',
          'Move both indexes toward the center after a match.',
          'Lowercase the string, then use two pointers.',
        ],
      },
    },
  },
  {
    id: 'bs',
    lv: 'Searching',
    t: 'Binary Search',
    learn:
      '<p><b>Binary search</b> finds a value in a <b>sorted</b> array by halving the search range each step: O(log n).</p>\n<div class="tip"><b>Analogy:</b> Guess a number 1 to 100. Ask "higher or lower?" and you need at most 7 guesses.</div>\n<p>Keep <code>lo</code> and <code>hi</code>. Check the middle, then discard half.</p>',
    code: 'let lo=0, hi=a.length-1;\nwhile(lo<=hi){\n  const mid=Math.floor((lo+hi)/2);\n  if(a[mid]===t) return mid;\n  if(a[mid]<t) lo=mid+1; else hi=mid-1;\n}\nreturn -1;',
    mcq: [
      {
        q: 'Binary search requires the array to be?',
        o: ['Unique', 'Sorted', 'Positive', 'Even length'],
        a: 1,
        e: 'Halving only works when order is known.',
      },
      {
        q: 'Complexity of binary search?',
        o: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
        a: 1,
        e: 'The range halves every step.',
      },
    ],
    pr: {
      d: 'Write <code>binarySearch(arr, target)</code> returning the index, or -1 if missing. Array is sorted.',
      fn: 'binarySearch',
      tests: [
        [[[1, 3, 5, 7, 9], 7], 3],
        [[[1, 3, 5], 4], -1],
        [[[2], 2], 0],
      ],
      starters: {
        javascript: 'function binarySearch(arr,target){\n  // your code\n}',
      },
      solutions: {
        javascript:
          'function binarySearch(a,t){ let lo=0,hi=a.length-1; while(lo<=hi){ const m=(lo+hi)>>1; if(a[m]===t) return m; if(a[m]<t) lo=m+1; else hi=m-1; } return -1; }',
      },
      explanation: {
        idea: 'Because the array is sorted, each comparison lets you discard half of the remaining indexes. Keep shrinking the search range until the target is found or the range is empty.',
        steps: [
          'Set low and high to the first and last indexes.',
          'Check the middle value.',
          'If it is too small, move low right; if too large, move high left.',
          'Stop when the target matches or low passes high.',
        ],
        trace: {
          input: 'binarySearch([1,3,5,7,9], 7)',
          columns: ['low', 'high', 'mid', 'value', 'action'],
          rows: [
            ['0', '4', '2', '5', 'too small; low = 3'],
            ['3', '4', '3', '7', 'found at index 3'],
          ],
        },
        complexity: {
          time: 'O(log n)',
          space: 'O(1)',
          why: 'Each comparison removes about half the remaining range and uses a fixed number of indexes.',
        },
        brute: {
          code: 'for (let i = 0; i < arr.length; i++) {\n  if (arr[i] === target) return i;\n}\nreturn -1;',
          complexity: 'O(n) time, O(1) space',
        },
        mistakes: [
          'Using binary search on an unsorted array.',
          'Using high = arr.length instead of arr.length - 1.',
          'Forgetting to update a bound after checking the middle.',
        ],
        hints: [
          'Keep a low and high index.',
          'Compare the middle value with the target.',
          'Discard the half that cannot contain the target.',
        ],
      },
    },
  },
  {
    id: 'sort',
    lv: 'Sorting',
    t: 'Sorting',
    learn:
      '<p>Sorting puts items in order. Simple sorts are O(n²); smart sorts are O(n log n).</p>\n<div class="tip"><b>Analogy:</b> Sorting playing cards in your hand: pick each new card and slide it into the right spot (insertion sort).</div>\n<table><tr><th>Algorithm</th><th>Time</th><th>Idea</th></tr><tr><td>Bubble</td><td>O(n²)</td><td>Swap neighbours</td></tr><tr><td>Insertion</td><td>O(n²)</td><td>Insert into sorted part</td></tr><tr><td>Merge</td><td>O(n log n)</td><td>Split, sort, merge</td></tr><tr><td>Quick</td><td>O(n log n) avg</td><td>Partition by pivot</td></tr></table>',
    code: 'for(let i=1;i<a.length;i++){\n  const k=a[i]; let j=i-1;\n  while(j>=0 && a[j]>k){ a[j+1]=a[j]; j--; }\n  a[j+1]=k;\n}',
    mcq: [
      {
        q: 'Best general-purpose complexity for comparison sorts?',
        o: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
        a: 1,
        e: 'n log n is the proven lower bound.',
      },
      {
        q: 'Which algorithm splits then merges?',
        o: ['Bubble', 'Insertion', 'Merge sort', 'Selection'],
        a: 2,
        e: 'Merge sort divides and merges.',
      },
    ],
    pr: {
      d: 'Write <code>sortArray(arr)</code> that returns the numbers in ascending order <b>without</b> using <code>.sort()</code>.',
      fn: 'sortArray',
      tests: [
        [[[5, 2, 9, 1]], [1, 2, 5, 9]],
        [[[3, 3, 1]], [1, 3, 3]],
        [[[]], []],
      ],
      starters: {
        javascript: 'function sortArray(arr){\n  // your code\n}',
      },
      solutions: {
        javascript:
          'function sortArray(arr){ const a=[...arr]; for(let i=1;i<a.length;i++){ const k=a[i]; let j=i-1; while(j>=0&&a[j]>k){ a[j+1]=a[j]; j--; } a[j+1]=k; } return a; }',
      },
      explanation: {
        idea: 'Insertion sort grows a sorted section from left to right. It saves one value, shifts larger values right, then puts the saved value into the open spot.',
        steps: [
          'Copy the input so the original array stays unchanged.',
          'Take the next value as the key.',
          'Shift earlier values that are larger one position to the right.',
          'Place the key into the empty position.',
        ],
        trace: {
          input: 'sortArray([4,2,3])',
          columns: ['i', 'key', 'shift/action', 'array'],
          rows: [
            ['1', '2', 'shift 4 right; insert 2', '[2,4,3]'],
            ['2', '3', 'shift 4 right; insert 3', '[2,3,4]'],
          ],
        },
        complexity: {
          time: 'O(n²)',
          space: 'O(n)',
          why: 'In the worst case each value shifts across the sorted prefix; the copied array holds the result.',
        },
        brute: {
          code: 'const a = [...arr];\nfor (let i = 0; i < a.length; i++) {\n  for (let j = 0; j < a.length - 1; j++) {\n    if (a[j] > a[j + 1]) [a[j], a[j + 1]] = [a[j + 1], a[j]];\n  }\n}',
          complexity: 'O(n²) time, O(n) space',
        },
        mistakes: [
          'Moving the key before saving it.',
          'Shifting values that are smaller than the key.',
          'Mutating the original array instead of sorting a copy.',
        ],
        hints: [
          'Start at the second item; the first item is already sorted.',
          'Save the current value, then shift larger values right.',
          'Insert the saved key where the shifts stop.',
        ],
      },
    },
  },
  {
    id: 'bit',
    lv: 'Bit Manipulation',
    t: 'Bitwise Algorithms',
    learn:
      '<p>Bitwise operators work on binary digits: <code>&amp;</code> AND, <code>|</code> OR, <code>^</code> XOR, <code>~</code> NOT, <code>&lt;&lt;</code> / <code>&gt;&gt;</code> shifts.</p><div class="tip"><b>Analogy:</b> A row of light switches. Each bit is on or off.</div><p>Tricks: <code>n&amp;(n-1)</code> clears the lowest set bit; a power of two has exactly one set bit; <code>a^a = 0</code>.</p>',
    code: 'const isPow2 = n => n>0 && (n&(n-1))===0;\n// find the single non-repeating number\nnums.reduce((a,b)=>a^b);',
    mcq: [
      {
        q: 'What is 5 ^ 5?',
        o: ['10', '5', '0', '1'],
        a: 2,
        e: 'XOR of equal values is 0.',
      },
      {
        q: 'Which operator shifts bits left?',
        o: ['<<', '>>', '&', '^'],
        a: 0,
        e: 'x << 1 doubles x.',
      },
    ],
    pr: {
      d: 'Write <code>isPowerOfTwo(n)</code> using a bit trick.',
      fn: 'isPowerOfTwo',
      tests: [
        [[8], true],
        [[6], false],
        [[1], true],
        [[0], false],
      ],
      starters: {
        javascript: 'function isPowerOfTwo(n){\n  // your code\n}',
      },
      solutions: {
        javascript: 'function isPowerOfTwo(n){ return n>0&&(n&(n-1))===0; }',
      },
      explanation: {
        idea: 'A positive power of two has exactly one 1-bit. Subtracting one flips that bit and all bits after it, so AND-ing the two values gives zero only for powers of two.',
        steps: [
          'Reject zero and negative numbers.',
          'Compute n - 1.',
          'Use bitwise AND between n and n - 1.',
          'Return true only when the result is zero.',
        ],
        trace: {
          input: 'isPowerOfTwo(8)',
          columns: ['value', 'binary', 'meaning'],
          rows: [
            ['n', '1000', 'one set bit'],
            ['n - 1', '0111', 'bits below the set bit become 1'],
            ['n & (n - 1)', '0000', 'true'],
          ],
        },
        complexity: {
          time: 'O(1)',
          space: 'O(1)',
          why: 'A fixed number of checks and bitwise operations are used.',
        },
        brute: {
          code: 'if (n <= 0) return false;\nwhile (n % 2 === 0) n /= 2;\nreturn n === 1;',
          complexity: 'O(log n) time, O(1) space',
        },
        mistakes: [
          'Accepting zero as a power of two.',
          'Forgetting to reject negative values.',
          'Checking n & (n - 1) without comparing the result to zero.',
        ],
        hints: [
          'Look for a way to tell whether exactly one bit is set.',
          'Think about what subtracting one does to a binary value.',
          'For positive n, check whether (n & (n - 1)) equals zero.',
        ],
      },
    },
  },
  {
    id: 'hash',
    lv: 'Hashing',
    t: 'Hashing (Map & Set)',
    learn:
      '<p>A <b>hash map</b> stores key-value pairs and finds a key in about O(1). A <b>set</b> stores unique values.</p>\n<div class="tip"><b>Analogy:</b> A coat-check. You hand over a ticket (key) and get your coat instantly without searching every hanger.</div>\n<p><b>Pattern:</b> trade memory for speed. Replace an inner loop with a map lookup to turn O(n²) into O(n).</p>',
    code: 'const seen=new Map();\nfor(let i=0;i<nums.length;i++){\n  const need=target-nums[i];\n  if(seen.has(need)) return [seen.get(need),i];\n  seen.set(nums[i],i);\n}',
    mcq: [
      {
        q: 'Average lookup time in a hash map?',
        o: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        a: 0,
        e: 'Hashing jumps straight to the bucket.',
      },
      {
        q: 'Which structure removes duplicates quickly?',
        o: ['Array', 'Set', 'Stack', 'Queue'],
        a: 1,
        e: 'A Set only keeps unique values.',
      },
    ],
    pr: {
      d: 'Write <code>twoSum(nums, target)</code> returning the two indices (smaller first) whose values add to target. Exactly one answer exists.',
      fn: 'twoSum',
      tests: [
        [
          [[2, 7, 11, 15], 9],
          [0, 1],
        ],
        [
          [[3, 2, 4], 6],
          [1, 2],
        ],
        [
          [[3, 3], 6],
          [0, 1],
        ],
      ],
      starters: {
        javascript: 'function twoSum(nums,target){\n  // your code\n}',
      },
      solutions: {
        javascript:
          'function twoSum(n,t){ const m=new Map(); for(let i=0;i<n.length;i++){ if(m.has(t-n[i])) return [m.get(t-n[i]),i]; m.set(n[i],i);} }',
      },
      explanation: {
        idea: 'As you scan the numbers, remember each number and its index. Before storing the current number, check whether its complement is already in the map.',
        steps: [
          'Start with an empty map from number to index.',
          'For each number, calculate target minus that number.',
          'If the complement is in the map, return its index and the current index.',
          'Otherwise store the current number and continue.',
        ],
        trace: {
          input: 'twoSum([2,7,11,15], 9)',
          columns: ['i', 'num', 'need', 'map after', 'result'],
          rows: [
            ['0', '2', '7', '{2:0}', 'not found'],
            ['1', '7', '2', '{2:0}', 'found 2 at index 0 → [0,1]'],
          ],
        },
        complexity: {
          time: 'O(n)',
          space: 'O(n)',
          why: 'One pass checks one map entry per number and stores earlier values.',
        },
        brute: {
          code: 'for (let i = 0; i < nums.length; i++) {\n  for (let j = i + 1; j < nums.length; j++) {\n    if (nums[i] + nums[j] === target) return [i, j];\n  }\n}',
          complexity: 'O(n²) time, O(1) extra space',
        },
        mistakes: [
          'Returning the values instead of the indices.',
          'Using the same element twice.',
          'Checking the map after storing the current value.',
        ],
        hints: [
          'For each number, ask what value would complete the target.',
          'Keep earlier values in a map with their indexes.',
          'Check target - nums[i] before adding nums[i] to the map.',
        ],
      },
    },
  },
  {
    id: 'two',
    lv: 'Two-Pointer',
    t: 'Two-Pointer Technique',
    learn:
      '<p>Use two indexes that move through the data, usually from both ends of a <b>sorted</b> array, to avoid a nested loop. O(n²) becomes O(n).</p><div class="tip"><b>Analogy:</b> Two people searching a bookshelf from opposite ends, walking toward each other.</div><p>If the sum is too small, move the left pointer right. If too large, move the right pointer left.</p>',
    code: 'let i=0, j=a.length-1;\nwhile(i<j){\n  const s=a[i]+a[j];\n  if(s===t) return [i,j];\n  s<t ? i++ : j--;\n}',
    mcq: [
      {
        q: 'Classic two-pointer needs the array to be?',
        o: ['Sorted', 'Unique', 'Positive', 'Short'],
        a: 0,
        e: 'Order tells you which pointer to move.',
      },
      {
        q: 'Two-pointer pair search complexity?',
        o: ['O(n²)', 'O(n)', 'O(log n)', 'O(1)'],
        a: 1,
        e: 'Each pointer moves at most n steps.',
      },
    ],
    pr: {
      d: 'Write <code>twoSumSorted(arr, target)</code> for a sorted array. Return the indices <code>[i, j]</code> with i &lt; j.',
      fn: 'twoSumSorted',
      tests: [
        [
          [[1, 2, 4, 7], 9],
          [1, 3],
        ],
        [
          [[2, 3, 4], 6],
          [0, 2],
        ],
      ],
      starters: {
        javascript: 'function twoSumSorted(arr,target){\n  // your code\n}',
      },
      solutions: {
        javascript:
          'function twoSumSorted(a,t){ let i=0,j=a.length-1; while(i<j){ const s=a[i]+a[j]; if(s===t) return [i,j]; s<t?i++:j--; } }',
      },
      explanation: {
        idea: 'Because the numbers are sorted, moving the left pointer right makes the sum larger and moving the right pointer left makes it smaller. Use that to adjust the sum without trying every pair.',
        steps: [
          'Start at the first and last indexes.',
          'Add the values at the two pointers.',
          'Return the indexes if the sum equals the target.',
          'Move left right for a small sum, or move right left for a large sum.',
        ],
        trace: {
          input: 'twoSumSorted([1,2,4,7], 6)',
          columns: ['i', 'j', 'values', 'sum', 'action'],
          rows: [
            ['0', '3', '1 + 7', '8', 'too large; j = 2'],
            ['0', '2', '1 + 4', '5', 'too small; i = 1'],
            ['1', '2', '2 + 4', '6', 'found → [1,2]'],
          ],
        },
        complexity: {
          time: 'O(n)',
          space: 'O(1)',
          why: 'Each pointer moves inward at most n times and only two indexes are stored.',
        },
        brute: {
          code: 'for (let i = 0; i < arr.length; i++) {\n  for (let j = i + 1; j < arr.length; j++) {\n    if (arr[i] + arr[j] === target) return [i, j];\n  }\n}',
          complexity: 'O(n²) time, O(1) space',
        },
        mistakes: [
          'Using this method on an unsorted array.',
          'Moving the wrong pointer after comparing the sum.',
          'Returning values when the prompt asks for indexes.',
        ],
        hints: [
          'Start with the widest pair.',
          'If the sum is too big, which value can you lower?',
          'Move the left pointer when sum < target; otherwise move the right one.',
        ],
      },
    },
  },
  {
    id: 'win',
    lv: 'Sliding Window',
    t: 'Sliding Window',
    learn:
      '<p>Keep a window over a contiguous part of the array. Slide it by adding the new element and removing the old one, instead of recomputing from scratch.</p><div class="tip"><b>Analogy:</b> A train window moving along the scenery. You only see what enters and leaves.</div><p>Fixed-size windows are O(n); variable-size windows grow and shrink with two pointers.</p>',
    code: 'let w=0; for(let i=0;i<k;i++) w+=a[i];\nlet best=w;\nfor(let i=k;i<a.length;i++){ w+=a[i]-a[i-k]; best=Math.max(best,w); }',
    mcq: [
      {
        q: 'Sliding window works on?',
        o: ['Contiguous subarrays', 'Trees', 'Random subsets', 'Graphs'],
        a: 0,
        e: 'The window is a continuous range.',
      },
      {
        q: 'Max sum of size-k windows runs in?',
        o: ['O(n*k)', 'O(n)', 'O(k)', 'O(n²)'],
        a: 1,
        e: 'Each step does O(1) work.',
      },
    ],
    pr: {
      d: 'Write <code>maxSumK(arr, k)</code> returning the largest sum of any k consecutive elements.',
      fn: 'maxSumK',
      tests: [
        [[[2, 1, 5, 1, 3, 2], 3], 9],
        [[[1, 2], 2], 3],
      ],
      starters: {
        javascript: 'function maxSumK(arr,k){\n  // your code\n}',
      },
      solutions: {
        javascript:
          'function maxSumK(a,k){ let w=0; for(let i=0;i<k;i++) w+=a[i]; let b=w; for(let i=k;i<a.length;i++){ w+=a[i]-a[i-k]; b=Math.max(b,w);} return b; }',
      },
      explanation: {
        idea: 'Add the first k values to create a window. Then slide it one position at a time by removing the value that leaves and adding the value that enters.',
        steps: [
          'Sum the first k values.',
          'Save that sum as the best seen so far.',
          'For each next index, subtract the outgoing value and add the incoming value.',
          'Update the best sum after each slide.',
        ],
        trace: {
          input: 'maxSumK([2,1,5,1,3,2], 3)',
          columns: ['window', 'sum', 'best'],
          rows: [
            ['[2,1,5]', '8', '8'],
            ['[1,5,1]', '7', '8'],
            ['[5,1,3]', '9', '9'],
            ['[1,3,2]', '6', '9'],
          ],
        },
        complexity: {
          time: 'O(n)',
          space: 'O(1)',
          why: 'The first window and each later window are processed with constant-time updates.',
        },
        brute: {
          code: 'let best = -Infinity;\nfor (let start = 0; start <= arr.length - k; start++) {\n  let sum = 0;\n  for (let i = start; i < start + k; i++) sum += arr[i];\n  best = Math.max(best, sum);\n}',
          complexity: 'O(nk) time, O(1) space',
        },
        mistakes: [
          'Re-summing the whole window after each move.',
          'Subtracting arr[i] instead of the item leaving at arr[i - k].',
          'Forgetting to initialize best from the first window.',
        ],
        hints: [
          'Start by summing just the first k items.',
          'When the window moves, one item leaves and one enters.',
          'Update sum with arr[i] - arr[i - k], then update best.',
        ],
      },
    },
  },
  {
    id: 'pre',
    lv: 'Prefix Sum',
    t: 'Prefix Sum',
    learn:
      '<p>A <b>prefix sum</b> array stores running totals: <code>pre[i] = a[0]+...+a[i-1]</code>. Any range sum becomes <code>pre[r+1] - pre[l]</code> in O(1).</p><div class="tip"><b>Analogy:</b> A bank passbook balance. Money spent between two dates is balance(start) minus balance(end).</div><p>Combine with a hash map to count subarrays with a target sum.</p>',
    code: 'const pre=[0];\nfor(const x of a) pre.push(pre[pre.length-1]+x);\nconst rangeSum=(l,r)=>pre[r+1]-pre[l];',
    mcq: [
      {
        q: 'Range sum after building prefix sums costs?',
        o: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'],
        a: 1,
        e: 'Just one subtraction.',
      },
      {
        q: 'Building the prefix array costs?',
        o: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        a: 2,
        e: 'One pass over the array.',
      },
    ],
    pr: {
      d: 'Write <code>rangeSums(arr, queries)</code>. Each query is <code>[l, r]</code> (inclusive). Return an array of sums.',
      fn: 'rangeSums',
      tests: [
        [
          [
            [1, 2, 3, 4],
            [
              [0, 1],
              [1, 3],
              [2, 2],
            ],
          ],
          [3, 9, 3],
        ],
        [[[5], [[0, 0]]], [5]],
      ],
      starters: {
        javascript: 'function rangeSums(arr,queries){\n  // your code\n}',
      },
      solutions: {
        javascript:
          'function rangeSums(a,q){ const p=[0]; for(const x of a) p.push(p[p.length-1]+x); return q.map(([l,r])=>p[r+1]-p[l]); }',
      },
      explanation: {
        idea: 'Build a running total where each position stores the sum before it. A range sum is the total through r minus the total before l.',
        steps: [
          'Start the prefix array with 0.',
          'Append the running sum after each input value.',
          'For each inclusive query [l, r], subtract prefix[l] from prefix[r + 1].',
          'Collect each answer in order.',
        ],
        trace: {
          input: 'rangeSums([2,4,1,3], [[1,3]])',
          columns: ['prefix index', 'value', 'prefix total'],
          rows: [
            ['0', '—', '0'],
            ['1', '2', '2'],
            ['2', '4', '6'],
            ['3', '1', '7'],
            ['4', '3', '10'],
            ['query [1,3]', 'prefix[4] - prefix[1]', '10 - 2 = 8'],
          ],
        },
        complexity: {
          time: 'O(n + q)',
          space: 'O(n)',
          why: 'One pass builds n prefix totals; each of q queries is answered with one subtraction.',
        },
        brute: {
          code: 'return queries.map(([l, r]) => {\n  let sum = 0;\n  for (let i = l; i <= r; i++) sum += arr[i];\n  return sum;\n});',
          complexity: 'O(nq) time, O(q) output space',
        },
        mistakes: [
          'Using prefix[r] instead of prefix[r + 1] for an inclusive range.',
          'Forgetting the leading zero in the prefix array.',
          'Subtracting prefix[r] - prefix[l] and missing an endpoint.',
        ],
        hints: [
          'Store a running total with one extra leading zero.',
          'The range ends at prefix[r + 1].',
          'Use prefix[r + 1] - prefix[l].',
        ],
      },
    },
  },
  {
    id: 'back',
    lv: 'Backtracking',
    t: 'Backtracking',
    learn:
      '<p><b>Backtracking</b> builds a solution step by step, and <i>undoes</i> a choice (backtracks) when it leads nowhere. It explores all possibilities in a smart order.</p><div class="tip"><b>Analogy:</b> Solving a maze. Walk down a path, hit a dead end, step back, try another turn.</div><p>Template: choose, explore (recurse), un-choose. Used for subsets, permutations, N-Queens, Sudoku.</p>',
    code: 'function go(i,cur){\n  res.push([...cur]);\n  for(let j=i;j<a.length;j++){\n    cur.push(a[j]);      // choose\n    go(j+1,cur);         // explore\n    cur.pop();           // un-choose\n  }\n}',
    mcq: [
      {
        q: 'The key backtracking step after recursing?',
        o: ['Sort', 'Undo the choice', 'Hash it', 'Stop forever'],
        a: 1,
        e: 'Un-choosing lets you try the next option.',
      },
      {
        q: 'Which is a backtracking problem?',
        o: ['N-Queens', 'Binary search', 'Prefix sum', 'Two sum'],
        a: 0,
        e: 'N-Queens tries placements and undoes bad ones.',
      },
    ],
    pr: {
      d: 'Write <code>subsets(nums)</code> returning all subsets. Use the order from the code example: add the current subset first, then extend with later elements (for [1,2] → [[],[1],[1,2],[2]]).',
      fn: 'subsets',
      tests: [
        [[[1, 2]], [[], [1], [1, 2], [2]]],
        [[[5]], [[], [5]]],
        [[[1, 2, 3]], [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]],
      ],
      starters: {
        javascript: 'function subsets(nums){\n  // your code\n}',
      },
      solutions: {
        javascript:
          'function subsets(n){ const r=[]; const go=(i,c)=>{ r.push([...c]); for(let j=i;j<n.length;j++){ c.push(n[j]); go(j+1,c); c.pop(); } }; go(0,[]); return r; }',
      },
      explanation: {
        idea: 'Build one subset at a time. At each position, record the current subset, then try adding each later item and undo that choice when its branch is finished.',
        steps: [
          'Start with an empty current subset.',
          'Save a copy of the current subset as one answer.',
          'Try each number from the current start index: add it and recurse from the next index.',
          'Remove the number after returning so the next choice starts clean.',
        ],
        trace: {
          input: 'subsets([1,2])',
          columns: ['current subset', 'next choice', 'action', 'result order'],
          rows: [
            ['[]', '1', 'save, add 1', '[[]]'],
            ['[1]', '2', 'save, add 2', '[[],[1]]'],
            ['[1,2]', 'none', 'save', '[[],[1],[1,2]]'],
            ['[]', '2', 'save, add 2', '[[],[1],[1,2],[2]]'],
          ],
        },
        complexity: {
          time: 'O(n · 2ⁿ)',
          space: 'O(n) call stack, excluding returned subsets',
          why: 'There are 2ⁿ subsets and copying each subset can take up to n steps.',
        },
        brute: {
          code: 'Enumerate every bit mask from 0 to 2 ** nums.length - 1 and include items whose bit is set.',
          complexity: 'O(n · 2ⁿ) time, O(n · 2ⁿ) output space',
        },
        mistakes: [
          'Saving the same mutable array instead of a copy.',
          'Forgetting to remove a choice after recursion.',
          'Starting the next recursive call at the same index and repeating values.',
        ],
        hints: [
          'Use a list for the current subset and another for all answers.',
          'Record the current subset before trying more values.',
          'Push, recurse with j + 1, then pop to backtrack.',
        ],
      },
    },
  },
  {
    id: 'll',
    lv: 'Linked List',
    t: 'Linked Lists',
    learn:
      '<p>A <b>linked list</b> is a chain of nodes. Each node holds a value and a pointer to the next node.</p>\n<div class="tip"><b>Analogy:</b> A treasure hunt. Each clue tells you where the next one is. You can\'t jump to clue 5 directly.</div>\n<ul><li>Insert/delete at head: O(1)</li><li>Access by position: O(n)</li></ul>\n<p><b>Pattern:</b> fast and slow pointers find the middle or detect cycles.</p>',
    code: '// node = { val: 1, next: {val:2, next:null} }\nlet prev=null, cur=head;\nwhile(cur){ const nx=cur.next; cur.next=prev; prev=cur; cur=nx; }\nreturn prev; // reversed head',
    mcq: [
      {
        q: 'Access the 5th node in a linked list?',
        o: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        a: 1,
        e: 'You must walk from the head.',
      },
      {
        q: 'Insert at head costs?',
        o: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        a: 0,
        e: 'Just re-point the head.',
      },
    ],
    pr: {
      d: 'Write <code>reverseList(head)</code>. Nodes look like <code>{val, next}</code>. Return the new head.',
      fn: 'reverseList',
      tests: [
        [
          [
            {
              val: 1,
              next: {
                val: 2,
                next: {
                  val: 3,
                  next: null,
                },
              },
            },
          ],
          {
            val: 3,
            next: {
              val: 2,
              next: {
                val: 1,
                next: null,
              },
            },
          },
        ],
        [[null], null],
      ],
      starters: {
        javascript: 'function reverseList(head){\n  // your code\n}',
      },
      solutions: {
        javascript:
          'function reverseList(h){ let p=null; while(h){ const n=h.next; h.next=p; p=h; h=n; } return p; }',
      },
      explanation: {
        idea: 'Reverse each link so it points to the node you just visited. Keep track of the previous node, current node, and next node so the rest of the list is not lost.',
        steps: [
          'Start with previous set to null and current set to the head.',
          'Save current.next before changing any links.',
          'Point current.next back to previous.',
          'Advance previous and current; the final previous node is the new head.',
        ],
        trace: {
          input: 'reverseList(1 → 2 → 3 → null)',
          columns: ['current', 'saved next', 'new link', 'previous after step'],
          rows: [
            ['1', '2', '1 → null', '1'],
            ['2', '3', '2 → 1', '2'],
            ['3', 'null', '3 → 2', '3 → 2 → 1'],
          ],
        },
        complexity: {
          time: 'O(n)',
          space: 'O(1)',
          why: 'Every node is visited once and the links are reversed in place.',
        },
        brute: {
          code: 'const nodes = [];\nwhile (head) { nodes.push(head); head = head.next; }\nfor (let i = nodes.length - 1; i > 0; i--) nodes[i].next = nodes[i - 1];\nif (nodes.length) nodes[0].next = null;\nreturn nodes[nodes.length - 1] || null;',
          complexity: 'O(n) time, O(n) space',
        },
        mistakes: [
          'Overwriting next before saving it.',
          'Forgetting to set the old head’s next link to null.',
          'Returning the old head instead of the new one.',
        ],
        hints: [
          'You need a pointer for the previous node.',
          'Save the next node before reversing the current link.',
          'Use previous, current, and next; return previous at the end.',
        ],
      },
    },
  },
  {
    id: 'sq',
    lv: 'Stack',
    t: 'Stacks & Queues',
    learn:
      '<p>A <b>stack</b> is Last-In-First-Out (LIFO). A <b>queue</b> is First-In-First-Out (FIFO).</p>\n<div class="tip"><b>Analogy:</b> Stack = pile of plates (take the top one). Queue = ticket line (first person is served first).</div>\n<p>Stacks power undo, bracket matching, and DFS. Queues power scheduling and BFS.</p>',
    code: 'const st=[]; st.push(1); st.push(2); st.pop(); // 2\nconst q=[]; q.push(1); q.push(2); q.shift(); // 1',
    mcq: [
      {
        q: 'Which is LIFO?',
        o: ['Queue', 'Stack', 'Set', 'Map'],
        a: 1,
        e: 'Last pushed is first popped.',
      },
      {
        q: 'BFS uses which structure?',
        o: ['Stack', 'Queue', 'Set', 'Tree'],
        a: 1,
        e: 'BFS explores level by level, FIFO.',
      },
    ],
    pr: {
      d: 'Write <code>validParentheses(s)</code>. The string has only <code>()[]{}</code>. Return true if brackets close in the right order.',
      fn: 'validParentheses',
      tests: [
        [['()[]{}'], true],
        [['(]'], false],
        [['([{}])'], true],
        [['(('], false],
      ],
      starters: {
        javascript: 'function validParentheses(s){\n  // your code\n}',
      },
      solutions: {
        javascript:
          'function validParentheses(s){ const m={")":"(","]":"[","}":"{"},st=[]; for(const c of s){ if(m[c]){ if(st.pop()!==m[c]) return false; } else st.push(c);} return st.length===0; }',
      },
      explanation: {
        idea: 'Opening brackets wait on a stack until their matching closing bracket appears. The most recently opened bracket must close first.',
        steps: [
          'Create a map from each closing bracket to its opening bracket.',
          'Push every opening bracket onto the stack.',
          'For a closing bracket, pop and compare it with the required opener.',
          'Return true only if no mismatch happened and the stack is empty.',
        ],
        trace: {
          input: 'validParentheses("{[]}")',
          columns: ['character', 'action', 'stack', 'result'],
          rows: [
            ['{', 'push', '{', 'continue'],
            ['[', 'push', '{ [', 'continue'],
            [']', 'pop [', '{', 'match'],
            ['}', 'pop {', 'empty', 'true'],
          ],
        },
        complexity: {
          time: 'O(n)',
          space: 'O(n)',
          why: 'Each bracket is pushed and popped at most once.',
        },
        brute: {
          code: 'let previous;\ndo {\n  previous = s;\n  s = s.replace("()", "").replace("[]", "").replace("{}", "");\n} while (s !== previous);\nreturn s.length === 0;',
          complexity: 'O(n²) time, O(n) space in the worst case',
        },
        mistakes: [
          'Checking only whether the counts of each bracket match.',
          'Popping from an empty stack without rejecting the string.',
          'Forgetting to check that the stack is empty at the end.',
        ],
        hints: [
          'The order of closing brackets matters.',
          'Use last-in, first-out storage for opening brackets.',
          'Map closers to openers and compare each closer with stack.pop().',
        ],
      },
    },
  },
  {
    id: 'queue',
    lv: 'Queue',
    t: 'Queue',
    learn:
      '<p>A <b>queue</b> is First-In-First-Out. Operations: <code>enqueue</code> (add at back), <code>dequeue</code> (remove from front), <code>peek</code>.</p><div class="tip"><b>Analogy:</b> A ticket counter line. The first person to arrive is served first.</div><p>Variants: circular queue (reuses space), priority queue (highest priority first). Used in BFS, scheduling, and buffers. Note: <code>array.shift()</code> is O(n); use an index pointer for O(1).</p>',
    code: 'const q=[]; let head=0;\nq.push(1); q.push(2);      // enqueue\nconst x=q[head++];         // dequeue in O(1)',
    mcq: [
      {
        q: 'Queue order is?',
        o: ['LIFO', 'FIFO', 'Sorted', 'Random'],
        a: 1,
        e: 'First in, first out.',
      },
      {
        q: 'Which uses a queue?',
        o: ['DFS', 'BFS', 'Binary search', 'Quick sort'],
        a: 1,
        e: 'BFS processes nodes level by level.',
      },
    ],
  },
  {
    id: 'deque',
    lv: 'Deque',
    t: 'Deque',
    learn:
      '<p>A <b>deque</b> (double-ended queue) lets you add and remove at both the front and back in O(1).</p><div class="tip"><b>Analogy:</b> A train with doors at both ends. People can enter or leave from either side.</div><p>Famous use: <b>sliding window maximum</b>. Keep indexes in a deque in decreasing value order so the front is always the max.</p>',
    code: '// monotonic deque (store indexes)\nwhile(dq.length && a[dq[dq.length-1]]<=a[i]) dq.pop();\ndq.push(i);\nif(dq[0]<=i-k) dq.shift();',
    mcq: [
      {
        q: 'A deque allows operations at?',
        o: ['Front only', 'Back only', 'Both ends', 'Middle'],
        a: 2,
        e: 'That is what double-ended means.',
      },
      {
        q: 'Deque is used for sliding window?',
        o: ['Maximum', 'Sorting', 'Hashing', 'Recursion'],
        a: 0,
        e: 'A monotonic deque tracks the window max.',
      },
    ],
  },
  {
    id: 'tree',
    lv: 'Binary Tree',
    t: 'Trees',
    learn:
      '<p>A <b>tree</b> has a root and child nodes. A <b>binary tree</b> has at most two children (left, right). In a <b>BST</b>, left &lt; node &lt; right.</p>\n<div class="tip"><b>Analogy:</b> A family tree or company org chart.</div>\n<p>Trees are naturally recursive: solve the left subtree, solve the right subtree, combine.</p>',
    code: '// node = { val, left, right }\nfunction height(n){\n  if(!n) return 0;\n  return 1+Math.max(height(n.left),height(n.right));\n}',
    mcq: [
      {
        q: 'A BST keeps which order?',
        o: ['left > node', 'left < node < right', 'random', 'sorted by depth'],
        a: 1,
        e: 'Smaller values go left, larger go right.',
      },
      {
        q: 'Natural way to solve tree problems?',
        o: ['Recursion', 'Sorting', 'Hashing', 'Bit math'],
        a: 0,
        e: 'Subtrees are smaller trees.',
      },
    ],
    pr: {
      d: 'Write <code>maxDepth(root)</code> returning the number of nodes on the longest root-to-leaf path. Nodes are <code>{val,left,right}</code>; empty tree is null.',
      fn: 'maxDepth',
      tests: [
        [
          [
            {
              val: 1,
              left: {
                val: 2,
                left: null,
                right: null,
              },
              right: {
                val: 3,
                left: {
                  val: 4,
                  left: null,
                  right: null,
                },
                right: null,
              },
            },
          ],
          3,
        ],
        [[null], 0],
        [
          [
            {
              val: 1,
              left: null,
              right: null,
            },
          ],
          1,
        ],
      ],
      starters: {
        javascript: 'function maxDepth(root){\n  // your code\n}',
      },
      solutions: {
        javascript:
          'function maxDepth(r){ return r?1+Math.max(maxDepth(r.left),maxDepth(r.right)):0; }',
      },
      explanation: {
        idea: 'The deepest path from a node is one plus the deeper of its left and right subtrees. An empty branch has depth zero.',
        steps: [
          'If the current node is null, return 0.',
          'Find the depth of the left child.',
          'Find the depth of the right child.',
          'Return one plus the larger child depth.',
        ],
        trace: {
          input:
            'maxDepth({val:1,left:{val:2,left:null,right:null},right:{val:3,left:{val:4,left:null,right:null},right:null})',
          columns: ['node', 'left depth', 'right depth', 'returned depth'],
          rows: [
            ['2', '0', '0', '1'],
            ['4', '0', '0', '1'],
            ['3', '1', '0', '2'],
            ['1', '1', '2', '3'],
          ],
        },
        complexity: {
          time: 'O(n)',
          space: 'O(h)',
          why: 'Every node is visited once; recursive calls use stack space for the tree height h.',
        },
        brute: {
          code: 'const queue = [[root, 1]];\nlet deepest = 0;\nwhile (queue.length) {\n  const [node, depth] = queue.shift();\n  if (!node) continue;\n  deepest = Math.max(deepest, depth);\n  queue.push([node.left, depth + 1], [node.right, depth + 1]);\n}\nreturn deepest;',
          complexity: 'O(n) time, O(n) space',
        },
        mistakes: [
          'Returning 1 for a null tree.',
          'Adding left and right depths instead of taking the maximum.',
          'Forgetting to count the current node.',
        ],
        hints: [
          'Think about the answer for an empty branch.',
          'A path continues through whichever child is deeper.',
          'Return 1 + Math.max(left depth, right depth), with null returning 0.',
        ],
      },
    },
  },
  {
    id: 'bst',
    lv: 'Binary Search Tree',
    t: 'Binary Search Tree',
    learn:
      '<p>A <b>BST</b> keeps <code>left &lt; node &lt; right</code> for every node. Search, insert and delete take O(h), where h is the height (O(log n) when balanced).</p><div class="tip"><b>Analogy:</b> A guessing game. Smaller? Go left. Bigger? Go right.</div><p>Inorder traversal of a BST gives sorted order. To validate, pass allowed min/max bounds down the tree.</p>',
    code: 'function isValid(n,lo=-Infinity,hi=Infinity){\n  if(!n) return true;\n  if(n.val<=lo||n.val>=hi) return false;\n  return isValid(n.left,lo,n.val)&&isValid(n.right,n.val,hi);\n}',
    mcq: [
      {
        q: 'Inorder traversal of a BST gives?',
        o: ['Random order', 'Sorted order', 'Level order', 'Reverse'],
        a: 1,
        e: 'Left, node, right visits values ascending.',
      },
      {
        q: 'Search in a balanced BST?',
        o: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
        a: 1,
        e: 'Each step halves the tree.',
      },
    ],
    pr: {
      d: 'Write <code>isValidBST(root)</code>. Nodes are <code>{val,left,right}</code>; an empty tree is valid.',
      fn: 'isValidBST',
      tests: [
        [
          [
            {
              val: 2,
              left: {
                val: 1,
                left: null,
                right: null,
              },
              right: {
                val: 3,
                left: null,
                right: null,
              },
            },
          ],
          true,
        ],
        [
          [
            {
              val: 2,
              left: {
                val: 3,
                left: null,
                right: null,
              },
              right: {
                val: 1,
                left: null,
                right: null,
              },
            },
          ],
          false,
        ],
        [[null], true],
      ],
      starters: {
        javascript: 'function isValidBST(root){\n  // your code\n}',
      },
      solutions: {
        javascript:
          'function isValidBST(n,lo=-Infinity,hi=Infinity){ if(!n) return true; if(n.val<=lo||n.val>=hi) return false; return isValidBST(n.left,lo,n.val)&&isValidBST(n.right,n.val,hi); }',
      },
      explanation: {
        idea: 'Every node must fit inside a range set by its ancestors. The left child gets a smaller upper limit; the right child gets a larger lower limit.',
        steps: [
          'An empty node is valid.',
          'Check that the node value is strictly between its lower and upper bounds.',
          'Validate the left subtree with this value as its upper bound.',
          'Validate the right subtree with this value as its lower bound.',
        ],
        trace: {
          input:
            'isValidBST({val:2,left:{val:1,left:null,right:null},right:{val:3,left:null,right:null}})',
          columns: ['node', 'allowed range', 'check', 'result'],
          rows: [
            ['2', '(-∞, ∞)', 'inside', 'check children'],
            ['1', '(-∞, 2)', 'inside', 'true'],
            ['3', '(2, ∞)', 'inside', 'true'],
            ['root', '—', 'both children valid', 'true'],
          ],
        },
        complexity: {
          time: 'O(n)',
          space: 'O(h)',
          why: 'Each node is checked once and recursion uses space proportional to tree height.',
        },
        brute: {
          code: 'Collect values with an in-order traversal, then check that every value is greater than the previous one.',
          complexity: 'O(n) time, O(n) space',
        },
        mistakes: [
          'Only comparing a node with its direct children.',
          'Allowing duplicates when the bounds must be strict.',
          'Forgetting to carry ancestor bounds into deeper nodes.',
        ],
        hints: [
          'A node must obey rules from every ancestor, not only its parent.',
          'Pass a minimum and maximum down the tree.',
          'Check lo < node.val < hi and tighten one bound for each child.',
        ],
      },
    },
  },
  {
    id: 'heap',
    lv: 'Heap',
    t: 'Heap & Priority Queue',
    learn:
      '<p>A <b>heap</b> is a complete binary tree where each parent is smaller (min-heap) or larger (max-heap) than its children. Stored in an array: children of i are 2i+1 and 2i+2.</p><div class="tip"><b>Analogy:</b> A hospital emergency room. The most urgent patient is always seen next.</div><p>Peek: O(1). Insert / remove top: O(log n). Used for top-K, heap sort, merging sorted lists, Dijkstra.</p>',
    code: '// min-heap parent/child indexes\nconst parent=i=>(i-1)>>1;\nconst left=i=>2*i+1, right=i=>2*i+2;',
    mcq: [
      {
        q: 'Min-heap root holds the?',
        o: ['Largest', 'Smallest', 'Median', 'Newest'],
        a: 1,
        e: 'The smallest value sits on top.',
      },
      {
        q: 'Insert into a heap costs?',
        o: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        a: 1,
        e: 'Sift-up goes at most the tree height.',
      },
    ],
    pr: {
      d: 'Write <code>kthLargest(arr, k)</code> returning the k-th largest value (k=1 is the max).',
      fn: 'kthLargest',
      tests: [
        [[[3, 2, 1, 5, 6, 4], 2], 5],
        [[[1], 1], 1],
        [[[7, 7, 8], 3], 7],
      ],
      starters: {
        javascript: 'function kthLargest(arr,k){\n  // your code\n}',
      },
      solutions: {
        javascript: 'function kthLargest(a,k){ return [...a].sort((x,y)=>y-x)[k-1]; }',
      },
      explanation: {
        idea: 'Sort a copy from largest to smallest. The k-th item in that order is at index k - 1.',
        steps: [
          'Copy the array so the input is unchanged.',
          'Sort the copy in descending numeric order.',
          'Return the value at index k - 1.',
        ],
        trace: {
          input: 'kthLargest([3,2,1,5,6,4], 2)',
          columns: ['sorted descending', 'k', 'index', 'result'],
          rows: [['[6,5,4,3,2,1]', '2', '1', '5']],
        },
        complexity: {
          time: 'O(n log n)',
          space: 'O(n)',
          why: 'Sorting the copied array takes O(n log n) time and uses O(n) space.',
        },
        brute: {
          code: 'let remaining = [...arr];\nfor (let place = 1; place < k; place++) {\n  const largest = Math.max(...remaining);\n  remaining = remaining.filter(value => value !== largest);\n}\nreturn Math.max(...remaining);',
          complexity: 'O(kn) time, O(n) space',
        },
        mistakes: [
          'Sorting ascending and using the wrong index.',
          'Using a string sort that compares digits as text.',
          'Sorting the original array when it should stay unchanged.',
        ],
        hints: [
          'Make a copy before sorting.',
          'Put the biggest value at the beginning.',
          'Read index k - 1 after sorting descending.',
        ],
      },
    },
  },
  {
    id: 'graph',
    lv: 'Graph',
    t: 'Graphs (BFS/DFS)',
    learn:
      '<p>A <b>graph</b> is nodes (vertices) connected by edges. It models maps, networks, and dependencies.</p>\n<div class="tip"><b>Analogy:</b> A city map. Cities are nodes, roads are edges.</div>\n<ul><li><b>BFS</b> (queue): explore level by level. Finds shortest path in unweighted graphs.</li><li><b>DFS</b> (stack/recursion): go deep first, then backtrack.</li></ul>\n<p>Store graphs as an <b>adjacency list</b>: <code>{0:[1,2], 1:[0]}</code>. Always track visited nodes.</p>',
    code: 'function dfs(node,adj,seen){\n  seen.add(node);\n  for(const nb of adj[node]) if(!seen.has(nb)) dfs(nb,adj,seen);\n}',
    mcq: [
      {
        q: 'Which finds the shortest path in an unweighted graph?',
        o: ['DFS', 'BFS', 'Binary search', 'Hashing'],
        a: 1,
        e: 'BFS reaches nodes in order of distance.',
      },
      {
        q: 'Why keep a visited set?',
        o: ['Speed up sorting', 'Avoid infinite loops', 'Reduce memory', 'Balance tree'],
        a: 1,
        e: 'Cycles would cause endless revisits.',
      },
    ],
    pr: {
      d: 'Write <code>countComponents(n, edges)</code>: nodes are 0..n-1, edges is a list of [a,b]. Return the number of connected groups.',
      fn: 'countComponents',
      tests: [
        [
          [
            5,
            [
              [0, 1],
              [1, 2],
              [3, 4],
            ],
          ],
          2,
        ],
        [[4, []], 4],
        [
          [
            3,
            [
              [0, 1],
              [1, 2],
              [0, 2],
            ],
          ],
          1,
        ],
      ],
      starters: {
        javascript: 'function countComponents(n,edges){\n  // your code\n}',
      },
      solutions: {
        javascript:
          'function countComponents(n,e){ const adj=Array.from({length:n},()=>[]); for(const [a,b] of e){adj[a].push(b);adj[b].push(a);} const s=new Set(); let c=0; const dfs=u=>{ s.add(u); for(const v of adj[u]) if(!s.has(v)) dfs(v); }; for(let i=0;i<n;i++) if(!s.has(i)){ c++; dfs(i);} return c; }',
      },
      explanation: {
        idea: 'Build a neighbor list for every node, then visit each connected group with DFS. Every time you find an unvisited node, you have found a new component.',
        steps: [
          'Create an empty neighbor list for each node.',
          'Add both directions for every undirected edge.',
          'Scan nodes from 0 to n - 1.',
          'When a node is unvisited, count a component and DFS through all its reachable neighbors.',
        ],
        trace: {
          input: 'countComponents(5, [[0,1],[1,2],[3,4]])',
          columns: ['scan node', 'visited before', 'action', 'components'],
          rows: [
            ['0', 'no', 'DFS visits 0, 1, 2', '1'],
            ['1', 'yes', 'skip', '1'],
            ['2', 'yes', 'skip', '1'],
            ['3', 'no', 'DFS visits 3, 4', '2'],
            ['4', 'yes', 'skip', '2'],
          ],
        },
        complexity: {
          time: 'O(V + E)',
          space: 'O(V + E)',
          why: 'The neighbor lists store each edge and DFS visits each node and edge a constant number of times.',
        },
        brute: {
          code: 'Build an n × n adjacency matrix, then DFS from every unvisited node.',
          complexity: 'O(V² + E) time and O(V²) space with a matrix',
        },
        mistakes: [
          'Adding an edge in only one direction.',
          'Counting every visited node as a component.',
          'Forgetting to mark a node visited before following its neighbors.',
        ],
        hints: [
          'Create an adjacency list first.',
          'A DFS from one unvisited node covers its whole group.',
          'Increase the count once before each DFS that starts from an unseen node.',
        ],
      },
    },
  },
  {
    id: 'greedy',
    lv: 'Greedy',
    t: 'Greedy Algorithms',
    learn:
      '<p>A <b>greedy</b> algorithm makes the best-looking choice at each step, hoping it leads to the best overall answer. It works only when local best choices combine into a global best.</p><div class="tip"><b>Analogy:</b> Giving change with the fewest coins: always hand over the largest coin that fits.</div><p>Typical pattern: sort first, then pick. Examples: activity selection, fractional knapsack, Huffman coding, jump game.</p>',
    code: '// activity selection: sort by end time\nintervals.sort((a,b)=>a[1]-b[1]);\nlet end=-Infinity, n=0;\nfor(const [s,e] of intervals) if(s>=end){ n++; end=e; }',
    mcq: [
      {
        q: 'Greedy picks the?',
        o: ['Best choice now', 'Random choice', 'Last choice', 'All choices'],
        a: 0,
        e: 'It commits to the locally best option.',
      },
      {
        q: 'Activity selection sorts by?',
        o: ['Start time', 'End time', 'Length', 'Name'],
        a: 1,
        e: 'Finishing early leaves the most room.',
      },
    ],
    pr: {
      d: 'Write <code>maxActivities(intervals)</code>. Each interval is <code>[start,end]</code>. Return the maximum number of non-overlapping intervals (touching ends is allowed).',
      fn: 'maxActivities',
      tests: [
        [
          [
            [
              [1, 3],
              [2, 4],
              [3, 5],
            ],
          ],
          2,
        ],
        [
          [
            [
              [1, 2],
              [2, 3],
              [3, 4],
            ],
          ],
          3,
        ],
        [
          [
            [
              [1, 10],
              [2, 3],
              [4, 5],
            ],
          ],
          2,
        ],
      ],
      starters: {
        javascript: 'function maxActivities(intervals){\n  // your code\n}',
      },
      solutions: {
        javascript:
          'function maxActivities(a){ a=[...a].sort((x,y)=>x[1]-y[1]); let e=-Infinity,n=0; for(const [s,f] of a) if(s>=e){ n++; e=f; } return n; }',
      },
      explanation: {
        idea: 'Choose the activity that finishes earliest, because it leaves the most time for later activities. Keep it only when it starts after the last chosen activity ends.',
        steps: [
          'Copy and sort intervals by end time.',
          'Set the last chosen end time before all activities.',
          'Scan in sorted order and choose an interval if its start is at least the last end.',
          'Update the last end and increase the count.',
        ],
        trace: {
          input: 'maxActivities([[1,2],[2,3],[1,4]])',
          columns: ['interval (sorted by end)', 'start ≥ last end?', 'choice', 'count'],
          rows: [
            ['[1,2]', '1 ≥ -∞', 'take; end = 2', '1'],
            ['[2,3]', '2 ≥ 2', 'take; end = 3', '2'],
            ['[1,4]', '1 ≥ 3 is false', 'skip', '2'],
          ],
        },
        complexity: {
          time: 'O(n log n)',
          space: 'O(n)',
          why: 'Sorting dominates the runtime; a copied list preserves the original intervals.',
        },
        brute: {
          code: 'Try every subset of intervals, keep only non-overlapping subsets, and return the largest valid subset size.',
          complexity: 'O(2ⁿ · n) time',
        },
        mistakes: [
          'Sorting by start time instead of finish time.',
          'Rejecting intervals that touch at an endpoint.',
          'Updating the end time after skipping an overlapping interval.',
        ],
        hints: [
          'The order you consider activities matters.',
          'Finish early to leave more room for the rest.',
          'Sort by end and take an interval when start >= previous end.',
        ],
      },
    },
  },
  {
    id: 'dp',
    lv: 'Dynamic Programming',
    t: 'Dynamic Programming',
    learn:
      '<p><b>Dynamic Programming (DP)</b> solves a problem by breaking it into overlapping subproblems and <b>remembering</b> each answer so it is never computed twice.</p>\n<div class="tip"><b>Analogy:</b> Writing answers on a cheat sheet. If you already solved 5 + 3, just look it up.</div>\n<p>Steps: define the state, write the recurrence, set base cases, then use memoization (top-down) or a table (bottom-up). Naive Fibonacci is O(2ⁿ); DP makes it O(n).</p>',
    code: 'function fib(n,memo={}){\n  if(n<=1) return n;\n  if(memo[n]) return memo[n];\n  return memo[n]=fib(n-1,memo)+fib(n-2,memo);\n}',
    mcq: [
      {
        q: 'DP works best when a problem has?',
        o: ['Sorted input', 'Overlapping subproblems', 'Only one loop', 'A tree shape'],
        a: 1,
        e: 'Repeated subproblems can be cached.',
      },
      {
        q: 'Memoization means?',
        o: ['Sorting results', 'Caching computed results', 'Deleting nodes', 'Using bits'],
        a: 1,
        e: 'Store results to reuse them.',
      },
    ],
    pr: {
      d: 'Write <code>climbStairs(n)</code>: you climb 1 or 2 steps at a time. How many distinct ways to reach step n?',
      fn: 'climbStairs',
      tests: [
        [[2], 2],
        [[3], 3],
        [[5], 8],
        [[10], 89],
      ],
      starters: {
        javascript: 'function climbStairs(n){\n  // your code\n}',
      },
      solutions: {
        javascript:
          'function climbStairs(n){ let a=1,b=1; for(let i=2;i<=n;i++){ [a,b]=[b,a+b]; } return b; }',
      },
      explanation: {
        idea: 'To reach step n, the last move came from step n - 1 or n - 2. Keep only the two previous answers and add them as you move upward.',
        steps: [
          'Start with one way to reach step 0 and one way to reach step 1.',
          'For each step from 2 to n, add the previous two counts.',
          'Shift the two stored counts forward.',
          'Return the count for step n.',
        ],
        trace: {
          input: 'climbStairs(4)',
          columns: ['step', 'previous two counts', 'new ways'],
          rows: [
            ['0 and 1', '1, 1', 'initial values'],
            ['2', '1 + 1', '2'],
            ['3', '1 + 2', '3'],
            ['4', '2 + 3', '5'],
          ],
        },
        complexity: {
          time: 'O(n)',
          space: 'O(1)',
          why: 'The loop runs once per step and stores only two counts.',
        },
        brute: {
          code: 'function ways(n) {\n  if (n <= 1) return 1;\n  return ways(n - 1) + ways(n - 2);\n}',
          complexity: 'O(2ⁿ) time, O(n) call-stack space',
        },
        mistakes: [
          'Adding one instead of two previous counts.',
          'Starting the loop at the wrong step.',
          'Treating the base count for step 0 as zero.',
        ],
        hints: [
          'Try a small n and list the counts.',
          'Each count is the sum of the previous two.',
          'Keep two variables and update both in each loop.',
        ],
      },
    },
  },
  {
    id: 'nt',
    lv: 'Number Theory',
    t: 'Number Theory',
    learn:
      '<p>Number theory covers primes, GCD, modular arithmetic and combinatorics (nCr). The <b>Sieve of Eratosthenes</b> finds all primes up to n in O(n log log n).</p><div class="tip"><b>Analogy:</b> Cross out multiples of 2, then 3, then 5... whatever is left is prime.</div><p>Modular rule: <code>(a+b)%m = ((a%m)+(b%m))%m</code>. Euclid: <code>gcd(a,b)=gcd(b,a%b)</code>.</p>',
    code: 'const p=Array(n+1).fill(true); p[0]=p[1]=false;\nfor(let i=2;i*i<=n;i++)\n  if(p[i]) for(let j=i*i;j<=n;j+=i) p[j]=false;',
    mcq: [
      {
        q: 'Sieve of Eratosthenes finds?',
        o: ['Primes up to n', 'GCD', 'Factorials', 'Sorted data'],
        a: 0,
        e: 'It marks off multiples to leave primes.',
      },
      {
        q: 'gcd(12, 18)?',
        o: ['3', '6', '12', '2'],
        a: 1,
        e: '6 is the largest number dividing both.',
      },
    ],
    pr: {
      d: 'Write <code>countPrimes(n)</code> returning how many primes are &le; n (use a sieve).',
      fn: 'countPrimes',
      tests: [
        [[10], 4],
        [[1], 0],
        [[30], 10],
        [[2], 1],
      ],
      starters: {
        javascript: 'function countPrimes(n){\n  // your code\n}',
      },
      solutions: {
        javascript:
          'function countPrimes(n){ const p=Array(n+1).fill(true); p[0]=p[1]=false; for(let i=2;i*i<=n;i++) if(p[i]) for(let j=i*i;j<=n;j+=i) p[j]=false; return p.filter(Boolean).length; }',
      },
      explanation: {
        idea: 'Start by treating each number as prime. For every prime p, mark its larger multiples as not prime; then count the values that remain marked.',
        steps: [
          'Create a true/false array from 0 through n.',
          'Mark 0 and 1 as not prime.',
          'For each unmarked p up to √n, mark multiples starting at p × p.',
          'Count the true entries.',
        ],
        trace: {
          input: 'countPrimes(10)',
          columns: ['prime p', 'multiples marked', 'primes left so far'],
          rows: [
            ['2', '4, 6, 8, 10', '2, 3, 5, 7 possible'],
            ['3', '9', '2, 3, 5, 7 possible'],
            ['count', '—', '4'],
          ],
        },
        complexity: {
          time: 'O(n log log n)',
          space: 'O(n)',
          why: 'The sieve marks multiples for each prime and stores one flag for every number through n.',
        },
        brute: {
          code: 'let count = 0;\nfor (let value = 2; value <= n; value++) {\n  let prime = true;\n  for (let d = 2; d * d <= value; d++) if (value % d === 0) prime = false;\n  if (prime) count++;\n}',
          complexity: 'O(n√n) time, O(1) extra space',
        },
        mistakes: [
          'Starting to mark multiples at 2p instead of p².',
          'Counting 0 or 1 as prime.',
          'Marking a prime itself as composite.',
        ],
        hints: [
          'Make a boolean array for every value from 0 to n.',
          'When p is prime, cross out its multiples.',
          'Start crossing out at p * p and count the true entries at the end.',
        ],
      },
    },
  },
  {
    id: 'trie',
    lv: 'Trie',
    t: 'Trie',
    learn:
      '<p>A <b>trie</b> (prefix tree) stores words character by character. Each node has children for the next letters and a flag marking the end of a word.</p><div class="tip"><b>Analogy:</b> Phone autocomplete. Typing "ca" jumps straight to words starting with "ca".</div><p>Insert, search and prefix check cost O(L), where L is the word length. Used for autocomplete, spell check, and max-XOR problems.</p>',
    code: 'function insert(root,w){\n  let n=root;\n  for(const c of w){ n=n[c]=n[c]||{}; }\n  n.end=true;\n}',
    mcq: [
      {
        q: 'A trie is best for?',
        o: ['Prefix search', 'Sorting numbers', 'Shortest path', 'Hashing ints'],
        a: 0,
        e: 'Shared prefixes share nodes.',
      },
      {
        q: 'Search time in a trie?',
        o: ['O(n)', 'O(L)', 'O(log n)', 'O(n²)'],
        a: 1,
        e: 'It depends only on the word length L.',
      },
    ],
  },
  {
    id: 'sm',
    lv: 'String Matching',
    t: 'String Matching',
    learn:
      '<p>Pattern matching finds where a pattern occurs in a text. Naive matching is O(n*m). Smarter algorithms speed this up:</p><ul><li><b>KMP:</b> precomputes a prefix table to never move back in the text. O(n+m).</li><li><b>Rabin-Karp:</b> compares rolling hash values.</li><li><b>Z algorithm:</b> uses matching-prefix lengths.</li></ul><div class="tip"><b>Analogy:</b> Ctrl+F in a document.</div>',
    code: 'for(let i=0;i+m<=n;i++){\n  let j=0;\n  while(j<m && t[i+j]===p[j]) j++;\n  if(j===m) return i;\n}\nreturn -1;',
    mcq: [
      {
        q: 'KMP time complexity?',
        o: ['O(n+m)', 'O(n*m)', 'O(n²)', 'O(log n)'],
        a: 0,
        e: 'The text pointer never moves backward.',
      },
      {
        q: 'Rabin-Karp compares using?',
        o: ['Hashes', 'Trees', 'Heaps', 'Stacks'],
        a: 0,
        e: 'A rolling hash is updated per shift.',
      },
    ],
    pr: {
      d: 'Write <code>findPattern(text, pat)</code> returning the first index where pat occurs, or -1. Do not use indexOf or includes.',
      fn: 'findPattern',
      tests: [
        [['hello', 'll'], 2],
        [['abc', 'd'], -1],
        [['aaa', 'aa'], 0],
      ],
      starters: {
        javascript: 'function findPattern(text,pat){\n  // your code\n}',
      },
      solutions: {
        javascript:
          'function findPattern(t,p){ for(let i=0;i+p.length<=t.length;i++){ let j=0; while(j<p.length&&t[i+j]===p[j]) j++; if(j===p.length) return i; } return -1; }',
      },
      explanation: {
        idea: 'Try each possible starting position in the text. Compare the pattern one character at a time; the first full match is the answer.',
        steps: [
          'Start at text index 0.',
          'Compare pattern characters with the text from that starting index.',
          'If every pattern character matches, return the starting index.',
          'Otherwise try the next index; return -1 after all valid starts fail.',
        ],
        trace: {
          input: 'findPattern("ababc", "abc")',
          columns: ['start index', 'comparisons', 'outcome'],
          rows: [
            ['0', 'a=a, b=b, a≠c', 'no match'],
            ['1', 'b≠a', 'no match'],
            ['2', 'a=a, b=b, c=c', 'match → 2'],
          ],
        },
        complexity: {
          time: 'O(nm)',
          space: 'O(1)',
          why: 'For each of up to n starts, the worst case compares m pattern characters and uses only indexes.',
        },
        brute: {
          code: 'for (let i = 0; i <= text.length - pat.length; i++) {\n  if (text.slice(i, i + pat.length) === pat) return i;\n}\nreturn -1;',
          complexity: 'O(nm) time, O(m) temporary space',
        },
        mistakes: [
          'Checking a start position that cannot fit the whole pattern.',
          'Returning the index of the last matched character instead of the start.',
          'Using indexOf or includes when the challenge prohibits them.',
        ],
        hints: [
          'Try each start where the full pattern could still fit.',
          'At each start, compare characters until one differs.',
          'Return i only when j reaches pat.length.',
        ],
      },
    },
  },
  {
    id: 'rq',
    lv: 'Range Query',
    t: 'Segment Tree & Fenwick Tree',
    learn:
      '<p>When you need many <b>range queries</b> (sum, min, max) mixed with <b>updates</b>, prefix sums are too slow to rebuild. Two tools solve this in O(log n):</p><ul><li><b>Segment tree:</b> each node stores the answer for a range. Supports sum, min, max, with lazy propagation for range updates.</li><li><b>Fenwick tree (BIT):</b> compact array for prefix sums with point updates.</li></ul><div class="tip"><b>Analogy:</b> A tournament bracket. Each match stores the winner of a group, so you never replay everything.</div>',
    code: '// Fenwick tree update and prefix query\nfunction upd(i,d){ for(i++;i<=n;i+=i&-i) bit[i]+=d; }\nfunction qry(i){ let s=0; for(i++;i>0;i-=i&-i) s+=bit[i]; return s; }',
    mcq: [
      {
        q: 'Segment tree query/update cost?',
        o: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        a: 1,
        e: 'Height of the tree is log n.',
      },
      {
        q: 'Which is best for sum queries with point updates?',
        o: ['Plain prefix sum', 'Fenwick tree', 'Stack', 'Queue'],
        a: 1,
        e: 'A prefix array needs O(n) to rebuild after an update.',
      },
    ],
  },
];

const bigO = topics[0];
bigO.lv = { en: 'Fundamentals', gu: 'પાયાની બાબતો' };
bigO.t = { en: 'Big-O Complexity', gu: 'Big-O Complexity' };
bigO.learn = bigOLesson;
bigO.mcq[0] = {
  q: {
    en: 'Two nested loops over n items. Complexity?',
    gu: 'n items પર nested loops ચાલે તો Complexity કેટલી?',
  },
  o: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'],
  a: 1,
  e: {
    en: 'n iterations times n iterations = n².',
    gu: 'n iterations ને n iterations સાથે ગુણીએ એટલે n².',
  },
};
bigO.mcq[1] = {
  q: {
    en: 'Which grows slowest as n gets large?',
    gu: 'n મોટો થાય ત્યારે કઈ Complexity સૌથી ધીમી વધે છે?',
  },
  o: ['O(n)', 'O(n²)', 'O(log n)', 'O(2ⁿ)'],
  a: 2,
  e: { en: 'log n grows slowest of these.', gu: 'આમાંથી log n સૌથી ધીમી વધે છે.' },
};
if (bigO.pr) {
  bigO.pr.d = {
    en: 'Write <code>sumN(n)</code> that returns 1+2+...+n in O(1) time (no loops).',
    gu: '<code>sumN(n)</code> લખો, જે 1+2+...+n નો સરવાળો O(1) સમયમાં આપે (loops વગર).',
  };
  bigO.pr.explanation.idea = {
    en: 'The sum from 1 to n can be paired from the beginning and end. Each pair adds up to n+1, so the total is n times n+1 divided by 2.',
    gu: '1 થી n સુધીની સંખ્યાઓને શરૂઆત અને અંતથી જોડી શકાય. દરેક જોડીનો સરવાળો n+1 થાય છે, એટલે કુલ સરવાળો n ગુણ્યા n+1 ભાગ્યા 2 છે.',
  };
  bigO.pr.explanation.steps = [
    { en: 'Take n and n + 1.', gu: 'n અને n + 1 લો.' },
    {
      en: 'Multiply them to count the paired values.',
      gu: 'જોડીઓનો સરવાળો મેળવવા બંનેનો ગુણાકાર કરો.',
    },
    {
      en: 'Divide by 2 because each pair was counted twice.',
      gu: 'દરેક જોડી બે વાર ગણાઈ હોવાથી 2 વડે ભાગો.',
    },
  ];
  bigO.pr.explanation.trace.columns = [
    'n',
    'n + 1',
    { en: 'product', gu: 'ગુણાકાર' },
    { en: 'result', gu: 'પરિણામ' },
  ];
  bigO.pr.explanation.trace.rows = [['5', '6', '5 × 6 = 30', '30 ÷ 2 = 15']];
  bigO.pr.explanation.complexity.why = {
    en: 'The formula uses the same number of arithmetic operations for every n.',
    gu: 'દરેક n માટે આ formula માં arithmetic operations ની સંખ્યા સમાન રહે છે.',
  };
  bigO.pr.explanation.mistakes = [
    {
      en: 'Using a loop even though the prompt asks for O(1).',
      gu: 'પ્રશ્ન O(1) માંગે છતાં loop વાપરવો.',
    },
    {
      en: 'Forgetting to divide the product by 2.',
      gu: 'ગુણાકારને 2 વડે ભાગવાનું ભૂલી જવું.',
    },
  ];
  bigO.pr.explanation.hints = [
    {
      en: 'Try pairing the first and last numbers.',
      gu: 'પહેલી અને છેલ્લી સંખ્યાની જોડી બનાવવાનો પ્રયાસ કરો.',
    },
    { en: 'Every pair has the same sum.', gu: 'દરેક જોડીનો સરવાળો એકસરખો થાય છે.' },
    { en: 'Use n × (n + 1) ÷ 2.', gu: 'n × (n + 1) ÷ 2 વાપરો.' },
  ];
}

applyFoundationLocalizations(topics);
applyAlgorithmLocalizations(topics);
applyRemainingLocalizations(topics);
