import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import CabinetLayout from '../components/CabinetLayout'
import { formatThousands, digitsOnly } from '../lib/format'
import { useT } from '../i18n'

// Канонические (русские) строки срока — пишутся в БД, чтобы аналитика
// не зависела от языка интерфейса. Отображение берётся из t.timings.
const TIMING_DB: Record<string, string> = {
  fast: 'Быстрый (1–3 дня)',
  standard: 'Стандартный (5–7 дней)',
  extended: 'Расширенный (10 дней)',
  max: 'Максимальный (21 день)',
}

export default function Transfer() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, addTransfer } = useApp()

  const t = useT({
    ru: {
      // Массив сроков (перенесён внутрь компонента для перевода отображения)
      timings: [
        { id: 'fast', label: 'Быстрый', period: '1–3 дня' },
        { id: 'standard', label: 'Стандартный', period: '5–7 дней' },
        { id: 'extended', label: 'Расширенный', period: '10 дней' },
        { id: 'max', label: 'Максимальный', period: '21 день' },
      ],
      // Цели перевода. value — русский канонический (пишется в БД), label — отображение.
      purposes: [
        { value: 'Решение жилищного вопроса', label: 'Решение жилищного вопроса' },
        { value: 'Развитие бизнеса', label: 'Развитие бизнеса' },
        { value: 'Образование и развитие', label: 'Образование и развитие' },
        { value: 'Здоровье и благополучие', label: 'Здоровье и благополучие' },
        { value: 'Путешествия и впечатления', label: 'Путешествия и впечатления' },
        { value: 'Помощь близким', label: 'Помощь близким' },
        { value: 'Творческие проекты', label: 'Творческие проекты' },
      ],
      errFill: 'Заполни все поля перевода',
      errSave: 'Не удалось сохранить перевод',
      successTitle: 'Перевод активирован',
      successIntent: 'Твоё намерение принято Вселенной.',
      amount: 'Сумма',
      purpose: 'Цель',
      arrival: 'Срок поступления',
      recipient: 'Получатель',
      confirmationSentTo: 'Подтверждение перевода отправлено на',
      charity: 'Благотворительность',
      toCabinet: 'В кабинет',
      formTag: 'Давай выполним твой перевод',
      formHeading: 'Заполни форму для перевода',
      amountTag: 'Сумма перевода',
      amountPlaceholder: 'Введи сумму',
      purposeTag: 'Цель перевода',
      customOption: 'Свой вариант…',
      customPlaceholder: 'Опишите цель перевода',
      arrivalTag: 'Срок поступления средств',
      detailsTag: 'Реквизиты перевода',
      recipientName: 'Имя получателя',
      bankName: 'Название банка',
      reviewTransfer: 'Проверить перевод',
      sending: 'Отправляем...',
      sendTransfer: 'Отправить перевод',
      rulesTag: 'Свод обязательных правил',
      rulesHeading: 'Протокол взаимодействия с Банком Вселенной',
      rulesIntro: 'Чтобы транзакции успешно переносились из невидимого поля в плотную материю, соблюдай протокол взаимодействия с Банком Вселенной.',
      rules: [
        ['Правило целевой материализации', 'Запрещено выводить суммы в пустоту или из чувства жадности. Каждая транзакция должна иметь чёткий вектор намерения (здоровье, расширение пространства, эволюция души и т. п.). Вселенная понимает только конкретные задачи, подкреплённые готовностью действовать.'],
        ['Правило биохимического подтверждения', 'В момент нажатия кнопки «Отправить перевод» запусти по венам химию искреннего триумфа. Тело должно физически ощутить мурашки благодарности за то, что деньги уже у тебя. Без этого эмоционального обеспечения транзакция признаётся пустой ментальной концепцией и отклоняется Квантовым полем.'],
        ['Правило золотого стандарта', 'Твоя благодарность — главная валюта Вселенной, удерживающая квантовый сигнал. Празднуй триумф до того, как увидишь его на реальной карте, — и материя подчинится.'],
        ['Защита от системных ошибок', 'Как только ты включаешь контроль, страх или начинаешь судорожно думать «как именно и откуда эти деньги придут ко мне», система расценивает это как сомнение и выдаёт ошибку. Любая попытка эго диктовать Вселенной сценарии проявления мгновенно замораживает транзакцию. Перевёл? Забудь и доверься Пространству.'],
      ] as [string, string][],
      verifyTag: 'Проверка перевода',
      verifyHeading: 'Подтверди данные',
      purposeOfTransfer: 'Цель перевода',
      bank: 'Банк',
      edit: 'Изменить',
      confirmAndSend: 'Подтвердить и отправить',
    },
    en: {
      timings: [
        { id: 'fast', label: 'Fast', period: '1–3 days' },
        { id: 'standard', label: 'Standard', period: '5–7 days' },
        { id: 'extended', label: 'Extended', period: '10 days' },
        { id: 'max', label: 'Maximum', period: '21 days' },
      ],
      purposes: [
        { value: 'Решение жилищного вопроса', label: 'Solving the housing question' },
        { value: 'Развитие бизнеса', label: 'Growing a business' },
        { value: 'Образование и развитие', label: 'Education and growth' },
        { value: 'Здоровье и благополучие', label: 'Health and wellbeing' },
        { value: 'Путешествия и впечатления', label: 'Travel and experiences' },
        { value: 'Помощь близким', label: 'Helping loved ones' },
        { value: 'Творческие проекты', label: 'Creative projects' },
      ],
      errFill: 'Fill in all transfer fields',
      errSave: 'Could not save the transfer',
      successTitle: 'Transfer activated',
      successIntent: 'Your intention has been accepted by the Universe.',
      amount: 'Amount',
      purpose: 'Purpose',
      arrival: 'Time until arrival',
      recipient: 'Recipient',
      confirmationSentTo: 'Transfer confirmation sent to',
      charity: 'Charity',
      toCabinet: 'Back to dashboard',
      formTag: "Let's complete your transfer",
      formHeading: 'Fill in the transfer form',
      amountTag: 'Transfer amount',
      amountPlaceholder: 'Enter an amount',
      purposeTag: 'Purpose of transfer',
      customOption: 'Custom purpose…',
      customPlaceholder: 'Describe the purpose of the transfer',
      arrivalTag: 'Time until funds arrive',
      detailsTag: 'Transfer details',
      recipientName: 'Recipient name',
      bankName: 'Bank name',
      reviewTransfer: 'Review transfer',
      sending: 'Sending...',
      sendTransfer: 'Send transfer',
      rulesTag: 'Mandatory rules',
      rulesHeading: 'Protocol of interaction with the Bank of the Universe',
      rulesIntro: 'For transactions to successfully cross over from the invisible field into dense matter, follow the protocol of interaction with the Bank of the Universe.',
      rules: [
        ['The rule of targeted materialization', 'It is forbidden to withdraw sums into the void or out of a feeling of greed. Every transaction must carry a clear vector of intention (health, the expansion of your space, the evolution of the soul, and so on). The Universe understands only concrete objectives backed by a readiness to act.'],
        ['The rule of biochemical confirmation', 'The moment you press «Send transfer», send the chemistry of genuine triumph coursing through your veins. Your body must physically feel the shivers of gratitude that the money is already yours. Without this emotional collateral, the transaction is deemed an empty mental concept and is rejected by the Quantum field.'],
        ['The rule of the gold standard', "Your gratitude is the Universe's principal currency, the one that holds the quantum signal steady. Celebrate the triumph before you see it on a real card — and matter will obey."],
        ['Protection against system errors', 'The moment you switch on control, fear, or start anxiously thinking «exactly how and from where this money will come to me», the system reads it as doubt and returns an error. Any attempt by the ego to dictate scenarios of manifestation to the Universe instantly freezes the transaction. Sent it? Let go and trust the Space.'],
      ] as [string, string][],
      verifyTag: 'Transfer review',
      verifyHeading: 'Confirm the details',
      purposeOfTransfer: 'Purpose of transfer',
      bank: 'Bank',
      edit: 'Edit',
      confirmAndSend: 'Confirm and send',
    },
  })

  const TIMINGS = t.timings
  const PURPOSES = t.purposes

  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [timing, setTiming] = useState('fast')

  // Цель перевода. Значение — русский канонический value (пишется в БД).
  const [purposeOption, setPurposeOption] = useState<string>(PURPOSES[0].value)
  const [purposeCustom, setPurposeCustom] = useState('')

  // Реквизиты получателя — вводятся при каждом переводе и нигде не сохраняются
  const [newReq, setNewReq] = useState({
    bankName: '',
    iban: '',
    bic: '',
    recipientName: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [verifyOpen, setVerifyOpen] = useState(false)

  // Подхватываем сумму из URL (если пришли с лендинга)
  useEffect(() => {
    const params = new URLSearchParams(location.search || window.location.hash.split('?')[1] || '')
    const a = params.get('amount')
    const c = params.get('currency')
    if (a) setAmount(digitsOnly(a))
    if (c) setCurrency(c)
  }, [location.search])

  // Финальная цель для записи в БД — русский канонический value либо своя формулировка
  const finalPurpose = purposeOption === '__custom__' ? purposeCustom.trim() : purposeOption

  // Отображаемая цель — переведённая метка либо своя формулировка пользователя
  const finalPurposeDisplay = purposeOption === '__custom__'
    ? purposeCustom.trim()
    : (PURPOSES.find(p => p.value === purposeOption)?.label || purposeOption)

  // Финальные реквизиты — введённые в форме (обязательны имя получателя и IBAN)
  const finalRequisites: { bankName: string; iban: string; bic: string; recipientName: string } | null =
    !newReq.iban || !newReq.recipientName
      ? null
      : {
          bankName: newReq.bankName,
          iban: newReq.iban,
          bic: newReq.bic,
          recipientName: newReq.recipientName,
        }

  const canSubmit = !!amount && !!finalPurpose && !!finalRequisites

  const handleSendTransfer = async () => {
    setError('')
    if (!canSubmit) {
      setError(t.errFill)
      return
    }
    setLoading(true)

    const result = await addTransfer({
      amount,
      currency,
      type: finalPurpose,
      // В БД пишем русскую каноническую строку срока, чтобы аналитика не зависела от языка
      timing: TIMING_DB[timing],
      createdAt: new Date().toISOString(),
      status: 'pending',
    })

    setLoading(false)
    setVerifyOpen(false)
    if (!result.ok) {
      setError(result.error || t.errSave)
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
              {t.successTitle}
            </h1>
            <div className="gold-divider" />
            <p className="font-sans text-ink-700 mb-4">
              {t.successIntent}
            </p>
            <div className="glass-card p-6 mb-8 text-left space-y-3 rounded-2xl">
              <div className="flex justify-between text-sm">
                <span className="text-ink-500 font-sans">{t.amount}</span>
                <span className="text-ink-900 font-serif">{formatThousands(amount)} {currency}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink-500 font-sans">{t.purpose}</span>
                <span className="text-ink-700 font-sans">{finalPurposeDisplay}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink-500 font-sans">{t.arrival}</span>
                <span className="text-ink-700 font-sans">{TIMINGS.find(ti => ti.id === timing)?.period}</span>
              </div>
              {finalRequisites && (
                <div className="flex justify-between text-sm">
                  <span className="text-ink-500 font-sans">{t.recipient}</span>
                  <span className="text-ink-700 font-sans">{finalRequisites.recipientName}</span>
                </div>
              )}
            </div>
            <p className="font-sans text-ink-500 text-xs mb-8">
              {t.confirmationSentTo} {user?.email}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/paths')}
                className="flex-1 btn-gold text-sm px-6 py-2.5"
              >
                {t.charity}
              </button>
              <button
                onClick={() => navigate('/cabinet')}
                className="flex-1 btn-outline text-sm px-6 py-2.5"
              >
                {t.toCabinet}
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
          <div className="tag mb-2">{t.formTag}</div>
          <h1 className="font-serif text-2xl md:text-3xl text-ink-900 mb-2">
            {t.formHeading}
          </h1>
          <div className="w-12 h-px bg-gold-500" />
        </div>

        {/* Две равные колонки */}
        <div className="xl:grid xl:grid-cols-2 xl:gap-6 xl:items-start">
          {/* Левая колонка — плашки формы */}
          <div className="space-y-5">

            {/* Сумма */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="tag mb-4 text-sm">{t.amountTag}</div>
              <div className="flex gap-3">
                <input
                  className="input-field flex-1 text-xl font-serif"
                  placeholder={t.amountPlaceholder}
                  inputMode="numeric"
                  value={formatThousands(amount)}
                  onChange={e => setAmount(digitsOnly(e.target.value))}
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
              <div className="tag mb-4 text-sm">{t.purposeTag}</div>
              <select
                className="input-field mb-3"
                value={purposeOption}
                onChange={e => setPurposeOption(e.target.value)}
              >
                {PURPOSES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                <option value="__custom__">{t.customOption}</option>
              </select>
              {purposeOption === '__custom__' && (
                <input
                  className="input-field"
                  placeholder={t.customPlaceholder}
                  value={purposeCustom}
                  onChange={e => setPurposeCustom(e.target.value)}
                />
              )}
            </div>

            {/* Срок поступления */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="tag mb-4 text-sm">{t.arrivalTag}</div>
              <div className="grid grid-cols-2 gap-3">
                {TIMINGS.map(ti => (
                  <button
                    key={ti.id}
                    type="button"
                    onClick={() => setTiming(ti.id)}
                    className={`p-4 text-left border transition-all duration-200 rounded-lg ${
                      timing === ti.id
                        ? 'border-gold-500 bg-gold-500/10'
                        : 'border-gold-300/30 hover:border-gold-400'
                    }`}
                  >
                    <div className="font-sans text-sm text-ink-700 font-medium">{ti.label}</div>
                    <div className="font-serif text-gold-600 text-lg">{ti.period}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Реквизиты перевода */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="tag mb-4 text-sm">{t.detailsTag}</div>

              <div className="space-y-3">
                <input
                  className="input-field"
                  placeholder={t.recipientName}
                  value={newReq.recipientName}
                  onChange={e => setNewReq({ ...newReq, recipientName: e.target.value })}
                />
                <input
                  className="input-field"
                  placeholder={t.bankName}
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
              </div>
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
                  if (!canSubmit) { setError(t.errFill); return }
                  setVerifyOpen(true)
                }}
                className="flex-1 btn-outline text-sm px-6 py-2.5"
              >
                {t.reviewTransfer}
              </button>
              <button
                onClick={handleSendTransfer}
                disabled={!canSubmit || loading}
                className="flex-1 btn-gold text-sm px-6 py-2.5 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <><span className="animate-spin">⟳</span> {t.sending}</> : t.sendTransfer}
              </button>
            </div>
          </div>

          {/* Правая колонка — Свод правил. Внутри плашки tag+h2, без отдельного H1. */}
          <div className="mt-8 xl:mt-0">
            <div className="glass-card p-6 md:p-8 rounded-2xl">
              <div className="tag text-sm mb-2">{t.rulesTag}</div>
              <h2 className="font-serif text-2xl text-ink-900 mb-2">{t.rulesHeading}</h2>
              <div className="w-12 h-px bg-gold-400 mb-5" />
              <p className="font-sans text-sm text-ink-700 leading-relaxed mb-3">
                {t.rulesIntro}
              </p>
              <div className="space-y-4">
                {t.rules.map(([title, text]) => (
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
              <div className="tag mb-2 text-sm">{t.verifyTag}</div>
              <h2 className="font-serif text-2xl text-ink-900">{t.verifyHeading}</h2>
              <div className="w-12 h-px bg-gold-400 mx-auto mt-4" />
            </div>

            <div className="space-y-3 mb-6">
              <Row label={t.amount} value={`${formatThousands(amount)} ${currency}`} bold />
              <Row label={t.purposeOfTransfer} value={finalPurposeDisplay} />
              <Row label={t.arrival} value={`${TIMINGS.find(ti => ti.id === timing)?.label} (${TIMINGS.find(ti => ti.id === timing)?.period})`} />
              {finalRequisites && (
                <>
                  <div className="border-t border-gold-300/30 my-3" />
                  <Row label={t.recipient} value={finalRequisites.recipientName} />
                  <Row label={t.bank} value={finalRequisites.bankName} />
                  <Row label="IBAN" value={finalRequisites.iban} />
                  {finalRequisites.bic && <Row label="BIC / SWIFT" value={finalRequisites.bic} />}
                </>
              )}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setVerifyOpen(false)} className="flex-1 btn-outline">
                {t.edit}
              </button>
              <button
                onClick={handleSendTransfer}
                disabled={loading}
                className="flex-1 btn-gold disabled:opacity-50"
              >
                {loading ? t.sending : t.confirmAndSend}
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
