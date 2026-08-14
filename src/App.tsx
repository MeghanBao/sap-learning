import { Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CoursePage from "./components/CoursePage";
import LessonView from "./components/LessonView";

export default function App() {
  return (
    <div className="app">
      <header className="topbar">
        <Link to="/" className="brand">
          📘 SAP Learning
        </Link>
        <span className="tagline">免费 · 互动式学 SAP</span>
      </header>

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course/:courseId" element={<CoursePage />} />
          <Route
            path="/course/:courseId/lesson/:lessonId"
            element={<LessonView />}
          />
        </Routes>
      </main>

      <footer className="footer">
        <p>
          SAP Learning 是一个免费开源的社区学习项目。Not affiliated with or
          endorsed by SAP SE. “SAP” is a trademark of SAP SE.
        </p>
      </footer>
    </div>
  );
}
