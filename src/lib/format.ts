// Единое форматирование сумм для всего сайта.
// Разделитель групп разрядов — точка (1.000, 100.000, 1.000.000),
// как просила Натали. Используется и при вводе суммы, и при выводе.

// Оставляет только цифры (для хранения «сырого» значения из поля ввода).
export function digitsOnly(value: string): string {
  return String(value).replace(/\D/g, '')
}

// Форматирует строку/число суммы с точками-разделителями разрядов.
// Пустая строка на входе → пустая строка на выходе (чтобы плейсхолдер
// в поле ввода не перекрывался нулём).
export function formatThousands(value: string | number): string {
  const digits = digitsOnly(String(value))
  if (digits === '') return ''
  // toLocaleString('de-DE') даёт разряды через точку.
  const n = Number(digits)
  if (!isFinite(n)) return digits
  return n.toLocaleString('de-DE')
}
