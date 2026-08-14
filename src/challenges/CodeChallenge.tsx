import { useEffect, useRef, useState } from "react";
import type { CodeChallenge as CodeType } from "../types";
import { useT } from "../i18n";
import { Feedback } from "./ChoiceChallenge";

// The page loaded into the sandboxed iframe. It boots OpenUI5 from the CDN,
// waits for the user's code via postMessage, evals it, then polls the render
// target until something appears and reports the rendered text back.
const RUNNER_HTML = `<!doctype html><html><head><meta charset="utf-8">
<script id="sap-ui-bootstrap"
  src="https://sdk.openui5.org/resources/sap-ui-core.js"
  data-sap-ui-theme="sap_horizon"
  data-sap-ui-libs="sap.m"
  data-sap-ui-async="true"
  data-sap-ui-compat-version="edge"></script>
<style>html,body{margin:0;font-family:system-ui,sans-serif}#content{padding:12px}</style>
</head><body>
<div id="content"></div>
<script>
function report(m){ parent.postMessage(m, "*"); }
function whenReady(cb){
  if (window.sap && sap.ui && sap.ui.getCore) sap.ui.getCore().attachInit(cb);
  else setTimeout(function(){ whenReady(cb); }, 50);
}
window.addEventListener("message", function(e){
  if (!e.data || e.data.type !== "run") return;
  var el = document.getElementById("content");
  el.innerHTML = "";
  try {
    (0, eval)(e.data.code);
  } catch (err) {
    report({ type: "result", ok: false, error: String((err && err.message) || err) });
    return;
  }
  var tries = 0;
  (function poll(){
    var text = (el.innerText || "").trim();
    if (text || tries > 12) report({ type: "result", ok: true, output: text });
    else { tries++; setTimeout(poll, 100); }
  })();
});
whenReady(function(){ report({ type: "ready" }); });
</script>
</body></html>`;

export default function CodeChallenge({
  challenge,
  onResult,
}: {
  challenge: CodeType;
  onResult: (correct: boolean) => void;
}) {
  const t = useT();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const onResultRef = useRef(onResult);
  onResultRef.current = onResult;

  const [code, setCode] = useState(challenge.starterCode);
  const [ready, setReady] = useState(false);
  const readyRef = useRef(false);
  const [loadError, setLoadError] = useState(false);
  const [running, setRunning] = useState(false);
  const [outcome, setOutcome] = useState<
    { correct: boolean; output?: string; error?: string } | null
  >(null);

  useEffect(() => {
    const want = challenge.expectContains.trim().toLowerCase();
    function onMessage(e: MessageEvent) {
      if (e.source !== iframeRef.current?.contentWindow || !e.data) return;
      if (e.data.type === "ready") {
        readyRef.current = true;
        setReady(true);
        return;
      }
      if (e.data.type === "result") {
        setRunning(false);
        if (e.data.ok) {
          const output: string = e.data.output ?? "";
          const correct = output.toLowerCase().includes(want);
          setOutcome({ correct, output });
          if (correct) onResultRef.current(true);
        } else {
          setOutcome({ correct: false, error: e.data.error });
        }
      }
    }
    window.addEventListener("message", onMessage);
    const timer = window.setTimeout(() => {
      if (!readyRef.current) setLoadError(true);
    }, 20000);
    return () => {
      window.removeEventListener("message", onMessage);
      window.clearTimeout(timer);
    };
  }, [challenge.expectContains]);

  function run() {
    setRunning(true);
    setOutcome(null);
    iframeRef.current?.contentWindow?.postMessage({ type: "run", code }, "*");
  }

  return (
    <div className="challenge">
      <p className="challenge-prompt">{challenge.prompt}</p>

      <div className="code-lab">
        <textarea
          className="code-editor"
          spellCheck={false}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <div className="code-preview">
          <div className="code-preview-bar">UI5 · {t("output")}</div>
          <iframe
            ref={iframeRef}
            className="code-iframe"
            title="UI5 output"
            sandbox="allow-scripts"
            srcDoc={RUNNER_HTML}
          />
        </div>
      </div>

      <div className="code-toolbar">
        <button className="btn-check" disabled={!ready || running} onClick={run}>
          ▶ {running ? "…" : t("run")}
        </button>
        <button className="sap-btn ghost" onClick={() => setCode(challenge.starterCode)}>
          {t("resetCode")}
        </button>
        {!ready && !loadError && <span className="hint">{t("loadingUi5")}</span>}
        {loadError && <span className="code-err">{t("ui5LoadError")}</span>}
      </div>

      {outcome && (
        <>
          {outcome.error !== undefined && (
            <p className="code-err">
              {t("runtimeError")}: {outcome.error}
            </p>
          )}
          {outcome.error === undefined && (
            <p className="hint">
              {t("output")}: {outcome.output || "∅"}
            </p>
          )}
          <Feedback correct={outcome.correct} explanation={challenge.explanation} />
        </>
      )}
    </div>
  );
}
