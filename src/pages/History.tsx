import { useApp } from '../context/AppContext'
import CabinetLayout from '../components/CabinetLayout'

export default function History() {
  const { transfers } = useApp()

  return (
    <CabinetLayout>
      <div className="p-6 md:p-10">

        <div className="mb-8">
          <div className="tag mb-2">Выписка</div>
          <h1 className="font-serif text-3xl text-ink-900 mb-2">История переводов</h1>
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
              const amountNum = parseInt(String(t.amount).replace(/\D/g, ''), 10)
              const amountFormatted = isNaN(amountNum)
                ? t.amount
                : amountNum.toLocaleString('de-DE')
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
