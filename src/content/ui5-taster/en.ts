import type { Course } from "../../types";

// Track 2 — "UI5 Taster" (English). Mirrors ./zh.ts with identical ids. Showcases
// the `code` challenge type: real OpenUI5 running live in a sandboxed iframe.

export const ui5TasterEn: Course = {
  id: "ui5-taster",
  title: "UI5 Taster: run code in the browser",
  subtitle:
    "SAP's front-end framework, UI5, is open source and runs right in the browser — write a few lines of real code.",
  level: "intermediate",
  lessons: [
    {
      id: "first-ui5",
      title: "1 · Write your first UI5 that actually runs",
      body: `
## What UI5 is

**SAPUI5 / OpenUI5** is SAP's front-end framework, written in **JavaScript** and
running in the browser. Fiori app UIs are built with it. **OpenUI5 is the free,
open-source** edition — which is why we can load it right into this page and let
your code **actually run and render real controls.**

## Three core ideas

- **Control**: a UI building block, e.g. **sap.m.Text** (text) or
  **sap.m.Button** (button).
- **placeAt**: put a control into a container on the page, e.g.
  \`oText.placeAt("content")\`. We've prepared a container with id **content** for you.
- **Data binding**: bind a control's property to data in a model, e.g.
  \`text: "{/name}"\` shows the model's \`name\` value. A **JSONModel** provides the data.

> The exercises below are **real code**: click “Run” and the right pane shows the
> real UI5 render. Wrong code shows an error; only correct code passes. Loading
> the UI5 runtime the first time takes a few seconds and needs internet.
`,
      challenges: [
        {
          id: "ui5-hello",
          type: "code",
          language: "ui5",
          prompt:
            "Make the text control display “Hello UI5”, then click Run. (Hint: fill in the text value.)",
          starterCode:
            '// Create a Text control that shows "Hello UI5" and place it in #content\nvar oText = new sap.m.Text({ text: "____" });\noText.placeAt("content");\n',
          expectContains: "Hello UI5",
          explanation:
            'sap.m.Text is the simplest control; its text property is what it shows, and placeAt("content") renders it into the page container. You just ran real UI5.',
        },
        {
          id: "ui5-binding",
          type: "code",
          language: "ui5",
          prompt:
            "Use data binding to show the name “Alice” from the model. Set the JSONModel's name to Alice, then Run.",
          starterCode:
            '// Data binding: bind Text to the model\'s {/name} so it shows "Alice"\nvar oModel = new sap.ui.model.json.JSONModel({ name: "____" });\nvar oText = new sap.m.Text({ text: "{/name}" });\noText.setModel(oModel);\noText.placeAt("content");\n',
          expectContains: "Alice",
          explanation:
            'text: "{/name}" is not a hardcoded string — it binds to the model\'s name value. Change the model data and the UI follows. That is exactly how UI5/Fiori apps work.',
        },
      ],
    },
  ],
};
