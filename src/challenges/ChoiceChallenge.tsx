import { useState } from "react";
import type { ChoiceChallenge as ChoiceType } from "../types";

// Single-answer challenge, used for both "mcq" and "scenario" types.
export default function ChoiceChallenge({
  challenge,
  onResult,
}: {
  challenge: ChoiceType;
  onResult: (correct: boolean) => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const correct = picked === challenge.answer;

  return (
    <div className="challenge">
      <p className="challenge-prompt">{challenge.prompt}</p>
      <ul className="options">
        {challenge.options.map((opt, i) => {
          const state =
            checked && i === challenge.answer
              ? "right"
              : checked && i === picked
                ? "wrong"
                : picked === i
                  ? "picked"
                  : "";
          return (
            <li key={i}>
              <button
                className={`option ${state}`}
                disabled={checked}
                onClick={() => setPicked(i)}
              >
                {opt}
              </button>
            </li>
          );
        })}
      </ul>
      {!checked ? (
        <button
          className="btn-check"
          disabled={picked === null}
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

export function Feedback({
  correct,
  explanation,
}: {
  correct: boolean;
  explanation?: string;
}) {
  return (
    <div className={`feedback ${correct ? "ok" : "bad"}`}>
      <strong>{correct ? "✅ 正确！" : "❌ 再想想"}</strong>
      {explanation && <p>{explanation}</p>}
    </div>
  );
}
