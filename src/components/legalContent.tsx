import type { ReactNode, ReactElement } from 'react'
import { useLang, useT } from '../i18n'

// ─────────────────────────────────────────────────────────
// Контент юридических документов и хелперы разметки.
// Один и тот же контент рендерится и в модалках (через LegalModal),
// и на отдельных страницах (через LegalLayout).
//
// Двуязычность RU / EN: разметка (LegalSection / LegalItem / LegalParagraph)
// одна, а тексты берутся из словаря { ru, en } через хук useT. Русский —
// первичная / эталонная версия; английский — перевод для удобства.
// ─────────────────────────────────────────────────────────

export function LegalSection({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className="font-serif text-xl md:text-2xl text-ink-900 mb-3 leading-tight">
        <span className="text-gold-700 mr-2">{number}.</span>
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </section>
  )
}

export function LegalItem({ number, children }: { number: string; children: ReactNode }) {
  return (
    <p className="leading-relaxed">
      <span className="font-medium text-ink-900 mr-1.5">{number}.</span>
      <span>{children}</span>
    </p>
  )
}

export function LegalParagraph({ children }: { children: ReactNode }) {
  return <p className="leading-relaxed">{children}</p>
}

const CONTACT_EMAIL = (
  <a href="mailto:vsebank.space@gmail.com" className="text-gold-700 hover:text-gold-900 underline-offset-2 hover:underline">
    vsebank.space@gmail.com
  </a>
)

// Примечание к переводу — показывается только в английской версии.
function TranslationNote() {
  return (
    <p className="text-sm text-ink-500 italic leading-relaxed">
      This is a translation for convenience. In case of any discrepancy, the Russian version prevails.
    </p>
  )
}

// ─────────────────────────────────────────────────────────
// Пользовательское соглашение
// ─────────────────────────────────────────────────────────
export const TERMS_META = {
  ru: {
    tag: 'Документ',
    title: 'Пользовательское соглашение игры-симулятора VSEBANK.SPACE',
    intro: 'Документ определяет условия использования игрового веб-ресурса vsebank.space. Регистрируясь на Сайте, ты подтверждаешь, что прочитал и принял настоящее Соглашение.',
  },
  en: {
    tag: 'Document',
    title: 'Terms of Use of the VSEBANK.SPACE simulator game',
    intro: 'This document sets out the terms of use of the vsebank.space game web resource. By registering on the Website, you confirm that you have read and accepted these Terms.',
  },
}

