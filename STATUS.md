# VseBank · Текущее состояние проекта

> **Это handoff-документ для новой сессии Claude.**
> Прочитай этот файл целиком + `/Users/natalia/.claude/CLAUDE.md` и `/Users/natalia/Desktop/Вселенский банк изобилия/CLAUDE.md`. Дальше можно работать.

---

## 1. Кто такая Натали и стиль общения

- Натали — сооснователь проекта, графический дизайнер, маркетолог, психолог. **Не разработчик.**
- Живёт в Швейцарии, говорит по-русски. **Только по-русски** в чате и в коде (комментарии тоже).
- **Дизайн — приоритет.** Любая правка с визуальной составляющей — глаз дизайнера. Натали скрупулёзно проверяет пиксели, выравнивания, отступы. Будет ругаться, если что-то не точно по линии.
- **Сначала план — потом действие** только для больших задач. Для мелких правок — делать сразу.
- **Не оправдываться, не пересказывать длинно.** Короткие ответы по делу. Никаких «по плану я сделаю A, потом B, потом C».
- **Не предлагать варианты которых не просили.** Спросила про X — отвечай про X, не «а ещё можно Y и Z».
- **Финансы стеснённые** — выбирать бесплатные/дешёвые сервисы.
- Натали путается в технических деталях (GitHub vs сервер, env vs secrets, Cmd+R vs Cmd+Shift+R). Объяснять простыми словами без жаргона.

---

## 2. Что за проект

**VseBank** — духовный банковский симулятор. Инструмент для практики изобилия на стыке метафизики и нейропластичности. Пользователь регистрируется, открывает виртуальный счёт, выбирает сумму, цель, реквизиты — и «получает перевод от Вселенной». Это осознанная симуляция, цель которой — перепрограммировать убеждения о деньгах через эмоциональное проживание.

**Целевая аудитория:** русскоязычные люди интересующиеся темой изобилия, духовности, нейропластичности.

**Концепция:** обращение на «ты», тёплый банковский интерьер, золото на cream-фоне, шрифты Playfair Display + Inter.

---

## 3. Где живёт проект

| Где | Что | Ссылка |
|---|---|---|
| **Продакшн** | основной сайт | https://vsebank.space |
| **GitHub Pages** | резервный/тестовый | https://natalia-arvut.github.io/VseBank/ |
| **Код** | GitHub | https://github.com/natalia-arvut/VseBank |
| **Локально** | репозиторий | `/Users/natalia/Desktop/Вселенский банк изобилия/app/` |
| **БД** | Supabase | https://supabase.com/dashboard/project/txghgltldfsmbdcykykz |
| **Почта** | Resend | https://resend.com |
| **DNS / CDN** | Cloudflare | управляет доменом vsebank.space |
| **Сервер** | VPS у сооснователя | nginx + Let's Encrypt + Cloudflare proxy |

---

## 4. Стек

- **React 19 + TypeScript + Vite**
- **Tailwind CSS 3**
- **React Router 7** (HashRouter — `/#/login`, `/#/cabinet` и т.д.)
- **@supabase/supabase-js** — для всей работы с БД и Auth
- **Supabase Auth** — авторизация (регистрация, вход, сброс пароля)
- **Supabase Edge Functions** — для писем о переводах
- **Supabase Storage** — для фото в отзывах

EmailJS **удалён** — не используется. Все письма идут через Supabase Auth + Resend SMTP.

---

## 5. Структура папок

