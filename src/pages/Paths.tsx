import { useState } from 'react'
import CabinetLayout from '../components/CabinetLayout'

export default function Paths() {
  const [whyOpen, setWhyOpen] = useState(false)

  return (
    <CabinetLayout rightVisual="arch">
      <div className="p-4 md:p-10">
        <div className="xl:grid xl:grid-cols-2 xl:gap-6 xl:items-start">
          <div>
            <div className="mb-4">
              <div className="tag mb-1">Донат VseBank</div>
              <h1 className="font-serif text-2xl md:text-3xl text-ink-900 mb-2">
                Запусти квантовую циркуляцию
              </h1>
              <div className="w-12 h-px bg-gold-500" />
            </div>

            <p className="font-sans text-sm text-ink-700 leading-relaxed mb-3">
              Если ты держишь кулак сжатым, в него невозможно вложить ничего нового. Но стоит тебе открыть ладонь, чтобы отдать, как Вселенная начинает стремиться наполнить её.
            </p>

            {/* Ссылка относится к параграфу выше */}
            <button
              type="button"
              onClick={() => setWhyOpen(true)}
              className="font-sans text-sm text-gold-600 hover:text-gold-700 underline tracking-wide mb-5 text-left"
            >
              Почему щедрость — самый выгодный финтех-инструмент? →
            </button>

            {/* Второй заголовок — того же размера */}
            <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mb-2">
              Зафиксируй свой результат
            </h2>
            <div className="w-12 h-px bg-gold-500 mb-4" />

            <p className="font-sans text-sm text-ink-700 leading-relaxed mb-2">
              Наш симулятор Вселенского Банка помог тебе перепрошить твой разум на виртуальном уровне. В момент, когда Магия случилась и ты увидел, что ты Творец своей реальности, пришло время для финального акта сотворчества.
            </p>
            <p className="font-sans text-sm text-ink-700 leading-relaxed mb-4">
              Когда квантовый сигнал изобилия завершён в реальные цифры на твоей физической карте, завершается сакральный цикл. Напиши на электронную почту{' '}
              <a href="mailto:vsebank.space@gmail.com" className="text-gold-600 underline underline-offset-2 hover:text-gold-700">
                vsebank.space@gmail.com
              </a>
              {' '}— пришлём реквизиты.
            </p>

            <p className="font-sans italic text-sm text-ink-500 leading-relaxed pt-3 border-t border-gold-300/30">
              Поделись своим результатом в отзывах — вдохнови других и запусти поток изобилия дальше.
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
              <div className="tag mb-2 text-sm">Квантовая экономика</div>
              <h3 className="font-serif text-2xl md:text-3xl text-ink-900">
                Почему щедрость —<br />самый выгодный финтех-инструмент?
              </h3>
              <div className="w-12 h-px bg-gold-400 mx-auto mt-4" />
            </div>

            <div className="space-y-4">
              <p className="font-sans text-sm md:text-base text-ink-700 leading-relaxed">
                Большинство людей совершают одну и ту же ошибку: они ждут, когда станут богатыми, чтобы начать делиться. Но в квантовом поле всё работает наоборот.{' '}
                <span className="font-serif italic text-gold-700">Щедрость — это не следствие богатства, а его первопричина.</span>
              </p>

              <p className="font-sans text-sm md:text-base text-ink-700 leading-relaxed">
                Когда ты легко и с благодарностью передаёшь деньги в качестве доната, ты совершаешь мощнейший нейробиологический акт. Ты обманываешь своё старое мышление дефицита и отправляешь в пространство мощный сигнал:
              </p>

              <p className="font-serif italic text-base md:text-lg text-gold-700 text-center px-4 py-3 leading-relaxed">
                «У меня ВСЁ ЕСТЬ. Я настолько богат, что могу легко делиться!»
              </p>

              <p className="font-sans text-sm md:text-base text-ink-700 leading-relaxed">
                Когда ты зажимаешь ресурсы из страха, ты транслируешь частоту нехватки. Поле считывает твой страх и начинает материализовывать новые поводы для дефицита.
              </p>

              <p className="font-sans text-sm md:text-base text-ink-700 leading-relaxed">
                Когда ты делишься свободно, ты настраиваешься на частоту Источника. Ты переходишь из роли просителя в состояние Творца, который сам распределяет блага.
              </p>

              <div className="border-t border-gold-300/40 pt-5 mt-6">
                <div className="text-center mb-4">
                  <div className="tag mb-2 text-sm">Древний закон</div>
                  <h4 className="font-serif text-xl md:text-2xl text-gold-600">Сакральный код десятины</h4>
                </div>

                <p className="font-sans text-sm md:text-base text-ink-700 leading-relaxed mb-3">
                  Вспомни древний закон десятины, который веками практиковали величайшие правители и самые успешные люди планеты. Десятина — это не налог, не пожертвование и уж точно не плата за «грехи».
                </p>

                <p className="font-sans text-sm md:text-base text-ink-700 leading-relaxed mb-3">
                  <span className="font-serif italic text-gold-700">Десятина — это священный контракт с пространством.</span> Отдавая 10% своего дохода туда, где твоё сознание получает пищу, вдохновение и квантовое расширение, ты признаёшь Бога (или Вселенную) своим главным финансовым партнёром.
                </p>

                <p className="font-sans text-sm md:text-base text-ink-700 leading-relaxed">
                  Это не потеря. Это инвестиция в поток. Ты возвращаешь малую часть энергии в Источник, чтобы он продолжал вращать колесо твоего изобилия.
                </p>
              </div>
            </div>

            <button
              onClick={() => setWhyOpen(false)}
              className="w-full btn-gold mt-8"
            >
              Понятно
            </button>
          </div>
        </div>
      )}
    </CabinetLayout>
  )
}
