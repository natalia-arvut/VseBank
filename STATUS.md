# VseBank · Статус проекта

> Передача контекста для нового чата Claude Code.
> Прочитай этот файл и `CLAUDE.md` в корне `app/` — поймёшь всё.

---

## 🌐 Где проект

- **GitHub:** https://github.com/natalia-arvut/VseBank
- **Live:** https://natalia-arvut.github.io/VseBank/
- **Корень кода:** `/Users/natalia/Desktop/Вселенский банк изобилия/app/`
- **Source-документы:** `/Users/natalia/Desktop/Вселенский банк изобилия/` (лендинг.txt, платформа.txt, обложка.png, и др.)

---

## 🛠 Стек

- React 19 + TypeScript + Vite
- Tailwind CSS 3
- React Router (**HashRouter** — критично для GitHub Pages)
- Vite base path: **`/VseBank/`** (см. `vite.config.ts`)
- EmailJS (`@emailjs/browser`) — для отправки писем (пока не настроен)
- localStorage — для пользователей и переводов (пока не настоящая БД)

---

## 📦 Структура

```
app/
├── public/
│   ├── hero-cover.png          # обложка лендинга (изображение из Perplexity)
│   ├── login-image.png         # картинка для страницы входа (золотая арка)
│   ├── card-awareness.jpg      # иллюстрация "Осознание Своего Права"
│   ├── card-mind.jpg           # иллюстрация "Перепрошивка Разума"
│   ├── philosophy-image.png    # иллюстрация блока "Философия"
│   ├── favicon.svg             # золотая бесконечность
│   └── ...                     # вспомогательные изображения
├── src/
│   ├── components/
│   │   ├── VseBankLogo.tsx     # единый логотип (∞ + VseBank), кликабельный → /
│   │   ├── CabinetLayout.tsx   # лейаут кабинета с сайдбаром
│   │   └── Logo.tsx            # старый, не используется (можно удалить)
│   ├── context/
│   │   └── AppContext.tsx      # users, переводы, sessionEmail в localStorage
│   ├── pages/
│   │   ├── Landing.tsx         # главная страница (большая!)
│   │   ├── Login.tsx           # вход (split: форма + картинка справа)
│   │   ├── Register.tsx        # регистрация (split: дарк панель + форма)
│   │   ├── Paths.tsx           # благотворительность (после перевода)
│   │   ├── Cabinet.tsx         # личный кабинет
│   │   ├── Cards.tsx, Requisites.tsx, Transfer.tsx,
│   │   ├── Signature.tsx, Philosophy.tsx, History.tsx
│   │   └── ...
│   ├── App.tsx                 # роутер с HashRouter
│   ├── main.tsx, index.css
├── docs/                       # копии исходных документов
├── package.json                # скрипт `npm run deploy` → gh-pages
└── vite.config.ts              # base: '/VseBank/'
```

---

## 🚀 Деплой

```bash
npm run deploy
```

Это `npm run build && gh-pages -d dist -b gh-pages`. Пушит билд в ветку `gh-pages`. После — GitHub Pages автоматически собирает (или триггерим вручную: `~/bin/gh api -X POST repos/natalia-arvut/VseBank/pages/builds`).

**GitHub CLI** установлен в `~/bin/gh`. Залогинена как `natalia-arvut`.

---

## ✅ Что готово

1. **Лендинг** (6 блоков): hero с картинкой, "О чём симулятор" (5 этапов), "Как это работает" (2 карточки с иллюстрациями), "Правила Пользования", "Философия", финальный CTA, футер
2. **Регистрация** — 2 типа (Личный/Компания), валидация, поля динамически меняются, модальное окно правил
3. **Вход** — с паролем, восстановление через email-модалку
4. **База пользователей** в localStorage (ключ `vbi_users`), массив. Сессия в `vbi_session_email`
5. **Личный кабинет** — переписан по `платформа.txt` (приветствие, баланс, Администрация выписка №07, 3 уровня активации, типы поступлений, история)
6. **Все страницы кабинета**: Карты (5 шт), Реквизиты (IBAN/SWIFT/BIC), Перевод (сумма + срок), Подпись, История, Философия, Благотворительность (доступна после перевода через меню)
7. **Mobile-first адаптив** — полностью переработан под все экраны
8. **Деплой на GitHub Pages** работает

---

## ⏳ Что ждёт от пользователя

### EmailJS (бесплатно, 200 писем/мес)
Натали должна:
1. Зайти на https://dashboard.emailjs.com/admin (уже зарегистрирована)
2. Add Email Service → Gmail/другой
3. Create 3 Email Templates:
   - **welcome** (вкл `{{to_name}}`, `{{to_email}}`, `{{account_number}}`)
   - **transfer** (вкл `{{to_email}}`, `{{amount}}`, `{{timing}}`)
   - **reset** (вкл `{{to_email}}`, `{{new_password}}`)