export function TermsContent() {
  const { lang } = useLang()
  const t = useT({
    ru: {
      s1title: 'Статус ресурса и отказ от ответственности',
      i11: 'Сайт vsebank.space является бесплатным развлекательным веб-ресурсом, интерактивной игрой и психологическим тренажером визуализации.',
      i12: (
        <>
          Сайт <strong>НЕ является</strong> банком, микрофинансовой, кредитной или иной реальной финансовой организацией. Сайт <strong>НЕ осуществляет</strong>, не контролирует и не гарантирует проведение реальных финансовых транзакций, выплат, начислений или переводов денежных средств в реальном мире.
        </>
      ),
      i13: 'Термины «Перевод», «Реквизиты», «Свод обязательных правил», «Протокол взаимодействия с Банком Вселенной» и иные аналогичные формулировки на Сайте используются исключительно в контексте игрового процесса и метафорической игровой механики работы с подсознанием.',
      s2title: 'Правила регистрации и доступа',
      i21: 'Для использования Сайта Пользователь создает учетную запись, используя адрес электронной почты (Email) и пароль. Пользователь несет личную ответственность за сохранность своих данных для входа.',
      i22: 'Сайт предназначен для лиц, достигших 18 лет. Используя Сайт, ты подтверждаешь соблюдение данного возрастного ценза или наличие согласия родителей / законных представителей.',
      s3title: 'Правила публикации отзывов',
      i31: 'Отправляя отзыв через интерфейс Сайта, Пользователь предоставляет Администрации право на его последующее публичное размещение.',
      i32: 'Администрация оставляет за собой исключительное право одобрить отзыв для публикации на Сайте либо безвозвратно удалить его без объяснения причин на этапе предварительной модерации в админ-панели.',
      i33: 'Запрещается отправка отзывов, содержащих нецензурную лексику, оскорбления, спам, рекламу сторонних ресурсов или нарушающих действующее законодательство.',
      s4title: 'Добровольная поддержка проекта (донаты)',
      i41: 'На Сайте отсутствуют встроенные автоматические инструменты или шлюзы для приема платежей. Любая поддержка проекта осуществляется Пользователями на абсолютно добровольной и безвозмездной основе (в качестве подарка) путем личного обращения к Администрации через контактный Email.',
      i42: 'Добровольные пожертвования направляются на содержание хостинга, техническое развитие игрового проекта и поддержку авторов, не налагают на Администрацию никаких материальных или юридических обязательств перед Пользователем и не подлежат возврату (Refund) ни при каких обстоятельствах.',
      s5title: 'Контактная информация',
      i5p: (
        <>
          По любым вопросам функционирования Сайта, предложениям по улучшению игры или для удаления твоей учетной записи можно связаться с Администрацией по адресу: {CONTACT_EMAIL}.
        </>
      ),
    },
    en: {
      s1title: 'Status of the resource and disclaimer of liability',
      i11: 'The vsebank.space website is a free entertainment web resource, an interactive game and a psychological visualization trainer.',
      i12: (
        <>
          The Website <strong>is NOT</strong> a bank, a microfinance, credit or any other real financial institution. The Website <strong>does NOT carry out</strong>, control or guarantee the execution of any real financial transactions, payments, accruals or transfers of funds in the real world.
        </>
      ),
      i13: 'The terms «Transfer», «Bank details», «Set of mandatory rules», «Protocol of interaction with the Bank of the Universe» and other similar wordings on the Website are used exclusively in the context of the gameplay and the metaphorical in-game mechanics of working with the subconscious.',
      s2title: 'Registration and access rules',
      i21: 'To use the Website, the User creates an account using an email address (Email) and a password. The User bears personal responsibility for keeping their login credentials safe.',
      i22: 'The Website is intended for persons who have reached 18 years of age. By using the Website, you confirm that you comply with this age requirement or have the consent of your parents / legal guardians.',
      s3title: 'Rules for publishing reviews',
      i31: 'By submitting a review through the Website interface, the User grants the Administration the right to its subsequent public placement.',
      i32: 'The Administration reserves the exclusive right to approve a review for publication on the Website or to irrevocably delete it without giving reasons at the stage of preliminary moderation in the admin panel.',
      i33: 'It is prohibited to submit reviews that contain obscene language, insults, spam, advertising of third-party resources, or that violate applicable law.',
      s4title: 'Voluntary support of the project (donations)',
      i41: 'The Website has no built-in automatic tools or gateways for accepting payments. Any support of the project is provided by Users on an entirely voluntary and gratuitous basis (as a gift) by personally contacting the Administration through the contact Email.',
      i42: 'Voluntary donations are used for hosting maintenance, the technical development of the game project and support of the authors; they impose no financial or legal obligations on the Administration towards the User and are non-refundable (Refund) under any circumstances.',
      s5title: 'Contact information',
      i5p: (
        <>
          For any questions regarding the operation of the Website, suggestions for improving the game, or to delete your account, you can contact the Administration at: {CONTACT_EMAIL}.
        </>
      ),
    },
  })
  return (
    <>
      <LegalSection number="1" title={t.s1title}>
        <LegalItem number="1.1">{t.i11}</LegalItem>
        <LegalItem number="1.2">{t.i12}</LegalItem>
        <LegalItem number="1.3">{t.i13}</LegalItem>
      </LegalSection>

      <LegalSection number="2" title={t.s2title}>
        <LegalItem number="2.1">{t.i21}</LegalItem>
        <LegalItem number="2.2">{t.i22}</LegalItem>
      </LegalSection>

      <LegalSection number="3" title={t.s3title}>
        <LegalItem number="3.1">{t.i31}</LegalItem>
        <LegalItem number="3.2">{t.i32}</LegalItem>
        <LegalItem number="3.3">{t.i33}</LegalItem>
      </LegalSection>

      <LegalSection number="4" title={t.s4title}>
        <LegalItem number="4.1">{t.i41}</LegalItem>
        <LegalItem number="4.2">{t.i42}</LegalItem>
      </LegalSection>

      <LegalSection number="5" title={t.s5title}>
        <LegalParagraph>{t.i5p}</LegalParagraph>
      </LegalSection>

      {lang === 'en' && <TranslationNote />}
    </>
  )
}

