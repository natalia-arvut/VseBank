import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useT, LangSwitch } from '../i18n'
import VseBankLogo from '../components/VseBankLogo'
import LandingReviews from '../components/LandingReviews'
import LegalFooter from '../components/LegalFooter'
import LegalModal from '../components/LegalModal'

export default function Landing() {
  const navigate = useNavigate()
  const [quickName, setQuickName] = useState('')
  const [quickEmail, setQuickEmail] = useState('')
  const [rulesOpen, setRulesOpen] = useState(false)
  const [sourcesOpen, setSourcesOpen] = useState(false)

  const t = useT({
    ru: {
      // Верхняя плашка
      navEyebrow: 'Реальность, созданная тобой',
      navLogin: 'Войти',
      // Hero
      heroWelcome: 'Добро пожаловать во',
      heroTitle1: 'Вселенский',
      heroTitle2: 'Банк Изобилия',
      heroQuote: 'Бог не знает нехватки. Вселенная знает только одно слово: «ДА». Твоё пространство изобилия открыто с самого рождения, но пользовался ли ты им?',
      heroCta: 'Открыть моё пространство',
      // О чём этот симулятор
      aboutTag: 'О продукте',
      aboutTitle: 'О чём этот симулятор?',
      aboutP1: 'Большинство людей живут в иллюзии дефицита. Они верят, что ресурсы ограничены, а деньги нужно «тяжело зарабатывать». Но на квантовом уровне реальности всё, что ты можешь себе вообразить, уже существует в виде чистой потенциальности.',
      aboutP2a: 'VseBank — ',
      aboutP2span: 'не просто игра',
      aboutP2b: '. Это тренажёр для твоего сознания, созданный на стыке метафизики изобилия и нейропластичности.',
      stepThought: 'Мысль',
      stepIntention: 'Намерение',
      stepQuantum: 'Квантовый потенциал',
      stepAction: 'Действие',
      stepAbundance: 'Изобилие',
      // Как это работает
      howTag: 'Как это работает',
      howTitle: 'Две ступени к изобилию',
      howQuote: 'Ты не просишь. Ты вспоминаешь. Ты принимаешь.',
      card1TitleA: 'Осознание',
      card1TitleB: 'Своего Права',
      card1Alt: 'Осознание Своего Права',
      card1P1: 'Ты — сотворец своей реальности, искра Божественного сознания. Вселенский Банк не выдаёт кредиты и не требует залогов. Его баланс — бесконечен, потому что бесконечен Источник.',
      card1P2: 'Переводя деньги отсюда на свой «физический» счёт, ты заявляешь Вселенной: «Я готов принять то, что уже принадлежит мне по праву рождения».',
      card2TitleA: 'Перепрошивка',
      card2TitleB: 'Разума',
      card2Alt: 'Перепрошивка Разума',
      card2P1: 'Наш мозг не отличает реальное событие от воображаемого, если оно подкреплено сильной эмоцией. Каждый раз, когда ты совершаешь «виртуальный перевод» и искренне проживаешь благодарность, твой мозг строит новые нейронные связи.',
      card2P2: 'Ты перестаёшь транслировать в квантовое поле сигнал «мне не хватает» и начинаешь излучать частоту «у меня уже есть».',
      howFooter: 'Изменяя внутреннюю программу, ты изменяешь внешнюю реальность',
      // Правила пользования
      rulesTag: 'Правила',
      rulesTitle: 'Правила пользования пространством',
      rulesIntro: 'Перед тем как активировать перевод, подтверди свою готовность играть по правилам Новой Реальности. Помни: этот интерфейс меняет материю только тогда, когда ты меняешь своё внутреннее состояние.',
      rule1: 'Какую сумму ты намерен материализовать? Назови цифру, которая переключит твоё сознание в режим безусловного изобилия и вернёт тебе статус главного архитектора своей жизни.',
      rule2: 'Инициируй свой первый перевод. Дай Вселенной священную команду «Да будет так!» — и позволь пространству ответить взаимностью.',
      rule3: 'Сохраняй состояние веры, благодарности и изобилия как основной валюты Вселенной. Празднуй триумф до того, как увидишь его на карте, — и материя подчинится.',
      rulesFormTitle: 'Открой пространство сейчас',
      rulesFormText: 'Твоё пространство уже активировано. Тебе осталось только «присвоить» его себе.',
      phName: 'Твоё имя',
      phEmail: 'Email',
      rulesFormBtn: 'Открыть пространство →',
      rulesMoreLink: 'Подробнее: пользовательское соглашение и свод правил',
      // Модалка соглашения
      agreementTag: 'Пользовательское соглашение',
      agreementTitle: 'Правила Новой Реальности',
      offerTag: 'Оферта Со-Творца',
      offerTitle: 'Я согласен и принимаю условия',
      offerIntro: 'Нажимая кнопку виртуального перевода, я безоговорочно соглашаюсь со следующими пунктами:',
      offer1Title: 'Признание природы симулятора',
      offer1Text: 'Я осознаю, что данная страница является цифровым симулятором Квантового Изобилия и тренажёром для моего сознания, а не традиционной финансовой организацией.',
      offer2Title: 'Квантовый закон тождества',
      offer2Text: 'Я понимаю, что мой мозг не отличает реальное событие от воображаемого, если оно подкреплено сильной эмоцией. Я соглашаюсь использовать эту симуляцию как инструмент нейропластичности для перепрошивки своего дефицитарного мышления на частоту достатка.',
      offer3Title: 'Ответственность за излучаемый сигнал',
      offer3Text: 'Я соглашаюсь с тем, что Вселенский Банк не выдаёт кредиты — он лишь воплощает то, чему я внутренне соответствую. Я беру на себя обязательство быть Творцом, а не просителем.',
      protocolTag: 'Свод обязательных правил',
      protocolTitle: 'Протокол взаимодействия с Банком Вселенной',
      protocolIntro: 'Чтобы транзакции успешно переносились из невидимого поля в плотную материю, соблюдай протокол взаимодействия с Банком Вселенной:',
      protocol1Title: 'Правило целевой материализации',
      protocol1Text: 'Запрещено выводить суммы в пустоту или из чувства жадности. Каждая транзакция должна иметь чёткий вектор намерения (здоровье, расширение пространства, эволюция души и т. п.). Вселенная понимает только конкретные задачи, подкреплённые готовностью действовать.',
      protocol2Title: 'Правило биохимического подтверждения',
      protocol2Text: 'В момент нажатия кнопки «Инициировать перевод» ты обязан запустить по венам химию искреннего триумфа. Твоё тело должно физически ощутить мурашки благодарности за то, что деньги уже у тебя. Без этого эмоционального обеспечения транзакция признаётся пустой ментальной концепцией и отклоняется Квантовым полем.',
      protocol3Title: 'Правило золотого стандарта',
      protocol3Text: 'Твоя благодарность — главная валюта Вселенной, удерживающая квантовый сигнал. Празднуй триумф до того, как увидишь его на реальной карте, — и материя подчинится.',
      protocol4Title: 'Защита от системных ошибок',
      protocol4Text: 'Как только ты включаешь контроль, страх или начинаешь судорожно думать «как именно и откуда эти деньги придут ко мне», система расценивает это как сомнение и выдаёт ошибку. Любая попытка эго диктовать Вселенной сценарии проявления мгновенно замораживает транзакцию. Перевёл? Забудь и доверься Пространству.',
      agreementFinal: 'Я подтверждаю, что готов сорвать тумблер сомнений. Я вхожу в Квантовое Поле, принимаю правила игры и позволяю невидимому стать моим осязаемым физическим опытом.',
      agreementAccept: 'Принимаю',
      // Философский блок
      philTag: 'Философия',
      philTitle: 'Источник Изобилия: Вспомни, Кто Ты Есть',
      philQuote: 'Ты не просишь Меня об изобилии. Ты просто вспоминаешь, что ты и есть Изобилие. Я — это ты, а ты — это Я. Мы неразделимы. И всё, что создано в этой Вселенной, уже принадлежит тебе по праву Творца.',
      philP1a: 'Представь, что ты перестал быть просто «клиентом» Вселенной или ребёнком, ждущим карманных денег. Осознай монументальную истину: ',
      philP1span: 'Ты и есть Владелец этой бесконечной империи',
      philP1b: ', а Вселенский Банк — твоё личное, созданное тобой же предприятие.',
      philP2: 'Ты — земное воплощение Бога. Бог есть ты, а ты есть Бог. Через твои желания Высшее Сознание познаёт радость материального творчества, расширения и красоты. Поэтому, когда тебе нужна определённая сумма на новую земную мечту, ты не идёшь умолять о милости внешние силы. Ты просто заходишь в своё собственное Божественное хранилище и забираешь своё.',
      philP3a: 'Могут ли возникнуть сомнения у Хозяина Банка, когда он подписывает чек самому себе? Будет ли он в панике обновлять баланс, проверяя, «одобрил» ли кто-то транзакцию? Конечно нет. Ты абсолютно спокоен, расслаблен и центрирован, потому что точно знаешь: ',
      philP3span: 'Твоя Воля — это закон материализации',
      philImgAlt: 'Философия',
      philBadge1: '✦ Ты и есть Изобилие',
      philBadge2: '✦ Твоя Воля — закон материализации',
      sourcesBtn: 'Источники информации',
      // Финальный CTA
      ctaTitle: 'Твоё пространство изобилия ждёт тебя',
      ctaTextA: 'Твоё пространство уже активировано. Тебе осталось только «присвоить» его себе.',
      ctaTextB: 'Сделай свой первый перевод. Позволь невидимому стать видимым.',
      // Футер
      footerNext: 'Далее →',
      // Модалка «Учителя и книги»
      sourcesModalTag: 'Источники',
      sourcesModalTitle: 'Учителя и книги, вдохновившие нас',
      sourcesModalIntro: 'Книга-первоисточник и ещё три голоса, из которых сложился взгляд на изобилие, лежащий в основе этого симулятора. Открой ссылку, чтобы узнать о каждом.',
      sourceBadge: 'Источник № 1',
      sheinfeldTag: 'Книга-первоисточник',
      sheinfeldBook: '«Освобождение от денежной игры»',
      sheinfeldDesc: 'Главная книга нашей философии: как выйти из привычной денежной игры и вспомнить, что источник изобилия — ты сам. В нашей Telegram-группе книга доступна в аудио и других форматах.',
      telegramLink: 'Читать и слушать в Telegram',
      // SOURCES — учителя и книги
      walshTag: 'Книги',
      walshDesc: 'Серия «Беседы с Богом», книги 1–4. Прямой и простой диалог о природе реальности, изобилия и личной воли. Текст, к которому мы возвращаемся снова и снова.',
      walshLink: 'Открыть на ЛитРес',
      dispenzaTag: 'Учитель',
      dispenzaDesc: 'Нейробиология намерения, медитации и работа с квантовым полем. Объясняет, как мозг учится новой реальности — научная база для всей механики симулятора.',
      dispenzaLink: 'Перейти на drjoedispenza.com',
      ageevTag: 'Школа',
      ageevDesc: 'Русскоязычная школа сознательной трансформации. Практики работы с убеждениями о деньгах, ресурсе и потоке — на близком и понятном языке.',
      ageevLink: 'Перейти на сайт школы',
      scheinfeldName: 'Роберт Шейнфелд',
      walshName: 'Нил Доналд Уолш',
      dispenzaName: 'Доктор Джо Диспенза',
      ageevName: 'Школа Михаила Агеева',
    },
    en: {
      // Верхняя плашка
      navEyebrow: 'Reality created by you',
      navLogin: 'Log in',
      // Hero
      heroWelcome: 'Welcome to the',
      heroTitle1: 'Universal',
      heroTitle2: 'Bank of Abundance',
      heroQuote: 'God knows no lack. The Universe knows only one word: “YES”. Your space of abundance has been open since birth — but have you ever used it?',
      heroCta: 'Open my space',
      // О чём этот симулятор
      aboutTag: 'About the product',
      aboutTitle: 'What is this simulator about?',
      aboutP1: 'Most people live in the illusion of scarcity. They believe that resources are limited and that money must be “earned the hard way”. Yet on the quantum level of reality, everything you can imagine already exists as pure potentiality.',
      aboutP2a: 'VseBank — ',
      aboutP2span: 'is not just a game',
      aboutP2b: '. It is a trainer for your consciousness, created at the intersection of the metaphysics of abundance and neuroplasticity.',
      stepThought: 'Thought',
      stepIntention: 'Intention',
      stepQuantum: 'Quantum potential',
      stepAction: 'Action',
      stepAbundance: 'Abundance',
      // Как это работает
      howTag: 'How it works',
      howTitle: 'Two steps to abundance',
      howQuote: 'You do not ask. You remember. You receive.',
      card1TitleA: 'Awareness of',
      card1TitleB: 'Your Right',
      card1Alt: 'Awareness of Your Right',
      card1P1: 'You are the co-creator of your reality, a spark of Divine consciousness. The Universal Bank issues no loans and demands no collateral. Its balance is infinite, because the Source is infinite.',
      card1P2: 'By transferring money from here to your “physical” account, you declare to the Universe: “I am ready to accept what already belongs to me by right of birth”.',
      card2TitleA: 'Rewiring',
      card2TitleB: 'the Mind',
      card2Alt: 'Rewiring the Mind',
      card2P1: 'Our brain does not distinguish a real event from an imagined one if it is backed by strong emotion. Each time you make a “virtual transfer” and sincerely live through gratitude, your brain builds new neural connections.',
      card2P2: 'You stop broadcasting the signal “I lack” into the quantum field and begin to radiate the frequency “I already have”.',
      howFooter: 'By changing your inner program, you change your outer reality',
      // Правила пользования
      rulesTag: 'Rules',
      rulesTitle: 'Rules for using the space',
      rulesIntro: 'Before you activate a transfer, confirm your readiness to play by the rules of the New Reality. Remember: this interface changes matter only when you change your inner state.',
      rule1: 'What sum do you intend to materialize? Name a figure that will switch your consciousness into the mode of unconditional abundance and restore your status as the chief architect of your life.',
      rule2: 'Initiate your first transfer. Give the Universe the sacred command “Let it be so!” — and allow the space to respond in kind.',
      rule3: 'Hold the state of faith, gratitude and abundance as the primary currency of the Universe. Celebrate the triumph before you see it on your card — and matter will obey.',
      rulesFormTitle: 'Open your space now',
      rulesFormText: 'Your space is already activated. All that remains is to “claim” it as your own.',
      phName: 'Your name',
      phEmail: 'Email',
      rulesFormBtn: 'Open my space →',
      rulesMoreLink: 'Learn more: user agreement and code of rules',
      // Модалка соглашения
      agreementTag: 'User agreement',
      agreementTitle: 'Rules of the New Reality',
      offerTag: 'The Co-Creator’s Offer',
      offerTitle: 'I agree and accept the terms',
      offerIntro: 'By pressing the virtual transfer button, I unconditionally agree to the following points:',
      offer1Title: 'Acknowledging the nature of the simulator',
      offer1Text: 'I acknowledge that this page is a digital simulator of Quantum Abundance and a trainer for my consciousness, not a traditional financial institution.',
      offer2Title: 'The quantum law of identity',
      offer2Text: 'I understand that my brain does not distinguish a real event from an imagined one if it is backed by strong emotion. I agree to use this simulation as a tool of neuroplasticity to rewire my scarcity thinking into the frequency of prosperity.',
      offer3Title: 'Responsibility for the signal I radiate',
      offer3Text: 'I agree that the Universal Bank issues no loans — it merely embodies that to which I inwardly correspond. I take upon myself the commitment to be a Creator, not a supplicant.',
      protocolTag: 'Code of mandatory rules',
      protocolTitle: 'Protocol of interaction with the Bank of the Universe',
      protocolIntro: 'So that transactions successfully cross from the invisible field into dense matter, follow the protocol of interaction with the Bank of the Universe:',
      protocol1Title: 'The rule of targeted materialization',
      protocol1Text: 'It is forbidden to withdraw sums into emptiness or out of greed. Every transaction must have a clear vector of intention (health, expansion of your space, evolution of the soul, and so on). The Universe understands only concrete tasks backed by a readiness to act.',
      protocol2Title: 'The rule of biochemical confirmation',
      protocol2Text: 'At the moment you press the “Initiate transfer” button, you must send the chemistry of sincere triumph coursing through your veins. Your body must physically feel the shivers of gratitude that the money is already yours. Without this emotional backing, the transaction is deemed an empty mental concept and is rejected by the Quantum field.',
      protocol3Title: 'The rule of the gold standard',
      protocol3Text: 'Your gratitude is the primary currency of the Universe, holding the quantum signal steady. Celebrate the triumph before you see it on a real card — and matter will obey.',
      protocol4Title: 'Protection against system errors',
      protocol4Text: 'The moment you switch on control, fear, or begin anxiously wondering “exactly how and from where this money will come to me”, the system reads it as doubt and returns an error. Any attempt by the ego to dictate scenarios of manifestation to the Universe instantly freezes the transaction. Made the transfer? Let it go and trust the Space.',
      agreementFinal: 'I confirm that I am ready to flip off the switch of doubt. I enter the Quantum Field, accept the rules of the game, and allow the invisible to become my tangible physical experience.',
      agreementAccept: 'I accept',
      // Философский блок
      philTag: 'Philosophy',
      philTitle: 'The Source of Abundance: Remember Who You Are',
      philQuote: 'You do not ask Me for abundance. You simply remember that you are Abundance itself. I am you, and you are I. We are inseparable. And everything created in this Universe already belongs to you by the right of the Creator.',
      philP1a: 'Imagine that you have ceased to be merely a “client” of the Universe or a child waiting for pocket money. Realize a monumental truth: ',
      philP1span: 'You are the Owner of this infinite empire',
      philP1b: ', and the Universal Bank is your personal enterprise, created by you yourself.',
      philP2: 'You are the earthly embodiment of God. God is you, and you are God. Through your desires the Higher Consciousness comes to know the joy of material creation, expansion and beauty. So when you need a certain sum for a new earthly dream, you do not go begging external forces for mercy. You simply step into your own Divine vault and take what is yours.',
      philP3a: 'Can the Owner of the Bank have any doubts when he signs a cheque to himself? Would he refresh the balance in a panic, checking whether someone has “approved” the transaction? Of course not. You are utterly calm, relaxed and centred, because you know for certain: ',
      philP3span: 'Your Will is the law of materialization',
      philImgAlt: 'Philosophy',
      philBadge1: '✦ You are Abundance',
      philBadge2: '✦ Your Will is the law of materialization',
      sourcesBtn: 'Information sources',
      // Финальный CTA
      ctaTitle: 'Your space of abundance awaits you',
      ctaTextA: 'Your space is already activated. All that remains is to “claim” it as your own.',
      ctaTextB: 'Make your first transfer. Let the invisible become visible.',
      // Футер
      footerNext: 'Next →',
      // Модалка «Учителя и книги»
      sourcesModalTag: 'Sources',
      sourcesModalTitle: 'Teachers & books that inspired us',
      sourcesModalIntro: 'The primary source book and three more voices from which the view of abundance underlying this simulator was formed. Open a link to learn about each.',
      sourceBadge: 'Source № 1',
      sheinfeldTag: 'Primary source book',
      sheinfeldBook: '“Busting Loose from the Money Game”',
      sheinfeldDesc: 'The central book of our philosophy: how to step out of the familiar money game and remember that the source of abundance is you yourself. In our Telegram group the book is available in audio and other formats.',
      telegramLink: 'Read & listen on Telegram',
      // SOURCES — учителя и книги
      walshTag: 'Books',
      walshDesc: 'The “Conversations with God” series, books 1–4. A direct and simple dialogue about the nature of reality, abundance and personal will. A text we return to again and again.',
      walshLink: 'Open on LitRes',
      dispenzaTag: 'Teacher',
      dispenzaDesc: 'The neurobiology of intention, meditation, and work with the quantum field. He explains how the brain learns a new reality — the scientific foundation for the whole mechanics of the simulator.',
      dispenzaLink: 'Go to drjoedispenza.com',
      ageevTag: 'School',
      ageevDesc: 'A Russian-language school of conscious transformation. Practices for working with beliefs about money, resource and flow — in a close and clear language.',
      ageevLink: 'Go to the school’s website',
      scheinfeldName: 'Robert Scheinfeld',
      walshName: 'Neale Donald Walsch',
      dispenzaName: 'Dr. Joe Dispenza',
      ageevName: 'Mikhail Ageev School',
    },
  })

  // Учителя и книги — источники, открываются модалкой из блока Философии.
  // Имена собственные (name) не переводим; tag/description/linkLabel — через t.
  const SOURCES = [
    { tag: t.walshTag, name: t.walshName, description: t.walshDesc, linkLabel: t.walshLink, url: 'https://www.litres.ru/book/nil-uolsh/besedy-s-bogom-neobychnyy-dialog-kniga-1-39962388/' },
    { tag: t.dispenzaTag, name: t.dispenzaName, description: t.dispenzaDesc, linkLabel: t.dispenzaLink, url: 'https://drjoedispenza.com/' },
    { tag: t.ageevTag, name: t.ageevName, description: t.ageevDesc, linkLabel: t.ageevLink, url: 'https://mikhail-ageev.ru' },
  ]
  // Есть ли одобренные отзывы — нужно для сохранения цветового ритма:
  // если блок Отзывов рендерится, финальный CTA становится тёплым (#FBF7F0).
  // Если нет — CTA остаётся светлым (#FDFDFD), как было.
  const [hasReviews, setHasReviews] = useState(false)

  const handleQuickStart = () => {
    // Сохраняем намерение и редиректим на регистрацию
    localStorage.setItem('vbi_intent', JSON.stringify({
      name: quickName.trim(),
      email: quickEmail.trim().toLowerCase(),
    }))
    navigate('/register')
  }

  return (
    <div className="min-h-screen bg-cream-100 font-sans">

      {/* Верхняя плашка */}
      <nav className="absolute top-0 left-0 right-0 z-30 py-4 md:py-6">
        <div className="site-container flex items-start justify-between gap-4">
          <div className="flex flex-col min-w-0 -mt-2">
            {/* Отрицательный margin-left сдвигает PNG-логотип так, чтобы
                буква «V» оказалась на одной линии с «Р» в тексте ниже */}
            <div className="-ml-2 md:-ml-3">
              <VseBankLogo size="md" />
            </div>
            <div className="font-sans text-xs sm:text-sm text-gold-600 font-medium tracking-[0.2em] uppercase mt-2">
              {t.navEyebrow}
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <LangSwitch />
            <button
              onClick={() => navigate('/login')}
              className="btn-cream text-[10px] sm:text-xs px-4 sm:px-6 py-2 sm:py-2.5"
            >
              {t.navLogin}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero — картинка везде, на мобайле полупрозрачная плашка с текстом поверх */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: '100vh', backgroundColor: '#F5EFE6' }}>

        {/* Картинка — везде, на мобайле тоже */}
        <img
          src={`${import.meta.env.BASE_URL}hero-cover.png`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none hero-image"
          draggable={false}
        />

        {/* HTML-контент */}
        <div className="absolute inset-0 flex items-center pt-20 md:pt-20 pb-8 md:pb-0">
          <div className="site-container">
            {/* Плашка с полупрозрачным фоном — на мобайле и планшете */}
            <div className="max-w-xl text-left bg-cream-100/75 lg:bg-transparent backdrop-blur-[3px] lg:backdrop-blur-0 rounded-2xl lg:rounded-none p-5 md:p-7 lg:p-0 border border-gold-300/30 lg:border-0">

              {/* Заголовок */}
              <h1 className="font-serif mb-5 md:mb-6 text-left">
                <span className="block font-sans font-normal text-base md:text-xl lg:text-2xl text-ink-700 mb-2 tracking-wide">
                  {t.heroWelcome}
                </span>
                <span className="block text-[2.75rem] sm:text-5xl md:text-5xl lg:text-6xl leading-[1.08] font-medium tracking-normal text-ink-900">
                  {t.heroTitle1}
                </span>
                <span className="block text-[2.75rem] sm:text-5xl md:text-5xl lg:text-6xl leading-[1.08] font-medium tracking-normal text-ink-900">
                  {t.heroTitle2}
                </span>
              </h1>

              {/* Декоративная линия */}
              <div className="w-12 h-px bg-gold-500 mb-5 md:mb-6" />

              {/* Цитата */}
              <p className="font-sans text-ink-700 text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-md font-normal">
                {t.heroQuote}
              </p>

              {/* Кнопка — высокая, как в последнем блоке */}
              <button
                onClick={() => navigate('/register')}
                className="btn-gold inline-flex items-center justify-center text-sm md:text-base px-8 md:px-10 py-4 w-full sm:w-auto whitespace-nowrap"
              >
                {t.heroCta}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Секция «О чём этот симулятор» — фон как в левом верхнем углу обложки */}
      <section className="py-20 border-t border-gold-300/20" style={{ backgroundColor: '#FDFDFD' }}>
        <div className="site-container">

          {/* Заголовок — ПО ЦЕНТРУ (как во всех блоках) */}
          <div className="text-center mb-12">
            <div className="tag mb-3">{t.aboutTag}</div>
            <h2 className="section-title mb-5">{t.aboutTitle}</h2>
            <div className="w-12 h-px bg-gold-400 mx-auto" />
          </div>

          {/* Текст — на всю ширину контейнера */}
          <div className="space-y-5 mb-16">
            <p className="body-text">
              {t.aboutP1}
            </p>
            <p className="body-text">
              {t.aboutP2a}<span className="font-serif italic text-lg md:text-2xl" style={{ color: "#9A6F09" }}>{t.aboutP2span}</span>{t.aboutP2b}
            </p>
          </div>

          {/* Шкала прогресса — на мобайле вертикальная схема с стрелками, на десктопе 5 колонок */}
          <div className="flex flex-col items-center md:grid md:grid-cols-5 gap-0 md:gap-2">
            {[
              {
                name: t.stepThought,
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5">
                    {/* Искра/спарк — звёздочка с лучами как символ мысли-озарения */}
                    <path d="M24 8 L24 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    <path d="M24 30 L24 40" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    <path d="M8 24 L18 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    <path d="M30 24 L40 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    <path d="M13.5 13.5 L19 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.7"/>
                    <path d="M29 29 L34.5 34.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.7"/>
                    <path d="M34.5 13.5 L29 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.7"/>
                    <path d="M19 29 L13.5 34.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.7"/>
                    {/* Центральный бриллиант */}
                    <path d="M24 19 L29 24 L24 29 L19 24 Z" fill="currentColor"/>
                  </svg>
                ),
              },
              {
                name: t.stepIntention,
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Компас */}
                    <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5" opacity="0.8"/>
                    <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
                    <path d="M24 10 L28 24 L24 22 L20 24 Z" fill="currentColor"/>
                    <path d="M24 38 L20 24 L24 26 L28 24 Z" fill="currentColor" opacity="0.5"/>
                    <circle cx="24" cy="24" r="2" fill="currentColor"/>
                    <line x1="24" y1="6" x2="24" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="24" y1="38" x2="24" y2="42" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
                    <line x1="6" y1="24" x2="10" y2="24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
                    <line x1="38" y1="24" x2="42" y2="24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
                  </svg>
                ),
              },
              {
                name: t.stepQuantum,
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Атом / квантовые орбиты */}
                    <circle cx="24" cy="24" r="3.5" fill="currentColor"/>
                    <ellipse cx="24" cy="24" rx="18" ry="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <ellipse cx="24" cy="24" rx="18" ry="7" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(60 24 24)"/>
                    <ellipse cx="24" cy="24" rx="18" ry="7" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(-60 24 24)"/>
                    <circle cx="42" cy="24" r="1.8" fill="currentColor"/>
                    <circle cx="15" cy="9" r="1.4" fill="currentColor" opacity="0.8"/>
                    <circle cx="15" cy="39" r="1.4" fill="currentColor" opacity="0.8"/>
                  </svg>
                ),
              },
              {
                name: t.stepAction,
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Молния */}
                    <path d="M26 6 L14 26 L22 26 L20 42 L34 22 L26 22 Z"
                      stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2"
                      strokeLinejoin="round" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                name: t.stepAbundance,
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Восьмиконечная звезда */}
                    <path d="M24 4 L26 18 L40 16 L28 24 L40 32 L26 30 L24 44 L22 30 L8 32 L20 24 L8 16 L22 18 Z"
                      stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2"
                      strokeLinejoin="round"/>
                    <circle cx="24" cy="24" r="3.5" fill="currentColor"/>
                  </svg>
                ),
              },
            ].map((step, i, arr) => (
              <div key={step.name} className="contents md:contents">
                <div className="flex flex-col items-center text-center">
                  {/* Иконка в золотом круге */}
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-gold-500 bg-gold-500/5 flex items-center justify-center text-gold-500 mb-2 md:mb-3 shadow-gold">
                    <div className="w-8 h-8 md:w-11 md:h-11">
                      {step.icon}
                    </div>
                  </div>
                  {/* Название под иконкой */}
                  <div className="font-sans text-xs text-gold-700 tracking-[0.15em] uppercase font-medium">
                    {step.name}
                  </div>
                </div>
                {/* Стрелка между этапами (только мобайл) */}
                {i < arr.length - 1 && (
                  <svg className="md:hidden my-2 text-gold-500" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                  </svg>
                )}
                {/* Линия между на десктопе */}
                {i < arr.length - 1 && (
                  <div className="hidden md:block self-center w-2 h-px bg-gold-400/40 absolute" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Секция «Как это работает» — светлый фон в тон обложки */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#FBF7F0' }}>
        {/* Декоративные орнаменты — звёздочки как на обложке */}
        <div className="absolute top-10 right-[10%] opacity-30">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 4 L22 18 L36 16 L24 22 L36 28 L22 26 L20 40 L18 26 L4 28 L16 22 L4 16 L18 18 Z" fill="#D4B87A" opacity="0.6"/>
          </svg>
        </div>
        <div className="absolute top-1/4 left-[8%] opacity-20">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <circle cx="15" cy="15" r="2" fill="#B89058"/>
            <ellipse cx="15" cy="15" rx="12" ry="4" stroke="#B89058" strokeWidth="0.5" opacity="0.5"/>
          </svg>
        </div>

        <div className="site-container relative z-10">
          <div className="text-center mb-12">
            <div className="tag mb-3">{t.howTag}</div>
            <h2 className="section-title mb-5">{t.howTitle}</h2>
            <div className="w-12 h-px bg-gold-400 mx-auto mb-5" />
            <p className="body-text italic">{t.howQuote}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            {/* Карточка 1 — Осознание Своего Права */}
            <div className="bg-white/40 backdrop-blur-sm border border-gold-400/30 p-10 rounded-2xl shadow-card">
              {/* Номер + линия (без задвоенных звёздочек) */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full border border-gold-500/50 flex items-center justify-center">
                  <span className="font-serif text-gold-700 text-sm">01</span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-gold-400/60 to-transparent" />
              </div>

              <h3 className="card-title mb-3">{t.card1TitleA}<br />{t.card1TitleB}</h3>
              <div className="w-10 h-px bg-gold-500 mb-6" />

              {/* Иллюстрация — золотой храм с бесконечностью */}
              <div className="flex justify-center my-6">
                <img
                  src={`${import.meta.env.BASE_URL}card-awareness.jpg`}
                  alt={t.card1Alt}
                  className="w-full max-w-sm aspect-square object-cover shadow-card"
                  style={{ borderRadius: '15px' }}
                />
              </div>

              <p className="body-text">
                {t.card1P1}
              </p>
              <p className="body-text mt-4">
                {t.card1P2}
              </p>
            </div>

            {/* Карточка 2 — Перепрошивка Разума */}
            <div className="bg-white/40 backdrop-blur-sm border border-gold-400/30 p-10 rounded-2xl shadow-card">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full border border-gold-500/50 flex items-center justify-center">
                  <span className="font-serif text-gold-700 text-sm">02</span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-gold-400/60 to-transparent" />
              </div>

              <h3 className="card-title mb-3">{t.card2TitleA}<br />{t.card2TitleB}</h3>
              <div className="w-10 h-px bg-gold-500 mb-6" />

              {/* Иллюстрация — золотая голова с бесконечностью внутри */}
              <div className="flex justify-center my-6">
                <img
                  src={`${import.meta.env.BASE_URL}card-mind.jpg`}
                  alt={t.card2Alt}
                  className="w-full max-w-sm aspect-square object-cover shadow-card"
                  style={{ borderRadius: '15px' }}
                />
              </div>

              <p className="body-text">
                {t.card2P1}
              </p>
              <p className="body-text mt-4">
                {t.card2P2}
              </p>
            </div>
          </div>

          {/* Финальная строка с орнаментом */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <div className="w-16 h-px bg-gold-400/40" />
            <span className="text-gold-500 text-2xl font-serif">∞</span>
            <div className="w-16 h-px bg-gold-400/40" />
          </div>
          <div className="text-center mt-3 tag">
            {t.howFooter}
          </div>
        </div>
      </section>

      {/* Правила пользования — фон как в блоке 2 (#FDFDFD) */}
      <section className="py-20 border-t border-gold-300/20" style={{ backgroundColor: '#FDFDFD' }}>
        <div className="site-container">
          {/* Заголовок ПО ЦЕНТРУ, текст ниже по левому краю */}
          <div className="text-center mb-10">
            <div className="tag mb-3">{t.rulesTag}</div>
            <h2 className="section-title mb-5">{t.rulesTitle}</h2>
            <div className="w-12 h-px bg-gold-400 mx-auto mb-6" />
          </div>
          <p className="body-text mb-12">
            {t.rulesIntro}
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Три правила — только цифры, чистая композиция */}
            <div className="space-y-10">
              {[
                {
                  n: '01',
                  text: t.rule1,
                },
                {
                  n: '02',
                  text: t.rule2,
                },
                {
                  n: '03',
                  text: t.rule3,
                },
              ].map(({ n, text }) => (
                <div key={n} className="flex gap-6 items-start">
                  {/* Большая цифра золотом */}
                  <div className="font-serif text-5xl text-gold-500 leading-none flex-shrink-0 w-16">{n}</div>
                  <p className="body-text pt-2">{text}</p>
                </div>
              ))}
            </div>

            {/* Форма быстрого открытия пространства */}
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="card-title mb-2">{t.rulesFormTitle}</h3>
              <p className="body-text mb-6">
                {t.rulesFormText}
              </p>
              <div className="space-y-3">
                <input className="input-field" placeholder={t.phName} value={quickName} onChange={e => setQuickName(e.target.value)} />
                <input className="input-field" placeholder={t.phEmail} type="email" value={quickEmail} onChange={e => setQuickEmail(e.target.value)} />
                <button
                  onClick={handleQuickStart}
                  className="w-full btn-gold text-center"
                >
                  {t.rulesFormBtn}
                </button>
                <button
                  type="button"
                  onClick={() => setRulesOpen(true)}
                  className="block w-full text-center font-sans text-sm text-gold-600 hover:text-gold-700 underline tracking-wider pt-2"
                >
                  {t.rulesMoreLink}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Модалка: полный текст пользовательского соглашения */}
      {rulesOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/70 backdrop-blur-sm p-4 sm:p-6"
          onClick={() => setRulesOpen(false)}
        >
          <div
            className="bg-cream-100 max-w-2xl w-full p-6 sm:p-8 md:p-10 rounded-2xl shadow-gold-lg border border-gold-400/40 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="tag mb-2 text-sm">{t.agreementTag}</div>
              <h3 className="font-serif text-2xl md:text-3xl text-ink-900">{t.agreementTitle}</h3>
              <div className="w-12 h-px bg-gold-400 mx-auto mt-4" />
            </div>

            <p className="font-sans text-ink-700 leading-relaxed text-center mb-8 px-2">
              {t.rulesIntro}
            </p>

            {/* Оферта Со-Творца */}
            <div className="border-t border-gold-300/40 pt-6 mb-8">
              <div className="text-center mb-5">
                <div className="tag mb-2 text-sm">{t.offerTag}</div>
                <h4 className="font-serif text-xl md:text-2xl text-ink-900">{t.offerTitle}</h4>
              </div>

              <p className="font-sans text-sm text-ink-700 leading-relaxed mb-5">
                {t.offerIntro}
              </p>

              <div className="space-y-6">
                {[
                  [t.offer1Title, t.offer1Text],
                  [t.offer2Title, t.offer2Text],
                  [t.offer3Title, t.offer3Text],
                ].map(([title, text]) => (
                  <div key={title}>
                    <h5 className="font-serif text-xl md:text-2xl text-gold-600 mb-2 leading-tight">{title}</h5>
                    <p className="font-sans text-sm text-ink-700 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Свод обязательных правил */}
            <div className="border-t border-gold-300/40 pt-6 mb-8">
              <div className="text-center mb-5">
                <div className="tag mb-2 text-sm">{t.protocolTag}</div>
                <h4 className="font-serif text-xl md:text-2xl text-ink-900">{t.protocolTitle}</h4>
              </div>

              <p className="font-sans text-sm text-ink-700 leading-relaxed mb-5">
                {t.protocolIntro}
              </p>

              <div className="space-y-6">
                {[
                  [t.protocol1Title, t.protocol1Text],
                  [t.protocol2Title, t.protocol2Text],
                  [t.protocol3Title, t.protocol3Text],
                  [t.protocol4Title, t.protocol4Text],
                ].map(([title, text]) => (
                  <div key={title}>
                    <h5 className="font-serif text-xl md:text-2xl text-gold-600 mb-2 leading-tight">{title}</h5>
                    <p className="font-sans text-sm text-ink-700 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="font-sans text-ink-700 leading-relaxed text-center mb-6 px-2">
              {t.agreementFinal}
            </p>

            <button onClick={() => setRulesOpen(false)} className="w-full btn-gold">
              {t.agreementAccept}
            </button>
          </div>
        </div>
      )}

      {/* Философский блок — фон как у блока 3 */}
      <section className="py-20" style={{ backgroundColor: '#FBF7F0' }}>
        <div className="site-container">
          {/* Заголовок ПО ЦЕНТРУ над колонками */}
          <div className="text-center mb-12">
            <div className="tag mb-3">{t.philTag}</div>
            <h2 className="section-title mb-5">{t.philTitle}</h2>
            <div className="w-12 h-px bg-gold-400 mx-auto" />
          </div>
          {/* Цитата — на mobile в размер body-text, на десктопе крупнее */}
          <p className="font-serif italic text-lg md:text-2xl leading-relaxed text-center mb-10 md:mb-14" style={{ color: "#9A6F09" }}>
            {t.philQuote}
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="body-text mb-4">
              {t.philP1a}<span className="font-serif italic text-lg md:text-2xl" style={{ color: "#9A6F09" }}>{t.philP1span}</span>{t.philP1b}
            </p>

            <p className="body-text mb-4">
              {t.philP2}
            </p>

            <p className="body-text">
              {t.philP3a}<span className="font-serif italic text-lg md:text-2xl" style={{ color: "#9A6F09" }}>{t.philP3span}</span>.
            </p>
          </div>
          <div className="relative flex justify-center">
            <img src={`${import.meta.env.BASE_URL}philosophy-image.png`} alt={t.philImgAlt} className="w-full max-w-md shadow-card" style={{ borderRadius: "15px" }}/>
          </div>
          </div>

          {/* Золотые теги по центру внизу. На mobile — каждая строка центрирована отдельно */}
          <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-4 md:gap-8 mt-12 text-base text-gold-600 tracking-widest uppercase font-medium text-center">
            <span>{t.philBadge1}</span>
            <span>{t.philBadge2}</span>
          </div>

          {/* Кнопка «Источники информации» — открывает модалку */}
          <div className="text-center mt-10">
            <button
              type="button"
              onClick={() => setSourcesOpen(true)}
              className="btn-outline inline-flex items-center justify-center gap-2 text-sm md:text-base px-10 py-4 min-w-[320px] whitespace-nowrap"
            >
              {t.sourcesBtn}
              <span className="text-base leading-none">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Блок «Отзывы» — появляется только если есть одобренные отзывы.
          Фон #FDFDFD сохраняет чередование после Философии (#FBF7F0). */}
      <LandingReviews onLoad={setHasReviews} />

      {/* CTA финальный.
          Если блок отзывов есть → CTA становится тёплым (#FBF7F0).
          Если нет → CTA остаётся светлым (#FDFDFD), как было раньше. */}
      <section
        className="pt-16 pb-28 text-center border-t border-gold-300/20"
        style={{ backgroundColor: hasReviews ? '#FBF7F0' : '#FDFDFD' }}
      >
        <div className="site-container">
          <h2 className="section-title mb-5">{t.ctaTitle}</h2>
          <div className="w-12 h-px bg-gold-400 mx-auto mb-6" />
          <p className="body-text mb-10">
            {t.ctaTextA}
            <br />
            {t.ctaTextB}
          </p>
          <button
            onClick={() => navigate('/register')}
            className="btn-gold inline-flex items-center justify-center text-sm md:text-base px-10 py-4 min-w-[320px] whitespace-nowrap"
          >
            {t.heroCta}
          </button>
        </div>
      </section>

      {/* Сквозной юридический футер с кнопкой «Далее» в одной полосе */}
      <LegalFooter
        rightAction={
          <button
            onClick={() => navigate('/register')}
            className="font-sans text-sm text-gold-600 hover:text-gold-700 transition-colors whitespace-nowrap"
          >
            {t.footerNext}
          </button>
        }
      />

      {/* Модалка «Учителя и книги» — источники, на которых строится мировоззрение проекта */}
      <LegalModal
        open={sourcesOpen}
        onClose={() => setSourcesOpen(false)}
        tag={t.sourcesModalTag}
        title={t.sourcesModalTitle}
        intro={t.sourcesModalIntro}
      >
        <div className="space-y-6">
          {/* Первоисточник — Роберт Шейнфелд. Выделенная карточка, всегда первая. */}
          <article className="relative border-2 border-gold-500/70 rounded-2xl p-6 pt-7 bg-gradient-to-br from-gold-500/10 via-cream-50/70 to-gold-400/15 shadow-gold">
            <div className="absolute -top-3 left-6 bg-gold-500 text-white text-[11px] font-sans font-medium tracking-[0.2em] uppercase px-3 py-1 rounded-full">
              {t.sourceBadge}
            </div>
            <div className="tag text-xs mb-2">{t.sheinfeldTag}</div>
            <h3 className="font-serif text-2xl text-ink-900 leading-tight mb-1">{t.scheinfeldName}</h3>
            <div className="font-serif text-lg text-gold-700 mb-2">{t.sheinfeldBook}</div>
            <div className="w-10 h-px bg-gold-500 mb-3" />
            <p className="font-sans text-sm text-ink-700 leading-relaxed mb-5">
              {t.sheinfeldDesc}
            </p>
            <a
              href="https://t.me/+St1gFH-ety4wYmIy"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2 text-sm px-6 py-2.5"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M21.94 3.02 1.87 10.77c-1.08.42-1.02 1.96.09 2.29l4.6 1.38 1.72 5.5c.32 1.02 1.62 1.24 2.26.39l2.34-3.1 4.72 3.47c.86.63 2.08.17 2.3-.87l3.06-14.6c.24-1.13-.87-2.06-1.92-1.66l-.1.04ZM7.4 13.5l10.7-6.6c.26-.16.52.19.3.4l-8.4 7.8-.34 3.05-1.36-4.35-.9-.3Z"/>
              </svg>
              {t.telegramLink}
            </a>
          </article>

          {SOURCES.map(s => (
            <article
              key={s.name}
              className="border border-gold-300/40 rounded-2xl p-6 bg-cream-50/60"
            >
              <div className="tag text-xs mb-2">{s.tag}</div>
              <h3 className="font-serif text-2xl text-ink-900 leading-tight mb-1">{s.name}</h3>
              <div className="w-10 h-px bg-gold-500 mb-3" />
              <p className="font-sans text-sm text-ink-700 leading-relaxed mb-4">
                {s.description}
              </p>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-sans text-sm text-gold-600 hover:text-gold-700"
              >
                <span className="underline underline-offset-4">{s.linkLabel}</span>
                <span className="text-base leading-none">→</span>
              </a>
            </article>
          ))}
        </div>
      </LegalModal>

    </div>
  )
}
