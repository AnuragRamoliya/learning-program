import type {
  LocalizedText,
  LocalizedValue,
  ProblemExplanation,
  QuizQuestion,
  Topic,
} from '../../types.js';
import { remainingLessons } from './remainingLessons.js';

const b = (en: string, gu: string): LocalizedText => ({ en, gu });
const question = (
  q: LocalizedValue,
  options: LocalizedValue[],
  answer: number,
  explanation: LocalizedValue,
): QuizQuestion => ({ q, o: options, a: answer, e: explanation });

type PracticeTranslation = {
  description: LocalizedText;
  explanation: Pick<
    ProblemExplanation,
    'idea' | 'steps' | 'trace' | 'complexity' | 'mistakes' | 'hints'
  >;
};

type TopicTranslation = {
  section: LocalizedText;
  title: LocalizedText;
  quiz: QuizQuestion[];
  practice?: PracticeTranslation;
};

const content: Record<string, TopicTranslation> = {
  two: {
    section: b('Two-Pointer', 'Two-Pointer'),
    title: b('Two-Pointer Technique', 'Two-Pointer Technique'),
    quiz: [
      question(
        b(
          'For the classic pair-sum pointer method, what input property is needed?',
          'સામાન્ય pair-sum pointer રીત માટે input માં કયો ગુણધર્મ જરૂરી છે?',
        ),
        [
          b('The array is sorted.', 'Array sorted છે.'),
          b('All values are unique.', 'બધી values unique છે.'),
          b('All values are positive.', 'બધી values ધન છે.'),
          b('The array has even length.', 'Array ની length even છે.'),
        ],
        0,
        b(
          'Sorted order tells us which pointer can move without missing a solution.',
          'Sorted ક્રમથી ઉકેલ ચૂકી ગયા વગર કયો pointer ખસેડવો તે નક્કી થાય છે.',
        ),
      ),
      question(
        b(
          'How many times can each pointer move in a one-pass pair search?',
          'One-pass pair search માં દરેક pointer વધુમાં વધુ કેટલી વાર ખસી શકે?',
        ),
        ['O(n²)', 'O(n)', 'O(log n)', 'O(1)'],
        1,
        b(
          'The two indexes move inward through the array, so the scan is linear.',
          'બે indexes array માં અંદર તરફ જાય છે, એટલે scan linear છે.',
        ),
      ),
    ],
    practice: {
      description: b(
        'Write <code>twoSumSorted(arr, target)</code> for a sorted array. Return the two indexes <code>[i, j]</code> with i &lt; j.',
        'Sorted array માટે <code>twoSumSorted(arr, target)</code> લખો. i &lt; j હોય તેવા બે indexes <code>[i, j]</code> આપો.',
      ),
      explanation: {
        idea: b(
          'Use the sorted order: move the left pointer right to increase a small sum, or move the right pointer left to decrease a large sum.',
          'Sorted ક્રમ વાપરો: સરવાળો નાનો હોય તો વધારવા left pointer જમણે ખસેડો; મોટો હોય તો ઘટાડવા right pointer ડાબે ખસેડો.',
        ),
        steps: [
          b('Start at the first and last indexes.', 'પહેલા અને છેલ્લાં index થી શરૂ કરો.'),
          b('Add the two pointed values.', 'બંને pointers પરની values ઉમેરો.'),
          b(
            'Return the indexes when the sum equals target.',
            'સરવાળો target થાય ત્યારે indexes આપો.',
          ),
          b(
            'Move left right for a small sum, or right left for a large sum.',
            'સરવાળો નાનો હોય તો left જમણે; મોટો હોય તો right ડાબે ખસેડો.',
          ),
        ],
        trace: {
          input: 'twoSumSorted([1,2,4,7], 6)',
          columns: ['left', 'right', b('Sum', 'સરવાળો'), b('Decision', 'નિર્ણય')],
          rows: [
            ['0', '3', '1 + 7 = 8', b('too large; right = 2', 'મોટો; right = 2')],
            ['0', '2', '1 + 4 = 5', b('too small; left = 1', 'નાનો; left = 1')],
            ['1', '2', '2 + 4 = 6', b('found [1,2]', '[1,2] મળ્યું')],
          ],
        },
        complexity: {
          time: 'O(n)',
          space: 'O(1)',
          why: b(
            'Each pointer moves inward at most n times, using only two indexes.',
            'દરેક pointer વધુમાં વધુ n વાર અંદર ખસે છે અને માત્ર બે indexes વપરાય છે.',
          ),
        },
        mistakes: [
          b(
            'Using the method on unsorted input without sorting or another strategy.',
            'Sort કર્યા વગર unsorted input પર આ રીત વાપરવી.',
          ),
          b(
            'Moving the wrong pointer after comparing the sum.',
            'સરવાળો સરખાવ્યા પછી ખોટો pointer ખસેડવો.',
          ),
          b(
            'Returning values when the prompt asks for indexes.',
            'Prompt indexes માંગે ત્યારે values આપવી.',
          ),
        ],
        hints: [
          b('Begin with the widest possible pair.', 'શક્ય સૌથી પહોળી જોડીથી શરૂ કરો.'),
          b(
            'If the sum is too large, which value can be reduced?',
            'સરવાળો મોટો હોય તો કઈ value ઘટાડી શકાય?',
          ),
          b(
            'Move left when sum < target; otherwise move right left.',
            'sum < target હોય તો left ખસેડો; નહીં તો right ડાબે ખસેડો.',
          ),
        ],
      },
    },
  },
  win: {
    section: b('Sliding Window', 'Sliding Window'),
    title: b('Sliding Window', 'Sliding Window'),
    quiz: [
      question(
        b(
          'What kind of range does a sliding window usually represent?',
          'Sliding window સામાન્ય રીતે કયા પ્રકારની range દર્શાવે છે?',
        ),
        [
          b('A contiguous subarray or substring.', 'Contiguous subarray કે substring.'),
          b('Any random subset.', 'કોઈપણ random subset.'),
          b('A tree path only.', 'માત્ર tree path.'),
          b('A graph component only.', 'માત્ર graph component.'),
        ],
        0,
        b(
          'The window is a continuous interval of the original sequence.',
          'Window મૂળ sequence નો સળંગ ભાગ છે.',
        ),
      ),
      question(
        b(
          'After initializing a fixed-size window, what work is needed to slide once?',
          'Fixed-size window શરૂ કર્યા પછી એક વાર ખસેડવા શું કરવું પડે?',
        ),
        [
          'Re-sum all k values',
          'Add the entering and subtract the leaving value',
          'Sort the window',
          'Reverse the array',
        ],
        1,
        b(
          'A constant-time update avoids recomputing the full window.',
          'Constant-time update થી આખી window ફરી ગણવાની જરૂર નથી.',
        ),
      ),
    ],
    practice: {
      description: b(
        'Write <code>maxSumK(arr, k)</code> to return the largest sum of any k consecutive elements.',
        '<code>maxSumK(arr, k)</code> લખો, જે સતત k elements માંથી સૌથી મોટો સરવાળો આપે.',
      ),
      explanation: {
        idea: b(
          'Sum the first k values, then slide the window by subtracting the value that leaves and adding the value that enters.',
          'પહેલી k values નો સરવાળો કરો; પછી બહાર જતી value બાદ કરીને અને અંદર આવતી value ઉમેરી window ખસેડો.',
        ),
        steps: [
          b('Sum the first k array values.', 'Array ની પહેલી k values ઉમેરો.'),
          b(
            'Use the first window sum as the initial best.',
            'પહેલી window નો સરવાળો શરૂઆતનો best રાખો.',
          ),
          b(
            'For each slide, add arr[i] and subtract arr[i - k].',
            'દરેક slide પર arr[i] ઉમેરો અને arr[i - k] બાદ કરો.',
          ),
          b('Update and return the largest sum seen.', 'મળેલો સૌથી મોટો સરવાળો update કરીને આપો.'),
        ],
        trace: {
          input: 'maxSumK([2,1,5,1,3,2], 3)',
          columns: [
            b('Window', 'Window'),
            b('Sum update', 'સરવાળાનો ફેરફાર'),
            b('Sum', 'સરવાળો'),
            b('Best', 'શ્રેષ્ઠ'),
          ],
          rows: [
            ['[2,1,5]', b('first window', 'પહેલી window'), '8', '8'],
            ['[1,5,1]', '8 - 2 + 1', '7', '8'],
            ['[5,1,3]', '7 - 1 + 3', '9', '9'],
            ['[1,3,2]', '9 - 5 + 2', '6', '9'],
          ],
        },
        complexity: {
          time: 'O(n)',
          space: 'O(1)',
          why: b(
            'Each window shift takes constant time after the first window is summed.',
            'પહેલી window નો સરવાળો થયા પછી દરેક shift માં નિશ્ચિત સમય લાગે છે.',
          ),
        },
        mistakes: [
          b(
            'Recomputing all k values for every window.',
            'દરેક window માટે બધી k values ફરી ઉમેરવી.',
          ),
          b(
            'Subtracting the wrong outgoing index instead of i - k.',
            'i - k ને બદલે ખોટો બહાર જતો index બાદ કરવો.',
          ),
          b(
            'Not initializing the best value from the first window.',
            'પહેલી window પરથી best શરૂ ન કરવો.',
          ),
        ],
        hints: [
          b('Calculate the first window directly.', 'પહેલી window સીધી ગણો.'),
          b(
            'On each move, one value exits and one value enters.',
            'દરેક move પર એક value બહાર જાય અને એક અંદર આવે.',
          ),
          b(
            'Use sum += arr[i] - arr[i - k], then update best.',
            'sum += arr[i] - arr[i - k] કરો, પછી best update કરો.',
          ),
        ],
      },
    },
  },
  pre: {
    section: b('Prefix Sum', 'Prefix Sum'),
    title: b('Prefix Sum', 'Prefix Sum'),
    quiz: [
      question(
        b(
          'After building a prefix array, how much time does one range-sum query take?',
          'Prefix array બનાવ્યા પછી એક range-sum query માં કેટલો સમય લાગે?',
        ),
        ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'],
        1,
        b(
          'A range sum uses one subtraction of two stored prefix totals.',
          'Range sum માં સંગ્રહેલા બે prefix totals નો એક subtraction થાય છે.',
        ),
      ),
      question(
        b(
          'Why does the prefix array usually start with a zero?',
          'Prefix array સામાન્ય રીતે zero થી કેમ શરૂ થાય છે?',
        ),
        [
          b(
            'To handle a range starting at index 0 without a special case.',
            'Index 0 થી શરૂ થતી range અલગ case વગર સંભાળવા.',
          ),
          b('To sort the input.', 'Input sort કરવા.'),
          b('To remove negative values.', 'Negative values દૂર કરવા.'),
          b('To halve the array.', 'Array અડધી કરવા.'),
        ],
        0,
        b(
          'With a leading zero, prefix[r + 1] - prefix[l] works when l is zero too.',
          'શરૂઆતના zero સાથે l zero હોય ત્યારે પણ prefix[r + 1] - prefix[l] ચાલે છે.',
        ),
      ),
    ],
    practice: {
      description: b(
        'Write <code>rangeSums(arr, queries)</code>. Each query is an inclusive <code>[l, r]</code>; return all range sums in order.',
        '<code>rangeSums(arr, queries)</code> લખો. દરેક query inclusive <code>[l, r]</code> છે; બધા range sums ક્રમમાં આપો.',
      ),
      explanation: {
        idea: b(
          'Build running totals with a leading zero. The sum from l through r is prefix[r + 1] minus prefix[l].',
          'આગળ zero રાખીને running totals બનાવો. l થી r સુધીનો સરવાળો prefix[r + 1] માંથી prefix[l] બાદ કરવાથી મળે છે.',
        ),
        steps: [
          b('Start the prefix list with 0.', 'Prefix list ની શરૂઆત 0 થી કરો.'),
          b(
            'Append the running sum after each array value.',
            'દરેક array value પછી running sum ઉમેરો.',
          ),
          b(
            'For [l, r], subtract prefix[l] from prefix[r + 1].',
            '[l, r] માટે prefix[r + 1] માંથી prefix[l] બાદ કરો.',
          ),
          b(
            'Return one sum for each query in its original order.',
            'દરેક query માટે એક સરવાળો તેના મૂળ ક્રમમાં આપો.',
          ),
        ],
        trace: {
          input: 'rangeSums([1,2,3,4], [[0,1],[1,3],[2,2]])',
          columns: [b('Query', 'Query'), b('Calculation', 'ગણતરી'), b('Sum', 'સરવાળો')],
          rows: [
            ['[0,1]', 'prefix[2] - prefix[0] = 3 - 0', '3'],
            ['[1,3]', 'prefix[4] - prefix[1] = 10 - 1', '9'],
            ['[2,2]', 'prefix[3] - prefix[2] = 6 - 3', '3'],
          ],
        },
        complexity: {
          time: 'O(n + q)',
          space: 'O(n)',
          why: b(
            'Build the prefix totals in one pass; answer each of q queries with one subtraction.',
            'એક pass માં prefix totals બનાવો; q queries દરેકનો જવાબ એક subtraction થી આપો.',
          ),
        },
        mistakes: [
          b(
            'Using prefix[r] instead of prefix[r + 1] for the inclusive right endpoint.',
            'Inclusive right endpoint માટે prefix[r + 1] ને બદલે prefix[r] વાપરવું.',
          ),
          b('Forgetting the leading zero.', 'શરૂઆતનો zero ભૂલી જવો.'),
          b(
            'Subtracting prefix[l + 1] and omitting arr[l].',
            'prefix[l + 1] બાદ કરીને arr[l] છોડી દેવું.',
          ),
        ],
        hints: [
          b(
            'Use a prefix list one element longer than the array.',
            'Array કરતાં એક element લાંબી prefix list રાખો.',
          ),
          b(
            'The leading zero means the total before index 0 is zero.',
            'શરૂઆતનો zero એટલે index 0 પહેલાંનો total શૂન્ય.',
          ),
          b('Use prefix[r + 1] - prefix[l].', 'prefix[r + 1] - prefix[l] વાપરો.'),
        ],
      },
    },
  },
  back: {
    section: b('Backtracking', 'Backtracking'),
    title: b('Backtracking', 'Backtracking'),
    quiz: [
      question(
        b(
          'What should a backtracking function do after exploring one choice?',
          'એક choice તપાસ્યા પછી backtracking function એ શું કરવું જોઈએ?',
        ),
        [
          b('Undo the choice before trying another.', 'બીજી અજમાવતાં પહેલાં પસંદગી undo કરવી.'),
          b('Keep the choice forever.', 'પસંદગી હંમેશાં રાખવી.'),
          b('Sort all answers.', 'બધા જવાબ sort કરવા.'),
          b('Stop the whole search.', 'આખી search અટકાવવી.'),
        ],
        0,
        b(
          'Un-choosing restores the partial answer so the next branch starts cleanly.',
          'પસંદગી પાછી લેવાથી partial answer પુનઃસ્થાપિત થાય છે અને આગળની branch સ્વચ્છ શરૂ થાય છે.',
        ),
      ),
      question(
        b(
          'Why save [...current] rather than current in the result list?',
          'Result list માં current ને બદલે [...current] કેમ સાચવવું?',
        ),
        [
          b('To store a snapshot that will not change later.', 'પછી ન બદલાય એવો snapshot રાખવા.'),
          b('To sort the subset.', 'Subset sort કરવા.'),
          b('To avoid recursion.', 'Recursion ટાળવા.'),
          b('To reduce the number of subsets.', 'Subsets ની સંખ્યા ઘટાડવા.'),
        ],
        0,
        b(
          'The current list is reused and mutated as the search backtracks.',
          'Search backtrack થાય ત્યારે current list ફરી વપરાય અને બદલાય છે.',
        ),
      ),
    ],
    practice: {
      description: b(
        'Write <code>subsets(nums)</code> returning all subsets in the depth-first order shown by the example.',
        '<code>subsets(nums)</code> લખો, જે ઉદાહરણમાં બતાવેલા depth-first ક્રમમાં બધા subsets આપે.',
      ),
      explanation: {
        idea: b(
          'Save the current subset, then recursively add each later number; remove it afterward to explore the next choice.',
          'હાલનો subset સાચવો, પછી આગળની દરેક સંખ્યા recursive રીતે ઉમેરો; આગળની પસંદગી માટે તેને પાછી કાઢો.',
        ),
        steps: [
          b('Start with an empty current subset.', 'ખાલી current subset થી શરૂ કરો.'),
          b(
            'Save a copy of the current subset as an answer.',
            'હાલના subset ની copy જવાબ તરીકે સાચવો.',
          ),
          b(
            'Choose a number, recurse from the following index, then continue.',
            'સંખ્યા પસંદ કરો, આગળના index થી recurse કરો, પછી આગળ વધો.',
          ),
          b('Pop the chosen number to backtrack.', 'પસંદ કરેલી સંખ્યા pop કરીને backtrack કરો.'),
        ],
        trace: {
          input: 'subsets([1,2])',
          columns: [
            b('Current subset', 'હાલનો subset'),
            b('Action', 'ક્રિયા'),
            b('Saved answers', 'સાચવેલા જવાબો'),
          ],
          rows: [
            ['[]', b('save; choose 1', 'સાચવો; 1 પસંદ કરો'), '[[]]'],
            ['[1]', b('save; choose 2', 'સાચવો; 2 પસંદ કરો'), '[[], [1]]'],
            ['[1,2]', b('save; backtrack', 'સાચવો; પાછા જાઓ'), '[[], [1], [1,2]]'],
            ['[2]', b('save; finish', 'સાચવો; પૂર્ણ'), '[[], [1], [1,2], [2]]'],
          ],
        },
        complexity: {
          time: 'O(n · 2ⁿ)',
          space: 'O(n) auxiliary, excluding output',
          why: b(
            'There are 2ⁿ subsets and copying a subset can take up to n time.',
            '2ⁿ subsets છે અને એક subset copy કરવામાં n જેટલો સમય લાગી શકે.',
          ),
        },
        mistakes: [
          b(
            'Pushing the mutable current array instead of a copy.',
            'Copy ને બદલે બદલાતી current array push કરવી.',
          ),
          b('Forgetting to pop after a recursive call.', 'Recursive call પછી pop કરવાનું ભૂલવું.'),
          b(
            'Reusing the same index and generating repeated choices.',
            'એ જ index ફરી વાપરી repeated choices બનાવવી.',
          ),
        ],
        hints: [
          b('Keep a current subset and a result list.', 'Current subset અને result list રાખો.'),
          b('Save the current subset before extending it.', 'વધારતાં પહેલાં હાલનો subset સાચવો.'),
          b(
            'Push nums[i], recurse with i + 1, then pop.',
            'nums[i] push કરો, i + 1 સાથે recurse કરો, પછી pop કરો.',
          ),
        ],
      },
    },
  },
  ll: {
    section: b('Linked List', 'Linked List'),
    title: b('Linked Lists', 'Linked Lists'),
    quiz: [
      question(
        b(
          'What is the time to reach a node by position in a singly linked list?',
          'Singly linked list માં position પરથી node સુધી પહોંચવાનો સમય કેટલો છે?',
        ),
        ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        1,
        b(
          'Nodes must be followed one link at a time from the head.',
          'Head થી દરેક link એક પછી એક અનુસરવી પડે છે.',
        ),
      ),
      question(
        b(
          'What should be saved before changing current.next while reversing?',
          'Reverse કરતી વખતે current.next બદલતાં પહેલાં શું સાચવવું?',
        ),
        [
          b('The next node', 'આગળનો node'),
          b('The list length only', 'માત્ર list ની length'),
          b('The previous head twice', 'જૂનો head બે વાર'),
          b('Nothing', 'કંઈ નહીં'),
        ],
        0,
        b(
          'Saving the next pointer keeps the unprocessed remainder of the list reachable.',
          'આગળનો pointer સાચવવાથી list નો હજી ન ફેરવેલો ભાગ મળતો રહે છે.',
        ),
      ),
    ],
    practice: {
      description: b(
        'Write <code>reverseList(head)</code> for nodes shaped like <code>{val, next}</code>. Return the new head.',
        '<code>{val, next}</code> જેવા nodes માટે <code>reverseList(head)</code> લખો. નવો head આપો.',
      ),
      explanation: {
        idea: b(
          'Reverse each next link to point backward, keeping previous, current, and next so no nodes are lost.',
          'દરેક next link ને પાછળ તરફ ફેરવો અને previous, current તથા next રાખો જેથી કોઈ node ખોવાય નહીં.',
        ),
        steps: [
          b(
            'Set previous to null and current to head.',
            'previous ને null અને current ને head રાખો.',
          ),
          b(
            'Save current.next before rewiring the link.',
            'Link બદલતાં પહેલાં current.next સાચવો.',
          ),
          b('Point current.next to previous.', 'current.next ને previous તરફ કરો.'),
          b(
            'Advance both pointers; previous is the new head at the end.',
            'બંને pointers આગળ વધારો; અંતે previous નવો head છે.',
          ),
        ],
        trace: {
          input: 'reverseList(1 → 2 → 3 → null)',
          columns: [
            b('Step', 'પગલું'),
            b('previous', 'previous'),
            b('current', 'current'),
            b('Reversed link', 'Reverse થયેલ link'),
          ],
          rows: [
            [b('start', 'શરૂઆત'), 'null', '1 → 2 → 3', '—'],
            ['1', '1 → null', '2 → 3', '1 → null'],
            ['2', '2 → 1 → null', '3', '2 → 1'],
            ['3', '3 → 2 → 1 → null', 'null', b('new head is 3', 'નવો head 3')],
          ],
        },
        complexity: {
          time: 'O(n)',
          space: 'O(1)',
          why: b(
            'Each node is visited once and the algorithm uses a fixed number of pointers.',
            'દરેક node એક વાર જોવાય છે અને algorithm નિશ્ચિત સંખ્યાના pointers વાપરે છે.',
          ),
        },
        mistakes: [
          b(
            'Overwriting current.next before saving the next node.',
            'આગળનો node સાચવતાં પહેલાં current.next overwrite કરવું.',
          ),
          b(
            'Forgetting to advance current after rewiring.',
            'Link બદલ્યા પછી current આગળ વધારવાનું ભૂલવું.',
          ),
          b(
            'Returning the old head instead of the final previous node.',
            'છેલ્લા previous ને બદલે જૂનો head આપવો.',
          ),
        ],
        hints: [
          b('Use previous = null and current = head.', 'previous = null અને current = head રાખો.'),
          b(
            'Save next, reverse one arrow, then advance.',
            'next સાચવો, એક arrow reverse કરો, પછી આગળ વધો.',
          ),
          b('Return previous when current becomes null.', 'current null થાય ત્યારે previous આપો.'),
        ],
      },
    },
  },
  sq: {
    section: b('Stack', 'Stack'),
    title: b('Stacks & Queues', 'Stacks અને Queues'),
    quiz: [
      question(
        b('What does LIFO mean for a stack?', 'Stack માં LIFO નો અર્થ શું છે?'),
        [
          b('Last In, First Out', 'Last In, First Out'),
          b('First In, First Out', 'First In, First Out'),
          b('Lowest Index, First Out', 'Lowest Index, First Out'),
          b('Last Item, Final Order', 'Last Item, Final Order'),
        ],
        0,
        b(
          'The most recently pushed item is removed first.',
          'સૌથી છેલ્લે push કરેલો item પહેલાં કાઢવામાં આવે છે.',
        ),
      ),
      question(
        b(
          'What is useful for matching opening and closing brackets?',
          'Opening અને closing brackets સરખાવવા કયું structure ઉપયોગી છે?',
        ),
        ['Queue', 'Stack', 'Heap', 'Prefix sum'],
        1,
        b(
          'The most recent opening bracket must match the next closing bracket.',
          'સૌથી છેલ્લો opening bracket આગળના closing bracket સાથે મળવો જોઈએ.',
        ),
      ),
    ],
    practice: {
      description: b(
        'Write <code>validParentheses(s)</code> to check that each closing bracket matches the most recent unmatched opener.',
        '<code>validParentheses(s)</code> લખો, જે દરેક closing bracket સૌથી તાજેતરના unmatched opener સાથે મળે છે કે નહીં તપાસે.',
      ),
      explanation: {
        idea: b(
          'Push opening brackets. For a closing bracket, pop and compare its required opener; all brackets must be matched by the end.',
          'Opening brackets push કરો. Closing bracket માટે pop કરીને જરૂરી opener સરખાવો; અંતે બધા brackets match થવા જોઈએ.',
        ),
        steps: [
          b(
            'Create a stack and a map of closing-to-opening brackets.',
            'Stack અને closing-to-opening brackets નો map બનાવો.',
          ),
          b('Push each opening bracket.', 'દરેક opening bracket push કરો.'),
          b(
            'For a closer, pop and check that it is the matching opener.',
            'Closer માટે pop કરીને matching opener છે કે નહીં તપાસો.',
          ),
          b(
            'Return true only when no mismatch occurred and the stack is empty.',
            'Mismatch ન થયો હોય અને stack ખાલી હોય ત્યારે જ true આપો.',
          ),
        ],
        trace: {
          input: 'validParentheses("{[]}")',
          columns: [
            b('Character', 'અક્ષર'),
            b('Action', 'ક્રિયા'),
            b('Stack after action', 'ક્રિયા પછી Stack'),
          ],
          rows: [
            ['{', b('push', 'push'), '{'],
            ['[', b('push', 'push'), '{ ['],
            [']', b('pop [', '[ pop કરો'), '{'],
            ['}', b('pop {', '{ pop કરો'), b('empty → true', 'ખાલી → true')],
          ],
        },
        complexity: {
          time: 'O(n)',
          space: 'O(n)',
          why: b(
            'Each character is pushed or popped at most once; the stack can hold up to n open brackets.',
            'દરેક અક્ષર વધુમાં વધુ એક વાર push કે pop થાય છે; stack n open brackets સુધી રાખી શકે.',
          ),
        },
        mistakes: [
          b(
            'Popping an empty stack for a closing bracket.',
            'Closing bracket માટે ખાલી stack માંથી pop કરવું.',
          ),
          b(
            'Checking only that the stack is empty before the scan ends.',
            'Scan પૂરો થાય પહેલાં stack ખાલી છે એટલું જ તપાસવું.',
          ),
          b(
            'Accepting the wrong type or order of brackets.',
            'ખોટા પ્રકાર કે ક્રમના brackets સ્વીકારવા.',
          ),
        ],
        hints: [
          b(
            'Keep the opening bracket on the stack until its closer appears.',
            'Closer આવે ત્યાં સુધી opening bracket stack માં રાખો.',
          ),
          b(
            'The top of the stack is the most recent unmatched opener.',
            'Stack ની ટોચે સૌથી તાજેતરનો unmatched opener છે.',
          ),
          b(
            'On every closer, compare stack.pop() with its matching opener.',
            'દરેક closer પર stack.pop() ને matching opener સાથે સરખાવો.',
          ),
        ],
      },
    },
  },
  queue: {
    section: b('Queue', 'Queue'),
    title: b('Queue', 'Queue'),
    quiz: [
      question(
        b('What does FIFO mean for a queue?', 'Queue માં FIFO નો અર્થ શું છે?'),
        [
          b('First In, First Out', 'First In, First Out'),
          b('Last In, First Out', 'Last In, First Out'),
          b('Fast Input, Fast Output', 'Fast Input, Fast Output'),
          b('First Index, Final Order', 'First Index, Final Order'),
        ],
        0,
        b(
          'The earliest enqueued item is dequeued first.',
          'સૌથી પહેલાં enqueue થયેલો item પહેલાં dequeue થાય છે.',
        ),
      ),
      question(
        b(
          'Why avoid Array.shift() in a large queue loop?',
          'મોટી queue loop માં Array.shift() કેમ ટાળવું?',
        ),
        [
          b(
            'It may shift remaining items and cost O(n).',
            'તે બાકીના items ખસેડે અને O(n) લાગી શકે.',
          ),
          b('It sorts the array.', 'તે array sort કરે છે.'),
          b('It changes FIFO into LIFO.', 'તે FIFO ને LIFO બનાવે છે.'),
          b('It cannot remove a value.', 'તે value કાઢી શકતું નથી.'),
        ],
        0,
        b(
          'A head index or circular buffer avoids moving every remaining item on each removal.',
          'Head index કે circular buffer દરેક removal પર બાકીના items ખસેડવાનું ટાળે છે.',
        ),
      ),
    ],
  },
  deque: {
    section: b('Deque', 'Deque'),
    title: b('Deque', 'Deque'),
    quiz: [
      question(
        b('What does a deque allow?', 'Deque શું કરવાની મંજૂરી આપે છે?'),
        [
          b('Add and remove at both ends.', 'બંને છેડે ઉમેરો અને કાઢો.'),
          b('Only add at the front.', 'માત્ર આગળ ઉમેરો.'),
          b('Only remove at the back.', 'માત્ર પાછળથી કાઢો.'),
          b('Sort values automatically.', 'Values આપમેળે sort કરો.'),
        ],
        0,
        b(
          'Double-ended means both front and back support insertion and removal.',
          'Double-ended એટલે આગળ અને પાછળ બંને તરફ ઉમેરવું અને કાઢવું.',
        ),
      ),
      question(
        b(
          'What does a monotonic deque help find efficiently?',
          'Monotonic deque કઈ વસ્તુ ઝડપથી શોધવામાં મદદ કરે છે?',
        ),
        [
          b(
            'Maximum or minimum in each sliding window.',
            'દરેક sliding window નો maximum કે minimum.',
          ),
          b('A sorted copy of any tree.', 'કોઈપણ tree ની sorted copy.'),
          b('The GCD of all graph nodes.', 'Graph nodes નો GCD.'),
          b('A recursive base case.', 'Recursive base case.'),
        ],
        0,
        b(
          'It keeps only useful candidates in order, with the current answer at the front.',
          'તે ઉપયોગી candidates ને ક્રમમાં રાખે છે અને હાલનો જવાબ આગળ મળે છે.',
        ),
      ),
    ],
  },
  tree: {
    section: b('Binary Tree', 'Binary Tree'),
    title: b('Trees', 'Trees'),
    quiz: [
      question(
        b(
          'Which traversal visits left subtree, node, then right subtree?',
          'કયું traversal પહેલાં left subtree, પછી node અને પછી right subtree જુએ છે?',
        ),
        ['Preorder', 'Inorder', 'Postorder', 'Level order'],
        1,
        b(
          'Inorder traversal uses left, node, right order.',
          'Inorder traversal નો ક્રમ left, node, right છે.',
        ),
      ),
      question(
        b(
          'Which structure is used for level-order traversal?',
          'Level-order traversal માટે કયું structure વપરાય છે?',
        ),
        ['Stack only', 'Queue', 'Heap', 'Set only'],
        1,
        b(
          'A queue processes nodes by level in first-in-first-out order.',
          'Queue first-in-first-out ક્રમમાં nodes ને level પ્રમાણે process કરે છે.',
        ),
      ),
    ],
    practice: {
      description: b(
        'Write <code>maxDepth(root)</code> for nodes shaped like <code>{val,left,right}</code>. Return the number of nodes on the longest root-to-leaf path; null has depth 0.',
        '<code>{val,left,right}</code> જેવા nodes માટે <code>maxDepth(root)</code> લખો. સૌથી લાંબા root-to-leaf path માં nodes ની સંખ્યા આપો; null ની depth 0 છે.',
      ),
      explanation: {
        idea: b(
          'The depth at a node is one plus the larger child depth; an empty subtree has depth zero.',
          'Node ની depth એટલે મોટા child depth કરતાં એક વધુ; ખાલી subtree ની depth શૂન્ય છે.',
        ),
        steps: [
          b('Return 0 for a null node.', 'Null node માટે 0 આપો.'),
          b(
            'Recursively find the left subtree depth.',
            'Left subtree ની depth recursive રીતે શોધો.',
          ),
          b(
            'Recursively find the right subtree depth.',
            'Right subtree ની depth recursive રીતે શોધો.',
          ),
          b('Return 1 plus the larger depth.', 'મોટી depth કરતાં 1 વધુ આપો.'),
        ],
        trace: {
          input:
            'maxDepth({val:1,left:{val:2,left:null,right:null},right:{val:3,left:{val:4,left:null,right:null},right:null}})',
          columns: [
            b('Node', 'Node'),
            b('Left depth', 'Left depth'),
            b('Right depth', 'Right depth'),
            b('Returned', 'મળેલો જવાબ'),
          ],
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
          why: b(
            'Every node is visited once; the recursion stack grows with the tree height h.',
            'દરેક node એક વાર જોવાય છે; recursion stack tree ની height h સાથે વધે છે.',
          ),
        },
        mistakes: [
          b('Returning 1 for an empty tree.', 'ખાલી tree માટે 1 આપવું.'),
          b(
            'Adding child depths instead of taking their maximum.',
            'Child depths ઉમેરવી, maximum લેવાને બદલે.',
          ),
          b(
            'Forgetting to include the current node with +1.',
            'હાલના node માટે +1 કરવાનું ભૂલવું.',
          ),
        ],
        hints: [
          b('Start with the null-node case.', 'Null-node case થી શરૂ કરો.'),
          b(
            'A root-to-leaf path continues through the deeper child.',
            'Root-to-leaf path વધુ ઊંડા child માંથી આગળ જાય છે.',
          ),
          b(
            'Return 1 + Math.max(leftDepth, rightDepth).',
            '1 + Math.max(leftDepth, rightDepth) આપો.',
          ),
        ],
      },
    },
  },
  bst: {
    section: b('Binary Search Tree', 'Binary Search Tree'),
    title: b('Binary Search Tree', 'Binary Search Tree'),
    quiz: [
      question(
        b(
          'What order does an inorder traversal of a BST produce?',
          'BST નું inorder traversal કયો ક્રમ આપે છે?',
        ),
        [
          b('Ascending sorted order', 'વધતો sorted ક્રમ'),
          b('Level order', 'Level order'),
          b('Random order', 'Random ક્રમ'),
          b('Descending order always', 'હંમેશાં ઘટતો ક્રમ'),
        ],
        0,
        b(
          'Left, node, right visits values in ascending order under the BST rule.',
          'BST ના નિયમ હેઠળ left, node, right values ને વધતા ક્રમે જુએ છે.',
        ),
      ),
      question(
        b(
          'Why does a balanced BST search in O(log n)?',
          'Balanced BST માં search O(log n) કેમ છે?',
        ),
        [
          b(
            'Each comparison follows one branch down a logarithmic-height tree.',
            'દરેક comparison logarithmic-height tree ની એક branch અનુસરે છે.',
          ),
          b('It scans every node twice.', 'તે દરેક node બે વાર scan કરે છે.'),
          b('It sorts the tree first.', 'તે પહેલાં tree sort કરે છે.'),
          b('It uses constant memory only.', 'તે માત્ર constant memory વાપરે છે.'),
        ],
        0,
        b(
          'A balanced tree has height O(log n), and search follows one root-to-leaf path.',
          'Balanced tree ની height O(log n) છે અને search એક root-to-leaf path અનુસરે છે.',
        ),
      ),
    ],
    practice: {
      description: b(
        'Write <code>isValidBST(root)</code> for <code>{val,left,right}</code> nodes. An empty tree is valid; each node must obey strict ancestor bounds.',
        '<code>{val,left,right}</code> nodes માટે <code>isValidBST(root)</code> લખો. ખાલી tree માન્ય છે; દરેક node એ strict ancestor bounds પાળવા જોઈએ.',
      ),
      explanation: {
        idea: b(
          'Pass a valid low/high range down the tree; every node must be strictly inside the bounds set by all its ancestors.',
          'Tree માં low/high ની માન્ય range નીચે મોકલો; દરેક node બધા ancestors ના bounds ની અંદર હોવો જોઈએ.',
        ),
        steps: [
          b('Treat a null node as valid.', 'Null node ને માન્ય માનો.'),
          b(
            'Reject a value that is at or outside its allowed bounds.',
            'Allowed bounds પર કે બહારની value નકારો.',
          ),
          b(
            'For the left child, keep the low bound and set high to this value.',
            'Left child માટે low રાખો અને high હાલની value કરો.',
          ),
          b(
            'For the right child, set low to this value and keep high.',
            'Right child માટે low હાલની value કરો અને high રાખો.',
          ),
        ],
        trace: {
          input:
            'isValidBST({val:2,left:{val:1,left:null,right:null},right:{val:3,left:null,right:null}})',
          columns: [
            b('Node', 'Node'),
            b('Allowed range', 'માન્ય range'),
            b('Check', 'તપાસ'),
            b('Result', 'પરિણામ'),
          ],
          rows: [
            ['2', '(-∞, ∞)', b('inside', 'અંદર'), b('check children', 'children તપાસો')],
            ['1', '(-∞, 2)', b('inside', 'અંદર'), b('valid', 'માન્ય')],
            ['3', '(2, ∞)', b('inside', 'અંદર'), b('valid', 'માન્ય')],
            [b('root', 'root'), '—', b('both valid', 'બંને માન્ય'), 'true'],
          ],
        },
        complexity: {
          time: 'O(n)',
          space: 'O(h)',
          why: b(
            'Each node is checked once and recursive calls use space proportional to tree height.',
            'દરેક node એક વાર તપાસાય છે અને recursive calls tree ની height જેટલી જગ્યા વાપરે છે.',
          ),
        },
        mistakes: [
          b(
            'Comparing a node only with its direct children.',
            'Node ને માત્ર સીધા children સાથે સરખાવવો.',
          ),
          b(
            'Allowing duplicates when strict ordering is required.',
            'Strict ordering જરૂરી હોય ત્યારે duplicates સ્વીકારવા.',
          ),
          b(
            'Dropping an ancestor bound deeper in the tree.',
            'Tree માં નીચે જતા ancestor નો bound ભૂલી જવો.',
          ),
        ],
        hints: [
          b(
            'A node must obey every ancestor, not just its parent.',
            'Node એ માત્ર parent નહીં, બધા ancestors નું પાલન કરવું.',
          ),
          b(
            'Pass minimum and maximum values through recursion.',
            'Recursion માં minimum અને maximum મોકલો.',
          ),
          b(
            'Check low < node.val < high and tighten one bound for each child.',
            'low < node.val < high તપાસો અને દરેક child માટે એક bound કડક કરો.',
          ),
        ],
      },
    },
  },
  heap: {
    section: b('Heap', 'Heap'),
    title: b('Heap & Priority Queue', 'Heap અને Priority Queue'),
    quiz: [
      question(
        b(
          'Where is the minimum value in a min-heap?',
          'Min-heap માં સૌથી નાની value ક્યાં હોય છે?',
        ),
        ['At the root', 'At the last array index', 'Always at a leaf', 'At the leftmost leaf'],
        0,
        b(
          'The parent is no greater than its children, so the minimum is at the root.',
          'Parent તેના children કરતાં મોટો નથી, એટલે minimum root પર છે.',
        ),
      ),
      question(
        b(
          'Which heap keeps the k largest values efficiently?',
          'k સૌથી મોટી values ઝડપથી રાખવા કયો heap વાપરાય?',
        ),
        [
          b('A min-heap of size k', 'Size k નો min-heap'),
          b('A max-heap of size n', 'Size n નો max-heap'),
          b('A queue of size k', 'Size k ની queue'),
          b('A stack of size n', 'Size n નો stack'),
        ],
        0,
        b(
          'The root is the smallest kept candidate and can be removed when a larger value arrives.',
          'Root રાખેલા candidates માં નાનું છે અને મોટી value આવે ત્યારે કાઢી શકાય છે.',
        ),
      ),
    ],
    practice: {
      description: b(
        'Write <code>kthLargest(arr, k)</code> returning the k-th largest value. This reference solution sorts a copy in descending order.',
        '<code>kthLargest(arr, k)</code> લખો, જે kમી સૌથી મોટી value આપે. આ reference solution copy ને ઘટતા ક્રમે sort કરે છે.',
      ),
      explanation: {
        idea: b(
          'Sort a copy from largest to smallest. The k-th largest value is at index k - 1.',
          'એક copy ને મોટાથી નાનાં ક્રમે sort કરો. kમી સૌથી મોટી value index k - 1 પર છે.',
        ),
        steps: [
          b('Copy the input so it is unchanged.', 'Input ન બદલાય તે માટે તેની copy બનાવો.'),
          b(
            'Sort the copy in descending numeric order.',
            'Copy ને સંખ્યાત્મક રીતે ઘટતા ક્રમે sort કરો.',
          ),
          b(
            'Convert the one-based k position to zero-based index k - 1.',
            'એકથી શરૂ થતી k position ને zero-based k - 1 કરો.',
          ),
          b('Return the value at that index.', 'તે index પરની value આપો.'),
        ],
        trace: {
          input: 'kthLargest([3,2,1,5,6,4], 2)',
          columns: [
            b('Sorted copy', 'Sorted copy'),
            'k',
            b('Index k - 1', 'Index k - 1'),
            b('Result', 'પરિણામ'),
          ],
          rows: [['[6,5,4,3,2,1]', '2', '1', '5']],
        },
        complexity: {
          time: 'O(n log n)',
          space: 'O(n)',
          why: b(
            'The reference solution sorts an n-value copy and stores that copy.',
            'Reference solution n values ની copy sort કરે છે અને copy memory માં રાખે છે.',
          ),
        },
        mistakes: [
          b(
            'Using lexicographic sorting without a numeric comparator.',
            'Numeric comparator વગર lexicographic sort કરવું.',
          ),
          b('Returning index k instead of k - 1.', 'k - 1 ને બદલે index k આપવો.'),
          b(
            'Sorting the original array when a copy is required.',
            'Copy જરૂરી હોય ત્યારે original array sort કરવી.',
          ),
        ],
        hints: [
          b('Arrange values from largest to smallest.', 'Values ને મોટાથી નાનાં ક્રમે ગોઠવો.'),
          b(
            'Remember that array indexes start at zero.',
            'Array indexes zero થી શરૂ થાય છે તે યાદ રાખો.',
          ),
          b(
            'Return [...arr].sort((a, b) => b - a)[k - 1].',
            '[...arr].sort((a, b) => b - a)[k - 1] આપો.',
          ),
        ],
      },
    },
  },
  graph: {
    section: b('Graph', 'Graph'),
    title: b('Graphs (BFS/DFS)', 'Graphs (BFS/DFS)'),
    quiz: [
      question(
        b(
          'Which traversal finds the fewest edges in an unweighted graph?',
          'Unweighted graph માં સૌથી ઓછા edges કયું traversal શોધે છે?',
        ),
        ['DFS', 'BFS', 'Inorder', 'Heapify'],
        1,
        b(
          'BFS explores nodes level by level from the start.',
          'BFS શરૂઆતથી nodes ને level પ્રમાણે explore કરે છે.',
        ),
      ),
      question(
        b(
          'When should a graph node be marked visited in BFS?',
          'BFS માં graph node ને visited ક્યારે mark કરવો?',
        ),
        [
          b('When it is enqueued.', 'તે enqueue થાય ત્યારે.'),
          b('Only after the entire search.', 'આખી search પછી જ.'),
          b('Before building the graph.', 'Graph બનાવતાં પહેલાં.'),
          b('Never.', 'ક્યારેય નહીં.'),
        ],
        0,
        b(
          'Mark-on-enqueue prevents duplicate queue entries and repeated work.',
          'Enqueue સમયે mark કરવાથી duplicate queue entries અને પુનરાવર્તિત કામ અટકે છે.',
        ),
      ),
    ],
    practice: {
      description: b(
        'Write <code>countComponents(n, edges)</code> for an undirected graph. Return the number of disconnected groups.',
        'Undirected graph માટે <code>countComponents(n, edges)</code> લખો. અલગ પડેલા groups ની સંખ્યા આપો.',
      ),
      explanation: {
        idea: b(
          'Build an adjacency list and run DFS from every unvisited node. Each new DFS start identifies one connected component.',
          'Adjacency list બનાવો અને દરેક unvisited node થી DFS કરો. દરેક નવો DFS start એક connected component બતાવે છે.',
        ),
        steps: [
          b('Create one neighbor list per node.', 'દરેક node માટે neighbor list બનાવો.'),
          b(
            'Add both directions for every undirected edge.',
            'દરેક undirected edge ની બંને દિશા ઉમેરો.',
          ),
          b('Scan nodes from 0 to n - 1.', '0 થી n - 1 સુધી nodes તપાસો.'),
          b(
            'For each unvisited node, add one component and DFS its group.',
            'દરેક unvisited node માટે component એક વધારો અને તેના group પર DFS કરો.',
          ),
        ],
        trace: {
          input: 'countComponents(5, [[0,1],[1,2],[3,4]])',
          columns: [
            b('Node scanned', 'તપાસેલો node'),
            b('Visited?', 'Visited?'),
            b('DFS group', 'DFS group'),
            b('Components', 'Components'),
          ],
          rows: [
            ['0', 'no', '[0,1,2]', '1'],
            ['1', 'yes', b('skip', 'છોડો'), '1'],
            ['2', 'yes', b('skip', 'છોડો'), '1'],
            ['3', 'no', '[3,4]', '2'],
            ['4', 'yes', b('skip', 'છોડો'), '2'],
          ],
        },
        complexity: {
          time: 'O(V + E)',
          space: 'O(V + E)',
          why: b(
            'Building the adjacency list and DFS each visit every vertex and edge a constant number of times.',
            'Adjacency list બનાવતાં અને DFS કરતાં દરેક vertex તથા edge નિશ્ચિત વખત જોવાય છે.',
          ),
        },
        mistakes: [
          b(
            'Forgetting to add both directions for an undirected edge.',
            'Undirected edge ની બંને દિશા ઉમેરવાનું ભૂલવું.',
          ),
          b(
            'Counting every visited node as a new component.',
            'દરેક visited node ને નવો component ગણવો.',
          ),
          b(
            'Not marking nodes visited before exploring their neighbors.',
            'Neighbors explore કરતાં પહેલાં node visited mark ન કરવો.',
          ),
        ],
        hints: [
          b(
            'First represent the graph as neighbor lists.',
            'પહેલાં graph ને neighbor lists રૂપે રાખો.',
          ),
          b(
            'One DFS should mark every node in one connected group.',
            'એક DFS એક connected group ના બધા nodes mark કરવો જોઈએ.',
          ),
          b(
            'Start DFS and increment the count only when a node is still unvisited.',
            'Node unvisited હોય ત્યારે જ DFS શરૂ કરીને count વધારો.',
          ),
        ],
      },
    },
  },
  greedy: {
    section: b('Greedy', 'Greedy'),
    title: b('Greedy Algorithms', 'Greedy Algorithms'),
    quiz: [
      question(
        b(
          'What should you establish before trusting a greedy choice?',
          'Greedy પસંદગી પર વિશ્વાસ કરતાં પહેલાં શું સ્થાપિત કરવું જોઈએ?',
        ),
        [
          b(
            'That local choices lead to a global optimum.',
            'સ્થાનિક પસંદગીઓ વૈશ્વિક શ્રેષ્ઠ ઉકેલ આપે છે.',
          ),
          b('That the input is always random.', 'Input હંમેશાં random છે.'),
          b('That recursion is used.', 'Recursion વપરાય છે.'),
          b('That every value is unique.', 'દરેક value unique છે.'),
        ],
        0,
        b(
          'A locally best-looking option is not automatically globally optimal.',
          'સ્થાનિક રીતે શ્રેષ્ઠ દેખાતો વિકલ્પ આપમેળે વૈશ્વિક રીતે શ્રેષ્ઠ નથી.',
        ),
      ),
      question(
        b(
          'For maximum non-overlapping activities, what is the greedy sort key?',
          'વધુમાં વધુ non-overlapping activities માટે greedy sort key શું છે?',
        ),
        [
          b('Finish time, earliest first.', 'Finish time, વહેલું પહેલાં.'),
          b('Start time, latest first.', 'Start time, છેલ્લું પહેલાં.'),
          b('Duration, longest first.', 'Duration, લાંબું પહેલાં.'),
          b('Random order.', 'Random ક્રમ.'),
        ],
        0,
        b(
          'The earliest finish leaves the most room for later compatible activities.',
          'વહેલું પૂરું થવાથી પછીની compatible activities માટે વધુ જગ્યા રહે છે.',
        ),
      ),
    ],
    practice: {
      description: b(
        'Write <code>maxActivities(intervals)</code> to return the maximum number of non-overlapping intervals. Touching endpoints are allowed.',
        '<code>maxActivities(intervals)</code> લખો, જે ન અથડાતા intervals ની મહત્તમ સંખ્યા આપે. Endpoints અડકે તે માન્ય છે.',
      ),
      explanation: {
        idea: b(
          'Sort activities by finish time and repeatedly take the next one whose start is at or after the last chosen finish.',
          'Activities ને finish time પ્રમાણે sort કરો અને છેલ્લાં finish પછી કે તે સમયે શરૂ થતી આગળની activity લો.',
        ),
        steps: [
          b(
            'Copy and sort intervals by their end time.',
            'Intervals ની copy કરીને end time પ્રમાણે sort કરો.',
          ),
          b(
            'Start with an end time before all intervals.',
            'બધા intervals પહેલાંનો end time રાખો.',
          ),
          b(
            'Take an interval when its start is at least the last chosen end.',
            'Interval નો start છેલ્લાં પસંદ કરેલા end જેટલો કે મોટો હોય ત્યારે લો.',
          ),
          b(
            'Update the end and count each chosen interval.',
            'End update કરો અને પસંદ કરેલી દરેક interval ગણો.',
          ),
        ],
        trace: {
          input: 'maxActivities([[1,2],[2,3],[1,4]])',
          columns: [
            b('Interval by end', 'End પ્રમાણે interval'),
            b('Can take?', 'લઈ શકાય?'),
            b('Action', 'ક્રિયા'),
            b('Count', 'ગણતરી'),
          ],
          rows: [
            ['[1,2]', '1 >= -∞', b('take; end = 2', 'લો; end = 2'), '1'],
            ['[2,3]', '2 >= 2', b('take; end = 3', 'લો; end = 3'), '2'],
            ['[1,4]', '1 >= 3 is false', b('skip', 'છોડો'), '2'],
          ],
        },
        complexity: {
          time: 'O(n log n)',
          space: 'O(n)',
          why: b(
            'Sorting the copied intervals dominates the one linear selection scan.',
            'Copy કરેલા intervals ને sort કરવાનું એક linear scan કરતાં વધુ સમય લે છે.',
          ),
        },
        mistakes: [
          b(
            'Sorting by start time instead of finish time.',
            'Finish time ને બદલે start time પ્રમાણે sort કરવું.',
          ),
          b(
            'Rejecting intervals that start exactly when the last one ends.',
            'છેલ્લી interval પૂરી થાય ત્યારે જ શરૂ થતી interval નકારવી.',
          ),
          b(
            'Assuming every greedy rule works for every optimization problem.',
            'દરેક optimization problem માટે દરેક greedy નિયમ ચાલે એવું માનવું.',
          ),
        ],
        hints: [
          b(
            'Choose the interval that frees the schedule earliest.',
            'Schedule વહેલો ખાલી કરે તેવી interval પસંદ કરો.',
          ),
          b(
            'Sort by the second value in each interval.',
            'દરેક interval ની બીજી value પ્રમાણે sort કરો.',
          ),
          b(
            'Take when start >= the last chosen end.',
            'start >= છેલ્લો પસંદ કરેલો end હોય ત્યારે લો.',
          ),
        ],
      },
    },
  },
  dp: {
    section: b('Dynamic Programming', 'Dynamic Programming'),
    title: b('Dynamic Programming', 'Dynamic Programming'),
    quiz: [
      question(
        b('What does memoization do?', 'Memoization શું કરે છે?'),
        [
          b('Caches computed answers for reuse.', 'ગણેલા જવાબો ફરી વાપરવા cache કરે છે.'),
          b('Sorts all subproblems.', 'બધી subproblems sort કરે છે.'),
          b('Deletes repeated input values.', 'દોહરાતી input values કાઢે છે.'),
          b('Turns recursion into a queue.', 'Recursion ને queue માં ફેરવે છે.'),
        ],
        0,
        b(
          'Memoization remembers a state’s answer so it is not recomputed.',
          'Memoization state નો જવાબ યાદ રાખે છે જેથી ફરી ગણવો ન પડે.',
        ),
      ),
      question(
        b(
          'Which pair of properties commonly makes dynamic programming applicable?',
          'કયા બે ગુણધર્મો સામાન્ય રીતે dynamic programming માટે જરૂરી છે?',
        ),
        [
          b(
            'Overlapping subproblems and optimal substructure.',
            'Overlapping subproblems અને optimal substructure.',
          ),
          b('Sorted input and unique values.', 'Sorted input અને unique values.'),
          b('A graph and a heap.', 'Graph અને heap.'),
          b('Only constant-time operations.', 'માત્ર constant-time operations.'),
        ],
        0,
        b(
          'Repeated smaller states can be reused, and their answers can build larger answers.',
          'દોહરાતી નાની states ફરી વાપરી શકાય અને તેમના જવાબો મોટા જવાબો બનાવે છે.',
        ),
      ),
    ],
    practice: {
      description: b(
        'Write <code>climbStairs(n)</code>: each move climbs 1 or 2 steps. Return the number of distinct ways to reach step n.',
        '<code>climbStairs(n)</code> લખો: દરેક ચાલમાં 1 કે 2 પગથિયાં ચઢી શકાય. પગથિયું n સુધી પહોંચવાના જુદા રસ્તા આપો.',
      ),
      explanation: {
        idea: b(
          'The final move comes from step n - 1 or n - 2, so the ways to reach n equal the previous two counts added together.',
          'છેલ્લી ચાલ n - 1 કે n - 2 માંથી આવે છે, એટલે n સુધીના રસ્તા અગાઉની બે ગણતરીઓનો સરવાળો છે.',
        ),
        steps: [
          b(
            'Use one way for step 0 and one way for step 1.',
            'Step 0 અને step 1 માટે એક-એક રસ્તો રાખો.',
          ),
          b(
            'For each step from 2 through n, add the prior two counts.',
            '2 થી n સુધી દરેક step માટે અગાઉની બે ગણતરી ઉમેરો.',
          ),
          b('Shift the two stored counts forward.', 'સાચવેલી બે ગણતરી આગળ ખસેડો.'),
          b('Return the count for step n.', 'Step n ની ગણતરી આપો.'),
        ],
        trace: {
          input: 'climbStairs(4)',
          columns: [b('Step', 'પગલું'), b('Previous counts', 'અગાઉની ગણતરી'), b('Ways', 'રસ્તા')],
          rows: [
            ['0 and 1', '1, 1', b('base values', 'base values')],
            ['2', '1 + 1', '2'],
            ['3', '1 + 2', '3'],
            ['4', '2 + 3', '5'],
          ],
        },
        complexity: {
          time: 'O(n)',
          space: 'O(1)',
          why: b(
            'The loop processes each step once and stores only two previous answers.',
            'Loop દરેક step એક વાર process કરે છે અને અગાઉના બે જવાબો જ રાખે છે.',
          ),
        },
        mistakes: [
          b('Using the wrong base value for step 0.', 'Step 0 માટે ખોટી base value વાપરવી.'),
          b(
            'Adding only one previous count instead of two.',
            'બેને બદલે માત્ર એક અગાઉની ગણતરી ઉમેરવી.',
          ),
          b(
            'Updating the two values in an order that loses the older count.',
            'જૂની ગણતરી ખોવાય તે ક્રમમાં બે values update કરવી.',
          ),
        ],
        hints: [
          b('List the number of ways for the first few steps.', 'શરૂઆતના પગથિયાં માટે રસ્તા ગણો.'),
          b(
            'Each answer is the sum of the two answers before it.',
            'દરેક જવાબ પહેલાંના બે જવાબોનો સરવાળો છે.',
          ),
          b(
            'Keep two variables and update them once per step.',
            'બે variables રાખીને દરેક step પર update કરો.',
          ),
        ],
      },
    },
  },
  nt: {
    section: b('Number Theory', 'Number Theory'),
    title: b('Number Theory', 'Number Theory'),
    quiz: [
      question(
        b('What does the Sieve of Eratosthenes find?', 'Sieve of Eratosthenes શું શોધે છે?'),
        [
          b('All primes up to n.', 'n સુધીના બધા primes.'),
          b('Only the GCD.', 'માત્ર GCD.'),
          b('A sorted array.', 'Sorted array.'),
          b('A shortest path.', 'Shortest path.'),
        ],
        0,
        b(
          'It marks composite multiples so the unmarked values are prime.',
          'તે composite multiples mark કરે છે જેથી બાકી values prime રહે.',
        ),
      ),
      question(
        b('What is gcd(12, 18)?', 'gcd(12, 18) કેટલું છે?'),
        ['3', '6', '12', '2'],
        1,
        b(
          'Six is the largest integer that divides both values.',
          'છ બંને values ને ભાગે તેવી સૌથી મોટી પૂર્ણાંક સંખ્યા છે.',
        ),
      ),
    ],
    practice: {
      description: b(
        'Write <code>countPrimes(n)</code> to return the number of primes less than or equal to n using a sieve.',
        'Sieve વાપરી n કરતાં નાના કે સમાન primes ની સંખ્યા આપતું <code>countPrimes(n)</code> લખો.',
      ),
      explanation: {
        idea: b(
          'Mark multiples of each prime as composite, beginning at its square; the true entries left are primes.',
          'દરેક prime ના multiples ને તેના square થી શરૂ કરીને composite mark કરો; બાકી true entries primes છે.',
        ),
        steps: [
          b(
            'Create a boolean entry for every value from 0 through n.',
            '0 થી n સુધી દરેક value માટે boolean entry બનાવો.',
          ),
          b('Mark 0 and 1 as not prime.', '0 અને 1 ને not prime mark કરો.'),
          b(
            'For each prime p up to √n, mark multiples starting at p * p.',
            '√n સુધીના દરેક prime p માટે p * p થી multiples mark કરો.',
          ),
          b('Count the entries that remain true.', 'બાકી રહેલી true entries ગણો.'),
        ],
        trace: {
          input: 'countPrimes(10)',
          columns: [
            b('Prime p', 'Prime p'),
            b('Newly marked', 'નવા mark થયેલા'),
            b('Primes left', 'બાકી primes'),
          ],
          rows: [
            ['2', '4, 6, 8, 10', '2, 3, 5, 7'],
            ['3', '9', '2, 3, 5, 7'],
            [b('count', 'ગણતરી'), '—', '4'],
          ],
        },
        complexity: {
          time: 'O(n log log n)',
          space: 'O(n)',
          why: b(
            'The sieve marks multiples for each prime and stores one flag per value through n.',
            'Sieve દરેક prime ના multiples mark કરે છે અને n સુધી દરેક value માટે એક flag રાખે છે.',
          ),
        },
        mistakes: [
          b('Counting 0 or 1 as prime.', '0 કે 1 ને prime ગણવું.'),
          b(
            'Starting to cross out at 2p rather than p * p.',
            'p * p ને બદલે 2p થી mark શરૂ કરવું.',
          ),
          b('Forgetting to handle n < 2.', 'n < 2 સંભાળવાનું ભૂલવું.'),
        ],
        hints: [
          b(
            'Start with a boolean list for values 0 through n.',
            '0 થી n સુધીની boolean list થી શરૂ કરો.',
          ),
          b(
            'When p is still marked prime, cross out its multiples.',
            'p હજી prime mark હોય ત્યારે તેના multiples mark કરો.',
          ),
          b(
            'Start at p * p and count the remaining true entries.',
            'p * p થી શરૂ કરીને બાકી true entries ગણો.',
          ),
        ],
      },
    },
  },
  trie: {
    section: b('Trie', 'Trie'),
    title: b('Trie', 'Trie'),
    quiz: [
      question(
        b('What makes a trie useful for autocomplete?', 'Autocomplete માટે trie ઉપયોગી કેમ છે?'),
        [
          b(
            'Words that share a prefix share a path.',
            'સમાન prefix ધરાવતા શબ્દો એક path share કરે છે.',
          ),
          b('It sorts numbers in constant time.', 'તે numbers ને constant time માં sort કરે છે.'),
          b('It removes every repeated character.', 'તે દરેક repeated character દૂર કરે છે.'),
          b('It stores only word lengths.', 'તે માત્ર word lengths રાખે છે.'),
        ],
        0,
        b(
          'Following the prefix path leads directly to candidate words.',
          'Prefix path અનુસરવાથી candidate words સુધી સીધા પહોંચી શકાય છે.',
        ),
      ),
      question(
        b(
          'What extra check distinguishes search("ca") from startsWith("ca")?',
          'search("ca") અને startsWith("ca") વચ્ચે કયો વધારાનો check ફરક પાડે છે?',
        ),
        [
          b(
            'Whether the final node marks the end of a word.',
            'છેલ્લો node શબ્દનો અંત mark કરે છે કે નહીં.',
          ),
          b('Whether the root is empty.', 'Root ખાલી છે કે નહીં.'),
          b('Whether the word is sorted.', 'શબ્દ sorted છે કે નહીં.'),
          b('Whether the prefix has two letters.', 'Prefix માં બે અક્ષર છે કે નહીં.'),
        ],
        0,
        b(
          'A path can exist for a prefix that was never inserted as a complete word.',
          'પૂર્ણ શબ્દ તરીકે insert ન થયેલા prefix માટે પણ path હોઈ શકે છે.',
        ),
      ),
    ],
  },
  sm: {
    section: b('String Matching', 'String Matching'),
    title: b('String Matching', 'String Matching'),
    quiz: [
      question(
        b(
          'What is KMP’s main benefit after a mismatch?',
          'Mismatch પછી KMP નો મુખ્ય ફાયદો શું છે?',
        ),
        [
          b(
            'It reuses prefix information instead of moving back in the text.',
            'Text માં પાછા ગયા વગર prefix માહિતી ફરી વાપરે છે.',
          ),
          b('It sorts the text.', 'Text sort કરે છે.'),
          b('It uses a heap for each character.', 'દરેક અક્ષર માટે heap વાપરે છે.'),
          b('It removes the pattern.', 'Pattern દૂર કરે છે.'),
        ],
        0,
        b(
          'The LPS table tells KMP where the pattern can resume; the text pointer never moves backward.',
          'LPS table pattern ક્યાંથી ચાલુ કરવો તે કહે છે; text pointer પાછળ જતો નથી.',
        ),
      ),
      question(
        b(
          'What should Rabin–Karp do when the pattern and text-window hashes match?',
          'Pattern અને text-window hashes મળે ત્યારે Rabin–Karp એ શું કરવું જોઈએ?',
        ),
        [
          b(
            'Verify the actual characters because hashes can collide.',
            'Hashes collide થઈ શકે, એટલે actual characters તપાસો.',
          ),
          b('Assume a match without checking.', 'તપાસ્યા વગર match માનો.'),
          b('Reverse the text.', 'Text reverse કરો.'),
          b('Discard the pattern.', 'Pattern કાઢી નાખો.'),
        ],
        0,
        b(
          'Different strings can produce the same hash, so confirm equality.',
          'જુદી strings નો hash એકસરખો થઈ શકે છે, એટલે સમાનતા confirm કરો.',
        ),
      ),
    ],
    practice: {
      description: b(
        'Write <code>findPattern(text, pat)</code> returning the first matching index, or -1. Do not use indexOf or includes.',
        '<code>findPattern(text, pat)</code> લખો, જે પહેલો matching index આપે અથવા -1 આપે. indexOf કે includes વાપરશો નહીં.',
      ),
      explanation: {
        idea: b(
          'Try each valid start in the text and compare pattern characters; return the first start where all characters match.',
          'Text માં દરેક માન્ય શરૂઆત અજમાવો અને pattern characters સરખાવો; બધા મળે તેવી પહેલી શરૂઆત આપો.',
        ),
        steps: [
          b('Start at text index 0.', 'Text index 0 થી શરૂ કરો.'),
          b(
            'Compare pattern characters at the current start.',
            'હાલની શરૂઆતથી pattern characters સરખાવો.',
          ),
          b(
            'Return the start when all pattern characters match.',
            'Pattern ના બધા characters મળે ત્યારે શરૂઆતનો index આપો.',
          ),
          b(
            'Otherwise try the next start; return -1 if none match.',
            'નહીં તો આગળની શરૂઆત અજમાવો; કોઈ ન મળે તો -1 આપો.',
          ),
        ],
        trace: {
          input: 'findPattern("hello", "ll")',
          columns: [
            b('Start index', 'Start index'),
            b('Comparison', 'સરખામણી'),
            b('Result', 'પરિણામ'),
          ],
          rows: [
            ['0', '"h" != "l"', b('try next start', 'આગળની શરૂઆત અજમાવો')],
            ['1', '"e" != "l"', b('try next start', 'આગળની શરૂઆત અજમાવો')],
            ['2', '"l" = "l"; "l" = "l"', b('match at 2', '2 પર match')],
          ],
        },
        complexity: {
          time: 'O(nm)',
          space: 'O(1)',
          why: b(
            'For each possible text start, the naive solution may compare all m pattern characters.',
            'દરેક શક્ય text start પર naive solution બધા m pattern characters સરખાવી શકે છે.',
          ),
        },
        mistakes: [
          b(
            'Trying a start where the full pattern cannot fit.',
            'આખું pattern ન સમાય તેવી શરૂઆત અજમાવવી.',
          ),
          b(
            'Returning the last matched-character index rather than the start.',
            'શરૂઆતને બદલે છેલ્લાં મળેલા અક્ષરનો index આપવો.',
          ),
          b(
            'Using indexOf or includes when the task forbids them.',
            'Task મનાઈ કરે ત્યારે indexOf કે includes વાપરવું.',
          ),
        ],
        hints: [
          b(
            'Only try starts where the pattern still fits.',
            'Pattern પૂરું સમાય તેવી શરૂઆત જ અજમાવો.',
          ),
          b(
            'At each start, compare characters until one differs.',
            'દરેક શરૂઆત પર જુદો અક્ષર મળે ત્યાં સુધી compare કરો.',
          ),
          b('Return i when j reaches pat.length.', 'j, pat.length થાય ત્યારે i આપો.'),
        ],
      },
    },
  },
  rq: {
    section: b('Range Query', 'Range Query'),
    title: b('Segment Tree & Fenwick Tree', 'Segment Tree અને Fenwick Tree'),
    quiz: [
      question(
        b(
          'Which structure is simplest for many range-sum queries on an unchanged array?',
          'ન બદલાતી array પર ઘણા range-sum queries માટે કયું structure સરળ છે?',
        ),
        ['Prefix sum', 'Stack', 'Trie', 'Deque'],
        0,
        b(
          'Prefix sums answer each static range sum with one subtraction.',
          'Prefix sums દરેક static range sum નો જવાબ એક subtraction થી આપે છે.',
        ),
      ),
      question(
        b(
          'What is a common query/update cost for Fenwick and segment trees?',
          'Fenwick અને segment trees માટે સામાન્ય query/update ખર્ચ કેટલો છે?',
        ),
        ['O(1)', 'O(log n)', 'O(n²)', 'O(2ⁿ)'],
        1,
        b(
          'Each operation follows a logarithmic number of tree indexes or ranges.',
          'દરેક operation logarithmic સંખ્યાના tree indexes કે ranges અનુસરે છે.',
        ),
      ),
    ],
  },
};