// ─────────────────────────────────────────────────────────
// Политика конфиденциальности
// ─────────────────────────────────────────────────────────
export const PRIVACY_META = {
  ru: {
    tag: 'Документ',
    title: 'Политика конфиденциальности игрового ресурса VSEBANK.SPACE',
    intro: 'Документ описывает, какие данные обрабатываются на сайте vsebank.space и что физически не покидает твоего устройства.',
  },
  en: {
    tag: 'Document',
    title: 'Privacy Policy of the VSEBANK.SPACE game resource',
    intro: 'This document describes what data is processed on the vsebank.space website and what physically never leaves your device.',
  },
}

export function PrivacyContent() {
  const { lang } = useLang()
  const t = useT({
    ru: {
      s1title: 'Общие положения',
      i11: 'Настоящая Политика конфиденциальности определяет порядок обработки и защиты информации Пользователей на сайте vsebank.space (далее — Сайт).',
      i12: 'Сайт представляет собой интерактивный психологический тренажер-симулятор («Банк Вселенной») и функционирует по принципу локального электронного блокнота.',
      s2title: 'Данные, которые НЕ передаются на сервер (локальные данные)',
      i21: 'Любая финансовая и банковская информация, вводимая Пользователем в процессе использования тренажера (включая, но не ограничиваясь: международные номера счетов IBAN, коды BIC / SWIFT, имя получателя, наименование банка), обрабатывается исключительно на стороне устройства Пользователя (в локальном хранилище браузера Client-Side / LocalStorage).',
      i22: (
        <>
          Администрация Сайта физически <strong>НЕ собирает, НЕ накапливает, НЕ хранит, НЕ передает</strong> и никак не использует банковские реквизиты Пользователей. На сервере Сайта отсутствует база данных для хранения платежной информации.
        </>
      ),
      s3title: 'Данные, обрабатываемые на сервере',
      i3p: 'Для обеспечения технической работы Сайта на сервере собираются и обрабатываются следующие данные:',
      i31: (
        <>
          <strong>Данные учетной записи:</strong> адрес электронной почты (Email) и имя Пользователя, используемые исключительно для регистрации, авторизации в личном кабинете и восстановления доступа.
        </>
      ),
      i32: (
        <>
          <strong>Симуляционные данные:</strong> выбранные Пользователем параметры игрового процесса (сумма перевода, цель перевода, срок поступления средств). Данные показатели являются вымышленными игровыми переменными, не привязаны к реальным банковским операциям и используются только для визуализации внутри личного кабинета.
        </>
      ),
      i33: (
        <>
          <strong>Пользовательские отзывы:</strong> текст отзыва, имя автора и дата отправки. Данные направляются в админ-панель Сайта для последующей ручной модерации Администрацией.
        </>
      ),
      i34: (
        <>
          <strong>Технические данные:</strong> обезличенные файлы cookie и данные систем веб-аналитики (Яндекс.Метрика / Google Analytics) для анализа посещаемости Сайта. Данные аналитики не содержат имен, целей симуляционных переводов или персональной информации.
        </>
      ),
      s4title: 'Модерация и публикация отзывов',
      i41: 'Все отзывы, отправленные через Сайт, проходят обязательную предварительную модерацию.',
      i42: 'При одобрении отзыва Администрацией он становится доступен для публичного просмотра на Сайте и в личных кабинетах других Пользователей. При отклонении отзыва Администрацией он безвозвратно удаляется с сервера Сайта.',
      s5title: 'Права пользователей и удаление данных',
      i51: 'Пользователь имеет право в любой момент полностью очистить кэш / локальное хранилище своего браузера, чтобы мгновенно удалить свои банковские реквизиты с устройства.',
      i52: (
        <>
          Для удаления учетной записи (Email и игрового прогресса с сервера) Пользователь может направить запрос на электронную почту: {CONTACT_EMAIL}.
        </>
      ),
    },
    en: {
      s1title: 'General provisions',
      i11: 'This Privacy Policy defines the procedure for processing and protecting Users’ information on the vsebank.space website (hereinafter — the Website).',
      i12: 'The Website is an interactive psychological trainer-simulator («Bank of the Universe») and operates on the principle of a local electronic notepad.',
      s2title: 'Data that is NOT transmitted to the server (local data)',
      i21: 'Any financial and banking information entered by the User in the course of using the trainer (including, but not limited to: international bank account numbers IBAN, BIC / SWIFT codes, recipient name, bank name) is processed exclusively on the User’s device side (in the browser’s local storage, Client-Side / LocalStorage).',
      i22: (
        <>
          The Website Administration physically <strong>does NOT collect, does NOT accumulate, does NOT store, does NOT transmit</strong> and in no way uses Users’ bank details. There is no database on the Website’s server for storing payment information.
        </>
      ),
      s3title: 'Data processed on the server',
      i3p: 'To ensure the technical operation of the Website, the following data is collected and processed on the server:',
      i31: (
        <>
          <strong>Account data:</strong> the email address (Email) and the User’s name, used exclusively for registration, authorization in the personal account and access recovery.
        </>
      ),
      i32: (
        <>
          <strong>Simulation data:</strong> the gameplay parameters selected by the User (transfer amount, transfer purpose, term for the receipt of funds). These indicators are fictional in-game variables, are not tied to any real banking operations and are used only for visualization within the personal account.
        </>
      ),
      i33: (
        <>
          <strong>User reviews:</strong> the review text, the author’s name and the date of submission. This data is sent to the Website admin panel for subsequent manual moderation by the Administration.
        </>
      ),
      i34: (
        <>
          <strong>Technical data:</strong> anonymized cookies and data from web analytics systems (Yandex.Metrica / Google Analytics) for analyzing Website traffic. The analytics data contains no names, purposes of simulation transfers or personal information.
        </>
      ),
      s4title: 'Moderation and publication of reviews',
      i41: 'All reviews submitted through the Website undergo mandatory preliminary moderation.',
      i42: 'When a review is approved by the Administration, it becomes available for public viewing on the Website and in other Users’ personal accounts. When a review is rejected by the Administration, it is irrevocably deleted from the Website’s server.',
      s5title: 'Users’ rights and data deletion',
      i51: 'The User has the right at any time to fully clear the cache / local storage of their browser in order to instantly delete their bank details from the device.',
      i52: (
        <>
          To delete the account (Email and game progress from the server), the User may send a request to the email: {CONTACT_EMAIL}.
        </>
      ),
    },
  })
  return (
    <>
      <LegalSection number="1" title={t.s1title}>
        <LegalItem number="1.1">{t.i11}</LegalItem>
        <LegalItem number="1.2">{t.i12}</LegalItem>
      </LegalSection>

      <LegalSection number="2" title={t.s2title}>
        <LegalItem number="2.1">{t.i21}</LegalItem>
        <LegalItem number="2.2">{t.i22}</LegalItem>
      </LegalSection>

      <LegalSection number="3" title={t.s3title}>
        <LegalParagraph>{t.i3p}</LegalParagraph>
        <LegalItem number="3.1">{t.i31}</LegalItem>
        <LegalItem number="3.2">{t.i32}</LegalItem>
        <LegalItem number="3.3">{t.i33}</LegalItem>
        <LegalItem number="3.4">{t.i34}</LegalItem>
      </LegalSection>

      <LegalSection number="4" title={t.s4title}>
        <LegalItem number="4.1">{t.i41}</LegalItem>
        <LegalItem number="4.2">{t.i42}</LegalItem>
      </LegalSection>

      <LegalSection number="5" title={t.s5title}>
        <LegalItem number="5.1">{t.i51}</LegalItem>
        <LegalItem number="5.2">{t.i52}</LegalItem>
      </LegalSection>

      {lang === 'en' && <TranslationNote />}
    </>
  )
}

