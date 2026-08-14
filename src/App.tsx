import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CoursePage from "./components/CoursePage";
import LessonView from "./components/LessonView";
import {
  getInitialLocale,
  LOCALES,
  LOCALE_LABEL,
  LocaleContext,
  saveLocale,
  useLocale,
  useT,
  type Locale,
} from "./i18n";

export default function App() {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  function setLocale(l: Locale) {
    setLocaleState(l);
    saveLocale(l);
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <Shell />
    </LocaleContext.Provider>
  );
}

function Shell() {
  const t = useT();
  const { locale, setLocale } = useLocale();

  return (
    <div className="app">
      <header className="topbar">
        <Link to="/" className="brand">
          📘 SAP Learning
        </Link>
        <span className="tagline">{t("tagline")}</span>
        <div className="lang-switch">
          {LOCALES.map((l) => (
            <button
              key={l}
              className={`lang-btn ${l === locale ? "active" : ""}`}
              onClick={() => setLocale(l)}
            >
              {LOCALE_LABEL[l]}
            </button>
          ))}
        </div>
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
        <p>{t("footer")}</p>
      </footer>
    </div>
  );
}
