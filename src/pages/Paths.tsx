import CabinetLayout from '../components/CabinetLayout'

export default function Paths() {
  return (
    <CabinetLayout rightVisual="arch">
      <div className="p-6 md:p-10">
        {/* Тот же grid 2 равных колонок как на /transfer. Левая = контент, правая = пустая.
            Картинка-арка идёт fixed справа от центра (см. CabinetLayout). */}
        <div className="xl:grid xl:grid-cols-2 xl:gap-6 xl:items-start">
          <div>
            <div className="mb-8">
              <div className="tag mb-2">Благотворительность</div>
              <h1 className="font-serif text-3xl text-ink-900 mb-2">
                Щедрость — главный признак богатства
              </h1>
              <div className="w-12 h-px bg-gold-500" />
            </div>

            <p className="font-sans text-ink-700 leading-relaxed mb-3">
              Прежде чем получить — отдай.
            </p>
            <p className="font-sans text-ink-700 leading-relaxed mb-3">
              10% от полученной тобой суммы ты можешь перевести в фонд помощи онкологически больных детей.
            </p>
            <p className="font-sans text-ink-500 leading-relaxed mb-8">
              Не из страха. Не из жалости. Из силы.
            </p>

            <div className="flex flex-col gap-3 mb-10 max-w-xs">
              <button className="btn-gold text-sm px-6 py-2.5">
                Поддержать фонд
              </button>
              <button className="btn-outline text-sm px-6 py-2.5">
                Поддержать разработчиков
              </button>
            </div>

            <p className="font-serif italic text-ink-700 text-lg leading-relaxed">
              «Изобилие приходит туда, где открыта дверь для других».
            </p>
          </div>
          {/* Правая колонка пустая — её визуально занимает картинка-арка через CabinetLayout */}
          <div />
        </div>
      </div>
    </CabinetLayout>
  )
}
