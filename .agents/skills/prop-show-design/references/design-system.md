# Prop.show Design System v2

## Identity and scope

prop.show is an editorial technology publication made by frontend developers. Real project videos, technical news, learning series and creators are its material. A visitor should quickly find something to watch, read or build.

The logo and brand yellow provide continuity. Layout, imagery, spacing and geometry respond to the content. The previous broadcast/archive styling is not mandatory: do not recreate status panels, decorative episode files or transmission labels by default.

V2 covers the homepage, video/news/work archives and details, series, about, design assets, 404 and shared shell. Series retain course context and the start-learning action; detail pages prioritize real platform, website, repository or source destinations. Unused legacy components are not instructions to restore the old style.

## Sources of truth

- Stack: Void SSR, Vue 3 Composition API, shadcn-vue components in `src/components/ui`, Tailwind CSS 4, Tabler through `~icons/tabler/*` imports.
- `src/assets/css/main.css`: semantic colors, type utilities, interaction timing and theme.
- `src/site-config.ts`: navigation, destinations, brand assets.
- `src/config.ts`: content settings, locale and time zone.
- `PodcastHero.vue`, `HomeLatestContent.vue`, `video/Card.vue`, `TheHeader.vue`, `TheFooter.vue`, detail pages: implemented patterns.

Use actual source when implementation and this reference diverge. Record intentional changes to the system after verifying them.

## Required fundamentals

### Real content and useful hierarchy

- Derive counts, dates, series order, categories and platform availability from content.
- Use one page h1; headings describe their section. Primary actions have real destinations.
- Keep routes, content, query filters, pagination and browser history working through redesigns.
- Never invent publishing status, live activity, testimonials or metrics.
- Prioritize the visitor's task over brand decoration. Every region must contain useful content or an action.

### Color and themes

- Brand fill is `#F0DB4F`, with dark text. Neutral light/dark surfaces support it.
- `text-primary` uses the separate readable foreground token: `#806400` in light mode and brand yellow in dark mode. Do not use the bright fill as small text on white.
- Prefer existing semantic utilities (`bg-default`, `bg-elevated`, `text-highlighted`, `text-muted`, `border-default`). Do not build component-local palettes.
- Other colors are permitted for truthful status or actual content imagery; they do not become competing decorative accents.
- Use mode-correct logo assets. Dark overscroll remains dark.
- Normal text contrast at least 4.5:1, large text 3:1. Focus and meaningful controls need visible contrast. Check actual rendered combinations.

### Type and reading

- System sans Chinese/Latin type; bold for titles, regular for prose. `font-black` is optional, not the default for every heading.
- Typical scale: display 36–60px, page title 32–48px, detail title 28–40px, section title 24–30px, item title 18–24px, body 16–18px, metadata 13–14px.
- Use comfortable body line height (roughly 1.7–2). Keep detail reading width around 42–48rem. Wide lists may use the full shared container.
- Mono is optional for code, episode IDs and aligned technical values. Dates and UI labels can use normal sans with tabular numbers.
- No routine 9–10px uppercase labels or tracking-heavy eyebrows. Chinese carries navigation and actions.
- Detail titles wrap naturally. Compact homepage update titles intentionally remain one line with ellipsis; keep full text in the DOM and offer a title attribute.

### Responsive behavior and accessibility

- Shared centered max-w-6xl shell with consistent 16/24/32px horizontal padding; no accidental empty columns.
- Small-screen content is ordered by usefulness. Do not stack desktop decoration above the content.
- Visible focus, semantic links/buttons/time/nav, icon control names, keyboard-operable menus and filters.
- Preserve reduced-motion behavior and immediate content visibility.
- Explicit media geometry prevents shift. Missing optional media must not leave a placeholder hole.

## Page responsibilities

### Homepage: introduce through actual content

- A concise statement identifies the publication. A real selected/latest program leads with title, description and viewing action.
- Optional series entry explains a real learning path. No giant logo-only panel or statistics dashboard required.
- Recent videos/news are compact, equally readable lists with dates/episode metadata and routes to full archives.
- Creators and work provide proof. Remove duplicate promotional sections and technology-logo walls unless they serve navigation.

### Archive: browse and choose

- Plain title and short explanation; no mandatory hero panel.
- Quiet filters with a clear selected state. Categories stay available; a long tag list may use native details/summary with the current selection visible.
- Item title dominates; metadata and summary help selection. Show only available platforms.
- Real episode numbers stay secondary. Global and series numbering must be unambiguous.
- Pagination updates the URL, retains filters, and works with reload/back/forward. Small widths use fewer controls.

### Details: read or watch

- Return link, natural title, useful metadata, then content or viewing/source actions.
- No oversized number/type panel, archive status sidebar or duplicate article label.
- Watch and repository actions stay close to the title. Sources stay near news date metadata.
- Avoid repeating the same introduction in header and body. Keep previous/next and course navigation where useful.
- Skeleton geometry follows the implemented title, actions and body layout.

### About and works: show people and evidence

- About leads with a concise introduction and creators, followed by actual output, principles and future plans.
- Real portraits stay in color. Avoid decorative contributor numbering.
- Use real product screenshots when available and informative; never substitute invented UI or unrelated stock photos.
- Works explain purpose, useful features and destinations. A text-only entry is valid without imagery.

## Flexible visual decisions

- Use spacing, typography and neutral fill before adding frames. Dividers are optional separators, not required on every title/container.
- Radius is restrained and consistent; no mandated square corners or giant soft cards. Existing shadcn tokens remain the source.
- Texture, grids, orbits, oversized letters, yellow panels and decorative numbering are not default brand assets. Introduce only with a concrete content purpose.
- Do not require every section to share one composition. Do not add photos/animation merely to satisfy a quota.
- Presentation sections may use 64–96px vertical rhythm; archive controls/results about 24–40px; prose paragraph spacing follows reading flow.
- Feedback transitions around 160–240ms, primarily transform/opacity/color. No content hidden until a reveal fires. Continuous decoration is optional and disabled for reduced motion.

## Implementation workflow

1. Identify page job, real content, primary action, required states and current callers.
2. Reuse an existing suitable component or platform behavior; avoid wrappers/dependencies for one-off styling.
3. Preserve dirty user changes and content/query behavior.
4. Implement the smallest complete change; match skeletons and optional/empty states.
5. Check approximately 390, 768 and 1440px, both themes, long titles, keyboard and reduced motion for touched interactions.
6. Run focused ESLint, typecheck and relevant build/test checks. Report actual evidence and limitations.
7. Compare screenshots against the task. Update this reference only for deliberate, verified system changes.

## Review checklist

- First screen says what the page is and presents useful content or an action.
- Primary content arrives promptly on a phone; no decorative block pushes it down.
- Titles, metadata and actions have clear relative importance.
- Homepage paired updates align; lists and details remain readable with long text.
- Neutral surfaces, brand fill and readable accent text work in both themes.
- Borders, imagery and motion each have a purpose; no invented status or filler.
- All navigation, sources, filters, pagination and keyboard behavior continue to work.
- No horizontal overflow, unnecessary layout movement or missing-content holes.
