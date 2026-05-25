import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import VseBankLogo from '../components/VseBankLogo'

export default function Landing() {
  const navigate = useNavigate()
  const [quickName, setQuickName] = useState('')
  const [quickEmail, setQuickEmail] = useState('')

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
        <div className="site-container flex items-start md:items-center justify-between gap-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-6 min-w-0">
            <VseBankLogo size="md" />
            <div className="hidden lg:block w-px h-10 bg-gold-400/40 flex-shrink-0" />
            <div className="font-sans text-xs sm:text-sm text-gold-600 font-medium tracking-[0.2em] uppercase leading-snug lg:leading-relaxed">
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
                Бог не знает нехватки. Вселенная знает только одно слово: «ДА». Твой счёт здесь открыт с самого рождения, но пользовался ли ты им?
              </p>

              {/* Кнопка — высокая, как в последнем блоке */}
              <button
                onClick={() => navigate('/register')}
                className="btn-gold inline-flex items-center justify-center text-sm md:text-base px-8 md:px-10 py-4 w-full sm:w-auto whitespace-nowrap"
              >
                Открыть мой счёт бесплатно
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
              Этот Банк — <span className="font-serif italic text-2xl" style={{ color: "#9A6F09" }}>не просто игра</span>. Это тренажёр для вашего сознания, созданный на стыке метафизики изобилия и нейропластичности.
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

            {/* Форма быстрого открытия счёта */}
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="card-title mb-2">Откройте счёт прямо сейчас</h3>
              <p className="body-text mb-6">
                Ваш безлимитный счёт уже активирован. Вам осталось только «присвоить» его себе.
              </p>
              <div className="space-y-3">
                <input className="input-field" placeholder="Ваше имя" value={quickName} onChange={e => setQuickName(e.target.value)} />
                <input className="input-field" placeholder="Email" type="email" value={quickEmail} onChange={e => setQuickEmail(e.target.value)} />
                <button
                  onClick={handleQuickStart}
                  className="w-full btn-gold text-center"
                >
                  Открыть счёт →
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
            <img src={`${import.meta.env.BASE_URL}philosophy-image.png`} alt="Философия" className="w-full max-w-md shadow-card" style={{ borderRadius: "15px" }}/>
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
            className="btn-gold inline-flex items-center justify-center text-sm md:text-base px-10 py-4 whitespace-nowrap"
          >
            Открыть мой счёт бесплатно
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