4. Account → API Keys → скопировать Public Key
5. **Прислать 5 значений:** Service ID, Public Key, Template ID welcome, Template ID transfer, Template ID reset

Я вношу в `.env`:
```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
VITE_EMAILJS_TEMPLATE_REGISTER=...
VITE_EMAILJS_TEMPLATE_TRANSFER=...
VITE_EMAILJS_TEMPLATE_RESET=...
```

Код уже готов в `Register.tsx`, `Transfer.tsx`, `Login.tsx` — просто подхватит ключи.

### Supabase (настоящая БД)
Натали должна:
1. Зайти на https://supabase.com/dashboard/account/tokens
2. Generate new token → название «VseBank»
3. Прислать токен (`sbp_...`)

После — я через CLI (`~/bin/supabase`) создам проект, таблицы users/transfers, подключу Auth, заменю localStorage.

---

## 🐛 Известные нюансы

- **HashRouter** — все URL вида `/#/login`, `/#/cabinet` и т.д. Это потому что GitHub Pages не умеет SPA-рутинг.
- **Vite base `/VseBank/`** — все относительные пути в коде надо писать через `${import.meta.env.BASE_URL}filename` чтобы работали и локально и на Pages.
- **localStorage** — данные пользователей живут только в одном браузере. Между устройствами не синхронизируются (пока нет Supabase).
- **Старые тестовые пользователи** — для них добавлена миграция в `AppContext.tsx`. Если пользователь имеет пустой пароль (старая версия) — signIn принимает любой пароль и обновляет.

---

## 🎨 Дизайн-система

### Цвета
- Cream: `#FBF7F0` (light), `#F5EFE6` (base), `#FDFDFD` (white-cream)
- Gold: `#D4B87A` (light), `#B89058` (base), `#9A6F09` (dark/accent)
- Ink (тексты): `#2A2520` (900), `#4A4138` (700)

### Шрифты
- **Playfair Display** (font-serif) — для заголовков и акцентов
- **Inter** (font-sans, дефолтный) — для тела, кнопок, мелких текстов

### Сетка
- Класс `.site-container` — единый контейнер с padding 5% (clamp 24px-96px), max-width 1920px
- Используется во всех секциях для единого выравнивания

### Кнопки (CSS в `index.css`)
- `.btn-gold` — золотая, белый текст
- `.btn-outline` — контурная золотая
- `.btn-cream` — светло-бежевая (для нав)
- Все с `border-radius: 15px`

### Типография
- `.section-title` — заголовок секции (text-4xl md:text-5xl, font-serif)
- `.card-title` — заголовок карточки (text-3xl md:text-4xl)
- `.body-text` — обычный текст (text-lg, font-sans)
- `.tag` — мелкий капс (text-lg, uppercase, gold, tracking)

### Фоновый ритм (чередование)
- Hero: cream (#F5EFE6)
- Блок 2 (О чём симулятор): #FDFDFD
- Блок 3 (Как работает): #FBF7F0
- Блок 4 (Правила): #FDFDFD
- Блок 5 (Философия): #FBF7F0
- Блок 6 (CTA): #FDFDFD

---

## 📋 Установленные плагины Claude (на этом Mac)

- **anthropic-skills/design** — design-critique, design-system, accessibility-review, ux-copy, design-handoff, user-research, research-synthesis
- **anthropic-skills/figma** — figma-use-slides, figma-generate-design, и др.
- canvas-design, brand-guidelines, xlsx, pdf, docx, pptx, verify, code-review, review, security-review

В новом чате доступны автоматически.

---

## 🧰 Что есть в окружении

- Node.js 20 (через nvm, путь: `~/.nvm/versions/node/v20.20.2/bin/node`)
- Git с настройкой `natalia-arvut`
- gh CLI: `~/bin/gh` (логин через keyring)
- supabase CLI: `~/bin/supabase` (требует токен)
- Python 3 с PIL, OpenCV, rembg, numpy (для обработки изображений)
- ImageMagick — НЕТ (если надо — `brew install imagemagick`)

---

## 💬 Стиль работы с Натали

- Только по-русски
- Сначала план — потом действие (но для мелких правок сразу делать)
- Делать максимум самому, не перекладывать
- Не оправдываться, не пересказывать длинно
- Если задача дизайнерская — особое внимание визуалу
- Если ошибка/баг — сразу чинить, не объяснять долго
- Натали — со-основательница Arvut LiveBook, дизайнер, маркетолог, психолог. Финансы стеснённые, экономно использовать инструменты.

---

**Последний коммит:** см. `git log -1` в `app/`
