// Edge Function: уведомление админам о новом отзыве на модерации.
// Триггерится Database Webhook на INSERT в public.reviews.
//
// Webhook payload (Supabase):
// {
//   "type": "INSERT",
//   "table": "reviews",
//   "schema": "public",
//   "record": { ...row... },
//   "old_record": null
// }

interface Review {
  id: string
  user_id: string
  author_name: string
  text: string
  image_url: string | null
  approved: boolean
  created_at: string
}

// Куда шлём уведомление о новом отзыве.
// vsebank.space@gmail.com — общий ящик проекта
// nk@arvut.ch — Натали лично
// gv1970@gmail.com — партнёр (тоже админ)
const ADMIN_RECIPIENTS = [
  'vsebank.space@gmail.com',
  'nk@arvut.ch',
  'gv1970@gmail.com',
]

const MODERATION_URL = 'https://vsebank.space/#/admin/reviews'

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

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildHtml(review: Review): string {
  const author = escapeHtml(review.author_name || 'Без имени')
  const text = escapeHtml(review.text || '').replace(/\n/g, '<br>')
  const date = formatDate(review.created_at)
  const imageBlock = review.image_url
    ? `<tr>
         <td style="padding:20px 40px 0 40px;" align="left">
           <img src="${escapeHtml(review.image_url)}" alt="Фото отзыва"
                style="max-width:100%;height:auto;border-radius:8px;border:1px solid rgba(184,144,88,0.25);display:block;" />
         </td>
       </tr>`
    : ''

  return `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Новый отзыв на модерации · VseBank</title>
</head>
<body style="margin:0;padding:0;background:#EFE9DD;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#2A2520;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#EFE9DD;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;width:100%;background:#FBF7F0;border:1px solid rgba(184,144,88,0.25);border-radius:8px;overflow:hidden;">
          <tr><td style="height:3px;background:linear-gradient(to right,#D4B87A,#B89058,#D4B87A);font-size:0;line-height:0;">&nbsp;</td></tr>

          <tr>
            <td style="padding:28px 40px 8px 40px;" align="left">
              <img src="https://vsebank.space/logo-vsebank.png" alt="VseBank" width="100" style="display:block;border:0;outline:none;text-decoration:none;height:auto;" />
            </td>
          </tr>

          <tr>
            <td style="padding:20px 40px 0 40px;" align="left">
              <span style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#9A6F09;font-weight:500;">Новый отзыв на модерации</span>
              <div style="width:32px;height:1px;background:#B89058;margin-top:10px;"></div>
            </td>
          </tr>

          <tr>
            <td style="padding:14px 40px 0 40px;" align="left">
              <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:26px;line-height:1.3;color:#2A2520;">
                Поступил новый отзыв
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding:18px 40px 0 40px;" align="left">
              <p style="margin:0;font-size:14px;line-height:1.6;color:#7A6F62;">
                Автор: <strong style="color:#2A2520;">${author}</strong><br>
                Дата: ${date}
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:18px 40px 0 40px;">
              <div style="width:48px;height:1px;background:#D4B87A;"></div>
            </td>
          </tr>

          <tr>
            <td style="padding:18px 40px 0 40px;" align="left">
              <div style="background:#FBF7F0;border:1px solid rgba(184,144,88,0.25);border-radius:8px;padding:18px 20px;font-size:15px;line-height:1.7;color:#4A4138;">
                ${text || '<em style="color:#A0958A;">Текст отзыва пуст</em>'}
              </div>
            </td>
          </tr>

          ${imageBlock}

          <tr>
            <td style="padding:28px 40px 8px 40px;" align="center">
              <a href="${MODERATION_URL}"
                 style="display:inline-block;background:#B89058;color:#FBF7F0;text-decoration:none;padding:14px 28px;border-radius:6px;font-size:14px;letter-spacing:0.5px;font-weight:500;">
                Открыть модерацию
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding:14px 40px 32px 40px;" align="center">
              <p style="margin:0;font-size:11px;line-height:1.5;color:#A0958A;">
                Отзыв виден только тебе — до одобрения он не появится на сайте.
              </p>
            </td>
          </tr>

          <tr><td style="height:3px;background:linear-gradient(to right,#D4B87A,#B89058,#D4B87A);font-size:0;line-height:0;">&nbsp;</td></tr>
        </table>

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;width:100%;">
          <tr>
            <td align="center" style="padding:18px 16px;">
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:12px;letter-spacing:1px;color:#8A7F72;">
                VseBank · Администрирование · vsebank.space
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

Deno.serve(async (req: Request) => {
  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: 'missing RESEND_API_KEY' }), { status: 500 })
    }

    const payload = await req.json()
    const review: Review = payload.record

    if (!review?.id) {
      return new Response(JSON.stringify({ error: 'no review record' }), { status: 400 })
    }

    const html = buildHtml(review)
    const subject = `Новый отзыв на VseBank — на модерации`

    const sendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Вселенский Банк Изобилия <hi@vsebank.space>',
        to: ADMIN_RECIPIENTS,
        subject,
        html,
      }),
    })

    const sendBody = await sendRes.text()
    return new Response(sendBody, {
      status: sendRes.status,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 })
  }
})
