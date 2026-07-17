import { useEffect, useState } from 'react'
import { useApp } from '../context/AppContext'
import { supabase } from '../lib/supabase'
import CabinetLayout from '../components/CabinetLayout'
import { useT } from '../i18n'

interface Review {
  id: string
  user_id: string
  author_name: string
  text: string
  image_url: string | null
  approved: boolean
  created_at: string
}

export default function Reviews() {
  const { user } = useApp()
  const [reviews, setReviews] = useState<Review[]>([])
  const [text, setText] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState('')
  const [error, setError] = useState('')
  const t = useT({
    ru: {
      tag: 'Отзывы',
      title: 'Истории наших Сотворцов',
      emptyLine1: 'Пока никто не оставил отзыв.',
      emptyLine2: 'Будь первым — заполни форму справа.',
      pendingHeading: 'Твои отзывы на модерации',
      authorNote: 'От автора: на платформе публикуются только проверенные и доброжелательные отзывы. Мы оставляем за собой право не публиковать сообщения, содержащие негатив, оскорбления или нарушающие дух нашего сообщества.',
      formTag: 'Поделись своей историей',
      formTitle: 'Твой отзыв',
      textLabel: 'Текст отзыва',
      textPlaceholder: 'Расскажи, как Вселенский Банк изменил твою жизнь, какие переводы получил, как изменилось твоё отношение к деньгам...',
      photoLabel: 'Прикрепить фото (опционально)',
      sending: 'Отправляем…',
      submit: 'Опубликовать отзыв',
      errImageSize: 'Изображение не больше 5 МБ',
      errNoText: 'Напишите текст отзыва',
      errNoSession: 'Нет активной сессии',
      errUpload: 'Не удалось загрузить фото: ',
      thanks: 'Спасибо за отзыв! Он появится в общем списке после модерации.',
    },
    en: {
      tag: 'Reviews',
      title: 'Stories of our Co-Creators',
      emptyLine1: 'No one has left a review yet.',
      emptyLine2: 'Be the first — fill in the form on the right.',
      pendingHeading: 'Your reviews under review',
      authorNote: 'From the author: only verified and benevolent reviews are published on the platform. We reserve the right not to publish messages containing negativity, insults, or anything that violates the spirit of our community.',
      formTag: 'Share your story',
      formTitle: 'Your review',
      textLabel: 'Review text',
      textPlaceholder: 'Tell how the Universal Bank changed your life, what transfers you received, how your relationship with money changed...',
      photoLabel: 'Attach a photo (optional)',
      sending: 'Sending…',
      submit: 'Publish review',
      errImageSize: 'Image must be no larger than 5 MB',
      errNoText: 'Please write the review text',
      errNoSession: 'No active session',
      errUpload: 'Could not upload the photo: ',
      thanks: 'Thank you for your review! It will appear in the general list after moderation.',
    },
  })

  const loadReviews = async () => {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)
    if (data) setReviews(data as Review[])
  }

  useEffect(() => { loadReviews() }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (f.size > 5 * 1024 * 1024) {
      setError(t.errImageSize)
      return
    }
    setImageFile(f)
    setImagePreview(URL.createObjectURL(f))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(''); setInfo('')
    if (!text.trim()) { setError(t.errNoText); return }
    if (!user) { setError(t.errNoSession); return }

    setLoading(true)
    let imageUrl: string | null = null

    // Загрузка фото если есть
    if (imageFile) {
      const ext = imageFile.name.split('.').pop() || 'jpg'
      const filename = `${user.email}/${Date.now()}.${ext}`
      const { error: uploadErr } = await supabase.storage
        .from('review-images')
        .upload(filename, imageFile, { upsert: false })
      if (uploadErr) {
        setLoading(false)
        setError(`${t.errUpload}${uploadErr.message}`)
        return
      }
      const { data } = supabase.storage.from('review-images').getPublicUrl(filename)
      imageUrl = data.publicUrl
    }

    const authorName = [user.firstName, user.lastName].filter(Boolean).join(' ')
    const { error: insertErr } = await supabase.from('reviews').insert({
      user_id: (await supabase.auth.getUser()).data.user?.id,
      author_name: authorName || 'Аноним',
      text: text.trim(),
      image_url: imageUrl,
    })

    setLoading(false)
    if (insertErr) { setError(insertErr.message); return }

    setText('')
    setImageFile(null)
    setImagePreview(null)
    setInfo(t.thanks)
    loadReviews()
  }

  const publishedReviews = reviews.filter(r => r.approved)
  const myPendingReviews = reviews.filter(r => !r.approved && r.user_id === (user as any)?.id)

  return (
    <CabinetLayout>
      <div className="p-4 md:p-10">
        {/* Один общий заголовок страницы */}
        <div className="mb-8">
          <div className="tag mb-2">{t.tag}</div>
          <h1 className="font-serif text-2xl md:text-3xl text-ink-900 mb-2">{t.title}</h1>
          <div className="w-12 h-px bg-gold-500" />
        </div>

        {/* Две равные колонки */}
        <div className="xl:grid xl:grid-cols-2 xl:gap-6 xl:items-start">

          {/* Левая колонка — список отзывов */}
          <div>
            {publishedReviews.length === 0 ? (
              <div className="glass-card p-12 text-center rounded-2xl">
                <div className="text-4xl text-gold-400/40 mb-4">∞</div>
                <p className="font-sans text-ink-700 leading-relaxed mb-1">{t.emptyLine1}</p>
                <p className="font-sans text-ink-500 text-sm">{t.emptyLine2}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {publishedReviews.map(r => (
                  <ReviewCard key={r.id} review={r} />
                ))}
              </div>
            )}

            {/* Мои отзывы на модерации */}
            {myPendingReviews.length > 0 && (
              <div className="mt-8">
                <div className="tag text-sm mb-3">{t.pendingHeading}</div>
                <div className="space-y-3">
                  {myPendingReviews.map(r => (
                    <ReviewCard key={r.id} review={r} pending />
                  ))}
                </div>
              </div>
            )}

            {/* Комментарий от автора */}
            <div className="mt-10 pt-6 border-t border-gold-300/30">
              <p className="font-sans text-xs text-ink-500 leading-relaxed italic">
                {t.authorNote}
              </p>
            </div>
          </div>

          {/* Правая колонка — форма нового отзыва. Заголовок tag+h2 внутри плашки. */}
          <div className="mt-8 xl:mt-0">
          <div className="glass-card p-6 md:p-8 rounded-2xl">
            <div className="tag text-sm mb-2">{t.formTag}</div>
            <h2 className="font-serif text-2xl text-ink-900 mb-2">{t.formTitle}</h2>
            <div className="w-12 h-px bg-gold-400 mb-5" />

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-sans text-xs text-ink-500 tracking-widest uppercase block mb-2">
                  {t.textLabel}
                </label>
                <textarea
                  className="input-field min-h-[140px] resize-y"
                  placeholder={t.textPlaceholder}
                  value={text}
                  onChange={e => setText(e.target.value)}
                />
              </div>

              <div>
                <label className="font-sans text-xs text-ink-500 tracking-widest uppercase block mb-2">
                  {t.photoLabel}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="font-sans text-sm text-ink-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gold-300 file:bg-cream-50 file:text-gold-700 file:font-sans file:text-xs file:tracking-widest file:uppercase file:cursor-pointer hover:file:bg-gold-500/10"
                />
                {imagePreview && (
                  <div className="mt-3 relative inline-block">
                    <img src={imagePreview} alt="" className="max-h-32 rounded-lg border border-gold-300/40" />
                    <button
                      type="button"
                      onClick={() => { setImageFile(null); setImagePreview(null) }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-stone-700 text-white rounded-full text-xs"
                    >×</button>
                  </div>
                )}
              </div>

              {error && (
                <div className="font-sans text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3 rounded-md">{error}</div>
              )}
              {info && (
                <div className="font-sans text-sm text-gold-700 bg-gold-500/10 border border-gold-400/40 px-4 py-3 rounded-md">{info}</div>
              )}

              <button
                type="submit"
                disabled={loading || !text.trim()}
                className="btn-gold text-sm px-6 py-2.5 disabled:opacity-50 w-full"
              >
                {loading ? t.sending : t.submit}
              </button>
            </form>
          </div>
          </div>
        </div>
      </div>
    </CabinetLayout>
  )
}

function ReviewCard({ review, pending }: { review: Review; pending?: boolean }) {
  const t = useT({
    ru: { pending: 'На модерации' },
    en: { pending: 'Under review' },
  })
  return (
    <div className={`glass-card p-5 rounded-2xl ${pending ? 'opacity-70' : ''}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="font-serif text-lg text-ink-900">{review.author_name}</div>
        <div className="font-sans text-xs text-ink-500">
          {new Date(review.created_at).toLocaleDateString('ru', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </div>
      {pending && (
        <div className="text-xs font-sans text-gold-700 mb-2 italic">{t.pending}</div>
      )}
      <p className="font-sans text-ink-700 leading-relaxed whitespace-pre-wrap">{review.text}</p>
      {review.image_url && (
        <img src={review.image_url} alt="" className="mt-4 max-w-full rounded-lg border border-gold-300/30" />
      )}
    </div>
  )
}
