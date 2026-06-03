import LegalLayout, { LegalSection, LegalParagraph } from '../components/LegalLayout'

export default function Cookies() {
  return (
    <LegalLayout
      tag="Документ"
      title="Политика использования файлов cookie (Cookie Policy) на VSEBANK.SPACE"
      intro="Документ объясняет, какие файлы cookie использует сайт vsebank.space и как ими управлять."
    >
      <LegalSection number="1" title="Что такое файлы cookie?">
        <LegalParagraph>
          Файлы cookie (куки) — это небольшие текстовые файлы, которые сохраняются на твоём устройстве (компьютере, смартфоне) при посещении Сайта. Они помогают Сайту запоминать информацию о тебе, например, чтобы тебе не приходилось заново вводить логин и пароль при каждом переходе на новую страницу.
        </LegalParagraph>
      </LegalSection>

      <LegalSection number="2" title="Какие файлы cookie мы используем?">
        <ul className="space-y-3 list-none pl-0">
          <li>
            <strong className="text-ink-900">Технические (функциональные) cookie.</strong>{' '}
            Необходимы для работы личного кабинета. Они удерживают твою активную сессию авторизации. Без них ты бы разлогинивался каждую секунду.
          </li>
          <li>
            <strong className="text-ink-900">Аналитические cookie.</strong>{' '}
            Файлы систем Яндекс.Метрика и Google Analytics. Они собирают обезличенную информацию (без имен и реквизитов) о том, сколько людей зашло на сайт и какие разделы популярны. Это помогает нам улучшать баланс игры.
          </li>
        </ul>
      </LegalSection>

      <LegalSection number="3" title="Как отключить cookie?">
        <LegalParagraph>
          Ты можешь в любой момент отключить или удалить файлы cookie в настройках своего интернет-браузера (Chrome, Safari, Firefox и др.). Однако учти, что после этого функция входа в личный кабинет на Сайте перестанет работать.
        </LegalParagraph>
      </LegalSection>
    </LegalLayout>
  )
}