// ─────────────────────────────────────────────────────────
// Политика Cookie
// ─────────────────────────────────────────────────────────
export const COOKIES_META = {
  ru: {
    tag: 'Документ',
    title: 'Политика использования файлов cookie (Cookie Policy) на VSEBANK.SPACE',
    intro: 'Документ объясняет, какие файлы cookie использует сайт vsebank.space и как ими управлять.',
  },
  en: {
    tag: 'Document',
    title: 'Cookie Policy on VSEBANK.SPACE',
    intro: 'This document explains which cookies the vsebank.space website uses and how to manage them.',
  },
}

export function CookiesContent() {
  const { lang } = useLang()
  const t = useT({
    ru: {
      s1title: 'Что такое файлы cookie?',
      i1p: 'Файлы cookie (куки) — это небольшие текстовые файлы, которые сохраняются на твоём устройстве (компьютере, смартфоне) при посещении Сайта. Они помогают Сайту запоминать информацию о тебе, например, чтобы тебе не приходилось заново вводить логин и пароль при каждом переходе на новую страницу.',
      s2title: 'Какие файлы cookie мы используем?',
      li1: (
        <>
          <strong className="text-ink-900">Технические (функциональные) cookie.</strong>{' '}
          Необходимы для работы личного кабинета. Они удерживают твою активную сессию авторизации. Без них ты бы разлогинивался каждую секунду.
        </>
      ),
      li2: (
        <>
          <strong className="text-ink-900">Аналитические cookie.</strong>{' '}
          Файлы систем Яндекс.Метрика и Google Analytics. Они собирают обезличенную информацию (без имен и реквизитов) о том, сколько людей зашло на сайт и какие разделы популярны. Это помогает нам улучшать баланс игры.
        </>
      ),
      s3title: 'Как отключить cookie?',
      i3p: 'Ты можешь в любой момент отключить или удалить файлы cookie в настройках своего интернет-браузера (Chrome, Safari, Firefox и др.). Однако учти, что после этого функция входа в личный кабинет на Сайте перестанет работать.',
    },
    en: {
      s1title: 'What are cookies?',
      i1p: 'Cookies are small text files that are saved on your device (computer, smartphone) when you visit the Website. They help the Website remember information about you, for example, so that you do not have to re-enter your login and password every time you go to a new page.',
      s2title: 'Which cookies do we use?',
      li1: (
        <>
          <strong className="text-ink-900">Technical (functional) cookies.</strong>{' '}
          Necessary for the operation of the personal account. They maintain your active authorization session. Without them, you would be logged out every second.
        </>
      ),
      li2: (
        <>
          <strong className="text-ink-900">Analytical cookies.</strong>{' '}
          Files of the Yandex.Metrica and Google Analytics systems. They collect anonymized information (without names and bank details) about how many people visited the site and which sections are popular. This helps us improve the game balance.
        </>
      ),
      s3title: 'How to disable cookies?',
      i3p: 'You can disable or delete cookies at any time in your internet browser settings (Chrome, Safari, Firefox, etc.). However, note that after this the login function to the personal account on the Website will stop working.',
    },
  })
  return (
    <>
      <LegalSection number="1" title={t.s1title}>
        <LegalParagraph>{t.i1p}</LegalParagraph>
      </LegalSection>

      <LegalSection number="2" title={t.s2title}>
        <ul className="space-y-3 list-none pl-0">
          <li>{t.li1}</li>
          <li>{t.li2}</li>
        </ul>
      </LegalSection>

      <LegalSection number="3" title={t.s3title}>
        <LegalParagraph>{t.i3p}</LegalParagraph>
      </LegalSection>

      {lang === 'en' && <TranslationNote />}
    </>
  )
}

