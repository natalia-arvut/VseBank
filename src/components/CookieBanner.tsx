import { useEffect, useState } from 'react'
import { useT } from '../i18n'
import LegalModal from './LegalModal'
import { useCookiesMeta, CookiesContent } from './legalContent'

// ─────────────────────────────────────────────────────────
// Cookie-баннер согласия (GDPR-style).
//
// Показывается один раз при первом заходе. Запоминает выбор пользователя
// в localStorage и больше не появляется. Согласие требуется в ЕС и Швейцарии.
//
// Ключ: vsebank_cookie_consent = 'accepted' | 'declined'.
// «Подробнее» — открывает модалку с полной Cookie-политикой.
//
// На максентенансе и в админке тоже показывается — закон требует на всех
// страницах, где сайт ставит cookie (а сессию Supabase Auth они ставят сразу).
// ─────────────────────────────────────────────────────────

const STORAGE_KEY = 'vsebank_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const cookiesMeta = useCookiesMeta()
  const t = useT({
    ru: {
      ariaLabel: 'Согласие на cookie',
      tag: 'Cookie',
      title: 'Мы используем cookie',
      text: 'Технические cookie нужны, чтобы работал твой личный кабинет. Аналитические — чтобы понимать, как улучшить игру. Никаких банковских данных в них нет.',
      learnMore: 'Подробнее',
      accept: 'Принять',
      decline: 'Отклонить',
    },
    en: {
      ariaLabel: 'Cookie consent',
      tag: 'Cookie',
      title: 'We use cookies',
      text: 'Essential cookies keep your account working. Analytics ones help us understand how to improve the game. They hold no banking data.',
      learnMore: 'Learn more',
      accept: 'Accept',
      decline: 'Decline',
    },
  })

  useEffect(() => {
    // Откладываем чтение localStorage в effect — чтобы не было flash на SSR.
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (!saved) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  const setChoice = (choice: 'accepted' | 'declined') => {
    try {
      localStorage.setItem(STORAGE_KEY, choice)
    } catch {
      // если localStorage недоступен — просто скрываем баннер для этой сессии
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <>
      {/* Подложка-затемнение, чтобы баннер был визуально отделён */}
      <div
        className="fixed inset-x-0 bottom-0 z-[55] pointer-events-none"
        aria-hidden
      >
        <div className="h-24 bg-gradient-to-t from-stone-900/15 to-transparent" />
      </div>

      {/* Сам баннер — справа снизу на десктопе, во всю ширину снизу на mobile */}
      <div
        className="fixed left-3 right-3 bottom-3 md:left-auto md:right-5 md:bottom-5 md:max-w-md z-[60]"
        role="dialog"
        aria-label={t.ariaLabel}
      >
        <div className="bg-cream-50 border border-gold-400/50 rounded-2xl shadow-gold-lg p-5 md:p-6">
          <div className="flex items-start gap-3 mb-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gold-500/15 border border-gold-400/40 flex items-center justify-center">
              <span className="font-serif text-gold-700 text-lg leading-none">✦</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="tag text-xs mb-1">{t.tag}</div>
              <h2 className="font-serif text-lg md:text-xl text-ink-900 leading-tight">
                {t.title}
              </h2>
            </div>
          </div>

          <div className="w-10 h-px bg-gold-400 mb-3" />

          <p className="font-sans text-[13px] md:text-sm text-ink-700 leading-relaxed mb-4">
            {t.text}{' '}
            <button
              type="button"
              onClick={() => setDetailsOpen(true)}
              className="text-gold-700 hover:text-gold-900 underline-offset-2 underline cursor-pointer"
            >
              {t.learnMore}
            </button>
          </p>

          <div className="flex flex-row gap-2">
            <button
              onClick={() => setChoice('accepted')}
              className="flex-1 btn-gold text-sm py-2.5 px-4 whitespace-nowrap"
            >
              {t.accept}
            </button>
            <button
              onClick={() => setChoice('declined')}
              className="flex-1 btn-outline text-sm py-2.5 px-4 whitespace-nowrap"
            >
              {t.decline}
            </button>
          </div>
        </div>
      </div>

      {/* Модалка с полным текстом политики Cookie */}
      <LegalModal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        tag={cookiesMeta.tag}
        title={cookiesMeta.title}
        intro={cookiesMeta.intro}
      >
        <CookiesContent />
      </LegalModal>
    </>
  )
}
