import { useEffect, useState } from 'react'
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearch,
} from '@tanstack/react-router'

import { allPosts } from 'content-collections'
import { formatToday, newestPosts } from '@/lib/blog'
import { navCategories, siteTagline } from '@/lib/site'

export function SiteHeader() {
  const location = useLocation()
  const navigate = useNavigate()
  const urlQuery = useSearch({ strict: false }).q ?? ''
  const [query, setQuery] = useState(urlQuery)
  const [menuOpen, setMenuOpen] = useState(false)
  const latest = newestPosts(allPosts)[0]
  const isHome = location.pathname === '/'
  const activeCategory = useParams({ strict: false }).category

  // Keep the box in sync when the URL changes (back button, chip links…).
  // Compare trimmed values so live typing keeps its trailing spaces.
  useEffect(
    () =>
      setQuery((current) => (current.trim() === urlQuery ? current : urlQuery)),
    [urlQuery],
  )
  // Close the mobile menu after navigating.
  useEffect(() => setMenuOpen(false), [location.pathname])

  function search(value: string, live: boolean) {
    const q = value.trim()
    void navigate({
      to: '/',
      search: q ? { q } : {},
      hash: live ? undefined : 'latest',
      replace: live,
      resetScroll: !live,
    })
  }

  return (
    <>
      <div className="topline">
        <div className="wrap">
          <span suppressHydrationWarning>{formatToday()}</span>
          <span>{siteTagline}</span>
        </div>
      </div>
      <header className="site-header">
        <div className="wrap nav">
          <Link to="/" className="brand" aria-label="PLAYZONE AR — الرئيسية">
            <span className="brand-mark" aria-hidden="true">
              P
            </span>
            <span>
              PLAYZONE <span className="brand-accent">AR</span>
            </span>
          </Link>
          <nav
            id="main-nav"
            aria-label="الأقسام الرئيسية"
            className={`main-nav${menuOpen ? ' open' : ''}`}
          >
            <Link
              to="/"
              aria-current={isHome && !urlQuery ? 'page' : undefined}
            >
              الرئيسية
            </Link>
            <Link to="/" hash="latest">
              آخر الأخبار
            </Link>
            {navCategories.map((category) => (
              <Link
                key={category}
                to="/category/$category"
                params={{ category }}
                aria-current={activeCategory === category ? 'page' : undefined}
                className="ltr"
              >
                {category}
              </Link>
            ))}
          </nav>
          <div className="nav-actions">
            <form
              role="search"
              onSubmit={(event) => {
                event.preventDefault()
                search(query, false)
              }}
            >
              <label htmlFor="site-search" className="sr-only">
                ابحث في المقالات
              </label>
              <input
                id="site-search"
                type="search"
                className="search"
                placeholder="ابحث في الأخبار..."
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  // Filter live on the homepage; elsewhere wait for Enter.
                  if (isHome) search(event.target.value, true)
                }}
              />
            </form>
            <button
              type="button"
              className="menu-btn"
              aria-expanded={menuOpen}
              aria-controls="main-nav"
              aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>
      {latest && (
        <div className="breaking">
          <div className="wrap">
            <strong>آخر الأخبار</strong>
            <Link to="/posts/$slug" params={{ slug: latest.slug }}>
              {latest.title}
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
