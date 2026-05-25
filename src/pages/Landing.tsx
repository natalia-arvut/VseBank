import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Crown, Brain } from 'lucide-react'

export default function Landing() {
  const navigate = useNavigate()
  const [quickName, setQuickName] = useState('')
  const [quickEmail, setQuickEmail] = useState('')
  const [quickAmount, setQuickAmount] = useState('')
  const [quickCurrency, setQuickCurrency] = useState('USD')

  const handleQuickStart = () => {
    // Сохраняем намерение и редиректим на регистрацию
    localStorage.setItem('vbi_intent', JSON.stringify({
      name: quickName.trim(),
      email: quickEmail.trim().toLowerCase(),
      amount: quickAmount.trim(),
      currency: quickCurrency,
    }))
    navigate('/register')
  }

  return (
    <div className="min-h-screen bg-cream-100 font-sans">

      {/* Верхняя плашка */}
      <nav className="absolute top-0 left-0 right-0 z-30 py-5 md:py-6">
        <div className="site-container flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 md:gap-6">
            {/* Логотип VseBank с золотой бесконечностью — выровнено по центру */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path d="M10 12 C 10 5, 17 5, 20 12 C 23 19, 30 19, 30 12 C 30 5, 23 5, 20 12 C 17 19, 10 19, 10 12 Z"
                  stroke="#B89058" strokeWidth="3" fill="none" strokeLinecap="round"/>
              </svg>
              <span className="font-serif text-2xl md:text-3xl text-ink-900 tracking-wide font-medium leading-none">
                VseBank
              </span>
            </div>
            <div className="hidden md:block w-px h-10 bg-gold-400/40" />
            <div className="font-sans text-xs md:text-sm text-gold-600 font-medium tracking-[0.2em] uppercase leading-relaxed">
              Инструкция по сонастройке<br />с Бесконечным Потоком
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

      {/* Hero — mobile-first адаптивный */}
      <section className="relative w-full overflow-hidden" style={{ height: '100vh', backgroundColor: '#F5EFE6' }}>

        {/* Картинка — на мобайле показывается только ЛЕВАЯ (чистая) часть */}
        <img
          src={`${import.meta.env.BASE_URL}hero-cover.png`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none hero-image"
          draggable={false}
        />

        {/* HTML-контент */}
        <div className="absolute inset-0 flex items-center pt-16 sm:pt-20">
          <div className="site-container">
            <div className="max-w-xl text-left">

              {/* Заголовок */}
              <h1 className="font-serif mb-5 sm:mb-6 text-left">
                <span className="block font-sans font-normal text-base sm:text-lg md:text-xl lg:text-2xl text-ink-700 mb-1 sm:mb-2 tracking-wide">
                  Добро пожаловать во
                </span>
                <span
                  className="block text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] font-medium tracking-tight text-ink-900"
                >
                  Вселенский
                </span>
                <span
                  className="block text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] font-medium tracking-tight text-ink-900"
                >
                  Банк Изобилия
                </span>
              </h1>

              {/* Декоративная линия */}
              <div className="w-12 h-px bg-gold-500 mb-5 sm:mb-6" />

              {/* Цитата — обычный шрифт Inter */}
              <p className="font-sans text-ink-700 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-md font-normal">
                Бог не знает нехватки. Вселенная знает только одно слово: «ДА». Твой счёт здесь открыт с самого рождения, но пользовался ли ты им?
              </p>

              {/* Кнопка */}
              <button
                onClick={() => navigate('/register')}
                className="btn-gold inline-flex items-center gap-2 text-xs sm:text-sm px-6 sm:px-8 py-3 sm:py-4"
              >
                Открыть мой счёт — это бесплатно
                <span>→</span>
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
              Большинство людей живут в иллюзии дефицита. Они верят, что ресурсы ограничены, а деньги нужно «тяжело зарабатывать». Но на квантовом уровне реальности всё, что вы можете себе вообразить, уже существует в виде чистой потенциальности.
            </p>
            <p className="body-text">
              Этот Банк — <span className="text-gold-700 font-medium">не просто игра</span>. Это тренажёр для вашего сознания, созданный на стыке метафизики изобилия и нейропластичности.
            </p>
          </div>

          {/* Шкала прогресса с роскошными золотыми иконками */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-2">
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
              <div key={step.name} className="relative flex flex-col items-center text-center">
                {/* Иконка в золотом круге — всегда выделена */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-gold-500 bg-gold-500/5 flex items-center justify-center text-gold-500 mb-3 shadow-gold">
                  <div className="w-9 h-9 md:w-11 md:h-11">
                    {step.icon}
                  </div>
                </div>
                {/* Название */}
                <div className="font-sans text-[11px] md:text-xs text-gold-700 tracking-[0.15em] uppercase font-medium">
                  {step.name}
                </div>
                {/* Тонкая золотая линия между */}
                {i < arr.length - 1 && (
                  <div className="hidden md:block absolute top-10 -right-1 w-2 h-px bg-gold-400/40" />
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
            <p className="body-text italic">Вы не просите. Вы вспоминаете. Вы принимаете.</p>
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

              {/* Иконка в стиле блока 2 — тонкие линии, золотой круг */}
              <div className="flex justify-center my-8">
                <div className="w-20 h-20 rounded-full border border-gold-500 bg-gold-500/5 flex items-center justify-center text-gold-500 shadow-gold">
                  <Crown className="w-11 h-11" strokeWidth={1.5} />
                </div>
              </div>

              <p className="body-text">
                Вы — сотворцы своей реальности, искры Божественного сознания. Вселенский Банк не выдаёт кредиты и не требует залогов. Его баланс — бесконечен, потому что бесконечен Источник.
              </p>
              <p className="body-text mt-4">
                Переводя деньги отсюда на свой «физический» счёт, вы заявляете Вселенной: «Я готов принять то, что уже принадлежит мне по праву рождения».
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

              {/* Иконка — мозг только контур, в стиле короны */}
              <div className="flex justify-center my-8">
                <div className="w-20 h-20 rounded-full border border-gold-500 bg-gold-500/5 flex items-center justify-center shadow-gold">
                  <Brain className="w-11 h-11 text-gold-500" strokeWidth={1.5} />
                </div>
              </div>

              <p className="body-text">
                Наш мозг не отличает реальное событие от воображаемого, если оно подкреплено сильной эмоцией. Каждый раз, когда вы совершаете «виртуальный перевод» и искренне проживаете благодарность, ваш мозг строит новые нейронные связи.
              </p>
              <p className="body-text mt-4">
                Вы перестаёте транслировать в квантовое поле сигнал «мне не хватает» и начинаете излучать частоту «у меня уже есть».
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
            Изменяя внутреннюю программу, вы изменяете внешнюю реальность
          </div>
        </div>
      </section>

      {/* Правила пользования — фон как в блоке 2 (#FDFDFD) */}
      <section className="py-20 border-t border-gold-300/20" style={{ backgroundColor: '#FDFDFD' }}>
        <div className="site-container">
          {/* Заголовок ПО ЦЕНТРУ, текст ниже по левому краю */}
          <div className="text-center mb-10">
            <div className="tag mb-3">Правила</div>
            <h2 className="section-title mb-5">Правила Пользования Вселенским Счётом</h2>
            <div className="w-12 h-px bg-gold-400 mx-auto mb-6" />
          </div>
          <p className="body-text mb-12">
            Чтобы симуляция начала менять вашу физическую реальность, соблюдайте три главных правила Квантового Достатка:
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Три правила — только цифры, чистая композиция */}
            <div className="space-y-10">
              {[
                {
                  n: '01',
                  text: 'Определите сумму, которая необходима вам сегодня, чтобы почувствовать себя Творцом, которым вы и являетесь.',
                },
                {
                  n: '02',
                  text: 'Сделайте свой первый перевод. Позвольте невидимому стать видимым.',
                },
                {
                  n: '03',
                  text: 'Сохраняйте состояние веры, благодарности и изобилия, как основной валюты вашего счёта.',
                },
              ].map(({ n, text }) => (
                <div key={n} className="flex gap-6 items-start">
                  {/* Большая цифра золотом */}
                  <div className="font-serif text-5xl text-gold-500 leading-none flex-shrink-0 w-16">{n}</div>
                  <p className="body-text pt-2">{text}</p>
                </div>
              ))}
            </div>

            {/* Форма быстрого начала */}
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="card-title mb-2">Начните транзакцию прямо сейчас</h3>
              <p className="body-text mb-6">
                Ваш безлимитный счёт уже активирован. Вам осталось только «присвоить» его себе.
              </p>
              <div className="space-y-3">
                <input className="input-field" placeholder="Ваше имя" value={quickName} onChange={e => setQuickName(e.target.value)} />
                <input className="input-field" placeholder="Email" type="email" value={quickEmail} onChange={e => setQuickEmail(e.target.value)} />
                <div className="grid grid-cols-2 gap-3">
                  <input className="input-field" placeholder="Введите сумму" value={quickAmount} onChange={e => setQuickAmount(e.target.value)} />
                  <select className="input-field" value={quickCurrency} onChange={e => setQuickCurrency(e.target.value)}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="CHF">CHF</option>
                    <option value="RUB">RUB</option>
                  </select>
                </div>
                <button
                  onClick={handleQuickStart}
                  className="w-full btn-gold text-center"
                >
                  Активировать перевод →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Философский блок — фон как у блока 3 */}
      <section className="py-20" style={{ backgroundColor: '#FBF7F0' }}>
        <div className="site-container">
          {/* Заголовок ПО ЦЕНТРУ над колонками */}
          <div className="text-center mb-12">
            <div className="tag mb-3">Философия</div>
            <h2 className="section-title mb-5">Небесный Отец — Ваш Личный Банкир</h2>
            <div className="w-12 h-px bg-gold-400 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="body-text mb-4">
              Представьте, что ваш земной отец — олигарх. Вы его любимый сын, и он всё для вас готов сделать. Вы приходите к нему и говорите, что вам нужна определённая сумма на ваш счёт. Он знает, что вы не наркоман и не алкоголик, что эти деньги вас не погубят, — и потому в доверии переводит вам на ваш банковский счёт всегда, когда вы его просите. У вас будут сомнения, что деньги не зайдут???
            </p>
            <div className="border-l-2 border-gold-400 pl-4 my-6">
              <p className="body-text font-serif italic text-stone-700">
                Вот так и наш Небесный Отец переводит нам любые суммы. И всё от нас зависит — сомневаемся мы или нет!
              </p>
            </div>
            <p className="body-text">
              Если мы Бога представляем как квантовое поле или вселенную — это тоже работает. Разница лишь в том, что вы приходите либо к любящему вас Отцу, либо к богатому инвестору, к которому стоит очередь из таких же, как вы.
            </p>
          </div>
          <div className="relative flex justify-center">
            {/* Сложная сакральная мандала + золотые монеты вокруг */}
            <svg viewBox="0 0 400 400" className="w-80 h-80 md:w-96 md:h-96" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="mandalaSun" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFE9B0" stopOpacity="0.35"/>
                  <stop offset="40%" stopColor="#D4B87A" stopOpacity="0.15"/>
                  <stop offset="100%" stopColor="#D4B87A" stopOpacity="0"/>
                </radialGradient>
                <linearGradient id="goldStroke" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E8D5A3"/>
                  <stop offset="50%" stopColor="#B89058"/>
                  <stop offset="100%" stopColor="#8B6F3D"/>
                </linearGradient>
                <radialGradient id="coinGrad" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#F4E5B8"/>
                  <stop offset="60%" stopColor="#C9A35C"/>
                  <stop offset="100%" stopColor="#8B6914"/>
                </radialGradient>
              </defs>

              {/* Лёгкое сияние */}
              <circle cx="200" cy="200" r="160" fill="url(#mandalaSun)"/>

              {/* Внешнее кольцо точек (72 точки) */}
              {[...Array(72)].map((_, i) => {
                const deg = i * 5
                const x = 200 + 175 * Math.cos(deg * Math.PI/180)
                const y = 200 + 175 * Math.sin(deg * Math.PI/180)
                return <circle key={`o-${i}`} cx={x} cy={y} r="1" fill="#B89058" opacity="0.6"/>
              })}

              {/* Длинные лучи (16) */}
              {[...Array(16)].map((_, i) => {
                const deg = i * 22.5
                const x1 = 200 + 100 * Math.cos(deg * Math.PI/180)
                const y1 = 200 + 100 * Math.sin(deg * Math.PI/180)
                const x2 = 200 + 165 * Math.cos(deg * Math.PI/180)
                const y2 = 200 + 165 * Math.sin(deg * Math.PI/180)
                return <line key={`l-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#B89058" strokeWidth="1" opacity="0.7"/>
              })}

              {/* Средние лучи (32) */}
              {[...Array(32)].map((_, i) => {
                const deg = i * 11.25 + 5.6
                const x1 = 200 + 110 * Math.cos(deg * Math.PI/180)
                const y1 = 200 + 110 * Math.sin(deg * Math.PI/180)
                const x2 = 200 + 145 * Math.cos(deg * Math.PI/180)
                const y2 = 200 + 145 * Math.sin(deg * Math.PI/180)
                return <line key={`m-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D4B87A" strokeWidth="0.6" opacity="0.6"/>
              })}

              {/* Концентрические окружности */}
              <circle cx="200" cy="200" r="160" stroke="#B89058" strokeWidth="0.6" fill="none" opacity="0.7"/>
              <circle cx="200" cy="200" r="140" stroke="#D4B87A" strokeWidth="0.4" fill="none" opacity="0.5"/>
              <circle cx="200" cy="200" r="105" stroke="#B89058" strokeWidth="0.8" fill="none"/>
              <circle cx="200" cy="200" r="90" stroke="#D4B87A" strokeWidth="0.4" fill="none" opacity="0.6"/>

              {/* Цветок жизни (6 кругов вокруг центра) */}
              {[0, 60, 120, 180, 240, 300].map(deg => {
                const cx = 200 + 45 * Math.cos(deg * Math.PI/180)
                const cy = 200 + 45 * Math.sin(deg * Math.PI/180)
                return <circle key={`f-${deg}`} cx={cx} cy={cy} r="45" stroke="#B89058" strokeWidth="0.6" fill="none" opacity="0.6"/>
              })}

              {/* 8-конечная звезда внутри */}
              <path d="M 200 130 L 215 185 L 270 200 L 215 215 L 200 270 L 185 215 L 130 200 L 185 185 Z"
                stroke="url(#goldStroke)" strokeWidth="1.2" fill="#D4B87A" fillOpacity="0.15" strokeLinejoin="round"/>

              {/* Центральный круг с бесконечностью */}
              <circle cx="200" cy="200" r="38" fill="#FBF7F0" stroke="url(#goldStroke)" strokeWidth="1.5"/>
              <circle cx="200" cy="200" r="32" stroke="#D4B87A" strokeWidth="0.5" fill="none" opacity="0.7"/>

              {/* Бесконечность в центре */}
              <g transform="translate(200 200)">
                <path d="M-22 0 C-22 -12, -10 -12, 0 0 C10 12, 22 12, 22 0 C22 -12, 10 -12, 0 0 C-10 12, -22 12, -22 0 Z"
                  stroke="url(#goldStroke)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              </g>

              {/* Декоративные точки */}
              {[45, 135, 225, 315].map(deg => {
                const x = 200 + 70 * Math.cos(deg * Math.PI/180)
                const y = 200 + 70 * Math.sin(deg * Math.PI/180)
                return <circle key={`p-${deg}`} cx={x} cy={y} r="2.5" fill="#B89058"/>
              })}

              {/* Золотые монеты — разбросаны на разном расстоянии от центра */}
              {[
                { cx: 280, cy: 130, r: 8 },   // близко к центру справа сверху
                { cx: 380, cy: 95, r: 14 },   // дальше
                { cx: 60, cy: 80, r: 12 },
                { cx: 145, cy: 95, r: 7 },    // ближе к центру
                { cx: 30, cy: 250, r: 16 },   // далеко
                { cx: 115, cy: 305, r: 9 },   // ближе
                { cx: 370, cy: 350, r: 13 },
                { cx: 290, cy: 270, r: 8 },   // ближе
                { cx: 380, cy: 200, r: 11 },
                { cx: 50, cy: 165, r: 10 },
                { cx: 230, cy: 365, r: 14 },
                { cx: 130, cy: 360, r: 9 },
              ].map((c, i) => (
                <g key={`coin-${i}`}>
                  <circle cx={c.cx} cy={c.cy} r={c.r} fill="url(#coinGrad)" stroke="#8B6914" strokeWidth="0.8"/>
                  <text x={c.cx} y={c.cy + c.r*0.35} textAnchor="middle"
                    fill="#FBF7F0" fontFamily="serif" fontSize={c.r*1.2} fontWeight="bold">∞</text>
                </g>
              ))}

              {/* Маленькие звёздочки-блёстки */}
              {[[150, 50], [260, 60], [80, 150], [340, 160], [120, 350], [260, 340]].map(([x, y], i) => (
                <path key={`sp-${i}`}
                  d={`M ${x} ${y-4} L ${x+1.5} ${y-1.5} L ${x+4} ${y} L ${x+1.5} ${y+1.5} L ${x} ${y+4} L ${x-1.5} ${y+1.5} L ${x-4} ${y} L ${x-1.5} ${y-1.5} Z`}
                  fill="#D4B87A" opacity="0.8"/>
              ))}
            </svg>
          </div>
          </div>

          {/* Золотые теги по центру внизу */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-base text-gold-600 tracking-widest uppercase font-medium">
            <span>✦ Доверие — ваша валюта</span>
            <span>✦ Изобилие — ваша природа</span>
          </div>
        </div>
      </section>

      {/* CTA финальный — фон как у блока 4 */}
      <section className="pt-16 pb-28 text-center border-t border-gold-300/20" style={{ backgroundColor: '#FDFDFD' }}>
        <div className="site-container">
          <h2 className="section-title mb-5">Ваш счёт ждёт вас</h2>
          <div className="w-12 h-px bg-gold-400 mx-auto mb-6" />
          <p className="body-text mb-10">
            Ваш безлимитный счёт уже активирован. Вам осталось только «присвоить» его себе.
            <br />
            Сделайте свой первый перевод. Позвольте невидимому стать видимым.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="btn-gold inline-flex items-center gap-3"
          >
            Открыть мой счёт — это бесплатно
          </button>
        </div>
      </section>

      {/* Футер */}
      <footer className="py-8 border-t border-gold-300/20">
        <div className="site-container flex items-center justify-between gap-4">
          <div className="font-sans text-sm text-stone-500">
            © Вселенский Банк Изобилия
          </div>
          <button
            onClick={() => navigate('/register')}
            className="font-sans text-sm text-gold-600 hover:text-gold-700 transition-colors"
          >
            Далее →
          </button>
        </div>
      </footer>

    </div>
  )
}
