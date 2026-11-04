import type { Course, CourseProgress, ProgressContextValue } from '../data/types.js';

export interface CourseOutletContext {
  course: Course;
  state: CourseProgress;
  progress: ProgressContextValue;
}
