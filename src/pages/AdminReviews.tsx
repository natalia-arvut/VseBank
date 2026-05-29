import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { supabase } from '../lib/supabase'
import VseBankLogo from '../components/VseBankLogo'

// ─────────────────────────────────────────────────────────
// Модерация отзывов — только для админов.
// Здесь админ видит отзывы со статусом approved = false и решает:
//  «Разместить» → approved = true (отзыв появляется на публичной странице)
//  «Отклонить»  → запись удаляется из БД, фото — из Storage.
// ─────────────────────────────────────────────────────────

interface ReviewRow {
  id: string
  user_id: string
  author_name: string
  text: string
  image_url: string | null
  approved: boolean
  created_at: string
}

// Достаём путь файла внутри bucket из публичного URL Supabase Storage.
// URL имеет вид: .../storage/v1/object/public/review-images/<path>
function storagePathFromUrl(url: string): string | null {
  const marker = '/review-images/'
  const idx = url.indexOf(marker)
  if (idx === -1) return null
  return decodeURIComponent(url.slice(idx + marker.length))
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

export default function AdminReviews() {
  const { user, logout } = useApp()
  const [reviews, setReviews] = useState<ReviewRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState<string | null>(null)
  const [info, setInfo] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    const { data, error: err } = await supabase
      .from('reviews')
      .select('*')
      .eq('approved', false)
      .order('created_at', { ascending: false })
    if (err) setError(err.message)
    setReviews((data || []) as ReviewRow[])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const flash = (msg: string) => {
    setInfo(msg)
    setTimeout(() => setInfo(''), 2500)
  }

  const handleApprove = async (review: ReviewRow) => {
    setBusyId(review.id)
    const { error: err } = await supabase
      .from('reviews')
      .update({ approved: true })
      .eq('id', review.id)
    setBusyId(null)
    if (err) {
      setError(`Не удалось разместить: ${err.message}`)
      return
    }
    setReviews(prev => prev.filter(r => r.id !== review.id))
    flash('Отзыв размещён на сайте')
  }

  const handleReject = async (review: ReviewRow) => {
    const confirmed = window.confirm('Удалить отзыв полностью? Это действие отменить нельзя.')
    if (!confirmed) return

    setBusyId(review.id)
    // Сначала пробуем удалить фото из Storage (если оно было)
    if (review.image_url) {
      const path = storagePathFromUrl(review.image_url)
      if (path) {
        await supabase.storage.from('review-images').remove([path])
      }
    }
    const { error: err } = await supabase
      .from('reviews')
      .delete()
      .eq('id', review.id)
    setBusyId(null)
    if (err) {
      setError(`Не удалось удалить: ${err.message}`)
      return
    }
    setReviews(prev => prev.filter(r => r.id !== review.id))
    flash('Отзыв удалён')
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* ──────── Top bar ──────── */}
      <header className="border-b border-gold-300/30 bg-cream-100/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="block">
              <VseBankLogo size="sm" />
            </Link>
            <div className="hidden sm:block w-px h-8 bg-gold-300/40" />
            <div className="hidden sm:block">
              <div className="tag text-xs">Администрирование</div>
              <h1 className="font-serif text-lg text-ink-900 leading-tight">Модерация отзывов</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/admin" className="font-sans text-xs text-gold-700 hover:text-gold-900 underline">
              ← к аналитике
            </Link>
            <span className="hidden md:inline font-sans text-xs text-ink-500">{user?.email}</span>
            <button onClick={() => logout()} className="btn-outline text-xs px-4 py-2">
              Выход
            </button>
          </div>
        </div>
      </header>

      {/* ──────── Контент ──────── */}
      <main className="max-w-5xl mx-auto px-6 py-8 space-y-5">

        {/* Заголовок (mobile) */}
        <div className="sm:hidden">
          <div className="tag mb-2">Администрирование</div>
          <h1 className="font-serif text-2xl text-ink-900 mb-2">Модерация отзывов</h1>
          <div className="w-12 h-px bg-gold-500" />
        </div>

        {info && (
          <div className="font-sans text-sm text-gold-700 bg-gold-500/10 border border-gold-400/40 px-4 py-3 rounded-md">
            {info}
          </div>
        )}
        {error && (
          <div className="font-sans text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <div className="text-4xl text-gold-500 animate-spin inline-block">⟳</div>
            <p className="font-sans text-stone-500 mt-3 text-sm">Загружаем отзывы...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="glass-card p-10 rounded-2xl text-center">
            <div className="text-5xl text-gold-400/60 mb-4">✓</div>
            <h2 className="font-serif text-2xl text-ink-900 mb-2">Все отзывы обработаны</h2>
            <div className="w-12 h-px bg-gold-400 mx-auto mb-4" />
            <p className="font-sans text-sm text-ink-500 max-w-md mx-auto">
              Сейчас ничего не ждёт модерации. Когда придёт новый отзыв — на твою почту
              упадёт письмо со ссылкой сюда.
            </p>
          </div>
        ) : (
          <>
            <p className="font-sans text-sm text-ink-500">
              На модерации: <span className="font-serif text-ink-900 text-base">{reviews.length}</span>
            </p>

            {reviews.map(review => (
              <article key={review.id} className="glass-card p-6 md:p-7 rounded-2xl">
                <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                  <div>
                    <div className="font-serif text-xl text-ink-900">{review.author_name || 'Без имени'}</div>
                    <div className="font-sans text-xs text-ink-500 mt-1">{formatDate(review.created_at)}</div>
                  </div>
                  <span className="tag text-xs">На модерации</span>
                </div>

                <div className="w-12 h-px bg-gold-400 mb-4" />

                <p className="font-sans text-sm text-ink-700 leading-relaxed whitespace-pre-wrap">
                  {review.text || <em className="text-ink-500">Текст отзыва пуст</em>}
                </p>

                {review.image_url && (
                  <div className="mt-4">
                    <img
                      src={review.image_url}
                      alt="Фото к отзыву"
                      className="max-w-full md:max-w-md rounded-lg border border-gold-300/30"
                    />
                  </div>
                )}

                <div className="mt-5 pt-4 border-t border-gold-300/20 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleApprove(review)}
                    disabled={busyId === review.id}
                    className="flex-1 btn-gold text-sm px-6 py-2.5 disabled:opacity-50"
                  >
                    {busyId === review.id ? 'Размещаем...' : 'Разместить'}
                  </button>
                  <button
                    onClick={() => handleReject(review)}
                    disabled={busyId === review.id}
                    className="flex-1 btn-outline text-sm px-6 py-2.5 disabled:opacity-50 hover:!text-red-700 hover:!border-red-300"
                  >
                    {busyId === review.id ? 'Удаляем...' : 'Отклонить'}
                  </button>
                </div>
              </article>
            ))}
          </>
        )}
      </main>
    </div>
  )
}
