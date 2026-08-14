import type { Course } from "../../types";

// Track 2 — "UI5 初体验" (Chinese). Technical taster that showcases the `code`
// challenge type: real OpenUI5 running live in a sandboxed iframe. English twin
// in ./en.ts with identical ids.

export const ui5TasterZh: Course = {
  id: "ui5-taster",
  title: "UI5 初体验：在浏览器里跑代码",
  subtitle: "SAP 的前端框架 UI5 是开源的，能直接在浏览器里运行——写几行真代码试试。",
  level: "intermediate",
  lessons: [
    {
      id: "first-ui5",
      title: "1 · 写第一段真正会跑的 UI5",
      body: `
## UI5 是什么

**SAPUI5 / OpenUI5** 是 SAP 的前端框架，用 **JavaScript** 写，跑在浏览器里。
Fiori 应用的界面基本都是用它搭的。**OpenUI5 是开源免费**的版本——所以我们能把它直接加载进这个页面，让你写的代码**真的运行、真的渲染出控件**。

## 三个最基本的概念

- **控件（Control）**：界面积木，比如 **sap.m.Text**（文本）、**sap.m.Button**（按钮）。
- **placeAt**：把控件放到页面某个容器里，例如 \`oText.placeAt("content")\`。这里我们已经给你准备好了一个 id 为 **content** 的容器。
- **数据绑定（Data Binding）**：把控件的属性绑到一个模型的数据上，例如 \`text: "{/name}"\` 会显示模型里 \`name\` 的值。用 **JSONModel** 提供数据。

> 下面的练习是**真代码**：点“运行”，右侧就是真实的 UI5 渲染结果。改错了会看到报错，改对了才算通过。首次加载 UI5 运行时需要几秒、且需要联网。
`,
      challenges: [
        {
          id: "ui5-hello",
          type: "code",
          language: "ui5",
          prompt:
            "把下面的文本控件改成显示 “Hello UI5”，然后点“运行”。（提示：填好 text 的值）",
          starterCode:
            '// 创建一个显示 "Hello UI5" 的文本控件，并放进 #content\nvar oText = new sap.m.Text({ text: "____" });\noText.placeAt("content");\n',
          expectContains: "Hello UI5",
          explanation:
            "sap.m.Text 是最简单的控件，text 属性就是它显示的文字；placeAt(\"content\") 把它渲染到页面容器里。你刚刚跑的是真正的 UI5。",
        },
        {
          id: "ui5-binding",
          type: "code",
          language: "ui5",
          prompt:
            "让文本通过数据绑定显示模型里的名字 “Alice”。把 JSONModel 里的 name 补成 Alice 再运行。",
          starterCode:
            '// 用数据绑定：把 Text 绑到模型的 {/name}，让它显示 "Alice"\nvar oModel = new sap.ui.model.json.JSONModel({ name: "____" });\nvar oText = new sap.m.Text({ text: "{/name}" });\noText.setModel(oModel);\noText.placeAt("content");\n',
          expectContains: "Alice",
          explanation:
            "text: \"{/name}\" 不是写死的字符串，而是绑定到模型里 name 的值。改模型数据，界面就跟着变——这正是 UI5/Fiori 应用的核心工作方式。",
        },
      ],
    },
  ],
};
