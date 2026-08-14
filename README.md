# 📘 SAP Learning

**A free, interactive, freeCodeCamp-style platform for learning SAP — from beginner to advanced.**

SAP training is almost all paid. SAP Learning is an open, free alternative: short
interactive lessons with instant-feedback exercises, no login, no cost. Runs
fully in the browser, hosted free on GitHub Pages.

> Content is currently authored in Chinese (中文); the data model is i18n-ready
> so English and other locales can be added.

## Why

- **Free & open** — no paywall, MIT-licensed, community-buildable.
- **Interactive** — every lesson ends with graded exercises (single/multi choice,
  scenario decisions, matching) that check your understanding instantly.
- **Zero backend** — pure client-side SPA; progress is saved in `localStorage`,
  so it costs nothing to host and anyone can fork it.

## Tracks

| Track | Level | Status |
|-------|-------|--------|
| SAP 入门总览 (SAP Fundamentals) | Beginner | ✅ available (5 lessons) |
| 财务 FI/CO | Beginner→Intermediate | 🔜 planned |
| MM/SD 业务流程 | Intermediate | 🔜 planned |
| ABAP 开发 | Technical | 🔜 planned |

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
│   └── MatchingChallenge # "matching" (pair up)
├── content/
│   ├── index.ts          # course catalog
│   └── sap-intro/        # track 1, lessons as typed data + markdown bodies
├── components/           # Home, CoursePage, LessonView, Markdown
└── progress.ts           # localStorage progress (per challenge id)
```

**Adding a challenge type** (e.g. simulated SAP-screen clicks, or live OpenUI5
code that really runs in the browser) means adding one component and one line in
`challenges/index.tsx` — lessons, routing, and progress never change. That
extensibility is intentional: it lets the "interactive" bar rise over time
without a rewrite.

**Adding a lesson or track**: author it as typed data under `content/` and list
it in `content/index.ts`. The home page and routes pick it up automatically.

## Contributing content

Lessons are just data + markdown — no build knowledge needed to write one. Open
an issue proposing a track/lesson, then submit a PR adding it under
`src/content/`. Accuracy first: cite the real T-codes, processes, and terms.

## Deployment

Pushing to `main` builds and deploys to GitHub Pages via
`.github/workflows/deploy.yml`. Enable Pages → “GitHub Actions” in repo settings.
The Vite `base` is set to `/sap-learning/` to match the project site path, and
routing uses `HashRouter` so deep links work without server rewrites.

## License

MIT. Not affiliated with or endorsed by SAP SE. “SAP” is a trademark of SAP SE.
