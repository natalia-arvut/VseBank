import { Link } from 'react-router-dom'

// Сквозной юридический футер. Подключается на лендинге, логине, регистрации,
// в кабинете и на странице maintenance — чтобы документы были доступны всегда.

const LINKS = [
  { to: '/terms', label: 'Пользовательское соглашение' },
  { to: '/privacy', label: 'Политика конфиденциальности' },
  { to: '/cookies', label: 'Политика Cookie' },
  { to: '/disclaimer', label: 'Дисклеймер' },
]

export default function LegalFooter() {
  return (
    <footer className="border-t border-gold-300/30 bg-cream-100/60 py-6 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-sans text-[11px] md:text-xs text-ink-500 leading-relaxed text-center md:text-left">
          © {new Date().getFullYear()} VseBank. Все права защищены. Сайт является интерактивной игрой-симулятором.
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-2 font-sans text-[11px] md:text-xs text-ink-500">
          {LINKS.map((l, i) => (
            <span key={l.to} className="flex items-center gap-3">
              <Link
                to={l.to}
                className="text-gold-700 hover:text-gold-900 underline-offset-2 hover:underline transition-colors"
              >
                {l.label}
              </Link>
              {i < LINKS.length - 1 && <span className="text-gold-400/60 select-none">·</span>}
            </span>
          ))}
          <span className="text-gold-400/60 select-none hidden md:inline">·</span>
          <span className="w-full md:w-auto text-center md:text-left mt-1 md:mt-0">
            Связь:{' '}
            <a
              href="mailto:vsebank.space@gmail.com"
              className="text-gold-700 hover:text-gold-900 underline-offset-2 hover:underline"
            >
              vsebank.space@gmail.com
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
