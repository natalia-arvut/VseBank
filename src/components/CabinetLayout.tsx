import type { ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import VseBankLogo from './VseBankLogo'
import Guilloche from './Guilloche'

const NAV_ITEMS = [
  { path: '/cabinet', label: 'Главная', icon: '⌂' },
  { path: '/transfer', label: 'Переводы', icon: '⇄' },
  { path: '/requisites', label: 'Реквизиты', icon: '≡' },
  { path: '/history', label: 'История', icon: '◷' },
  { path: '/paths', label: 'Благотворительность', icon: '♡' },
  { path: '/reviews', label: 'Отзывы', icon: '✦' },
]

// rightVisual — фоновый декор в правой части main:
//   'arch' — картинка с золотой аркой (как на странице входа)
//   'guilloche' — тонкий узор переплетённых золотых нитей
//   'none' — ничего (для страниц с собственным фоном, например Главная)
export default function CabinetLayout({
  children,
  rightVisual = 'guilloche',
}: {
  children: ReactNode
  rightVisual?: 'arch' | 'guilloche' | 'none'
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useApp()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-cream-100 flex">

      {/* Сайдбар */}
      <aside className="hidden lg:flex w-64 bg-stone-800 flex-col py-8 px-6 fixed h-full z-10">
        {/* Левый край логотипа = левый край золотой плашки активного пункта меню и аватарки внизу */}
        <div className="mb-4">
          <VseBankLogo size="sm" variant="light" />
        </div>

        <nav className="flex-1 space-y-1">
          {NAV_ITEMS.map(item => {
            const active = location.pathname === item.path
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 rounded-sm ${
                  active
                    ? 'bg-gold-500/20 text-gold-400'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-white/5'
                }`}
              >
                <span className="text-base w-5 text-center">{item.icon}</span>
                <span className="font-sans text-sm">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="border-t border-white/10 pt-6 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center">
              <span className="text-gold-400 text-xs font-serif">
                {user?.firstName?.[0] || 'B'}
              </span>
            </div>
            <div>
              <div className="font-sans text-xs text-stone-200">{user?.firstName} {user?.lastName}</div>
              <div className="font-sans text-[10px] text-stone-500">{user?.email}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-stone-500 hover:text-stone-300 transition-colors"
          >
            <span>→</span>
            <span className="font-sans text-xs">Выход</span>
          </button>
        </div>
      </aside>

      {/* Мобильная навигация снизу */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-stone-800 flex justify-around py-3 z-10 border-t border-white/10">
        {NAV_ITEMS.slice(0, 5).map(item => {
          const active = location.pathname === item.path
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-2 ${
                active ? 'text-gold-400' : 'text-stone-500'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-sans text-[9px] tracking-wide">{item.label}</span>
            </button>
          )
        })}
      </div>

      {/* Верхняя панель */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-cream-100 border-b border-gold-300/20 px-6 py-4 flex items-center justify-between z-10">
        <VseBankLogo size="sm" />
        <button onClick={handleLogout} className="text-stone-400 text-sm">Выход</button>
      </div>

      {/* Картинка-арка справа — только для Благотворительности на широких экранах.
          Левая граница совпадает с правым краем max-w-xl контента (контент чуть уже),
          чтобы картинка стала шире и доходила до той же линии что контент на других вкладках. */}
      {rightVisual === 'arch' && (
        <div
          className="hidden xl:block fixed top-0 bottom-0 right-0 pointer-events-none overflow-hidden"
          style={{ left: 'calc(50vw + 116px)', zIndex: 0 }}
        >
          <img
            src={`${import.meta.env.BASE_URL}login-image.png`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover select-none"
            draggable={false}
          />
        </div>
      )}

      {/* Гильош — на всю область main (исключая сайдбар) */}
      {rightVisual === 'guilloche' && (
        <div
          className="fixed top-0 right-0 bottom-0 left-0 lg:left-64 pointer-events-none overflow-hidden"
          style={{ zIndex: 0 }}
        >
          <Guilloche variant="light" />
        </div>
      )}

      {/* Основной контент — над фоновым декором */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0 pb-20 lg:pb-0 overflow-y-auto relative" style={{ zIndex: 1 }}>
        {children}
      </main>
    </div>
  )
}
