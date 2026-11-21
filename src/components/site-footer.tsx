import { siteName } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-row">
        <div>
          <div className="footer-brand">
            PLAYZONE <span className="brand-accent">AR</span>
          </div>
          <p>
            <span className="ltr">{siteName}</span> منصة للأخبار والمقالات
            العربية المتخصصة في ألعاب الفيديو. نهدف إلى تقديم محتوى واضح، ممتع،
            ودقيق لعشاق الألعاب.
          </p>
        </div>
        <div>
          © {new Date().getUTCFullYear()}{' '}
          <span className="ltr">{siteName}</span> — جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  )
}
