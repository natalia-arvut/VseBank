// Заглушка на время подготовки юридических документов.
// Включается через VITE_MAINTENANCE_MODE=true при сборке.

import Guilloche from '../components/Guilloche'

export default function Maintenance() {
  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 py-12"
      style={{
        background: 'radial-gradient(120% 80% at 30% 30%, #FBF7F0 0%, #F5EFE6 60%, #EFE9DD 100%)',
      }}
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
          Скоро откроемся
        </div>

        {/* Заголовок */}
        <h1 className="font-serif text-3xl md:text-5xl text-ink-900 leading-tight mb-4">
          Настраиваем<br />Квантовое Поле
        </h1>

        <div className="w-12 h-px bg-gold-500 mx-auto mb-6" />

        {/* Текст */}
        <p className="font-sans text-base md:text-lg text-ink-700 leading-relaxed mb-3">
          Сейчас мы готовим юридические документы и финальные настройки, чтобы открыть двери Банка для тебя в полную силу.
        </p>

        <p className="font-serif italic text-base md:text-lg leading-relaxed mb-10" style={{ color: '#9A6F09' }}>
          Изобилие уже движется к тебе. Просто немного терпения.
        </p>

        {/* Контакт */}
        <div className="pt-6 border-t border-gold-300/40">
          <p className="font-sans text-xs md:text-sm text-ink-500 tracking-wide uppercase mb-2">
            Связаться с нами
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
            VseBank · Вселенский Банк Изобилия
          </p>
        </div>
      </div>
    </div>
  )
}
