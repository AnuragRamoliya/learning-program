import type { Course, CourseProgress } from '../data/types.js';

export function topicScore(topic: Course['topics'][number], state: CourseProgress) {
  const quiz = state.quiz[topic.id];
  const quizScore = quiz?.submitted
    ? quiz.answers.reduce<number>(
        (score, answer, index) => score + (answer === topic.mcq[index]?.a ? 1 : 0),
        0,
      )
    : 0;
  return quizScore + (topic.pr && (state.code[topic.id]?.passed ?? state.code[topic.id]?.pass) ? 2 : 0);
}

export function topicMax(topic: Course['topics'][number]) {
  return topic.mcq.length + (topic.pr ? 2 : 0);
}

export function courseTotals(course: Course, state: CourseProgress) {
  const earned = course.topics.reduce((score, topic) => score + topicScore(topic, state), 0);
  const max = course.topics.reduce((score, topic) => score + topicMax(topic), 0);
  return {
    earned,
    max,
    percent: max ? Math.round((earned / max) * 100) : 0,
    complete: course.topics.filter((topic) => state.quiz[topic.id]?.submitted).length,
  };
}