export function applyRemainingLocalizations(topics: Topic[]) {
  for (const [id, translation] of Object.entries(content)) {
    const topic = topics.find((item) => item.id === id);
    if (!topic) throw new Error(`Missing DSA topic for localization: ${id}`);
    const lesson = remainingLessons[id];
    if (!lesson) throw new Error(`Missing structured lesson for topic: ${id}`);

    topic.lv = translation.section;
    topic.t = translation.title;
    topic.learn = lesson;

    translation.quiz.forEach((questionTranslation, index) => {
      const current = topic.mcq[index];
      if (!current) throw new Error(`Missing quiz question ${index + 1} for topic ${id}`);
      topic.mcq[index] = {
        ...current,
        ...questionTranslation,
        o: [...questionTranslation.o],
      };
    });

    if (translation.practice) {
      if (!topic.pr) throw new Error(`Missing coding problem for localized topic: ${id}`);
      topic.pr.d = translation.practice.description;
      topic.pr.explanation.idea = translation.practice.explanation.idea;
      topic.pr.explanation.steps = [...translation.practice.explanation.steps];
      topic.pr.explanation.trace.columns = [...translation.practice.explanation.trace.columns];
      topic.pr.explanation.trace.rows = translation.practice.explanation.trace.rows.map((row) => [
        ...row,
      ]);
      topic.pr.explanation.complexity.why = translation.practice.explanation.complexity.why;
      topic.pr.explanation.mistakes = [...translation.practice.explanation.mistakes];
      topic.pr.explanation.hints = [...translation.practice.explanation.hints];
    } else if (topic.pr) {
      throw new Error(`Missing practice localization for coding topic: ${id}`);
    }
  }
}
