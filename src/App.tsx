import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'

import Landing from './pages/Landing'
import Register from './pages/Register'
import Login from './pages/Login'
import Paths from './pages/Paths'
import Cabinet from './pages/Cabinet'
import Cards from './pages/Cards'
import Requisites from './pages/Requisites'
import Transfer from './pages/Transfer'
import Signature from './pages/Signature'
import Philosophy from './pages/Philosophy'
import History from './pages/History'

// Защищённый маршрут — только для залогиненных
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useApp()
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Защищённые маршруты */}
      <Route path="/paths" element={<PrivateRoute><Paths /></PrivateRoute>} />
      <Route path="/cabinet" element={<PrivateRoute><Cabinet /></PrivateRoute>} />
      <Route path="/cards" element={<PrivateRoute><Cards /></PrivateRoute>} />
      <Route path="/requisites" element={<PrivateRoute><Requisites /></PrivateRoute>} />
      <Route path="/transfer" element={<PrivateRoute><Transfer /></PrivateRoute>} />
      <Route path="/signature" element={<PrivateRoute><Signature /></PrivateRoute>} />
      <Route path="/philosophy" element={<PrivateRoute><Philosophy /></PrivateRoute>} />
      <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />

      {/* Редирект для неизвестных путей */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <HashRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </HashRouter>
  )
}
