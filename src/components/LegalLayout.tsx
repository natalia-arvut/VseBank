import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useT } from '../i18n'
import VseBankLogo from './VseBankLogo'
import LegalFooter from './LegalFooter'

// Обёртка для страниц с юридическими документами.
// Использует контент-компоненты из legalContent.tsx — тот же контент
// рендерится и здесь, и в модалках LegalModal.

interface LegalLayoutProps {
  tag: string
  title: string
  intro?: string
  children: ReactNode
}

export default function LegalLayout({ tag, title, intro, children }: LegalLayoutProps) {
  const t = useT({ ru: { backHome: '← на главную' }, en: { backHome: '← Home' } })
  return (
    <div className="bg-cream-50">
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
            {t.backHome}
          </Link>
        </div>
      </header>

      {/* Контент */}
      <main className="max-w-4xl w-full mx-auto px-6 py-10 md:py-14">
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

        <article className="font-sans text-ink-700 leading-relaxed space-y-6 text-[15px] md:text-base">
          {children}
        </article>
      </main>

      <LegalFooter />
    </div>
  )
}

// Реэкспорт хелперов разметки — для удобства, чтобы не плодить импорты
export { LegalSection, LegalItem, LegalParagraph } from './legalContent'
