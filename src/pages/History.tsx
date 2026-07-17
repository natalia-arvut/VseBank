import { useState } from 'react'
import { useApp } from '../context/AppContext'
import CabinetLayout from '../components/CabinetLayout'
import { formatThousands } from '../lib/format'

export default function History() {
  const { transfers, confirmTransfer, deleteTransfer } = useApp()

  // id перевода, по которому нажали «Удалить» и ждём подтверждения «точно?»
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  // id перевода, по которому идёт операция (блокируем кнопки)
  const [busyId, setBusyId] = useState<string | null>(null)

  const handleConfirm = async (id: string) => {
    setBusyId(id)
    await confirmTransfer(id)
    setBusyId(null)
  }

  const handleDelete = async (id: string) => {
    setBusyId(id)
    await deleteTransfer(id)
    setBusyId(null)
    setConfirmDeleteId(null)
  }

  return (
    <CabinetLayout>
      <div className="p-4 md:p-10">

        <div className="mb-8">
          <div className="tag mb-2">Выписка</div>
          <h1 className="font-serif text-2xl md:text-3xl text-ink-900 mb-2">История переводов</h1>
          <div className="w-12 h-px bg-gold-500" />
        </div>

        {/* Та же сетка 2 равных колонок что на /transfer. Содержимое в левой колонке. */}
        <div className="xl:grid xl:grid-cols-2 xl:gap-6 xl:items-start">
          <div>
        {transfers.length === 0 ? (
          <div className="glass-card p-6 md:p-8 rounded-2xl">
            <h2 className="font-serif text-2xl text-ink-900 mb-2">Пока пусто</h2>
            <div className="w-12 h-px bg-gold-400 mb-5" />
            <p className="font-sans text-sm text-ink-700 leading-relaxed">
              Здесь будет история всех твоих переводов. Соверши первый перевод изобилия — и он появится в выписке.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {transfers.map(t => {
              // Сумма с разделителями разрядов (точки): 1.000.000
              const amountFormatted = formatThousands(t.amount) || t.amount
              const isBusy = busyId === t.id
              const isConfirmingDelete = confirmDeleteId === t.id
              return (
                <div key={t.id} className="glass-card p-5 rounded-2xl">
                  <div className="font-sans text-sm text-ink-700 font-medium mb-1">{t.type}</div>
                  <div className="font-sans text-xs text-ink-500 mb-2">
                    {new Date(t.createdAt).toLocaleDateString('ru', {
                      day: 'numeric', month: 'long', year: 'numeric',
                    })}
                  </div>
                  <div className="font-sans text-base">
                    <span className="font-serif text-xl text-gold-600">+ {amountFormatted} {t.currency}</span>
                    <span className={`ml-3 text-xs ${
                      t.status === 'completed' ? 'text-green-600' : 'text-gold-600'
                    }`}>
                      {t.status === 'completed' ? '✓ Завершён' : '⟳ В обработке'}
                    </span>
                  </div>
                  <div className="border-t border-gold-300/20 pt-3 mt-3 font-sans text-xs text-ink-500">
                    {t.timing}
                  </div>

                  {/* Кнопки действий — только для переводов «в обработке».
                      Пришёл → «Подтвердить» (статус меняется на «Завершён»).
                      Не пришёл → «Удалить» (с шагом подтверждения). */}
                  {t.status !== 'completed' && (
                    <div className="mt-4 pt-4 border-t border-gold-300/30">
                      {isConfirmingDelete ? (
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="font-sans text-xs text-ink-600">Удалить этот перевод?</span>
                          <button
                            onClick={() => handleDelete(t.id)}
                            disabled={isBusy}
                            className="font-sans text-xs font-medium tracking-wide uppercase px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50"
                          >
                            {isBusy ? 'Удаляю…' : 'Да, удалить'}
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            disabled={isBusy}
                            className="font-sans text-xs text-ink-500 hover:text-ink-700 px-2 py-2"
                          >
                            Отмена
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-3 flex-wrap">
                          <button
                            onClick={() => handleConfirm(t.id)}
                            disabled={isBusy}
                            className="font-sans text-xs font-medium tracking-wide uppercase px-5 py-2 rounded-lg bg-gold-500 text-white hover:bg-gold-600 transition-colors disabled:opacity-50 inline-flex items-center gap-1.5"
                          >
                            {isBusy ? 'Секунду…' : '✓ Подтвердить'}
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(t.id)}
                            disabled={isBusy}
                            className="font-sans text-xs font-medium tracking-wide uppercase px-5 py-2 rounded-lg border border-gold-300/60 text-ink-500 hover:border-red-400 hover:text-red-600 transition-colors disabled:opacity-50"
                          >
                            Удалить
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
          </div>
          {/* Правая колонка — пустая, для выравнивания пропорций */}
          <div />
        </div>

      </div>
    </CabinetLayout>
  )
}
