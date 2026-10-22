# PropShow

> 看前端视频，读技术速报。

prop.show 由前端开发者共同维护，分享真实项目里的实践、工具使用和技术动态。

## 技术栈

Void 1.1.11 + Vue 3 + shadcn-vue + Tailwind CSS 4，部署到 Cloudflare Workers。界面组件通过官方 `shadcn-vue` CLI 安装至 `src/components/ui/`，业务组件优先使用 `src/components/ui/` 中的 shadcn-vue 组件；shadcn-vue 已提供的组件不在业务层直接使用 Reka UI。新增或更新组件通过官方 CLI（例如 `pnpm dlx shadcn-vue@latest add pagination`），不手写替代实现。底层交互基于 Reka UI；`components.json` 配置组件与工具路径。Tailwind、Vue 自动导入和组件注册使用独立 Vite 插件。页面通过 Void 的 loader 与 head 在请求时生成 HTML，分页、筛选走查询参数（例如 `/videos?page=2&category=编程技巧`）。仓库只有 Void 实现，没有 Nuxt 应用或迁移备份。

内容源是 `content/` 下的 Markdown/YAML，由 Vite 插件调用 `scripts/generate-content.ts` 校验并通过 Comark、Shiki 与 `@comark/html` 渲染，通过 `virtual:prop-content` 虚拟模块直接参与打包，不生成中间文件。Worker 只打包元数据和 HTML，不在运行时解析 Markdown；浏览器只接收 loader 返回的数据，列表不包含正文。`::note`、`::alert`、`::poetry` 内容块保留语义样式，代码块支持明暗主题语法高亮。**新增或修改内容后需要重新构建部署。**

## 目录结构

`void.config.ts` 声明 `sourceDir: 'src'`。`vite.config.ts` 的 `resolve.alias` 与 `tsconfig.json` 的 `paths` 同步把 `@/` 指向 `src/`，应用内部的文件和类型导入统一走别名。

```text
src/
  pages/          # *.vue 页面，配套 *.server.ts 提供 loader 与 head
  routes/         # RSS、robots、sitemap HTTP 端点
  middleware/     # www 跳转、旧分页 301、安全响应头
  components/     # 共享界面组件（按目录自动命名空间）
  assets/css/     # Tailwind 入口与设计令牌
  utils/          # 共享工具
  content.ts      # 内容索引、分页与日期处理
  markdown.ts     # Comark 解析、渲染与安全过滤
  site-config.ts  # 导航、平台、社交、品牌色等站点配置
  navigation.ts   # 链接规范化
content/          # Markdown/YAML 内容源
public/           # 直接分发的静态资源
scripts/          # 图标生成、视频抓取等构建/抓取脚本
tests/            # vitest：内容、Markdown、端点和在线 SEO 校验
```

模块专用组件与页面就近存放：`pages/videos/_components/`、`pages/news/_components/`、`pages/works/_components/`、`pages/about/_components/`、`pages/design-assets/_components/`、`pages/series/_components/`；首页使用 `pages/_home/`。这些组件使用显式导入，不注册为全局组件。Void 路由扫描忽略以下划线开头的文件和目录，因此不会生成额外页面。跨模块复用组件及 shadcn-vue 基础组件保留在 `src/components/`，继续自动导入；系列页复用的视频列表直接从视频模块导入。

根目录没有另一套 `pages/`、`routes/` 或 `middleware/`；脚本按文件系统路径读写资源，应用模块导入用 `@/`。`src/auto-imports.d.ts`、`src/components.d.ts` 由 Vite 插件生成且不提交。

## 内容

四类内容，各自一个目录：

| 目录 | 格式 | 必要字段 |
| --- | --- | --- |
| `content/videos/` | Markdown + frontmatter | `title`、`category`；可选 `description`、`date`、`status`、`platforms.{bilibili,youtube,douyin}`、`tags`、`series`、`episode`、`repository`、`order` |
| `content/news/` | Markdown + frontmatter | `title`、`date`（`YYYY-MM-DD HH:mm`，无时区按东八区）；可选 `description`、`source` |
| `content/works/` | Markdown + frontmatter | `title`、`author`（creator slug）、`type`；可选 `description`、`order`、`tags`、`website`、`repository` |
| `content/creators/` | YAML | `name`、`avatar`、`href`、`role`；可选 `order` |

