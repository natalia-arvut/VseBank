import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import VseBankLogo from '../components/VseBankLogo'
import Guilloche from '../components/Guilloche'
import LegalFooter from '../components/LegalFooter'

const COUNTRIES = [
  'Россия', 'Украина', 'Беларусь', 'Казахстан', 'Германия', 'Швейцария',
  'Франция', 'Великобритания', 'США', 'Израиль', 'Грузия', 'Другая',
]

export default function Register() {
  const navigate = useNavigate()
  const { register } = useApp()

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    companyRegNumber: '',
    birthDate: '',
    gender: '',
    email: '',
    password: '',
    country: '',
    accountType: 'personal' as 'personal' | 'company',
    agreed: false,
  })
  const [rulesOpen, setRulesOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Подхватываем намерение с лендинга
  useEffect(() => {
    const intent = localStorage.getItem('vbi_intent')
    if (intent) {
      try {
        const data = JSON.parse(intent)
        if (data.name || data.email) {
          setForm(prev => ({
            ...prev,
            firstName: data.name || prev.firstName,
            email: data.email || prev.email,
          }))
        }
      } catch {}
    }
  }, [])

  const handleChange = (field: string, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.agreed) {
      setError('Необходимо принять правила платформы')
      return
    }
    if (!form.firstName || !form.email || !form.password || !form.country) {
      setError('Пожалуйста, заполни все обязательные поля')
      return
    }
    if (form.password.length < 6) {
      setError('Пароль должен быть не короче 6 символов')
      return
    }

    setLoading(true)
    setError('')

    const result = await register({
      firstName: form.firstName,
      lastName: form.lastName,
      companyRegNumber: form.companyRegNumber,
      birthDate: form.birthDate,
      gender: form.gender,
      email: form.email.trim().toLowerCase(),
      password: form.password,
      country: form.country,
      accountType: form.accountType,
    })

    setLoading(false)

    if (!result.ok) {
      const msg = (result.error || '').toLowerCase()
      if (msg.includes('already') || msg.includes('exists') || msg.includes('registered'))
        setError('Пользователь с таким email уже зарегистрирован. Войдите в кабинет.')
      else
        setError(result.error || 'Ошибка регистрации')
      return
    }

    // Если включено подтверждение email — показываем экран ожидания
    if (result.needsConfirmation) {
      setSuccess(true)
      return
    }

    // Иначе — сразу в кабинет (или перевод по намерению с лендинга)
    const intent = localStorage.getItem('vbi_intent')
    if (intent) {
      try {
        const data = JSON.parse(intent)
        if (data.amount) {
          localStorage.removeItem('vbi_intent')
          navigate(`/transfer?amount=${data.amount}&currency=${data.currency || 'USD'}`)
          return
        }
      } catch {}
    }
    localStorage.removeItem('vbi_intent')
    navigate('/cabinet')
  }

  // Экран после регистрации — ждём подтверждения email
  if (success) {
    return (
      <div className="h-screen bg-cream-100 bg-pattern flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="mb-6 flex justify-center"><VseBankLogo size="md" /></div>
          <div className="glass-card p-10 rounded-2xl">
            <div className="text-5xl text-gold-500 mb-4">✉</div>
            <div className="tag mb-3 text-sm">Счёт открыт</div>
            <h1 className="font-serif text-3xl text-stone-800 mb-3">Проверьте почту</h1>
            <div className="w-12 h-px bg-gold-400 mx-auto mb-5" />
            <p className="font-sans text-stone-600 leading-relaxed mb-2">
              На <span className="text-gold-700">{form.email}</span> отправлено письмо
              подтверждения открытия счёта.
            </p>
            <p className="font-sans text-stone-500 text-sm mb-4">
              Перейди по ссылке из письма — и ты окажешься в личном кабинете.
            </p>
            <div className="bg-gold-500/10 border border-gold-400/40 rounded-md px-4 py-3 mb-6">
              <p className="font-sans text-xs text-gold-700 leading-relaxed">
                ✦ Если письма нет во входящих — проверь папку <strong>«Спам»</strong>.
                Найди — отметь <strong>«Не спам»</strong>, и следующие письма от VseBank
                будут приходить сразу в Inbox.
              </p>
            </div>
            <button onClick={() => navigate('/login')} className="w-full btn-outline">
              На страницу входа
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-100 bg-pattern flex flex-col">

      {/* Главная зона: информационная панель + форма */}
      <div className="flex-1 flex flex-col lg:flex-row">

      {/* Левая панель — информационная (ровно 50%) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col px-10 pt-6 pb-10 relative overflow-hidden"
        style={{
          background: 'radial-gradient(120% 80% at 30% 35%, #3a3128 0%, #2a2520 55%, #1f1b17 100%)',
        }}
      >
        {/* Тёплое золотое сияние за заголовком — мягкий свет */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: '-10%',
            top: '20%',
            width: '70%',
            height: '60%',
            background: 'radial-gradient(circle, rgba(212,184,122,0.18) 0%, rgba(212,184,122,0.06) 35%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />

        {/* Гильош — фирменный узор ценной бумаги (тёмная тема) */}
        <Guilloche variant="dark" />

        {/* Тонкие золотые corner brackets — классические «уголки ценной бумаги».
            Каждый bracket повёрнут так, чтобы острый кончик смотрел наружу панели,
            а раскрытая часть — внутрь, к центру. */}
        {/* Верхний-правый */}
        <svg className="absolute pointer-events-none" style={{ top: 24, right: 24, width: 36, height: 36 }} viewBox="0 0 36 36" fill="none">
          <path d="M36 36 V 4 a4 4 0 0 0 -4 -4 H 0" stroke="#D4B87A" strokeOpacity="0.55" strokeWidth="1" />
        </svg>
        {/* Нижний-левый */}
        <svg className="absolute pointer-events-none" style={{ bottom: 24, left: 24, width: 36, height: 36 }} viewBox="0 0 36 36" fill="none">
          <path d="M0 0 V 32 a4 4 0 0 0 4 4 H 36" stroke="#D4B87A" strokeOpacity="0.55" strokeWidth="1" />
        </svg>
        {/* Нижний-правый */}
        <svg className="absolute pointer-events-none" style={{ bottom: 24, right: 24, width: 36, height: 36 }} viewBox="0 0 36 36" fill="none">
          <path d="M36 0 V 32 a4 4 0 0 1 -4 4 H 0" stroke="#D4B87A" strokeOpacity="0.55" strokeWidth="1" />
        </svg>

        {/* Тонкая золотая вертикальная линия по правому краю — раздел панелей */}
        <div
          className="absolute pointer-events-none"
          style={{
            right: 0,
            top: '10%',
            bottom: '10%',
            width: '1px',
            background: 'linear-gradient(to bottom, transparent, rgba(212,184,122,0.4), transparent)',
          }}
        />

        {/* VseBank логотип — на уровне правой панели */}
        <div className="mb-4">
          <VseBankLogo size="sm" variant="light" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center -mt-12">
          <div className="font-sans text-xs text-gold-400 tracking-[0.2em] uppercase mb-4">
            Открытие счёта
          </div>
          <h2 className="font-serif text-3xl text-cream-50 leading-tight mb-4">
            С первой секунды<br />ты — Банкир.
          </h2>
          <div className="w-12 h-px bg-gold-500 mb-4" />
          <p className="font-sans text-stone-300 leading-relaxed text-base">
            Можно открыть как личный счёт, так и на компанию.
            <br /><br />
            Твой счёт изобилия не имеет ограничений.
          </p>
        </div>
      </div>

      {/* Правая панель — форма (ровно 50%) */}
      <div className="lg:w-1/2 flex flex-col px-8 md:px-12 pt-6 pb-8">
        <div className="max-w-md mx-auto w-full">

          {/* Логотип VseBank — на той же высоте что левый */}
          <div className="flex justify-start mb-4">
            <VseBankLogo size="sm" />
          </div>

          <div className="mb-3">
            <div className="tag text-sm">Открытие счёта</div>
          </div>

          {/* Тип счёта — единый размер с кнопкой submit */}
          <div className="flex gap-2 mb-3">
            <button
              type="button"
              onClick={() => handleChange('accountType', 'personal')}
              className={`flex-1 py-3 text-sm font-sans font-medium tracking-widest uppercase border transition-all duration-200 ${
                form.accountType === 'personal'
                  ? 'bg-gold-500 text-white border-gold-500'
                  : 'border-gold-300/60 text-stone-600 hover:border-gold-500'
              }`}
              style={{ borderRadius: '15px' }}
            >
              Личный
            </button>
            <button
              type="button"
              onClick={() => handleChange('accountType', 'company')}
              className={`flex-1 py-3 text-sm font-sans font-medium tracking-widest uppercase border transition-all duration-200 ${
                form.accountType === 'company'
                  ? 'bg-gold-500 text-white border-gold-500'
                  : 'border-gold-300/60 text-stone-600 hover:border-gold-500'
              }`}
              style={{ borderRadius: '15px' }}
            >
              Компания
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2.5">
            {form.accountType === 'company' ? (
              // Поля для компании
              <>
                <input
                  className="input-field"
                  placeholder="Наименование компании *"
                  value={form.firstName}
                  onChange={e => handleChange('firstName', e.target.value)}
                />
                <input
                  className="input-field"
                  placeholder="Регистрационный номер компании *"
                  value={form.companyRegNumber}
                  onChange={e => handleChange('companyRegNumber', e.target.value)}
                />
              </>
            ) : (
              // Поля для личного счёта
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  className="input-field"
                  placeholder="Имя *"
                  value={form.firstName}
                  onChange={e => handleChange('firstName', e.target.value)}
                />
                <input
                  className="input-field"
                  placeholder="Фамилия *"
                  value={form.lastName}
                  onChange={e => handleChange('lastName', e.target.value)}
                />
              </div>
            )}

            {form.accountType === 'personal' && (
              <div className="hidden lg:block space-y-2.5">
                {/* Дата рождения с лейблом — только desktop */}
                <div className="relative">
                  <label className="absolute left-4 top-1.5 text-[10px] text-gold-700 tracking-wide uppercase pointer-events-none z-10">
                    Дата рождения
                  </label>
                  <input
                    className="input-field pt-6 pb-2"
                    type="date"
                    value={form.birthDate}
                    onChange={e => handleChange('birthDate', e.target.value)}
                  />
                </div>
                {/* Пол — только desktop */}
                <select
                  className="input-field"
                  value={form.gender}
                  onChange={e => handleChange('gender', e.target.value)}
                >
                  <option value="">Пол</option>
                  <option value="male">Мужской</option>
                  <option value="female">Женский</option>
                </select>
              </div>
            )}

            <input
              className="input-field"
              placeholder="E-mail *"
              type="email"
              value={form.email}
              onChange={e => handleChange('email', e.target.value)}
            />

            <div className="relative">
              <input
                className="input-field pr-10"
                placeholder="Пароль *"
                type="password"
                value={form.password}
                onChange={e => handleChange('password', e.target.value)}
              />
            </div>

            <select
              className="input-field"
              value={form.country}
              onChange={e => handleChange('country', e.target.value)}
            >
              <option value="">
                {form.accountType === 'company' ? 'Страна регистрации *' : 'Страна проживания *'}
              </option>
              {COUNTRIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {error && (
              <div className="font-sans text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3">
                {error}
              </div>
            )}

            <label className="flex items-start gap-3 cursor-pointer py-1">
              <input
                type="checkbox"
                className="flex-shrink-0 w-5 h-5 mt-0.5 accent-gold-500 border border-gold-400/60 rounded cursor-pointer"
                style={{ accentColor: '#B89058' }}
                checked={form.agreed}
                onChange={e => handleChange('agreed', e.target.checked)}
              />
              <span className="font-sans text-xs text-stone-500 leading-relaxed">
                Я согласен с{' '}
                <Link to="/terms" target="_blank" rel="noopener" className="text-gold-700 underline-offset-2 hover:underline">
                  Пользовательским соглашением
                </Link>
                {', '}
                <Link to="/privacy" target="_blank" rel="noopener" className="text-gold-700 underline-offset-2 hover:underline">
                  Политикой конфиденциальности
                </Link>
                {' и '}
                <Link to="/disclaimer" target="_blank" rel="noopener" className="text-gold-700 underline-offset-2 hover:underline">
                  Дисклеймером
                </Link>
                {'. С '}
                <button type="button" onClick={() => setRulesOpen(true)} className="text-gold-600 underline-offset-2 hover:underline cursor-pointer">
                  Манифестом Со-Творца
                </button>
                {' тоже ознакомился.'}
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⟳</span>
                  Открываем счёт...
                </>
              ) : (
                'Открыть счёт'
              )}
            </button>
          </form>

          <div className="text-center mt-5">
            <span className="font-sans text-sm text-stone-500">Уже есть счёт? </span>
            <button
              onClick={() => navigate('/login')}
              className="font-sans text-sm text-gold-600 hover:text-gold-700 underline"
            >
              Войти
            </button>
          </div>

          {/* Защита данных — красивая иконка щита с золотой бесконечностью */}
          <div className="mt-5 flex items-center justify-center gap-3 font-sans text-xs text-stone-500">
            <svg width="20" height="22" viewBox="0 0 24 26" fill="none" className="flex-shrink-0">
              <path d="M12 1 L21 4 L21 12 C 21 17, 17 22, 12 24 C 7 22, 3 17, 3 12 L 3 4 Z"
                stroke="#B89058" strokeWidth="1.2" fill="#D4B87A" fillOpacity="0.1" strokeLinejoin="round"/>
              <path d="M9 13 C 9 10.5, 10.5 9.5, 12 11 C 13.5 12.5, 15 12.5, 15 11 C 15 9.5, 13.5 9.5, 12 11 C 10.5 12.5, 9 12.5, 9 13 Z"
                stroke="#B89058" strokeWidth="1" fill="none" strokeLinecap="round"/>
            </svg>
            <span>Твои данные защищены квантовым уровнем шифрования. Мы с тобой на одной частоте.</span>
          </div>
        </div>
      </div>

      </div>

      {/* Сквозной юридический футер */}
      <LegalFooter />

      {/* Модальное окно с пользовательским соглашением */}
      {rulesOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/70 backdrop-blur-sm p-6"
          onClick={() => setRulesOpen(false)}
        >
          <div className="bg-cream-100 max-w-2xl w-full p-8 md:p-10 rounded-2xl shadow-gold-lg border border-gold-400/40 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="tag mb-2 text-sm">Пользовательское соглашение</div>
              <h2 className="font-serif text-2xl md:text-3xl text-ink-900">Правила Новой Реальности</h2>
              <div className="w-12 h-px bg-gold-400 mx-auto mt-4" />
            </div>

            <p className="font-sans text-ink-700 leading-relaxed text-center mb-8 px-2">
              Перед тем как активировать перевод, подтверди свою готовность играть по правилам Новой Реальности. Помни: этот интерфейс меняет материю только тогда, когда ты меняешь своё внутреннее состояние.
            </p>

            {/* 01–03 — три ключевые шага */}
            <div className="space-y-5 mb-10">
              {[
                ['01', 'Какую сумму ты намерен материализовать? Назови цифру, которая переключит твоё сознание в режим безусловного изобилия и вернёт тебе статус главного архитектора своей жизни.'],
                ['02', 'Инициируй свой первый перевод. Дай Вселенной священную команду «Да будет так!» — и позволь пространству ответить взаимностью.'],
                ['03', 'Сохраняй состояние веры, благодарности и изобилия как основной валюты Вселенной. Празднуй триумф до того, как увидишь его на карте, — и материя подчинится.'],
              ].map(([n, text]) => (
                <div key={n} className="flex gap-4 items-start">
                  <div className="font-serif text-3xl text-gold-500 leading-none flex-shrink-0 w-10">{n}</div>
                  <p className="text-sm text-ink-700 leading-relaxed pt-1">{text}</p>
                </div>
              ))}
            </div>

            {/* Оферта Со-Творца */}
            <div className="border-t border-gold-300/40 pt-6 mb-8">
              <div className="text-center mb-5">
                <div className="tag mb-2 text-sm">Оферта Со-Творца</div>
                <h3 className="font-serif text-xl md:text-2xl text-ink-900">Я согласен и принимаю условия</h3>
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
                    <h4 className="font-serif text-xl md:text-2xl text-gold-600 mb-2 leading-tight">{title}</h4>
                    <p className="font-sans text-sm text-ink-700 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Свод обязательных правил */}
            <div className="border-t border-gold-300/40 pt-6 mb-8">
              <div className="text-center mb-5">
                <div className="tag mb-2 text-sm">Свод обязательных правил</div>
                <h3 className="font-serif text-xl md:text-2xl text-ink-900">Протокол взаимодействия с Банком Вселенной</h3>
              </div>

              <p className="font-sans text-sm text-ink-700 leading-relaxed mb-5">
                Чтобы твои транзакции успешно переносились из невидимого поля в плотную материю, строго соблюдай протокол взаимодействия с Банком Вселенной:
              </p>

              <div className="space-y-8">
                {[
                  ['Правило целевой материализации', 'Шаг 1', 'Запрещено выводить суммы в пустоту или из чувства жадности. Каждая транзакция должна иметь чёткий вектор намерения (здоровье, расширение пространства, эволюция души и т. п.). Вселенная понимает только конкретные задачи, подкреплённые готовностью действовать.'],
                  ['Правило биохимического подтверждения', 'Шаг 2', 'В момент нажатия кнопки «Инициировать перевод» ты обязан запустить по венам химию искреннего триумфа. Твоё тело должно физически ощутить мурашки благодарности за то, что деньги уже у тебя. Без этого эмоционального обеспечения транзакция признаётся пустой ментальной концепцией и отклоняется Квантовым полем.'],
                  ['Правило золотого стандарта', 'Шаг 3', 'Твоя благодарность — главная валюта Вселенной, удерживающая квантовый сигнал. Празднуй триумф до того, как увидишь его на реальной карте, — и материя подчинится.'],
                  ['Защита от системных ошибок', 'Политика конфиденциальности ума', 'Как только ты включаешь контроль, страх или начинаешь судорожно думать «как именно и откуда эти деньги придут ко мне», система расценивает это как сомнение и выдаёт ошибку. Любая попытка эго диктовать Вселенной сценарии проявления мгновенно замораживает транзакцию. Перевёл? Забудь и доверься Пространству.'],
                ].map(([title, step, text]) => (
                  <div key={title} className="text-center">
                    <div className="font-sans text-sm text-gold-600 tracking-[0.25em] uppercase font-semibold mb-2">{step}</div>
                    <h4 className="font-serif text-xl md:text-2xl text-gold-600 mb-3 leading-tight">{title}</h4>
                    <p className="font-sans text-sm text-ink-700 leading-relaxed text-left">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="font-sans text-ink-700 leading-relaxed text-center mb-6 px-2">
              Я подтверждаю, что готов сорвать тумблер сомнений. Я вхожу в Квантовое Поле, принимаю правила игры и позволяю невидимому стать моим осязаемым физическим опытом.
            </p>

            <button
              onClick={() => { handleChange('agreed', true); setRulesOpen(false) }}
              className="w-full btn-gold"
            >
              Принять и согласиться
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
