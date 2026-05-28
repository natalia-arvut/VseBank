import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import CabinetLayout from '../components/CabinetLayout'
import { fetchRequisites, saveRequisite, type Requisite } from '../lib/requisites'

const TIMINGS = [
  { id: 'fast', label: 'Быстрый', period: '1–3 дня' },
  { id: 'standard', label: 'Стандартный', period: '5–7 дней' },
  { id: 'extended', label: 'Расширенный', period: '10 дней' },
  { id: 'max', label: 'Максимальный', period: '21 день' },
]

const PURPOSES = [
  'Решение жилищного вопроса',
  'Развитие бизнеса',
  'Образование и развитие',
  'Здоровье и благополучие',
  'Путешествия и впечатления',
  'Помощь близким',
  'Творческие проекты',
]

export default function Transfer() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, addTransfer } = useApp()

  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [timing, setTiming] = useState('fast')

  // Цель перевода
  const [purposeOption, setPurposeOption] = useState<string>(PURPOSES[0])
  const [purposeCustom, setPurposeCustom] = useState('')

  // Реквизиты
  const [savedRequisites, setSavedRequisites] = useState<Requisite[]>([])
  const [requisiteMode, setRequisiteMode] = useState<'saved' | 'new'>('new')
  const [selectedRequisiteId, setSelectedRequisiteId] = useState<string>('')
  const [newReq, setNewReq] = useState({
    label: '',
    bankName: '',
    iban: '',
    bic: '',
    recipientName: '',
  })
  const [saveNewRequisite, setSaveNewRequisite] = useState(true)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [verifyOpen, setVerifyOpen] = useState(false)

  // Подхватываем сумму из URL (если пришли с лендинга)
  useEffect(() => {
    const params = new URLSearchParams(location.search || window.location.hash.split('?')[1] || '')
    const a = params.get('amount')
    const c = params.get('currency')
    if (a) setAmount(a)
    if (c) setCurrency(c)
  }, [location.search])

  // Загружаем сохранённые реквизиты пользователя из БД;
  // если пришли со страницы Реквизиты — подхватываем выбранные.
  useEffect(() => {
    const load = async () => {
      const reqs = await fetchRequisites()
      setSavedRequisites(reqs)
      if (reqs.length > 0) {
        setRequisiteMode('saved')
        const preselected = localStorage.getItem('vbi_preselected_requisite')
        if (preselected && reqs.find(r => r.id === preselected)) {
          setSelectedRequisiteId(preselected)
          localStorage.removeItem('vbi_preselected_requisite')
        } else {
          setSelectedRequisiteId(reqs[0].id)
        }
      }
    }
    load()
  }, [])

  // Финальная цель — либо выбранная из списка, либо своя
  const finalPurpose = purposeOption === '__custom__' ? purposeCustom.trim() : purposeOption

  // Финальные реквизиты — для отображения и записи
  const finalRequisites: { bankName: string; iban: string; bic: string; recipientName: string } | null = (() => {
    if (requisiteMode === 'saved') {
      const r = savedRequisites.find(x => x.id === selectedRequisiteId)
      return r ? { bankName: r.bankName, iban: r.iban, bic: r.bic, recipientName: r.recipientName } : null
    }
    if (!newReq.iban || !newReq.recipientName) return null
    return {
      bankName: newReq.bankName,
      iban: newReq.iban,
      bic: newReq.bic,
      recipientName: newReq.recipientName,
    }
  })()

  const canSubmit = !!amount && !!finalPurpose && !!finalRequisites

  const handleSendTransfer = async () => {
    setError('')
    if (!canSubmit) {
      setError('Заполни все поля перевода')
      return
    }
    setLoading(true)

    const selectedTiming = TIMINGS.find(t => t.id === timing)!

    // Если пользователь ввёл новые реквизиты и попросил сохранить — записываем в БД
    if (requisiteMode === 'new' && saveNewRequisite && finalRequisites) {
      const saved = await saveRequisite({
        label: newReq.label || finalRequisites.recipientName || finalRequisites.bankName || 'Реквизиты',
        recipientName: finalRequisites.recipientName,
        bankName: finalRequisites.bankName,
        iban: finalRequisites.iban,
        bic: finalRequisites.bic,
      })
      if (saved.ok && saved.data) {
        setSavedRequisites(prev => [saved.data!, ...prev])
      }
    }

    const result = await addTransfer({
      amount,
      currency,
      type: finalPurpose,
      timing: `${selectedTiming.label} (${selectedTiming.period})`,
      createdAt: new Date().toISOString(),
      status: 'pending',
    })

    setLoading(false)
    setVerifyOpen(false)
    if (!result.ok) {
      setError(result.error || 'Не удалось сохранить перевод')
      return
    }
    setStep('success')
  }

  // ───────── Экран успеха ─────────
  if (step === 'success') {
    return (
      <CabinetLayout>
        <div className="flex items-center justify-center min-h-screen p-8">
          <div className="max-w-md text-center">
            <div className="text-6xl text-gold-400/60 mb-6 animate-float">∞</div>
            <h1 className="font-serif text-4xl text-ink-900 mb-4">
              Перевод активирован
            </h1>
            <div className="gold-divider" />
            <p className="font-sans text-ink-700 mb-4">
              Твоё намерение принято Вселенной.
            </p>
            <div className="glass-card p-6 mb-8 text-left space-y-3 rounded-2xl">
              <div className="flex justify-between text-sm">
                <span className="text-ink-500 font-sans">Сумма</span>
                <span className="text-ink-900 font-serif">{amount} {currency}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink-500 font-sans">Цель</span>
                <span className="text-ink-700 font-sans">{finalPurpose}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink-500 font-sans">Срок поступления</span>
                <span className="text-ink-700 font-sans">{TIMINGS.find(t => t.id === timing)?.period}</span>
              </div>
              {finalRequisites && (
                <div className="flex justify-between text-sm">
                  <span className="text-ink-500 font-sans">Получатель</span>
                  <span className="text-ink-700 font-sans">{finalRequisites.recipientName}</span>
                </div>
              )}
            </div>
            <p className="font-sans text-ink-500 text-xs mb-8">
              Подтверждение перевода отправлено на {user?.email}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/paths')}
                className="flex-1 btn-gold text-sm px-6 py-2.5"
              >
                Благотворительность
              </button>
              <button
                onClick={() => navigate('/cabinet')}
                className="flex-1 btn-outline text-sm px-6 py-2.5"
              >
                В кабинет
              </button>
            </div>
          </div>
        </div>
      </CabinetLayout>
    )
  }

  // ───────── Форма перевода ─────────
  return (
    <CabinetLayout>
      <div className="p-4 md:p-10">
        {/* Один общий заголовок над всей страницей */}
        <div className="mb-8">
          <div className="tag mb-2">Давай выполним твой перевод</div>
          <h1 className="font-serif text-2xl md:text-3xl text-ink-900 mb-2">
            Заполни форму для перевода
          </h1>
          <div className="w-12 h-px bg-gold-500" />
        </div>

        {/* Две равные колонки */}
        <div className="xl:grid xl:grid-cols-2 xl:gap-6 xl:items-start">
          {/* Левая колонка — плашки формы */}
          <div className="space-y-5">

            {/* Сумма */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="tag mb-4 text-sm">Сумма перевода</div>
              <div className="flex gap-3">
                <input
                  className="input-field flex-1 text-xl font-serif"
                  placeholder="Введи сумму"
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
            </div>

            {/* Цель перевода */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="tag mb-4 text-sm">Цель перевода</div>
              <select
                className="input-field mb-3"
                value={purposeOption}
                onChange={e => setPurposeOption(e.target.value)}
              >
                {PURPOSES.map(p => <option key={p} value={p}>{p}</option>)}
                <option value="__custom__">Свой вариант…</option>
              </select>
              {purposeOption === '__custom__' && (
                <input
                  className="input-field"
                  placeholder="Опишите цель перевода"
                  value={purposeCustom}
                  onChange={e => setPurposeCustom(e.target.value)}
                />
              )}
            </div>

            {/* Срок поступления */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="tag mb-4 text-sm">Срок поступления средств</div>
              <div className="grid grid-cols-2 gap-3">
                {TIMINGS.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTiming(t.id)}
                    className={`p-4 text-left border transition-all duration-200 rounded-lg ${
                      timing === t.id
                        ? 'border-gold-500 bg-gold-500/10'
                        : 'border-gold-300/30 hover:border-gold-400'
                    }`}
                  >
                    <div className="font-sans text-sm text-ink-700 font-medium">{t.label}</div>
                    <div className="font-serif text-gold-600 text-lg">{t.period}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Реквизиты перевода */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="tag mb-4 text-sm">Реквизиты перевода</div>

              {/* Переключатель: сохранённые / новые */}
              <div className="flex gap-2 mb-5">
                <button
                  type="button"
                  disabled={savedRequisites.length === 0}
                  onClick={() => setRequisiteMode('saved')}
                  className={`flex-1 py-2.5 px-4 text-sm font-sans font-medium tracking-widest uppercase border transition-all duration-200 ${
                    requisiteMode === 'saved'
                      ? 'bg-gold-500 text-white border-gold-500'
                      : 'border-gold-300/60 text-ink-500 hover:border-gold-500'
                  } ${savedRequisites.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{ borderRadius: '12px' }}
                >
                  Из сохранённых{savedRequisites.length > 0 ? ` (${savedRequisites.length})` : ''}
                </button>
                <button
                  type="button"
                  onClick={() => setRequisiteMode('new')}
                  className={`flex-1 py-2.5 px-4 text-sm font-sans font-medium tracking-widest uppercase border transition-all duration-200 ${
                    requisiteMode === 'new'
                      ? 'bg-gold-500 text-white border-gold-500'
                      : 'border-gold-300/60 text-ink-500 hover:border-gold-500'
                  }`}
                  style={{ borderRadius: '12px' }}
                >
                  Внести новые
                </button>
              </div>

              {requisiteMode === 'saved' && savedRequisites.length > 0 && (
                <select
                  className="input-field"
                  value={selectedRequisiteId}
                  onChange={e => setSelectedRequisiteId(e.target.value)}
                >
                  {savedRequisites.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.label} — {r.iban || r.bankName}
                    </option>
                  ))}
                </select>
              )}

              {requisiteMode === 'new' && (
                <div className="space-y-3">
                  <input
                    className="input-field"
                    placeholder="Имя получателя"
                    value={newReq.recipientName}
                    onChange={e => setNewReq({ ...newReq, recipientName: e.target.value })}
                  />
                  <input
                    className="input-field"
                    placeholder="Название банка"
                    value={newReq.bankName}
                    onChange={e => setNewReq({ ...newReq, bankName: e.target.value })}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      className="input-field"
                      placeholder="IBAN"
                      value={newReq.iban}
                      onChange={e => setNewReq({ ...newReq, iban: e.target.value })}
                    />
                    <input
                      className="input-field"
                      placeholder="BIC / SWIFT"
                      value={newReq.bic}
                      onChange={e => setNewReq({ ...newReq, bic: e.target.value })}
                    />
                  </div>
                  <input
                    className="input-field"
                    placeholder="Название (например: «UBS — Личный»)"
                    value={newReq.label}
                    onChange={e => setNewReq({ ...newReq, label: e.target.value })}
                  />
                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={saveNewRequisite}
                      onChange={e => setSaveNewRequisite(e.target.checked)}
                      className="accent-gold-500"
                    />
                    <span className="font-sans text-xs text-ink-500">
                      Сохранить эти реквизиты для будущих переводов
                    </span>
                  </label>
                </div>
              )}
            </div>

            {error && (
              <div className="font-sans text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            {/* Кнопки */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  setError('')
                  if (!canSubmit) { setError('Заполни все поля перевода'); return }
                  setVerifyOpen(true)
                }}
                className="flex-1 btn-outline text-sm px-6 py-2.5"
              >
                Проверить перевод
              </button>
              <button
                onClick={handleSendTransfer}
                disabled={!canSubmit || loading}
                className="flex-1 btn-gold text-sm px-6 py-2.5 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <><span className="animate-spin">⟳</span> Отправляем...</> : 'Отправить перевод'}
              </button>
            </div>
          </div>

          {/* Правая колонка — Свод правил. Внутри плашки tag+h2, без отдельного H1. */}
          <div className="mt-8 xl:mt-0">
            <div className="glass-card p-6 md:p-8 rounded-2xl">
              <div className="tag text-sm mb-2">Свод обязательных правил</div>
              <h2 className="font-serif text-2xl text-ink-900 mb-2">Протокол взаимодействия с Банком Вселенной</h2>
              <div className="w-12 h-px bg-gold-400 mb-5" />
              <p className="font-sans text-sm text-ink-700 leading-relaxed mb-3">
                Чтобы транзакции успешно переносились из невидимого поля в плотную материю, соблюдай протокол взаимодействия с Банком Вселенной.
              </p>
              <div className="space-y-4">
                {[
                  ['Правило целевой материализации', 'Запрещено выводить суммы в пустоту или из чувства жадности. Каждая транзакция должна иметь чёткий вектор намерения (здоровье, расширение пространства, эволюция души и т. п.). Вселенная понимает только конкретные задачи, подкреплённые готовностью действовать.'],
                  ['Правило биохимического подтверждения', 'В момент нажатия кнопки «Отправить перевод» запусти по венам химию искреннего триумфа. Тело должно физически ощутить мурашки благодарности за то, что деньги уже у тебя. Без этого эмоционального обеспечения транзакция признаётся пустой ментальной концепцией и отклоняется Квантовым полем.'],
                  ['Правило золотого стандарта', 'Твоя благодарность — главная валюта Вселенной, удерживающая квантовый сигнал. Празднуй триумф до того, как увидишь его на реальной карте, — и материя подчинится.'],
                  ['Защита от системных ошибок', 'Как только ты включаешь контроль, страх или начинаешь судорожно думать «как именно и откуда эти деньги придут ко мне», система расценивает это как сомнение и выдаёт ошибку. Любая попытка эго диктовать Вселенной сценарии проявления мгновенно замораживает транзакцию. Перевёл? Забудь и доверься Пространству.'],
                ].map(([title, text]) => (
                  <div key={title}>
                    <h3 className="font-serif text-xl text-ink-900 mb-1 leading-tight">{title}</h3>
                    <p className="font-sans text-sm text-ink-700 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модал «Проверить перевод» */}
      {verifyOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/70 backdrop-blur-sm p-6"
          onClick={() => setVerifyOpen(false)}
        >
          <div
            className="bg-cream-100 max-w-lg w-full p-8 rounded-2xl shadow-gold-lg border border-gold-400/40 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="tag mb-2 text-sm">Проверка перевода</div>
              <h2 className="font-serif text-2xl text-ink-900">Подтверди данные</h2>
              <div className="w-12 h-px bg-gold-400 mx-auto mt-4" />
            </div>

            <div className="space-y-3 mb-6">
              <Row label="Сумма" value={`${amount} ${currency}`} bold />
              <Row label="Цель перевода" value={finalPurpose} />
              <Row label="Срок поступления" value={`${TIMINGS.find(t => t.id === timing)?.label} (${TIMINGS.find(t => t.id === timing)?.period})`} />
              {finalRequisites && (
                <>
                  <div className="border-t border-gold-300/30 my-3" />
                  <Row label="Получатель" value={finalRequisites.recipientName} />
                  <Row label="Банк" value={finalRequisites.bankName} />
                  <Row label="IBAN" value={finalRequisites.iban} />
                  {finalRequisites.bic && <Row label="BIC / SWIFT" value={finalRequisites.bic} />}
                </>
              )}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setVerifyOpen(false)} className="flex-1 btn-outline">
                Изменить
              </button>
              <button
                onClick={handleSendTransfer}
                disabled={loading}
                className="flex-1 btn-gold disabled:opacity-50"
              >
                {loading ? 'Отправляем...' : 'Подтвердить и отправить'}
              </button>
            </div>
          </div>
        </div>
      )}
    </CabinetLayout>
  )
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-ink-500 font-sans whitespace-nowrap">{label}</span>
      <span className={`text-right font-sans ${bold ? 'text-ink-900 font-serif text-base' : 'text-ink-700'}`}>
        {value || '—'}
      </span>
    </div>
  )
}
