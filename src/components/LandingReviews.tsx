import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

// ─────────────────────────────────────────────────────────
// Блок «Отзывы» на лендинге.
// Показывает 2 одобренных отзыва открыто, остальные — под кнопкой «Показать ещё».
// Если одобренных отзывов нет — секция вообще не рендерится.
// Доступ к approved=true разрешён RLS-политикой для anon-ключа.
// ─────────────────────────────────────────────────────────

interface Review {
  id: string
  author_name: string
  text: string
  image_url: string | null
  created_at: string
}

const MONTHS_RU = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
]

function formatMonth(iso: string): string {
  try {
    const d = new Date(iso)
    return `${MONTHS_RU[d.getMonth()]} ${d.getFullYear()}`
  } catch {
    return ''
  }
}

interface LandingReviewsProps {
  // Колбэк родителю — есть ли одобренные отзывы.
  // Нужен чтобы лендинг переключил фон финального CTA и сохранил ритм.
  onLoad?: (hasReviews: boolean) => void
}

export default function LandingReviews({ onLoad }: LandingReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [expanded, setExpanded] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('reviews')
        .select('id, author_name, text, image_url, created_at')
        .eq('approved', true)
        .order('created_at', { ascending: false })
        .limit(20)
      const list = (data || []) as Review[]
      setReviews(list)
      setLoaded(true)
      onLoad?.(list.length > 0)
    }
    load()
  }, [onLoad])

  // Если ещё не загрузили или нет одобренных отзывов — секцию не показываем.
  // Это сохраняет цветовой ритм: соседи (Философия + CTA) сразу стыкуются.
  if (!loaded || reviews.length === 0) return null

  const visible = reviews.slice(0, 2)
  const extra = reviews.slice(2)
  const hasExtra = extra.length > 0

  return (
    <section
      className="py-20 border-t border-gold-300/20"
      style={{ backgroundColor: '#FDFDFD' }}
    >
      <div className="site-container">
        {/* Заголовок секции */}
        <div className="text-center mb-12">
          <div className="tag mb-3">Отзывы</div>
          <h2 className="section-title mb-5">Голоса изобилия</h2>
          <div className="w-12 h-px bg-gold-400 mx-auto" />
        </div>

        {/* Первые два отзыва */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {visible.map(r => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>

        {hasExtra && (
          <>
            {/* Раскрывающийся список */}
            <div
              className={`grid md:grid-cols-2 gap-6 max-w-4xl mx-auto overflow-hidden transition-all duration-500 ${
                expanded ? 'mt-6 opacity-100' : 'mt-0 max-h-0 opacity-0'
              }`}
              style={expanded ? {} : { maxHeight: 0 }}
            >
              {extra.map(r => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>

            <div className="text-center mt-10">
              <button
                onClick={() => setExpanded(e => !e)}
                className="btn-outline text-sm px-8 py-3"
              >
                {expanded ? 'Свернуть' : `Показать ещё ${extra.length}`}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white/70 backdrop-blur-sm border border-gold-400/30 p-7 md:p-8 rounded-2xl shadow-card flex flex-col h-full">
      {/* Декоративная кавычка */}
      <div
        className="font-serif text-5xl leading-none mb-2 select-none"
        style={{ color: '#D4B87A', opacity: 0.45 }}
      >
        «
      </div>

      <p className="font-serif italic text-base md:text-lg text-ink-700 leading-relaxed mb-5 flex-1 whitespace-pre-wrap">
        {review.text}
      </p>

      {review.image_url && (
        <img
          src={review.image_url}
          alt=""
          className="rounded-xl w-full max-h-48 object-cover mb-5 border border-gold-300/30"
        />
      )}

      <div className="border-t border-gold-300/30 pt-4 mt-auto">
        <div className="font-sans text-sm text-ink-900 font-medium">
          {review.author_name || 'Без имени'}
        </div>
        <div className="font-sans text-xs text-ink-500 mt-0.5 tracking-wide">
          {formatMonth(review.created_at)}
        </div>
      </div>
    </div>
  )
}
