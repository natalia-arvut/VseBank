import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import CabinetLayout from '../components/CabinetLayout'
import { useT } from '../i18n'

export default function Signature() {
  const navigate = useNavigate()
  const { user, logout } = useApp()
  const [signed, setSigned] = useState(false)
  const t = useT({
    ru: {
      tag: 'Подпись и выход',
      title: 'Подтверди своё намерение',
      declareIntro: 'Нажимая «Подпись», ты заявляешь Вселенной:',
      declaration: '«Я готов принять то, что уже принадлежит мне по праву рождения».',
      signer: 'Подписант',
      signBtn: '✦ Подпись',
      exitBtn: 'Выход →',
      congratsTitle: 'Прими поздравление от нашей команды!',
      congratsQuote: 'Завтра на твоём счету уже будет твой первый миллион.',
      congratsSub: 'Улыбайся. Верь. Радуйся. Наслаждайся новой реальностью.',
      toCabinet: 'В личный кабинет →',
      exit: 'Выйти',
    },
    en: {
      tag: 'Signature and exit',
      title: 'Confirm your intention',
      declareIntro: 'By pressing “Signature”, you declare to the Universe:',
      declaration: '“I am ready to receive what already belongs to me by birthright.”',
      signer: 'Signatory',
      signBtn: '✦ Signature',
      exitBtn: 'Exit →',
      congratsTitle: 'Receive congratulations from our team!',
      congratsQuote: 'Tomorrow your first million will already be in your account.',
      congratsSub: 'Smile. Believe. Rejoice. Enjoy your new reality.',
      toCabinet: 'To personal account →',
      exit: 'Sign out',
    },
  })

  const handleSign = () => {
    setSigned(true)
  }

  const handleExit = () => {
    logout()
    navigate('/')
  }

  return (
    <CabinetLayout>
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="max-w-lg w-full">

          {!signed ? (
            <>
              <div className="text-center mb-8">
                <div className="text-5xl text-gold-400/60 mb-4">✦</div>
                <div className="tag mb-3">{t.tag}</div>
                <h1 className="font-serif text-3xl text-stone-800 mb-4">
                  {t.title}
                </h1>
                <div className="gold-divider" />
                <p className="font-sans text-stone-600 leading-relaxed mt-6">
                  {t.declareIntro}
                </p>
                <p className="font-serif text-xl italic text-stone-700 mt-3">
                  {t.declaration}
                </p>
              </div>

              <div className="glass-card p-6 mb-6">
                <div className="text-center mb-4">
                  <div className="font-sans text-xs text-stone-500 tracking-widest uppercase mb-2">
                    {t.signer}
                  </div>
                  <div className="font-serif text-2xl text-stone-800 italic">
                    {user?.firstName} {user?.lastName}
                  </div>
                  <div className="w-32 h-px bg-stone-300 mx-auto mt-3" />
                </div>
                <div className="text-center font-sans text-xs text-stone-400">
                  {new Date().toLocaleDateString('ru', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={handleSign} className="flex-1 btn-gold">
                  {t.signBtn}
                </button>
                <button onClick={handleExit} className="flex-1 btn-outline">
                  {t.exitBtn}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="text-6xl text-gold-400/60 mb-6 animate-float">∞</div>
              <h1 className="font-serif text-4xl text-stone-800 mb-4">
                {t.congratsTitle}
              </h1>
              <div className="gold-divider" />
              <p className="font-serif text-xl italic text-stone-700 mt-6 mb-4">
                {t.congratsQuote}
              </p>
              <p className="font-sans text-stone-500 text-sm mb-10">
                {t.congratsSub}
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => navigate('/cabinet')}
                  className="btn-gold"
                >
                  {t.toCabinet}
                </button>
                <button onClick={handleExit} className="btn-outline">
                  {t.exit}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </CabinetLayout>
  )
}
