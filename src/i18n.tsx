import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'

// ─────────────────────────────────────────────────────────
// Язык интерфейса: RU / EN.
//
// Выбор хранится в localStorage. Первый визит — определяем по языку
// браузера (английский → en, иначе ru). Компоненты держат свои тексты
// локально в объекте { ru, en } и берут нужный по текущему языку через
// хук useLang().
// ─────────────────────────────────────────────────────────

export type Lang = 'ru' | 'en'

const STORAGE_KEY = 'vbi_lang'

function detectInitialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'ru' || saved === 'en') return saved
  } catch { /* localStorage может быть недоступен */ }
  try {
    if ((navigator.language || '').toLowerCase().startsWith('en')) return 'en'
  } catch { /* navigator может быть недоступен */ }
  return 'ru'
}

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
}

const Ctx = createContext<LangCtx | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => detectInitialLang())

  // Держим <html lang> в актуальном состоянии — для доступности и SEO
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try { localStorage.setItem(STORAGE_KEY, l) } catch { /* не критично */ }
  }, [])

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>
}

export function useLang() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useLang must be used inside LangProvider')
  return c
}

// Хелпер для компонентов: берёт словарь { ru, en } и отдаёт нужный.
export function useT<T>(strings: { ru: T; en: T }): T {
  const { lang } = useLang()
  return strings[lang]
}

// ─────────────────────────────────────────────────────────
// Переключатель языка — золотой pill-тумблер RU | EN.
// ─────────────────────────────────────────────────────────
export function LangSwitch({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLang()
  const langs: Lang[] = ['ru', 'en']
  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-full border border-gold-300/50 bg-cream-50/70 backdrop-blur-sm p-0.5 ${className}`}
      role="group"
      aria-label="Language / Язык"
    >
      {langs.map(l => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-2.5 py-1 rounded-full text-xs font-sans font-semibold tracking-[0.12em] uppercase transition-all duration-200 ${
            lang === l
              ? 'bg-gold-500 text-white shadow-sm'
              : 'text-ink-500 hover:text-ink-800'
          }`}
        >
          {l === 'ru' ? 'RU' : 'EN'}
        </button>
      ))}
    </div>
  )
}
