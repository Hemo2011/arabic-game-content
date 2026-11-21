import { Link } from '@tanstack/react-router'

import { type Post } from 'content-collections'
import { formatDate, readingTimeLabel } from '@/lib/blog'
import { cdnImage, cdnSrcSet } from '@/lib/images'

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="card">
      <Link to="/posts/$slug" params={{ slug: post.slug }}>
        <div className="thumb">
          {post.image && (
            <img
              src={cdnImage(post.image, 640)}
              srcSet={cdnSrcSet(post.image, [400, 640, 960])}
              sizes="(max-width: 560px) 100vw, (max-width: 850px) 50vw, 380px"
              alt=""
              loading="lazy"
              width={640}
              height={380}
            />
          )}
        </div>
        <div className="card-body">
          {post.categories[0] && (
            <span className="tag">{post.categories[0]}</span>
          )}
          <h3>{post.title}</h3>
          <p>{post.summary}</p>
          <div className="meta">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">•</span>
            <span>{readingTimeLabel(post.readingMinutes)}</span>
          </div>
        </div>
      </Link>
    </article>
  )
}

export function PostGrid({
  posts,
  emptyMessage,
}: {
  posts: Post[]
  emptyMessage: React.ReactNode
}) {
  if (!posts.length) return <div className="empty">{emptyMessage}</div>
  return (
    <div className="cards">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
