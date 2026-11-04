import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { courses } from './data/courses/index.js';
import { ProgressProvider } from './hooks/useProgress.js';
import CourseLayout from './pages/CourseLayout.js';
import Home from './pages/Home.js';
import Lesson from './pages/Lesson.js';
import Result from './pages/Result.js';
import { I18nProvider } from './i18n/I18nProvider.js';

export default function App() {
  return (
    <I18nProvider>
      <ProgressProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/course/:courseId" element={<CourseLayout />}>
              <Route index element={<Navigate to={courses[0].topics[0].id} replace />} />
              <Route path=":topicId" element={<Lesson />} />
              <Route path="result" element={<Result />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ProgressProvider>
    </I18nProvider>
  );
}
