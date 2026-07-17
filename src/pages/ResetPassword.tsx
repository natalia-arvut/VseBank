import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useApp } from '../context/AppContext'
import VseBankLogo from '../components/VseBankLogo'
import { useT } from '../i18n'

// Страница установки нового пароля.
// Пользователь попадает сюда по ссылке из письма «сброс пароля».
// Supabase отдаёт recovery-токен в hash — мы применяем его и даём ввести новый пароль.
export default function ResetPassword() {
  const navigate = useNavigate()
  const { updatePassword } = useApp()
  const t = useT({
    ru: {
      linkInvalid: 'Ссылка для сброса пароля недействительна или истекла.',
      passwordShort: 'Пароль должен быть не короче 6 символов',
      passwordsMismatch: 'Пароли не совпадают',
      updateFailed: 'Не удалось установить пароль',
      updated: 'Пароль успешно обновлён. Перенаправляем в кабинет...',
      tag: 'Сброс пароля',
      title: 'Установите новый пароль',
      checking: 'Проверяем ссылку...',
      newPassword: 'Новый пароль',
      repeatPassword: 'Повторите новый пароль',
      saving: 'Сохраняем...',
      setPassword: 'Установить пароль',
      toLogin: 'На страницу входа',
    },
    en: {
      linkInvalid: 'This password-reset link is invalid or has expired.',
      passwordShort: 'Password must be at least 6 characters long',
      passwordsMismatch: 'Passwords do not match',
      updateFailed: 'We couldn’t set the password',
      updated: 'Password updated successfully. Redirecting to your account...',
      tag: 'Password reset',
      title: 'Set a new password',
      checking: 'Verifying the link...',
      newPassword: 'New password',
      repeatPassword: 'Repeat new password',
      saving: 'Saving...',
      setPassword: 'Set password',
      toLogin: 'Go to login',
    },
  })
  const [ready, setReady] = useState(false)
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const run = async () => {
      const fullHash = window.location.hash || ''
      const idx = fullHash.indexOf('#', 1)
      const tokensHash = idx >= 0 ? fullHash.substring(idx + 1) : ''
      const params = new URLSearchParams(tokensHash)
      const accessToken = params.get('access_token')
      const refreshToken = params.get('refresh_token')
      const errDesc = params.get('error_description')

      if (errDesc) { setError(decodeURIComponent(errDesc)); return }

      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        })
        if (error) { setError(error.message); return }
        setReady(true)
        return
      }

      // Если уже есть recovery-сессия (Supabase сам её установил при detectSessionInUrl)
      const { data } = await supabase.auth.getSession()
      if (data.session) setReady(true)
      else setError(t.linkInvalid)
    }
    run()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password.length < 6) { setError(t.passwordShort); return }
    if (password !== password2) { setError(t.passwordsMismatch); return }

    setLoading(true)
    const result = await updatePassword(password)
    setLoading(false)
    if (!result.ok) { setError(result.error || t.updateFailed); return }
    setInfo(t.updated)
    setTimeout(() => navigate('/cabinet', { replace: true }), 1500)
  }

  return (
    <div className="h-screen bg-cream-100 bg-pattern flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="mb-6 flex justify-center"><VseBankLogo size="md" /></div>
        <div className="glass-card p-8 rounded-2xl">
          <div className="text-center mb-5">
            <div className="tag mb-2 text-sm">{t.tag}</div>
            <h1 className="font-serif text-2xl text-stone-800">{t.title}</h1>
            <div className="w-12 h-px bg-gold-400 mx-auto mt-3" />
          </div>

          {!ready && !error && (
            <div className="text-center text-stone-500 py-6">
              <span className="animate-spin inline-block text-2xl text-gold-500">⟳</span>
              <p className="mt-2 text-sm">{t.checking}</p>
            </div>
          )}

          {ready && (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="password"
                className="input-field"
                placeholder={t.newPassword}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <input
                type="password"
                className="input-field"
                placeholder={t.repeatPassword}
                value={password2}
                onChange={e => setPassword2(e.target.value)}
              />
              {error && (
                <div className="font-sans text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3 rounded-md">{error}</div>
              )}
              {info && (
                <div className="font-sans text-sm text-gold-700 bg-gold-500/10 border border-gold-400/40 px-4 py-3 rounded-md">{info}</div>
              )}
              <button type="submit" disabled={loading} className="w-full btn-gold disabled:opacity-50">
                {loading ? t.saving : t.setPassword}
              </button>
            </form>
          )}

          {error && !ready && (
            <div className="text-center">
              <p className="font-sans text-red-600 mb-4">{error}</p>
              <button onClick={() => navigate('/login')} className="w-full btn-outline">
                {t.toLogin}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
