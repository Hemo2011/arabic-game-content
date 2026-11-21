import { Link, createFileRoute } from '@tanstack/react-router'

import { allPosts } from 'content-collections'

import { CategoryChips } from '@/components/category-chips'
import { Hero } from '@/components/hero'
import { PostGrid } from '@/components/post-card'
import { newestPosts, searchPosts } from '@/lib/blog'
import { siteTitle } from '@/lib/site'

type HomeSearch = { q?: string }

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): HomeSearch => {
    const q = typeof search.q === 'string' ? search.q.trim() : ''
    return q ? { q } : {}
  },
  head: () => ({ meta: [{ title: siteTitle }] }),
  component: HomePage,
})

function HomePage() {
  const { q } = Route.useSearch()
  const posts = newestPosts(allPosts)

  if (q) {
    const results = searchPosts(posts, q)
    return (
      <section className="section wrap" id="latest">
        <div className="section-head">
          <h1>نتائج البحث عن «{q}»</h1>
          <Link to="/">مسح البحث ←</Link>
        </div>
        <CategoryChips />
        <PostGrid
          posts={results}
          emptyMessage={
            <>
              لا توجد مقالات تطابق بحثك. <Link to="/">تصفح كل المقالات</Link>
            </>
          }
        />
      </section>
    )
  }

  const featured = posts.find((post) => post.featured) ?? posts[0]
  const side = posts.filter((post) => post !== featured).slice(0, 2)

  return (
    <>
      {featured && <Hero main={featured} side={side} />}
      <section className="section wrap" id="latest">
        <div className="section-head">
          <h2>أحدث المقالات</h2>
          <Link to="/" hash="latest">
            عرض الكل ←
          </Link>
        </div>
        <CategoryChips />
        <PostGrid
          posts={posts}
          emptyMessage="لم تُنشر أي مقالات بعد. تابعنا قريباً."
        />
      </section>
      <div className="wrap">
        <div className="feature-band">
          <div>
            <h2>عالم الألعاب.. باللغة العربية</h2>
            <p>أخبار، مراجعات، تحليلات، وشروحات تساعدك تختار لعبتك القادمة.</p>
          </div>
          <Link to="/" hash="latest" className="btn">
            استكشف المقالات
          </Link>
        </div>
      </div>
    </>
  )
}
