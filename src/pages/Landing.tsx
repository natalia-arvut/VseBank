import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import VseBankLogo from '../components/VseBankLogo'
import LandingReviews from '../components/LandingReviews'
import LegalFooter from '../components/LegalFooter'
import LegalModal from '../components/LegalModal'

export default function Landing() {
  const navigate = useNavigate()
  const [quickName, setQuickName] = useState('')
  const [quickEmail, setQuickEmail] = useState('')
  const [rulesOpen, setRulesOpen] = useState(false)
  const [sourcesOpen, setSourcesOpen] = useState(false)
  // Есть ли одобренные отзывы — нужно для сохранения цветового ритма:
  // если блок Отзывов рендерится, финальный CTA становится тёплым (#FBF7F0).
  // Если нет — CTA остаётся светлым (#FDFDFD), как было.
  const [hasReviews, setHasReviews] = useState(false)

  const handleQuickStart = () => {
    // Сохраняем намерение и редиректим на регистрацию
    localStorage.setItem('vbi_intent', JSON.stringify({
      name: quickName.trim(),
      email: quickEmail.trim().toLowerCase(),
    }))
    navigate('/register')
  }

  return (
    <div className="min-h-screen bg-cream-100 font-sans">

      {/* Верхняя плашка */}
      <nav className="absolute top-0 left-0 right-0 z-30 py-4 md:py-6">
        <div className="site-container flex items-start justify-between gap-4">
          <div className="flex flex-col min-w-0 -mt-2">
            {/* Отрицательный margin-left сдвигает PNG-логотип так, чтобы
                буква «V» оказалась на одной линии с «Р» в тексте ниже */}
            <div className="-ml-2 md:-ml-3">
              <VseBankLogo size="md" />
            </div>
            <div className="font-sans text-xs sm:text-sm text-gold-600 font-medium tracking-[0.2em] uppercase mt-2">
              Реальность, созданная тобой
            </div>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="btn-cream text-[10px] sm:text-xs px-4 sm:px-6 py-2 sm:py-2.5 flex-shrink-0"
          >
            Войти
          </button>
        </div>
      </nav>

      {/* Hero — картинка везде, на мобайле полупрозрачная плашка с текстом поверх */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: '100vh', backgroundColor: '#F5EFE6' }}>

        {/* Картинка — везде, на мобайле тоже */}
        <img
          src={`${import.meta.env.BASE_URL}hero-cover.png`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none hero-image"
          draggable={false}
        />

        {/* HTML-контент */}
        <div className="absolute inset-0 flex items-center pt-20 md:pt-20 pb-8 md:pb-0">
          <div className="site-container">
            {/* Плашка с полупрозрачным фоном — на мобайле и планшете */}
            <div className="max-w-xl text-left bg-cream-100/75 lg:bg-transparent backdrop-blur-[3px] lg:backdrop-blur-0 rounded-2xl lg:rounded-none p-5 md:p-7 lg:p-0 border border-gold-300/30 lg:border-0">

              {/* Заголовок */}
              <h1 className="font-serif mb-5 md:mb-6 text-left">
                <span className="block font-sans font-normal text-base md:text-xl lg:text-2xl text-ink-700 mb-2 tracking-wide">
                  Добро пожаловать во
                </span>
                <span className="block text-[2.75rem] sm:text-5xl md:text-5xl lg:text-6xl leading-[1.08] font-medium tracking-normal text-ink-900">
                  Вселенский
                </span>
                <span className="block text-[2.75rem] sm:text-5xl md:text-5xl lg:text-6xl leading-[1.08] font-medium tracking-normal text-ink-900">
                  Банк Изобилия
                </span>
              </h1>

              {/* Декоративная линия */}
              <div className="w-12 h-px bg-gold-500 mb-5 md:mb-6" />

              {/* Цитата */}
              <p className="font-sans text-ink-700 text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-md font-normal">
                Бог не знает нехватки. Вселенная знает только одно слово: «ДА». Твоё пространство изобилия открыто с самого рождения, но пользовался ли ты им?
              </p>

              {/* Кнопка — высокая, как в последнем блоке */}
              <button
                onClick={() => navigate('/register')}
                className="btn-gold inline-flex items-center justify-center text-sm md:text-base px-8 md:px-10 py-4 w-full sm:w-auto whitespace-nowrap"
              >
                Открыть моё пространство
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Секция «О чём этот симулятор» — фон как в левом верхнем углу обложки */}
      <section className="py-20 border-t border-gold-300/20" style={{ backgroundColor: '#FDFDFD' }}>
        <div className="site-container">

          {/* Заголовок — ПО ЦЕНТРУ (как во всех блоках) */}
          <div className="text-center mb-12">
            <div className="tag mb-3">О продукте</div>
            <h2 className="section-title mb-5">О чём этот симулятор?</h2>
            <div className="w-12 h-px bg-gold-400 mx-auto" />
          </div>

          {/* Текст — на всю ширину контейнера */}
          <div className="space-y-5 mb-16">
            <p className="body-text">
              Большинство людей живут в иллюзии дефицита. Они верят, что ресурсы ограничены, а деньги нужно «тяжело зарабатывать». Но на квантовом уровне реальности всё, что ты можешь себе вообразить, уже существует в виде чистой потенциальности.
            </p>
            <p className="body-text">
              VseBank — <span className="font-serif italic text-lg md:text-2xl" style={{ color: "#9A6F09" }}>не просто игра</span>. Это тренажёр для твоего сознания, созданный на стыке метафизики изобилия и нейропластичности.
            </p>
          </div>

          {/* Шкала прогресса — на мобайле вертикальная схема с стрелками, на десктопе 5 колонок */}
          <div className="flex flex-col items-center md:grid md:grid-cols-5 gap-0 md:gap-2">
            {[
              {
                name: 'Мысль',
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5">
                    {/* Искра/спарк — звёздочка с лучами как символ мысли-озарения */}
                    <path d="M24 8 L24 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    <path d="M24 30 L24 40" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    <path d="M8 24 L18 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    <path d="M30 24 L40 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    <path d="M13.5 13.5 L19 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.7"/>
                    <path d="M29 29 L34.5 34.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.7"/>
                    <path d="M34.5 13.5 L29 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.7"/>
                    <path d="M19 29 L13.5 34.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.7"/>
                    {/* Центральный бриллиант */}
                    <path d="M24 19 L29 24 L24 29 L19 24 Z" fill="currentColor"/>
                  </svg>
                ),
              },
              {
                name: 'Намерение',
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Компас */}
                    <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5" opacity="0.8"/>
                    <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
                    <path d="M24 10 L28 24 L24 22 L20 24 Z" fill="currentColor"/>
                    <path d="M24 38 L20 24 L24 26 L28 24 Z" fill="currentColor" opacity="0.5"/>
                    <circle cx="24" cy="24" r="2" fill="currentColor"/>
                    <line x1="24" y1="6" x2="24" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="24" y1="38" x2="24" y2="42" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
                    <line x1="6" y1="24" x2="10" y2="24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
                    <line x1="38" y1="24" x2="42" y2="24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
                  </svg>
                ),
              },
              {
                name: 'Квантовый потенциал',
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Атом / квантовые орбиты */}
                    <circle cx="24" cy="24" r="3.5" fill="currentColor"/>
                    <ellipse cx="24" cy="24" rx="18" ry="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <ellipse cx="24" cy="24" rx="18" ry="7" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(60 24 24)"/>
                    <ellipse cx="24" cy="24" rx="18" ry="7" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(-60 24 24)"/>
                    <circle cx="42" cy="24" r="1.8" fill="currentColor"/>
                    <circle cx="15" cy="9" r="1.4" fill="currentColor" opacity="0.8"/>
                    <circle cx="15" cy="39" r="1.4" fill="currentColor" opacity="0.8"/>
                  </svg>
                ),
              },
              {
                name: 'Действие',
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Молния */}
                    <path d="M26 6 L14 26 L22 26 L20 42 L34 22 L26 22 Z"
                      stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2"
                      strokeLinejoin="round" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                name: 'Изобилие',
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Восьмиконечная звезда */}
                    <path d="M24 4 L26 18 L40 16 L28 24 L40 32 L26 30 L24 44 L22 30 L8 32 L20 24 L8 16 L22 18 Z"
                      stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2"
                      strokeLinejoin="round"/>
                    <circle cx="24" cy="24" r="3.5" fill="currentColor"/>
                  </svg>
                ),
              },
            ].map((step, i, arr) => (
              <div key={step.name} className="contents md:contents">
                <div className="flex flex-col items-center text-center">
                  {/* Иконка в золотом круге */}
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-gold-500 bg-gold-500/5 flex items-center justify-center text-gold-500 mb-2 md:mb-3 shadow-gold">
                    <div className="w-8 h-8 md:w-11 md:h-11">
                      {step.icon}
                    </div>
                  </div>
                  {/* Название под иконкой */}
                  <div className="font-sans text-xs text-gold-700 tracking-[0.15em] uppercase font-medium">
                    {step.name}
                  </div>
                </div>
                {/* Стрелка между этапами (только мобайл) */}
                {i < arr.length - 1 && (
                  <svg className="md:hidden my-2 text-gold-500" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                  </svg>
                )}
                {/* Линия между на десктопе */}
                {i < arr.length - 1 && (
                  <div className="hidden md:block self-center w-2 h-px bg-gold-400/40 absolute" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Секция «Как это работает» — светлый фон в тон обложки */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#FBF7F0' }}>
        {/* Декоративные орнаменты — звёздочки как на обложке */}
        <div className="absolute top-10 right-[10%] opacity-30">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 4 L22 18 L36 16 L24 22 L36 28 L22 26 L20 40 L18 26 L4 28 L16 22 L4 16 L18 18 Z" fill="#D4B87A" opacity="0.6"/>
          </svg>
        </div>
        <div className="absolute top-1/4 left-[8%] opacity-20">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <circle cx="15" cy="15" r="2" fill="#B89058"/>
            <ellipse cx="15" cy="15" rx="12" ry="4" stroke="#B89058" strokeWidth="0.5" opacity="0.5"/>
          </svg>
        </div>

        <div className="site-container relative z-10">
          <div className="text-center mb-12">
            <div className="tag mb-3">Как это работает</div>
            <h2 className="section-title mb-5">Две ступени к изобилию</h2>
            <div className="w-12 h-px bg-gold-400 mx-auto mb-5" />
            <p className="body-text italic">Ты не просишь. Ты вспоминаешь. Ты принимаешь.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            {/* Карточка 1 — Осознание Своего Права */}
            <div className="bg-white/40 backdrop-blur-sm border border-gold-400/30 p-10 rounded-2xl shadow-card">
              {/* Номер + линия (без задвоенных звёздочек) */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full border border-gold-500/50 flex items-center justify-center">
                  <span className="font-serif text-gold-700 text-sm">01</span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-gold-400/60 to-transparent" />
              </div>

              <h3 className="card-title mb-3">Осознание<br />Своего Права</h3>
              <div className="w-10 h-px bg-gold-500 mb-6" />

              {/* Иллюстрация — золотой храм с бесконечностью */}
              <div className="flex justify-center my-6">
                <img
                  src={`${import.meta.env.BASE_URL}card-awareness.jpg`}
                  alt="Осознание Своего Права"
                  className="w-full max-w-sm aspect-square object-cover shadow-card"
                  style={{ borderRadius: '15px' }}
                />
              </div>

              <p className="body-text">
                Ты — сотворец своей реальности, искра Божественного сознания. Вселенский Банк не выдаёт кредиты и не требует залогов. Его баланс — бесконечен, потому что бесконечен Источник.
              </p>
              <p className="body-text mt-4">
                Переводя деньги отсюда на свой «физический» счёт, ты заявляешь Вселенной: «Я готов принять то, что уже принадлежит мне по праву рождения».
              </p>
            </div>

            {/* Карточка 2 — Перепрошивка Разума */}
            <div className="bg-white/40 backdrop-blur-sm border border-gold-400/30 p-10 rounded-2xl shadow-card">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full border border-gold-500/50 flex items-center justify-center">
                  <span className="font-serif text-gold-700 text-sm">02</span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-gold-400/60 to-transparent" />
              </div>

              <h3 className="card-title mb-3">Перепрошивка<br />Разума</h3>
              <div className="w-10 h-px bg-gold-500 mb-6" />

              {/* Иллюстрация — золотая голова с бесконечностью внутри */}
              <div className="flex justify-center my-6">
                <img
                  src={`${import.meta.env.BASE_URL}card-mind.jpg`}
                  alt="Перепрошивка Разума"
                  className="w-full max-w-sm aspect-square object-cover shadow-card"
                  style={{ borderRadius: '15px' }}
                />
              </div>

              <p className="body-text">
                Наш мозг не отличает реальное событие от воображаемого, если оно подкреплено сильной эмоцией. Каждый раз, когда ты совершаешь «виртуальный перевод» и искренне проживаешь благодарность, твой мозг строит новые нейронные связи.
              </p>
              <p className="body-text mt-4">
                Ты перестаёшь транслировать в квантовое поле сигнал «мне не хватает» и начинаешь излучать частоту «у меня уже есть».
              </p>
            </div>
          </div>

          {/* Финальная строка с орнаментом */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <div className="w-16 h-px bg-gold-400/40" />
            <span className="text-gold-500 text-2xl font-serif">∞</span>
            <div className="w-16 h-px bg-gold-400/40" />
          </div>
          <div className="text-center mt-3 tag">
            Изменяя внутреннюю программу, ты изменяешь внешнюю реальность
          </div>
        </div>
      </section>

      {/* Правила пользования — фон как в блоке 2 (#FDFDFD) */}
      <section className="py-20 border-t border-gold-300/20" style={{ backgroundColor: '#FDFDFD' }}>
        <div className="site-container">
          {/* Заголовок ПО ЦЕНТРУ, текст ниже по левому краю */}
          <div className="text-center mb-10">
            <div className="tag mb-3">Правила</div>
            <h2 className="section-title mb-5">Правила пользования пространством</h2>
            <div className="w-12 h-px bg-gold-400 mx-auto mb-6" />
          </div>
          <p className="body-text mb-12">
            Перед тем как активировать перевод, подтверди свою готовность играть по правилам Новой Реальности. Помни: этот интерфейс меняет материю только тогда, когда ты меняешь своё внутреннее состояние.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Три правила — только цифры, чистая композиция */}
            <div className="space-y-10">
              {[
                {
                  n: '01',
                  text: 'Какую сумму ты намерен материализовать? Назови цифру, которая переключит твоё сознание в режим безусловного изобилия и вернёт тебе статус главного архитектора своей жизни.',
                },
                {
                  n: '02',
                  text: 'Инициируй свой первый перевод. Дай Вселенной священную команду «Да будет так!» — и позволь пространству ответить взаимностью.',
                },
                {
                  n: '03',
                  text: 'Сохраняй состояние веры, благодарности и изобилия как основной валюты Вселенной. Празднуй триумф до того, как увидишь его на карте, — и материя подчинится.',
                },
              ].map(({ n, text }) => (
                <div key={n} className="flex gap-6 items-start">
                  {/* Большая цифра золотом */}
                  <div className="font-serif text-5xl text-gold-500 leading-none flex-shrink-0 w-16">{n}</div>
                  <p className="body-text pt-2">{text}</p>
                </div>
              ))}
            </div>

            {/* Форма быстрого открытия пространства */}
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="card-title mb-2">Открой пространство сейчас</h3>
              <p className="body-text mb-6">
                Твоё пространство уже активировано. Тебе осталось только «присвоить» его себе.
              </p>
              <div className="space-y-3">
                <input className="input-field" placeholder="Твоё имя" value={quickName} onChange={e => setQuickName(e.target.value)} />
                <input className="input-field" placeholder="Email" type="email" value={quickEmail} onChange={e => setQuickEmail(e.target.value)} />
                <button
                  onClick={handleQuickStart}
                  className="w-full btn-gold text-center"
                >
                  Открыть пространство →
                </button>
                <button
                  type="button"
                  onClick={() => setRulesOpen(true)}
                  className="block w-full text-center font-sans text-sm text-gold-600 hover:text-gold-700 underline tracking-wider pt-2"
                >
                  Подробнее: пользовательское соглашение и свод правил
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Модалка: полный текст пользовательского соглашения */}
      {rulesOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/70 backdrop-blur-sm p-4 sm:p-6"
          onClick={() => setRulesOpen(false)}
        >
          <div
            className="bg-cream-100 max-w-2xl w-full p-6 sm:p-8 md:p-10 rounded-2xl shadow-gold-lg border border-gold-400/40 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="tag mb-2 text-sm">Пользовательское соглашение</div>
              <h3 className="font-serif text-2xl md:text-3xl text-ink-900">Правила Новой Реальности</h3>
              <div className="w-12 h-px bg-gold-400 mx-auto mt-4" />
            </div>

            <p className="font-sans text-ink-700 leading-relaxed text-center mb-8 px-2">
              Перед тем как активировать перевод, подтверди свою готовность играть по правилам Новой Реальности. Помни: этот интерфейс меняет материю только тогда, когда ты меняешь своё внутреннее состояние.
            </p>

            {/* Оферта Со-Творца */}
            <div className="border-t border-gold-300/40 pt-6 mb-8">
              <div className="text-center mb-5">
                <div className="tag mb-2 text-sm">Оферта Со-Творца</div>
                <h4 className="font-serif text-xl md:text-2xl text-ink-900">Я согласен и принимаю условия</h4>
              </div>

              <p className="font-sans text-sm text-ink-700 leading-relaxed mb-5">
                Нажимая кнопку виртуального перевода, я безоговорочно соглашаюсь со следующими пунктами:
              </p>

              <div className="space-y-6">
                {[
                  ['Признание природы симулятора', 'Я осознаю, что данная страница является цифровым симулятором Квантового Изобилия и тренажёром для моего сознания, а не традиционной финансовой организацией.'],
                  ['Квантовый закон тождества', 'Я понимаю, что мой мозг не отличает реальное событие от воображаемого, если оно подкреплено сильной эмоцией. Я соглашаюсь использовать эту симуляцию как инструмент нейропластичности для перепрошивки своего дефицитарного мышления на частоту достатка.'],
                  ['Ответственность за излучаемый сигнал', 'Я соглашаюсь с тем, что Вселенский Банк не выдаёт кредиты — он лишь воплощает то, чему я внутренне соответствую. Я беру на себя обязательство быть Творцом, а не просителем.'],
                ].map(([title, text]) => (
                  <div key={title}>
                    <h5 className="font-serif text-xl md:text-2xl text-gold-600 mb-2 leading-tight">{title}</h5>
                    <p className="font-sans text-sm text-ink-700 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Свод обязательных правил */}
            <div className="border-t border-gold-300/40 pt-6 mb-8">
              <div className="text-center mb-5">
                <div className="tag mb-2 text-sm">Свод обязательных правил</div>
                <h4 className="font-serif text-xl md:text-2xl text-ink-900">Протокол взаимодействия с Банком Вселенной</h4>
              </div>

              <p className="font-sans text-sm text-ink-700 leading-relaxed mb-5">
                Чтобы транзакции успешно переносились из невидимого поля в плотную материю, соблюдай протокол взаимодействия с Банком Вселенной:
              </p>

              <div className="space-y-6">
                {[
                  ['Правило целевой материализации', 'Запрещено выводить суммы в пустоту или из чувства жадности. Каждая транзакция должна иметь чёткий вектор намерения (здоровье, расширение пространства, эволюция души и т. п.). Вселенная понимает только конкретные задачи, подкреплённые готовностью действовать.'],
                  ['Правило биохимического подтверждения', 'В момент нажатия кнопки «Инициировать перевод» ты обязан запустить по венам химию искреннего триумфа. Твоё тело должно физически ощутить мурашки благодарности за то, что деньги уже у тебя. Без этого эмоционального обеспечения транзакция признаётся пустой ментальной концепцией и отклоняется Квантовым полем.'],
                  ['Правило золотого стандарта', 'Твоя благодарность — главная валюта Вселенной, удерживающая квантовый сигнал. Празднуй триумф до того, как увидишь его на реальной карте, — и материя подчинится.'],
                  ['Защита от системных ошибок', 'Как только ты включаешь контроль, страх или начинаешь судорожно думать «как именно и откуда эти деньги придут ко мне», система расценивает это как сомнение и выдаёт ошибку. Любая попытка эго диктовать Вселенной сценарии проявления мгновенно замораживает транзакцию. Перевёл? Забудь и доверься Пространству.'],
                ].map(([title, text]) => (
                  <div key={title}>
                    <h5 className="font-serif text-xl md:text-2xl text-gold-600 mb-2 leading-tight">{title}</h5>
                    <p className="font-sans text-sm text-ink-700 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="font-sans text-ink-700 leading-relaxed text-center mb-6 px-2">
              Я подтверждаю, что готов сорвать тумблер сомнений. Я вхожу в Квантовое Поле, принимаю правила игры и позволяю невидимому стать моим осязаемым физическим опытом.
            </p>

            <button onClick={() => setRulesOpen(false)} className="w-full btn-gold">
              Принимаю
            </button>
          </div>
        </div>
      )}

      {/* Философский блок — фон как у блока 3 */}
      <section className="py-20" style={{ backgroundColor: '#FBF7F0' }}>
        <div className="site-container">
          {/* Заголовок ПО ЦЕНТРУ над колонками */}
          <div className="text-center mb-12">
            <div className="tag mb-3">Философия</div>
            <h2 className="section-title mb-5">Источник Изобилия: Вспомни, Кто Ты Есть</h2>
            <div className="w-12 h-px bg-gold-400 mx-auto" />
          </div>
          {/* Цитата — на mobile в размер body-text, на десктопе крупнее */}
          <p className="font-serif italic text-lg md:text-2xl leading-relaxed text-center mb-10 md:mb-14" style={{ color: "#9A6F09" }}>
            Ты не просишь Меня об изобилии. Ты просто вспоминаешь, что ты и есть Изобилие. Я — это ты, а ты — это Я. Мы неразделимы. И всё, что создано в этой Вселенной, уже принадлежит тебе по праву Творца.
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="body-text mb-4">
              Представь, что ты перестал быть просто «клиентом» Вселенной или ребёнком, ждущим карманных денег. Осознай монументальную истину: <span className="font-serif italic text-lg md:text-2xl" style={{ color: "#9A6F09" }}>Ты и есть Владелец этой бесконечной империи</span>, а Вселенский Банк — твоё личное, созданное тобой же предприятие.
            </p>

            <p className="body-text mb-4">
              Ты — земное воплощение Бога. Бог есть ты, а ты есть Бог. Через твои желания Высшее Сознание познаёт радость материального творчества, расширения и красоты. Поэтому, когда тебе нужна определённая сумма на новую земную мечту, ты не идёшь умолять о милости внешние силы. Ты просто заходишь в своё собственное Божественное хранилище и забираешь своё.
            </p>

            <p className="body-text">
              Могут ли возникнуть сомнения у Хозяина Банка, когда он подписывает чек самому себе? Будет ли он в панике обновлять баланс, проверяя, «одобрил» ли кто-то транзакцию? Конечно нет. Ты абсолютно спокоен, расслаблен и центрирован, потому что точно знаешь: <span className="font-serif italic text-lg md:text-2xl" style={{ color: "#9A6F09" }}>Твоя Воля — это закон материализации</span>.
            </p>
          </div>
          <div className="relative flex justify-center">
            <img src={`${import.meta.env.BASE_URL}philosophy-image.png`} alt="Философия" className="w-full max-w-md shadow-card" style={{ borderRadius: "15px" }}/>
          </div>
          </div>

          {/* Золотые теги по центру внизу. На mobile — каждая строка центрирована отдельно */}
          <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-4 md:gap-8 mt-12 text-base text-gold-600 tracking-widest uppercase font-medium text-center">
            <span>✦ Ты и есть Изобилие</span>
            <span>✦ Твоя Воля — закон материализации</span>
          </div>

          {/* Кнопка «Источники информации» — открывает модалку */}
          <div className="text-center mt-10">
            <button
              type="button"
              onClick={() => setSourcesOpen(true)}
              className="btn-outline inline-flex items-center justify-center gap-2 text-sm md:text-base px-10 py-4 min-w-[320px] whitespace-nowrap"
            >
              Источники информации
              <span className="text-base leading-none">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Блок «Отзывы» — появляется только если есть одобренные отзывы.
          Фон #FDFDFD сохраняет чередование после Философии (#FBF7F0). */}
      <LandingReviews onLoad={setHasReviews} />

      {/* CTA финальный.
          Если блок отзывов есть → CTA становится тёплым (#FBF7F0).
          Если нет → CTA остаётся светлым (#FDFDFD), как было раньше. */}
      <section
        className="pt-16 pb-28 text-center border-t border-gold-300/20"
        style={{ backgroundColor: hasReviews ? '#FBF7F0' : '#FDFDFD' }}
      >
        <div className="site-container">
          <h2 className="section-title mb-5">Твоё пространство изобилия ждёт тебя</h2>
          <div className="w-12 h-px bg-gold-400 mx-auto mb-6" />
          <p className="body-text mb-10">
            Твоё пространство уже активировано. Тебе осталось только «присвоить» его себе.
            <br />
            Сделай свой первый перевод. Позволь невидимому стать видимым.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="btn-gold inline-flex items-center justify-center text-sm md:text-base px-10 py-4 min-w-[320px] whitespace-nowrap"
          >
            Открыть моё пространство
          </button>
        </div>
      </section>

      {/* Сквозной юридический футер с кнопкой «Далее» в одной полосе */}
      <LegalFooter
        rightAction={
          <button
            onClick={() => navigate('/register')}
            className="font-sans text-sm text-gold-600 hover:text-gold-700 transition-colors whitespace-nowrap"
          >
            Далее →
          </button>
        }
      />

      {/* Модалка «Учителя и книги» — источники, на которых строится мировоззрение проекта */}
      <LegalModal
        open={sourcesOpen}
        onClose={() => setSourcesOpen(false)}
        tag="Источники"
        title="Учителя и книги, вдохновившие нас"
        intro="Три голоса, из которых сложился взгляд на изобилие, лежащий в основе этого симулятора. Открой ссылку, чтобы узнать о каждом."
      >
        <div className="space-y-6">
          {SOURCES.map(s => (
            <article
              key={s.name}
              className="border border-gold-300/40 rounded-2xl p-6 bg-cream-50/60"
            >
              <div className="tag text-xs mb-2">{s.tag}</div>
              <h3 className="font-serif text-2xl text-ink-900 leading-tight mb-1">{s.name}</h3>
              <div className="w-10 h-px bg-gold-500 mb-3" />
              <p className="font-sans text-sm text-ink-700 leading-relaxed mb-4">
                {s.description}
              </p>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-sans text-sm text-gold-600 hover:text-gold-700"
              >
                <span className="underline underline-offset-4">{s.linkLabel}</span>
                <span className="text-base leading-none">→</span>
              </a>
            </article>
          ))}
        </div>
      </LegalModal>

    </div>
  )
}

// ─────────────────────────────────────────────────────────
// Учителя и книги — источники, открываются модалкой из блока Философии.
// ─────────────────────────────────────────────────────────
const SOURCES = [
  {
    tag: 'Книги',
    name: 'Нил Доналд Уолш',
    description:
      'Серия «Беседы с Богом», книги 1–4. Прямой и простой диалог о природе реальности, изобилия и личной воли. Текст, к которому мы возвращаемся снова и снова.',
    linkLabel: 'Открыть на ЛитРес',
    url: 'https://www.litres.ru/book/nil-uolsh/besedy-s-bogom-neobychnyy-dialog-kniga-1-39962388/',
  },
  {
    tag: 'Учитель',
    name: 'Доктор Джо Диспенза',
    description:
      'Нейробиология намерения, медитации и работа с квантовым полем. Объясняет, как мозг учится новой реальности — научная база для всей механики симулятора.',
    linkLabel: 'Перейти на drjoedispenza.com',
    url: 'https://drjoedispenza.com/',
  },
  {
    tag: 'Школа',
    name: 'Школа Михаила Агеева',
    description:
      'Русскоязычная школа сознательной трансформации. Практики работы с убеждениями о деньгах, ресурсе и потоке — на близком и понятном языке.',
    linkLabel: 'Перейти на сайт школы',
    url: 'https://mikhail-ageev.ru',
  },
] as const
