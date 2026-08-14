import { Link, useParams } from "react-router-dom";
import { getCourse } from "../content";
import { isLessonDone, lessonProgress } from "../progress";
import { useLocale, useT } from "../i18n";

export default function CoursePage() {
  const t = useT();
  const { locale } = useLocale();
  const { courseId } = useParams();
  const course = courseId ? getCourse(locale, courseId) : undefined;

  if (!course) {
    return (
      <div>
        <p>{t("notFoundCourse")}</p>
        <Link to="/">{t("backHome")}</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/" className="back">
        {t("allTracks")}
      </Link>
      <h1>{course.title}</h1>
      <p className="course-sub">{course.subtitle}</p>

      <ol className="lesson-list">
        {course.lessons.map((lesson, i) => {
          const { done, total } = lessonProgress(lesson);
          const complete = isLessonDone(lesson);
          return (
            <li key={lesson.id}>
              <Link
                to={`/course/${course.id}/lesson/${lesson.id}`}
                className={`lesson-row ${complete ? "done" : ""}`}
              >
                <span className="lesson-index">{complete ? "✓" : i + 1}</span>
                <span className="lesson-title">{lesson.title}</span>
                <span className="lesson-prog">
                  {done}/{total}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
