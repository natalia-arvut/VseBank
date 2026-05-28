import { useNavigate } from 'react-router-dom'

// Логотип VseBank — золотой PNG, кликабельный, ведёт на лендинг.
// Логотип одинаковый и на светлых, и на тёмных фонах, поэтому variant больше не влияет на изображение.
export default function VseBankLogo({
  size = 'md',
  variant = 'dark',
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'dark' | 'light'
}) {
  // variant сохранён для обратной совместимости (вызовов с light/dark много), но не используется
  void variant
  const navigate = useNavigate()
  const sizes = {
    sm: 'h-14',                    // ×2 от прошлого sm
    md: 'h-20 md:h-24',            // ×2 от прошлого md
    lg: 'h-28 md:h-32',            // ×2 от прошлого lg
    xl: 'h-40 md:h-48',            // ×2 от прошлого xl
  }
  return (
    <button
      type="button"
      onClick={() => navigate('/')}
      className="inline-flex items-center hover:opacity-90 transition-opacity cursor-pointer p-0 border-0 bg-transparent"
      aria-label="VseBank — на главную"
    >
      <img
        src={`${import.meta.env.BASE_URL}logo-vsebank.png`}
        alt="VseBank"
        className={`${sizes[size]} w-auto block select-none`}
        draggable={false}
      />
    </button>
  )
}
