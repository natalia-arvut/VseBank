import { useState } from 'react'
import CabinetLayout from '../components/CabinetLayout'
import { useT } from '../i18n'

export default function Paths() {
  const [whyOpen, setWhyOpen] = useState(false)
  const t = useT({
    ru: {
      tag: 'Донат VseBank',
      title: 'Запусти квантовую циркуляцию',
      lead: 'Если ты держишь кулак сжатым, в него невозможно вложить ничего нового. Но стоит тебе открыть ладонь, чтобы отдать, как Вселенная начинает стремиться наполнить её.',
      whyLink: 'Почему щедрость — самый выгодный финтех-инструмент? →',
      fixTitle: 'Зафиксируй свой результат',
      fixP1: 'Наш симулятор Вселенского Банка помог тебе перепрошить твой разум на виртуальном уровне. В момент, когда Магия случилась и ты увидел, что ты Творец своей реальности, пришло время для финального акта сотворчества.',
      fixP2a: 'Когда квантовый сигнал изобилия завершён в реальные цифры на твоей физической карте, завершается сакральный цикл. Напиши на электронную почту',
      fixP2b: '— пришлём реквизиты.',
      share: 'Поделись своим результатом в отзывах — вдохнови других и запусти поток изобилия дальше.',
      modalTag: 'Квантовая экономика',
      modalTitleA: 'Почему щедрость —',
      modalTitleB: 'самый выгодный финтех-инструмент?',
      m1a: 'Большинство людей совершают одну и ту же ошибку: они ждут, когда станут богатыми, чтобы начать делиться. Но в квантовом поле всё работает наоборот.',
      m1b: 'Щедрость — это не следствие богатства, а его первопричина.',
      m2: 'Когда ты легко и с благодарностью передаёшь деньги в качестве доната, ты совершаешь мощнейший нейробиологический акт. Ты обманываешь своё старое мышление дефицита и отправляешь в пространство мощный сигнал:',
      m3: '«У меня ВСЁ ЕСТЬ. Я настолько богат, что могу легко делиться!»',
      m4: 'Когда ты зажимаешь ресурсы из страха, ты транслируешь частоту нехватки. Поле считывает твой страх и начинает материализовывать новые поводы для дефицита.',
      m5: 'Когда ты делишься свободно, ты настраиваешься на частоту Источника. Ты переходишь из роли просителя в состояние Творца, который сам распределяет блага.',
      lawTag: 'Древний закон',
      lawTitle: 'Сакральный код десятины',
      l1: 'Вспомни древний закон десятины, который веками практиковали величайшие правители и самые успешные люди планеты. Десятина — это не налог, не пожертвование и уж точно не плата за «грехи».',
      l2a: 'Десятина — это священный контракт с пространством.',
      l2b: ' Отдавая 10% своего дохода туда, где твоё сознание получает пищу, вдохновение и квантовое расширение, ты признаёшь Бога (или Вселенную) своим главным финансовым партнёром.',
      l3: 'Это не потеря. Это инвестиция в поток. Ты возвращаешь малую часть энергии в Источник, чтобы он продолжал вращать колесо твоего изобилия.',
      gotIt: 'Понятно',
    },
    en: {
      tag: 'VseBank Donation',
      title: 'Set quantum circulation in motion',
      lead: 'If you keep your fist clenched, nothing new can be placed into it. But the moment you open your palm to give, the Universe begins striving to fill it.',
      whyLink: 'Why is generosity the most profitable fintech instrument? →',
      fixTitle: 'Anchor your result',
      fixP1: 'Our Universal Bank simulator helped you rewire your mind on the virtual level. The moment the Magic happened and you saw that you are the Creator of your reality, the time came for the final act of co-creation.',
      fixP2a: 'When the quantum signal of abundance is completed as real figures on your physical card, the sacred cycle is complete. Write to the email',
      fixP2b: '— we will send the details.',
      share: 'Share your result in the reviews — inspire others and carry the flow of abundance further.',
      modalTag: 'Quantum economics',
      modalTitleA: 'Why is generosity —',
      modalTitleB: 'the most profitable fintech instrument?',
      m1a: 'Most people make the same mistake: they wait until they become rich to begin sharing. But in the quantum field everything works the other way around.',
      m1b: 'Generosity is not a consequence of wealth, but its root cause.',
      m2: 'When you pass money on easily and with gratitude as a donation, you perform the most powerful neurobiological act. You outwit your old scarcity thinking and send a powerful signal into the space:',
      m3: '“I HAVE EVERYTHING. I am so rich that I can share with ease!”',
      m4: 'When you clench your resources out of fear, you broadcast the frequency of lack. The field reads your fear and begins materializing new occasions for scarcity.',
      m5: 'When you share freely, you tune into the frequency of the Source. You move from the role of a supplicant into the state of a Creator who distributes blessings.',
      lawTag: 'Ancient law',
      lawTitle: 'The sacred code of the tithe',
      l1: 'Recall the ancient law of the tithe, practiced for centuries by the greatest rulers and the most successful people on the planet. The tithe is not a tax, not a charity, and certainly not a payment for “sins”.',
      l2a: 'The tithe is a sacred contract with the space.',
      l2b: ' By giving 10% of your income to where your consciousness receives nourishment, inspiration and quantum expansion, you acknowledge God (or the Universe) as your principal financial partner.',
      l3: 'This is not a loss. It is an investment in the flow. You return a small part of the energy to the Source so that it keeps turning the wheel of your abundance.',
      gotIt: 'Understood',
    },
  })

  return (
    <CabinetLayout rightVisual="arch">
      <div className="p-4 md:p-10">
        <div className="xl:grid xl:grid-cols-2 xl:gap-6 xl:items-start">
          <div>
            <div className="mb-4">
              <div className="tag mb-1">{t.tag}</div>
              <h1 className="font-serif text-2xl md:text-3xl text-ink-900 mb-2">
                {t.title}
              </h1>
              <div className="w-12 h-px bg-gold-500" />
            </div>

            <p className="font-sans text-sm text-ink-700 leading-relaxed mb-3">
              {t.lead}
            </p>

            {/* Ссылка относится к параграфу выше */}
            <button
              type="button"
              onClick={() => setWhyOpen(true)}
              className="font-sans text-sm text-gold-600 hover:text-gold-700 underline tracking-wide mb-5 text-left"
            >
              {t.whyLink}
            </button>

            {/* Второй заголовок — того же размера */}
            <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mb-2">
              {t.fixTitle}
            </h2>
            <div className="w-12 h-px bg-gold-500 mb-4" />

            <p className="font-sans text-sm text-ink-700 leading-relaxed mb-2">
              {t.fixP1}
            </p>
            <p className="font-sans text-sm text-ink-700 leading-relaxed mb-4">
              {t.fixP2a}{' '}
              <a href="mailto:vsebank.space@gmail.com" className="text-gold-600 underline underline-offset-2 hover:text-gold-700">
                vsebank.space@gmail.com
              </a>
              {' '}{t.fixP2b}
            </p>

            <p className="font-sans italic text-sm text-ink-500 leading-relaxed pt-3 border-t border-gold-300/30">
              {t.share}
            </p>
          </div>

          {/* Правая колонка — картинка-арка через CabinetLayout */}
          <div />
        </div>
      </div>

      {/* Модалка: длинный текст про щедрость и десятину */}
      {whyOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/70 backdrop-blur-sm p-4 sm:p-6"
          onClick={() => setWhyOpen(false)}
        >
          <div
            className="bg-cream-100 max-w-2xl w-full p-6 sm:p-8 md:p-10 rounded-2xl shadow-gold-lg border border-gold-400/40 max-h-[92vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="tag mb-2 text-sm">{t.modalTag}</div>
              <h3 className="font-serif text-2xl md:text-3xl text-ink-900">
                {t.modalTitleA}<br />{t.modalTitleB}
              </h3>
              <div className="w-12 h-px bg-gold-400 mx-auto mt-4" />
            </div>

            <div className="space-y-4">
              <p className="font-sans text-sm md:text-base text-ink-700 leading-relaxed">
                {t.m1a}{' '}
                <span className="font-serif italic text-gold-700">{t.m1b}</span>
              </p>

              <p className="font-sans text-sm md:text-base text-ink-700 leading-relaxed">
                {t.m2}
              </p>

              <p className="font-serif italic text-base md:text-lg text-gold-700 text-center px-4 py-3 leading-relaxed">
                {t.m3}
              </p>

              <p className="font-sans text-sm md:text-base text-ink-700 leading-relaxed">
                {t.m4}
              </p>

              <p className="font-sans text-sm md:text-base text-ink-700 leading-relaxed">
                {t.m5}
              </p>

              <div className="border-t border-gold-300/40 pt-5 mt-6">
                <div className="text-center mb-4">
                  <div className="tag mb-2 text-sm">{t.lawTag}</div>
                  <h4 className="font-serif text-xl md:text-2xl text-gold-600">{t.lawTitle}</h4>
                </div>

                <p className="font-sans text-sm md:text-base text-ink-700 leading-relaxed mb-3">
                  {t.l1}
                </p>

                <p className="font-sans text-sm md:text-base text-ink-700 leading-relaxed mb-3">
                  <span className="font-serif italic text-gold-700">{t.l2a}</span>{t.l2b}
                </p>

                <p className="font-sans text-sm md:text-base text-ink-700 leading-relaxed">
                  {t.l3}
                </p>
              </div>
            </div>

            <button
              onClick={() => setWhyOpen(false)}
              className="w-full btn-gold mt-8"
            >
              {t.gotIt}
            </button>
          </div>
        </div>
      )}
    </CabinetLayout>
  )
}