// ─────────────────────────────────────────────────────────
// Психологический дисклеймер
// ─────────────────────────────────────────────────────────
export const DISCLAIMER_META = {
  ru: {
    tag: 'Документ',
    title: 'Предупреждение о характере игровой практики (психологический дисклеймер)',
    intro: 'Документ фиксирует игровой и метафорический характер сайта vsebank.space и границы ответственности.',
  },
  en: {
    tag: 'Document',
    title: 'Notice on the nature of the game practice (psychological disclaimer)',
    intro: 'This document sets out the game-related and metaphorical nature of the vsebank.space website and the limits of liability.',
  },
}

export function DisclaimerContent() {
  const { lang } = useLang()
  const t = useT({
    ru: {
      s1title: 'Информационный и игровой характер ресурса',
      i11: 'Веб-сайт vsebank.space является интерактивным симулятором, игровым тренажером для ментальных практик, визуализации целей, работы с подсознанием и психологической разгрузки.',
      i12: 'Весь контент, включая «Протоколы взаимодействия с Банком Вселенной», «Правила целевой материализации» и другие тексты на Сайте, сформулирован на основе метафорических, психологических и эзотерических подходов к визуализации желаний.',
      s2title: 'Отсутствие финансовых и медицинских гарантий',
      i21: (
        <>
          Сайт vsebank.space <strong>НЕ гарантирует</strong> и <strong>НЕ может гарантировать</strong> физическое появление денежных средств на твоих реальных банковских счетах в результате использования тренажера.
        </>
      ),
      i22: 'Игровой процесс не заменяет собой реальную экономическую деятельность, финансовое планирование, официальное трудоустройство, профессиональные бизнес-консультации или юридическую помощь.',
      i23: 'Администрация Сайта не несет ответственности за финансовые, карьерные или личные решения, принятые Пользователем в реальной жизни на основе игрового процесса или субъективной интерпретации текстов Сайта.',
      s3title: 'Ответственность Пользователя',
      i3p: 'Пользователь использует Сайт осознанно, воспринимает его как игровую модель и обязуется сохранять критическое мышление и здравый смысл в управлении своими реальными финансами.',
    },
    en: {
      s1title: 'Informational and game-related nature of the resource',
      i11: 'The vsebank.space website is an interactive simulator, a game trainer for mental practices, goal visualization, working with the subconscious and psychological relief.',
      i12: 'All content, including the «Protocols of interaction with the Bank of the Universe», the «Rules of targeted materialization» and other texts on the Website, is formulated on the basis of metaphorical, psychological and esoteric approaches to the visualization of desires.',
      s2title: 'Absence of financial and medical guarantees',
      i21: (
        <>
          The vsebank.space website <strong>does NOT guarantee</strong> and <strong>CANNOT guarantee</strong> the physical appearance of funds in your real bank accounts as a result of using the trainer.
        </>
      ),
      i22: 'The gameplay does not replace real economic activity, financial planning, official employment, professional business consulting or legal assistance.',
      i23: 'The Website Administration is not responsible for any financial, career or personal decisions made by the User in real life on the basis of the gameplay or a subjective interpretation of the Website’s texts.',
      s3title: 'User responsibility',
      i3p: 'The User uses the Website consciously, perceives it as a game model and undertakes to maintain critical thinking and common sense in managing their real finances.',
    },
  })
  return (
    <>
      <LegalSection number="1" title={t.s1title}>
        <LegalItem number="1.1">{t.i11}</LegalItem>
        <LegalItem number="1.2">{t.i12}</LegalItem>
      </LegalSection>

      <LegalSection number="2" title={t.s2title}>
        <LegalItem number="2.1">{t.i21}</LegalItem>
        <LegalItem number="2.2">{t.i22}</LegalItem>
        <LegalItem number="2.3">{t.i23}</LegalItem>
      </LegalSection>

      <LegalSection number="3" title={t.s3title}>
        <LegalParagraph>{t.i3p}</LegalParagraph>
      </LegalSection>

      {lang === 'en' && <TranslationNote />}
    </>
  )
}

