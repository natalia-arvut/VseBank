import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import CabinetLayout from '../components/CabinetLayout'
import emailjs from '@emailjs/browser'

const TIMINGS = [
  { id: 'fast', label: 'Быстрый', period: '1–3 дня' },
  { id: 'standard', label: 'Стандартный', period: '5–7 дней' },
  { id: 'extended', label: 'Расширенный', period: '10 дней' },
  { id: 'max', label: 'Максимальный', period: '21 день' },
]

const TYPES = [
  { id: 'trust', label: 'Приход на личный баланс доверия' },
  { id: 'auto', label: 'Приход напрямую — Автоперевод' },
]

export default function Transfer() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, addTransfer } = useApp()

  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('USD')

  // Подхватываем сумму из URL (если пришли с лендинга)
  useEffect(() => {
    const params = new URLSearchParams(location.search || window.location.hash.split('?')[1] || '')
    const a = params.get('amount')
    const c = params.get('currency')
    if (a) setAmount(a)
    if (c) setCurrency(c)
  }, [location.search])
  const [timing, setTiming] = useState('fast')
  const [type, setType] = useState('trust')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<'form' | 'confirm' | 'success'>('form')

  const handleActivate = async () => {
    if (!amount) return
    setLoading(true)

    const transferId = `VBI-TR-${Date.now().toString().slice(-8)}`
    const selectedTiming = TIMINGS.find(t => t.id === timing)!
    const selectedType = TYPES.find(t => t.id === type)!

    // Отправляем письмо подтверждения
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_TRANSFER || 'YOUR_TEMPLATE_TRANSFER',
        {
          to_name: `${user?.firstName} ${user?.lastName}`,
          to_email: user?.email,
          transfer_id: transferId,
          amount: `${amount} ${currency}`,
          timing: `${selectedTiming.label} (${selectedTiming.period})`,
          type: selectedType.label,
          message: 'Ваш перевод от Вселенной активирован. Примите поздравление!',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
      )
    } catch {
      console.log('EmailJS не настроен')
    }

    // Сохраняем перевод (userEmail добавляется автоматически)
    addTransfer({
      id: transferId,
      amount,
      currency,
      type: selectedType.label,
      timing: `${selectedTiming.label} (${selectedTiming.period})`,
      createdAt: new Date().toISOString(),
      status: 'pending',
    } as any)

    setLoading(false)
    setStep('success')
  }

  if (step === 'success') {
    return (
      <CabinetLayout>
        <div className="flex items-center justify-center min-h-screen p-8">
          <div className="max-w-md text-center">
            <div className="text-6xl text-gold-400/60 mb-6 animate-float">∞</div>
            <h1 className="font-serif text-4xl text-stone-800 mb-4">
              Перевод активирован
            </h1>
            <div className="gold-divider" />
            <p className="font-sans text-stone-600 mb-4">
              Ваше намерение принято Вселенной.
            </p>
            <div className="glass-card p-6 mb-8 text-left space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-stone-500 font-sans">Сумма</span>
                <span className="text-stone-800 font-serif">{amount} {currency}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500 font-sans">Срок поступления</span>
                <span className="text-stone-700 font-sans">{TIMINGS.find(t => t.id === timing)?.period}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500 font-sans">Тип</span>
                <span className="text-stone-700 font-sans">{TYPES.find(t => t.id === type)?.label}</span>
              </div>
            </div>
            <p className="font-sans text-stone-500 text-sm mb-2">
              Внимание: банковская система может быть загружена силами активации — не более 21 дня. Серьёзно.
            </p>
            <p className="font-sans text-stone-400 text-xs mb-8">
              Подтверждение перевода отправлено на {user?.email}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/paths')}
                className="flex-1 btn-gold"
              >
                Поддержать благотворительность →
              </button>
              <button
                onClick={() => navigate('/cabinet')}
                className="flex-1 btn-outline"
              >
                В кабинет
              </button>
            </div>
          </div>
        </div>
      </CabinetLayout>
    )
  }

  return (
    <CabinetLayout>
      <div className="p-6 md:p-10 max-w-2xl">

        <div className="mb-8">
          <div className="tag mb-2">Симуляция перевода</div>
          <h1 className="font-serif text-3xl text-stone-800 mb-2">Выберите вариант поступления средств</h1>
          <p className="font-sans text-stone-500 text-sm">
            Ваш безлимитный счёт уже активирован. Заявите свою сумму.
          </p>
        </div>

        <div className="space-y-6">

          {/* Сумма */}
          <div className="glass-card p-6">
            <div className="tag mb-4">Сумма перевода</div>
            <div className="flex gap-3">
              <input
                className="input-field flex-1 text-xl font-serif"
                placeholder="Введите сумму"
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
              <select
                className="input-field w-28"
                value={currency}
                onChange={e => setCurrency(e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CHF">CHF</option>
                <option value="RUB">RUB</option>
              </select>
            </div>
            <p className="font-sans text-xs text-stone-400 mt-3">
              Какая сумма необходима вам сегодня, чтобы почувствовать себя Творцом, которым вы и являетесь?
            </p>
          </div>

          {/* Срок поступления */}
          <div className="glass-card p-6">
            <div className="tag mb-4">Срок поступления средств</div>
            <p className="font-sans text-xs text-stone-500 mb-4">
              Внимание, не пугаться! Банковская система может быть загружена сверх силами активации — не более 21-го дня.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {TIMINGS.map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTiming(t.id)}
                  className={`p-4 text-left border transition-all duration-200 rounded-sm ${
                    timing === t.id
                      ? 'border-gold-500 bg-gold-500/10'
                      : 'border-gold-300/30 hover:border-gold-400'
                  }`}
                >
                  <div className="font-sans text-sm text-stone-700 font-medium">{t.label}</div>
                  <div className="font-serif text-gold-600 text-lg">{t.period}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Тип поступления */}
          <div className="glass-card p-6">
            <div className="tag mb-4">Тип поступления</div>
            <div className="space-y-3">
              {TYPES.map(t => (
                <label
                  key={t.id}
                  className={`flex items-center gap-4 p-4 border cursor-pointer transition-all duration-200 rounded-sm ${
                    type === t.id
                      ? 'border-gold-500 bg-gold-500/10'
                      : 'border-gold-300/30 hover:border-gold-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value={t.id}
                    checked={type === t.id}
                    onChange={() => setType(t.id)}
                    className="accent-gold-500"
                  />
                  <span className="font-sans text-sm text-stone-700">{t.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Кнопки */}
          <div className="flex gap-3">
            <button
              onClick={handleActivate}
              disabled={!amount || loading}
              className="flex-1 btn-gold disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <><span className="animate-spin">⟳</span> Активируем...</> : 'Нажать на баланс →'}
            </button>
            <button
              onClick={() => navigate('/requisites')}
              className="flex-1 btn-outline"
            >
              Поиск актива
            </button>
          </div>

        </div>
      </div>
    </CabinetLayout>
  )
}
