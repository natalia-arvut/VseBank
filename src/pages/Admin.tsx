import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { supabase } from '../lib/supabase'
import VseBankLogo from '../components/VseBankLogo'

// ─────────────────────────────────────────────────────────
// Админ-панель — агрегированная аналитика по сайту.
//
// Принцип: НИКАКИХ персональных данных в отчётах. Только цифры,
// проценты и распределения. Email/имя/конкретные записи здесь
// не показываются.
//
// Доступ: только пользователям с profiles.is_admin = true.
// RLS-политики в БД пускают админов ко всем строкам profiles/transfers/reviews.
// ─────────────────────────────────────────────────────────

interface ProfileData {
  id: string
  country: string
  registered_at: string
}

interface TransferData {
  id: string
  user_id: string
  amount: string
  currency: string
  type: string
  timing: string
  status: string
  created_at: string
}

type Preset = 'today' | '7d' | '30d' | 'all' | 'custom'

const PRESETS: { id: Preset; label: string }[] = [
  { id: 'today', label: 'Сегодня' },
  { id: '7d', label: '7 дней' },
  { id: '30d', label: '30 дней' },
  { id: 'all', label: 'Всё время' },
  { id: 'custom', label: 'Произвольный' },
]

// Предустановленные цели переводов из формы (src/pages/Transfer.tsx).
// Всё, что пользователь ввёл вручную через «Свой вариант…», группируется
// в «Другое» — чтобы личные формулировки не попадали в аналитику.
const ALLOWED_PURPOSES = [
  'Решение жилищного вопроса',
  'Развитие бизнеса',
  'Образование и развитие',
  'Здоровье и благополучие',
  'Путешествия и впечатления',
  'Помощь близким',
  'Творческие проекты',
]

// Компактное форматирование сумм для аналитики.
// В «Банке изобилия» пользователи вводят суммы с произвольным числом нулей
// (миллиарды, триллионы и больше), поэтому полное число ломает вёрстку —
// вылезает из карточки и накладывается на соседние. Показываем короткую
// форму (1,2 млрд), а полное число оставляем в подсказке при наведении.
const COMPACT_SCALES: { value: number; suffix: string }[] = [
  { value: 1e33, suffix: 'дец.' }, // дециллион
  { value: 1e30, suffix: 'нон.' }, // нониллион
  { value: 1e27, suffix: 'окт.' }, // октиллион
  { value: 1e24, suffix: 'септ.' }, // септиллион
  { value: 1e21, suffix: 'секст.' }, // секстиллион
  { value: 1e18, suffix: 'квинт.' }, // квинтиллион
  { value: 1e15, suffix: 'квадр.' }, // квадриллион
  { value: 1e12, suffix: 'трлн' }, // триллион
  { value: 1e9, suffix: 'млрд' }, // миллиард
  { value: 1e6, suffix: 'млн' }, // миллион
]

function formatCompactAmount(n: number): string {
  if (!isFinite(n)) return '∞'
  if (n < 1e6) return n.toLocaleString('de-DE')
  for (const { value, suffix } of COMPACT_SCALES) {
    if (n >= value) {
      const scaled = n / value
      // до 2 знаков после запятой, без хвостовых нулей
      const num = scaled
        .toLocaleString('ru-RU', { maximumFractionDigits: 2 })
      return `${num} ${suffix}`
    }
  }
  // за пределами шкалы — научная запись
  return n.toExponential(2)
}

// Полное число для подсказки. Гигантские значения теряют точность в Number,
// поэтому показываем то, что есть, аккуратно с разделителями разрядов.
function formatFullAmount(n: number): string {
  if (!isFinite(n)) return '∞'
  return n.toLocaleString('de-DE', { maximumFractionDigits: 0 })
}

