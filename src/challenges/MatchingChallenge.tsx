import { useMemo, useState } from "react";
import type { MatchingChallenge as MatchingType } from "../types";
import { Feedback } from "./ChoiceChallenge";

// Match each left item to its correct right item via a dropdown. The right-hand
// options are shuffled once so their order doesn't leak the answer.
export default function MatchingChallenge({
  challenge,
  onResult,
}: {
  challenge: MatchingType;
  onResult: (correct: boolean) => void;
}) {
  const rights = useMemo(
    () => shuffle(challenge.pairs.map((p) => p.right)),
    [challenge],
  );
  const [choice, setChoice] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);

  const allAnswered = Object.keys(choice).length === challenge.pairs.length;
  const correct = challenge.pairs.every((p, i) => choice[i] === p.right);

  return (
    <div className="challenge">
      <p className="challenge-prompt">{challenge.prompt}</p>
      <div className="matching">
        {challenge.pairs.map((p, i) => {
          const rowState =
            checked && choice[i] === p.right
              ? "right"
              : checked
                ? "wrong"
                : "";
          return (
            <div className={`match-row ${rowState}`} key={i}>
              <span className="match-left">{p.left}</span>
              <span className="match-arrow">→</span>
              <select
                className="match-select"
                disabled={checked}
                value={choice[i] ?? ""}
                onChange={(e) =>
                  setChoice({ ...choice, [i]: e.target.value })
                }
              >
                <option value="" disabled>
                  选择…
                </option>
                {rights.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
      {!checked ? (
        <button
          className="btn-check"
          disabled={!allAnswered}
          onClick={() => {
            setChecked(true);
            onResult(correct);
          }}
        >
          检查
        </button>
      ) : (
        <Feedback correct={correct} explanation={challenge.explanation} />
      )}
    </div>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
