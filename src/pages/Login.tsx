import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { supabase } from '../lib/supabase'
import VseBankLogo from '../components/VseBankLogo'

export default function Login() {
  const navigate = useNavigate()
  const { signIn, resetPassword } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)
  const [resetOpen, setResetOpen] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetLoading, setResetLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(''); setInfo(''); setLoading(true)
    const result = await signIn(email, password)
    if (result.ok) {
      // Админов сразу ведём в админ-панель — иначе попадут на /cabinet,
      // которая может быть скрыта под maintenance-заглушкой.
      try {
        const { data: authData } = await supabase.auth.getUser()
        if (authData.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', authData.user.id)
            .maybeSingle()
          setLoading(false)
          if (profile?.is_admin) {
            navigate('/admin')
            return
          }
        }
      } catch {
        // если проверка не удалась — просто едем в кабинет
      }
      setLoading(false)
      navigate('/cabinet')
    } else {
      setLoading(false)
      setError(result.error || 'Ошибка входа')
    }
  }

  const handleReset = async () => {
    setError(''); setInfo('')
    if (!resetEmail) { setError('Введи email'); return }
    setResetLoading(true)
    const result = await resetPassword(resetEmail)
    setResetLoading(false)
    if (!result.ok) { setError(result.error || 'Ошибка отправки'); return }
    setInfo(`Письмо для сброса пароля отправлено на ${resetEmail}. Перейди по ссылке из письма.`)
    setResetOpen(false)
    setResetEmail('')
  }

  return (
    <div className="h-screen overflow-hidden bg-cream-100 flex">

      {/* Левая половина — форма входа */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-12 py-6 overflow-y-auto">
        <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <VseBankLogo size="md" />
          </div>
          <div className="w-12 h-px bg-gold-400 mx-auto mb-4" />
          <p className="font-sans text-stone-600 text-base md:text-lg">Войди в твой кабинет изобилия</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-3 rounded-2xl">
          <input
            className="input-field"
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className="input-field"
            placeholder="Пароль"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          {error && (
            <div className="font-sans text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3 rounded-md">
              {error}
            </div>
          )}
          {info && (
            <div className="font-sans text-sm text-gold-700 bg-gold-500/10 border border-gold-400/40 px-4 py-3 rounded-md">
              {info}
            </div>
          )}

          <button type="submit" disabled={loading} className="w-full btn-gold disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? <><span className="animate-spin">⟳</span> Входим...</> : 'Войти в личный кабинет'}
          </button>

          <button
            type="button"
            onClick={() => setResetOpen(true)}
            className="w-full text-center font-sans text-xs text-gold-600 hover:text-gold-700 underline"
          >
            Забыли пароль?
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="font-sans text-sm text-stone-500">Нет счёта? </span>
          <button
            onClick={() => navigate('/register')}
            className="font-sans text-sm text-gold-600 hover:text-gold-700 underline"
          >
            Открыть счёт изобилия
          </button>
        </div>

        <div className="text-center mt-2">
          <button
            onClick={() => navigate('/')}
            className="font-sans text-xs text-stone-400 hover:text-stone-600"
          >
            ← Вернуться на главную
          </button>
        </div>
        </div>
      </div>

      {/* Правая половина — иллюстрация */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img
          src={`${import.meta.env.BASE_URL}login-image.png`}
          alt="Trust is your currency · Abundance is your natural state"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Модалка восстановления пароля */}
      {resetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/70 backdrop-blur-sm p-6"
          onClick={() => setResetOpen(false)}
        >
          <div className="bg-cream-100 max-w-md w-full p-8 rounded-2xl shadow-gold-lg border border-gold-400/40"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-serif text-2xl text-stone-800 mb-2 text-center">Восстановление пароля</h2>
            <div className="w-12 h-px bg-gold-400 mx-auto mb-5" />
            <p className="text-sm text-stone-600 mb-5 text-center">
              Введи email — мы отправим ссылку для установки нового пароля
            </p>
            <input
              type="email"
              className="input-field mb-4"
              placeholder="E-mail"
              value={resetEmail}
              onChange={e => setResetEmail(e.target.value)}
            />
            <div className="flex gap-3">
              <button onClick={handleReset} disabled={resetLoading} className="flex-1 btn-gold disabled:opacity-50">
                {resetLoading ? 'Отправляем...' : 'Отправить ссылку'}
              </button>
              <button onClick={() => setResetOpen(false)} className="flex-1 btn-outline">Отмена</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
