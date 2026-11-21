# PLAYZONE AR — agent guide

An Arabic (RTL) video game news and guides site built with TanStack Start, React 19 and Content Collections. It's a content-only site: Markdown articles are compiled at build time. There's no database, auth, API routes or environment variables. The visual design comes from the owner's original single-page HTML prototype (dark theme, orange accent, Cairo font), so keep that look when you make changes.

## Key directories

- `content/posts/*.md`: articles. Frontmatter is validated by `postSchema` in `src/lib/post-content.ts`: `title`, `summary`, `date` (quoted `YYYY-MM-DD`), `categories[]`, optional `slug`, `image`, `imageAlt`, `featured`, `kind` and `author`.
- `content-collections.ts`: collection config. It adds `slug`, `html` (marked + sanitize-html) and `readingMinutes`.
- `public/img/`: article images. Always render them through `cdnImage()` / `cdnSrcSet()` from `src/lib/images.ts` (Netlify Image CDN, WebP), never the raw path.
- `src/lib/site.ts`: brand name, Arabic copy, site URL, default author, and the order of nav and chip categories.
- `src/lib/blog.ts`: sorting, search, related posts, Arabic date formatting (`ar-EG-u-nu-latn`, Western digits) and reading-time labels with correct Arabic number agreement.
- `src/components/`: `site-header` (top date line, sticky nav, search, mobile menu, latest-news bar), `site-footer`, `hero`, `post-card` (`PostCard`/`PostGrid`), `category-chips`.
- `src/routes/`: `__root.tsx` (html `lang="ar" dir="rtl"`, fonts, metadata, 404), `index.tsx` (home plus `?q=` search), `category.$category.tsx`, `posts.$slug.tsx`.
- `src/styles.css`: the whole design system as plain CSS classes (`.wrap`, `.card`, `.hero-tile`, `.article-content`, …) with variables in `:root`. Tailwind is imported only for preflight and utilities like `sr-only`.

## Conventions and non-obvious decisions

- All UI copy is Arabic. Wrap Latin brand or platform names in `.ltr` where bidi ordering matters (for example the brand, or `قسم <span class="ltr">PC</span>`).
- In RTL, "back" links use `→` and "forward/see all" links use `←`.
- Markdown blockquotes are styled as the editorial notice box. Use them for disclaimers and tips.
- The hero uses the first `featured: true` article (newest first), falling back to the newest article. The two side tiles are the next newest.
- Search state lives in the home route's `q` search param. The header filters live on `/` and submits on Enter elsewhere. The header's sync effect compares trimmed values so trailing spaces aren't removed while typing.
- The top-line date uses the Asia/Riyadh time zone with `suppressHydrationWarning`.
- Editorial accuracy matters: articles separate confirmed facts from rumours, and avoid prices or tier names that change. Keep that standard.
- Don't edit generated files (`.content-collections/`, `src/routeTree.gen.ts`).
- Keep `sanitize-html` in the Markdown pipeline.

## Commands

`pnpm dev` (Vite on 3000), `netlify dev`, `pnpm test`, `pnpm typecheck` (run dev or build once first to generate types), `pnpm format`.
