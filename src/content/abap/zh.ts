import type { Course } from "../../types";

// Track — ABAP 开发 (Chinese). English twin in ./en.ts with identical ids.
// Concept + code-reading challenges (ABAP can't run in-browser, so no `code` type).
// Code samples use 4-space-indented blocks and single-quote char literals to
// stay backtick-free inside this template literal.

export const abapZh: Course = {
  id: "abap",
  title: "ABAP 开发",
  subtitle: "SAP 的编程语言：写第一个程序、内表、Open SQL 查库、模块化与 ALV 报表。",
  level: "advanced",
  lessons: [
    {
      id: "abap-first",
      title: "1 · 第一个程序、数据类型与变量",
      body: `
## 第一个 ABAP 程序

ABAP 程序（可执行报表）以 **REPORT** 开头，每条语句以**句点 .** 结束：

    REPORT zdemo.
    WRITE: 'Hello ABAP'.

**WRITE** 把内容输出到列表屏幕。注释：整行注释以星号 (*) 开头，行内注释用双引号 (")。

## 声明变量

用 **DATA** 声明变量：

    DATA lv_count TYPE i.
    lv_count = 3.

现代写法可以**内联声明**：

    DATA(lv_sum) = 1 + 2.   " lv_sum 自动推断为 i，值 3

## 常见基本类型

| 类型 | 含义 |
| --- | --- |
| **i** | 整数 |
| **p** | 压缩型（带小数，金额常用） |
| **c** | 字符 |
| **n** | 数字字符串 |
| **d / t** | 日期 / 时间 |
| **string** | 变长字符串 |

> 记住：**语句以句点结束、DATA 声明变量、WRITE 输出**，这是 ABAP 的三块地基。
`,
      challenges: [
        {
          id: "abap-f-q1",
          type: "mcq",
          prompt: "ABAP 里每条语句以什么结束？",
          options: ["句点 .", "分号 ;", "换行即可", "花括号 }"],
          answer: 0,
          explanation: "ABAP 语句以句点 . 结束，一条语句可以跨多行，直到遇到句点。",
        },
        {
          id: "abap-f-q2",
          type: "scenario",
          prompt:
            "下面这段会输出什么？\n\n    DATA(lv_x) = 2 + 3.\n    WRITE lv_x.",
          options: ["5", "2 + 3", "报错，不能内联声明", "lv_x"],
          answer: 0,
          explanation:
            "DATA(lv_x) = 2 + 3 内联声明并赋值，lv_x 推断为整数 5，WRITE 输出 5。",
        },
        {
          id: "abap-f-q3",
          type: "matching",
          prompt: "把基本类型和含义连起来：",
          pairs: [
            { left: "i", right: "整数" },
            { left: "p", right: "带小数（金额常用）" },
            { left: "string", right: "变长字符串" },
            { left: "d", right: "日期" },
          ],
          explanation: "i 整数、p 压缩型带小数、string 变长字符串、d 日期。",
        },
      ],
    },
    {
      id: "abap-itab",
      title: "2 · 内表 Internal Tables",
      body: `
## 内表：ABAP 的“数据表格”

**内表（Internal Table）**是内存里的一张多行表格，相当于其他语言的数组/列表，但每行是结构化的。它是 ABAP 处理数据的主力。

## 三种类型

| 类型 | 特点 |
| --- | --- |
| **STANDARD** | 顺序表，可按索引或键读 |
| **SORTED** | 始终按键排序，二分查找快 |
| **HASHED** | 按唯一键哈希，等值查最快 |

## 增行与遍历

    DATA lt_num TYPE TABLE OF i.
    APPEND 10 TO lt_num.
    APPEND 20 TO lt_num.

    LOOP AT lt_num INTO DATA(lv_n).
      WRITE: / lv_n.
    ENDLOOP.

**LOOP AT ... INTO** 逐行取到工作区；现代写法可内联 **DATA(lv_n)**。按键取单行用 **READ TABLE ... WITH KEY**。

> 记住：**内表 = 内存里的多行表格**；STANDARD/SORTED/HASHED 对应不同的查找性能。
`,
      challenges: [
        {
          id: "abap-i-q1",
          type: "mcq",
          prompt: "内表（Internal Table）最贴切的理解是？",
          options: [
            "内存里的一张多行表格（类似数组/列表）",
            "数据库里的一张永久表",
            "一个屏幕控件",
            "一种权限对象",
          ],
          answer: 0,
          explanation:
            "内表是程序运行时存在内存里的多行结构化数据，用于处理数据；数据库表是另一回事。",
        },
        {
          id: "abap-i-q2",
          type: "matching",
          prompt: "把内表类型和特点连起来：",
          pairs: [
            { left: "STANDARD", right: "顺序表，可按索引读" },
            { left: "SORTED", right: "始终按键排序" },
            { left: "HASHED", right: "唯一键哈希，等值查最快" },
          ],
          explanation:
            "STANDARD 顺序、SORTED 按键有序（二分快）、HASHED 哈希（等值查最快）。",
        },
        {
          id: "abap-i-q3",
          type: "scenario",
          prompt:
            "这段循环输出什么？\n\n    DATA lt TYPE TABLE OF i.\n    APPEND 10 TO lt.\n    APPEND 20 TO lt.\n    LOOP AT lt INTO DATA(n).\n      WRITE: / n.\n    ENDLOOP.",
          options: ["10 和 20（各一行）", "只输出 20", "只输出 10", "报错"],
          answer: 0,
          explanation:
            "内表里有 10 和 20 两行，LOOP 逐行取到 n 并换行输出，得到 10 与 20。",
        },
      ],
    },
    {
      id: "abap-opensql",
      title: "3 · 用 Open SQL 查数据库",
      body: `
## Open SQL：与数据库无关的查询

ABAP 用 **Open SQL**（现代称 ABAP SQL）读写数据库，语法与底层数据库无关，SAP 帮你翻译。查询结果通常存进**内表**。

## 查多行到内表

    SELECT carrid, connid, cityfrom
      FROM spfli
      INTO TABLE @DATA(lt_flights)
      WHERE carrid = @lv_carrier.

- **INTO TABLE @DATA(...)**：一次把结果读进内表（内联声明）。
- 现代 ABAP SQL 要求**主机变量加 @**（如 @lv_carrier）。

## 查单行

    SELECT SINGLE carrname
      FROM scarr
      INTO @DATA(lv_name)
      WHERE carrid = @lv_carrier.

**SELECT SINGLE** 只取一行。多表可用 **JOIN**。

> 记住：**Open SQL 与数据库无关、结果进内表、主机变量加 @、单行用 SELECT SINGLE。**
`,
      challenges: [
        {
          id: "abap-s-q1",
          type: "mcq",
          prompt: "关于 Open SQL / ABAP SQL，正确的是？",
          options: [
            "语法与底层数据库无关，由 SAP 翻译执行",
            "只能用于 Oracle 数据库",
            "不能把结果存进内表",
            "必须逐行手写循环取数",
          ],
          answer: 0,
          explanation:
            "Open SQL 屏蔽了底层数据库差异，SAP 负责翻译；结果通常一次读进内表。",
        },
        {
          id: "abap-s-q2",
          type: "mcq",
          prompt: "只想取一条记录，应该用？",
          options: ["SELECT SINGLE", "SELECT ... INTO TABLE", "LOOP AT", "APPEND"],
          answer: 0,
          explanation: "SELECT SINGLE 取单行；INTO TABLE 取多行进内表。",
        },
        {
          id: "abap-s-q3",
          type: "multi",
          prompt: "现代 ABAP SQL 的常见写法，哪些正确？（多选）",
          options: [
            "主机变量前加 @（如 @lv_carrier）",
            "用 INTO TABLE @DATA(lt) 内联声明并读入内表",
            "SELECT SINGLE 取一行",
            "语句不需要句点结束",
          ],
          answers: [0, 1, 2],
          explanation:
            "现代 ABAP SQL 要求主机变量加 @、可用 INTO TABLE @DATA(...)、单行用 SELECT SINGLE；语句仍以句点结束。",
        },
      ],
    },
    {
      id: "abap-modular",
      title: "4 · 模块化与 ALV 报表",
      body: `
## 别把代码写成一大坨

ABAP 有几种模块化手段（从旧到新）：

- **FORM / PERFORM**：子例程，老代码常见，**已过时**，新项目不建议。
- **函数模块（Function Module）**：可跨程序复用，**CALL FUNCTION** 调用。
- **类与方法（Class / Method）**：**面向对象 ABAP（OO ABAP）**，现代首选。

    CLASS lcl_calc DEFINITION.
      PUBLIC SECTION.
        METHODS add IMPORTING iv_a TYPE i iv_b TYPE i
                    RETURNING VALUE(rv) TYPE i.
    ENDCLASS.

## ALV：标准报表利器

不要用一堆 WRITE 拼报表。**ALV（SAP List Viewer）**能自动给出可排序、可筛选、可导出的专业表格。现代用类 **CL_SALV_TABLE**：

    cl_salv_table=>factory(
      IMPORTING r_salv_table = DATA(lo_alv)
      CHANGING  t_table      = lt_data ).
    lo_alv->display( ).

> 记住：**优先用类/方法（OO ABAP）做模块化；报表优先用 ALV（CL_SALV_TABLE），别手写 WRITE 拼表。**
`,
      challenges: [
        {
          id: "abap-m-q1",
          type: "mcq",
          prompt: "现代 ABAP 项目里，做模块化最推荐用？",
          options: [
            "类与方法（面向对象 ABAP）",
            "尽量多用 FORM / PERFORM",
            "全部写在一个主程序里不拆分",
            "只用宏",
          ],
          answer: 0,
          explanation:
            "OO ABAP（类/方法）是现代首选；FORM/PERFORM 已过时，新项目应避免。",
        },
        {
          id: "abap-m-q2",
          type: "mcq",
          prompt: "要做一张可排序、可筛选、可导出的专业报表，应该用？",
          options: [
            "ALV（如 CL_SALV_TABLE）",
            "一堆 WRITE 语句手工拼",
            "把数据 SELECT 出来就算完了",
            "Excel 宏",
          ],
          answer: 0,
          explanation:
            "ALV（CL_SALV_TABLE）自动提供排序/筛选/导出等功能，远优于手写 WRITE。",
        },
        {
          id: "abap-m-q3",
          type: "matching",
          prompt: "把模块化手段和描述连起来：",
          pairs: [
            { left: "FORM / PERFORM", right: "老式子例程，已过时" },
            { left: "Function Module", right: "可复用，CALL FUNCTION 调用" },
            { left: "Class / Method", right: "OO ABAP，现代首选" },
          ],
          explanation:
            "FORM/PERFORM 过时、Function Module 可复用、Class/Method 是现代首选。",
        },
      ],
    },
  ],
};
