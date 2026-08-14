import { Link } from "react-router-dom";
import { getCourses } from "../content";
import { courseProgress } from "../progress";
import { useLocale, useT, type StringKey } from "../i18n";

const LEVEL_KEY: Record<string, StringKey> = {
  beginner: "levelBeginner",
  intermediate: "levelIntermediate",
  advanced: "levelAdvanced",
};

export default function Home() {
  const t = useT();
  const { locale } = useLocale();
  const courses = getCourses(locale);

  return (
    <div>
      <section className="hero">
        <h1>{t("heroTitle")}</h1>
        <p>{t("heroBody")}</p>
      </section>

      <h2 className="section-title">{t("tracksTitle")}</h2>
      <div className="course-grid">
        {courses.map((c) => {
          const { done, total } = courseProgress(c);
          return (
            <Link key={c.id} to={`/course/${c.id}`} className="course-card">
              <span className={`level level-${c.level}`}>
                {t(LEVEL_KEY[c.level])}
              </span>
              <h3>{c.title}</h3>
              <p>{c.subtitle}</p>
              <div className="course-meta">
                {c.lessons.length} {t("unitLessons")} · {t("completed")} {done}/
                {total}
              </div>
            </Link>
          );
        })}

        <div className="course-card soon">
          <h3>{t("soonTitle")}</h3>
          <p>{t("soonBody")}</p>
        </div>
      </div>
    </div>
  );
}