```
app/
├── public/
│   ├── logo-vsebank.png      # новый золотой логотип
│   ├── favicon-*.png         # фавиконы из VB-монограммы
│   ├── favicon.ico           # multi-size
│   ├── hero-cover.png        # обложка лендинга
│   ├── login-image.png       # картинка-арка
│   ├── philosophy-image.png  # картинка в блоке Философия на лендинге
│   └── card-*.jpg            # картинки в блоках лендинга
├── src/
│   ├── components/
│   │   ├── CabinetLayout.tsx # каркас личного кабинета (sidebar, bottom-nav, top-bar)
│   │   ├── VseBankLogo.tsx   # переиспользуемый компонент логотипа (xs/sm/md/lg/xl)
│   │   └── Guilloche.tsx     # SVG-узор золотых нитей (dark/light)
│   ├── context/
│   │   └── AppContext.tsx    # вся работа с сессией, профилем, переводами
│   ├── lib/
│   │   ├── supabase.ts       # клиент Supabase
│   │   └── requisites.ts     # CRUD реквизитов в localStorage браузера (НЕ на сервере)
│   ├── pages/
│   │   ├── Landing.tsx       # лендинг
│   │   ├── Login.tsx         # вход
│   │   ├── Register.tsx      # регистрация
│   │   ├── AuthCallback.tsx  # обработка ссылки из письма подтверждения
│   │   ├── ResetPassword.tsx # установка нового пароля по ссылке
│   │   ├── Cabinet.tsx       # личный кабинет — главная
│   │   ├── Transfer.tsx      # форма перевода + Свод правил
│   │   ├── Requisites.tsx    # реквизиты (форма + сохранённые)
│   │   ├── History.tsx       # история переводов
│   │   ├── Reviews.tsx       # отзывы
│   │   ├── Paths.tsx         # «Донат VseBank» (бывш. Благотворительность)
│   │   ├── Signature.tsx     # подпись
│   │   └── Maintenance.tsx   # заглушка для maintenance-режима
│   ├── App.tsx               # роутер + переключатель MAINTENANCE
│   ├── main.tsx, index.css
├── supabase/
│   ├── migrations/           # SQL миграции (001–004)
│   ├── functions/
│   │   └── send-transfer-email/  # Edge Function для писем о переводах
│   └── email-templates/      # HTML шаблоны для Supabase Auth
├── .github/workflows/        # автодеплой (workflow добавлен сооснователем)
├── docs/deploy-workflow.yml  # шаблон workflow (исходник)
├── package.json
└── vite.config.ts            # base path из VITE_BASE env
```

---

## 6. Переменные окружения (`.env`)

```bash
# Supabase — для фронта (значения посмотреть в локальном .env)
VITE_SUPABASE_URL=https://txghgltldfsmbdcykykz.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<значение в .env>

# Supabase Personal Access Token — для Management API
# НЕ имеет префикса VITE_ → не попадает в bundle фронта
SUPABASE_PAT=<значение в .env, начинается с sbp_>

# Resend API ключ — для писем (Edge Function и SMTP в Supabase Auth)
RESEND_API_KEY=<значение в .env, начинается с re_>

# Vite base path — на vsebank.space '/', на GitHub Pages по умолчанию '/VseBank/'
# VITE_BASE=/
```

**Реальные значения** — в локальном файле `app/.env` (он в `.gitignore`, не коммитится). Все ключи также продублированы в GitHub Secrets для автодеплоя.

**`.env` в `.gitignore`** — никогда не коммитим в git. На сервере у сооснователя свой `.env` с теми же значениями.

В GitHub репо настроены **Secrets** для автодеплоя (Settings → Secrets and variables → Actions):
- `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`
- `DEPLOY_SSH_KEY`, `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_PATH`
- `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ZONE_ID` (для Purge Cache)

---

## 7. База данных (Supabase)

Project ID: **`txghgltldfsmbdcykykz`**

### Таблицы

| Таблица | Колонки (ключевое) | RLS |
|---|---|---|
| `auth.users` | встроенная, email + encrypted_password | управляется Auth |
| `public.profiles` | id (UUID, FK auth.users), first_name, last_name, email, country, account_type, account_number, registered_at | SELECT/INSERT/UPDATE — own |
| `public.transfers` | id (UUID), user_id (FK), amount, currency, type, timing, status, created_at | SELECT/INSERT — own |
| `public.reviews` | id, user_id, author_name, text, image_url, approved (boolean), created_at | SELECT: approved=true OR own; INSERT — own |

**Реквизиты (IBAN, BIC, имя получателя, банк) НЕ хранятся на сервере.** Они лежат только в браузере пользователя (`localStorage`, ключ `vsebank_requisites_<user_id>`). Это сделано чтобы на сервере не было PII банковских данных — снижает GDPR-риски и юридическую нагрузку. См. `src/lib/requisites.ts`.

### Триггеры

- `on_auth_user_created` — автоматически создаёт `public.profiles` при `INSERT INTO auth.users`. Данные берёт из `raw_user_meta_data` (передаём из фронта через `supabase.auth.signUp({ options: { data: {...} } })`).
- `on_transfer_inserted_trigger` — при `INSERT INTO public.transfers` вызывает Edge Function `send-transfer-email` через `pg_net.http_post`. Отправляет письмо пользователю.

### Storage

- Bucket `review-images` (public, 5 МБ лимит, image/jpeg|png|webp|gif). Для фото в отзывах.

