import type { Course } from "../../types";

// Track — MM/SD Processes (English). Mirrors ./zh.ts with identical ids.

export const mmSdEn: Course = {
  id: "mm-sd",
  title: "MM/SD Processes",
  subtitle:
    "Connect Procure-to-Pay (P2P) and Order-to-Cash (O2C): material master, stock movements, delivery, pricing.",
  level: "intermediate",
  lessons: [
    {
      id: "mm-material-master",
      title: "1 · Material master & stock movements",
      body: `
## The material master

The **material master** is MM/SD's core reference record. One material has several
**views** for different uses:

| View | Who uses it |
| --- | --- |
| Basic | Everyone |
| Purchasing | MM procurement |
| Sales | SD sales |
| MRP | Planning |
| Accounting/Costing | FI/CO |

Same material number — purchasing, sales, and finance each see the view they care
about. One master record, shared across teams.

## Where stock lives

Stock is managed at **Plant + Storage Location**, and split by **stock type**:
unrestricted (usable), quality inspection, blocked.

## Movement types

Every stock change is coded by a **movement type**. Common ones:

- **101**: goods receipt for a PO — stock increases
- **601**: goods issue for a delivery (sales) — stock decreases
- **201**: goods issue to a cost center (consumption)
- **311**: stock transfer

> Remember: **the material master is the reference record, split by view; every
> stock change carries a movement type.**
`,
      challenges: [
        {
          id: "mat-q1",
          type: "mcq",
          prompt: "Why does the material master have “views”?",
          options: [
            "So purchasing, sales, and finance each maintain and see the data they care about",
            "Because a material must be created many times",
            "Views are just for report color themes",
            "To use more storage",
          ],
          answer: 0,
          explanation:
            "One material, one master record; views separate purchasing/sales/finance uses, each maintaining its own part.",
        },
        {
          id: "mat-q2",
          type: "matching",
          prompt: "Match each movement type to its meaning:",
          pairs: [
            { left: "101", right: "Goods receipt for PO (stock up)" },
            { left: "601", right: "Goods issue for delivery (stock down)" },
            { left: "201", right: "Goods issue to a cost center" },
            { left: "311", right: "Stock transfer" },
          ],
          explanation:
            "101 GR for PO, 601 GI for delivery, 201 issue to cost center, 311 transfer — movement types are the 'action codes' for stock.",
        },
        {
          id: "mat-q3",
          type: "mcq",
          prompt: "At what level is stock mainly managed in SAP?",
          options: ["Plant + Storage Location", "Company code only", "Customer only", "Employee"],
          answer: 0,
          explanation:
            "Stock is managed at Plant + Storage Location, split by type (unrestricted/quality/blocked).",
        },
      ],
    },
    {
      id: "mm-p2p",
      title: "2 · Procure to Pay (P2P)",
      body: `
## The full P2P flow

**P2P (Procure to Pay)** is MM-led:

1. **Purchase requisition (PR)** (ME51N) — raise the need.
2. **Purchase order (PO)** (ME21N) — formally order from the vendor: who, what, how
   much, which plant.
3. **Goods receipt (GR)** (MIGO, movement type 101) — goods arrive; stock rises, a
   material document is created, and a **GR/IR** accrual is posted.
4. **Invoice verification (IR)** (MIRO) — check the vendor invoice.
5. **Payment** (F-53, FI).

## Three-way match

Before payment, the system compares **PO ↔ GR ↔ Invoice** on quantity and amount;
only when they agree is payment released — a core control against over/wrong payment.

## GR/IR accrual

At goods receipt the goods have arrived but the invoice may not have, so the system
accrues to a **GR/IR account**; invoice verification later clears it. Open GR/IR is
cleaned up at period-end.

> Remember the chain: **PR → PO → GR → IR → payment**, gated by the **three-way match**.
`,
      challenges: [
        {
          id: "p2p-q1",
          type: "matching",
          prompt: "Match each P2P step to its T-code:",
          pairs: [
            { left: "Purchase requisition (PR)", right: "ME51N" },
            { left: "Purchase order (PO)", right: "ME21N" },
            { left: "Goods receipt (GR)", right: "MIGO" },
            { left: "Invoice verification (IR)", right: "MIRO" },
          ],
          explanation:
            "PR=ME51N, PO=ME21N, GR=MIGO, IR=MIRO — the T-code skeleton of P2P.",
        },
        {
          id: "p2p-q2",
          type: "mcq",
          prompt: "The three-way match compares which three, releasing payment only if they agree?",
          options: [
            "Purchase Order (PO), Goods Receipt (GR), Invoice (IR)",
            "Sales order, customer, inventory",
            "Payslip, attendance, tax form",
          ],
          answer: 0,
          explanation:
            "Three-way match = PO ↔ GR ↔ IR; payment only when quantity and amount agree — the key procurement control.",
        },
        {
          id: "p2p-q3",
          type: "scenario",
          prompt: "The goods have arrived but the vendor invoice hasn't. How does the system handle the received amount?",
          options: [
            "Accrue to the GR/IR account first, then clear it after invoice verification",
            "Pay the vendor immediately",
            "Return the stock",
          ],
          answer: 0,
          explanation:
            "Goods receipt accrues to GR/IR; invoice verification (IR) clears it, with open items cleaned up at period-end.",
        },
      ],
    },
    {
      id: "sd-o2c",
      title: "3 · Order to Cash (O2C)",
      body: `
## The full O2C flow

**O2C (Order to Cash)** is SD-led:

1. (Inquiry/quotation) → **Sales order VA01** — the customer orders.
2. **Delivery VL01N** — create the delivery, pick.
3. **Goods issue** (movement type 601) — stock decreases and an **FI/CO** effect is posted.
4. **Billing VF01** — create the customer invoice, posting to **AR**.
5. **Payment** (FI) — the customer pays; clear the receivable.

## Sales Area

SD's org structure is the **Sales Area**: **Sales Organization + Distribution
Channel + Division.** Every sales order belongs to a sales area.

## Cross-module effects

One **goods issue** both reduces stock (MM) and posts the books (FI/CO). One
**billing** creates a receivable (FI). That's ERP's "connectedness."

> Remember the chain: **sales order → delivery/goods issue → billing → payment**,
> touching MM and FI along the way.
`,
      challenges: [
        {
          id: "o2c-q1",
          type: "matching",
          prompt: "Match each O2C step to its T-code:",
          pairs: [
            { left: "Sales order", right: "VA01" },
            { left: "Delivery", right: "VL01N" },
            { left: "Billing", right: "VF01" },
          ],
          explanation: "VA01 create sales order, VL01N delivery, VF01 billing — the O2C backbone.",
        },
        {
          id: "o2c-q2",
          type: "mcq",
          prompt: "SD's “Sales Area” is made of what?",
          options: [
            "Sales Organization + Distribution Channel + Division",
            "Company Code + Plant",
            "Customer + Vendor",
            "Chart of Accounts + Cost Center",
          ],
          answer: 0,
          explanation:
            "Sales Area = Sales Organization + Distribution Channel + Division; every sales order belongs to one.",
        },
        {
          id: "o2c-q3",
          type: "screen",
          prompt:
            "Hands-on: on the mock VA01 screen, create a sales order — Sales Org 1000, Sold-to (customer) 1000, Material R-1001, Quantity 10 — then Save.",
          screenTitle: "Create Sales Order · VA01",
          submitLabel: "Save",
          fields: [
            { id: "sorg", label: "Sales Org", expected: "1000", hint: "Use 1000" },
            { id: "soldto", label: "Sold-to", expected: "1000", placeholder: "Customer number" },
            { id: "material", label: "Material", expected: "R-1001" },
            { id: "qty", label: "Quantity", type: "number", expected: "10" },
          ],
          explanation:
            "Creating a sales order is filling in which sales org, who you're selling to, what, and how much. Delivery and billing build on it.",
        },
      ],
    },
    {
      id: "sd-pricing",
      title: "4 · Pricing & the condition technique",
      body: `
## Where price comes from: the condition technique

SD prices aren't typed by hand — they're computed by the **condition technique**, a
chain of **condition types**:

| Condition type | Meaning |
| --- | --- |
| **PR00** | Base price |
| **K007** | Customer discount |
| **KF00** | Freight |
| **MWST** | Tax |

## Pricing procedure

The **pricing procedure** orders these condition types and computes step by step:
gross → less discount → plus freight → plus tax → **net value**. Every sales-order
line runs the pricing procedure.

## Availability check (ATP)

When ordering, the system runs an **ATP (Available-to-Promise)** check: on-hand +
inbound − committed, to decide whether it can deliver on time.

> Remember: **price = condition technique via the pricing procedure**; can we deliver
> = the **ATP availability check**.
`,
      challenges: [
        {
          id: "price-q1",
          type: "mcq",
          prompt: "How does a sales order get its price in SD?",
          options: [
            "Computed automatically by the condition technique via the pricing procedure",
            "Typed by hand each time",
            "Copied straight from the purchase order",
            "Always equal to cost",
          ],
          answer: 0,
          explanation:
            "Price is computed by the condition technique (a chain of condition types) through the pricing procedure — not hand-typed.",
        },
        {
          id: "price-q2",
          type: "matching",
          prompt: "Match each condition type to its meaning:",
          pairs: [
            { left: "PR00", right: "Base price" },
            { left: "K007", right: "Customer discount" },
            { left: "KF00", right: "Freight" },
            { left: "MWST", right: "Tax" },
          ],
          explanation:
            "PR00 base price, K007 discount, KF00 freight, MWST tax — stacked in order by the pricing procedure to get the net value.",
        },
        {
          id: "price-q3",
          type: "scenario",
          prompt: "A customer wants 100 units delivered next week. How does the system judge whether it can deliver on time?",
          options: [
            "Run an ATP availability check (on-hand + inbound − committed)",
            "Look at the customer's credit-rating color",
            "Just assume stock is always available",
          ],
          answer: 0,
          explanation:
            "The ATP check combines on-hand, inbound, and committed quantities to judge on-time delivery.",
        },
      ],
    },
  ],
};
