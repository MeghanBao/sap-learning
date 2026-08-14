import type { Course } from "../../types";

// Track 1 — "SAP 入门总览". Beginner-friendly, concept + scenario driven so it
// works entirely client-side. Content is authored in Chinese first; the data
// shape is i18n-ready (a future locale can carry translated title/body/options).

export const sapIntro: Course = {
  id: "sap-intro",
  title: "SAP 入门总览",
  subtitle: "零基础也能懂：SAP 是什么、模块怎么分、怎么导航、数据怎么流。",
  level: "beginner",
  lessons: [
    {
      id: "what-is-sap",
      title: "1 · SAP 到底是什么",
      body: `
## SAP 是一套 ERP 软件

**SAP** 是全球最大的企业管理软件公司之一，它最有名的产品是 **ERP**（Enterprise Resource Planning，企业资源计划）系统。

一句话理解 ERP：**把一家公司的财务、采购、销售、生产、库存、人事……全部放进同一套系统、共用同一份数据**。销售开了一张订单，仓库、财务、生产在同一秒就都能看到——不用来回发 Excel。

## ECC 与 S/4HANA

- **SAP ECC**：上一代主力产品（很多公司还在用）。
- **SAP S/4HANA**：新一代产品，跑在 SAP 自研的 **HANA 内存数据库**上，速度快、界面用 **Fiori**（网页化），是现在的主推方向。

## 部署方式

S/4HANA 可以装在企业自己机房里（**On-Premise 本地部署**），也可以用云端版本（**Cloud**，如 RISE / GROW with SAP）。

> 记住这条主线：**SAP（公司） → ERP（产品类别） → S/4HANA（当前产品） → 跑在 HANA 上、用 Fiori 界面。**
`,
      challenges: [
        {
          id: "what-is-sap-q1",
          type: "mcq",
          prompt: "ERP 系统最核心的价值是什么？",
          options: [
            "让每个部门各用一套独立软件",
            "把各部门的业务放进同一系统、共用同一份数据",
            "专门用来做数据可视化图表",
            "替代公司的电子邮件系统",
          ],
          answer: 1,
          explanation:
            "ERP 的关键就是“打通”：一处录入、处处可见，避免各部门数据孤岛与重复录入。",
        },
        {
          id: "what-is-sap-q2",
          type: "mcq",
          prompt: "S/4HANA 相比上一代 ECC，最标志性的底层变化是？",
          options: [
            "改用 HANA 内存数据库",
            "只能在本地部署",
            "不再支持财务模块",
            "用 Excel 作为数据库",
          ],
          answer: 0,
          explanation:
            "S/4HANA 强制跑在 HANA 内存数据库上，这也是它性能与实时分析能力的基础；界面则转向 Fiori。",
        },
        {
          id: "what-is-sap-q3",
          type: "scenario",
          prompt:
            "一位同事说：“我们要上 SAP，选了 RISE with SAP 的云端方案。” 这句话说明他们大概率在用哪代产品？",
          options: ["ECC（上一代）", "S/4HANA（新一代）", "两者都不是"],
          answer: 1,
          explanation:
            "RISE with SAP 是围绕 S/4HANA Cloud 的商业打包方案，指向的是新一代产品。",
        },
      ],
    },
    {
      id: "module-map",
      title: "2 · 模块地图：SAP 是怎么分块的",
      body: `
## 业务模块（Functional）

SAP 按业务领域切成很多**模块**，常见的有：

| 模块 | 全称 | 管什么 |
| --- | --- | --- |
| **FI** | Financial Accounting | 对外财务：总账、应收、应付、报表 |
| **CO** | Controlling | 对内管理会计：成本中心、内部核算 |
| **MM** | Materials Management | 采购与库存 |
| **SD** | Sales & Distribution | 销售与发货 |
| **PP** | Production Planning | 生产计划 |
| **QM** | Quality Management | 质量管理 |
| **PM** | Plant Maintenance | 设备维护 |
| **HCM** | Human Capital Mgmt | 人力资源（云端多用 SuccessFactors） |

## 技术层（Technical）

- **ABAP**：SAP 自己的编程语言，用来开发/定制。
- **BASIS**：系统管理与运维（安装、权限、性能）。
- **BTP**：SAP Business Technology Platform，云上做扩展开发、集成、分析的平台。
- **Fiori**：现代化的网页 UX 层。

> 面试常识：**FI 是“对外”的法定财务，CO 是“对内”的管理核算**，两者紧密联动，常合称 **FICO**。
`,
      challenges: [
        {
          id: "module-map-q1",
          type: "matching",
          prompt: "把模块和它负责的领域连起来：",
          pairs: [
            { left: "MM", right: "采购与库存" },
            { left: "SD", right: "销售与发货" },
            { left: "FI", right: "对外财务与报表" },
            { left: "PP", right: "生产计划" },
          ],
          explanation:
            "MM=采购/库存，SD=销售/发货，FI=对外财务，PP=生产计划。这几块是最常被提到的核心模块。",
        },
        {
          id: "module-map-q2",
          type: "mcq",
          prompt: "FI 和 CO 的区别，下面哪个说法最准确？",
          options: [
            "FI 管对外法定财务，CO 管对内管理核算",
            "FI 管销售，CO 管采购",
            "FI 是编程语言，CO 是数据库",
            "两者完全一样，只是叫法不同",
          ],
          answer: 0,
          explanation:
            "FI 面向外部（法定报表、总账），CO 面向内部（成本、盈利分析）。它们共享数据、常合称 FICO。",
        },
        {
          id: "module-map-q3",
          type: "multi",
          prompt: "以下哪些属于“技术层”而不是业务模块？（多选）",
          options: ["ABAP", "SD", "BASIS", "BTP", "MM"],
          answers: [0, 2, 3],
          explanation:
            "ABAP（开发语言）、BASIS（运维）、BTP（云平台）属于技术层；SD 与 MM 是业务模块。",
        },
      ],
    },
    {
      id: "navigation",
      title: "3 · 怎么导航：T-code 与 Fiori",
      body: `
## 两种界面

- **SAP GUI**：传统桌面客户端，进去后看到 **SAP Easy Access** 菜单树。
- **Fiori Launchpad**：新一代网页界面，由一个个**磁贴（tile）**组成，S/4HANA 主推。

## 事务码（Transaction Code / T-code）

老手很少一层层点菜单，而是直接在命令框敲 **T-code** 一步跳到功能。几个高频例子：

| T-code | 功能 |
| --- | --- |
| **FB50** | 录入总账凭证（FI） |
| **ME21N** | 创建采购订单（MM） |
| **VA01** | 创建销售订单（SD） |
| **MM01** | 创建物料主数据 |
| **MIGO** | 收货 / 货物移动 |
| **SE80** | ABAP 开发工作台 |

小技巧：在命令框输入 **/n** 前缀会关闭当前事务再跳转，**/o** 会在新窗口打开。

> 理解要点：**T-code 是“快捷入口”**，一个功能对应一个短代码；Fiori 磁贴则是它的网页化、图形化替代。
`,
      challenges: [
        {
          id: "navigation-q1",
          type: "mcq",
          prompt: "在 SAP GUI 里，“T-code（事务码）”的作用是？",
          options: [
            "给用户分配权限",
            "作为快捷入口，直接跳到某个功能",
            "备份数据库",
            "翻译界面语言",
          ],
          answer: 1,
          explanation:
            "T-code 就像功能的快捷方式，敲进命令框即可直达，省去逐层点菜单。",
        },
        {
          id: "navigation-q2",
          type: "matching",
          prompt: "把常见 T-code 和它的功能连起来：",
          pairs: [
            { left: "ME21N", right: "创建采购订单" },
            { left: "VA01", right: "创建销售订单" },
            { left: "FB50", right: "录入总账凭证" },
            { left: "MM01", right: "创建物料主数据" },
          ],
          explanation:
            "ME21N=采购订单(MM)，VA01=销售订单(SD)，FB50=总账凭证(FI)，MM01=物料主数据。",
        },
        {
          id: "navigation-q3",
          type: "scenario",
          prompt:
            "你要创建一张销售订单，但当前正停在别的事务里。最顺手的做法是？",
          options: [
            "在命令框输入 /nVA01 直接跳过去",
            "关掉整个 SAP 重登",
            "打电话让管理员帮你切换",
          ],
          answer: 0,
          explanation:
            "/n 前缀会结束当前事务并跳转，/nVA01 就能直接开始创建销售订单，无需重登。",
        },
      ],
    },
    {
      id: "master-vs-transactional",
      title: "4 · 主数据 vs 事务数据",
      body: `
## 两类数据

- **主数据（Master Data）**：相对稳定、可反复使用的“底档”。例如**物料主数据、客户/供应商、总账科目、成本中心**。建一次，之后很多单据都引用它。
- **事务数据（Transactional Data）**：具体某次业务事件产生的记录，通常带日期与凭证号。例如**销售订单、采购订单、发票、会计凭证、物料凭证**。

> 类比：主数据像“通讯录里的联系人”，事务数据像“某天给这个人打的一通电话记录”。

## 组织架构（Org Structure）

SAP 用一层层组织单元来映射公司结构，常见自上而下：

- **Client（集团/客户端）**：最高层，一套主数据与配置的边界。
- **Company Code（公司代码）**：一个独立法人实体，是 **FI** 出财报的层级。
- **Plant（工厂/地点）**：物流与生产的地点，属 **MM/PP**。
- 销售侧还有 **Sales Organization（销售组织）** 等。

## S/4HANA 的一个变化：Business Partner

在 S/4HANA 里，**客户和供应商被统一到“业务伙伴 Business Partner (BP)”**这一主数据概念下，一个 BP 可以同时扮演客户、供应商等多个角色。

> 要点：**先有主数据，才能开事务单据**——没有物料主数据，就没法在采购订单里选这个物料。
`,
      challenges: [
        {
          id: "master-q1",
          type: "multi",
          prompt: "以下哪些属于“主数据”？（多选）",
          options: [
            "物料主数据",
            "某张具体的销售订单",
            "客户主数据 / 业务伙伴",
            "总账科目",
            "一张采购发票",
          ],
          answers: [0, 2, 3],
          explanation:
            "物料、客户/BP、总账科目是可反复引用的主数据；具体的销售订单和采购发票是事务数据。",
        },
        {
          id: "master-q2",
          type: "mcq",
          prompt: "哪个组织单元是 FI 出具法定财务报表的层级？",
          options: ["Plant（工厂）", "Company Code（公司代码）", "Client（集团）"],
          answer: 1,
          explanation:
            "Company Code 代表一个独立法人实体，是财务报表（资产负债表/利润表）的编制层级。",
        },
        {
          id: "master-q3",
          type: "scenario",
          prompt:
            "采购员想在采购订单里选“螺丝钉A”这个物料，却发现选不到。最可能的原因是？",
          options: [
            "还没有为“螺丝钉A”建立物料主数据",
            "SAP 服务器坏了",
            "采购订单不能选物料",
          ],
          answer: 0,
          explanation:
            "事务单据引用主数据。没有先建立物料主数据（MM01），采购订单里自然选不到这个物料。",
        },
      ],
    },
    {
      id: "end-to-end",
      title: "5 · 串起来：一个端到端业务流程",
      body: `
## 为什么要“端到端”看

SAP 的威力在于**跨模块打通**。下面用两条最经典的主流程感受一下。

## O2C：Order to Cash（订单到收款，SD 主导）

1. **创建销售订单**（VA01，SD）——客户下单。
2. **发货 / 交货**（VL01N）——仓库发出，**过账货物移动**会自动减少库存（MM）并生成会计影响（FI/CO）。
3. **开票**（VF01）——生成对客户的账单。
4. **收款**（FI）——客户付款、核销应收。

## P2P：Procure to Pay（采购到付款，MM 主导）

1. **采购申请 PR**（ME51N）——提出需求。
2. **采购订单 PO**（ME21N）——正式向供应商下单。
3. **收货 GR**（MIGO）——货到入库，库存增加、生成物料凭证。
4. **发票校验 IR**（MIRO）——核对供应商发票。
5. **付款**（F-53，FI）。

## 三方匹配（Three-Way Match）

付款前，系统会比对 **采购订单 PO ↔ 收货 GR ↔ 发票 IR** 三者是否一致（数量、金额）。三方对得上才放行付款，这是重要的内控。

> 一个动作牵动多个模块：**SD 的一次发货，同时动了库存（MM）和账（FI/CO）**——这就是 ERP 的“打通”。
`,
      challenges: [
        {
          id: "e2e-q1",
          type: "mcq",
          prompt: "“O2C（Order to Cash）”主要由哪个模块主导？",
          options: ["MM", "SD", "PP"],
          answer: 1,
          explanation:
            "O2C 是从销售订单到收款的流程，由 SD（销售与分销）主导，并联动 MM 库存与 FI 财务。",
        },
        {
          id: "e2e-q2",
          type: "mcq",
          prompt: "付款前的“三方匹配”比对的是哪三样？",
          options: [
            "采购订单 PO、收货 GR、发票 IR",
            "销售订单、客户、库存",
            "工资单、考勤、税表",
          ],
          answer: 0,
          explanation:
            "三方匹配 = PO ↔ GR ↔ IR，数量金额对得上才放行付款，是采购付款环节的关键内控。",
        },
        {
          id: "e2e-q3",
          type: "scenario",
          prompt:
            "仓库在 SAP 里对一张交货单做了“发货过账”。除了 SD，这一步通常还会直接影响哪些方面？",
          options: [
            "只影响 SD，别的模块无关",
            "同时减少库存（MM）并产生财务影响（FI/CO）",
            "只影响人力资源（HCM）",
          ],
          answer: 1,
          explanation:
            "发货过账会减少库存（MM）并触发相应的会计分录（FI/CO）——一个动作跨多个模块，正是 ERP 打通的体现。",
        },
        {
          id: "e2e-q4",
          type: "matching",
          prompt: "把 P2P 流程步骤和它的单据/事务连起来：",
          pairs: [
            { left: "采购申请", right: "PR（ME51N）" },
            { left: "采购订单", right: "PO（ME21N）" },
            { left: "收货", right: "GR（MIGO）" },
            { left: "发票校验", right: "IR（MIRO）" },
          ],
          explanation:
            "P2P：PR → PO → GR → IR → 付款。记住这条链，采购流程就有了骨架。",
        },
      ],
    },
  ],
};
