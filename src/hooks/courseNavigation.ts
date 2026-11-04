import type { Course, CourseProgress, Topic } from '../data/types.js';

export function isTopicComplete(topic: Topic, state: CourseProgress) {
  const quizComplete = Boolean(state.quiz[topic.id]?.submitted);
  const codePassed = Boolean(state.code[topic.id]?.passed ?? state.code[topic.id]?.pass);
  return quizComplete && (!topic.pr || codePassed);
}

export function continueTopic(course: Course, state: CourseProgress) {
  const lastVisited = course.topics.find((topic) => topic.id === state.lastVisitedTopicId);
  return (
    lastVisited ?? course.topics.find((topic) => !isTopicComplete(topic, state)) ?? course.topics[0]
  );
}
