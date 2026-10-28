---
name: prop.show
description: 前端实践的视频与技术速报 — 黄黑板报式的编辑排版
colors:
  signal-yellow: "#F0DB4F"
  ink-gold: "#806400"
  press-black: "#000000"
  paper-white: "#FFFFFF"
  press-ink-900: "oklch(20.5% 0 none)"
  press-ink-800: "oklch(26.9% 0 none)"
  press-ink-700: "oklch(37.1% 0 none)"
  press-ink-500: "oklch(55.6% 0 none)"
  press-ink-300: "oklch(87% 0 none)"
  press-ink-200: "oklch(92.2% 0 none)"
  proof-grey-50: "oklch(98.5% 0 none)"
typography:
  display:
    fontFamily: "system-ui, -apple-system, 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: "3.75rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  page-title:
    fontFamily: "system-ui, -apple-system, 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  detail-title:
    fontFamily: "system-ui, -apple-system, 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  section:
    fontFamily: "system-ui, -apple-system, 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  item:
    fontFamily: "system-ui, -apple-system, 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: "1.375rem"
    fontWeight: 700
    lineHeight: 1.4
  body:
    fontFamily: "system-ui, -apple-system, 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  prose:
    fontFamily: "system-ui, -apple-system, 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 2
  label:
    fontFamily: "system-ui, -apple-system, 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.85
  tabular:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.85
rounded:
  none: "0px"
  sm: "3.2px"
  md: "4.8px"
spacing:
  hairline: "4px"
  tight: "8px"
  control: "12px"
  group: "24px"
  block: "40px"
  section: "64px"
components:
  button-primary:
    backgroundColor: "{colors.signal-yellow}"
    textColor: "{colors.press-black}"
    rounded: "{rounded.sm}"
    height: "36px"
    padding: "0 16px"
  button-primary-lg:
    backgroundColor: "{colors.signal-yellow}"
    textColor: "{colors.press-black}"
    rounded: "{rounded.sm}"
    height: "40px"
    padding: "0 24px"
  button-ink:
    backgroundColor: "{colors.press-black}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.none}"
    height: "48px"
    padding: "0 20px"
  button-outline:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.press-ink-900}"
    rounded: "{rounded.sm}"
    height: "36px"
    padding: "0 16px"
  chip-filter:
    backgroundColor: "transparent"
    textColor: "{colors.press-ink-500}"
    rounded: "{rounded.none}"
    height: "44px"
    padding: "0 12px"
  chip-filter-selected:
    backgroundColor: "{colors.signal-yellow}"
    textColor: "{colors.press-black}"
    rounded: "{rounded.none}"
    height: "44px"
    padding: "0 12px"
  tag:
    backgroundColor: "{colors.proof-grey-50}"
    textColor: "{colors.press-ink-700}"
    rounded: "{rounded.none}"
    height: "24px"
    padding: "2px 8px"
---

# Design System: prop.show

## Overview

**Creative North Star: "The Yellow Broadsheet"**

prop.show 用一张报纸的方式编排前端内容：纸面、油墨、栏宽、发丝线。信号黄是唯一有饱和度的颜色，它出现的地方就是版面在说话的地方——一条最新节目、一个被选中的筛选项。其余部分全是纸白、油墨黑和中性灰阶，靠字号、字重和栏宽建立层级，而不是靠颜色、圆角或投影。它读起来像一个在职开发者整理的工作台，而不是一个营销页面。

排版按访问者的任务分配空间：列表行只放标题、元信息、摘要和真实平台入口；详情页收窄到 48rem 的阅读栏；筛选块压在标题下方，列表则拉开距离。装饰性的纹理、网格底纹、发光边框和渐变文字都不属于这个系统，颜色的稀有本身就是它的分量。

