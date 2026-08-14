import type { Challenge } from "../types";
import type { StringKey } from "../i18n";
import ChoiceChallenge from "./ChoiceChallenge";
import MultiChallenge from "./MultiChallenge";
import MatchingChallenge from "./MatchingChallenge";

// The registry: map a challenge `type` to the component that renders + grades
// it. This is the single place to wire in a new interactive challenge type.
export function ChallengeRenderer({
  challenge,
  onResult,
}: {
  challenge: Challenge;
  onResult: (correct: boolean) => void;
}) {
  switch (challenge.type) {
    case "mcq":
    case "scenario":
      return <ChoiceChallenge challenge={challenge} onResult={onResult} />;
    case "multi":
      return <MultiChallenge challenge={challenge} onResult={onResult} />;
    case "matching":
      return <MatchingChallenge challenge={challenge} onResult={onResult} />;
  }
}

/** Map a challenge type to its UI string key (rendered via `t()` by the caller). */
export function challengeTypeKey(type: Challenge["type"]): StringKey {
  return {
    mcq: "typeMcq",
    scenario: "typeScenario",
    multi: "typeMulti",
    matching: "typeMatching",
  }[type] as StringKey;
}