- 文件名前缀的数字只用于排序，会被去掉：`27.npm-supply-chain-simple-defense.md` → `/videos/npm-supply-chain-simple-defense`，路径统一转小写。
- 缺少 `description` 时取正文第一段（最多 200 字）。
- 正文里的内嵌 HTML 会经过 Comark 安全过滤：脚本、iframe、`svg`、表单等标签和非 http/https/mailto/tel 链接被剥除。这是有意的限制，不要为了排版去放宽。
- `scripts/generate-content.ts` 会校验字段类型（例如 `order` 必须是非负整数），字段写错直接构建失败。

### 页面与端点

- `/`、`/about`、`/design-assets`、`/series/yisi`（乙巳系列，按集数排序）
- `/videos`、`/news`、`/works`：查询参数分页与筛选，每页条数统一由 `src/config.ts` 的 `contentConfig.pageSize` 配置（`src/content.ts` 导出供内容模块使用）
- `/videos/:slug`、`/news/:slug`、`/works/:slug`
- `/rss.xml`、`/robots.txt`、`/sitemap.xml`
- `/*/page/:n` → `/*?page=n` 的 301 重定向，`www.prop.show` → `prop.show` 的 301

## 开发与验证

需要 Node.js >= 24.21.0（见 `.nvmrc`）和 pnpm 12.11.2。

```sh
pnpm install
pnpm dev            # vite --port 4399
pnpm typecheck      # vue-tsc --noEmit
pnpm lint           # eslint，pnpm lint:fix 自动修复
pnpm test           # vitest：内容索引、Markdown 渲染/安全过滤、RSS/robots/sitemap
pnpm build          # 生成 OG 图片 + vite build
pnpm preview        # vite preview --port 4399
pnpm fetch:videos   # 抓取 B 站/YouTube 已发布视频到 .video-list/（已 gitignore）
```

`pnpm test`（vitest，配置见 `vitest.config.ts`）不需要启动服务，先生成内容数据，再导入 `src/content.ts`、`src/markdown.ts` 和三个端点并断言结果；`pnpm test:watch` 为监听模式。测试放在 `tests/`：`generate-content.test.ts`、`content.test.ts`、`markdown.test.ts`、`routes.test.ts`（unit 项目）和 `seo.e2e.test.ts`（e2e 项目）。

Vite 插件在加载虚拟模块时编译内容数据，同一次构建复用编译结果；开发时监听 `content/` 的新增、修改和删除，使各环境的虚拟模块失效并刷新页面。虚拟模块有独立类型声明，`pnpm typecheck` 不需要预先生成数据；内容校验由测试和构建执行。

`pnpm check:seo` 需要真实 HTTP 响应，先启动 `pnpm dev` 或 `pnpm preview`：

```sh
pnpm check:seo                            # 默认 http://localhost:4399
SEO_BASE_URL=http://localhost:4400 pnpm check:seo
```

它检查分页不重复、分页链接数量、canonical、meta description、404、RSS、sitemap、robots 和旧分页重定向。视频总数和每页数量分别取自 `content/videos/` 与 `pageSize`，增删视频不需要改测试。

图标在组件使用处通过 `~icons/tabler/图标名` 静态导入，由 `unplugin-icons` 在 Vite 构建时编译成 Vue 组件，SVG 随构建产物发布，无需运行时请求图标服务或维护名称映射。列表配置直接引用导入的图标组件；官方品牌 SVG 保存在 `public/`。

### Open Graph 图片

`pnpm generate:og` 使用 Takumi 的 Node 原生渲染器，为固定页面及每篇视频、速报、作品生成 1200×630 PNG，输出到 `public/og/`（不提交）。`pnpm dev` 和 `pnpm build` 自动执行生成，Cloudflare 只分发静态图片，不加载 Takumi、字体或 WASM。字体来自开发依赖 `@fontsource-variable/noto-sans-sc`（约 4.9 MB）的 Noto Sans SC 可变字体，使用 900 字重，构建不需要请求远程字体。