**Key Characteristics:**
- 直角优先：默认 0 圆角，只有头像（3.2px）和 shadcn 自带的按钮/骨架（4.8px）例外
- 1px 发丝线承担全部分隔与描边，没有阴影、没有玻璃、没有光晕
- 信号黄在任一屏只做一块实心面，同一屏内不复用第二处饱和色
- 明暗两套共用一套语义令牌，深色下靠色值分层（`press-ink-700` 描边对 `press-ink-900` 底）
- 中文承担全部导航与操作，不用 9–10px 大写字母眼眉标签

## Colors

一个饱和色（信号黄）+ 一套中性灰阶。所有颜色以语义令牌出现，组件内不自建调色板。

### Primary
- **信号黄 Signal Yellow** (#F0DB4F)：品牌实心面与「被选中」状态。用在家里精选节目面板的底色、选中筛选项的填充、OG 图片的品牌区。填充上一律配黑字。
- **油墨金 Ink Gold** (#806400)：信号黄在浅色背景上的可读替代，用于正文里的强调链接文字和浅色模式的焦点环。品牌填充对白底只有 1.4:1，永远不拿来当小字或描边。

### Neutral
- **油墨黑 Press Black** (#000000)：印刷本体。标题高亮色、黑底按钮、黄面板上的文字。
- **纸白 Paper White** (#FFFFFF)：浅色模式的画布。
- **版心底 Press Ink 900** (oklch(20.5% 0 none))：深色模式的画布。
- **版面灰 Press Ink 700** (oklch(37.1% 0 none))：深色模式的描边与浮起面——它和版心底的对比是 1.7:1，是深色下唯一看得见的分层。
- **次级墨 Press Ink 500** (oklch(55.6% 0 none))：浅色模式的正文次要色（元信息、摘要、说明）。
- **校样灰 Proof Grey 50** (oklch(98.5% 0 none))：浅色模式的中性底，标签和代码块的底色来源（`bg-elevated/60`）。

### Named Rules
**The Ink-Gold Rule.** 信号黄只做填充，不做小字。浅色模式下强调文字与焦点环用油墨金 (#806400)，深色模式下才允许用信号黄本身。

**The One Block Rule.** 一屏只给一块饱和色。精选面板是黄色，就不能再有第二个黄色区块；选中筛选项已是实心黄，别的控件就退回描边。

**The Visible Hairline Rule.** 深色模式下描边必须是 `press-ink-700`。`press-ink-800` 对 `press-ink-900` 只有 1.18:1，等于没有线。

## Typography

**Display Font:** 系统无衬线（system-ui → Noto Sans SC / PingFang SC / Microsoft YaHei）
**Body Font:** 同一套系统无衬线
**Label/Mono Font:** 等宽仅用于集数编号与代码（`ui-monospace`），其余数字用 `tabular-nums`

**Character:** 一套字体走完全站：粗体承担层级，常规字重承担阅读。层级来自字号跳档（60 / 48 / 30 / 22 / 16 / 13），不来自第二个字族或大写变形。

### Hierarchy
- **Display** (700, 60px/1.15, -0.025em)：首页主张句，只出现一次。
- **Page Title** (700, 32px → 40px → 48px, 1.2)：每个页面的 h1，与站标同一条左侧导轨。
- **Detail Title** (700, 28px → 32px → 40px, 1.3)：视频/速报/作品详情的 h1，比页面标题降一档，因为上方还有返回链接与元信息。
- **Section** (700, 24px → 30px, 1.3)：区块标题。省略它而不是写一个与 h1 重复的标题。
- **Item** (700, 22px/1.4)：列表行的标题，永远是该行最先被读到的元素。
- **Body** (400, 16px/28px)：说明、摘要；详情页正文升到 18px/36px，阅读栏宽 48rem。
- **Label** (400, 13px/24px, muted)：日期、期数、分类、平台名；数字加 `tabular-nums`。

### Named Rules
**The No-Eyebrow Rule.** 标题上方不加小字标签。分类、类型这类元信息放在标题下方，作为 13px 的次要行——工作流行与视频行用同一种语序：标题 → 元信息 → 摘要 → 标签/平台。

**The Quiet Count Rule.** 列表的计数（`共 27 期视频`）是 14px muted 的说明行，贴在自己的规则线上方 12px，不升级为标题。

## Layout

**Spatial model:** 全站一个居中容器 `max-w-6xl`（72rem），左右内边距 16 / 24 / 32px，桌面内容栏 1088px。详情页收窄到 `max-w-3xl`（48rem）的阅读栏。归档页与关于页不另设宽度——没有第二个容器宽度。

**Rhythm:** 展示型区块之间 64px；归档页的标题与筛选块属于同一组（32px），列表单独拉开（64px），分页贴着列表（40px）；列表行内部 28px 上下留白。4px 为基础步长。

**Density:** 列表行是唯一的高密度区域（标题 + 元信息 + 最多两行摘要 + 平台行）。归档页的筛选块压在标题下方，不占用首屏之外的空间。

**Responsive:** 390 / 768 / 1440 三档验证。双栏（精选面板 1fr+20rem、创作团队 2 栏、制作原则 2 栏）在中等宽度折成单栏；导航在 `md` 以下收进页面内的抽屉，筛选块保持 44px 触控高度。

## Elevation & Depth

**纯平。** 系统里没有阴影层级：分隔是 1px 发丝线，浮起是色值阶差。深色模式下描边与浮起面都取 `press-ink-700`，靠 1.7:1 的可见差与画布分开；浅色模式用 `press-ink-200` 描边、`proof-grey-50` 浮起。

唯一的例外是 shadcn-vue 的 outline 按钮带着出厂 `shadow-xs`——它是组件库的默认值，不是本系统的语言，不要把它扩散到卡片或面板。

### Named Rules
**The Flat-By-Default Rule.** 需要强调一个面时，先试描边，再试色值阶差。加阴影是这个系统的最后手段，而且答案通常是「不加」。

## Shapes

直角构成：0 圆角是默认值，1px 直线是唯一的分隔手段。例外只有三处——头像 3.2px（`rounded-sm`）、shadcn 组件出厂的 4.8px（`rounded-md`，按钮与骨架）、空状态容器 6.4px。

没有左侧色条、没有超大圆角卡片、没有胶囊。图片与面板保持矩形，图标统一 Tabler 线性描边（16 / 20px，默认 2 描边），不混入第二套图标语汇。

## Components

### Buttons
- **Shape:** 近直角（4.8px，来自 shadcn 默认）；首屏精选面板里的黑按钮是 0 圆角。
- **Primary:** 信号黄底、黑字、36px 高（`px-4`）、14px/500；大号 40px（`px-6`）。hover 降到 90% 不透明，active 缩到 0.97。
- **Ink:** 黑底白字，48px 高（`min-h-12`）、13–14px/700，只出现在黄色面板内部。
- **Outline:** 1px 描边 + 背景色，hover 换成中性浮起面；用于「清除筛选」这类次级操作。
- **Focus:** `focus-visible` 用 3px 的 `ring-ring/50`（浅色即油墨金），从不使用信号黄填充作为焦点指示。

### Chips (筛选项)
- **Style:** 1px 描边、0 圆角、44px 最小高度（`min-height: 44px`）、12px 左右内边距、14px 文字。
- **State:** 未选中是描边 + muted 文字；选中是信号黄实心 + 黑字。结果计数只在筛选生效时出现。
- **标签筛选：** 标签按当前分类下的命中数倒序，计数写在括号里（`vue (24)`）——选之前就知道会不会落空。选完标签后列表**保持展开**并高亮该项，焦点回到刚选的那个标签，不用重新点一次「展开标签」。

### Cards / Containers
- **Corner Style:** 0 圆角。
- **Background:** 中性浮起面（`bg-elevated/60`）——标签、代码块、说明块的底色。
- **Shadow Strategy:** 无，见 Elevation。
- **Border:** 列表容器用上下两条发丝线包住整组，行与行之间只有一条下边线，最后一行没有。
- **Internal Padding:** 行 28px 上下，面板 24 → 48px。

### Inputs / Fields
项目没有表单输入。筛选与分页用链接和按钮表达状态，走 URL 查询参数。

### Navigation
- **Style:** 顶栏高 72px，底部一条发丝线；导航项 14px/500，左右 12px 内边距，最小高度 44px。
- **Active:** 文字转 `text-highlighted` + 700，并加 2px 信号黄下划线、偏移 8px——下划线是导航激活态的唯一装饰。
- **Mobile:** `md` 以下收进顶栏按钮打开的抽屉，条目最小高度 48px。

### Archive Row（签名组件）
一行内容承载一次选择：22px 标题 → 13px 元信息（期数用等宽，`·` 分隔）→ 最多两行 16px 摘要 → 平台图标行。整行是一个链接，hover 铺一层 55% 中性浮起底，键盘焦点用内嵌的 2px 焦点环。行与行之间只有一条发丝线，最后一行不带线。

系列索引是目录而不是推荐位：行内省略摘要，以及每行都相同的分类/系列名，只保留标题、集数与平台。目录按 `series-config.ts` 的分段切组，每组前一条 13px muted 色带作地标，顶部一排锚点链接供回访直接跳到对应阶段；色带标签与标题同一条导轨，只有上下内边距。

### Home Update Row
首页「视频 / 速报」两列共用一种行：80px 标签列（期数或日期，`leading-7` 让标签与标题首行同基线）+ 18px 标题限两行。行高随内容自适应（`py-4`），不固定高度：这样一行标题与两行标题之间的间隔始终是 32px，不会因为标题变长而粘在一起；标签始终沿第一条基线排成列。

### Code Block（标记块）
浅色下靠 1px 发丝线分层、无底色：Shiki 的 github-light token 对白底只有 4.57:1，任何灰底都会把它拖到 AA 以下。深色下用 `--surface-elevated` 作底色，token 对比充足。

### Feature Panel（签名组件）
首页的黄色实心面板：左栏 24–48px 内边距放标题、摘要与黑色 CTA，右栏 20rem 放系列入口，右栏底色是 4.5% 黑（`bg-black/[0.045]`）。窄屏折成上下两段，顺序不变。

## Do's and Don'ts

### Do:
- **Do** 让信号黄每屏只出现一次实心块，其余部分保持纸白/版面灰。
- **Do** 每个可点元素留出至少 44px 的命中区，字号不变（`min-h-11` + 负外边距补偿）。
- **Do** 用 1px 发丝线和色值阶差表达层级；深色描边取 `press-ink-700`（1.7:1）。
- **Do** 浅色模式把强调文字和焦点环放在油墨金 #806400（对白底 4.9:1）。
- **Do** 保持 0 圆角，例外只有 3.2px 头像与 shadcn 出厂的 4.8px。
- **Do** 列表行统一语序：标题 → 元信息 → 摘要 → 标签/平台；元信息永远在标题下方。
- **Do** 列表计数作为 14px muted 说明行，贴着规则线，不写成第二个标题。

### Don't:
- **Don't** 用信号黄做小字、图标或描边（白底 1.4:1，不可读）。
- **Don't** 给列表行、说明块或面板加左侧色条。
- **Don't** 加渐变文字、玻璃模糊、零偏移的彩色光晕，或把 `shadow-xs` 扩散到按钮之外。
- **Don't** 在标题上方加小号大写标签（eyebrow），也不要用 9–10px 字号的标签行。
- **Don't** 引入第二套图标风格、第二套圆角尺度或第二个容器宽度。
- **Don't** 用装饰纹理、网格底纹或大号字母填充空白区域。
