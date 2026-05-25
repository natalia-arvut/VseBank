import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

// Типы данных
export interface User {
  firstName: string
  lastName: string
  companyRegNumber?: string
  birthDate: string
  gender: string
  email: string
  password: string
  country: string
  accountType: 'personal' | 'company'
  registeredAt: string
  accountNumber: string
}

export interface Transfer {
  id: string
  userEmail: string
  amount: string
  currency: string
  type: string
  timing: string
  createdAt: string
  status: 'pending' | 'completed'
}

interface AppContextType {
  user: User | null
  users: User[]
  isLoggedIn: boolean
  transfers: Transfer[]
  register: (user: Omit<User, 'accountNumber' | 'registeredAt'>) => User
  signIn: (email: string, password: string) => { ok: boolean; error?: string }
  logout: () => void
  resetPassword: (email: string) => { ok: boolean; error?: string; newPassword?: string }
  addTransfer: (transfer: Omit<Transfer, 'userEmail'>) => void
}

const AppContext = createContext<AppContextType | null>(null)

const USERS_KEY = 'vbi_users'
const SESSION_KEY = 'vbi_session_email'
const TRANSFERS_KEY = 'vbi_transfers'

export function AppProvider({ children }: { children: ReactNode }) {
  // Все зарегистрированные пользователи
  const [users, setUsers] = useState<User[]>(() => {
    // Миграция: если есть старый одиночный пользователь — переносим в массив
    const oldUser = localStorage.getItem('vbi_user')
    if (oldUser) {
      try {
        const u = JSON.parse(oldUser)
        const existingUsers = localStorage.getItem(USERS_KEY)
        const arr: User[] = existingUsers ? JSON.parse(existingUsers) : []
        // Добавляем старого пользователя если его нет
        if (!arr.find(x => x.email === u.email)) {
          arr.push({
            ...u,
            email: (u.email || '').toLowerCase(),
            password: u.password || '',
            accountNumber: u.accountNumber || `VBI-${Date.now().toString().slice(-10)}`,
            registeredAt: u.registeredAt || new Date().toISOString(),
          })
          localStorage.setItem(USERS_KEY, JSON.stringify(arr))
        }
        localStorage.removeItem('vbi_user')
      } catch {}
    }
    const saved = localStorage.getItem(USERS_KEY)
    return saved ? JSON.parse(saved) : []
  })

  // Текущая сессия — email авторизованного пользователя
  const [sessionEmail, setSessionEmail] = useState<string | null>(() => {
    return localStorage.getItem(SESSION_KEY)
  })

  const [transfers, setTransfers] = useState<Transfer[]>(() => {
    const saved = localStorage.getItem(TRANSFERS_KEY)
    return saved ? JSON.parse(saved) : []
  })

  // Текущий пользователь — находим в массиве по email сессии
  const user = sessionEmail ? users.find(u => u.email === sessionEmail) || null : null
  const isLoggedIn = !!user

  // Сохраняем всё в localStorage
  useEffect(() => { localStorage.setItem(USERS_KEY, JSON.stringify(users)) }, [users])
  useEffect(() => { localStorage.setItem(TRANSFERS_KEY, JSON.stringify(transfers)) }, [transfers])
  useEffect(() => {
    if (sessionEmail) localStorage.setItem(SESSION_KEY, sessionEmail)
    else localStorage.removeItem(SESSION_KEY)
  }, [sessionEmail])

  const register = (data: Omit<User, 'accountNumber' | 'registeredAt'>): User => {
    const newUser: User = {
      ...data,
      accountNumber: `VBI-${Date.now().toString().slice(-10)}`,
      registeredAt: new Date().toISOString(),
    }
    setUsers(prev => {
      // Если уже есть — обновляем
      const filtered = prev.filter(u => u.email !== data.email)
      return [...filtered, newUser]
    })
    setSessionEmail(newUser.email)
    return newUser
  }

  const signIn = (email: string, password: string) => {
    const found = users.find(u => u.email === email.trim().toLowerCase())
    if (!found) return { ok: false, error: 'Пользователь не найден. Пожалуйста, откройте счёт.' }
    if (found.password !== password) return { ok: false, error: 'Неверный пароль.' }
    setSessionEmail(found.email)
    return { ok: true }
  }

  const logout = () => {
    setSessionEmail(null)
  }

  const resetPassword = (email: string) => {
    const found = users.find(u => u.email === email.trim().toLowerCase())
    if (!found) return { ok: false, error: 'Пользователь с таким email не найден' }
    const newPassword = Math.random().toString(36).slice(-8)
    setUsers(prev => prev.map(u => u.email === found.email ? { ...u, password: newPassword } : u))
    return { ok: true, newPassword }
  }

  const addTransfer = (transfer: Omit<Transfer, 'userEmail'>) => {
    if (!user) return
    setTransfers(prev => [{ ...transfer, userEmail: user.email }, ...prev])
  }

  // Переводы только текущего пользователя
  const userTransfers = user ? transfers.filter(t => t.userEmail === user.email) : []

  return (
    <AppContext.Provider value={{
      user, users, isLoggedIn,
      transfers: userTransfers,
      register, signIn, logout, resetPassword, addTransfer
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
