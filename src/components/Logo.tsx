// Логотип банка — звезда с инициалами
export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: { outer: 32, inner: 20, text: 'text-xs' },
    md: { outer: 44, inner: 28, text: 'text-sm' },
    lg: { outer: 60, inner: 38, text: 'text-base' },
  }
  const s = sizes[size]

  return (
    <div className="flex items-center gap-3">
      {/* Иконка */}
      <div
        className="relative flex items-center justify-center rounded-full border border-gold-400/60"
        style={{ width: s.outer, height: s.outer }}
      >
        <svg
          width={s.inner}
          height={s.inner}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Восьмиконечная звезда */}
          <path
            d="M12 2L13.5 8.5L20 7L15 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L9 12L4 7L10.5 8.5L12 2Z"
            fill="#B8860B"
            opacity="0.9"
          />
          <circle cx="12" cy="12" r="2.5" fill="#F8F3EA" />
        </svg>
      </div>
      {/* Текст */}
      <div>
        <div className="font-serif font-medium text-stone-800 tracking-wide leading-tight">
          {size === 'sm' ? 'ВБИ' : 'Вселенский Банк'}
        </div>
        {size !== 'sm' && (
          <div className="font-sans text-[10px] text-gold-600 tracking-[0.2em] uppercase leading-tight">
            Universalis Abundantia
          </div>
        )}
      </div>
    </div>
  )
}
