import type { Course } from "../../types";

// Track — Finance FI/CO (English). Mirrors ./zh.ts with identical ids.

export const fiCoEn: Course = {
  id: "fi-co",
  title: "Finance FI/CO",
  subtitle:
    "The most-studied, most-hired SAP area: debit/credit, the general ledger, receivables & payables, cost centers.",
  level: "intermediate",
  lessons: [
    {
      id: "fi-debit-credit",
      title: "1 · Debit/credit and the accounting document",
      body: `
## Double-entry: every posting balances

The foundation of SAP finance is **double-entry bookkeeping**: every transaction
hits two (or more) accounts, and **total debits = total credits**. Each
**accounting document** in SAP has:

- **Header**: document date, posting date, company code, document type.
- **Multiple line items**: each with an account, a debit/credit indicator, and an amount.

## The debit/credit rule

| Account class | Debit | Credit |
| --- | --- | --- |
| Asset | Increase ↑ | Decrease ↓ |
| Expense | Increase ↑ | Decrease ↓ |
| Liability | Decrease ↓ | Increase ↑ |
| Equity | Decrease ↓ | Increase ↑ |
| Revenue | Decrease ↓ | Increase ↑ |

## Example: cash sale of 1000

The customer pays on the spot and the money hits the bank:

- **Debit: Bank 1000** (asset up)
- **Credit: Revenue 1000** (revenue up)

Debit and credit are both 1000 — balanced, so it can post. Common T-code:
**FB50** (enter a G/L document).

> Remember: **assets/expenses increase on the debit side; liabilities/equity/
> revenue increase on the credit side.** This rule explains most entries to come.
`,
      challenges: [
        {
          id: "fi-dc-q1",
          type: "mcq",
          prompt: "Under double-entry, what must an accounting document satisfy?",
          options: [
            "Total debits equal total credits",
            "It can have only one line item",
            "Amounts must be whole numbers",
            "Debit is always greater than credit",
          ],
          answer: 0,
          explanation:
            "The iron rule of double-entry: total debits = total credits, or the document can't post.",
        },
        {
          id: "fi-dc-q2",
          type: "matching",
          prompt: "Match each account class to “what a debit does to it”:",
          pairs: [
            { left: "Asset", right: "Debit increases" },
            { left: "Revenue", right: "Debit decreases" },
            { left: "Expense", right: "Debit increases" },
            { left: "Liability", right: "Debit decreases" },
          ],
          explanation:
            "Assets/expenses increase on debit; revenue/liabilities/equity decrease on debit (i.e. they increase on credit).",
        },
        {
          id: "fi-dc-q3",
          type: "scenario",
          prompt:
            "A customer pays 1000 cash on the spot and it lands in the company's bank account. The entry is?",
          options: [
            "Debit Bank 1000 / Credit Revenue 1000",
            "Debit Revenue 1000 / Credit Bank 1000",
            "Debit Accounts Receivable 1000 / Credit Bank 1000",
          ],
          answer: 0,
          explanation:
            "Bank (asset) rises → debit; Revenue rises → credit; both 1000.",
        },
        {
          id: "fi-dc-q4",
          type: "screen",
          prompt:
            "Hands-on: on the mock FB50 screen, post that cash-sale document — Company Code 1000, Debit account 113100 (Bank), Credit account 800000 (Revenue), Amount 1000 — then Post. (Account numbers are illustrative.)",
          screenTitle: "Enter G/L Document · FB50",
          submitLabel: "Post",
          fields: [
            { id: "cc", label: "Company Code", expected: "1000", hint: "Use 1000" },
            { id: "debit", label: "Debit account", expected: "113100", placeholder: "Bank" },
            { id: "credit", label: "Credit account", expected: "800000", placeholder: "Revenue" },
            { id: "amount", label: "Amount", type: "number", expected: "1000" },
          ],
          explanation:
            "FB50 is filling a document with which account to debit, which to credit, and how much. In a real system the account numbers come from the chart of accounts and debits must equal credits.",
        },
      ],
    },
    {
      id: "fi-gl",
      title: "2 · The General Ledger and Chart of Accounts",
      body: `
## The General Ledger (G/L)

The **General Ledger (G/L)** is the summary book of all financial data. Every
posting ultimately lands on some **G/L account**.

## Chart of Accounts

The **Chart of Accounts (COA)** is the "dictionary" of all G/L accounts — it
defines each account number, name, and type. The COA is **assigned to company
codes**; several company codes can share one COA for consistent group accounting.

- Two broad kinds: **balance-sheet accounts** and **P&L accounts**.

## The big S/4HANA change: the Universal Journal

In S/4HANA, FI and CO line items are merged into **one table, the Universal
Journal (ACDOCA)**, instead of being kept separately. The payoff: financial and
management-accounting data are consistent in real time and drillable instantly —
an ability the HANA in-memory database enables.

> The chain: **a posting → lands on a G/L account → the account is defined in the
> chart of accounts → the COA is assigned to a company code.**
`,
      challenges: [
        {
          id: "fi-gl-q1",
          type: "mcq",
          prompt: "What is the Chart of Accounts?",
          options: [
            "The dictionary/list of all G/L accounts",
            "One specific accounting document",
            "The company's bank statement",
            "The employee payroll sheet",
          ],
          answer: 0,
          explanation:
            "The COA is the master list of G/L account definitions; assigned to a company code before it can be used.",
        },
        {
          id: "fi-gl-q2",
          type: "multi",
          prompt: "Which are true of the S/4HANA Universal Journal (ACDOCA)? (Select all)",
          options: [
            "It merges FI and CO line items into one table",
            "It keeps finance and management accounting consistent in real time",
            "It is actually an Excel file",
            "It relies on the HANA in-memory database",
          ],
          answers: [0, 1, 3],
          explanation:
            "The Universal Journal merges FI+CO in ACDOCA, consistent and drillable — a HANA capability; it's a database table, not Excel.",
        },
        {
          id: "fi-gl-q3",
          type: "scenario",
          prompt:
            "A group has 3 company codes and wants consolidated reports on a common accounting basis. The sensible approach?",
          options: [
            "Assign them the same chart of accounts",
            "Give each company code a completely unrelated chart of accounts",
            "Don't use a chart of accounts at all",
          ],
          answer: 0,
          explanation:
            "Sharing one (operating) chart of accounts lets them account on a common basis and consolidate easily.",
        },
      ],
    },
    {
      id: "fi-ar-ap",
      title: "3 · Accounts Receivable (AR) & Payable (AP)",
      body: `
## Sub-ledgers

Besides the G/L, FI has two heavily used **sub-ledgers**:

- **Accounts Receivable (AR)**: what **customers** owe the company.
- **Accounts Payable (AP)**: what the company owes **vendors**.

## Reconciliation account

Customer/vendor details live in the sub-ledger and are automatically rolled up to
the G/L through a **reconciliation account** — you never re-post to the G/L by
hand, and the two always agree.

## Business Partner

In S/4HANA, **customers and vendors are unified as Business Partners** — one BP
can be both a customer and a vendor (buys from you and sells to you).

## Common actions

- Customer invoicing and incoming payment (e.g. **F-28**).
- Vendor invoice and payment (e.g. **F-53**).
- View customer/vendor line items: **FBL5N / FBL1N**.

> Key idea: **the sub-ledger holds detail; the reconciliation account carries the
> summary into the G/L in real time**, keeping the books in sync.
`,
      challenges: [
        {
          id: "fi-arap-q1",
          type: "matching",
          prompt: "Match the concepts:",
          pairs: [
            { left: "AR", right: "What customers owe the company" },
            { left: "AP", right: "What the company owes vendors" },
            { left: "Reconciliation account", right: "Rolls the sub-ledger up to the G/L" },
            { left: "Business Partner", right: "Unified customer/vendor master data" },
          ],
          explanation:
            "AR = customer debt, AP = vendor debt, reconciliation account carries sub-ledger into G/L, BP unifies customer/vendor master data.",
        },
        {
          id: "fi-arap-q2",
          type: "mcq",
          prompt: "What does a reconciliation account do?",
          options: [
            "Automatically rolls customer/vendor detail up into the G/L",
            "Stores employee attendance",
            "Creates sales orders",
            "Manages warehouse stock",
          ],
          answer: 0,
          explanation:
            "When you post to a customer/vendor, the reconciliation account rolls the amount into the G/L in real time so the books reconcile.",
        },
        {
          id: "fi-arap-q3",
          type: "scenario",
          prompt: "A company is both your raw-material vendor and a customer for your finished goods. How do you model it in S/4HANA?",
          options: [
            "Create one Business Partner with both customer and vendor roles",
            "Create two completely unrelated master records",
            "Only create it as a customer, ignore the vendor side",
          ],
          answer: 0,
          explanation:
            "S/4HANA unifies with the Business Partner — one BP can carry both customer and vendor roles.",
        },
      ],
    },
    {
      id: "co-controlling",
      title: "4 · Cost centers, CO & period-end closing",
      body: `
## CO: the inward view of cost

FI reports outward; **CO (Controlling) looks inward at cost and profitability.**
Core objects:

- **Cost Center**: the "location / responsibility unit" where cost occurs — a
  department, a workshop.
- **Internal Order**: temporarily collects cost for an activity/project.
- **Profit Center**: profitability of a business slice.
- **Cost Element**: unified with G/L accounts in S/4HANA.

## How FI and CO interlock

When an expense posts, besides the FI G/L account it also carries a **CO object**
(e.g. a cost center) — so "how much was spent" and "in which department" are
recorded together. The Universal Journal keeps them naturally consistent.

## Period-end closing

Month-/year-end runs a series of closing steps, commonly:

- Depreciation posting (Asset Accounting)
- Foreign-currency valuation
- **GR/IR clearing** (the goods-receipt/invoice accrual account)
- Cost allocation/distribution (spreading cost-center costs onto objects)
- Closing the posting periods

> Remember: **FI = external statutory finance, CO = internal cost control**, sharing
> one Universal Journal in S/4HANA.
`,
      challenges: [
        {
          id: "co-q1",
          type: "mcq",
          prompt: "What is a cost center mainly used for?",
          options: [
            "Collecting the cost incurred by a department/responsibility unit",
            "Storing customer master data",
            "Producing the external balance sheet",
            "Managing material stock quantities",
          ],
          answer: 0,
          explanation:
            "A cost center is CO's responsibility unit where cost occurs — used to collect and control departmental cost.",
        },
        {
          id: "co-q2",
          type: "multi",
          prompt: "Which are typical period-end closing steps? (Select all)",
          options: [
            "Depreciation posting",
            "GR/IR clearing",
            "Foreign-currency valuation",
            "Creating a new sales order",
          ],
          answers: [0, 1, 2],
          explanation:
            "Depreciation, GR/IR clearing, and FX valuation are closing steps; creating a sales order is day-to-day business, not closing.",
        },
        {
          id: "co-q3",
          type: "scenario",
          prompt:
            "Finance wants to know “how much did Marketing spend this month.” This inward, per-department cost view is mainly handled by?",
          options: ["CO (cost centers)", "Only the FI general ledger can answer", "The SD sales module"],
          answer: 0,
          explanation:
            "Per-department cost is CO's strength — post the expense to Marketing's cost center and report on it.",
        },
      ],
    },
  ],
};
