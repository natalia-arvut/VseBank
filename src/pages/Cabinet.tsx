import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import CabinetLayout from '../components/CabinetLayout'

export default function Cabinet() {
  const navigate = useNavigate()
  const { user, transfers } = useApp()

  const now = new Date()
  const hours = now.getHours()
  const greeting = hours < 12 ? 'Доброе утро' : hours < 18 ? 'Добрый день' : 'Добрый вечер'

  return (
    <CabinetLayout>
      <div className="p-6 md:p-10">

        {/* Приветствие — точно по тексту платформы */}
        <div className="mb-10">
          <div className="tag mb-3 text-sm">{greeting}</div>
          <h1 className="font-serif text-3xl md:text-4xl text-stone-800 mb-3">
            {user?.firstName ? `${user.firstName},` : ''} выберите сумму на вашем счёте
          </h1>
          <p className="body-text text-stone-600 max-w-3xl">
            Ниже вам предложена сумма через все расчёты в общей сумме. Откройте свой настоящий интерес — ваш Счёт Всех Расчётов Банкиров.
          </p>
        </div>

        {/* Баланс — главный экран */}
        <div className="glass-card p-10 mb-8 text-center rounded-2xl">
          <div className="tag text-sm mb-3">Ваш баланс безграничен</div>
          <div className="font-serif text-5xl md:text-6xl text-stone-800 mb-3 balance-shimmer">
            ∞ 1 000 000 $
          </div>
          <div className="font-sans text-sm text-stone-500 tracking-widest uppercase mb-6">
            Доступно
          </div>
          <button
            onClick={() => navigate('/transfer')}
            className="btn-gold inline-flex items-center gap-3"
          >
            Совершить перевод →
          </button>
        </div>

        {/* Сообщение от Администрации (по тексту платформы — «Выписка 07») */}
        <div className="glass-card p-6 mb-8 border-l-4 border-gold-500 rounded-r-2xl">
          <div className="flex items-start gap-4">
            <div className="text-gold-500 text-2xl flex-shrink-0">✦</div>
            <div>
              <div className="tag text-sm mb-2">Сообщение от Администрации · Выписка № 07</div>
              <p className="body-text text-stone-700">
                Администрация произвела начисление на ваш счёт. Вознаграждение начисляется при хорошем содержании и активности счёта.
              </p>
              <p className="font-serif italic text-stone-700 text-lg mt-3">
                Выбирайте Захватывающую систему!
              </p>
            </div>
          </div>
        </div>

        {/* Меню — три уровня активации (по платформе) */}
        <div className="mb-8">
          <div className="tag text-sm mb-5">Уровни активации заявленных сумм</div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { level: 1, name: 'Базовый уровень', desc: 'Активация первой суммы' },
              { level: 2, name: 'Средний уровень', desc: 'Расширенная активация' },
              { level: 3, name: 'Высший уровень', desc: 'Безграничная активация' },
            ].map(item => (
              <button
                key={item.level}
                onClick={() => navigate('/cards')}
                className="glass-card p-6 text-left rounded-2xl hover:shadow-gold transition-all duration-300"
              >
                <div className="font-serif text-3xl text-gold-500 mb-2 leading-none">{item.level}</div>
                <div className="font-sans text-sm text-stone-700 font-medium mb-1">{item.name}</div>
                <div className="font-sans text-xs text-stone-500">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Типы поступлений (Блок 9 платформы) */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => navigate('/transfer')}
            className="glass-card p-6 text-left rounded-2xl hover:shadow-gold transition-all duration-300"
          >
            <div className="tag text-xs mb-3">Тип поступления</div>
            <div className="font-serif text-xl text-stone-800 mb-1">Приход на личный баланс доверия</div>
            <div className="font-sans text-sm text-gold-600 mt-3">Нажать на баланс →</div>
          </button>
          <button
            onClick={() => navigate('/transfer')}
            className="glass-card p-6 text-left rounded-2xl hover:shadow-gold transition-all duration-300"
          >
            <div className="tag text-xs mb-3">Тип поступления</div>
            <div className="font-serif text-xl text-stone-800 mb-1">Приход напрямую — Автоперевод</div>
            <div className="font-sans text-sm text-gold-600 mt-3">Поиск на баланс актива →</div>
          </button>
        </div>

        {/* Последние транзакции */}
        {transfers.length > 0 && (
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-5">
              <div className="tag text-sm">Последние транзакции</div>
              <button
                onClick={() => navigate('/history')}
                className="font-sans text-sm text-gold-600 hover:text-gold-700"
              >
                Все транзакции →
              </button>
            </div>
            <div className="space-y-3">
              {transfers.slice(0, 3).map(t => (
                <div key={t.id} className="flex items-center justify-between border-b border-gold-300/20 pb-3 last:border-0">
                  <div>
                    <div className="font-sans text-sm text-stone-700">{t.type}</div>
                    <div className="font-sans text-xs text-stone-400 mt-0.5">
                      {new Date(t.createdAt).toLocaleDateString('ru')}
                    </div>
                  </div>
                  <div className="font-serif text-lg text-gold-600">
                    + {t.amount} {t.currency}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </CabinetLayout>
  )
}
