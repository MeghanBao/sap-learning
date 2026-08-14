# 📘 SAP Learning

**A free, interactive, freeCodeCamp-style platform for learning SAP — from beginner to advanced.**

🔗 **Live site: https://meghanbao.github.io/sap-learning/**

SAP training is almost all paid. SAP Learning is an open, free alternative: short
interactive lessons with instant-feedback exercises, no login, no cost. Runs
fully in the browser, hosted free on GitHub Pages.

> Bilingual: **English + 中文**, switchable in the top bar (remembers your
> choice, and defaults to your browser language). Progress and deep links are
> keyed by stable ids, so switching language mid-track keeps your place.

## Why

- **Free & open** — no paywall, MIT-licensed, community-buildable.
- **Interactive** — every lesson ends with graded exercises (single/multi choice,
  scenario decisions, matching) that check your understanding instantly.
- **Zero backend** — pure client-side SPA; progress is saved in `localStorage`,
  so it costs nothing to host and anyone can fork it.

## Tracks

| Track | Level | Status |
|-------|-------|--------|
| SAP 入门总览 (SAP Fundamentals) | Beginner | ✅ available (5 lessons, incl. a hands-on ME21N screen) |
| UI5 初体验 (UI5 Taster) | Intermediate | ✅ available (live OpenUI5 code in the browser) |
| 财务 FI/CO | Beginner→Intermediate | 🔜 planned |
| MM/SD 业务流程 | Intermediate | 🔜 planned |
| ABAP 开发 | Technical | 🔜 planned |

### Challenge types

Exercises are graded instantly in the browser. Current types:

- **mcq / scenario** — single-answer choice / decision
- **multi** — multiple correct answers
- **matching** — pair items up
- **screen** — hands-on: fill out a simulated SAP/Fiori screen (e.g. create a PO
  in a mock ME21N), graded per field
- **code** — write real **OpenUI5** code that actually runs in a sandboxed
  iframe and renders live controls; graded on the rendered output *(needs
  internet: the UI5 runtime loads from the OpenUI5 CDN)*

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

Build / typecheck:

```bash
npm run build      # tsc --noEmit && vite build  → dist/
npm run typecheck
```

## Architecture

Pure Vite + React + TypeScript. The heart is a **pluggable challenge engine**:

```
src/
├── types.ts              # Course / Lesson / Challenge model
├── challenges/
│   ├── index.tsx         # registry: challenge `type` → component + grader
│   ├── ChoiceChallenge   # "mcq" / "scenario" (single answer)
│   ├── MultiChallenge    # "multi" (many answers)
│   ├── MatchingChallenge # "matching" (pair up)
│   ├── ScreenChallenge   # "screen" (fill a simulated SAP screen)
│   └── CodeChallenge     # "code" (live OpenUI5 in a sandboxed iframe)
├── content/
│   ├── index.ts          # per-locale course catalog
│   ├── sap-intro/        # track 1: zh.ts + en.ts (identical ids), typed data + markdown
│   └── ui5-taster/       # track 2: live-code track (zh.ts + en.ts)
├── components/           # Home, CoursePage, LessonView, Markdown
├── i18n.ts               # locale state + UI string dictionary (zh / en)
└── progress.ts           # localStorage progress (per challenge id)
```

**Adding a challenge type** means adding one component and one line in
`challenges/index.tsx` — lessons, routing, and progress never change. This is
how the interactivity bar was raised from quizzes → simulated screens → live
OpenUI5 code without touching the rest of the app.

**Adding a lesson or track**: author it as typed data (a `zh.ts` / `en.ts` pair
with matching ids) under `content/`, and list it per-locale in
`content/index.ts`. The home page and routes pick it up automatically.

## Contributing content

Lessons are just data + markdown — no build knowledge needed to write one. Open
an issue proposing a track/lesson, then submit a PR adding it under
`src/content/` (please provide both `zh` and `en`; keep the ids identical so
progress and links stay in sync). Accuracy first: cite the real T-codes,
processes, and terms.

## Deployment

Pushing to `main` builds and deploys to GitHub Pages via
`.github/workflows/deploy.yml` — the live site above updates automatically.

The Vite `base` is set to `/sap-learning/` to match the project site path, and
routing uses `HashRouter` so deep links work without server rewrites.

**One-time setup** (already done for this repo; needed if you fork it): in repo
**Settings → Pages**, set **Source** to **“GitHub Actions.”** Until that's set,
the deploy job fails with a 404 (“Ensure GitHub Pages has been enabled”).

## License

MIT. Not affiliated with or endorsed by SAP SE. “SAP” is a trademark of SAP SE.
