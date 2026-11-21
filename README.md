# PLAYZONE AR — أخبار الألعاب بالعربي

PLAYZONE AR is an Arabic-language video game news and guides site. It has a dark editorial design, right-to-left layout, and sections for PlayStation, Xbox, PC, GTA and general gaming.

## What's on the site

- **Homepage**: a hero with the featured story and the next two latest articles, a "latest news" bar, category filter chips, a grid of article cards, and a call-to-action band.
- **Article pages** (`/posts/<slug>`): cover image, article body, a details sidebar (section, date, reading time, type, author) and "اقرأ أيضاً" related articles.
- **Category pages** (`/category/<name>`): every article in a section, newest first.
- **Search**: the header search box filters articles by title, summary and category. It updates as you type on the homepage, and on other pages it runs when you press Enter.
- An Arabic 404 page, per-article SEO and Open Graph metadata, and responsive layouts for mobile, tablet and desktop.

## Tech

- [TanStack Start](https://tanstack.com/start) (React 19) with file-based routes
- [Content Collections](https://www.content-collections.dev/), which turns the Markdown articles in `content/posts/` into typed, sanitized HTML at build time
- Tailwind CSS v4 for the base layer, with the PLAYZONE design system written as plain CSS in `src/styles.css`
- The Netlify Image CDN, which resizes images and converts them to WebP
- Hosted on Netlify. There's no database and no environment variables are needed.

## Writing an article

Add a Markdown file to `content/posts/`:

```md
---
date: '2026-11-22'
slug: my-article # optional, a single URL segment in Latin characters
title: 'عنوان المقال'
summary: 'ملخص قصير يظهر في البطاقات ومحركات البحث.'
headline: 'عنوان مختلف لصفحة المقال' # optional, cards and the hero keep using title
lede: 'مقدمة قصيرة تحت العنوان في صفحة المقال' # optional, defaults to summary
updated: '2026-11-23' # optional, shown as "آخر تحديث" in the article sidebar
categories:
  - PlayStation # the first category is shown as the card label
featured: true # optional, puts the article in the large hero slot
kind: 'مراجعة' # optional badge, e.g. دليل / شرح / مقال تحليلي
author: 'اسم الكاتب' # optional, defaults to فريق PLAYZONE AR
image: /img/my-cover.jpg # put the file in public/img/
imageAlt: 'وصف الصورة'
---

نص المقال بصيغة Markdown…

> blockquotes render as the orange editorial notice box.
```

Reading time is calculated from the text automatically. Use the same spelling for a category in every article (for example `PlayStation`, not `Playstation`).

## Run locally

```bash
pnpm install
netlify dev        # or: pnpm dev
pnpm test          # unit tests for content parsing, search, dates and reading time
```

## Ideas for later

- Pagination or "load more" once there are many articles
- An RSS feed and a sitemap
- Author pages, and tags in addition to categories
- A newsletter signup through Netlify Forms
- A headless CMS so editors can publish without touching Git
