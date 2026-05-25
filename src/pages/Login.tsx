import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import VseBankLogo from '../components/VseBankLogo'
import emailjs from '@emailjs/browser'

export default function Login() {
  const navigate = useNavigate()
  const { signIn, resetPassword } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [resetOpen, setResetOpen] = useState(false)
  const [resetEmail, setResetEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(''); setInfo('')
    const result = signIn(email, password)
    if (result.ok) {
      navigate('/cabinet')
    } else {
      setError(result.error || 'Ошибка входа')
    }
  }

  const handleReset = async () => {
    setError(''); setInfo('')
    if (!resetEmail) { setError('Введите email'); return }
    const result = resetPassword(resetEmail)
    if (!result.ok) { setError(result.error || ''); return }

    // Отправляем новый пароль на email через EmailJS
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_RESET || 'YOUR_TEMPLATE_RESET',
        {
          to_email: resetEmail,
          new_password: result.newPassword,
          message: `Ваш новый пароль: ${result.newPassword}`,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
      )
      setInfo(`Новый пароль отправлен на ${resetEmail}`)
    } catch {
      setInfo(`Ваш новый пароль: ${result.newPassword} (EmailJS пока не настроен)`)
    }
    setResetOpen(false)
    setResetEmail('')
  }

  return (
    <div className="h-screen overflow-hidden bg-cream-100 bg-pattern flex items-center justify-center px-8 py-6">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <div className="flex justify-start mb-4">
            <VseBankLogo size="md" />
          </div>
          <div className="w-12 h-px bg-gold-400 mb-4" />
          <p className="font-sans text-stone-500 text-sm">Войдите в ваш кабинет изобилия</p>
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

          <button type="submit" className="w-full btn-gold">
            Войти в личный кабинет
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
              Введите email, на который придёт новый пароль
            </p>
            <input
              type="email"
              className="input-field mb-4"
              placeholder="E-mail"
              value={resetEmail}
              onChange={e => setResetEmail(e.target.value)}
            />
            <div className="flex gap-3">
              <button onClick={handleReset} className="flex-1 btn-gold">Отправить</button>
              <button onClick={() => setResetOpen(false)} className="flex-1 btn-outline">Отмена</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
