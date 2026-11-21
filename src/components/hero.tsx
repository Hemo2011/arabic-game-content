import { Link } from '@tanstack/react-router'

import { type Post } from 'content-collections'
import { readingTimeLabel } from '@/lib/blog'
import { cdnImage, cdnSrcSet } from '@/lib/images'
import { defaultAuthor } from '@/lib/site'

export function Hero({ main, side }: { main: Post; side: Post[] }) {
  return (
    <section className="hero" aria-label="أبرز المقالات">
      <div className="wrap hero-grid">
        <Link
          to="/posts/$slug"
          params={{ slug: main.slug }}
          className="hero-tile hero-main"
        >
          {main.image && (
            <img
              src={cdnImage(main.image, 1200)}
              srcSet={cdnSrcSet(main.image, [700, 1200, 1600])}
              sizes="(max-width: 850px) 100vw, 680px"
              alt=""
              width={1200}
              height={800}
              fetchPriority="high"
            />
          )}
          <div className="hero-copy">
            <span className="eyebrow">
              <i className="dot" aria-hidden="true" /> تغطية خاصة ·{' '}
              {main.categories[0]}
            </span>
            <h1>{main.title}</h1>
            <p>{main.summary}</p>
            <div className="meta">
              <span>{main.author ?? defaultAuthor}</span>
              <span>{readingTimeLabel(main.readingMinutes)}</span>
              {main.kind && <span className="pill">{main.kind}</span>}
            </div>
          </div>
        </Link>
        {side.length > 0 && (
          <div className="hero-side">
            {side.map((post) => (
              <Link
                key={post.slug}
                to="/posts/$slug"
                params={{ slug: post.slug }}
                className="hero-tile"
              >
                {post.image && (
                  <img
                    src={cdnImage(post.image, 700)}
                    srcSet={cdnSrcSet(post.image, [480, 700, 960])}
                    sizes="(max-width: 850px) 50vw, 440px"
                    alt=""
                    loading="lazy"
                    width={700}
                    height={400}
                  />
                )}
                <div>
                  <span className="eyebrow">{post.categories[0]}</span>
                  <h2>{post.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
