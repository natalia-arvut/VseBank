// Гильош — тонкий узор переплетённых золотых нитей, как водяной знак
// на старинных банкнотах и ценных бумагах. Используется как фоновый декор.
//
// variant='dark' — для тёмных панелей (например, левая часть Register)
// variant='light' — для светлых cream-фонов (правая часть вкладок кабинета)

export default function Guilloche({ variant = 'light' }: { variant?: 'dark' | 'light' }) {
  const isDark = variant === 'dark'
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 800 1000"
      fill="none"
    >
      <defs>
        <linearGradient id={`guillocheFade-${variant}`} x1="0" y1="0" x2="0" y2="1">
          {isDark ? (
            <>
              <stop offset="0%" stopColor="#D4B87A" stopOpacity="0" />
              <stop offset="35%" stopColor="#D4B87A" stopOpacity="0.18" />
              <stop offset="65%" stopColor="#B89058" stopOpacity="0.20" />
              <stop offset="100%" stopColor="#B89058" stopOpacity="0.08" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#B89058" stopOpacity="0" />
              <stop offset="35%" stopColor="#B89058" stopOpacity="0.18" />
              <stop offset="65%" stopColor="#9A7641" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#9A7641" stopOpacity="0.10" />
            </>
          )}
        </linearGradient>
      </defs>
      {(() => {
        const lines: React.ReactElement[] = []
        const W = 800
        const step = 4
        // Два пучка переплетающихся синусоид — плотный гильош как на банкноте
        for (let i = 0; i < 60; i++) {
          const yOffset = 200 + i * 12
          const amp = 80 + (i % 5) * 20
          const freq = 0.008 + (i % 3) * 0.002
          const phase = (i * 0.7) % (Math.PI * 2)
          let d = `M -20 ${yOffset}`
          for (let x = -20; x <= W + 20; x += step) {
            const y = yOffset + amp * Math.sin(freq * x + phase) * 0.3
            d += ` L ${x} ${y.toFixed(2)}`
          }
          lines.push(
            <path key={`g1-${i}`} d={d} stroke={`url(#guillocheFade-${variant})`} strokeWidth="0.4" fill="none" />
          )
        }
        for (let i = 0; i < 50; i++) {
          const yOffset = 100 + i * 16
          const amp = 60 + (i % 4) * 25
          const freq = 0.006 + (i % 4) * 0.0015
          const phase = (i * 1.3 + 1) % (Math.PI * 2)
          let d = `M -20 ${yOffset}`
          for (let x = -20; x <= W + 20; x += step) {
            const y = yOffset + amp * Math.sin(freq * x + phase) * 0.35
            d += ` L ${x} ${y.toFixed(2)}`
          }
          lines.push(
            <path
              key={`g2-${i}`}
              d={d}
              stroke={`url(#guillocheFade-${variant})`}
              strokeWidth="0.3"
              strokeOpacity={isDark ? 0.7 : 0.85}
              fill="none"
            />
          )
        }
        return lines
      })()}
    </svg>
  )
}
