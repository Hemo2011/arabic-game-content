import { Link } from '@tanstack/react-router'

import { allPosts } from 'content-collections'
import { getCategories } from '@/lib/blog'
import { chipCategories } from '@/lib/site'

/** Category filter chips; "الكل" links home, the rest to category pages. */
export function CategoryChips({ selected }: { selected?: string }) {
  const used = getCategories(allPosts)
  // Configured order first, then any new categories authors introduce.
  const categories = [
    ...chipCategories.filter((c) => used.includes(c)),
    ...used.filter((c) => !chipCategories.includes(c)),
  ]
  return (
    <nav aria-label="تصفية حسب القسم" className="categories">
      <Link
        to="/"
        hash="latest"
        className="cat"
        aria-current={selected ? undefined : 'page'}
      >
        الكل
      </Link>
      {categories.map((category) => (
        <Link
          key={category}
          to="/category/$category"
          params={{ category }}
          hash="latest"
          className="cat"
          aria-current={selected === category ? 'page' : undefined}
        >
          {category}
        </Link>
      ))}
    </nav>
  )
}
