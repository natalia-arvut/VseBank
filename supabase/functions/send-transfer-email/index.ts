// Edge Function: отправка письма о переводе через Resend.
// Триггерится Database Webhook на INSERT в public.transfers.
//
// Webhook payload (Supabase):
// {
//   "type": "INSERT",
//   "table": "transfers",
//   "schema": "public",
//   "record": { ...row... },
//   "old_record": null
// }

interface Transfer {
  id: string
  user_id: string
  amount: string
  currency: string
  type: string
  timing: string
  status: string
  created_at: string
}

interface Profile {
  email: string
  first_name: string | null
  last_name: string | null
}

function formatAmount(amount: string): string {
  const n = parseInt(String(amount).replace(/\D/g, ''), 10)
  if (isNaN(n)) return amount
  // Разделитель разрядов точками (немецкий формат)
  return n.toLocaleString('de-DE')
}

function buildHtml(transfer: Transfer, profile: Profile): string {
  const amount = formatAmount(transfer.amount)
  const firstName = profile.first_name || 'Банкир'

  return `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Перевод активирован · VseBank</title>
</head>
<body style="margin:0;padding:0;background:#EFE9DD;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#2A2520;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#EFE9DD;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="580" style="max-width:580px;width:100%;background:#FBF7F0;border:1px solid rgba(184,144,88,0.25);border-radius:8px;overflow:hidden;">
          <tr><td style="height:3px;background:linear-gradient(to right,#D4B87A,#B89058,#D4B87A);font-size:0;line-height:0;">&nbsp;</td></tr>

          <tr>
            <td style="padding:32px 40px 8px 40px;" align="left">
              <img src="https://vsebank.space/logo-vsebank.png" alt="VseBank" width="110" style="display:block;border:0;outline:none;text-decoration:none;height:auto;" />
            </td>
          </tr>

          <tr>
            <td style="padding:20px 40px 0 40px;" align="left">
              <span style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#9A6F09;font-weight:500;">Перевод активирован</span>
              <div style="width:32px;height:1px;background:#B89058;margin-top:10px;"></div>
            </td>
          </tr>

          <tr>
            <td style="padding:18px 40px 0 40px;" align="left">
              <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:32px;line-height:1.2;color:#2A2520;">
                ${firstName}, твоё намерение<br>принято Вселенной
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 40px 0 40px;" align="left">
              <p style="margin:0;font-size:16px;line-height:1.7;color:#4A4138;">
                Транзакция отправлена в Квантовое Поле. Сохраняй состояние веры и благодарности — материя подчинится.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 40px 0 40px;">
              <div style="width:48px;height:1px;background:#D4B87A;"></div>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 40px 0 40px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding:8px 0;font-size:13px;color:#8A7F72;width:45%;">Сумма</td>
                  <td style="padding:8px 0;font-size:18px;font-family:Georgia,'Times New Roman',serif;color:#9A6F09;font-weight:500;text-align:right;">
                    ${amount} ${transfer.currency}
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:13px;color:#8A7F72;border-top:1px solid rgba(184,144,88,0.2);">Цель перевода</td>
                  <td style="padding:8px 0;font-size:14px;color:#4A4138;text-align:right;border-top:1px solid rgba(184,144,88,0.2);">
                    ${transfer.type}
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:13px;color:#8A7F72;border-top:1px solid rgba(184,144,88,0.2);">Срок поступления</td>
                  <td style="padding:8px 0;font-size:14px;color:#4A4138;text-align:right;border-top:1px solid rgba(184,144,88,0.2);">
                    ${transfer.timing}
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:13px;color:#8A7F72;border-top:1px solid rgba(184,144,88,0.2);">Код перевода</td>
                  <td style="padding:8px 0;font-size:12px;color:#4A4138;text-align:right;border-top:1px solid rgba(184,144,88,0.2);font-family:'Courier New',monospace;">
                    ${transfer.id.substring(0, 8).toUpperCase()}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 40px 0 40px;">
              <div style="width:48px;height:1px;background:#D4B87A;margin:0 auto;"></div>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 40px 8px 40px;" align="center">
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:16px;line-height:1.6;color:#4A4138;">
                «Празднуй триумф до того,<br>как увидишь его на карте,<br>— и материя подчинится».
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:36px 40px;" align="center">
              <p style="margin:0;font-size:11px;letter-spacing:0.5px;line-height:1.6;color:#A0958A;">
                Не считай транзакцию обычной банковской операцией —<br>
                это твоё намерение, переходящее в материю.
              </p>
            </td>
          </tr>

          <tr><td style="height:3px;background:linear-gradient(to right,#D4B87A,#B89058,#D4B87A);font-size:0;line-height:0;">&nbsp;</td></tr>
        </table>

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="580" style="max-width:580px;width:100%;">
          <tr>
            <td align="center" style="padding:20px 16px;">
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:13px;letter-spacing:1px;color:#8A7F72;">
                VseBank · Вселенский Банк Изобилия · vsebank.space
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
    const SB_URL = Deno.env.get('SUPABASE_URL')
    const SB_SR = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!RESEND_API_KEY || !SB_URL || !SB_SR) {
      return new Response(JSON.stringify({ error: 'missing env' }), { status: 500 })
    }

    const payload = await req.json()
    const transfer: Transfer = payload.record

    if (!transfer?.user_id) {
      return new Response(JSON.stringify({ error: 'no user_id' }), { status: 400 })
    }

    // Получаем профиль пользователя
    const profileRes = await fetch(
      `${SB_URL}/rest/v1/profiles?id=eq.${transfer.user_id}&select=email,first_name,last_name`,
      {
        headers: {
          apikey: SB_SR,
          Authorization: `Bearer ${SB_SR}`,
        },
      }
    )

    if (!profileRes.ok) {
      return new Response(JSON.stringify({ error: 'profile fetch failed', status: profileRes.status }), { status: 500 })
    }

    const profiles = await profileRes.json()
    const profile: Profile | undefined = profiles[0]

    if (!profile?.email) {
      return new Response(JSON.stringify({ error: 'no email' }), { status: 400 })
    }

    const html = buildHtml(transfer, profile)
    const amount = formatAmount(transfer.amount)

    // Отправляем письмо через Resend
    const sendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Вселенский Банк Изобилия <hi@vsebank.space>',
        to: [profile.email],
        subject: `Перевод активирован — ${amount} ${transfer.currency}`,
        html,
      }),
    })

    const sendBody = await sendRes.text()
    return new Response(sendBody, { status: sendRes.status, headers: { 'Content-Type': 'application/json' } })
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 })
  }
})
