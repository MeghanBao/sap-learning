import type { Course } from "../../types";

// Track — 财务 FI/CO (Chinese). English twin in ./en.ts with identical ids.

export const fiCoZh: Course = {
  id: "fi-co",
  title: "财务 FI/CO",
  subtitle: "SAP 里最多人学、就业需求最大的方向：借贷记账、总账、应收应付、成本中心。",
  level: "intermediate",
  lessons: [
    {
      id: "fi-debit-credit",
      title: "1 · 借贷记账与会计凭证",
      body: `
## 复式记账：每一笔都借贷相等

SAP 财务的地基是**复式记账**：任何一笔业务都同时记在两个（或多个）科目上，**借方合计 = 贷方合计**。SAP 里每张**会计凭证（Accounting Document）**都有：

- **凭证抬头**：凭证日期、过账日期、公司代码、凭证类型。
- **多条行项目**：每行有 科目、借/贷标识、金额。

## 借贷方向口诀

| 科目类别 | 借方（Debit）| 贷方（Credit）|
| --- | --- | --- |
| 资产 Asset | 增加 ↑ | 减少 ↓ |
| 费用 Expense | 增加 ↑ | 减少 ↓ |
| 负债 Liability | 减少 ↓ | 增加 ↑ |
| 权益 Equity | 减少 ↓ | 增加 ↑ |
| 收入 Revenue | 减少 ↓ | 增加 ↑ |

## 例子：现金销售 1000

客户当场付款、钱进银行：

- **借：银行存款 1000**（资产增加）
- **贷：销售收入 1000**（收入增加）

借贷各 1000，相等——凭证才能过账。常用事务码 **FB50**（录入总账凭证）。

> 记住：**资产/费用借方增、负债/权益/收入贷方增**。这条口诀能解释后面绝大多数分录。
`,
      challenges: [
        {
          id: "fi-dc-q1",
          type: "mcq",
          prompt: "复式记账下，一张会计凭证必须满足什么？",
          options: [
            "借方合计等于贷方合计",
            "只能有一条行项目",
            "金额必须是整数",
            "借方永远大于贷方",
          ],
          answer: 0,
          explanation:
            "复式记账的铁律：借方合计 = 贷方合计，否则凭证无法过账。",
        },
        {
          id: "fi-dc-q2",
          type: "matching",
          prompt: "把科目类别和“在借方时的变化”连起来：",
          pairs: [
            { left: "资产 Asset", right: "借方增加" },
            { left: "收入 Revenue", right: "借方减少" },
            { left: "费用 Expense", right: "借方增加" },
            { left: "负债 Liability", right: "借方减少" },
          ],
          explanation:
            "资产/费用在借方增加；收入/负债/权益在借方减少（即它们在贷方增加）。",
        },
        {
          id: "fi-dc-q3",
          type: "scenario",
          prompt:
            "客户当场付现 1000，钱进了公司银行账户。这笔分录是？",
          options: [
            "借 银行存款 1000 / 贷 销售收入 1000",
            "借 销售收入 1000 / 贷 银行存款 1000",
            "借 应收账款 1000 / 贷 银行存款 1000",
          ],
          answer: 0,
          explanation:
            "银行存款（资产）增加记借方，销售收入（收入）增加记贷方，借贷各 1000。",
        },
        {
          id: "fi-dc-q4",
          type: "screen",
          prompt:
            "动手：在下面这张仿 FB50 界面上录入上面那笔“现金销售”凭证——公司代码 1000、借方科目 113100（银行）、贷方科目 800000（收入）、金额 1000，然后过账。（科目号为示例）",
          screenTitle: "录入总账凭证 · FB50",
          submitLabel: "过账",
          fields: [
            { id: "cc", label: "公司代码 Company Code", expected: "1000", hint: "本题用 1000" },
            { id: "debit", label: "借方科目 Debit acct", expected: "113100", placeholder: "银行" },
            { id: "credit", label: "贷方科目 Credit acct", expected: "800000", placeholder: "收入" },
            { id: "amount", label: "金额 Amount", type: "number", expected: "1000" },
          ],
          explanation:
            "FB50 就是把“借哪个科目、贷哪个科目、多少钱”填进一张凭证。真实系统科目号来自科目表，且借贷必须平。",
        },
      ],
    },
    {
      id: "fi-gl",
      title: "2 · 总账 G/L 与科目表",
      body: `
## 总账 General Ledger

**总账（G/L）**是所有财务数据的汇总账本。每一笔过账最终都落在某个**总账科目（G/L Account）**上。

## 科目表 Chart of Accounts

**科目表（Chart of Accounts, COA）**是所有总账科目的“清单/字典”，定义了每个科目号、名称、类型。科目表**分配给公司代码**——多个公司代码可以共用同一张科目表，便于集团统一核算。

- 科目分两大类：**资产负债表科目**（Balance Sheet）和**损益类科目**（P&L）。

## S/4HANA 的大变化：Universal Journal

在 S/4HANA 里，FI 和 CO 的行项目被合并进**同一张表 Universal Journal（ACDOCA）**，不再各记各的。好处：财务与管理会计数据实时一致、可即时穿透分析，这也是 HANA 内存库带来的能力。

> 关系链：**一笔过账 → 记到某个总账科目 → 科目定义在科目表里 → 科目表分配给公司代码。**
`,
      challenges: [
        {
          id: "fi-gl-q1",
          type: "mcq",
          prompt: "“科目表（Chart of Accounts）”是什么？",
          options: [
            "所有总账科目的清单/字典",
            "一张具体的会计凭证",
            "公司的银行对账单",
            "员工工资表",
          ],
          answer: 0,
          explanation:
            "科目表是全部总账科目的定义清单，分配给公司代码后才能使用。",
        },
        {
          id: "fi-gl-q2",
          type: "multi",
          prompt: "关于 S/4HANA 的 Universal Journal（ACDOCA），哪些说法正确？（多选）",
          options: [
            "把 FI 和 CO 的行项目合并到同一张表",
            "让财务与管理会计数据实时一致",
            "它其实是一个 Excel 文件",
            "依赖 HANA 内存数据库的能力",
          ],
          answers: [0, 1, 3],
          explanation:
            "Universal Journal 合并 FI+CO 行项目于 ACDOCA，实时一致、可穿透，是 HANA 带来的能力；它是数据库表，不是 Excel。",
        },
        {
          id: "fi-gl-q3",
          type: "scenario",
          prompt:
            "集团下有 3 个公司代码，希望用统一的科目口径做合并报表。合理做法是？",
          options: [
            "给它们分配同一张科目表",
            "每个公司代码各用完全不同的科目表且互不关联",
            "干脆不用科目表",
          ],
          answer: 0,
          explanation:
            "多个公司代码共用同一张（运营）科目表，就能用统一口径核算、便于合并。",
        },
      ],
    },
    {
      id: "fi-ar-ap",
      title: "3 · 应收 AR 与应付 AP",
      body: `
## 子分类账 Sub-ledger

除了总账，FI 还有两个最常用的**子分类账**：

- **应收账款 AR（Accounts Receivable）**：记录**客户**欠公司的钱。
- **应付账款 AP（Accounts Payable）**：记录公司欠**供应商**的钱。

## 统驭科目 Reconciliation Account

客户/供应商明细记在子分类账里，同时通过**统驭科目（Reconciliation Account）**自动同步汇总到总账——你不用手工再记一遍总账，二者永远对得上。

## 业务伙伴 Business Partner

在 S/4HANA 里，**客户和供应商统一为业务伙伴（Business Partner）**，一个 BP 可同时是客户和供应商（既向你买、又卖给你）。

## 常见动作

- 客户开票、收款（如 **F-28** 收款）。
- 供应商发票、付款（如 **F-53** 付款）。
- 查客户/供应商行项目：**FBL5N / FBL1N**。

> 要点：**子分类账记明细，统驭科目把汇总实时带到总账**，账账相符。
`,
      challenges: [
        {
          id: "fi-arap-q1",
          type: "matching",
          prompt: "把概念连起来：",
          pairs: [
            { left: "AR 应收", right: "客户欠公司的钱" },
            { left: "AP 应付", right: "公司欠供应商的钱" },
            { left: "统驭科目", right: "子分类账实时汇总到总账" },
            { left: "Business Partner", right: "统一的客户/供应商主数据" },
          ],
          explanation:
            "AR=客户欠款，AP=欠供应商款，统驭科目把子账带进总账，BP 统一客商主数据。",
        },
        {
          id: "fi-arap-q2",
          type: "mcq",
          prompt: "统驭科目（Reconciliation Account）的作用是？",
          options: [
            "让客户/供应商明细自动汇总同步到总账",
            "存放员工考勤",
            "生成销售订单",
            "管理仓库库存",
          ],
          answer: 0,
          explanation:
            "过账到客户/供应商时，统驭科目把金额实时汇总进总账，保证账账相符。",
        },
        {
          id: "fi-arap-q3",
          type: "scenario",
          prompt: "一家公司既是你的原料供应商，又买你的成品。在 S/4HANA 里怎么建它？",
          options: [
            "建一个业务伙伴（BP），同时赋予客户和供应商角色",
            "必须建两条完全无关的主数据",
            "只能建成客户，忽略供应商身份",
          ],
          answer: 0,
          explanation:
            "S/4HANA 用 Business Partner 统一，一个 BP 可同时挂客户与供应商角色。",
        },
      ],
    },
    {
      id: "co-controlling",
      title: "4 · 成本中心、CO 与期末结账",
      body: `
## CO 管理会计：对内看成本

FI 对外出报表，**CO（Controlling）对内看成本与盈利**。核心对象：

- **成本中心（Cost Center）**：成本发生的“地点/责任单位”，如某部门、某车间。
- **内部订单（Internal Order）**：临时归集某项活动/项目的成本。
- **利润中心（Profit Center）**：看某块业务的盈利。
- **成本要素（Cost Element）**：在 S/4HANA 里已与总账科目统一。

## FI 与 CO 如何联动

一笔费用过账时，除了记 FI 总账科目，还会带上 **CO 对象**（如成本中心），于是“花了多少钱、花在哪个部门”同时被记录。Universal Journal 让二者天然一致。

## 期末结账 Period-End Closing

月末/年末要做一系列结账动作，常见有：

- 折旧计提（资产会计）
- 外币评估
- **GR/IR 清账**（收货与发票的暂估科目）
- 成本分摊/分配（把成本中心费用分到对象上）
- 关闭过账期间

> 记住：**FI = 对外法定财务，CO = 对内成本管控**，在 S/4HANA 里共用一张 Universal Journal。
`,
      challenges: [
        {
          id: "co-q1",
          type: "mcq",
          prompt: "“成本中心（Cost Center）”主要用来？",
          options: [
            "归集某个部门/责任单位发生的成本",
            "存放客户主数据",
            "生成对外资产负债表",
            "管理物料库存数量",
          ],
          answer: 0,
          explanation:
            "成本中心是 CO 里“成本发生的责任单位”，用于归集与管控部门成本。",
        },
        {
          id: "co-q2",
          type: "multi",
          prompt: "以下哪些属于典型的“期末结账”动作？（多选）",
          options: [
            "折旧计提",
            "GR/IR 清账",
            "外币评估",
            "创建一张新的销售订单",
          ],
          answers: [0, 1, 2],
          explanation:
            "折旧、GR/IR 清账、外币评估都是期末结账动作；创建销售订单是日常业务，不属结账。",
        },
        {
          id: "co-q3",
          type: "scenario",
          prompt:
            "财务想知道“市场部这个月花了多少钱”。这类“对内看部门成本”的需求主要落在？",
          options: ["CO（成本中心）", "只有 FI 总账能回答", "SD 销售模块"],
          answer: 0,
          explanation:
            "按部门/责任单位看成本是 CO 的强项——把费用记到市场部成本中心即可统计。",
        },
      ],
    },
  ],
};
