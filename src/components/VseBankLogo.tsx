// Логотип VseBank — единый для всех страниц
export default function VseBankLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: { svgW: 32, svgH: 20, stroke: 2.5, text: 'text-xl' },
    md: { svgW: 40, svgH: 24, stroke: 3, text: 'text-2xl md:text-3xl' },
    lg: { svgW: 48, svgH: 28, stroke: 3, text: 'text-3xl md:text-4xl' },
  }
  const s = sizes[size]

  return (
    <div className="flex items-center gap-3">
      <svg width={s.svgW} height={s.svgH} viewBox="0 0 40 24" fill="none">
        <path d="M10 12 C 10 5, 17 5, 20 12 C 23 19, 30 19, 30 12 C 30 5, 23 5, 20 12 C 17 19, 10 19, 10 12 Z"
          stroke="#B89058" strokeWidth={s.stroke} fill="none" strokeLinecap="round"/>
      </svg>
      <span className={`font-serif ${s.text} text-ink-900 tracking-wide font-medium leading-none`}>
        VseBank
      </span>
    </div>
  )
}
