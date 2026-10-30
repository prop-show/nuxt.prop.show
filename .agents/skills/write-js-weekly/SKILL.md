---
name: write-js-weekly
description: Write prop.show's JS weekly. Scan the week's real JS-ecosystem news and releases, verify every fact against an authoritative source, and publish content/news/NN.weekly-YYYY-MM-DD.md with kind 周报. Use when asked to 写周报, JS 周报, 技术周报, 这周的周报, or 本周有什么值得写的.
---

# JS 技术周报

周报是速报的一种稿件形态，共用 `/news` 路由、导航、RSS 和 sitemap。区别只有 frontmatter 的 `kind: 周报`：列表与详情页会在日期旁渲染一个「周报」标记（`src/pages/news/_components/Line.vue`、`[slug].vue`）。不要为周报新建栏目或路由。

## 流程

1. **定窗口**：先取系统时间，不要靠记忆或内容库里最新一篇的日期推断今天。窗口为往前 7 天。
2. **扫仓库发布**：先确认 `gh auth status` 可用（未认证的 `api.github.com` 会整表 403），再对仓库清单逐个查询窗口内的 release。清单至少覆盖 `nodejs/node`、`vitejs/vite`、`rolldown/rolldown`、`oxc-project/oxc`、`vuejs/core`、`nuxt/nuxt`、`vercel/next.js`、`sveltejs/svelte`、`solidjs/solid`、`pnpm/pnpm`、`biomejs/biome`、`unjs/nitro`、`withastro/astro`、`TanStack/query`、`honojs/hono`、`drizzle-team/drizzle-orm`、`shadcn-ui/ui`、`storybookjs/storybook`、`angular/angular`、`facebook/react`。
3. **扫社区热度**：Hacker News Algolia 按时间与分数过滤，`>` 必须编码为 `%3E` 且必须带 UA，否则返回 HTML。
4. **筛真事**：只留安全漏洞、LTS 与大版本状态转换、默认行为变更、重大架构变化（如某项目进 RC）。例行 patch、canary、依赖 bump 一律不写，宁可条目少。
5. **核实到出处**：CVE 走 MITRE `cveawg` 记录，GitHub 安全公告走 `gh api /advisories/<GHSA>`，版本细节读 release body 的 Notable Changes，Node 版本排期读 `nodejs/Release` 的 `schedule.json`，Node 安全公告读 `nodejs.org/en/blog/vulnerability/<month>-<year>-security-releases`。版本号、日期、影响范围三类事实逐条对得上官方来源，并与实际修复 commit 交叉印证。
6. **写稿**：`content/news/<下一个两位序号>.weekly-YYYY-MM-DD.md`，slug 即 `weekly-YYYY-MM-DD`。正文用 `###` 分条，每条先写事实（谁、何时、什么版本），再写影响范围，最后写该做什么或代价。frontmatter 的 `source` 只支持单个 URL，多来源写进正文。
7. **验证**：`pnpm test` 全绿；起 dev 确认详情页 `h3` 数量与分条数一致、元信息显示「日期 · 周报」、列表页同样带标记；正文里每个外部链接 curl 返回 200。

## 写法

正式书面中文。去掉口语化评价（「不吃惊」「值得记一笔」「别赌」「顺带一眼」）和第二人称祈使句；破折号改用句号或冒号；段尾不替读者总结一句点题的话；小标题用名词短语。

链接一律用 `[文字](https://...)`，不要用 `<https://...>`：Comark 不保证支持自动链接语法，会被当内联 HTML 过滤。正文内嵌 HTML 同样会被安全过滤剥除。

## 边界

- `kind` 由 `scripts/generate-content.ts` 的 `z.literal('周报')` 校验，写别的值构建直接失败，这是有意的；速报不写 `kind`。
- 单条突发新闻发速报，不塞进周报。
- 内容必须可溯源，不编造版本号、发布日期或评测数据（见 `PRODUCT.md`）。
