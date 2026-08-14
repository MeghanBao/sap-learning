import { useState } from "react";
import type { MultiChallenge as MultiType } from "../types";
import { Feedback } from "./ChoiceChallenge";

// Multiple-correct-answers challenge; every correct option must be selected and
// no incorrect one.
export default function MultiChallenge({
  challenge,
  onResult,
}: {
  challenge: MultiType;
  onResult: (correct: boolean) => void;
}) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [checked, setChecked] = useState(false);

  const answerSet = new Set(challenge.answers);
  const correct =
    selected.size === answerSet.size &&
    [...selected].every((i) => answerSet.has(i));

  function toggle(i: number) {
    const next = new Set(selected);
    next.has(i) ? next.delete(i) : next.add(i);
    setSelected(next);
  }

  return (
    <div className="challenge">
      <p className="challenge-prompt">{challenge.prompt}</p>
      <p className="hint">（多选，选出所有正确项）</p>
      <ul className="options">
        {challenge.options.map((opt, i) => {
          const isAnswer = answerSet.has(i);
          const state = checked
            ? isAnswer
              ? "right"
              : selected.has(i)
                ? "wrong"
                : ""
            : selected.has(i)
              ? "picked"
              : "";
          return (
            <li key={i}>
              <button
                className={`option ${state}`}
                disabled={checked}
                onClick={() => toggle(i)}
              >
                <span className="checkbox">{selected.has(i) ? "☑" : "☐"}</span>{" "}
                {opt}
              </button>
            </li>
          );
        })}
      </ul>
      {!checked ? (
        <button
          className="btn-check"
          disabled={selected.size === 0}
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
