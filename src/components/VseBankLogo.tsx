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
    sm: { svgW: 22, svgH: 18, stroke: 2.5, text: 'text-lg' },
    md: { svgW: 30, svgH: 22, stroke: 2.8, text: 'text-xl md:text-2xl' },
    lg: { svgW: 36, svgH: 26, stroke: 3, text: 'text-2xl md:text-3xl' },
  }
  const s = sizes[size]
  const strokeColor = variant === 'light' ? '#D4B87A' : '#B89058'
  const textColor = variant === 'light' ? 'text-cream-50' : 'text-ink-900'

  return (
    <button
      type="button"
      onClick={() => navigate('/')}
      className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer p-0 border-0 bg-transparent"
      aria-label="VseBank — на главную"
    >
      <svg width={s.svgW} height={s.svgH} viewBox="0 0 22 14" fill="none" className="block">
        <path d="M1 7 C 1 2, 7 2, 10 7 C 13 12, 19 12, 19 7 C 19 2, 13 2, 10 7 C 7 12, 1 12, 1 7 Z"
          stroke={strokeColor} strokeWidth={s.stroke} fill="none" strokeLinecap="round"/>
      </svg>
      <span className={`font-serif ${s.text} ${textColor} tracking-wide font-medium leading-none`}>
        VseBank
      </span>
    </button>
  )
}