export default function Admin() {
  const { user, logout } = useApp()
  const [profiles, setProfiles] = useState<ProfileData[]>([])
  const [transfers, setTransfers] = useState<TransferData[]>([])
  const [pendingReviews, setPendingReviews] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Фильтр периода
  const [preset, setPreset] = useState<Preset>('30d')
  const [customFrom, setCustomFrom] = useState('')
  const [customTo, setCustomTo] = useState('')

  // Загрузка всех данных. Объёмы маленькие, фильтруем на фронте.
  useEffect(() => {
    const load = async () => {
      try {
        const [pr, tr, rv] = await Promise.all([
          supabase.from('profiles').select('id, country, registered_at'),
          supabase.from('transfers').select('*'),
          supabase
            .from('reviews')
            .select('id', { count: 'exact', head: true })
            .eq('approved', false),
        ])
        if (pr.error) throw pr.error
        if (tr.error) throw tr.error
        if (rv.error) throw rv.error
        setProfiles((pr.data || []) as ProfileData[])
        setTransfers((tr.data || []) as TransferData[])
        setPendingReviews(rv.count || 0)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Не удалось загрузить данные')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // Вычисляем границы периода
  const { from, to } = useMemo(() => {
    const now = new Date()
    const startOfDay = (d: Date) => {
      const x = new Date(d)
      x.setHours(0, 0, 0, 0)
      return x
    }
    if (preset === 'today') return { from: startOfDay(now), to: now }
    if (preset === '7d') {
      const f = new Date(now)
      f.setDate(f.getDate() - 6)
      return { from: startOfDay(f), to: now }
    }
    if (preset === '30d') {
      const f = new Date(now)
      f.setDate(f.getDate() - 29)
      return { from: startOfDay(f), to: now }
    }
    if (preset === 'all') return { from: new Date(0), to: now }
    // custom
    const f = customFrom ? new Date(customFrom) : new Date(0)
    const t = customTo ? new Date(customTo + 'T23:59:59') : now
    return { from: f, to: t }
  }, [preset, customFrom, customTo])

  const profilesInPeriod = useMemo(
    () => profiles.filter(p => {
      const d = new Date(p.registered_at)
      return d >= from && d <= to
    }),
    [profiles, from, to]
  )

  const transfersInPeriod = useMemo(
    () => transfers.filter(t => {
      const d = new Date(t.created_at)
      return d >= from && d <= to
    }),
    [transfers, from, to]
  )

  // ───── KPI: сумма по валютам ─────
  const sumByCurrency = useMemo(() => {
    const map = new Map<string, number>()
    transfersInPeriod.forEach(t => {
      const n = parseInt(String(t.amount).replace(/\D/g, ''), 10)
      if (!isNaN(n)) map.set(t.currency, (map.get(t.currency) || 0) + n)
    })
    return [...map.entries()].sort((a, b) => b[1] - a[1])
  }, [transfersInPeriod])

  // ───── Конверсия в первый перевод ─────
  const conversion = useMemo(() => {
    if (profilesInPeriod.length === 0) return 0
    const periodIds = new Set(profilesInPeriod.map(p => p.id))
    const idsWithTransfer = new Set(
      transfersInPeriod.filter(t => periodIds.has(t.user_id)).map(t => t.user_id)
    )
    return Math.round((idsWithTransfer.size / profilesInPeriod.length) * 100)
  }, [profilesInPeriod, transfersInPeriod])

  // ───── География ─────
  const byCountry = useMemo(() => {
    const map = new Map<string, { reg: number; tr: number }>()
    profilesInPeriod.forEach(p => {
      const c = p.country?.trim() || '—'
      const cur = map.get(c) || { reg: 0, tr: 0 }
      cur.reg++
      map.set(c, cur)
    })
    transfersInPeriod.forEach(t => {
      const profile = profiles.find(p => p.id === t.user_id)
      if (!profile) return
      const c = profile.country?.trim() || '—'
      const cur = map.get(c) || { reg: 0, tr: 0 }
      cur.tr++
      map.set(c, cur)
    })
    return [...map.entries()]
      .map(([country, v]) => ({ country, ...v }))
      .sort((a, b) => b.reg + b.tr - (a.reg + a.tr))
  }, [profilesInPeriod, transfersInPeriod, profiles])

  // ───── Топ целей ─────
  // Свои формулировки (через «Свой вариант…») группируем в «Другое»,
  // чтобы личные данные не попадали в аналитику.
  const topPurposes = useMemo(() => {
    const map = new Map<string, number>()
    transfersInPeriod.forEach(t => {
      const key = ALLOWED_PURPOSES.includes(t.type) ? t.type : 'Другое'
      map.set(key, (map.get(key) || 0) + 1)
    })
    const total = transfersInPeriod.length || 1
    return [...map.entries()]
      .map(([purpose, count]) => ({ purpose, count, percent: Math.round((count / total) * 100) }))
      .sort((a, b) => b.count - a.count)
  }, [transfersInPeriod])

  // ───── Сроки поступления ─────
  const byTiming = useMemo(() => {
    const map = new Map<string, number>()
    transfersInPeriod.forEach(t => {
      // "Быстрый (1–3 дня)" → "Быстрый"
      const label = (t.timing.split('(')[0] || '').trim() || t.timing
      map.set(label, (map.get(label) || 0) + 1)
    })
    const total = transfersInPeriod.length || 1
    return [...map.entries()]
      .map(([label, count]) => ({ label, count, percent: Math.round((count / total) * 100) }))
      .sort((a, b) => b.count - a.count)
  }, [transfersInPeriod])

  // ───── Валюты ─────
  const byCurrency = useMemo(() => {
    const map = new Map<string, number>()
    transfersInPeriod.forEach(t => {
      map.set(t.currency, (map.get(t.currency) || 0) + 1)
    })
    const total = transfersInPeriod.length || 1
    return [...map.entries()]
      .map(([currency, count]) => ({ currency, count, percent: Math.round((count / total) * 100) }))
      .sort((a, b) => b.count - a.count)
  }, [transfersInPeriod])

  // ───── Данные графика по дням ─────
  const chartData = useMemo(() => {
    const startDay = new Date(from)
    startDay.setHours(0, 0, 0, 0)
    const endDay = new Date(Math.min(to.getTime(), Date.now()))
    endDay.setHours(0, 0, 0, 0)

    const rawCount = Math.round((endDay.getTime() - startDay.getTime()) / 86400000) + 1
    // Ограничиваем 90 точками — иначе график станет нечитаемым
    const dayCount = Math.min(Math.max(rawCount, 1), 90)

    const days: { date: string; reg: number; tr: number }[] = []
    for (let i = 0; i < dayCount; i++) {
      const d = new Date(startDay)
      d.setDate(d.getDate() + i)
      days.push({ date: d.toISOString().slice(0, 10), reg: 0, tr: 0 })
    }

    profilesInPeriod.forEach(p => {
      const iso = new Date(p.registered_at).toISOString().slice(0, 10)
      const day = days.find(d => d.date === iso)
      if (day) day.reg++
    })
    transfersInPeriod.forEach(t => {
      const iso = new Date(t.created_at).toISOString().slice(0, 10)
      const day = days.find(d => d.date === iso)
      if (day) day.tr++
    })

    return days
  }, [profilesInPeriod, transfersInPeriod, from, to])

  return (
    <div className="min-h-screen bg-cream-50">
      {/* ──────── Top bar ──────── */}
      <header className="border-b border-gold-300/30 bg-cream-100/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/cabinet" className="block">
              <VseBankLogo size="sm" />
            </Link>
            <div className="hidden sm:block w-px h-8 bg-gold-300/40" />
            <div className="hidden sm:block">
              <div className="tag text-xs">Администрирование</div>
              <h1 className="font-serif text-lg text-ink-900 leading-tight">Аналитика VseBank</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline font-sans text-xs text-ink-500">{user?.email}</span>
            <button
              onClick={() => logout()}
              className="btn-outline text-xs px-4 py-2"
            >
              Выход
            </button>
          </div>
        </div>
      </header>

      {/* ──────── Контент ──────── */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">

        {/* Заголовок страницы (mobile) */}
        <div className="sm:hidden">
          <div className="tag mb-2">Администрирование</div>
          <h1 className="font-serif text-2xl text-ink-900 mb-2">Аналитика VseBank</h1>
          <div className="w-12 h-px bg-gold-500" />
        </div>

        {/* ──────── Фильтр периода ──────── */}
        <div className="glass-card p-5 rounded-2xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-sans text-xs text-ink-500 tracking-widest uppercase mr-2">Период</span>
            {PRESETS.map(p => (
              <button
                key={p.id}
                onClick={() => setPreset(p.id)}
                className={`text-sm font-sans px-3 py-1.5 border rounded-full transition-all ${
                  preset === p.id
                    ? 'bg-gold-500 text-white border-gold-500'
                    : 'border-gold-300/60 text-ink-700 hover:border-gold-500'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          {preset === 'custom' && (
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <label className="font-sans text-xs text-ink-500">с</label>
              <input
                type="date"
                value={customFrom}
                onChange={e => setCustomFrom(e.target.value)}
                className="input-field py-1.5 px-3 text-sm w-auto"
              />
              <label className="font-sans text-xs text-ink-500">по</label>
              <input
                type="date"
                value={customTo}
                onChange={e => setCustomTo(e.target.value)}
                className="input-field py-1.5 px-3 text-sm w-auto"
              />
            </div>
          )}
        </div>

        {error && (
          <div className="font-sans text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3 rounded-md">
            Ошибка загрузки: {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <div className="text-4xl text-gold-500 animate-spin inline-block">⟳</div>
            <p className="font-sans text-stone-500 mt-3 text-sm">Загружаем аналитику...</p>
          </div>
        ) : (
          <>
            {/* ──────── KPI карточки ──────── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Kpi label="Регистраций" value={profilesInPeriod.length} hint="за выбранный период" />
              <Kpi label="Переводов" value={transfersInPeriod.length} hint="за выбранный период" />
              <Kpi
                label="Конверсия"
                value={`${conversion}%`}
                hint="зарегистрированных сделали перевод"
              />
              <Link to="/admin/reviews" className="block transition-transform hover:-translate-y-0.5">
                <Kpi
                  label="Отзывы на модерации"
                  value={pendingReviews}
                  hint={pendingReviews > 0 ? 'открыть модерацию →' : 'всё проверено, очередь пуста'}
                />
              </Link>
            </div>

            {/* Сумма переводов по валютам */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="tag text-sm mb-2">Сумма переводов</div>
              <h2 className="font-serif text-xl text-ink-900 mb-2">По валютам, за период</h2>
              <div className="w-12 h-px bg-gold-400 mb-5" />
              {sumByCurrency.length === 0 ? (
                <p className="font-sans text-sm text-ink-500">Нет переводов в выбранном периоде.</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {sumByCurrency.map(([currency, sum]) => (
                    <div key={currency} className="border border-gold-300/30 rounded-xl p-4 min-w-0">
                      <div className="font-sans text-xs text-ink-500 tracking-widest uppercase mb-1">{currency}</div>
                      <div
                        className="font-serif text-2xl text-ink-900 lining-nums truncate"
                        title={`${formatFullAmount(sum)} ${currency}`}
                      >
                        {formatCompactAmount(sum)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ──────── График ──────── */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-start justify-between flex-wrap gap-3 mb-2">
                <div>
                  <div className="tag text-sm mb-2">Активность по дням</div>
                  <h2 className="font-serif text-xl text-ink-900">Регистрации и переводы</h2>
                </div>
                <div className="flex items-center gap-4 text-xs font-sans text-ink-700">
                  <span className="flex items-center gap-2">
                    <span className="inline-block w-4 h-0.5 bg-gold-500" />
                    Регистрации
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="inline-block w-4 h-0.5 border-t-2 border-dashed border-ink-900" />
                    Переводы
                  </span>
                </div>
              </div>
              <div className="w-12 h-px bg-gold-400 mb-5" />
              <Chart data={chartData} />
            </div>

            {/* ──────── География ──────── */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="tag text-sm mb-2">География</div>
              <h2 className="font-serif text-xl text-ink-900 mb-2">Распределение по странам</h2>
              <div className="w-12 h-px bg-gold-400 mb-5" />
              {byCountry.length === 0 ? (
                <p className="font-sans text-sm text-ink-500">Нет данных в выбранном периоде.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full font-sans text-sm">
                    <thead>
                      <tr className="text-ink-500 text-xs tracking-widest uppercase">
                        <th className="text-left py-2 font-medium">Страна</th>
                        <th className="text-right py-2 font-medium">Регистрации</th>
                        <th className="text-right py-2 font-medium">Переводы</th>
                      </tr>
                    </thead>
                    <tbody>
                      {byCountry.map(row => (
                        <tr key={row.country} className="border-t border-gold-300/20">
                          <td className="py-2 text-ink-900">{row.country}</td>
                          <td className="py-2 text-right text-ink-700 lining-nums">{row.reg}</td>
                          <td className="py-2 text-right text-ink-700 lining-nums">{row.tr}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* ──────── Топ целей ──────── */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="tag text-sm mb-2">Что просят у Вселенной</div>
              <h2 className="font-serif text-xl text-ink-900 mb-2">Топ целей перевода</h2>
              <div className="w-12 h-px bg-gold-400 mb-5" />
              {topPurposes.length === 0 ? (
                <p className="font-sans text-sm text-ink-500">Нет переводов в выбранном периоде.</p>
              ) : (
                <div className="space-y-3">
                  {topPurposes.map(p => (
                    <div key={p.purpose}>
                      <div className="flex justify-between text-sm font-sans mb-1">
                        <span className="text-ink-900 truncate pr-3">{p.purpose}</span>
                        <span className="text-ink-500 lining-nums flex-shrink-0">
                          {p.count} · {p.percent}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-gold-300/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gold-500 rounded-full transition-all"
                          style={{ width: `${p.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ──────── Сроки и валюты (две колонки) ──────── */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-2xl">
                <div className="tag text-sm mb-2">Сроки поступления</div>
                <h2 className="font-serif text-xl text-ink-900 mb-2">Какие сроки выбирают</h2>
                <div className="w-12 h-px bg-gold-400 mb-5" />
                {byTiming.length === 0 ? (
                  <p className="font-sans text-sm text-ink-500">Нет переводов в выбранном периоде.</p>
                ) : (
                  <div className="space-y-3">
                    {byTiming.map(t => (
                      <DistRow key={t.label} label={t.label} count={t.count} percent={t.percent} />
                    ))}
                  </div>
                )}
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <div className="tag text-sm mb-2">Валюты</div>
                <h2 className="font-serif text-xl text-ink-900 mb-2">В чём чаще переводят</h2>
                <div className="w-12 h-px bg-gold-400 mb-5" />
                {byCurrency.length === 0 ? (
                  <p className="font-sans text-sm text-ink-500">Нет переводов в выбранном периоде.</p>
                ) : (
                  <div className="space-y-3">
                    {byCurrency.map(c => (
                      <DistRow key={c.currency} label={c.currency} count={c.count} percent={c.percent} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ──────── Подсказка о приватности ──────── */}
            <div className="glass-card p-5 rounded-2xl border border-gold-300/30">
              <p className="font-sans text-xs text-ink-500 leading-relaxed">
                <span className="text-gold-700 font-medium">Аналитика обезличена.</span> В отчётах
                показаны только агрегированные цифры — без имён, email и индивидуальных записей
                пользователей. Банковские реквизиты пользователей физически не хранятся на сервере
                (живут только в браузере пользователя), поэтому в этой панели их нет и быть не может.
              </p>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// Маленькие компоненты
// ─────────────────────────────────────────────────────────

function Kpi({ label, value, hint }: { label: string; value: number | string; hint?: string }) {
  return (
    <div className="glass-card p-5 rounded-2xl">
      <div className="tag text-xs mb-3">{label}</div>
      <div className="font-serif text-3xl md:text-4xl text-ink-900 lining-nums mb-2">{value}</div>
      <div className="w-8 h-px bg-gold-500 mb-2" />
      {hint && <div className="font-sans text-xs text-ink-500 leading-snug">{hint}</div>}
    </div>
  )
}

function DistRow({ label, count, percent }: { label: string; count: number; percent: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm font-sans mb-1">
        <span className="text-ink-900">{label}</span>
        <span className="text-ink-500 lining-nums">{count} · {percent}%</span>
      </div>
      <div className="h-1.5 bg-gold-300/20 rounded-full overflow-hidden">
        <div className="h-full bg-gold-500 rounded-full transition-all" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

// SVG-график на двух линиях. Без сторонних библиотек.
function Chart({ data }: { data: { date: string; reg: number; tr: number }[] }) {
  if (data.length === 0) {
    return (
      <p className="font-sans text-sm text-ink-500 text-center py-10">
        Нет данных в выбранном периоде.
      </p>
    )
  }

  const max = Math.max(1, ...data.map(d => Math.max(d.reg, d.tr)))
  const W = 800
  const H = 240
  const padL = 36
  const padR = 16
  const padT = 16
  const padB = 28
  const innerW = W - padL - padR
  const innerH = H - padT - padB

  const x = (i: number) =>
    padL + (data.length === 1 ? innerW / 2 : (i / (data.length - 1)) * innerW)
  const y = (v: number) => padT + innerH - (v / max) * innerH

  const path = (key: 'reg' | 'tr') =>
    data
      .map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(d[key]).toFixed(1)}`)
      .join(' ')

  const ticks = Math.min(4, max)
  const yTicks: number[] = []
  for (let i = 0; i <= ticks; i++) yTicks.push(Math.round((max * i) / ticks))

  const labelIndexes = data.length <= 1
    ? [0]
    : [...new Set([0, Math.floor(data.length / 2), data.length - 1])]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="none">
      {/* Горизонтальная сетка */}
      {yTicks.map(v => (
        <g key={v}>
          <line
            x1={padL}
            y1={y(v)}
            x2={W - padR}
            y2={y(v)}
            stroke="#C9A56B"
            strokeOpacity="0.18"
            strokeWidth="1"
          />
          <text
            x={padL - 6}
            y={y(v)}
            textAnchor="end"
            dominantBaseline="central"
            fontSize="10"
            fontFamily="Inter, sans-serif"
            fill="#7A6F62"
          >
            {v}
          </text>
        </g>
      ))}

      {/* Линия регистраций (золотая сплошная) */}
      <path d={path('reg')} fill="none" stroke="#B89058" strokeWidth="2" strokeLinejoin="round" />

      {/* Линия переводов (тёмная пунктирная) */}
      <path
        d={path('tr')}
        fill="none"
        stroke="#2A2520"
        strokeWidth="2"
        strokeDasharray="5 4"
        strokeLinejoin="round"
      />

      {/* Точки */}
      {data.map((d, i) => (
        <g key={i}>
          <circle cx={x(i)} cy={y(d.reg)} r="2.5" fill="#B89058" />
          <circle cx={x(i)} cy={y(d.tr)} r="2.5" fill="#2A2520" />
        </g>
      ))}

      {/* Подписи дат снизу */}
      {labelIndexes.map(i => (
        <text
          key={i}
          x={x(i)}
          y={H - 8}
          textAnchor={i === 0 ? 'start' : i === data.length - 1 ? 'end' : 'middle'}
          fontSize="10"
          fontFamily="Inter, sans-serif"
          fill="#7A6F62"
        >
          {data[i].date.slice(5)}
        </text>
      ))}
    </svg>
  )
}
