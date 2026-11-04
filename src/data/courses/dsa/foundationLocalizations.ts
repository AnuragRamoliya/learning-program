import type { Topic, LocalizedText } from '../../types.js';
import { arraysLesson, mathsLesson, recursionLesson, stringsLesson } from './foundationLessons.js';

const b = (en: string, gu: string): LocalizedText => ({ en, gu });

const content = {
  rec: {
    section: b('Maths Pattern & Recursion', 'ગણિતની પદ્ધતિઓ અને Recursion'),
    title: b('Recursion', 'Recursion'),
    learn: recursionLesson,
    quiz: [
      {
        q: b(
          'What tells a recursive function when to stop?',
          'Recursive function ને ક્યારે અટકવું તે શું કહે છે?',
        ),
        o: [
          b('A base case', 'Base case'),
          b('A larger input', 'મોટું input'),
          b('An array index', 'Array index'),
          b('A second function', 'બીજું function'),
        ],
        e: b(
          'The base case answers the smallest problem without making another recursive call.',
          'Base case સૌથી નાની સમસ્યાનો જવાબ આપે છે અને નવો recursive call કરતું નથી.',
        ),
      },
      {
        q: b(
          'What can happen if recursion never reaches a base case?',
          'Recursion base case સુધી ન પહોંચે તો શું થઈ શકે?',
        ),
        o: [
          b('The input sorts itself', 'Input પોતે sort થાય'),
          b('The call stack can overflow', 'Call stack overflow થઈ શકે'),
          b('The function becomes constant time', 'Function constant time બને'),
          b('Nothing changes', 'કંઈ થતું નથી'),
        ],
        e: b(
          'Calls keep waiting on the call stack until the runtime runs out of stack space.',
          'Runtime ની stack જગ્યા પૂરી થાય ત્યાં સુધી calls call stack પર રાહ જોતા રહે છે.',
        ),
      },
    ],
    practice: {
      description: b(
        'Write <code>factorial(n)</code> recursively. Return 1 when n is 0 or 1.',
        '<code>factorial(n)</code> ને recursion વડે લખો. n 0 કે 1 હોય ત્યારે 1 આપો.',
      ),
      idea: b(
        'Factorial(n) is n multiplied by factorial(n - 1), with 1 as the stopping answer.',
        'Factorial(n) એટલે n ગુણ્યા factorial(n - 1), અને રોકાવાનો જવાબ 1 છે.',
      ),
      steps: [
        b('Return 1 when n is at most 1.', 'n 1 કે તેનાથી નાનું હોય ત્યારે 1 આપો.'),
        b('Otherwise solve factorial(n - 1).', 'નહીં તો factorial(n - 1) ઉકેલો.'),
        b('Multiply that answer by n.', 'તે જવાબને n વડે ગુણો.'),
        b(
          'Let each waiting call return its product.',
          'રાહ જોતો દરેક call પોતાનો ગુણાકાર પાછો આપે.',
        ),
      ],
      columns: [b('Call', 'Call'), b('Next work', 'આગળનું કામ'), b('Return', 'જવાબ')],
      rows: [
        ['factorial(4)', '4 × factorial(3)', '24'],
        ['factorial(3)', '3 × factorial(2)', '6'],
        ['factorial(2)', '2 × factorial(1)', '2'],
        ['factorial(1)', b('base case', 'base case'), '1'],
      ],
      why: b(
        'There are n calls in the chain, and the call stack stores them until their answers return.',
        'આ chain માં n calls થાય છે અને જવાબ પાછા આવે ત્યાં સુધી call stack તેમને રાખે છે.',
      ),
      mistakes: [
        b('Forgetting the base case.', 'Base case ભૂલી જવું.'),
        b(
          'Calling factorial(n) again without reducing n.',
          'n ઘટાડ્યા વગર ફરી factorial(n) call કરવું.',
        ),
        b('Returning 0 for factorial(0).', 'factorial(0) માટે 0 આપવું.'),
      ],
      hints: [
        b('Write the calls made by factorial(4).', 'factorial(4) કયા calls કરે છે તે લખો.'),
        b('Keep reducing n until it reaches 1.', 'n 1 થાય ત્યાં સુધી તેને ઘટાડતા જાઓ.'),
        b(
          'Use if (n <= 1) return 1; otherwise return n * factorial(n - 1).',
          'if (n <= 1) return 1; નહીં તો n * factorial(n - 1) આપો.',
        ),
      ],
    },
  },
  maths: {
    section: b('Maths Pattern & Recursion', 'ગણિતની પદ્ધતિઓ અને Recursion'),
    title: b('Maths & Patterns', 'ગણિત અને Patterns'),
    learn: mathsLesson,
    quiz: [
      {
        q: b(
          'Why is it enough to test possible factors up to √n?',
          'શક્ય factors ને √n સુધી તપાસવા પૂરતું કેમ છે?',
        ),
        o: [
          b(
            'Larger factors have smaller partners already checked.',
            'મોટા factors ના નાના જોડીદાર પહેલેથી તપાસાઈ ગયા હોય છે.',
          ),
          b('JavaScript stops loops at √n.', 'JavaScript √n પર loops અટકાવે છે.'),
          b('Prime numbers are always small.', 'Prime numbers હંમેશાં નાના હોય છે.'),
          b(
            'The remainder operator only works below √n.',
            'Remainder operator માત્ર √n નીચે કામ કરે છે.',
          ),
        ],
        e: b(
          'Factors come in pairs: if both were larger than √n, their product would be greater than n.',
          'Factors જોડીમાં આવે છે: બંને √n કરતાં મોટા હોય તો તેમનો ગુણાકાર n કરતાં મોટો થાય.',
        ),
      },
      {
        q: b(
          'Which expression gives the last digit of a positive whole number n?',
          'ધન પૂર્ણાંક n નો છેલ્લો digit કયું expression આપે છે?',
        ),
        o: ['Math.floor(n / 10)', 'n % 10', 'n * 10', 'n - 10'],
        a: 1,
        e: b(
          'The remainder after division by 10 is the last digit.',
          '10 વડે ભાગ્યા પછીનો remainder છેલ્લો digit છે.',
        ),
      },
    ],
    practice: {
      description: b(
        'Write <code>isPrime(n)</code> to return whether n is prime.',
        '<code>isPrime(n)</code> લખો, જે n prime છે કે નહીં તે આપે.',
      ),
      idea: b(
        'A number is prime when no divisor from 2 through its square root divides it evenly.',
        '2 થી square root સુધીનો કોઈ divisor સંખ્યાને બાકી વગર ન ભાગે ત્યારે તે prime છે.',
      ),
      steps: [
        b('Return false when n is less than 2.', 'n 2 કરતાં નાનું હોય ત્યારે false આપો.'),
        b('Try divisors beginning at 2.', '2 થી divisors અજમાવો.'),
        b('Stop when d * d is greater than n.', 'd * d, n કરતાં મોટું થાય ત્યારે રોકો.'),
        b(
          'Return false on a zero remainder; otherwise return true.',
          'Remainder શૂન્ય હોય તો false, નહીં તો true આપો.',
        ),
      ],
      columns: ['d', 'd * d <= 29?', '29 % d', b('Decision', 'નિર્ણય')],
      rows: [
        ['2', '4 <= 29', '1', b('continue', 'ચાલુ રાખો')],
        ['3', '9 <= 29', '2', b('continue', 'ચાલુ રાખો')],
        ['4', '16 <= 29', '1', b('continue', 'ચાલુ રાખો')],
        ['5', '25 <= 29', '4', b('continue', 'ચાલુ રાખો')],
        ['6', '36 > 29', b('not checked', 'તપાસ્યું નથી'), b('stop; prime', 'રોકો; prime')],
      ],
      why: b(
        'The loop checks at most √n divisors and uses a fixed amount of extra space.',
        'Loop વધુમાં વધુ √n divisors તપાસે છે અને વધારાની જગ્યા નિશ્ચિત રહે છે.',
      ),
      mistakes: [
        b('Treating 1 as a prime number.', '1 ને prime number માનવું.'),
        b(
          'Checking divisors only while d < √n and missing a square factor.',
          'd < √n સુધી જ તપાસીને square factor ચૂકી જવું.',
        ),
        b('Using d <= n, which does unnecessary work.', 'd <= n વાપરીને બિનજરૂરી કામ કરવું.'),
      ],
      hints: [
        b(
          'Handle values below 2 before starting the loop.',
          'Loop પહેલાં 2 કરતાં નાની values સંભાળો.',
        ),
        b(
          'A divisor larger than √n would have a smaller partner.',
          '√n કરતાં મોટો divisor હોય તો તેનો નાનો જોડીદાર હશે.',
        ),
        b(
          'Loop while d * d <= n and test n % d === 0.',
          'd * d <= n હોય ત્યાં સુધી loop કરો અને n % d === 0 તપાસો.',
        ),
      ],
    },
  },
  arr: {
    section: b('Array & String', 'Array અને String'),
    title: b('Arrays', 'Arrays'),
    learn: arraysLesson,
    quiz: [
      {
        q: b(
          'What is the typical cost of reading arr[i] by index?',
          'Index વડે arr[i] વાંચવાનો સામાન્ય ખર્ચ કેટલો છે?',
        ),
        o: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
        a: 2,
        e: b('The index gives direct access to the item.', 'Index item સુધી સીધી પહોંચ આપે છે.'),
      },
      {
        q: b(
          'Why can inserting at the start of an array take O(n)?',
          'Array ની શરૂઆતમાં ઉમેરવામાં O(n) કેમ લાગી શકે?',
        ),
        o: [
          b('Every value must be sorted again.', 'દરેક value ફરી sort કરવી પડે.'),
          b('Existing items shift to make room.', 'જગ્યા માટે હાલના items ખસે છે.'),
          b('The array becomes immutable.', 'Array immutable બને છે.'),
          b('The index starts at 1.', 'Index 1 થી શરૂ થાય છે.'),
        ],
        e: b(
          'The elements already there need new positions.',
          'હાલના elements ને નવી positions આપવી પડે છે.',
        ),
      },
    ],
    practice: {
      description: b(
        'Write <code>moveZeros(arr)</code> that returns a new array with zeroes at the end and all other numbers in their original order.',
        '<code>moveZeros(arr)</code> લખો, જે zeroes ને અંતે મૂકી બાકીના numbers નો મૂળ ક્રમ જાળવતી નવી array આપે.',
      ),
      idea: b(
        'Collect non-zero values in order, then append enough zeroes to restore the original length.',
        'Non-zero values ને ક્રમમાં ભેગી કરો અને મૂળ length પાછી મેળવવા જરૂરી zeroes ઉમેરો.',
      ),
      steps: [
        b(
          'Filter the input to keep only non-zero values.',
          'માત્ર non-zero values રાખવા input filter કરો.',
        ),
        b('Keep the original input unchanged.', 'મૂળ input ને બદલશો નહીં.'),
        b(
          'Append zeroes until the result matches the input length.',
          'Result ની length input જેટલી થાય ત્યાં સુધી zeroes ઉમેરો.',
        ),
        b('Return the new result.', 'નવી result આપો.'),
      ],
      columns: [b('Stage', 'તબક્કો'), b('Array', 'Array'), b('Reason', 'કારણ')],
      rows: [
        [b('Input', 'Input'), '[0, 1, 0, 3, 12]', b('five values', 'પાંચ values')],
        [
          b('Filter', 'Filter'),
          '[1, 3, 12]',
          b('zeroes removed; order kept', 'zeroes દૂર; ક્રમ જળવાયો'),
        ],
        [
          b('Append', 'ઉમેરો'),
          '[1, 3, 12, 0, 0]',
          b('length restored to five', 'length ફરી પાંચ થઈ'),
        ],
      ],
      why: b(
        'One pass filters the n values and the new array can store up to n values.',
        'એક pass n values filter કરે છે અને નવી array માં વધુમાં વધુ n values રહી શકે છે.',
      ),
      mistakes: [
        b(
          'Reversing the non-zero values instead of preserving their order.',
          'Non-zero values નો ક્રમ જાળવવાને બદલે ઊલટો કરવો.',
        ),
        b(
          'Removing every zero but forgetting to add them back at the end.',
          'બધા zeroes કાઢી નાખીને અંતે પાછા ઉમેરવાનું ભૂલવું.',
        ),
        b(
          'Mutating the input when the task asks for a new array.',
          'નવી array માંગે ત્યારે input માં ફેરફાર કરવો.',
        ),
      ],
      hints: [
        b(
          'First make a result containing only non-zero values.',
          'પહેલાં માત્ર non-zero values ધરાવતી result બનાવો.',
        ),
        b(
          'Compare the result length with the original length.',
          'Result ની length ને મૂળ length સાથે સરખાવો.',
        ),
        b(
          'Push zero while result.length < arr.length, then return result.',
          'result.length < arr.length હોય ત્યાં સુધી zero push કરો, પછી result આપો.',
        ),
      ],
    },
  },
  str: {
    section: b('Array & String', 'Array અને String'),
    title: b('Strings', 'Strings'),
    learn: stringsLesson,
    quiz: [
      {
        q: b('What is true about JavaScript strings?', 'JavaScript strings વિશે કયું સાચું છે?'),
        o: [
          b('They are mutable in place.', 'તે જ જગ્યાએ બદલાય છે.'),
          b('They are immutable.', 'તે immutable છે.'),
          b('They always contain eight characters.', 'તેમાં હંમેશાં આઠ અક્ષરો હોય છે.'),
          b('They are automatically sorted.', 'તે આપમેળે sort થાય છે.'),
        ],
        a: 1,
        e: b(
          'A string method returns a new string instead of changing an existing character in place.',
          'String method હાલના અક્ષરને એ જ જગ્યાએ બદલવાને બદલે નવી string આપે છે.',
        ),
      },
      {
        q: b(
          'How much time does a two-pointer palindrome check take?',
          'બે-pointer palindrome check માં કેટલો સમય લાગે?',
        ),
        o: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        a: 2,
        e: b(
          'The pointers compare at most half the characters.',
          'Pointers વધુમાં વધુ અડધા અક્ષરો સરખાવે છે.',
        ),
      },
    ],
    practice: {
      description: b(
        'Write <code>isPalindrome(s)</code>. Ignore letter case; the input contains only letters and digits.',
        '<code>isPalindrome(s)</code> લખો. Letter case અવગણો; input માં માત્ર letters અને digits છે.',
      ),
      idea: b(
        'Lowercase the string and compare matching characters from its two ends toward the center.',
        'String ને lowercase કરીને બંને છેડાથી મધ્ય તરફ સરખા અક્ષરો સરખાવો.',
      ),
      steps: [
        b('Convert the input to lowercase.', 'Input ને lowercase કરો.'),
        b(
          'Set pointers at the first and last indexes.',
          'પહેલા અને છેલ્લાં index પર pointers મૂકો.',
        ),
        b(
          'Return false if the pointed characters differ.',
          'Pointers વાળા અક્ષરો જુદા હોય તો false આપો.',
        ),
        b(
          'Move inward; if no pair differs, return true.',
          'અંદર તરફ વધો; કોઈ જોડી જુદી ન હોય તો true આપો.',
        ),
      ],
      columns: [
        b('left', 'left'),
        b('right', 'right'),
        b('Characters', 'અક્ષરો'),
        b('Action', 'કામ'),
      ],
      rows: [
        ['0', '6', '"r" and "r"', b('match', 'સરખાં')],
        ['1', '5', '"a" and "a"', b('match', 'સરખાં')],
        ['2', '4', '"c" and "c"', b('match', 'સરખાં')],
        ['3', '3', b('pointers meet', 'pointers મળે'), b('return true', 'true આપો')],
      ],
      why: b(
        'The two pointers inspect at most n / 2 pairs; lowercasing may create a normalized copy of n characters.',
        'બે pointers વધુમાં વધુ n / 2 જોડીઓ તપાસે છે; lowercase કરવાથી n અક્ષરોની નવી copy બની શકે છે.',
      ),
      mistakes: [
        b('Forgetting to normalize letter case first.', 'પહેલાં letter case સરખું કરવાનું ભૂલવું.'),
        b('Moving both pointers in the same direction.', 'બંને pointers ને એક જ દિશામાં ખસેડવા.'),
        b(
          'Removing punctuation or spaces even though the prompt does not ask for it.',
          'Prompt ન કહે છતાં punctuation કે spaces કાઢી નાખવા.',
        ),
      ],
      hints: [
        b('Compare the first and last characters.', 'પહેલા અને છેલ્લાં અક્ષરો સરખાવો.'),
        b(
          'After a match, move the left pointer right and the right pointer left.',
          'અક્ષરો સરખા હોય તો left ને જમણે અને right ને ડાબે ખસેડો.',
        ),
        b(
          'Lowercase once, then return false on a mismatch and true after the pointers meet.',
          'એક વાર lowercase કરો; mismatch પર false અને pointers મળે પછી true આપો.',
        ),
      ],
    },
  },
};

export function applyFoundationLocalizations(topics: Topic[]) {
  for (const [id, translation] of Object.entries(content)) {
    const topic = topics.find((item) => item.id === id);
    if (!topic) throw new Error(`Missing DSA topic for localization: ${id}`);

    topic.lv = translation.section;
    topic.t = translation.title;
    topic.learn = translation.learn;

    translation.quiz.forEach((question, index) => {
      const current = topic.mcq[index];
      if (!current) throw new Error(`Missing quiz question ${index + 1} for topic ${id}`);
      topic.mcq[index] = { ...current, ...question };
    });

    if (!topic.pr) throw new Error(`Missing coding problem for localized topic: ${id}`);
    topic.pr.d = translation.practice.description;
    topic.pr.explanation.idea = translation.practice.idea;
    topic.pr.explanation.steps = translation.practice.steps;
    topic.pr.explanation.trace.columns = translation.practice.columns;
    topic.pr.explanation.trace.rows = translation.practice.rows;
    topic.pr.explanation.complexity.why = translation.practice.why;
    topic.pr.explanation.mistakes = translation.practice.mistakes;
    topic.pr.explanation.hints = translation.practice.hints;
  }
}
