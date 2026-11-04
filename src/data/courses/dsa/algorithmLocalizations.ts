import type { Topic, LocalizedText } from '../../types.js';
import {
  binarySearchLesson,
  bitwiseLesson,
  hashingLesson,
  sortingLesson,
} from './algorithmLessons.js';

const b = (en: string, gu: string): LocalizedText => ({ en, gu });

const content = {
  bs: {
    section: b('Searching', 'Searching'),
    title: b('Binary Search', 'Binary Search'),
    learn: binarySearchLesson,
    quiz: [
      {
        q: b(
          'What must be true before using binary search?',
          'Binary search વાપરતાં પહેલાં કઈ શરત સાચી હોવી જોઈએ?',
        ),
        o: [
          b('The array is sorted.', 'Array sorted છે.'),
          b('Every value is positive.', 'દરેક value ધન છે.'),
          b('The array has even length.', 'Array ની length even છે.'),
          b('Every value is unique.', 'દરેક value unique છે.'),
        ],
        e: b(
          'Sorted order tells us which half cannot contain the target.',
          'Sorted ક્રમથી target કયા અડધામાં ન હોઈ શકે તે જાણી શકાય છે.',
        ),
      },
      {
        q: b(
          'What is the time complexity of binary search?',
          'Binary search ની time complexity કેટલી છે?',
        ),
        o: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
        a: 1,
        e: b(
          'The search range is halved after each comparison.',
          'દરેક comparison પછી search range અડધી થાય છે.',
        ),
      },
    ],
    practice: {
      description: b(
        'Write <code>binarySearch(arr, target)</code> to return the target index, or -1 if it is missing. The array is sorted.',
        '<code>binarySearch(arr, target)</code> લખો, જે target નો index આપે અથવા ન મળે તો -1 આપે. Array sorted છે.',
      ),
      idea: b(
        'Use the sorted order to discard half the remaining indexes after each comparison.',
        'દરેક comparison પછી sorted ક્રમથી બાકી indexes માંથી અડધા કાઢી નાખો.',
      ),
      steps: [
        b(
          'Set low and high to the first and last indexes.',
          'low અને high ને પહેલા અને છેલ્લાં index પર મૂકો.',
        ),
        b('Check the middle value.', 'વચ્ચેની value તપાસો.'),
        b(
          'Move low right if the value is too small; otherwise move high left.',
          'Value નાની હોય તો low જમણે; નહીં તો high ડાબે ખસેડો.',
        ),
        b(
          'Return the index if found, or -1 when the range is empty.',
          'મળે તો index આપો; range ખાલી થાય તો -1 આપો.',
        ),
      ],
      columns: ['low', 'high', 'mid', 'value', b('Action', 'કામ')],
      rows: [
        ['0', '4', '2', '5', b('too small; low = 3', 'નાનું; low = 3')],
        ['3', '4', '3', '7', b('found at index 3', 'index 3 પર મળ્યું')],
      ],
      why: b(
        'Each comparison halves the range, and the iterative solution stores only a few indexes.',
        'દરેક comparison range અડધી કરે છે અને iterative solution થોડા indexes જ રાખે છે.',
      ),
      mistakes: [
        b('Searching an unsorted array.', 'Unsorted array માં search કરવું.'),
        b(
          'Setting high to arr.length instead of arr.length - 1.',
          'high ને arr.length રાખવો, arr.length - 1 નહીં.',
        ),
        b('Failing to move past mid after a comparison.', 'Comparison પછી mid થી આગળ ન વધવું.'),
      ],
      hints: [
        b('Track a low index and a high index.', 'low અને high indexes રાખો.'),
        b('Compare the middle item with the target.', 'વચ્ચેના item ને target સાથે સરખાવો.'),
        b(
          'Discard mid and the half that cannot contain the target.',
          'mid અને target ન હોઈ શકે તે અડધો ભાગ દૂર કરો.',
        ),
      ],
    },
  },
  sort: {
    section: b('Sorting', 'Sorting'),
    title: b('Sorting', 'Sorting'),
    learn: sortingLesson,
    quiz: [
      {
        q: b(
          'What is the worst-case time complexity of insertion sort?',
          'Insertion sort ની worst-case time complexity કેટલી છે?',
        ),
        o: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
        a: 2,
        e: b(
          'Each new value may shift across the already sorted prefix.',
          'દરેક નવી value પહેલેથી sorted prefix માંથી ખસવી પડી શકે છે.',
        ),
      },
      {
        q: b(
          'Which sorting algorithm splits the input and merges sorted halves?',
          'કયો sorting algorithm input વહેંચીને sorted halves જોડે છે?',
        ),
        o: [
          b('Bubble sort', 'Bubble sort'),
          b('Insertion sort', 'Insertion sort'),
          b('Merge sort', 'Merge sort'),
          b('Selection sort', 'Selection sort'),
        ],
        a: 2,
        e: b(
          'Merge sort divides the input, sorts each half, and merges them.',
          'Merge sort input વહેંચે છે, દરેક half sort કરે છે અને પછી જોડે છે.',
        ),
      },
    ],
    practice: {
      description: b(
        'Write <code>sortArray(arr)</code> to return the numbers in ascending order without using <code>.sort()</code>. Do not modify the input.',
        '<code>sortArray(arr)</code> લખો, જે <code>.sort()</code> વાપર્યા વગર numbers ને વધતા ક્રમમાં આપે. Input બદલશો નહીં.',
      ),
      idea: b(
        'Insertion sort grows a sorted prefix by shifting larger values right and placing each saved key in its gap.',
        'Insertion sort મોટા values ને જમણે ખસેડીને અને સાચવેલી key ખાલી જગ્યામાં મૂકીને sorted prefix મોટો કરે છે.',
      ),
      steps: [
        b('Copy the input array.', 'Input array ની copy બનાવો.'),
        b(
          'Start at index 1 and save the current value as key.',
          'Index 1 થી શરૂ કરીને હાલની value ને key તરીકે સાચવો.',
        ),
        b(
          'Shift larger values in the sorted prefix one position right.',
          'Sorted prefix માંની મોટી values ને એક position જમણે ખસેડો.',
        ),
        b(
          'Insert key where the shifts stop and return the copy.',
          'Shifts અટકે ત્યાં key મૂકો અને copy આપો.',
        ),
      ],
      columns: [
        'i',
        b('key', 'key'),
        b('Shifts and insert', 'Shifts અને insert'),
        b('Array after pass', 'Pass પછીની array'),
      ],
      rows: [
        ['1', '2', b('shift 4; insert 2', '4 ખસેડો; 2 મૂકો'), '[2,4,3]'],
        ['2', '3', b('shift 4; insert 3', '4 ખસેડો; 3 મૂકો'), '[2,3,4]'],
      ],
      why: b(
        'In the worst case every key shifts through the sorted prefix; the copied array stores n values.',
        'Worst case માં દરેક key sorted prefix માંથી ખસે છે; copied array n values રાખે છે.',
      ),
      mistakes: [
        b('Overwriting the key before saving it.', 'Key સાચવતાં પહેલાં તેને overwrite કરવી.'),
        b('Shifting values smaller than the key.', 'Key કરતાં નાની values ખસેડવી.'),
        b(
          'Sorting the original array when a copy is required.',
          'Copy જરૂરી હોય ત્યારે મૂળ array sort કરવી.',
        ),
      ],
      hints: [
        b(
          'The first item is already a sorted section of length one.',
          'પહેલો item length એકનો sorted ભાગ છે.',
        ),
        b(
          'Save the next value, then shift larger earlier values right.',
          'આગળની value સાચવો, પછી અગાઉની મોટી values જમણે ખસેડો.',
        ),
        b(
          'Insert the saved key in the gap before the smaller value.',
          'સાચવેલી key નાની value પહેલાંની ખાલી જગ્યામાં મૂકો.',
        ),
      ],
    },
  },
  bit: {
    section: b('Bit Manipulation', 'Bit Manipulation'),
    title: b('Bitwise Algorithms', 'Bitwise Algorithms'),
    learn: bitwiseLesson,
    quiz: [
      {
        q: b('What is 5 XOR 5?', '5 XOR 5 કેટલું થાય?'),
        o: ['10', '5', '0', '1'],
        a: 2,
        e: b('Equal bit patterns XOR to zero.', 'સમાન bit patterns નો XOR શૂન્ય થાય છે.'),
      },
      {
        q: b('Which operator shifts bits to the left?', 'કયો operator bits ને ડાબે shift કરે છે?'),
        o: ['>>', '<<', '&', '^'],
        a: 1,
        e: b('The left-shift operator is <<.', 'Left-shift operator << છે.'),
      },
    ],
    practice: {
      description: b(
        'Write <code>isPowerOfTwo(n)</code> using a bitwise trick. Assume n is a positive-range integer as defined by the challenge.',
        '<code>isPowerOfTwo(n)</code> ને bitwise trick વડે લખો. Challenge માં આપેલી range નો integer n માનો.',
      ),
      idea: b(
        'A positive power of two has one set bit; n & (n - 1) clears it and produces zero.',
        'ધન power of two માં એક set bit હોય છે; n & (n - 1) તેને દૂર કરીને શૂન્ય આપે છે.',
      ),
      steps: [
        b('Reject n when it is not positive.', 'n ધન ન હોય તો તેને નકારો.'),
        b(
          'Subtract one to flip the lowest set bit and the lower bits.',
          'સૌથી જમણો set bit અને નીચેના bits બદલવા એક ઘટાડો.',
        ),
        b('AND n with n - 1.', 'n ને n - 1 સાથે AND કરો.'),
        b('Return true only when the result is zero.', 'Result શૂન્ય હોય ત્યારે જ true આપો.'),
      ],
      columns: [b('Expression', 'Expression'), b('Binary', 'Binary'), b('Meaning', 'અર્થ')],
      rows: [
        ['n = 8', '1000', b('one set bit', 'એક set bit')],
        ['n - 1 = 7', '0111', b('lower bits set', 'નીચેના bits set')],
        ['8 & 7', '0000', b('power of two', 'power of two')],
      ],
      why: b(
        'A fixed number of bit operations is used on the integer representation.',
        'Integer representation પર bits operations ની નિશ્ચિત સંખ્યા થાય છે.',
      ),
      mistakes: [
        b(
          'Forgetting to reject zero; zero has no power-of-two exponent.',
          'Zero ને નકારવાનું ભૂલવું; zero કોઈ exponent ની power of two નથી.',
        ),
        b('Accepting negative values.', 'ઋણ values સ્વીકારવી.'),
        b(
          'Ignoring JavaScript’s 32-bit conversion for bitwise operators.',
          'Bitwise operators માટે JavaScript નું 32-bit conversion અવગણવું.',
        ),
      ],
      hints: [
        b('Write 8 and 7 in binary.', '8 અને 7 ને binary માં લખો.'),
        b(
          'Notice that a power of two has exactly one 1-bit.',
          'Power of two માં ચોક્કસ એક 1-bit હોય છે તે જુઓ.',
        ),
        b('Use n > 0 && (n & (n - 1)) === 0.', 'n > 0 && (n & (n - 1)) === 0 વાપરો.'),
      ],
    },
  },
  hash: {
    section: b('Hashing', 'Hashing'),
    title: b('Hashing (Map & Set)', 'Hashing (Map અને Set)'),
    learn: hashingLesson,
    quiz: [
      {
        q: b(
          'What is the average lookup time for a Map key?',
          'Map key શોધવાનો સરેરાશ સમય કેટલો છે?',
        ),
        o: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        a: 0,
        e: b(
          'A hash map usually reaches the key directly on average.',
          'Hash map સરેરાશમાં key સુધી સીધું પહોંચે છે.',
        ),
      },
      {
        q: b(
          'Which structure keeps only unique values?',
          'કયું structure માત્ર unique values રાખે છે?',
        ),
        o: [b('Array', 'Array'), b('Set', 'Set'), b('Stack', 'Stack'), b('Queue', 'Queue')],
        a: 1,
        e: b(
          'A Set stores each value at most once.',
          'Set દરેક value ને વધુમાં વધુ એક વાર રાખે છે.',
        ),
      },
    ],
    practice: {
      description: b(
        'Write <code>twoSum(nums, target)</code> to return the two indexes, smaller first, whose values add to target. Exactly one answer exists.',
        '<code>twoSum(nums, target)</code> લખો, જે સરવાળો target થાય તે બે indexes નાનાથી મોટા ક્રમમાં આપે. ચોક્કસ એક જવાબ છે.',
      ),
      idea: b(
        'Store each earlier number and index in a Map; before storing the current number, look up its needed complement.',
        'અગાઉના દરેક number અને index ને Map માં રાખો; હાલનો number store કરતાં પહેલાં જરૂરી complement શોધો.',
      ),
      steps: [
        b('Create an empty Map from number to index.', 'Number થી index સુધીનો ખાલી Map બનાવો.'),
        b('For each number, compute target - number.', 'દરેક number માટે target - number ગણો.'),
        b(
          'If that complement is already present, return both indexes.',
          'Complement પહેલેથી હોય તો બંને indexes આપો.',
        ),
        b('Otherwise store the current number and index.', 'નહીં તો હાલનો number અને index સાચવો.'),
      ],
      columns: [
        'i',
        'num',
        'need',
        b('Map before check', 'Check પહેલાં Map'),
        b('Result', 'પરિણામ'),
      ],
      rows: [
        ['0', '2', '7', '{}', b('not found; then store {2:0}', 'નથી મળ્યું; પછી {2:0} સાચવો')],
        ['1', '7', '2', '{2:0}', b('found index 0 → [0,1]', 'index 0 મળ્યો → [0,1]')],
      ],
      why: b(
        'The array is scanned once, with one expected-constant-time Map lookup per value and up to n stored entries.',
        'Array એક વાર scan થાય છે, દરેક value માટે એક expected-constant-time Map lookup અને વધુમાં વધુ n entries સાથે.',
      ),
      mistakes: [
        b('Returning the values instead of their indexes.', 'Indexes ને બદલે values આપવી.'),
        b('Using the current array item twice.', 'હાલના array item ને બે વાર વાપરવો.'),
        b(
          'Storing the current number before checking its complement.',
          'Complement તપાસતાં પહેલાં હાલનો number સાચવવો.',
        ),
      ],
      hints: [
        b(
          'For each value, ask what partner would reach the target.',
          'દરેક value માટે target સુધી પહોંચાડે એવો partner શોધો.',
        ),
        b(
          'Remember earlier values together with their indexes.',
          'અગાઉની values તેમના indexes સાથે યાદ રાખો.',
        ),
        b(
          'Check target - nums[i] before calling map.set(nums[i], i).',
          'map.set(nums[i], i) પહેલાં target - nums[i] તપાસો.',
        ),
      ],
    },
  },
};

export function applyAlgorithmLocalizations(topics: Topic[]) {
  for (const [id, translation] of Object.entries(content)) {
    const topic = topics.find((item) => item.id === id);
    if (!topic) throw new Error(`Missing DSA topic for localization: ${id}`);

    topic.lv = translation.section;
    topic.t = translation.title;
    topic.learn = translation.learn;

    translation.quiz.forEach((question, index) => {
      const current = topic.mcq[index];
      if (!current) throw new Error(`Missing quiz question ${index + 1} for topic ${id}`);
      topic.mcq[index] = {
        ...current,
        ...question,
        o: [...question.o],
      };
    });

    if (!topic.pr) throw new Error(`Missing coding problem for localized topic: ${id}`);
    topic.pr.d = translation.practice.description;
    topic.pr.explanation.idea = translation.practice.idea;
    topic.pr.explanation.steps = [...translation.practice.steps];
    topic.pr.explanation.trace.columns = [...translation.practice.columns];
    topic.pr.explanation.trace.rows = translation.practice.rows.map((row) => [...row]);
    topic.pr.explanation.complexity.why = translation.practice.why;
    topic.pr.explanation.mistakes = [...translation.practice.mistakes];
    topic.pr.explanation.hints = [...translation.practice.hints];
  }
}