### Миграции

Лежат в `supabase/migrations/`:
1. `001_initial.sql` — profiles, transfers, RLS, trigger handle_new_user
2. `002_reviews.sql` — reviews + storage bucket
3. `004_transfer_email_trigger.sql` — pg_net + триггер вызова Edge Function

> Миграция `003_requisites.sql` была удалена — таблица `requisites` больше не используется (реквизиты переехали в localStorage браузера).

Применяются через **Supabase Management API** (Personal Access Token):
```bash
curl -X POST https://api.supabase.com/v1/projects/txghgltldfsmbdcykykz/database/query \
  -H "Authorization: Bearer $SUPABASE_PAT" \
  -H "Content-Type: application/json" \
  -d "$(jq -Rs '{query: .}' < migration.sql)"
```

---

## 8. Email-система

### 8.1 Supabase Auth письма (регистрация, сброс пароля)

- **SMTP:** Resend (`smtp.resend.com:465`, user `resend`, pass = Resend API key)
- **Отправитель:** `hi@vsebank.space`, имя «Вселенский Банк Изобилия»
- **mailer_autoconfirm:** `false` — регистрация требует подтверждения email
- **Шаблоны:** русские, с дизайном (PNG-логотип, золотые акценты), хранятся в Supabase Auth config:
  - `mailer_subjects_confirmation` + `mailer_templates_confirmation_content`
  - `mailer_subjects_recovery` + `mailer_templates_recovery_content`
- **Исходники шаблонов:** `supabase/email-templates/confirmation.html` и `recovery.html`

Применить новые шаблоны:
```bash
curl -X PATCH https://api.supabase.com/v1/projects/txghgltldfsmbdcykykz/config/auth \
  -H "Authorization: Bearer $SUPABASE_PAT" \
  -H "Content-Type: application/json" \
  -d '{"mailer_templates_confirmation_content": "<html>..."}'
```

### 8.2 Письма о переводах (Edge Function)

- **Function:** `send-transfer-email` (Deno, в `supabase/functions/send-transfer-email/index.ts`)
- **verify_jwt: false** — вызывается триггером БД без JWT
- **Получает payload от триггера → достаёт профиль → формирует HTML → POST на Resend API**
- **Секреты:** `RESEND_API_KEY` установлен в Edge Function Secrets через Management API

Передеплой функции:
```bash
BODY=$(cat supabase/functions/send-transfer-email/index.ts)
JSON=$(jq -n --arg b "$BODY" '{verify_jwt: false, body: $b}')
curl -X PATCH https://api.supabase.com/v1/projects/txghgltldfsmbdcykykz/functions/send-transfer-email \
  -H "Authorization: Bearer $SUPABASE_PAT" \
  -H "Content-Type: application/json" \
  -d "$JSON"
```

### 8.3 Resend

- **Аккаунт Натали:** `vsebank@gmail.com` (она специально завела отдельный Google аккаунт под проект)
- **Домен:** `vsebank.space` (верифицирован через DNS в Cloudflare — SPF, DKIM, DMARC)
- **DMARC сейчас `p=none`** — через 2 недели стабильной работы можно усилить до `p=quarantine`

---

## 9. Деплой

### Автодеплой через GitHub Actions

Подключён сооснователем. Workflow в `.github/workflows/deploy-vsebank-space.yml` (шаблон в `docs/deploy-workflow.yml`).

**При каждом push в `main`:**
1. GitHub Actions делает `npm ci` + `npm run build` с переменными из Secrets
2. rsync через SSH копирует `dist/` на VPS в `$DEPLOY_PATH`
3. Curl на Cloudflare API → Purge Cache

**Время:** ~2 минуты от push до обновления сайта.

### GitHub Pages

Отдельная ветка `gh-pages`. Деплоится **вручную** через локальный git push:
```bash
npm run build  # base /VseBank/ по умолчанию
rm -rf /tmp/vsebank-deploy && cp -r dist /tmp/vsebank-deploy
cd /tmp/vsebank-deploy && git init -q && git checkout -q -b gh-pages
git add -A && git -c user.email=deploy@local -c user.name=deploy commit -q -m "deploy"
git remote add origin https://github.com/natalia-arvut/VseBank.git
git push -q -f origin gh-pages
gh api -X POST repos/natalia-arvut/VseBank/pages/builds
```

Используется как **тестовый/резервный** сайт. Натали обычно проверяет правки **сразу на vsebank.space** через автодеплой.

