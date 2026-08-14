import { createContext, useContext } from "react";

// Two locales for now. Content lives per-locale under src/content/*/{zh,en}.ts
// (same ids across locales, so progress and deep links survive a language
// switch). UI strings live in the `strings` map below.

export type Locale = "zh" | "en";
export const LOCALES: Locale[] = ["zh", "en"];
export const LOCALE_LABEL: Record<Locale, string> = { zh: "中文", en: "EN" };

const KEY = "sap.locale";

export function getInitialLocale(): Locale {
  const saved = localStorage.getItem(KEY);
  if (saved === "zh" || saved === "en") return saved;
  return navigator.language?.toLowerCase().startsWith("zh") ? "zh" : "en";
}

export function saveLocale(l: Locale) {
  localStorage.setItem(KEY, l);
}

export const strings = {
  zh: {
    tagline: "免费 · 互动式学 SAP",
    footer:
      "SAP Learning 是一个免费开源的社区学习项目。Not affiliated with or endorsed by SAP SE. “SAP” is a trademark of SAP SE.",
    heroTitle: "从零开始，免费学会 SAP",
    heroBody:
      "市面上的 SAP 培训几乎都要花钱。这里用互动式的小课 + 即时练习，带你从入门一路走到进阶——完全免费。",
    tracksTitle: "学习轨道",
    unitLessons: "节",
    completed: "已完成",
    soonTitle: "更多轨道建设中",
    soonBody: "财务 FI/CO、MM/SD 业务流程、ABAP 开发……欢迎一起共建。",
    allTracks: "← 所有轨道",
    backHome: "← 返回首页",
    notFoundCourse: "找不到这个轨道。",
    notFoundLesson: "找不到这节课。",
    exercises: "练习",
    doneTag: "✓ 已完成",
    lessonComplete: "🎉 本节完成！",
    nextLesson: "下一节：",
    backToCourse: "返回轨道总览 →",
    check: "检查",
    retry: "重做",
    correct: "✅ 正确！",
    wrong: "❌ 再想想",
    multiHint: "（多选，选出所有正确项）",
    selectPlaceholder: "选择…",
    levelBeginner: "入门",
    levelIntermediate: "进阶",
    levelAdvanced: "高级",
    typeMcq: "单选",
    typeScenario: "情景决策",
    typeMulti: "多选",
    typeMatching: "配对",
    typeScreen: "模拟操作",
  },
  en: {
    tagline: "Free · interactive SAP learning",
    footer:
      "SAP Learning is a free, open-source community project. Not affiliated with or endorsed by SAP SE. “SAP” is a trademark of SAP SE.",
    heroTitle: "Learn SAP from scratch — for free",
    heroBody:
      "SAP training is almost all paid. Here you learn through short interactive lessons with instant-feedback exercises, from beginner to advanced — completely free.",
    tracksTitle: "Tracks",
    unitLessons: "lessons",
    completed: "done",
    soonTitle: "More tracks coming",
    soonBody: "Finance FI/CO, MM/SD processes, ABAP development… contributions welcome.",
    allTracks: "← All tracks",
    backHome: "← Back home",
    notFoundCourse: "Track not found.",
    notFoundLesson: "Lesson not found.",
    exercises: "Exercises",
    doneTag: "✓ done",
    lessonComplete: "🎉 Lesson complete!",
    nextLesson: "Next: ",
    backToCourse: "Back to track overview →",
    check: "Check",
    retry: "Retry",
    correct: "✅ Correct!",
    wrong: "❌ Try again",
    multiHint: "(Select all correct answers)",
    selectPlaceholder: "Choose…",
    levelBeginner: "Beginner",
    levelIntermediate: "Intermediate",
    levelAdvanced: "Advanced",
    typeMcq: "Single choice",
    typeScenario: "Scenario",
    typeMulti: "Multiple choice",
    typeMatching: "Matching",
    typeScreen: "Hands-on",
  },
} as const;

export type StringKey = keyof (typeof strings)["en"];

export const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
}>({ locale: "zh", setLocale: () => {} });

export function useLocale() {
  return useContext(LocaleContext);
}

/** Hook returning a `t(key)` translator for the current locale. */
export function useT() {
  const { locale } = useLocale();
  return (key: StringKey) => strings[locale][key];
}