`src/utils/seo.ts` 自动输出绝对地址的 `og:image`、尺寸、alt 和 Twitter 大图信息；分页、筛选共用对应栏目的图片。图片标题或内容修改后运行 `pnpm generate:og`（开发热更新不会重新生成图片）。添加固定页面时同步维护 `scripts/generate-og.ts` 的页面清单。图片仅生成暗色黄黑版式，使用深色底、浅色标题与黄色品牌区，便于社交平台一致展示。

`pnpm fetch:videos` 支持 `HTTPS_PROXY` / `HTTP_PROXY` 环境变量；抓取失败会跳过对应来源并输出警告。抓取结果只落在 `.video-list/`，不会自动写入 `content/videos/`。

## 部署

```sh
pnpm exec void connect --platform cloudflare
pnpm build
pnpm deploy
```

`void.config.ts` 使用 Worker 名 `nuxt-prop-show`，兼容日期 `2026-10-18`、`nodejs_compat`；显式保留现有 `prop.show`、`www.prop.show` 自定义域名，以及已启用的 `workers_dev`、`preview_urls`。这些值需与 Cloudflare 当前配置保持一致，否则 Void 可能拒绝接管控制台管理的路由和可见性。首次部署需要登录并选择 Cloudflare 账户；`void deploy` 会构建、创建或更新远程资源并发布。不要把 `dist/client` 单独当完整站点部署。

带 `void.lock.json` 资源记录时保留并提交；当前项目没有资源绑定，所以该文件不存在。Void 生成的 `.void/`、`.void-wrangler.jsonc`、`dist/` 和 `.wrangler/` 都不提交。

### 分支预览

```sh
pnpm build
pnpm deploy:preview   # wrangler preview --config dist/ssr/wrangler.json
```

`void.config.ts` 的 `cloudflare.previews: {}` 必须保留，Wrangler 4.151.1 读取生成的配置时要求这个块存在。

Cloudflare Workers Builds 控制台：构建命令 `pnpm build`，生产部署命令 `pnpm deploy`，非生产分支部署命令 `pnpm deploy:preview`。`pnpm deploy` 显式运行 `void deploy --platform cloudflare`，不依赖本地 `.void/project.json` 保存的部署目标；CI 中不要配置裸 `void deploy`，否则全新检出会要求交互关联 Worker。CI 需要 `CLOUDFLARE_API_TOKEN`，令牌可访问多个账户时还需 `CLOUDFLARE_ACCOUNT_ID`；凭据通过构建环境提供，不写入仓库。Wrangler 4.151.1 是直接开发依赖，安装依赖时必须包含 devDependencies，否则会出现 `wrangler: not found`。

预览名称默认取当前 Git 分支，可用 `--name <名称>` 覆盖；`--worker-name <目标Worker>` 可把预览挂到另一个已有 Worker 下，不会修改 `void.config.ts`。单独运行 `wrangler preview` 不会读 `void.config.ts`，容易报 `Required Worker name missing`；本地预览请用 `pnpm build` + `pnpm preview`。

HTTPS 在 Cloudflare 域名设置中开启 Always Use HTTPS；www 主域名跳转由 `src/middleware/01.site.ts` 处理。

### 缓存

页面 HTML 不设置共享缓存，`/rss.xml`、`/robots.txt`、`/sitemap.xml` 设置 `s-maxage=3600`。上线后仍需在真实 Cloudflare 环境和大陆线路对比首访与重复访问的 TTFB、首屏和资源耗时，再决定是否给 HTML 加缓存。

## 界面规范

改动 UI 前先读 `.agents/skills/prop-show-design/SKILL.md` 及其 `references/design-system.md`。共享配置在 `src/config.ts`：站点名称和地址、语言与时区、每页条数与首页展示数量、社交账号、主题存储键、OG 图片规格、XML 缓存、开发端口。该文件不导入 Vue 或图标，可供应用、Void/Vite 配置和 Node 脚本共用。系列配置单独放在 `src/series-config.ts`，以路由 slug 为键，包含名称、路径、标题、描述和 OG 标签；新增系列时在此添加条目并实现对应页面，OG 图片会自动遍历生成。带图标的导航、社交链接和品牌资产展示配置保留在 `src/site-config.ts`；设计令牌和自定义类在 `src/assets/css/main.css`。部署、ISR 和查询参数缓存规则仍由 `void.config.ts` 管理。主题跟随系统偏好，也可手动切换（`vueuse-color-scheme` 存储在 localStorage）。
