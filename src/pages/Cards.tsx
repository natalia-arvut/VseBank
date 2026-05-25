import { useApp } from '../context/AppContext'
import CabinetLayout from '../components/CabinetLayout'

const CARD_TYPES = [
  {
    id: 1,
    name: 'Карта Доверия',
    subtitle: 'Базовая активация',
    number: '4444 5555 6666 7777',
    balance: '∞ 1 000 000',
    level: 1,
    active: true,
  },
  {
    id: 2,
    name: 'Карта Потока',
    subtitle: 'Второй уровень',
    number: '5555 6666 7777 8888',
    balance: '∞ 750 000',
    level: 2,
    active: true,
  },
  {
    id: 3,
    name: 'Карта Творца',
    subtitle: 'Третий уровень',
    number: '6666 7777 8888 9999',
    balance: '∞ 500 000',
    level: 3,
    active: false,
  },
  {
    id: 4,
    name: 'Карта Источника',
    subtitle: 'Расширенный доступ',
    number: '7777 8888 9999 0000',
    balance: '∞ 2 500 000',
    level: 4,
    active: false,
  },
  {
    id: 5,
    name: 'Карта Бесконечности',
    subtitle: 'Максимальный уровень',
    number: '8888 8888 8888 8888',
    balance: '∞ ∞',
    level: 5,
    active: false,
  },
]

export default function Cards() {
  const { user } = useApp()

  return (
    <CabinetLayout>
      <div className="p-6 md:p-10">

        <div className="mb-8">
          <div className="tag mb-2">Карты · 1 · 2 · 3 · 4 · 5</div>
          <h1 className="font-serif text-3xl text-stone-800">Ваши карты изобилия</h1>
          <p className="font-sans text-stone-500 text-sm mt-2">
            Три уровня активации заявленных сумм
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {CARD_TYPES.map(card => (
            <div key={card.id} className="space-y-4">
              {/* Карта */}
              <div
                className={`bank-card rounded-sm p-6 flex flex-col justify-between ${
                  !card.active ? 'opacity-50 grayscale' : ''
                }`}
                style={{ height: 200 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-sans text-[10px] text-white/60 tracking-[0.2em] uppercase">
                      {card.name}
                    </div>
                    <div className="font-sans text-[10px] text-white/40 mt-0.5">{card.subtitle}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    {card.active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    )}
                    <span className="font-sans text-[10px] text-white/40">
                      {card.active ? 'Активен' : 'Не активирована'}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="font-sans text-white/40 tracking-widest text-sm mb-3">
                    {card.number}
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="font-sans text-[10px] text-white/40 uppercase tracking-widest">Держатель</div>
                      <div className="font-sans text-sm text-white/80">
                        {user?.firstName} {user?.lastName}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-sans text-[10px] text-white/40 uppercase tracking-widest mb-1">Баланс</div>
                      <div className="font-serif text-white/70 text-lg">{card.balance}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Действия */}
              <div className="glass-card p-4 rounded-sm">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-sans text-xs text-stone-600">Уровень {card.level}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(l => (
                      <div
                        key={l}
                        className={`w-4 h-1 rounded-full ${l <= card.level && card.active ? 'bg-gold-500' : 'bg-stone-200'}`}
                      />
                    ))}
                  </div>
                </div>
                {card.active ? (
                  <button className="w-full btn-outline text-xs py-2">
                    Управление картой
                  </button>
                ) : (
                  <button className="w-full btn-gold text-xs py-2">
                    Активировать карту
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Подсказка */}
        <div className="mt-10 glass-card p-6 border-l-2 border-gold-400">
          <p className="font-sans text-stone-600 text-sm">
            <strong className="text-stone-700">При переходе к вписанию счёта</strong> на карту или на счёт банка — необходимо активировать карту счёта в вашем счёте. Перевод не задерживается.
          </p>
        </div>

      </div>
    </CabinetLayout>
  )
}
