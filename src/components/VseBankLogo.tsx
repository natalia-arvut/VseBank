import { useNavigate } from 'react-router-dom'

// Логотип VseBank — кликабельный, ведёт на лендинг
export default function VseBankLogo({
  size = 'md',
  variant = 'dark',
}: {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'dark' | 'light'  // dark = тёмный текст (для светлого фона), light = светлый (для тёмного)
}) {
  const navigate = useNavigate()
  const sizes = {
    sm: { svgW: 28, svgH: 18, stroke: 2.5, text: 'text-lg' },
    md: { svgW: 36, svgH: 22, stroke: 2.8, text: 'text-xl md:text-2xl' },
    lg: { svgW: 44, svgH: 26, stroke: 3, text: 'text-2xl md:text-3xl' },
  }
  const s = sizes[size]
  const strokeColor = variant === 'light' ? '#D4B87A' : '#B89058'
  const textColor = variant === 'light' ? 'text-cream-50' : 'text-ink-900'

  return (
    <button
      type="button"
      onClick={() => navigate('/')}
      className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer"
      aria-label="VseBank — на главную"
    >
      <svg width={s.svgW} height={s.svgH} viewBox="0 0 40 24" fill="none">
        <path d="M10 12 C 10 5, 17 5, 20 12 C 23 19, 30 19, 30 12 C 30 5, 23 5, 20 12 C 17 19, 10 19, 10 12 Z"
          stroke={strokeColor} strokeWidth={s.stroke} fill="none" strokeLinecap="round"/>
      </svg>
      <span className={`font-serif ${s.text} ${textColor} tracking-wide font-medium leading-none`}>
        VseBank
      </span>
    </button>
  )
}
