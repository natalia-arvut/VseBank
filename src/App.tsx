import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'

import Landing from './pages/Landing'
import Register from './pages/Register'
import Login from './pages/Login'
import AuthCallback from './pages/AuthCallback'
import ResetPassword from './pages/ResetPassword'
import Paths from './pages/Paths'
import Cabinet from './pages/Cabinet'
import Requisites from './pages/Requisites'
import Transfer from './pages/Transfer'
import Signature from './pages/Signature'
import Reviews from './pages/Reviews'
import History from './pages/History'
import Maintenance from './pages/Maintenance'

// Если VITE_MAINTENANCE_MODE=true при сборке — показываем только заглушку.
// Чтобы вернуть сайт — пересобрать без этой переменной (или VITE_MAINTENANCE_MODE=false).
const MAINTENANCE = String(import.meta.env.VITE_MAINTENANCE_MODE).toLowerCase() === 'true'

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

function AppRoutes() {
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
      <Route path="/requisites" element={<PrivateRoute><Requisites /></PrivateRoute>} />
      <Route path="/transfer" element={<PrivateRoute><Transfer /></PrivateRoute>} />
      <Route path="/signature" element={<PrivateRoute><Signature /></PrivateRoute>} />
      <Route path="/reviews" element={<PrivateRoute><Reviews /></PrivateRoute>} />
      <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />

      {/* Редирект для неизвестных путей */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  if (MAINTENANCE) return <Maintenance />

  return (
    <HashRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </HashRouter>
  )
}
