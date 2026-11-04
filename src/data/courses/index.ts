import type { Course } from '../types.js';
import { topics as dsaTopics } from './dsa/topics.js';

export const courses: Course[] = [
  {
    id: 'dsa',
    title: {
      en: 'Data Structures & Algorithms',
      gu: 'Data Structures & Algorithms',
    },
    description: {
      en: 'Build strong problem-solving skills with clear lessons, quizzes, and coding practice.',
      gu: 'સ્પષ્ટ lessons, quizzes અને coding અભ્યાસ સાથે problem-solving ની મજબૂત કુશળતા વિકસાવો.',
    },
    icon: '⌘',
    topics: dsaTopics,
  },
];

export const comingSoon = ['Python', 'Java', 'SQL'];
export const getCourse = (id?: string) => courses.find((course) => course.id === id);
