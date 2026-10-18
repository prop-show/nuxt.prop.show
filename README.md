# PropShow

> 看前端视频，读技术速报。

prop.show 由前端开发者共同维护，分享真实项目里的实践、工具使用和技术动态。

## Void SSR 试验

当前分支使用 Void 1.1.11、Vue 3、Nuxt UI 的独立 Vite 集成和 Cloudflare Workers。页面通过 Void loader 与 head 在请求时生成 HTML，分页使用 `/videos?page=2`。旧 Nuxt 应用、配置和迁移备份已清理，当前仓库只保留 Void 实现。

Markdown/YAML 仍是内容源，使用 Comark 与 `@comark/html` 在服务端解析和渲染，源文件通过构建打包进 Worker；服务端不查询数据库，浏览器只接收 loader 返回的数据。现有 `::note`、`::alert`、`::poetry` 内容块保留语义样式；代码块暂不带语法高亮。新增或修改内容后需要重新构建部署。

## 目录结构与别名

采用 Void 官方支持的 `sourceDir: 'src'` 布局，在 `void.config.ts` 中声明。`vite.config.ts` 的 `resolve.alias` 与 `tsconfig.json` 的 `paths` 同步配置 `@/` 指向 `src/`，应用内部文件和类型导入统一使用别名，例如 `@/content`、`@/components/SiteLink.vue`、`@/pages/videos/index.server`。

```text
src/
  pages/          # Vue 页面、布局及服务端 loader/head
  routes/         # RSS、robots 和 sitemap HTTP 端点
  middleware/     # 请求中间件
  components/     # 共享界面组件
  assets/         # 样式资源
  utils/          # 共享工具
  content.ts      # 内容索引
  markdown.ts     # Comark 解析和渲染
content/          # Markdown/YAML 内容源
public/           # 直接分发的静态资源
scripts/          # 图标生成、抓取和验证工具
```

根目录保留 Void、Vite、TypeScript、包管理配置；不存在另一套根目录 `pages/`、`routes/` 或 `middleware/`。脚本按文件系统路径读写资源，应用模块导入使用 `@/`。

## 开发与验证

需要 Node.js >= 24.21.0 和 pnpm 12.11.2。

```sh
pnpm install
pnpm dev
pnpm typecheck
pnpm lint
pnpm check:content
pnpm build
pnpm preview
```

开发或预览服务启动后，另一个终端运行 `pnpm check:seo`；可传入其他地址，例如 `pnpm check:seo http://localhost:4400`。它检查真实 HTTP 响应中的分页、canonical、摘要、404、RSS、sitemap 和旧分页重定向。

`pnpm build` 自动生成按需图标集合。主题支持系统偏好和手动切换，保留原站点黄黑色、边框、纹理与归档布局。静态资源由 Cloudflare 分发，HTML 当前不设置共享缓存，先建立 SSR 正确性和性能基线。

## 预览部署

```sh
pnpm exec void connect --platform cloudflare
pnpm deploy
```

`void.config.ts` 使用 Worker 名 `nuxt-prop-show`，没有生产自定义域名配置。首次部署需要登录并选择 Cloudflare 账户；部署命令会创建或更新远程资源。验证预览站后再配置生产域名，不要把 `dist/client` 单独当作完整站点部署。

`pnpm deploy`（即 `void deploy`）发布到上述 Worker 的正式部署。分支预览使用独立的 `pnpm deploy:preview` 命令。若要使用 Cloudflare 控制台的分支预览功能，`void.config.ts` 的 `cloudflare` 配置需保留 `previews: {}`（Wrangler 4.151.1 要求存在这个块；当前应用没有需要单独配置的资源绑定）。先构建，再明确传入包含 SSR 入口和静态资源的生成配置：

```sh
pnpm build
pnpm deploy:preview
```

Cloudflare Workers Builds 控制台的构建命令填写 `pnpm build`，非生产分支部署命令填写 `pnpm deploy:preview`。项目已直接依赖 Wrangler 4.151.1，安装依赖时需包含开发依赖；避免只从间接依赖查找 Wrangler 而出现 `wrangler: not found`。

预览名称默认取当前 Git 分支，也可通过 `--name <预览名称>` 指定；所属 Worker 默认取生成配置中的 `name`。如需在另一个已有 Worker 下创建预览，追加 `--worker-name <目标Worker名称>`。该参数指定预览所属 Worker，不会修改 `void.config.ts` 或 `void.lock.json`。单独运行 `pnx wrangler preview` 不会直接读取 `void.config.ts`，因此可能报 `Required Worker name missing`；仅传 `.void-wrangler.jsonc` 也缺少完整构建入口。本地预览仍使用 `pnpm build` 后运行 `pnpm preview`。

Void 生成 `.void/`、`.void-wrangler.jsonc` 和构建产物，这些不提交；如果部署生成 `void.lock.json`，应保留并提交资源记录。HTTPS 在 Cloudflare 域名设置中开启 Always Use HTTPS；www 主域名跳转由服务端中间件处理。

## 迁移记录与后续素材

- Nuxt 文件路由和 `useAsyncData` → Void 页面与 `.server.ts` loader。
- Nuxt Content SQLite → 构建时 Markdown 索引，无 D1 依赖。
- Nuxt SEO → Void head、原生 RSS、robots、sitemap。
- 静态 HTML 查询参数失效 → 请求时解析分页和筛选。
- Nuxt UI 通过独立 Vite 集成保留；Nuxt 自动导入、导航和内容组件逐项迁出。
- Void 1.1 的本地构建使用 `vite build`；`void build` 是平台构建管理入口。

上线前仍需测试真实 Cloudflare 环境和大陆线路，比较首访与重复访问的 TTFB、首屏及资源耗时，再决定 HTML 缓存策略。
