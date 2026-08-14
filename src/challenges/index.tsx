import type { Challenge } from "../types";
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

export function challengeTypeLabel(type: Challenge["type"]): string {
  return {
    mcq: "单选",
    scenario: "情景决策",
    multi: "多选",
    matching: "配对",
  }[type];
}
