import { useEffect } from 'react'
import type { ReactNode } from 'react'

// Модальное окно для юридических документов и подобного контента.
// Стиль повторяет существующую модалку «Манифест Со-Творца» на регистрации.

interface LegalModalProps {
  open: boolean
  onClose: () => void
  tag: string
  title: string
  intro?: string
  children: ReactNode
}

export default function LegalModal({ open, onClose, tag, title, intro, children }: LegalModalProps) {
  // ESC закрывает модалку
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Блокируем прокрутку body, пока модалка открыта
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-stone-900/70 backdrop-blur-sm p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-cream-100 max-w-2xl w-full p-6 sm:p-8 md:p-10 rounded-2xl shadow-gold-lg border border-gold-400/40 max-h-[92vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка-крестик в правом верхнем углу */}
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center text-ink-500 hover:text-ink-900 transition-colors rounded-full hover:bg-gold-300/20"
        >
          <span className="text-xl leading-none">×</span>
        </button>

        {/* Шапка */}
        <div className="text-center mb-6 pr-6">
          <div className="tag mb-2 text-sm">{tag}</div>
          <h2 className="font-serif text-2xl md:text-3xl text-ink-900 leading-tight">{title}</h2>
          <div className="w-12 h-px bg-gold-400 mx-auto mt-4" />
          {intro && (
            <p className="font-sans text-sm text-ink-500 mt-4 leading-relaxed">
              {intro}
            </p>
          )}
        </div>

        {/* Контент документа */}
        <div className="font-sans text-ink-700 leading-relaxed space-y-6 text-[15px] md:text-base text-left">
          {children}
        </div>

        {/* Кнопка закрытия снизу */}
        <div className="mt-8 text-center">
          <button onClick={onClose} className="btn-outline px-10">
            Закрыть
          </button>
        </div>
      </div>
    </div>
  )
}
