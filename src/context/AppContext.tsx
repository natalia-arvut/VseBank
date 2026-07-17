import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import type { ProfileRow, TransferRow } from '../lib/supabase'

// Публичные типы (camelCase) — для совместимости со старым кодом
export interface User {
  firstName: string
  lastName: string
  companyRegNumber?: string
  birthDate: string
  gender: string
  email: string
  country: string
  accountType: 'personal' | 'company'
  registeredAt: string
  accountNumber: string
  isAdmin: boolean
}

export interface Transfer {
  id: string
  amount: string
  currency: string
  type: string
  timing: string
  createdAt: string
  status: 'pending' | 'completed'
}

export interface RegisterInput {
  firstName: string
  lastName: string
  companyRegNumber?: string
  birthDate?: string
  gender?: string
  email: string
  password: string
  country: string
  accountType: 'personal' | 'company'
}

interface AppContextType {
  user: User | null
  isLoggedIn: boolean
  isLoading: boolean
  transfers: Transfer[]
  // ВАЖНО: при включённом email confirmation register НЕ создаёт сессию —
  // вернёт {ok, needsConfirmation: true}. Сессия появится после клика по ссылке в письме.
  register: (data: RegisterInput) => Promise<{ ok: boolean; error?: string; needsConfirmation?: boolean }>
  signIn: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>
  logout: () => Promise<void>
  // Отправляет письмо со ссылкой для установки нового пароля.
  resetPassword: (email: string) => Promise<{ ok: boolean; error?: string }>
  // Применяет новый пароль (вызывать на странице /reset-password после клика по ссылке)
  updatePassword: (newPassword: string) => Promise<{ ok: boolean; error?: string }>
  addTransfer: (transfer: Omit<Transfer, 'id'> & { id?: string }) => Promise<{ ok: boolean; error?: string }>
  // Подтвердить перевод — статус меняется на 'completed' (перевод пришёл)
  confirmTransfer: (id: string) => Promise<{ ok: boolean; error?: string }>
  // Удалить перевод (не пришёл) — удаляется из БД
  deleteTransfer: (id: string) => Promise<{ ok: boolean; error?: string }>
  refreshTransfers: () => Promise<void>
}

const AppContext = createContext<AppContextType | null>(null)

// Преобразование БД → фронт
function profileFromRow(row: ProfileRow): User {
  return {
    firstName: row.first_name,
    lastName: row.last_name || '',
    companyRegNumber: row.company_reg_number || undefined,
    birthDate: row.birth_date || '',
    gender: row.gender || '',
    email: row.email,
    country: row.country,
    accountType: row.account_type,
    registeredAt: row.registered_at,
    accountNumber: row.account_number,
    isAdmin: row.is_admin === true,
  }
}

