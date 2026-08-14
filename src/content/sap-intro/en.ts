import type { Course } from "../../types";

// Track 1 — "SAP Fundamentals" (English). Mirrors ./zh.ts exactly: same course,
// lesson, and challenge ids so progress and deep links survive a language switch.

export const sapIntroEn: Course = {
  id: "sap-intro",
  title: "SAP Fundamentals",
  subtitle:
    "For total beginners: what SAP is, how the modules split up, how to navigate, and how data flows.",
  level: "beginner",
  lessons: [
    {
      id: "what-is-sap",
      title: "1 · What SAP actually is",
      body: `
## SAP is ERP software

**SAP** is one of the world's largest enterprise-software companies, and its most
famous product is an **ERP** (Enterprise Resource Planning) system.

ERP in one sentence: **put a company's finance, procurement, sales, production,
inventory, HR… all into one system, sharing one set of data.** The moment Sales
creates an order, the warehouse, finance, and production see it too — no more
emailing Excel files back and forth.

## ECC vs. S/4HANA

- **SAP ECC**: the previous-generation flagship (still widely in use).
- **SAP S/4HANA**: the new generation, running on SAP's own **HANA in-memory
  database** — fast, with a web-based **Fiori** UI. This is the current direction.

## Deployment options

S/4HANA can run in a company's own data center (**On-Premise**) or in the cloud
(**Cloud**, e.g. RISE / GROW with SAP).

> Keep this thread in mind: **SAP (the company) → ERP (the product category) →
> S/4HANA (today's product) → runs on HANA, uses the Fiori UI.**
`,
      challenges: [
        {
          id: "what-is-sap-q1",
          type: "mcq",
          prompt: "What is the core value of an ERP system?",
          options: [
            "Letting each department use its own separate software",
            "Putting every department's work in one system, sharing one set of data",
            "Being purpose-built for data visualization and charts",
            "Replacing the company's email system",
          ],
          answer: 1,
          explanation:
            "ERP is about connecting everything: enter once, visible everywhere — avoiding data silos and duplicate entry.",
        },
        {
          id: "what-is-sap-q2",
          type: "mcq",
          prompt: "Compared with ECC, what is S/4HANA's signature underlying change?",
          options: [
            "It switched to the HANA in-memory database",
            "It can only be deployed on-premise",
            "It dropped the finance module",
            "It uses Excel as its database",
          ],
          answer: 0,
          explanation:
            "S/4HANA must run on the HANA in-memory database — the basis for its speed and real-time analytics; the UI also shifts to Fiori.",
        },
        {
          id: "what-is-sap-q3",
          type: "scenario",
          prompt:
            "A colleague says: “We're adopting SAP — we chose the RISE with SAP cloud option.” Which generation are they most likely on?",
          options: ["ECC (previous gen)", "S/4HANA (new gen)", "Neither"],
          answer: 1,
          explanation:
            "RISE with SAP is the commercial bundle built around S/4HANA Cloud, so it points to the new generation.",
        },
      ],
    },
    {
      id: "module-map",
      title: "2 · The module map: how SAP is split up",
      body: `
## Functional modules

SAP is split into **modules** by business area. Common ones:

| Module | Full name | What it handles |
| --- | --- | --- |
| **FI** | Financial Accounting | External finance: G/L, receivables, payables, reports |
| **CO** | Controlling | Internal management accounting: cost centers, internal costing |
| **MM** | Materials Management | Procurement and inventory |
| **SD** | Sales & Distribution | Sales and delivery |
| **PP** | Production Planning | Production planning |
| **QM** | Quality Management | Quality management |
| **PM** | Plant Maintenance | Equipment maintenance |
| **HCM** | Human Capital Mgmt | HR (often SuccessFactors in the cloud) |

## The technical layer

- **ABAP**: SAP's own programming language, used to develop/customize.
- **BASIS**: system administration and operations (install, authorizations, performance).
- **BTP**: SAP Business Technology Platform — cloud platform for extensions, integration, analytics.
- **Fiori**: the modern web UX layer.

> Interview basics: **FI is the "external," statutory finance; CO is the
> "internal" management accounting.** They're tightly linked and often called
> **FICO** together.
`,
      challenges: [
        {
          id: "module-map-q1",
          type: "matching",
          prompt: "Match each module to what it covers:",
          pairs: [
            { left: "MM", right: "Procurement & inventory" },
            { left: "SD", right: "Sales & delivery" },
            { left: "FI", right: "External finance & reporting" },
            { left: "PP", right: "Production planning" },
          ],
          explanation:
            "MM = procurement/inventory, SD = sales/delivery, FI = external finance, PP = production planning. These are the most-cited core modules.",
        },
        {
          id: "module-map-q2",
          type: "mcq",
          prompt: "Which statement about FI vs. CO is most accurate?",
          options: [
            "FI handles external statutory finance; CO handles internal management accounting",
            "FI handles sales; CO handles procurement",
            "FI is a programming language; CO is a database",
            "They are identical, just named differently",
          ],
          answer: 0,
          explanation:
            "FI faces outward (statutory reports, G/L); CO faces inward (costs, profitability). They share data and are often called FICO.",
        },
        {
          id: "module-map-q3",
          type: "multi",
          prompt: "Which of these belong to the technical layer rather than a business module? (Select all)",
          options: ["ABAP", "SD", "BASIS", "BTP", "MM"],
          answers: [0, 2, 3],
          explanation:
            "ABAP (dev language), BASIS (operations), and BTP (cloud platform) are technical; SD and MM are business modules.",
        },
      ],
    },
    {
      id: "navigation",
      title: "3 · Navigating: T-codes and Fiori",
      body: `
## Two UIs

- **SAP GUI**: the classic desktop client; inside you see the **SAP Easy Access**
  menu tree.
- **Fiori Launchpad**: the new web UI made of **tiles**, the S/4HANA default.

## Transaction Codes (T-codes)

Experienced users rarely click through menus — they type a **T-code** in the
command field to jump straight to a function. A few common ones:

| T-code | Function |
| --- | --- |
| **FB50** | Post a G/L document (FI) |
| **ME21N** | Create a purchase order (MM) |
| **VA01** | Create a sales order (SD) |
| **MM01** | Create material master data |
| **MIGO** | Goods receipt / goods movement |
| **SE80** | ABAP Development Workbench |

Tip: prefixing **/n** in the command field ends the current transaction before
jumping; **/o** opens it in a new window.

> Key idea: **a T-code is a shortcut** — one short code per function; a Fiori
> tile is its web-based, graphical equivalent.
`,
      challenges: [
        {
          id: "navigation-q1",
          type: "mcq",
          prompt: "In the SAP GUI, what does a T-code (transaction code) do?",
          options: [
            "Assigns authorizations to users",
            "Acts as a shortcut that jumps straight to a function",
            "Backs up the database",
            "Translates the UI language",
          ],
          answer: 1,
          explanation:
            "A T-code is like a shortcut to a function — type it in the command field to go there directly, skipping the menu tree.",
        },
        {
          id: "navigation-q2",
          type: "matching",
          prompt: "Match each common T-code to its function:",
          pairs: [
            { left: "ME21N", right: "Create purchase order" },
            { left: "VA01", right: "Create sales order" },
            { left: "FB50", right: "Post a G/L document" },
            { left: "MM01", right: "Create material master" },
          ],
          explanation:
            "ME21N = purchase order (MM), VA01 = sales order (SD), FB50 = G/L document (FI), MM01 = material master.",
        },
        {
          id: "navigation-q3",
          type: "scenario",
          prompt:
            "You need to create a sales order but you're currently stuck in another transaction. The smoothest move is?",
          options: [
            "Type /nVA01 in the command field to jump straight there",
            "Close all of SAP and log back in",
            "Call an admin to switch it for you",
          ],
          answer: 0,
          explanation:
            "The /n prefix ends the current transaction and jumps; /nVA01 takes you straight into creating a sales order — no re-login needed.",
        },
      ],
    },
    {
      id: "master-vs-transactional",
      title: "4 · Master data vs. transactional data",
      body: `
## Two kinds of data

- **Master data**: relatively stable "reference records" reused over and over —
  e.g. **material master, customer/vendor, G/L accounts, cost centers.** Create
  it once, and many documents later reference it.
- **Transactional data**: records of a specific business event, usually with a
  date and document number — e.g. **sales orders, purchase orders, invoices,
  accounting documents, material documents.**

> Analogy: master data is like a **contact in your address book**; transactional
> data is like **the log of one phone call** you made to that contact.

## Organizational structure

SAP maps a company's structure with nested organizational units, top-down:

- **Client**: the top level — the boundary of one set of master data and config.
- **Company Code**: an independent legal entity; the level at which **FI**
  produces financial statements.
- **Plant**: a logistics/production location, belonging to **MM/PP**.
- On the sales side there's also **Sales Organization**, etc.

## An S/4HANA change: Business Partner

In S/4HANA, **customers and vendors are unified under the "Business Partner (BP)"**
master-data concept — one BP can play several roles (customer, vendor, …) at once.

> Key point: **master data comes first, then transactional documents** — without
> material master data, you can't pick that material on a purchase order.
`,
      challenges: [
        {
          id: "master-q1",
          type: "multi",
          prompt: "Which of these are master data? (Select all)",
          options: [
            "Material master",
            "One specific sales order",
            "Customer master / Business Partner",
            "G/L account",
            "A specific purchase invoice",
          ],
          answers: [0, 2, 3],
          explanation:
            "Material, customer/BP, and G/L account are reusable master data; a specific sales order and a purchase invoice are transactional data.",
        },
        {
          id: "master-q2",
          type: "mcq",
          prompt: "Which org unit is the level at which FI produces statutory financial statements?",
          options: ["Plant", "Company Code", "Client"],
          answer: 1,
          explanation:
            "A Company Code represents an independent legal entity — the level for financial statements (balance sheet / P&L).",
        },
        {
          id: "master-q3",
          type: "scenario",
          prompt:
            "A buyer wants to pick material “Screw A” on a purchase order but can't find it. The most likely reason?",
          options: [
            "Material master data for “Screw A” hasn't been created yet",
            "The SAP server is down",
            "Purchase orders can't reference materials",
          ],
          answer: 0,
          explanation:
            "Transactional documents reference master data. Without first creating the material master (MM01), the PO simply can't offer that material.",
        },
      ],
    },
    {
      id: "end-to-end",
      title: "5 · Tying it together: an end-to-end process",
      body: `
## Why look "end to end"

SAP's power is in **connecting across modules.** Two classic core flows show it.

## O2C: Order to Cash (SD-led)

1. **Create sales order** (VA01, SD) — the customer places an order.
2. **Delivery / goods issue** (VL01N) — the warehouse ships; **posting the goods
   movement** automatically reduces inventory (MM) and creates the accounting
   effect (FI/CO).
3. **Billing** (VF01) — generate the customer invoice.
4. **Payment** (FI) — the customer pays; clear the receivable.

## P2P: Procure to Pay (MM-led)

1. **Purchase requisition (PR)** (ME51N) — raise the need.
2. **Purchase order (PO)** (ME21N) — formally order from the vendor.
3. **Goods receipt (GR)** (MIGO) — goods arrive; inventory rises, a material
   document is created.
4. **Invoice verification (IR)** (MIRO) — check the vendor invoice.
5. **Payment** (F-53, FI).

## Three-Way Match

Before payment, the system compares **Purchase Order ↔ Goods Receipt ↔ Invoice**
for consistency (quantity, amount). Only when all three agree is payment released
— an important internal control.

> One action moves several modules: **a single SD goods issue also moves
> inventory (MM) and the books (FI/CO)** — that's ERP's "connectedness."
`,
      challenges: [
        {
          id: "e2e-q1",
          type: "mcq",
          prompt: "Which module leads the “O2C (Order to Cash)” flow?",
          options: ["MM", "SD", "PP"],
          answer: 1,
          explanation:
            "O2C runs from sales order to cash, led by SD (Sales & Distribution), while touching MM inventory and FI finance.",
        },
        {
          id: "e2e-q2",
          type: "mcq",
          prompt: "The “three-way match” before payment compares which three things?",
          options: [
            "Purchase Order (PO), Goods Receipt (GR), Invoice (IR)",
            "Sales order, customer, inventory",
            "Payslip, attendance, tax form",
          ],
          answer: 0,
          explanation:
            "Three-way match = PO ↔ GR ↔ IR; payment is released only when quantity and amount agree — a key control in procurement.",
        },
        {
          id: "e2e-q3",
          type: "scenario",
          prompt:
            "A warehouse posts a goods issue for a delivery in SAP. Besides SD, what does this step typically affect directly?",
          options: [
            "Only SD; nothing else",
            "It reduces inventory (MM) and creates a financial effect (FI/CO)",
            "Only HR (HCM)",
          ],
          answer: 1,
          explanation:
            "Posting a goods issue reduces inventory (MM) and triggers the matching accounting entries (FI/CO) — one action across modules, exactly ERP's connectedness.",
        },
        {
          id: "e2e-q4",
          type: "matching",
          prompt: "Match each P2P step to its document / transaction:",
          pairs: [
            { left: "Purchase requisition", right: "PR (ME51N)" },
            { left: "Purchase order", right: "PO (ME21N)" },
            { left: "Goods receipt", right: "GR (MIGO)" },
            { left: "Invoice verification", right: "IR (MIRO)" },
          ],
          explanation:
            "P2P: PR → PO → GR → IR → payment. Remember this chain and the procurement flow has its skeleton.",
        },
      ],
    },
  ],
};
