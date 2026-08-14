// Course catalog, per locale. Add a track by creating its localized Course(s)
// and listing them here. Course/lesson/challenge ids MUST match across locales
// so progress and deep links survive a language switch.

import type { Course } from "../types";
import type { Locale } from "../i18n";
import { sapIntroZh } from "./sap-intro/zh";
import { sapIntroEn } from "./sap-intro/en";

const catalog: Record<Locale, Course[]> = {
  zh: [sapIntroZh],
  en: [sapIntroEn],
};

export function getCourses(locale: Locale): Course[] {
  return catalog[locale];
}

export function getCourse(locale: Locale, id: string): Course | undefined {
  return catalog[locale].find((c) => c.id === id);
}