### Toolkit окружения

- Node.js 20 через nvm
- `gh` CLI (`~/bin/gh`) — для GitHub API (триггер Pages build, PR и т.д.)
- `python3` с PIL — для обработки изображений (favicon, кропы)
- `jq` — для JSON
- **НЕТ:** ImageMagick (использовать PIL)

---

## 10. Текущее состояние — MAINTENANCE MODE

**Сейчас сайт vsebank.space показывает заглушку** (`Maintenance.tsx`). Натали готовит юридические документы (политика, права).

**Включается** через хардкод в `src/App.tsx`:
```typescript
const MAINTENANCE = true  // ← поменять на false для возвращения сайта
```

**Вернуть сайт:**
1. Открыть `src/App.tsx`
2. Заменить `const MAINTENANCE = true` на `const MAINTENANCE = false`
3. `git commit -am "Disable maintenance mode" && git push origin main`
4. Через 2 минуты автодеплой обновит vsebank.space — сайт вернётся

---

## 11. Дизайн-система

### Цвета (Tailwind config)
- **Cream:** `#FBF7F0` (50), `#F5EFE6` (100), `#EFE7D9` (200), `#E8DCC4` (300)
- **Gold:** `#D4B87A` (300), `#C9A56B` (400), `#B89058` (500), `#9A7641` (600), `#7D5E32` (700)
- **Ink:** `#2A2520` (900), `#4A4138` (700), `#7A6F62` (500)

### Шрифты
- `font-serif` → Playfair Display (заголовки, цитаты, выделения курсивом)
- `font-sans` → Inter (тело, кнопки, лейблы, теги)
- `font-variant-numeric: lining-nums` в body — для одинаковой высоты цифр

### Классы (в `index.css`)
- `.btn-gold` / `.btn-outline` / `.btn-cream` — кнопки с border-radius 15px
- `.glass-card` — плашка с полупрозрачным белым фоном и backdrop-blur
- `.tag` — золотой капс-лейбл, `text-lg` (на mobile часто переопределяем `text-xs/text-sm`)
- `.input-field` — стандартное поле ввода
- `.body-text` — основной текст блоков лендинга
- `.balance-shimmer` — анимация мерцания для баланса

### Унифицированный layout кабинета

Все вкладки (`Cabinet`, `Transfer`, `Requisites`, `History`, `Reviews`, `Paths`) используют **одну сетку**:

```jsx
<CabinetLayout>
  <div className="p-4 md:p-10">
    {/* H1 + tag + золотая линия — один общий заголовок страницы */}
    <div className="mb-8">
      <div className="tag mb-2">...</div>
      <h1 className="font-serif text-2xl md:text-3xl text-ink-900 mb-2">...</h1>
      <div className="w-12 h-px bg-gold-500" />
    </div>

    {/* Две равные колонки на xl+ */}
    <div className="xl:grid xl:grid-cols-2 xl:gap-6 xl:items-start">
      <div>{/* левая колонка */}</div>
      <div>{/* правая колонка */}</div>
    </div>
  </div>
</CabinetLayout>
```

**Натали будет проверять что центральная разделительная линия совпадает пиксель-в-пиксель на всех вкладках.**

Главная (Cabinet) использует ту же сетку, но на фоне `hero-cover.png` и с прозрачной плашкой в левой колонке.

Paths имеет `rightVisual="arch"` — на CabinetLayout рендерится fixed картинка-арка справа от центра (`left: calc(50vw + 156px)`).

### Мобильная версия
- `p-4` снаружи (вместо `p-6`/`p-10`)
- `text-2xl` для H1 (вместо `text-3xl`)
- `text-sm` для основного текста (вместо `text-base`)
- Bottom-nav с 6 пунктами компактно (иконка + название мелким `text-[9px]`, обрезка с `…`)
- Top-bar с логотипом `xs` (h-8) и кнопкой «Выход»
- `pt-12 pb-16` для main на mobile (под top-bar и bottom-nav)

---

## 12. Что сделано (последовательно по сессиям)

