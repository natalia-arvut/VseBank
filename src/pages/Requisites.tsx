import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CabinetLayout from '../components/CabinetLayout'

export default function Requisites() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    bankName: '',
    accountNumber: '',
    bic: '',
    iban: '',
    special007: '',
    currency: 'USD',
  })
  const [saved, setSaved] = useState(false)

  const handle = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('vbi_requisites', JSON.stringify(form))
    setSaved(true)
    setTimeout(() => navigate('/transfer'), 1500)
  }

  return (
    <CabinetLayout>
      <div className="p-6 md:p-10 max-w-2xl">

        <div className="mb-8">
          <div className="tag mb-2">Блок 5</div>
          <h1 className="font-serif text-3xl text-stone-800 mb-2">Введите реквизиты для перевода</h1>
          <p className="font-sans text-stone-500 text-sm leading-relaxed">
            При переходе к вписанию счёта на карту или на счёт банка — нужно активировать карту счёта в вашем счёте. Перевод не задерживается.
          </p>
        </div>

        <form onSubmit={handleSave} className="glass-card p-8 space-y-5">

          <div>
            <label className="font-sans text-xs text-stone-500 tracking-widest uppercase block mb-2">
              Название банка (от долларового счёта)
            </label>
            <input
              className="input-field"
              placeholder="Например: Sberbank, UBS, Credit Suisse..."
              value={form.bankName}
              onChange={e => handle('bankName', e.target.value)}
            />
          </div>

          <div>
            <label className="font-sans text-xs text-stone-500 tracking-widest uppercase block mb-2">
              Номер счёта
            </label>
            <input
              className="input-field"
              placeholder="Ваш номер счёта"
              value={form.accountNumber}
              onChange={e => handle('accountNumber', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-sans text-xs text-stone-500 tracking-widest uppercase block mb-2">
                BIC / SWIFT
              </label>
              <input
                className="input-field"
                placeholder="XXXXXXXX"
                value={form.bic}
                onChange={e => handle('bic', e.target.value)}
              />
            </div>
            <div>
              <label className="font-sans text-xs text-stone-500 tracking-widest uppercase block mb-2">
                IBAN
              </label>
              <input
                className="input-field"
                placeholder="XX00 0000 0000 0000"
                value={form.iban}
                onChange={e => handle('iban', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="font-sans text-xs text-stone-500 tracking-widest uppercase block mb-2">
              Спец. счёт 007
            </label>
            <input
              className="input-field"
              placeholder="Специальный счёт"
              value={form.special007}
              onChange={e => handle('special007', e.target.value)}
            />
          </div>

          <div>
            <label className="font-sans text-xs text-stone-500 tracking-widest uppercase block mb-2">
              Валюта · Вариант Соло
            </label>
            <select
              className="input-field"
              value={form.currency}
              onChange={e => handle('currency', e.target.value)}
            >
              <option value="USD">USD — Доллар США</option>
              <option value="EUR">EUR — Евро</option>
              <option value="CHF">CHF — Швейцарский франк</option>
              <option value="RUB">RUB — Российский рубль</option>
              <option value="GBP">GBP — Британский фунт</option>
            </select>
          </div>

          {saved ? (
            <div className="bg-gold-500/10 border border-gold-400/40 px-4 py-3 text-center">
              <span className="font-sans text-sm text-gold-700">✦ Реквизиты сохранены. Переходим к переводу...</span>
            </div>
          ) : (
            <button type="submit" className="w-full btn-gold">
              Активировать и продолжить →
            </button>
          )}
        </form>

      </div>
    </CabinetLayout>
  )
}
