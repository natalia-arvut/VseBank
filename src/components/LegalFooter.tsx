import { useState } from 'react'
import type { ReactNode } from 'react'
import LegalModal from './LegalModal'
import { LEGAL_DOCS, type LegalDocKey } from './legalContent'

// Сквозной юридический футер. Подключается на лендинге, логине, регистрации,
// в кабинете и на странице maintenance — чтобы документы были доступны всегда.
//
// Клик по ссылке открывает модальное окно с содержимым документа.
// Так пользователь читает условия НЕ уходя с текущей страницы.
//
// rightAction — опциональный слот в правой части футера (например, кнопка
// «Далее» на лендинге). Когда задан, попадает в верхнюю строку футера справа.

const ORDER: LegalDocKey[] = ['terms', 'privacy', 'cookies', 'disclaimer']

interface LegalFooterProps {
  rightAction?: ReactNode
}

export default function LegalFooter({ rightAction }: LegalFooterProps) {
  const [openDoc, setOpenDoc] = useState<LegalDocKey | null>(null)
  const ActiveContent = openDoc ? LEGAL_DOCS[openDoc].Content : null
  const activeMeta = openDoc ? LEGAL_DOCS[openDoc].meta : null

  return (
    <>
      <footer className="border-t border-gold-300/30 bg-cream-100/60 py-6 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Верхняя строка: копирайт слева, опциональный action справа */}
          <div className="flex items-start gap-4 flex-wrap">
            <p className="font-sans text-[11px] md:text-xs text-gold-600 leading-relaxed text-center md:text-left flex-1 min-w-[200px]">
              © {new Date().getFullYear()} VseBank. Все права защищены. Сайт является интерактивной игрой-симулятором.
            </p>
            {rightAction && (
              <div className="flex-shrink-0">{rightAction}</div>
            )}
          </div>

          {/* Ссылки на документы — открываются модалкой */}
          <div className="mt-3 flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-2 font-sans text-[11px] md:text-xs text-gold-600">
            {ORDER.map((key, i) => (
              <span key={key} className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setOpenDoc(key)}
                  className="text-gold-600 hover:text-gold-700 underline underline-offset-2 transition-colors"
                >
                  {LEGAL_DOCS[key].label}
                </button>
                {i < ORDER.length - 1 && <span className="text-gold-400/60 select-none">·</span>}
              </span>
            ))}
            <span className="text-gold-400/60 select-none hidden md:inline">·</span>
            <span className="w-full md:w-auto text-center md:text-left mt-1 md:mt-0">
              Связь:{' '}
              <a
                href="mailto:vsebank.space@gmail.com"
                className="text-gold-600 hover:text-gold-700 underline underline-offset-2"
              >
                vsebank.space@gmail.com
              </a>
            </span>
          </div>
        </div>
      </footer>

      {/* Модалка с активным документом */}
      {ActiveContent && activeMeta && (
        <LegalModal
          open={openDoc !== null}
          onClose={() => setOpenDoc(null)}
          tag={activeMeta.tag}
          title={activeMeta.title}
          intro={activeMeta.intro}
        >
          <ActiveContent />
        </LegalModal>
      )}
    </>
  )
}
