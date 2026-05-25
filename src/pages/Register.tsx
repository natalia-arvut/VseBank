import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import VseBankLogo from '../components/VseBankLogo'
import emailjs from '@emailjs/browser'

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
      setError('Пожалуйста, заполните все обязательные поля')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Отправляем письмо подтверждения через EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_REGISTER || 'YOUR_TEMPLATE_REGISTER',
        {
          to_name: `${form.firstName} ${form.lastName}`,
          to_email: form.email,
          from_name: 'Вселенский Банк Изобилия',
          account_number: `VBI-${Date.now().toString().slice(-8)}`,
          message: 'Ваш счёт изобилия успешно открыт. С первой секунды вы — Банкир.',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
      )
    } catch {
      // Если EmailJS не настроен — продолжаем без письма
      console.log('EmailJS не настроен, продолжаем без письма')
    }

    // Регистрируем пользователя в базе
    register({
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

    // Если было намерение перевести сумму с лендинга — идём сразу в перевод
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

  return (
    <div className="h-screen overflow-hidden bg-cream-100 bg-pattern flex">

      {/* Левая панель — информационная (ровно 50%) */}
      <div className="hidden lg:flex lg:w-1/2 bg-stone-800 flex-col justify-between p-10 relative overflow-hidden">
        {/* Фоновые кольца */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-96 h-96 rounded-full border border-gold-400" />
          <div className="absolute w-72 h-72 rounded-full border border-gold-400" />
          <div className="absolute w-48 h-48 rounded-full border border-gold-400" />
        </div>

        {/* VseBank логотип (в светлом стиле для тёмного фона) */}
        <div className="flex items-center gap-3">
          <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
            <path d="M10 12 C 10 5, 17 5, 20 12 C 23 19, 30 19, 30 12 C 30 5, 23 5, 20 12 C 17 19, 10 19, 10 12 Z"
              stroke="#D4B87A" strokeWidth="3" fill="none" strokeLinecap="round"/>
          </svg>
          <span className="font-serif text-2xl text-cream-50 tracking-wide font-medium leading-none">
            VseBank
          </span>
        </div>

        <div className="relative z-10">
          <div className="font-sans text-xs text-gold-400 tracking-[0.2em] uppercase mb-4">
            Открытие счёта
          </div>
          <h2 className="font-serif text-3xl text-cream-50 leading-tight mb-4">
            С первой секунды<br />вы — Банкир.
          </h2>
          <div className="w-12 h-px bg-gold-500 mb-4" />
          <p className="font-sans text-stone-400 leading-relaxed text-sm">
            Можно открыть как личный счёт, так и на компанию. Ваш счёт изобилия не имеет ограничений.
          </p>
        </div>

        <div />
      </div>

      {/* Правая панель — форма (ровно 50%) */}
      <div className="lg:w-1/2 flex flex-col justify-center px-8 md:px-12 py-6 overflow-y-auto">
        <div className="max-w-md mx-auto w-full">

          {/* Логотип VseBank — выровнен по левому краю формы */}
          <div className="flex justify-start mb-5">
            <VseBankLogo size="md" />
          </div>

          <div className="mb-6">
            <div className="tag mb-2 text-sm">Открытие счёта</div>
            <div className="w-12 h-px bg-gold-400" />
          </div>

          {/* Тип счёта */}
          <div className="flex gap-2 mb-3">
            <button
              type="button"
              onClick={() => handleChange('accountType', 'personal')}
              className={`flex-1 py-2 text-xs font-sans border transition-all duration-200 ${
                form.accountType === 'personal'
                  ? 'bg-gold-500 text-white border-gold-500'
                  : 'border-gold-300/50 text-stone-600 hover:border-gold-500'
              }`}
            >
              Личный
            </button>
            <button
              type="button"
              onClick={() => handleChange('accountType', 'company')}
              className={`flex-1 py-2 text-xs font-sans border transition-all duration-200 ${
                form.accountType === 'company'
                  ? 'bg-gold-500 text-white border-gold-500'
                  : 'border-gold-300/50 text-stone-600 hover:border-gold-500'
              }`}
            >
              Бизнес
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
              <div className="grid grid-cols-2 gap-3">
                <input
                  className="input-field"
                  placeholder="Имя *"
                  value={form.firstName}
                  onChange={e => handleChange('firstName', e.target.value)}
                />
                <input
                  className="input-field"
                  placeholder="Фамилия"
                  value={form.lastName}
                  onChange={e => handleChange('lastName', e.target.value)}
                />
              </div>
            )}

            {form.accountType === 'personal' && (
              <div className="grid grid-cols-2 gap-3">
                <input
                  className="input-field"
                  placeholder="Дата рождения"
                  type="date"
                  value={form.birthDate}
                  onChange={e => handleChange('birthDate', e.target.value)}
                />
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
              <option value="">Страна проживания *</option>
              {COUNTRIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {error && (
              <div className="font-sans text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3">
                {error}
              </div>
            )}

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 accent-gold-500"
                checked={form.agreed}
                onChange={e => handleChange('agreed', e.target.checked)}
              />
              <span className="font-sans text-xs text-stone-500 leading-relaxed">
                Я прочитал и ознакомился с{' '}
                <button type="button" onClick={() => setRulesOpen(true)} className="text-gold-600 underline cursor-pointer">
                  правилами платформы
                </button>
                {' '}и Политикой конфиденциальности
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
            <span>Ваши данные защищены квантовым уровнем шифрования. Мы с вами на одной частоте.</span>
          </div>
        </div>
      </div>

      {/* Модальное окно с правилами */}
      {rulesOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/70 backdrop-blur-sm p-6"
          onClick={() => setRulesOpen(false)}
        >
          <div className="bg-cream-100 max-w-lg w-full p-8 rounded-2xl shadow-gold-lg border border-gold-400/40 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="tag mb-2 text-sm">Правила</div>
              <h2 className="font-serif text-2xl text-stone-800">Правила Пользования Вселенским Счётом</h2>
              <div className="w-12 h-px bg-gold-400 mx-auto mt-4" />
            </div>
            <div className="space-y-5 mb-6">
              {[
                ['01', 'Определите сумму, которая необходима вам сегодня, чтобы почувствовать себя Творцом, которым вы и являетесь.'],
                ['02', 'Сделайте свой первый перевод. Позвольте невидимому стать видимым.'],
                ['03', 'Сохраняйте состояние веры, благодарности и изобилия, как основной валюты вашего счёта.'],
              ].map(([n, text]) => (
                <div key={n} className="flex gap-4 items-start">
                  <div className="font-serif text-3xl text-gold-500 leading-none flex-shrink-0 w-10">{n}</div>
                  <p className="text-sm text-stone-700 leading-relaxed pt-1">{text}</p>
                </div>
              ))}
            </div>
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
