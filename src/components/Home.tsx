import { Link } from "react-router-dom";
import { courses } from "../content";
import { courseProgress } from "../progress";

const LEVEL_LABEL: Record<string, string> = {
  beginner: "入门",
  intermediate: "进阶",
  advanced: "高级",
};

export default function Home() {
  return (
    <div>
      <section className="hero">
        <h1>从零开始，免费学会 SAP</h1>
        <p>
          市面上的 SAP 培训几乎都要花钱。这里用互动式的小课 + 即时练习，
          带你从入门一路走到进阶——完全免费。
        </p>
      </section>

      <h2 className="section-title">学习轨道</h2>
      <div className="course-grid">
        {courses.map((c) => {
          const { done, total } = courseProgress(c);
          return (
            <Link key={c.id} to={`/course/${c.id}`} className="course-card">
              <span className={`level level-${c.level}`}>
                {LEVEL_LABEL[c.level]}
              </span>
              <h3>{c.title}</h3>
              <p>{c.subtitle}</p>
              <div className="course-meta">
                {c.lessons.length} 节 · 已完成 {done}/{total}
              </div>
            </Link>
          );
        })}

        <div className="course-card soon">
          <h3>更多轨道建设中</h3>
          <p>财务 FI/CO、MM/SD 业务流程、ABAP 开发……欢迎一起共建。</p>
        </div>
      </div>
    </div>
  );
}
