import { notFound } from '@tanstack/react-router'

type PostSummary = { slug: string; date: string; categories: string[] }

export function newestPosts<T extends PostSummary>(posts: readonly T[]) {
  return [...posts].sort(
    (a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
  )
}

export function getCategories(posts: readonly PostSummary[]) {
  return [...new Set(posts.flatMap((post) => post.categories))].sort((a, b) =>
    a.localeCompare(b),
  )
}

export function findPost<T extends PostSummary>(
  posts: readonly T[],
  slug: string,
) {
  const post = posts.find((post) => post.slug === slug)
  if (!post) throw notFound()
  return post
}

/** Arabic month names with Western digits, e.g. "21 نوفمبر 2026". */
export function formatDate(date: string) {
  return new Intl.DateTimeFormat('ar-EG-u-nu-latn', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`))
}

/** Full Arabic weekday + date, e.g. "السبت، 21 نوفمبر 2026". */
export function formatToday(now = new Date()) {
  return new Intl.DateTimeFormat('ar-EG-u-nu-latn', {
    dateStyle: 'full',
    timeZone: 'Asia/Riyadh',
  }).format(now)
}

/** Arabic reading-time label with correct number agreement. */
export function readingTimeLabel(minutes: number) {
  if (minutes <= 1) return 'دقيقة قراءة'
  if (minutes === 2) return 'دقيقتا قراءة'
  if (minutes <= 10) return `${minutes} دقائق قراءة`
  return `${minutes} دقيقة قراءة`
}

type SearchablePost = PostSummary & { title: string; summary: string }

/** Case-insensitive match against title, summary, and categories. */
export function searchPosts<T extends SearchablePost>(
  posts: readonly T[],
  query: string,
) {
  const q = query.trim().toLowerCase()
  if (!q) return [...posts]
  return posts.filter((post) =>
    `${post.title} ${post.summary} ${post.categories.join(' ')}`
      .toLowerCase()
      .includes(q),
  )
}

/** Posts sharing a category with `post` first, then the newest others. */
export function relatedPosts<T extends PostSummary>(
  posts: readonly T[],
  post: T,
  limit = 3,
) {
  const others = newestPosts(posts).filter((p) => p.slug !== post.slug)
  const shared = others.filter((p) =>
    p.categories.some((c) => post.categories.includes(c)),
  )
  const rest = others.filter((p) => !shared.includes(p))
  return [...shared, ...rest].slice(0, limit)
}