1. ✅ Лендинг (6 блоков): hero, «О чём симулятор», «Как это работает», «Правила Пользования» + модалка с полным соглашением, «Философия», финальный CTA, футер
2. ✅ Регистрация + вход + сброс пароля через Supabase Auth
3. ✅ Личный кабинет с 6 вкладками + унифицированная сетка
4. ✅ Реквизиты только в localStorage браузера (НЕ на сервере) — таблица `requisites` в БД удалена, миграция 003 убрана из репо. Сделано для снятия юридической ответственности за хранение банковских PII.
5. ✅ Отзывы с загрузкой фото в Storage + модерация через поле `approved`
6. ✅ Все тексты переведены с «вы» на «ты»
7. ✅ Логотип PNG (новый золотой VB) везде + favicon из VB-монограммы
8. ✅ Письма Auth (confirmation + recovery) через Resend SMTP, шаблоны на русском
9. ✅ Письмо о переводе через Edge Function + pg_net trigger
10. ✅ Mobile-версия для всех вкладок кабинета
11. ✅ Donat VseBank (бывш. Благотворительность) с модалкой о квантовой экономике
12. ✅ Автодеплой через GitHub Actions
13. ✅ Maintenance mode (сейчас включён)

---

## 13. Что в планах / недоделано

- ⏸ **Юридические документы** (политика конфиденциальности, пользовательское соглашение, оферта) — Натали готовит. **Из-за этого сейчас maintenance mode.**
- ⏸ Письмо «Перевод исполнен» (когда статус меняется с pending на completed) — нужна логика смены статуса
- ⏸ Письмо «Спасибо за отзыв» (когда модерация одобрила)
- ⏸ Welcome письмо через 1–2 часа после регистрации
- ⏸ DMARC `p=quarantine` (через 2 недели стабильной работы Resend)
- ⏸ BIMI логотип в кружочке отправителя в Gmail — требует VMC сертификат (~$1500/год). Не сейчас.
- ⏸ Кнопки «Поддержать фонд» и «Активировать Циркуляцию» на Donat — пока не функциональные (нет платёжного интегрейшна)

---

## 14. Быстрые команды

### Локально запустить превью
```bash
cd "/Users/natalia/Desktop/Вселенский банк изобилия/app"
npm run dev  # http://localhost:5173/VseBank/
```

### Деплой
```bash
git add -A && git commit -m "..." && git push origin main
# через 2 мин vsebank.space обновится автоматически
```

### Включить/выключить maintenance
В `src/App.tsx` поменять `const MAINTENANCE = true/false` → commit → push.

### Supabase Dashboard
https://supabase.com/dashboard/project/txghgltldfsmbdcykykz

### Логи Edge Function
В Supabase Dashboard → Edge Functions → send-transfer-email → Logs

### Логи Resend
https://resend.com/emails

### Проверить какой бандл на проде
```bash
curl -s https://natalia-arvut.github.io/VseBank/ | grep -oE 'index-[A-Za-z0-9_-]+\.js'
```

---

## 15. Известные нюансы

- **HashRouter** — все URL вида `/#/login`, `/#/cabinet`. Это нужно для GitHub Pages (он не умеет SPA-rewriting). На vsebank.space можно было бы перейти на BrowserRouter с nginx try_files, но пока работает HashRouter — не трогать.
- **Vite base path** — берётся из `VITE_BASE` env. На vsebank.space сборка идёт с `VITE_BASE=/`. На GitHub Pages — по умолчанию `/VseBank/`.
- **Кэш Cloudflare** — после деплоя автоматически чистится (см. workflow). Если Натали говорит «не вижу изменений» — попросить hard refresh `Cmd+Shift+R`.
- **`mailer_autoconfirm = false`** — регистрация требует подтверждения email. Если письма не доходят (новый домен + спам-фильтры) — на странице успеха показывается подсказка «проверь спам, нажми Не спам».
- **Battery saver и старые сессии** — в AppContext стоит защита от зависания getSession() — Promise.race с таймаутом 2 сек. Если сессия битая, UI не зависает.
- **Edge Function `verify_jwt: false`** — потенциально кто-то может позвать function URL извне и спровоцировать отправку письма на чужой email из БД. Не финансовая угроза, только спам. Если станет проблемой — добавить проверку источника по IP или secret token.

---

## 16. Контакты

- **Натали:** живёт в Швейцарии, время UTC+1/+2
- **vsebank@gmail.com** — аккаунт Resend (создан под проект)
- **vsebank.space@gmail.com** — публичный контактный адрес на сайте
- **hi@vsebank.space** — отправитель писем (через Resend SMTP)
- **Сооснователь** — занимается сервером, у него SSH-доступ. Натали с ним в личной переписке.

---

**Последний коммит см. `git log -1` в `app/`.**

Удачной работы. Слушай Натали внимательно, делай по делу, не растекайся в объяснениях.
