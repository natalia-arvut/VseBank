import { supabase } from './supabase'

// ─────────────────────────────────────────────────────────
// Локальное хранение реквизитов
//
// Банковские реквизиты пользователей НЕ хранятся на сервере.
// IBAN, BIC, имя получателя и название банка — всё лежит
// только в браузере пользователя (localStorage).
//
// При смене устройства или очистке кэша браузера эти данные
// исчезнут — это особенность подхода «приватность по умолчанию».
// ─────────────────────────────────────────────────────────

export interface Requisite {
  id: string
  label: string
  recipientName: string
  bankName: string
  iban: string
  bic: string
  createdAt: string
}

const KEY_PREFIX = 'vsebank_requisites_'
const ANONYMOUS_KEY = `${KEY_PREFIX}anonymous`

// Ключ localStorage привязан к user_id из текущей Supabase-сессии,
// чтобы у разных пользователей на одном устройстве были разные списки.
async function getStorageKey(): Promise<string> {
  try {
    const { data } = await supabase.auth.getUser()
    const userId = data.user?.id
    return userId ? `${KEY_PREFIX}${userId}` : ANONYMOUS_KEY
  } catch {
    return ANONYMOUS_KEY
  }
}

function readList(key: string): Requisite[] {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return []
    const arr = JSON.parse(raw)
    if (!Array.isArray(arr)) return []
    // Фильтруем мусор — нужны хотя бы id и iban
    return arr.filter((r: unknown): r is Requisite => {
      if (!r || typeof r !== 'object') return false
      const obj = r as Record<string, unknown>
      return typeof obj.id === 'string' && typeof obj.iban === 'string'
    })
  } catch {
    return []
  }
}

function writeList(key: string, list: Requisite[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(list))
  } catch {
    // localStorage может быть переполнен или отключён — тихо игнорируем
  }
}

function newId(): string {
  // crypto.randomUUID доступен во всех современных браузерах
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  // фоллбек для очень старых браузеров
  return `req_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

export async function fetchRequisites(): Promise<Requisite[]> {
  const key = await getStorageKey()
  const list = readList(key)
  // Новые — сверху
  return [...list].sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
}

export async function saveRequisite(
  input: Omit<Requisite, 'id' | 'createdAt'>
): Promise<{ ok: boolean; data?: Requisite; error?: string }> {
  if (!input.iban || !input.recipientName) {
    return { ok: false, error: 'Заполни имя получателя и IBAN' }
  }
  const key = await getStorageKey()
  const list = readList(key)
  const item: Requisite = {
    id: newId(),
    label: input.label || input.recipientName,
    recipientName: input.recipientName,
    bankName: input.bankName || '',
    iban: input.iban,
    bic: input.bic || '',
    createdAt: new Date().toISOString(),
  }
  writeList(key, [item, ...list])
  return { ok: true, data: item }
}

export async function updateRequisite(
  id: string,
  input: Omit<Requisite, 'id' | 'createdAt'>
): Promise<{ ok: boolean; data?: Requisite; error?: string }> {
  const key = await getStorageKey()
  const list = readList(key)
  const idx = list.findIndex(r => r.id === id)
  if (idx === -1) return { ok: false, error: 'Реквизиты не найдены' }
  const updated: Requisite = {
    ...list[idx],
    label: input.label || input.recipientName,
    recipientName: input.recipientName,
    bankName: input.bankName || '',
    iban: input.iban,
    bic: input.bic || '',
  }
  const next = [...list]
  next[idx] = updated
  writeList(key, next)
  return { ok: true, data: updated }
}

export async function deleteRequisite(id: string): Promise<{ ok: boolean; error?: string }> {
  const key = await getStorageKey()
  const list = readList(key)
  const next = list.filter(r => r.id !== id)
  writeList(key, next)
  return { ok: true }
}
