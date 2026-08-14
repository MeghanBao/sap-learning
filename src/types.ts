// Domain model for the learning platform.
//
// The challenge engine is deliberately pluggable: every challenge has a `type`,
// and `src/challenges/index.tsx` maps each type to a React component that both
// renders it and validates the learner's answer client-side. Adding a richer
// challenge type later (simulated SAP screen clicks, live OpenUI5 code) means
// adding a new type + component — the lessons, progress store, and routing
// never change.

export type ChallengeType =
  | "mcq"
  | "scenario"
  | "multi"
  | "matching"
  | "screen";

export interface BaseChallenge {
  id: string;
  type: ChallengeType;
  prompt: string;
  /** Shown after the learner answers, right or wrong. */
  explanation?: string;
}

/** Single correct answer. `scenario` renders like mcq but framed as a decision. */
export interface ChoiceChallenge extends BaseChallenge {
  type: "mcq" | "scenario";
  options: string[];
  answer: number; // index into options
}

/** Multiple correct answers; all must be selected. */
export interface MultiChallenge extends BaseChallenge {
  type: "multi";
  options: string[];
  answers: number[];
}

/** Match each left item to its correct right item. */
export interface MatchingChallenge extends BaseChallenge {
  type: "matching";
  pairs: { left: string; right: string }[];
}

/** One input field on a simulated SAP screen. */
export interface ScreenField {
  id: string;
  label: string;
  type?: "text" | "number";
  placeholder?: string;
  /** Correct value; compared trimmed + case-insensitive. */
  expected: string;
  hint?: string;
}

/**
 * "Hardcore" hands-on challenge: a fake SAP/Fiori screen the learner must fill
 * out correctly and submit — a guided task, deterministic and fully offline.
 * (The future "live OpenUI5 code" type will slot in the same way.)
 */
export interface ScreenChallenge extends BaseChallenge {
  type: "screen";
  screenTitle: string;
  fields: ScreenField[];
  submitLabel: string;
}

export type Challenge =
  | ChoiceChallenge
  | MultiChallenge
  | MatchingChallenge
  | ScreenChallenge;

export interface Lesson {
  id: string;
  title: string;
  /** Markdown lesson body. */
  body: string;
  challenges: Challenge[];
}

export type Level = "beginner" | "intermediate" | "advanced";

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  level: Level;
  lessons: Lesson[];
}
