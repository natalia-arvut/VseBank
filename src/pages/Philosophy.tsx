import CabinetLayout from '../components/CabinetLayout'

export default function Philosophy() {
  return (
    <CabinetLayout>
      <div className="p-6 md:p-10 max-w-3xl">

        <div className="mb-10">
          <div className="tag mb-2">Философия</div>
          <h1 className="font-serif text-4xl text-stone-800 mb-4">Небесный Отец — Ваш Личный Банкир</h1>
          <div className="w-12 h-px bg-gold-400 mb-6" />
        </div>

        <div className="prose prose-stone max-w-none space-y-8">

          <div className="glass-card p-8">
            <p className="font-sans text-stone-600 leading-relaxed mb-4">
              Представьте, что ваш земной отец — олигарх. Вы его любимый сын, и он всё для вас готов сделать. Вы приходите к нему и говорите, что вам нужна определённая сумма на ваш счёт. Он знает, что вы не наркоман и не алкоголик, что эти деньги вас не погубят, — и потому в доверии переводит вам на ваш банковский счёт всегда, когда вы его просите.
            </p>
            <p className="font-serif text-xl italic text-stone-700">
              У вас будут сомнения, что деньги не зайдут???
            </p>
          </div>

          <div className="border-l-2 border-gold-400 pl-6 py-2">
            <p className="font-serif text-2xl italic text-stone-700 leading-relaxed">
              Вот так и наш Небесный Отец переводит нам любые суммы. И всё от нас зависит — сомневаемся мы или нет!
            </p>
          </div>

          <div className="glass-card p-8">
            <p className="font-sans text-stone-600 leading-relaxed">
              Если мы Бога представляем как квантовое поле или вселенную — это тоже работает. Разница лишь в том, что вы приходите либо к любящему вас Отцу и именно так доверительно с ним общаетесь, либо к богатому инвестору, к которому стоит очередь из таких же, как вы.
            </p>
          </div>

          {/* Блок «От автора» */}
          <div className="mt-10">
            <div className="tag mb-4">От автора</div>
            <div className="glass-card p-8 space-y-4">
              <p className="font-sans text-stone-600 leading-relaxed">
                Только положительные отзывы будут оставаться на странице! Если у вас не получается научиться вести области и удачу — не путайтесь на пути тех, кто это умеет.
              </p>
              <p className="font-serif text-2xl italic text-stone-700">
                По вере вашей дано вам будет!
              </p>
              <p className="font-sans text-stone-600 leading-relaxed text-lg">
                Улыбайтесь! Верьте! Радуйтесь! Молодцы! Наслаждайтесь НОВОЙ РЕАЛЬНОСТЬЮ!!!
              </p>
            </div>
          </div>

        </div>

        <div className="mt-12 text-center">
          <div className="text-4xl text-gold-400/40 mb-4">∞</div>
          <div className="font-sans text-xs text-stone-400 tracking-[0.2em] uppercase">
            Изменяя внутреннюю программу, вы изменяете внешнюю реальность
          </div>
        </div>

      </div>
    </CabinetLayout>
  )
}
