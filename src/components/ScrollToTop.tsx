import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// При навигации в HashRouter позиция скролла сама не сбрасывается —
// и новая страница открывается «оттуда, где была старая». Этот компонент
// прокручивает окно в начало при каждой смене маршрута.

export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}
