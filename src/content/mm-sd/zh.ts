import type { Course } from "../../types";

// Track — MM/SD 业务流程 (Chinese). English twin in ./en.ts with identical ids.

export const mmSdZh: Course = {
  id: "mm-sd",
  title: "MM/SD 业务流程",
  subtitle: "打通“采购到付款(P2P)”与“订单到收款(O2C)”：物料主数据、库存移动、销售交货、定价。",
  level: "intermediate",
  lessons: [
    {
      id: "mm-material-master",
      title: "1 · 物料主数据与库存移动",
      body: `
## 物料主数据 Material Master

**物料主数据（Material Master）**是 MM/SD 的核心底档，一个物料在不同用途下有多个**视图（View）**：

| 视图 | 谁在用 |
| --- | --- |
| 基本数据 Basic | 通用 |
| 采购 Purchasing | MM 采购 |
| 销售 Sales | SD 销售 |
| MRP | 计划 |
| 会计/成本 Accounting | FI/CO |

同一个物料号，采购、销售、财务各看自己关心的视图——一份主数据，多方共用。

## 库存在哪儿

库存按**工厂（Plant）+ 库存地点（Storage Location）**管理，还分**库存类型**：非限制（可用）、质检、冻结。

## 移动类型 Movement Type

每一次库存增减都用一个**移动类型（Movement Type）**编码，常见：

- **101**：采购收货（GR for PO），库存增加
- **601**：销售发货（GI for delivery），库存减少
- **201**：发货到成本中心（领用）
- **311**：库存转储

> 记住：**物料主数据是底档、按视图分用途；每次库存变动都有一个移动类型。**
`,
      challenges: [
        {
          id: "mat-q1",
          type: "mcq",
          prompt: "物料主数据为什么要分“视图（View）”？",
          options: [
            "让采购、销售、财务各维护和查看自己关心的数据",
            "因为一个物料必须建很多次",
            "视图是用来做报表配色的",
            "为了占用更多存储",
          ],
          answer: 0,
          explanation:
            "一个物料一份主数据，用视图区分采购/销售/财务等不同用途，各维护各的部分。",
        },
        {
          id: "mat-q2",
          type: "matching",
          prompt: "把移动类型和它的含义连起来：",
          pairs: [
            { left: "101", right: "采购收货（库存增加）" },
            { left: "601", right: "销售发货（库存减少）" },
            { left: "201", right: "发货到成本中心" },
            { left: "311", right: "库存转储" },
          ],
          explanation:
            "101 采购收货、601 销售发货、201 领用到成本中心、311 转储——移动类型是库存变动的“动作码”。",
        },
        {
          id: "mat-q3",
          type: "mcq",
          prompt: "SAP 里库存主要按什么层级管理？",
          options: [
            "工厂 + 库存地点",
            "只按公司代码",
            "只按客户",
            "按员工",
          ],
          answer: 0,
          explanation:
            "库存在工厂（Plant）+ 库存地点（Storage Location）层级管理，并区分非限制/质检/冻结等类型。",
        },
      ],
    },
    {
      id: "mm-p2p",
      title: "2 · 采购到付款 P2P",
      body: `
## P2P 全流程

**P2P（Procure to Pay，采购到付款）**由 MM 主导：

1. **采购申请 PR**（ME51N）——提出需求。
2. **采购订单 PO**（ME21N）——正式向供应商下单：向谁买、买什么、多少、送到哪个工厂。
3. **收货 GR**（MIGO，移动类型 101）——货到入库，库存增加、生成物料凭证，并产生 **GR/IR** 暂估。
4. **发票校验 IR**（MIRO）——核对供应商发票。
5. **付款**（F-53，FI）。

## 三方匹配 Three-Way Match

付款前系统比对 **PO ↔ GR ↔ 发票** 三者的数量与金额，一致才放行付款——这是核心内控，防止多付、错付。

## GR/IR 暂估

收货时货已到但发票未必到，系统先用 **GR/IR 科目**暂估入账；发票校验后再冲销。期末会清理未清的 GR/IR。

> 记住链条：**PR → PO → GR → IR → 付款**，中间由**三方匹配**把关。
`,
      challenges: [
        {
          id: "p2p-q1",
          type: "matching",
          prompt: "把 P2P 步骤和事务码连起来：",
          pairs: [
            { left: "采购申请 PR", right: "ME51N" },
            { left: "采购订单 PO", right: "ME21N" },
            { left: "收货 GR", right: "MIGO" },
            { left: "发票校验 IR", right: "MIRO" },
          ],
          explanation:
            "PR=ME51N、PO=ME21N、GR=MIGO、IR=MIRO，这是 P2P 的事务码骨架。",
        },
        {
          id: "p2p-q2",
          type: "mcq",
          prompt: "“三方匹配”比对哪三样，一致才放行付款？",
          options: [
            "采购订单 PO、收货 GR、发票 IR",
            "销售订单、客户、库存",
            "工资、考勤、税表",
          ],
          answer: 0,
          explanation:
            "三方匹配 = PO ↔ GR ↔ IR，数量金额一致才付款，是采购付款的关键内控。",
        },
        {
          id: "p2p-q3",
          type: "scenario",
          prompt: "货到了、但供应商发票还没来。系统此时怎么处理这笔已收货的金额？",
          options: [
            "先用 GR/IR 暂估科目挂账，等发票校验后再冲销",
            "直接付款给供应商",
            "把库存退回",
          ],
          answer: 0,
          explanation:
            "收货先入 GR/IR 暂估，发票校验（IR）后冲销 GR/IR，期末清理未清项。",
        },
      ],
    },
    {
      id: "sd-o2c",
      title: "3 · 订单到收款 O2C",
      body: `
## O2C 全流程

**O2C（Order to Cash，订单到收款）**由 SD 主导：

1. （询价/报价）→ **销售订单 VA01**——客户下单。
2. **交货 VL01N**——创建交货单、拣货。
3. **发货过账**（移动类型 601）——库存减少，同时产生 **FI/CO** 影响。
4. **开票 VF01**——生成对客户的账单，过账到 **应收 AR**。
5. **收款**（FI）——客户付款、核销应收。

## 销售范围 Sales Area

SD 的组织结构叫**销售范围**：**销售组织 + 分销渠道 + 产品组**。销售订单必须落在某个销售范围里。

## 跨模块联动

一次**发货过账**同时：减少库存（MM）+ 记账（FI/CO）。一次**开票**：生成应收（FI）。这就是 ERP“打通”的体现。

> 记住链条：**销售订单 → 交货/发货 → 开票 → 收款**，一路牵动 MM 与 FI。
`,
      challenges: [
        {
          id: "o2c-q1",
          type: "matching",
          prompt: "把 O2C 步骤和事务码连起来：",
          pairs: [
            { left: "销售订单", right: "VA01" },
            { left: "交货", right: "VL01N" },
            { left: "开票", right: "VF01" },
          ],
          explanation: "VA01 建销售订单、VL01N 交货、VF01 开票，这是 O2C 的主干。",
        },
        {
          id: "o2c-q2",
          type: "mcq",
          prompt: "SD 的组织结构“销售范围（Sales Area）”由什么组成？",
          options: [
            "销售组织 + 分销渠道 + 产品组",
            "公司代码 + 工厂",
            "客户 + 供应商",
            "科目表 + 成本中心",
          ],
          answer: 0,
          explanation:
            "销售范围 = 销售组织 + 分销渠道 + 产品组；销售订单必须归属某个销售范围。",
        },
        {
          id: "o2c-q3",
          type: "screen",
          prompt:
            "动手：在仿 VA01 界面创建销售订单——销售组织 1000、售达方(客户) 1000、物料 R-1001、数量 10，然后保存。",
          screenTitle: "创建销售订单 · VA01",
          submitLabel: "保存",
          fields: [
            { id: "sorg", label: "销售组织 Sales Org", expected: "1000", hint: "本题用 1000" },
            { id: "soldto", label: "售达方 Sold-to", expected: "1000", placeholder: "客户编号" },
            { id: "material", label: "物料 Material", expected: "R-1001" },
            { id: "qty", label: "数量 Quantity", type: "number", expected: "10" },
          ],
          explanation:
            "创建销售订单就是把“哪个销售组织、卖给谁、卖什么、卖多少”填好。后续交货、开票都基于它。",
        },
      ],
    },
    {
      id: "sd-pricing",
      title: "4 · 定价与条件技术",
      body: `
## 价格从哪来：条件技术

SD 的价格不是随手填的，而是由**条件技术（Condition Technique）**自动算出来的。核心是一串**条件类型（Condition Type）**：

| 条件类型 | 含义 |
| --- | --- |
| **PR00** | 基本价格 |
| **K007** | 客户折扣 |
| **KF00** | 运费 |
| **MWST** | 税 |

## 定价过程 Pricing Procedure

**定价过程**把这些条件类型按顺序排好，一步步算出：毛价 → 减折扣 → 加运费 → 加税 → **净值**。销售订单每行都会跑一遍定价过程。

## 可用性检查 ATP

下单时系统做 **ATP（Available-to-Promise）可用性检查**：现有库存 + 在途 − 已承诺，判断能不能按期交货。

> 记住：**价格 = 条件技术按定价过程自动算**；能不能交货 = **ATP 可用性检查**。
`,
      challenges: [
        {
          id: "price-q1",
          type: "mcq",
          prompt: "SD 里销售订单的价格是怎么来的？",
          options: [
            "由条件技术按定价过程自动计算",
            "由用户每次手工拍脑袋填",
            "从采购订单直接复制",
            "永远等于成本价",
          ],
          answer: 0,
          explanation:
            "价格由条件技术（一串条件类型）按定价过程逐步算出，不是手工随填。",
        },
        {
          id: "price-q2",
          type: "matching",
          prompt: "把条件类型和含义连起来：",
          pairs: [
            { left: "PR00", right: "基本价格" },
            { left: "K007", right: "客户折扣" },
            { left: "KF00", right: "运费" },
            { left: "MWST", right: "税" },
          ],
          explanation:
            "PR00 基本价、K007 客户折扣、KF00 运费、MWST 税——它们在定价过程里按序叠加算出净值。",
        },
        {
          id: "price-q3",
          type: "scenario",
          prompt:
            "客户要 100 件、要求下周交货。系统怎么判断“能不能按期给”？",
          options: [
            "做 ATP 可用性检查（现有 + 在途 − 已承诺）",
            "看客户的信用等级颜色",
            "直接假设永远有货",
          ],
          answer: 0,
          explanation:
            "ATP 可用性检查综合现有库存、在途、已承诺量，判断能否按期交货。",
        },
      ],
    },
  ],
};
