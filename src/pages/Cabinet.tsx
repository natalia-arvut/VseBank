import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import CabinetLayout from '../components/CabinetLayout'
import { formatThousands } from '../lib/format'

export default function Cabinet() {
  const navigate = useNavigate()
  const { user, transfers } = useApp()

  const now = new Date()
  const hours = now.getHours()
  const greeting = hours < 12 ? 'Доброе утро' : hours < 18 ? 'Добрый день' : 'Добрый вечер'

  return (
    <CabinetLayout rightVisual="none">
      <section
        className="relative w-full overflow-hidden flex-1 flex flex-col"
        style={{ backgroundColor: '#F5EFE6' }}
      >
        {/* Картинка фоном на всю секцию */}
        <img
          src={`${import.meta.env.BASE_URL}hero-cover.png`}
          alt=""
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />

        {/* Используем ровно тот же layout grid, что на /transfer:
            outer p-6 md:p-10 + grid 2 равных колонок + gap-6.
            Плашка лежит в левой колонке → её визуальные left/right совпадают
            с левой колонкой на /transfer пиксель-в-пиксель. */}
        <div className="relative p-4 md:p-10">
          <div className="xl:grid xl:grid-cols-2 xl:gap-6 xl:items-stretch xl:min-h-[calc(100vh-5rem)]">
            {/* Левая колонка — плашка приветствия */}
            <div className="bg-cream-100/85 lg:bg-cream-100/75 backdrop-blur-[3px] border border-gold-300/30 rounded-2xl flex flex-col">
              <div className="flex-1 p-5 md:p-8 flex flex-col">

              <div className="tag text-xs md:text-sm mb-2">Добро пожаловать в банк</div>

              <h1 className="font-serif text-2xl md:text-3xl text-ink-900 mb-2">
                {greeting}{user?.firstName ? `, ${user.firstName}` : ''}!
              </h1>

              <div className="w-12 h-px bg-gold-500 mt-2 mb-4" />

              <p className="font-sans text-ink-700 text-sm md:text-base leading-relaxed mb-5">
                Твоё пространство изобилия активно. Твой лимит безграничен.
              </p>

              <button
                onClick={() => navigate('/transfer')}
                className="btn-gold inline-flex items-center gap-2 text-xs md:text-sm px-5 md:px-6 py-2.5 self-start"
              >
                Совершить перевод →
              </button>

              {/* Последние транзакции */}
              {transfers.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gold-300/30">
                  <div className="flex justify-between items-center mb-3">
                    <div className="tag text-xs">Последние транзакции</div>
                    <button
                      onClick={() => navigate('/history')}
                      className="font-sans text-xs text-gold-600 hover:text-gold-700"
                    >
                      Все →
                    </button>
                  </div>
                  <div className="space-y-3">
                    {transfers.slice(0, 3).map(t => {
                      const amountFormatted = formatThousands(t.amount) || t.amount
                      return (
                        <div key={t.id} className="text-sm">
                          <div className="font-sans text-ink-700">{t.type}</div>
                          <div className="font-sans text-xs text-ink-500">
                            {new Date(t.createdAt).toLocaleDateString('ru')}
                          </div>
                          <div className="font-sans text-xs text-gold-600 tracking-[0.2em] uppercase font-medium mt-1">
                            + {amountFormatted} {t.currency}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Растяжка снизу — пока пусто, потом добавим что нужно */}
              <div className="flex-1" />
            </div>
            </div>
            {/* Правая колонка — пустая, картинка проступает сквозь */}
            <div />
          </div>
        </div>
      </section>
    </CabinetLayout>
  )
}
