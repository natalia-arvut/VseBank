import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import { LangProvider } from './i18n'

import Landing from './pages/Landing'
import Register from './pages/Register'
import Login from './pages/Login'
import AuthCallback from './pages/AuthCallback'
import ResetPassword from './pages/ResetPassword'
import Paths from './pages/Paths'
import Cabinet from './pages/Cabinet'
import Transfer from './pages/Transfer'
import Signature from './pages/Signature'
import Reviews from './pages/Reviews'
import History from './pages/History'
import Admin from './pages/Admin'
import AdminReviews from './pages/AdminReviews'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Cookies from './pages/Cookies'
import Disclaimer from './pages/Disclaimer'
import Maintenance from './pages/Maintenance'
import ScrollToTop from './components/ScrollToTop'
import CookieBanner from './components/CookieBanner'

// MAINTENANCE = true — показываем заглушку на всех страницах,
// КРОМЕ /admin — он остаётся рабочим инструментом для админов.
// Чтобы вернуть сайт — заменить на false и закоммитить (автодеплой подхватит).
const MAINTENANCE = false

// Заглушка пока проверяется сессия — иначе будет вспышка редиректа на /login
function AppLoading() {
  return (
    <div className="h-screen w-screen bg-cream-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl text-gold-500 animate-spin inline-block">⟳</div>
        <p className="font-sans text-stone-500 mt-3 text-sm">Загружаем...</p>
      </div>
    </div>
  )
}

// Защищённый маршрут — только для залогиненных
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isLoading } = useApp()
  if (isLoading) return <AppLoading />
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />
}

// Маршрут только для админов — проверяет user.isAdmin
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isLoading, user } = useApp()
  if (isLoading) return <AppLoading />
  if (!isLoggedIn) return <Navigate to="/login" replace />
  // Профиль (включая is_admin) грузится фоном — даём ему время
  if (!user) return <AppLoading />
  if (!user.isAdmin) return <Navigate to="/" replace />
  return <>{children}</>
}

// В maintenance остаются доступны:
//  /admin           — сама админ-панель
//  /login           — чтобы админ мог авторизоваться
//  /auth/callback   — чтобы магические ссылки/подтверждения работали
//  /reset-password  — на случай сброса пароля админа
//  /terms /privacy /cookies /disclaimer — юридические документы должны быть
//    доступны всегда, даже когда сайт под заглушкой (для проверок).
const MAINTENANCE_ALLOWED = [
  '/admin',
  '/login',
  '/auth/callback',
  '/reset-password',
  '/terms',
  '/privacy',
  '/cookies',
  '/disclaimer',
]

function AppRoutes() {
  const location = useLocation()
  const isAllowedDuringMaintenance = MAINTENANCE_ALLOWED.some(p =>
    location.pathname.startsWith(p)
  )

  // В maintenance режиме — заглушка на всё, кроме админских путей
  if (MAINTENANCE && !isAllowedDuringMaintenance) return <Maintenance />

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Защищённые маршруты */}
      <Route path="/paths" element={<PrivateRoute><Paths /></PrivateRoute>} />
      <Route path="/cabinet" element={<PrivateRoute><Cabinet /></PrivateRoute>} />
      <Route path="/transfer" element={<PrivateRoute><Transfer /></PrivateRoute>} />
      <Route path="/signature" element={<PrivateRoute><Signature /></PrivateRoute>} />
      <Route path="/reviews" element={<PrivateRoute><Reviews /></PrivateRoute>} />
      <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />

      {/* Юридические документы — публично доступны всегда */}
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/cookies" element={<Cookies />} />
      <Route path="/disclaimer" element={<Disclaimer />} />

      {/* Админка — только для пользователей с is_admin = true */}
      <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
      <Route path="/admin/reviews" element={<AdminRoute><AdminReviews /></AdminRoute>} />

      {/* Редирект для неизвестных путей */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <HashRouter>
      {/* Прокручивает страницу в начало при каждой смене маршрута */}
      <ScrollToTop />
      <LangProvider>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
        {/* Cookie-баннер показывается поверх всех страниц при первом заходе */}
        <CookieBanner />
      </LangProvider>
    </HashRouter>
  )
}
