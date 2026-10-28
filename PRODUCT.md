# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

中文前端开发者。两种典型场景：跟着视频把一套做法做一遍（学习/复现），以及在工作间隙刷一眼前端技术动态（跟进）。用户多在移动端与桌面端之间切换，读得懂代码，不需要基础概念科普。

## Product Purpose

prop.show 收集并分享来自真实项目的前端实践、工具用法与技术动态。内容分四类：视频（含成体系的「乙巳」系列）、速报、作品、创作者。成功意味着：读者能照着做出来，或者知道自己该关注什么。

## Positioning

由两位在职前端开发者共同维护，内容来自自己项目里验证过的做法，不复述他人教程、不搬运未经核实的消息。这层「作者即实践者」的约束是搬运型技术媒体无法复制的地方。

## Operating Context

- 内容以 `content/` 下的 Markdown/YAML 为唯一来源，新增或修改后需重新构建部署。
- 速报类内容附 `source` 链接，读者可溯源。
- 视频在多平台分发（哔哩哔哩、YouTube、抖音），站点是内容的归档与检索入口，不是唯一播放场所。
- 读者通过列表分页、栏目筛选和系列页在站内找内容；RSS 与 sitemap 供订阅和检索。

## Capabilities and Constraints

- 站点页面：首页、视频/速报/作品列表与详情、系列页、关于我们、设计资产、404；端点：`/rss.xml`、`/robots.txt`、`/sitemap.xml`。
- 分页与筛选走查询参数（如 `/videos?page=2&category=编程技巧`），旧分页路径 301 到查询参数形式。
- 作者固定为 Wei 与 Himavanta（`content/creators/`），不接受外部投稿。
- 内容必须亲历或可溯源：不编造评测数据、客户、合作方、基准成绩。
- 站点语言 `zh-CN`，时区东八区；无多语言版本。
- 正文内嵌 HTML 经安全过滤，脚本、iframe、svg、表单和非 http/https/mailto/tel 链接会被剥除，属于有意的限制。

## Brand Commitments

- 名称 `prop.show`，主域名 `prop.show`（`www` 301 跳转到它）。
- 标志资源：`public/prop-light.svg`、`public/prop-dark.svg` 及对应透明版；品牌黄 `#F0DB4F`、墨黑 `#000000`、纸白 `#FFFFFF` 为对外公开的身份色。
- 语气：中文、平实、讲清取舍；演示怎么做，也说明解决了什么。

## Evidence on Hand

- 真实内容库：`content/videos/`、`content/news/`、`content/works/`、`content/creators/`。
- 作者身份与主页：`content/creators/wei.yml`、`content/creators/himavanta.yml`。
- 作品均为作者自有或参与的项目（`content/works/`），含 `kit.prop.show`、`kompress` 等。
- 站内没有第三方客户案例、商业客户 Logo、付费评测或赞助内容；未来工作不得虚构这些。

## Product Principles

1. 先看能不能做出来：内容从项目与协作中选题，给可执行的做法和适用范围。
2. 讲清原理与取舍：说明解决了什么问题、付出了什么代价，不只贴代码。
3. 可溯源：速报带来源，事实与观点分开。
4. 持续记录：既记录新工具与新变化，也回顾值得反复学习的基础。
5. 欢迎不同声音：呈现不同经验与技术路线，不求唯一答案。
