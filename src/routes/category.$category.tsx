import { Link, createFileRoute } from '@tanstack/react-router'

import { allPosts } from 'content-collections'

import { CategoryChips } from '@/components/category-chips'
import { PostGrid } from '@/components/post-card'
import { newestPosts } from '@/lib/blog'
import { siteName } from '@/lib/site'

export const Route = createFileRoute('/category/$category')({
  component: CategoryPage,
  loader: async ({ params }) => {
    const category = params.category
    const posts = allPosts.filter((post) => post.categories.includes(category))
    return { category, posts: newestPosts(posts) }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.category ?? 'القسم'} | ${siteName}` },
      {
        name: 'description',
        content: `أحدث أخبار ومقالات ${loaderData?.category ?? 'الألعاب'} باللغة العربية.`,
      },
    ],
  }),
})

function CategoryPage() {
  const { category, posts } = Route.useLoaderData()
  return (
    <section className="section wrap" id="latest" style={{ paddingTop: 34 }}>
      <div className="section-head">
        <h1>
          قسم <span className="ltr">{category}</span>
        </h1>
        <Link to="/">→ الرئيسية</Link>
      </div>
      <CategoryChips selected={category} />
      <PostGrid
        posts={posts}
        emptyMessage={
          <>
            لا توجد مقالات في هذا القسم بعد.{' '}
            <Link to="/">تصفح كل المقالات</Link>
          </>
        }
      />
    </section>
  )
}