// ─────────────────────────────────────────────────────────
// Мета-хуки: отдают заголовки / интро документа на текущем языке.
// ─────────────────────────────────────────────────────────
export const useTermsMeta = () => useT(TERMS_META)
export const usePrivacyMeta = () => useT(PRIVACY_META)
export const useCookiesMeta = () => useT(COOKIES_META)
export const useDisclaimerMeta = () => useT(DISCLAIMER_META)

// ─────────────────────────────────────────────────────────
// Карта документов для футера и других мест,
// где нужно открывать все 4 модалки по нажатию.
// Хук useLegalDocs() отдаёт карту на текущем языке.
// ─────────────────────────────────────────────────────────
export type LegalDocKey = 'terms' | 'privacy' | 'cookies' | 'disclaimer'

const LEGAL_LABELS: Record<LegalDocKey, { ru: string; en: string }> = {
  terms: { ru: 'Пользовательское соглашение', en: 'Terms of Use' },
  privacy: { ru: 'Политика конфиденциальности', en: 'Privacy Policy' },
  cookies: { ru: 'Политика Cookie', en: 'Cookie Policy' },
  disclaimer: { ru: 'Дисклеймер', en: 'Disclaimer' },
}

export function useLegalDocs(): Record<LegalDocKey, {
  label: string
  meta: { tag: string; title: string; intro?: string }
  Content: () => ReactElement
  path: string
}> {
  const { lang } = useLang()
  return {
    terms: { label: LEGAL_LABELS.terms[lang], meta: TERMS_META[lang], Content: TermsContent, path: '/terms' },
    privacy: { label: LEGAL_LABELS.privacy[lang], meta: PRIVACY_META[lang], Content: PrivacyContent, path: '/privacy' },
    cookies: { label: LEGAL_LABELS.cookies[lang], meta: COOKIES_META[lang], Content: CookiesContent, path: '/cookies' },
    disclaimer: { label: LEGAL_LABELS.disclaimer[lang], meta: DISCLAIMER_META[lang], Content: DisclaimerContent, path: '/disclaimer' },
  }
}
