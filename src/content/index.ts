// Course catalog. Add a track by creating a Course and listing it here — the
// home page and routing pick it up automatically.

import type { Course } from "../types";
import { sapIntro } from "./sap-intro";

export const courses: Course[] = [sapIntro];

export function getCourse(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}
