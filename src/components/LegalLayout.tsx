import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import VseBankLogo from './VseBankLogo'
import LegalFooter from './LegalFooter'

// Обёртка для страниц с юридическими документами: пользовательское
// соглашение, политика конфиденциальности, cookie, дисклеймер.
//
// Дизайн минималистичный, в едином стиле сайта:
// top-bar с логотипом, заголовок с тэгом и золотой линией, контент,
// сквозной юридический футер.

interface LegalLayoutProps {
  tag: string                // короткий тэг над заголовком, например «Документ»
  title: string              // основной H1
  intro?: string             // короткое вступление под заголовком (опционально)
  children: ReactNode        // основное содержимое документа
}

export default function LegalLayout({ tag, title, intro, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      {/* Top bar */}
      <header className="border-b border-gold-300/30 bg-cream-100/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="block">
            <VseBankLogo size="sm" />
          </Link>
          <Link
            to="/"
            className="font-sans text-xs text-gold-700 hover:text-gold-900 underline-offset-2 hover:underline"
          >
            ← на главную
          </Link>
        </div>
      </header>

      {/* Контент */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12 md:py-16">
        <div className="mb-10">
          <div className="tag mb-3">{tag}</div>
          <h1 className="font-serif text-3xl md:text-4xl text-ink-900 leading-tight mb-3">
            {title}
          </h1>
          <div className="w-12 h-px bg-gold-500" />
          {intro && (
            <p className="font-sans text-sm text-ink-500 mt-5 leading-relaxed max-w-2xl">
              {intro}
            </p>
          )}
        </div>

        <article className="legal-content font-sans text-ink-700 leading-relaxed space-y-6 text-[15px] md:text-base">
          {children}
        </article>
      </main>

      <LegalFooter />
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// Маленькие хелперы для разметки документов в едином стиле
// ─────────────────────────────────────────────────────────

export function LegalSection({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-serif text-xl md:text-2xl text-ink-900 mb-3 leading-tight">
        <span className="text-gold-700 mr-2">{number}.</span>
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  )
}

export function LegalItem({ number, children }: { number: string; children: ReactNode }) {
  return (
    <p className="leading-relaxed">
      <span className="font-medium text-ink-900 mr-1.5">{number}.</span>
      <span>{children}</span>
    </p>
  )
}

export function LegalParagraph({ children }: { children: ReactNode }) {
  return <p className="leading-relaxed">{children}</p>
}
