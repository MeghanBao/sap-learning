// Domain model for the learning platform.
//
// The challenge engine is deliberately pluggable: every challenge has a `type`,
// and `src/challenges/index.tsx` maps each type to a React component that both
// renders it and validates the learner's answer client-side. Adding a richer
// challenge type later (simulated SAP screen clicks, live OpenUI5 code) means
// adding a new type + component — the lessons, progress store, and routing
// never change.

export type ChallengeType = "mcq" | "scenario" | "multi" | "matching";

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

export type Challenge = ChoiceChallenge | MultiChallenge | MatchingChallenge;

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
