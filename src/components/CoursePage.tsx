import { Link, useParams } from "react-router-dom";
import { getCourse } from "../content";
import { isLessonDone, lessonProgress } from "../progress";

export default function CoursePage() {
  const { courseId } = useParams();
  const course = courseId ? getCourse(courseId) : undefined;

  if (!course) {
    return (
      <div>
        <p>找不到这个轨道。</p>
        <Link to="/">← 返回首页</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/" className="back">
        ← 所有轨道
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
