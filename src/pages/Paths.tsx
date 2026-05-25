import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import VseBankLogo from '../components/VseBankLogo'

export default function Paths() {
  const navigate = useNavigate()
  const { user } = useApp()

  return (
    <div className="min-h-screen bg-cream-100 bg-pattern flex flex-col">

      {/* Навигация с единым логотипом */}
      <nav className="flex items-center justify-between px-8 md:px-16 py-6 border-b border-gold-300/20">
        <VseBankLogo size="md" />
        <div className="tag text-sm">Пути самореализации</div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="max-w-2xl w-full text-center">

          {/* Приветствие */}
          <div className="tag mb-3 text-sm">Добро пожаловать в Банк Изобилия</div>
          <h1 className="font-serif text-3xl md:text-4xl text-stone-800 mb-3">
            {user ? `${user.firstName}, ваш счёт активирован.` : 'Ваш счёт активирован.'}
          </h1>
          <div className="w-12 h-px bg-gold-400 mx-auto mb-4" />
          <p className="body-text text-stone-600 mb-10">
            Вы в системе.
          </p>

          {/* Раздел «Разрешено для получения» */}
          <div className="glass-card p-8 mb-6 text-left rounded-2xl">
            <div className="text-center mb-5">
              <div className="tag text-sm">Разрешено для получения</div>
              <h2 className="font-serif text-2xl text-stone-800 mt-2">Прежде чем получить — отдай.</h2>
              <div className="w-12 h-px bg-gold-400 mx-auto mt-3" />
            </div>
            <p className="body-text text-stone-700 mb-3">
              <strong>Щедрость — это первый и главный признак богатства.</strong>
            </p>
            <p className="body-text text-stone-600">
              10% от полученной Вами суммы вы можете перевести в фонд помощи онкологически больных детей. Не из страха. Не из жалости. Из силы.
            </p>
            <div className="flex gap-3 mt-6">
              <button className="btn-gold flex-1">
                Поддержать фонд
              </button>
              <button
                onClick={() => navigate('/cabinet')}
                className="btn-outline flex-1"
              >
                Пропустить
              </button>
            </div>
          </div>

          <button
            onClick={() => navigate('/cabinet')}
            className="font-sans text-sm text-gold-600 hover:text-gold-700 transition-colors"
          >
            Перейти в личный кабинет →
          </button>

        </div>
      </div>
    </div>
  )
}
