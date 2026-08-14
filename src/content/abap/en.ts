import type { Course } from "../../types";

// Track — ABAP Development (English). Mirrors ./zh.ts with identical ids.
// Concept + code-reading challenges (ABAP can't run in-browser). Code samples use
// 4-space-indented blocks and single-quote char literals (backtick-free).

export const abapEn: Course = {
  id: "abap",
  title: "ABAP Development",
  subtitle:
    "SAP's programming language: your first program, internal tables, Open SQL, modularization & ALV reports.",
  level: "advanced",
  lessons: [
    {
      id: "abap-first",
      title: "1 · First program, data types & variables",
      body: `
## Your first ABAP program

An ABAP program (executable report) starts with **REPORT**, and every statement
ends with a **period .**:

    REPORT zdemo.
    WRITE: 'Hello ABAP'.

**WRITE** outputs to the list screen. Comments: a full line starts with an
asterisk (*); inline comments use a double quote (").

## Declaring variables

Declare variables with **DATA**:

    DATA lv_count TYPE i.
    lv_count = 3.

The modern style allows **inline declaration**:

    DATA(lv_sum) = 1 + 2.   " lv_sum is inferred as i, value 3

## Common elementary types

| Type | Meaning |
| --- | --- |
| **i** | Integer |
| **p** | Packed (with decimals; used for amounts) |
| **c** | Character |
| **n** | Numeric text |
| **d / t** | Date / time |
| **string** | Variable-length string |

> Remember: **statements end with a period, DATA declares variables, WRITE outputs**
> — the three foundations of ABAP.
`,
      challenges: [
        {
          id: "abap-f-q1",
          type: "mcq",
          prompt: "How does each ABAP statement end?",
          options: ["A period .", "A semicolon ;", "A newline is enough", "A brace }"],
          answer: 0,
          explanation: "ABAP statements end with a period; one statement can span many lines until the period.",
        },
        {
          id: "abap-f-q2",
          type: "scenario",
          prompt: "What does this output?\n\n    DATA(lv_x) = 2 + 3.\n    WRITE lv_x.",
          options: ["5", "2 + 3", "Error — no inline declaration", "lv_x"],
          answer: 0,
          explanation:
            "DATA(lv_x) = 2 + 3 declares inline and assigns; lv_x is inferred as integer 5, and WRITE prints 5.",
        },
        {
          id: "abap-f-q3",
          type: "matching",
          prompt: "Match each elementary type to its meaning:",
          pairs: [
            { left: "i", right: "Integer" },
            { left: "p", right: "Decimal (used for amounts)" },
            { left: "string", right: "Variable-length string" },
            { left: "d", right: "Date" },
          ],
          explanation: "i integer, p packed/decimal, string variable-length, d date.",
        },
      ],
    },
    {
      id: "abap-itab",
      title: "2 · Internal Tables",
      body: `
## Internal tables: ABAP's “data grids”

An **internal table** is an in-memory table of many rows — like an array/list in
other languages, but each row is structured. It's ABAP's main workhorse for data.

## Three kinds

| Kind | Traits |
| --- | --- |
| **STANDARD** | Sequential; read by index or key |
| **SORTED** | Always sorted by key; fast binary search |
| **HASHED** | Hashed by unique key; fastest exact lookup |

## Adding rows and looping

    DATA lt_num TYPE TABLE OF i.
    APPEND 10 TO lt_num.
    APPEND 20 TO lt_num.

    LOOP AT lt_num INTO DATA(lv_n).
      WRITE: / lv_n.
    ENDLOOP.

**LOOP AT ... INTO** reads row by row into a work area; the modern style inlines
**DATA(lv_n)**. To read one row by key, use **READ TABLE ... WITH KEY**.

> Remember: **an internal table is a multi-row table in memory**; STANDARD/SORTED/
> HASHED trade off different lookup performance.
`,
      challenges: [
        {
          id: "abap-i-q1",
          type: "mcq",
          prompt: "What is an internal table, most accurately?",
          options: [
            "A multi-row table held in memory (like an array/list)",
            "A permanent table in the database",
            "A screen control",
            "An authorization object",
          ],
          answer: 0,
          explanation:
            "An internal table is multi-row structured data held in memory at runtime; a database table is a different thing.",
        },
        {
          id: "abap-i-q2",
          type: "matching",
          prompt: "Match each internal-table kind to its trait:",
          pairs: [
            { left: "STANDARD", right: "Sequential; read by index" },
            { left: "SORTED", right: "Always sorted by key" },
            { left: "HASHED", right: "Hashed unique key; fastest exact lookup" },
          ],
          explanation:
            "STANDARD sequential, SORTED key-ordered (binary search), HASHED hashed (fastest exact match).",
        },
        {
          id: "abap-i-q3",
          type: "scenario",
          prompt:
            "What does this loop output?\n\n    DATA lt TYPE TABLE OF i.\n    APPEND 10 TO lt.\n    APPEND 20 TO lt.\n    LOOP AT lt INTO DATA(n).\n      WRITE: / n.\n    ENDLOOP.",
          options: ["10 and 20 (one per line)", "Only 20", "Only 10", "Error"],
          answer: 0,
          explanation:
            "The table holds rows 10 and 20; LOOP reads each into n and writes on a new line, giving 10 and 20.",
        },
      ],
    },
    {
      id: "abap-opensql",
      title: "3 · Querying the database with Open SQL",
      body: `
## Open SQL: database-independent queries

ABAP reads/writes the database with **Open SQL** (modern: ABAP SQL). The syntax is
independent of the underlying database — SAP translates it. Results usually go into
an **internal table**.

## Read many rows into a table

    SELECT carrid, connid, cityfrom
      FROM spfli
      INTO TABLE @DATA(lt_flights)
      WHERE carrid = @lv_carrier.

- **INTO TABLE @DATA(...)**: read the result set into an internal table (inline decl).
- Modern ABAP SQL requires **host variables prefixed with @** (e.g. @lv_carrier).

## Read a single row

    SELECT SINGLE carrname
      FROM scarr
      INTO @DATA(lv_name)
      WHERE carrid = @lv_carrier.

**SELECT SINGLE** fetches one row. Multiple tables can use **JOIN**.

> Remember: **Open SQL is database-independent, results go into an internal table,
> host variables need @, and one row uses SELECT SINGLE.**
`,
      challenges: [
        {
          id: "abap-s-q1",
          type: "mcq",
          prompt: "Which is true of Open SQL / ABAP SQL?",
          options: [
            "The syntax is database-independent; SAP translates and runs it",
            "It only works with Oracle",
            "It can't put results into an internal table",
            "You must hand-loop row by row to fetch",
          ],
          answer: 0,
          explanation:
            "Open SQL abstracts away database differences; SAP translates it, and results usually read into an internal table at once.",
        },
        {
          id: "abap-s-q2",
          type: "mcq",
          prompt: "To fetch just one record, use?",
          options: ["SELECT SINGLE", "SELECT ... INTO TABLE", "LOOP AT", "APPEND"],
          answer: 0,
          explanation: "SELECT SINGLE fetches one row; INTO TABLE fetches many into an internal table.",
        },
        {
          id: "abap-s-q3",
          type: "multi",
          prompt: "Which are correct for modern ABAP SQL? (Select all)",
          options: [
            "Prefix host variables with @ (e.g. @lv_carrier)",
            "Use INTO TABLE @DATA(lt) to inline-declare and read into a table",
            "SELECT SINGLE for one row",
            "Statements don't need a period",
          ],
          answers: [0, 1, 2],
          explanation:
            "Modern ABAP SQL needs @ on host variables, supports INTO TABLE @DATA(...), and SELECT SINGLE for one row; statements still end with a period.",
        },
      ],
    },
    {
      id: "abap-modular",
      title: "4 · Modularization & ALV reports",
      body: `
## Don't write one giant blob

ABAP offers several modularization tools (old to new):

- **FORM / PERFORM**: subroutines, common in old code, **obsolete** — avoid in new work.
- **Function Module**: reusable across programs, called with **CALL FUNCTION**.
- **Class / Method**: **Object-Oriented ABAP (OO ABAP)**, the modern default.

    CLASS lcl_calc DEFINITION.
      PUBLIC SECTION.
        METHODS add IMPORTING iv_a TYPE i iv_b TYPE i
                    RETURNING VALUE(rv) TYPE i.
    ENDCLASS.

## ALV: the standard reporting tool

Don't stitch a report together with WRITE. **ALV (SAP List Viewer)** gives a
professional grid that's sortable, filterable, and exportable. The modern class is
**CL_SALV_TABLE**:

    cl_salv_table=>factory(
      IMPORTING r_salv_table = DATA(lo_alv)
      CHANGING  t_table      = lt_data ).
    lo_alv->display( ).

> Remember: **prefer classes/methods (OO ABAP) for modularization; prefer ALV
> (CL_SALV_TABLE) for reports instead of hand-writing WRITE.**
`,
      challenges: [
        {
          id: "abap-m-q1",
          type: "mcq",
          prompt: "In modern ABAP projects, what's the recommended way to modularize?",
          options: [
            "Classes and methods (Object-Oriented ABAP)",
            "Use FORM / PERFORM as much as possible",
            "Put everything in one main program, no splitting",
            "Only use macros",
          ],
          answer: 0,
          explanation: "OO ABAP (classes/methods) is the modern default; FORM/PERFORM is obsolete and should be avoided in new work.",
        },
        {
          id: "abap-m-q2",
          type: "mcq",
          prompt: "For a professional, sortable, filterable, exportable report, use?",
          options: [
            "ALV (e.g. CL_SALV_TABLE)",
            "A pile of WRITE statements by hand",
            "Just SELECT the data and stop",
            "An Excel macro",
          ],
          answer: 0,
          explanation: "ALV (CL_SALV_TABLE) gives sorting/filtering/export out of the box — far better than hand-written WRITE.",
        },
        {
          id: "abap-m-q3",
          type: "matching",
          prompt: "Match each modularization tool to its description:",
          pairs: [
            { left: "FORM / PERFORM", right: "Old subroutine, obsolete" },
            { left: "Function Module", right: "Reusable, called via CALL FUNCTION" },
            { left: "Class / Method", right: "OO ABAP, modern default" },
          ],
          explanation:
            "FORM/PERFORM obsolete, Function Module reusable, Class/Method the modern default.",
        },
      ],
    },
  ],
};
