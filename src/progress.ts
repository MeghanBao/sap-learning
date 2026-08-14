// Progress persistence — localStorage only, no backend (keeps hosting free).
// Progress is tracked per challenge id; a lesson is "done" when all its
// challenges are completed.

import type { Course, Lesson } from "./types";

const KEY = "sapling.progress.v1";

type Store = Record<string, true>; // set of completed challenge ids

function read(): Store {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

function write(store: Store) {
  localStorage.setItem(KEY, JSON.stringify(store));
}

export function markChallengeDone(challengeId: string) {
  const store = read();
  store[challengeId] = true;
  write(store);
}

export function isChallengeDone(challengeId: string): boolean {
  return read()[challengeId] === true;
}

export function lessonProgress(lesson: Lesson): { done: number; total: number } {
  const store = read();
  const done = lesson.challenges.filter((c) => store[c.id]).length;
  return { done, total: lesson.challenges.length };
}

export function isLessonDone(lesson: Lesson): boolean {
  const { done, total } = lessonProgress(lesson);
  return total > 0 && done === total;
}

export function courseProgress(course: Course): { done: number; total: number } {
  const total = course.lessons.length;
  const done = course.lessons.filter(isLessonDone).length;
  return { done, total };
}

export function resetProgress() {
  localStorage.removeItem(KEY);
}
