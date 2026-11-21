import { Link, createFileRoute } from '@tanstack/react-router'

import { allPosts } from 'content-collections'

import {
  findPost,
  formatDate,
  readingTimeLabel,
  relatedPosts,
} from '@/lib/blog'
import { cdnImage, cdnSrcSet } from '@/lib/images'
import { defaultAuthor, siteName, siteUrl } from '@/lib/site'

export const Route = createFileRoute('/posts/$slug')({
  loader: async ({ params }) => {
    const post = findPost(allPosts, params.slug)
    return { post, related: relatedPosts(allPosts, post) }
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post
    if (!post) return { meta: [] }
    return {
      meta: [
        { title: `${post.title} | ${siteName}` },
        { name: 'description', content: post.summary },
        { property: 'og:title', content: post.title },
        { property: 'og:description', content: post.summary },
        { property: 'og:type', content: 'article' },
        ...(post.image
          ? [
              {
                property: 'og:image',
                content: `${siteUrl}${cdnImage(post.image, 1200)}`,
              },
            ]
          : []),
        {
          property: 'article:published_time',
          content: `${post.date}T00:00:00Z`,
        },
        ...(post.updated
          ? [
              {
                property: 'article:modified_time',
                content: `${post.updated}T00:00:00Z`,
              },
            ]
          : []),
        ...post.categories.map((category) => ({
          property: 'article:tag',
          content: category,
        })),
      ],
    }
  },
  component: ArticlePage,
})

function ArticlePage() {
  const { post, related } = Route.useLoaderData()
  const readingTime = readingTimeLabel(post.readingMinutes)

  return (
    <article className="article-view">
      <div className="wrap">
        <Link to="/" className="back-link">
          → العودة للرئيسية
        </Link>
        <header className="article-head">
          <span className="eyebrow">
            {post.categories[0]} · {formatDate(post.date)}
          </span>
          <h1>{post.headline ?? post.title}</h1>
          <p className="lede">{post.lede ?? post.summary}</p>
        </header>
        {post.image && (
          <div className="article-cover">
            <img
              src={cdnImage(post.image, 1400)}
              srcSet={cdnSrcSet(post.image, [700, 1100, 1400, 1800])}
              sizes="(max-width: 1196px) 100vw, 1160px"
              alt={post.imageAlt ?? ''}
              width={1400}
              height={410}
              fetchPriority="high"
            />
          </div>
        )}
        <div className="article-layout">
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <aside className="sidebar">
            <div className="sidebar-box">
              <h2>تفاصيل المقال</h2>
              <dl>
                <div>
                  <dt>القسم: </dt>
                  <dd>
                    {post.categories.map((category, i) => (
                      <span key={category}>
                        {i > 0 && '، '}
                        <Link to="/category/$category" params={{ category }}>
                          {category}
                        </Link>
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt>تاريخ النشر: </dt>
                  <dd>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </dd>
                </div>
                <div>
                  <dt>مدة القراءة: </dt>
                  <dd>{readingTime}</dd>
                </div>
                {post.kind && (
                  <div>
                    <dt>النوع: </dt>
                    <dd>{post.kind}</dd>
                  </div>
                )}
                <div>
                  <dt>تحرير: </dt>
                  <dd>{post.author ?? defaultAuthor}</dd>
                </div>
                {post.updated && (
                  <div>
                    <dt>آخر تحديث: </dt>
                    <dd>
                      <time dateTime={post.updated}>
                        {formatDate(post.updated)}
                      </time>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
            {related.length > 0 && (
              <div className="sidebar-box">
                <h2>اقرأ أيضاً</h2>
                <ul className="related">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link to="/posts/$slug" params={{ slug: item.slug }}>
                        <span>{item.categories[0]}</span>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </article>
  )
}
