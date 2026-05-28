import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CabinetLayout from '../components/CabinetLayout'
import {
  fetchRequisites,
  saveRequisite,
  updateRequisite,
  deleteRequisite,
  type Requisite,
} from '../lib/requisites'

const LEGACY_KEY = 'vbi_saved_requisites'

export default function Requisites() {
  const navigate = useNavigate()
  const [savedRequisites, setSavedRequisites] = useState<Requisite[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({
    label: '',
    recipientName: '',
    bankName: '',
    iban: '',
    bic: '',
  })
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)

  const loadAll = async () => {
    const list = await fetchRequisites()
    setSavedRequisites(list)
  }

  // Загрузка + миграция старых localStorage реквизитов в БД (один раз)
  useEffect(() => {
    const init = async () => {
      const list = await fetchRequisites()
      setSavedRequisites(list)

      // Миграция legacy localStorage → БД
      const legacyRaw = localStorage.getItem(LEGACY_KEY)
      if (legacyRaw) {
        try {
          const arr = JSON.parse(legacyRaw)
          if (Array.isArray(arr) && arr.length > 0 && list.length === 0) {
            for (const r of arr) {
              if (r.iban && r.recipientName) {
                await saveRequisite({
                  label: r.label || r.recipientName,
                  recipientName: r.recipientName,
                  bankName: r.bankName || '',
                  iban: r.iban,
                  bic: r.bic || '',
                })
              }
            }
            await loadAll()
          }
          localStorage.removeItem(LEGACY_KEY)
        } catch {}
      }
    }
    init()
  }, [])

  const handle = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const resetForm = () => {
    setForm({ label: '', recipientName: '', bankName: '', iban: '', bic: '' })
    setEditingId(null)
  }

  const handleEdit = (r: Requisite) => {
    setEditingId(r.id)
    setForm({
      label: r.label,
      recipientName: r.recipientName,
      bankName: r.bankName,
      iban: r.iban,
      bic: r.bic,
    })
  }

  const handleDelete = async (id: string) => {
    const result = await deleteRequisite(id)
    if (!result.ok) {
      setInfo(`Не удалось удалить: ${result.error}`)
      setTimeout(() => setInfo(''), 3000)
      return
    }
    await loadAll()
    if (editingId === id) resetForm()
  }

  const validate = () => {
    if (!form.recipientName || !form.iban) {
      setInfo('Заполни имя получателя и IBAN')
      setTimeout(() => setInfo(''), 3000)
      return false
    }
    return true
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    const result = editingId
      ? await updateRequisite(editingId, form)
      : await saveRequisite(form)
    setLoading(false)
    if (!result.ok) {
      setInfo(`Ошибка: ${result.error}`)
      setTimeout(() => setInfo(''), 3000)
      return
    }
    await loadAll()
    setInfo(editingId ? 'Реквизиты обновлены' : 'Реквизиты сохранены')
    setTimeout(() => setInfo(''), 2000)
    resetForm()
  }

  // Сохраняем и переходим в перевод с подтянутыми реквизитами
  const handleSaveAndTransfer = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    const result = editingId
      ? await updateRequisite(editingId, form)
      : await saveRequisite(form)
    setLoading(false)
    if (!result.ok || !result.data) {
      setInfo(`Ошибка: ${result.error}`)
      setTimeout(() => setInfo(''), 3000)
      return
    }
    localStorage.setItem('vbi_preselected_requisite', result.data.id)
    navigate('/transfer')
  }

  return (
    <CabinetLayout>
      <div className="p-6 md:p-10">
        {/* Один общий заголовок страницы */}
        <div className="mb-8">
          <div className="tag mb-2">Реквизиты</div>
          <h1 className="font-serif text-3xl text-ink-900 mb-2">Твои реквизиты для переводов</h1>
          <div className="w-12 h-px bg-gold-500" />
        </div>

        {/* Две равные колонки */}
        <div className="xl:grid xl:grid-cols-2 xl:gap-6 xl:items-start">

          {/* Левая колонка — форма новых реквизитов */}
          <form onSubmit={handleSave} className="glass-card p-6 md:p-8 rounded-2xl space-y-4">
          <div className="tag text-sm mb-2">
            {editingId ? 'Редактирование' : 'Новые реквизиты'}
          </div>

          <div>
            <label className="font-sans text-xs text-ink-500 tracking-widest uppercase block mb-2">
              Имя получателя
            </label>
            <input
              className="input-field"
              placeholder="Иван Иванов"
              value={form.recipientName}
              onChange={e => handle('recipientName', e.target.value)}
            />
          </div>

          <div>
            <label className="font-sans text-xs text-ink-500 tracking-widest uppercase block mb-2">
              Название банка
            </label>
            <input
              className="input-field"
              placeholder="UBS, Credit Suisse, Sberbank..."
              value={form.bankName}
              onChange={e => handle('bankName', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-sans text-xs text-ink-500 tracking-widest uppercase block mb-2">
                IBAN
              </label>
              <input
                className="input-field"
                placeholder="XX00 0000 0000 0000"
                value={form.iban}
                onChange={e => handle('iban', e.target.value)}
              />
            </div>
            <div>
              <label className="font-sans text-xs text-ink-500 tracking-widest uppercase block mb-2">
                BIC / SWIFT
              </label>
              <input
                className="input-field"
                placeholder="XXXXXXXX"
                value={form.bic}
                onChange={e => handle('bic', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="font-sans text-xs text-ink-500 tracking-widest uppercase block mb-2">
              Название счёта (для себя)
            </label>
            <input
              className="input-field"
              placeholder="Например: «UBS — Личный»"
              value={form.label}
              onChange={e => handle('label', e.target.value)}
            />
          </div>

          {info && (
            <div className="font-sans text-sm text-gold-700 bg-gold-500/10 border border-gold-400/40 px-4 py-3 rounded-md">
              {info}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-outline text-sm px-6 py-2.5 disabled:opacity-50"
            >
              {loading ? 'Сохраняем…' : editingId ? 'Сохранить изменения' : 'Сохранить'}
            </button>
            <button
              onClick={handleSaveAndTransfer}
              disabled={loading}
              className="flex-1 btn-gold text-sm px-6 py-2.5 disabled:opacity-50"
            >
              Отправить перевод
            </button>
          </div>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="font-sans text-sm text-ink-500 hover:text-ink-700 underline"
            >
              Отменить редактирование
            </button>
          )}
        </form>

          {/* Правая колонка — сохранённые реквизиты. Заголовок tag+h2 внутри плашки. */}
          <div className="mt-8 xl:mt-0">
            <div className="glass-card p-6 md:p-8 rounded-2xl">
              <div className="tag text-sm mb-2">Сохранённые</div>
              <h2 className="font-serif text-2xl text-ink-900 mb-2">Твои сохранённые счета</h2>
              <div className="w-12 h-px bg-gold-400 mb-5" />

              {savedRequisites.length === 0 ? (
                <p className="font-sans text-sm text-ink-500 leading-relaxed">
                  Заполни форму слева — сохранённые реквизиты появятся здесь и будут доступны при следующих переводах.
                </p>
              ) : (
                <div className="space-y-3">
                  {savedRequisites.map(r => (
                    <div key={r.id} className="border border-gold-300/30 rounded-xl p-4 flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="font-serif text-lg text-ink-900">{r.label}</div>
                        <div className="font-sans text-sm text-ink-700">{r.recipientName}</div>
                        <div className="font-sans text-xs text-ink-500 truncate">
                          {r.bankName}{r.bankName && r.iban ? ' · ' : ''}{r.iban}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 flex-shrink-0">
                        <button
                          onClick={() => handleEdit(r)}
                          className="font-sans text-xs text-gold-700 hover:text-gold-900 px-2 py-1"
                        >
                          Изменить
                        </button>
                        <button
                          onClick={() => handleDelete(r.id)}
                          className="font-sans text-xs text-stone-400 hover:text-red-600 px-2 py-1"
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* На мобильных — старая структура уже включает обе колонки благодаря отсутствию xl:grid */}
        {false && savedRequisites.length > 0 && (
          <div className="xl:hidden p-6 md:p-10 max-w-2xl pt-0">
            <div className="glass-card p-6 md:p-8 rounded-2xl">
              <div className="tag text-sm mb-2">Сохранённые</div>
              <h2 className="font-serif text-2xl text-ink-900 mb-2">Твои сохранённые счета</h2>
              <div className="w-12 h-px bg-gold-400 mb-5" />
              <div className="space-y-3">
                {savedRequisites.map(r => (
                  <div key={r.id} className="border border-gold-300/30 rounded-xl p-4 flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-serif text-lg text-ink-900">{r.label}</div>
                      <div className="font-sans text-sm text-ink-700">{r.recipientName}</div>
                      <div className="font-sans text-xs text-ink-500 truncate">
                        {r.bankName}{r.bankName && r.iban ? ' · ' : ''}{r.iban}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 flex-shrink-0">
                      <button onClick={() => handleEdit(r)} className="font-sans text-xs text-gold-700 px-2 py-1">Изменить</button>
                      <button onClick={() => handleDelete(r.id)} className="font-sans text-xs text-stone-400 hover:text-red-600 px-2 py-1">Удалить</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </CabinetLayout>
  )
}
