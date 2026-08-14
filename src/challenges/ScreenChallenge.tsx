import { useState } from "react";
import type { ScreenChallenge as ScreenType } from "../types";
import { useT } from "../i18n";
import { Feedback } from "./ChoiceChallenge";

const norm = (s: string) => s.trim().toLowerCase();

// Hands-on simulated SAP screen: fill the fields correctly and submit. Each
// field is graded independently (trim + case-insensitive) so the learner sees
// exactly which entry was wrong.
export default function ScreenChallenge({
  challenge,
  onResult,
}: {
  challenge: ScreenType;
  onResult: (correct: boolean) => void;
}) {
  const t = useT();
  const [values, setValues] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const fieldOk = (id: string, expected: string) =>
    norm(values[id] ?? "") === norm(expected);
  const allOk = challenge.fields.every((f) => fieldOk(f.id, f.expected));
  const allFilled = challenge.fields.every((f) => (values[f.id] ?? "").trim() !== "");

  return (
    <div className="challenge">
      <p className="challenge-prompt">{challenge.prompt}</p>

      <div className="sap-screen">
        <div className="sap-titlebar">{challenge.screenTitle}</div>
        <div className="sap-form">
          {challenge.fields.map((f) => {
            const state = checked ? (fieldOk(f.id, f.expected) ? "right" : "wrong") : "";
            return (
              <div className="sap-row" key={f.id}>
                <label className="sap-label" htmlFor={f.id}>
                  {f.label}
                </label>
                <div className="sap-input-wrap">
                  <input
                    id={f.id}
                    className={`sap-input ${state}`}
                    type={f.type === "number" ? "number" : "text"}
                    placeholder={f.placeholder}
                    disabled={checked}
                    value={values[f.id] ?? ""}
                    onChange={(e) =>
                      setValues({ ...values, [f.id]: e.target.value })
                    }
                  />
                  {f.hint && !checked && <span className="sap-hint">{f.hint}</span>}
                </div>
              </div>
            );
          })}
        </div>
        <div className="sap-toolbar">
          {!checked ? (
            <button
              className="sap-btn"
              disabled={!allFilled}
              onClick={() => {
                setChecked(true);
                onResult(allOk);
              }}
            >
              💾 {challenge.submitLabel}
            </button>
          ) : (
            <button className="sap-btn ghost" onClick={() => setChecked(false)}>
              ✎ {t("retry")}
            </button>
          )}
        </div>
      </div>

      {checked && (
        <Feedback correct={allOk} explanation={challenge.explanation} />
      )}
    </div>
  );
}
