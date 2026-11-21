/**
 * Serve a public image through the Netlify Image CDN at a given width,
 * so pages never ship the full-resolution original.
 */
export function cdnImage(src: string, width: number) {
  if (!src.startsWith('/')) return src
  const params = new URLSearchParams({
    url: src,
    w: String(width),
    fm: 'webp',
    q: '75',
  })
  return `/.netlify/images?${params.toString()}`
}

export function cdnSrcSet(src: string, widths: number[]) {
  return widths.map((w) => `${cdnImage(src, w)} ${w}w`).join(', ')
}
