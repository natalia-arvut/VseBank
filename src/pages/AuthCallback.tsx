import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import VseBankLogo from '../components/VseBankLogo'
import { useT } from '../i18n'

// Страница куда попадает пользователь после клика по ссылке подтверждения email.
// Supabase кладёт токены в URL hash — SDK сам читает их при detectSessionInUrl,
// но мы вызываем getSession явно и редиректим в кабинет.
export default function AuthCallback() {
  const navigate = useNavigate()
  const t = useT({
    ru: {
      confirmFailed: 'Не удалось подтвердить email. Попробуйте войти заново.',
      errorTitle: 'Что-то пошло не так',
      toLogin: 'На страницу входа',
      confirming: 'Подтверждаем пространство...',
      oneSecond: 'Это займёт секунду.',
    },
    en: {
      confirmFailed: 'We couldn’t confirm your email. Please try logging in again.',
      errorTitle: 'Something went wrong',
      toLogin: 'Go to login',
      confirming: 'Confirming your space...',
      oneSecond: 'This will take a second.',
    },
  })
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      // Хеш приходит вида: #/auth/callback#access_token=...&refresh_token=...
      const fullHash = window.location.hash || ''
      // Берём всё, что после второго #
      const idx = fullHash.indexOf('#', 1)
      const tokensHash = idx >= 0 ? fullHash.substring(idx + 1) : ''
      const params = new URLSearchParams(tokensHash)

      const accessToken = params.get('access_token')
      const refreshToken = params.get('refresh_token')
      const errDesc = params.get('error_description')

      if (errDesc) {
        if (!cancelled) setError(decodeURIComponent(errDesc))
        return
      }

      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        })
        if (cancelled) return
        if (error) {
          setError(error.message)
          return
        }
        navigate('/cabinet', { replace: true })
        return
      }

      // Уже есть сессия?
      const { data } = await supabase.auth.getSession()
      if (cancelled) return
      if (data.session) navigate('/cabinet', { replace: true })
      else setError(t.confirmFailed)
    }

    run()
    return () => { cancelled = true }
  }, [navigate])

  return (
    <div className="h-screen bg-cream-100 bg-pattern flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 flex justify-center"><VseBankLogo size="md" /></div>
        <div className="glass-card p-10 rounded-2xl">
          {error ? (
            <>
              <h1 className="font-serif text-2xl text-stone-800 mb-3">{t.errorTitle}</h1>
              <div className="w-12 h-px bg-gold-400 mx-auto mb-5" />
              <p className="font-sans text-stone-600 mb-6">{error}</p>
              <button onClick={() => navigate('/login')} className="w-full btn-gold">
                {t.toLogin}
              </button>
            </>
          ) : (
            <>
              <div className="text-5xl text-gold-500 mb-4 animate-spin inline-block">⟳</div>
              <h1 className="font-serif text-2xl text-stone-800 mb-2">{t.confirming}</h1>
              <p className="font-sans text-stone-500 text-sm">{t.oneSecond}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