function transferFromRow(row: TransferRow): Transfer {
  return {
    id: row.id,
    amount: row.amount,
    currency: row.currency,
    type: row.type,
    timing: row.timing,
    createdAt: row.created_at,
    status: row.status,
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [transfers, setTransfers] = useState<Transfer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  // Универсальный таймаут — не даём Promise повиснуть навсегда
  const withTimeout = <T,>(p: Promise<T>, ms: number, fallback: T): Promise<T> =>
    Promise.race([p, new Promise<T>(resolve => setTimeout(() => resolve(fallback), ms))])

  // Грузим профиль и переводы по userId — фоном, не блокируя UI
  const loadUserData = useCallback(async (uid: string) => {
    try {
      const profilePromise = (async () =>
        await supabase.from('profiles').select('*').eq('id', uid).maybeSingle())()
      const txPromise = (async () =>
        await supabase.from('transfers').select('*').eq('user_id', uid).order('created_at', { ascending: false }))()

      const [profileRes, txRes] = await Promise.all([
        withTimeout(profilePromise, 5000, { data: null } as any),
        withTimeout(txPromise, 5000, { data: null } as any),
      ])
      if (profileRes?.data) setUser(profileFromRow(profileRes.data as ProfileRow))
      if (txRes?.data) setTransfers((txRes.data as TransferRow[]).map(transferFromRow))
    } catch {
      // данные подгрузятся в следующий раз
    }
  }, [])

  // Инициализация сессии — UI разблокируется максимум за 2 секунды
  useEffect(() => {
    let mounted = true

    ;(async () => {
      // getSession читает localStorage синхронно, но даём ему 2 сек на всякий случай
      const result = await withTimeout(
        supabase.auth.getSession(),
        2000,
        { data: { session: null } } as any
      )
      if (!mounted) return

      const uid = result?.data?.session?.user?.id || null
      setUserId(uid)
      // UI разблокируется СРАЗУ — данные пользователя подгрузятся фоном
      setIsLoading(false)
      if (uid) loadUserData(uid)
    })()

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const uid = session?.user?.id || null
      setUserId(uid)
      if (!uid) {
        setUser(null)
        setTransfers([])
      } else {
        // Грузим данные пользователя — не блокируем UI
        loadUserData(uid)
      }
    })

    return () => {
      mounted = false
      sub.subscription.unsubscribe()
    }
  }, [loadUserData])

  const register: AppContextType['register'] = async (data) => {
    const emailNorm = data.email.trim().toLowerCase()
    const accountNumber = `VBI-${Date.now().toString().slice(-10)}`

    const { data: result, error } = await supabase.auth.signUp({
      email: emailNorm,
      password: data.password,
      options: {
        emailRedirectTo: `${window.location.origin}${import.meta.env.BASE_URL}#/auth/callback`,
        data: {
          first_name: data.firstName,
          last_name: data.lastName || '',
          company_reg_number: data.companyRegNumber || '',
          birth_date: data.birthDate || '',
          gender: data.gender || '',
          country: data.country,
          account_type: data.accountType,
          account_number: accountNumber,
        },
      },
    })

    if (error) return { ok: false, error: error.message }

    // Если confirmation включён — сессии нет, нужно подтвердить email
    const needsConfirmation = !result.session
    return { ok: true, needsConfirmation }
  }

  const signIn: AppContextType['signIn'] = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    })
    if (error) {
      const msg = error.message.toLowerCase()
      if (msg.includes('email not confirmed'))
        return { ok: false, error: 'Email не подтверждён. Проверьте письмо со ссылкой подтверждения.' }
      if (msg.includes('invalid'))
        return { ok: false, error: 'Неверный email или пароль.' }
      return { ok: false, error: error.message }
    }
    return { ok: true }
  }

  const logout: AppContextType['logout'] = async () => {
    await supabase.auth.signOut()
  }

  const resetPassword: AppContextType['resetPassword'] = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
      redirectTo: `${window.location.origin}${import.meta.env.BASE_URL}#/reset-password`,
    })
    if (error) return { ok: false, error: error.message }
    return { ok: true }
  }

  const updatePassword: AppContextType['updatePassword'] = async (newPassword) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) return { ok: false, error: error.message }
    return { ok: true }
  }

  const addTransfer: AppContextType['addTransfer'] = async (transfer) => {
    if (!userId) return { ok: false, error: 'Нет активной сессии' }
    const { data, error } = await supabase
      .from('transfers')
      .insert({
        user_id: userId,
        amount: transfer.amount,
        currency: transfer.currency,
        type: transfer.type,
        timing: transfer.timing,
        status: transfer.status || 'pending',
      })
      .select()
      .single()
    if (error) return { ok: false, error: error.message }
    setTransfers(prev => [transferFromRow(data as TransferRow), ...prev])
    return { ok: true }
  }

  const confirmTransfer: AppContextType['confirmTransfer'] = async (id) => {
    if (!userId) return { ok: false, error: 'Нет активной сессии' }
    const { data, error } = await supabase
      .from('transfers')
      .update({ status: 'completed' })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single()
    if (error) return { ok: false, error: error.message }
    setTransfers(prev => prev.map(t => (t.id === id ? transferFromRow(data as TransferRow) : t)))
    return { ok: true }
  }

  const deleteTransfer: AppContextType['deleteTransfer'] = async (id) => {
    if (!userId) return { ok: false, error: 'Нет активной сессии' }
    const { error } = await supabase
      .from('transfers')
      .delete()
      .eq('id', id)
      .eq('user_id', userId)
    if (error) return { ok: false, error: error.message }
    setTransfers(prev => prev.filter(t => t.id !== id))
    return { ok: true }
  }

  const refreshTransfers: AppContextType['refreshTransfers'] = async () => {
    if (!userId) return
    const { data } = await supabase
      .from('transfers')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (data) setTransfers((data as TransferRow[]).map(transferFromRow))
  }

  return (
    <AppContext.Provider value={{
      user,
      // Залогинен = есть userId в сессии; user (профиль из БД) может ещё догружаться
      isLoggedIn: !!userId,
      isLoading,
      transfers,
      register,
      signIn,
      logout,
      resetPassword,
      updatePassword,
      addTransfer,
      confirmTransfer,
      deleteTransfer,
      refreshTransfers,
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
