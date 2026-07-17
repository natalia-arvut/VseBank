import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { supabase } from '../lib/supabase'
import VseBankLogo from '../components/VseBankLogo'
import LegalFooter from '../components/LegalFooter'
import LegalModal from '../components/LegalModal'
import { useLegalDocs, type LegalDocKey } from '../components/legalContent'
import { useT } from '../i18n'

export default function Login() {
  const navigate = useNavigate()
  const { signIn, resetPassword } = useApp()
  const legalDocs = useLegalDocs()
  const t = useT({
    ru: {
      signInError: 'Ошибка входа',
      enterEmail: 'Введи email',
      sendError: 'Ошибка отправки',
      resetSent: (email: string) => `Письмо для сброса пароля отправлено на ${email}. Перейди по ссылке из письма.`,
      emailPh: 'E-mail',
      passwordPh: 'Пароль',
      signingIn: 'Входим...',
      signInBtn: 'Войти в личный кабинет',
      forgotPassword: 'Забыли пароль?',
      legalPrefix: 'Нажимая кнопку, ты подтверждаешь актуальные условия',
      legalTerms: 'Пользовательского соглашения',
      legalAnd: 'и',
      legalPrivacy: 'Политики конфиденциальности',
      noSpace: 'Нет пространства? ',
      openSpace: 'Открыть пространство изобилия',
      backHome: '← Вернуться на главную',
      loginImageAlt: 'Доверие — твоя валюта · Изобилие — твоё естественное состояние',
      resetTitle: 'Восстановление пароля',
      resetHint: 'Введи email — мы отправим ссылку для установки нового пароля',
      sending: 'Отправляем...',
      sendLink: 'Отправить ссылку',
      cancel: 'Отмена',
    },
    en: {
      signInError: 'Login error',
      enterEmail: 'Enter your email',
      sendError: 'Sending error',
      resetSent: (email: string) => `A password-reset email has been sent to ${email}. Follow the link in the email.`,
      emailPh: 'E-mail',
      passwordPh: 'Password',
      signingIn: 'Signing in...',
      signInBtn: 'Log in to your account',
      forgotPassword: 'Forgot password?',
      legalPrefix: 'By clicking the button, you confirm the current terms of the',
      legalTerms: 'Terms of Service',
      legalAnd: 'and the',
      legalPrivacy: 'Privacy Policy',
      noSpace: 'No space yet? ',
      openSpace: 'Open your space of abundance',
      backHome: '← Back to home',
      loginImageAlt: 'Trust is your currency · Abundance is your natural state',
      resetTitle: 'Password recovery',
      resetHint: 'Enter your email — we’ll send a link to set a new password',
      sending: 'Sending...',
      sendLink: 'Send link',
      cancel: 'Cancel',
    },
  })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)
  const [resetOpen, setResetOpen] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetLoading, setResetLoading] = useState(false)
  const [openLegal, setOpenLegal] = useState<LegalDocKey | null>(null)

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
      setError(result.error || t.signInError)
    }
  }

  const handleReset = async () => {
    setError(''); setInfo('')
    if (!resetEmail) { setError(t.enterEmail); return }
    setResetLoading(true)
    const result = await resetPassword(resetEmail)
    setResetLoading(false)
    if (!result.ok) { setError(result.error || t.sendError); return }
    setInfo(t.resetSent(resetEmail))
    setResetOpen(false)
    setResetEmail('')
  }

  return (
    <div className="bg-cream-100">

      {/* Главная зона занимает полный экран — арка и форма не сжимаются,
          футер появляется ниже при скролле. */}
      <div className="min-h-screen flex flex-col lg:flex-row">

      {/* Левая половина — форма входа */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-12 py-10 lg:py-6">
        <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <VseBankLogo size="md" />
          </div>
          <div className="w-12 h-px bg-gold-400 mx-auto" />
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-3 rounded-2xl">
          <input
            className="input-field"
            placeholder={t.emailPh}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className="input-field"
            placeholder={t.passwordPh}
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
            {loading ? <><span className="animate-spin">⟳</span> {t.signingIn}</> : t.signInBtn}
          </button>

          <button
            type="button"
            onClick={() => setResetOpen(true)}
            className="w-full text-center font-sans text-xs text-gold-600 hover:text-gold-700 underline"
          >
            {t.forgotPassword}
          </button>

          {/* Юридическая подпись под кнопкой входа — ссылки открывают модалки */}
          <p className="font-sans text-[11px] text-gold-600 text-center leading-relaxed pt-2">
            {t.legalPrefix}{' '}
            <button type="button" onClick={() => setOpenLegal('terms')} className="text-gold-600 hover:text-gold-700 underline underline-offset-2 cursor-pointer">
              {t.legalTerms}
            </button>{' '}
            {t.legalAnd}{' '}
            <button type="button" onClick={() => setOpenLegal('privacy')} className="text-gold-600 hover:text-gold-700 underline underline-offset-2 cursor-pointer">
              {t.legalPrivacy}
            </button>
            .
          </p>
        </form>

        <div className="text-center mt-4">
          <span className="font-sans text-sm text-stone-500">{t.noSpace}</span>
          <button
            onClick={() => navigate('/register')}
            className="font-sans text-sm text-gold-600 hover:text-gold-700 underline"
          >
            {t.openSpace}
          </button>
        </div>

        <div className="text-center mt-2">
          <button
            onClick={() => navigate('/')}
            className="font-sans text-xs text-stone-400 hover:text-stone-600"
          >
            {t.backHome}
          </button>
        </div>
        </div>
      </div>

      {/* Правая половина — иллюстрация */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img
          src={`${import.meta.env.BASE_URL}login-image.png`}
          alt={t.loginImageAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      </div>

      {/* Сквозной юридический футер */}
      <LegalFooter />

      {/* Модалки с юридическими документами — открываются по подписи под кнопкой */}
      {openLegal && (() => {
        const doc = legalDocs[openLegal]
        const Content = doc.Content
        return (
          <LegalModal
            open={true}
            onClose={() => setOpenLegal(null)}
            tag={doc.meta.tag}
            title={doc.meta.title}
            intro={doc.meta.intro}
          >
            <Content />
          </LegalModal>
        )
      })()}

      {/* Модалка восстановления пароля */}
      {resetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/70 backdrop-blur-sm p-6"
          onClick={() => setResetOpen(false)}
        >
          <div className="bg-cream-100 max-w-md w-full p-8 rounded-2xl shadow-gold-lg border border-gold-400/40"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-serif text-2xl text-stone-800 mb-2 text-center">{t.resetTitle}</h2>
            <div className="w-12 h-px bg-gold-400 mx-auto mb-5" />
            <p className="text-sm text-stone-600 mb-5 text-center">
              {t.resetHint}
            </p>
            <input
              type="email"
              className="input-field mb-4"
              placeholder={t.emailPh}
              value={resetEmail}
              onChange={e => setResetEmail(e.target.value)}
            />
            <div className="flex gap-3">
              <button onClick={handleReset} disabled={resetLoading} className="flex-1 btn-gold disabled:opacity-50">
                {resetLoading ? t.sending : t.sendLink}
              </button>
              <button onClick={() => setResetOpen(false)} className="flex-1 btn-outline">{t.cancel}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
