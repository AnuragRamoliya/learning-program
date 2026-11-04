import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar.js';
import { getCourse } from '../data/courses/index.js';
import { useProgress } from '../hooks/useProgress.js';
import { useI18n } from '../i18n/useI18n.js';

export default function CourseLayout() {
  const { courseId } = useParams();
  const course = getCourse(courseId);
  const progress = useProgress();
  const { t } = useI18n();
  const navigate = useNavigate();

  if (!course)
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1>{t('lesson.courseNotFound')}</h1>
      </main>
    );

  const currentCourse = course;

  function resetProgress() {
    if (window.confirm(t('nav.resetConfirm'))) {
      progress.reset(currentCourse.id);
      navigate(`/course/${currentCourse.id}`);
    }
  }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[292px_minmax(0,1fr)]">
      <Sidebar
        course={currentCourse}
        state={progress.get(currentCourse.id)}
        onReset={resetProgress}
      />
      <main className="min-w-0 w-full px-4 py-7 sm:px-8 lg:px-16 lg:py-10">
        <Outlet
          context={{ course: currentCourse, state: progress.get(currentCourse.id), progress }}
        />
      </main>
    </div>
  );
}
