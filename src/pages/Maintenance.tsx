// Заглушка на время подготовки юридических документов.
// Включается через VITE_MAINTENANCE_MODE=true при сборке.

import Guilloche from '../components/Guilloche'
import LegalFooter from '../components/LegalFooter'
import { useT } from '../i18n'

export default function Maintenance() {
  const t = useT({
    ru: {
      tag: 'Скоро откроемся',
      titleLine1: 'Настраиваем',
      titleLine2: 'Квантовое Поле',
      lead: 'Сейчас мы готовим юридические документы и финальные настройки, чтобы открыть двери Банка для тебя в полную силу.',
      italic: 'Изобилие уже движется к тебе. Просто немного терпения.',
      contactLabel: 'Связаться с нами',
      signature: 'VseBank · Вселенский Банк Изобилия',
    },
    en: {
      tag: 'Opening soon',
      titleLine1: 'Tuning the',
      titleLine2: 'Quantum Field',
      lead: "We're preparing the legal documents and final settings to open the Bank's doors for you in full.",
      italic: 'Abundance is already on its way to you. Just a little patience.',
      contactLabel: 'Get in touch',
      signature: 'VseBank · Universal Bank of Abundance',
    },
  })
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: 'radial-gradient(120% 80% at 30% 30%, #FBF7F0 0%, #F5EFE6 60%, #EFE9DD 100%)',
      }}
    >
    <div
      className="flex-1 flex items-center justify-center relative overflow-hidden px-6 py-12"
    >
      {/* Гильош — тонкий фоновый узор, как на ценной бумаге */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <Guilloche variant="light" />
      </div>

      {/* Золотая линия сверху и снизу */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: 'linear-gradient(to right, #D4B87A, #B89058, #D4B87A)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{ background: 'linear-gradient(to right, #D4B87A, #B89058, #D4B87A)' }}
      />

      <div className="relative max-w-xl w-full text-center">
        {/* Логотип */}
        <div className="flex justify-center mb-8">
          <img
            src={`${import.meta.env.BASE_URL}logo-vsebank.png`}
            alt="VseBank"
            className="h-24 md:h-32 w-auto"
            draggable={false}
          />
        </div>

        {/* Tag */}
        <div className="font-sans text-xs md:text-sm text-gold-600 tracking-[0.3em] uppercase font-medium mb-4">
          {t.tag}
        </div>

        {/* Заголовок */}
        <h1 className="font-serif text-3xl md:text-5xl text-ink-900 leading-tight mb-4">
          {t.titleLine1}<br />{t.titleLine2}
        </h1>

        <div className="w-12 h-px bg-gold-500 mx-auto mb-6" />

        {/* Текст */}
        <p className="font-sans text-base md:text-lg text-ink-700 leading-relaxed mb-3">
          {t.lead}
        </p>

        <p className="font-serif italic text-base md:text-lg leading-relaxed mb-10" style={{ color: '#9A6F09' }}>
          {t.italic}
        </p>

        {/* Контакт */}
        <div className="pt-6 border-t border-gold-300/40">
          <p className="font-sans text-xs md:text-sm text-ink-500 tracking-wide uppercase mb-2">
            {t.contactLabel}
          </p>
          <a
            href="mailto:vsebank.space@gmail.com"
            className="font-serif text-lg md:text-xl text-gold-600 hover:text-gold-700 underline"
          >
            vsebank.space@gmail.com
          </a>
        </div>

        {/* Подпись */}
        <div className="mt-10 text-center">
          <p className="font-serif text-sm text-ink-500 tracking-wider">
            {t.signature}
          </p>
        </div>
      </div>
    </div>

      {/* Сквозной юридический футер — даже на заглушке ссылки на документы доступны */}
      <LegalFooter />
    </div>
  )
}
