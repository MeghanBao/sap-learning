import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCourse } from "../content";
import { ChallengeRenderer, challengeTypeKey } from "../challenges";
import Markdown from "./Markdown";
import { isChallengeDone, markChallengeDone } from "../progress";
import { useLocale, useT } from "../i18n";

export default function LessonView() {
  const t = useT();
  const { locale } = useLocale();
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const course = courseId ? getCourse(locale, courseId) : undefined;
  const index = course?.lessons.findIndex((l) => l.id === lessonId) ?? -1;
  const lesson = index >= 0 ? course!.lessons[index] : undefined;

  // Track which challenges have been answered correctly this session.
  const [done, setDone] = useState<Set<string>>(
    () => new Set(lesson?.challenges.filter((c) => isChallengeDone(c.id)).map((c) => c.id)),
  );

  if (!course || !lesson) {
    return (
      <div>
        <p>{t("notFoundLesson")}</p>
        <Link to="/">{t("backHome")}</Link>
      </div>
    );
  }

  const next = course.lessons[index + 1];
  const allDone = lesson.challenges.every((c) => done.has(c.id));

  function handleResult(challengeId: string, correct: boolean) {
    if (!correct) return;
    markChallengeDone(challengeId);
    setDone((prev) => new Set(prev).add(challengeId));
  }

  return (
    <div className="lesson">
      <Link to={`/course/${course.id}`} className="back">
        ← {course.title}
      </Link>
      <h1>{lesson.title}</h1>

      <Markdown source={lesson.body} />

      {lesson.challenges.length > 0 && (
        <section className="challenges">
          <h2 className="section-title">{t("exercises")}</h2>
          {lesson.challenges.map((c) => (
            <div key={c.id} className="challenge-wrap">
              <div className="challenge-tag">
                {t(challengeTypeKey(c.type))}
                {done.has(c.id) && <span className="tag-done"> {t("doneTag")}</span>}
              </div>
              <ChallengeRenderer
                challenge={c}
                onResult={(correct) => handleResult(c.id, correct)}
              />
            </div>
          ))}
        </section>
      )}

      <div className="lesson-nav">
        {allDone && lesson.challenges.length > 0 && (
          <p className="lesson-complete">{t("lessonComplete")}</p>
        )}
        {next ? (
          <button
            className="btn-next"
            onClick={() => navigate(`/course/${course.id}/lesson/${next.id}`)}
          >
            {t("nextLesson")}
            {next.title} →
          </button>
        ) : (
          <Link to={`/course/${course.id}`} className="btn-next">
            {t("backToCourse")}
          </Link>
        )}
      </div>
    </div>
  );
}
