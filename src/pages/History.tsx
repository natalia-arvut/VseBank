import { useApp } from '../context/AppContext'
import CabinetLayout from '../components/CabinetLayout'

export default function History() {
  const { transfers } = useApp()

  return (
    <CabinetLayout>
      <div className="p-6 md:p-10 max-w-2xl">

        <div className="mb-8">
          <div className="tag mb-2">Выписка № 07</div>
          <h1 className="font-serif text-3xl text-stone-800">История переводов</h1>
        </div>

        {transfers.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <div className="text-4xl text-gold-400/40 mb-4">∞</div>
            <p className="font-sans text-stone-500">Переводов пока нет.</p>
            <p className="font-sans text-stone-400 text-sm mt-2">Совершите ваш первый перевод изобилия.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {transfers.map(t => (
              <div key={t.id} className="glass-card p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-sans text-sm text-stone-700 font-medium">{t.type}</div>
                    <div className="font-sans text-xs text-stone-400 mt-1">
                      {new Date(t.createdAt).toLocaleDateString('ru', {
                        day: 'numeric', month: 'long', year: 'numeric',
                      })}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-serif text-xl text-gold-600">+ {t.amount} {t.currency}</div>
                    <div className={`font-sans text-xs mt-1 ${
                      t.status === 'completed' ? 'text-green-600' : 'text-gold-600'
                    }`}>
                      {t.status === 'completed' ? '✓ Завершён' : '⟳ В обработке'}
                    </div>
                  </div>
                </div>
                <div className="border-t border-gold-300/20 pt-3 flex justify-between">
                  <div className="font-sans text-xs text-stone-500">{t.timing}</div>
                  <div className="font-sans text-xs text-stone-400">{t.id}</div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </CabinetLayout>
  )
}
