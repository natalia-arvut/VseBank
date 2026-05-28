import { supabase } from './supabase'

export interface Requisite {
  id: string
  label: string
  recipientName: string
  bankName: string
  iban: string
  bic: string
  createdAt: string
}

interface RequisiteRow {
  id: string
  user_id: string
  label: string
  recipient_name: string
  bank_name: string | null
  iban: string
  bic: string | null
  created_at: string
}

function fromRow(r: RequisiteRow): Requisite {
  return {
    id: r.id,
    label: r.label,
    recipientName: r.recipient_name,
    bankName: r.bank_name || '',
    iban: r.iban,
    bic: r.bic || '',
    createdAt: r.created_at,
  }
}

export async function fetchRequisites(): Promise<Requisite[]> {
  const { data, error } = await supabase
    .from('requisites')
    .select('*')
    .order('created_at', { ascending: false })
  if (error || !data) return []
  return (data as RequisiteRow[]).map(fromRow)
}

export async function saveRequisite(input: Omit<Requisite, 'id' | 'createdAt'>): Promise<{ ok: boolean; data?: Requisite; error?: string }> {
  const { data: userData } = await supabase.auth.getUser()
  const userId = userData.user?.id
  if (!userId) return { ok: false, error: 'Нет активной сессии' }

  const { data, error } = await supabase
    .from('requisites')
    .insert({
      user_id: userId,
      label: input.label || input.recipientName,
      recipient_name: input.recipientName,
      bank_name: input.bankName || null,
      iban: input.iban,
      bic: input.bic || null,
    })
    .select()
    .single()

  if (error || !data) return { ok: false, error: error?.message || 'Ошибка сохранения' }
  return { ok: true, data: fromRow(data as RequisiteRow) }
}

export async function updateRequisite(id: string, input: Omit<Requisite, 'id' | 'createdAt'>): Promise<{ ok: boolean; data?: Requisite; error?: string }> {
  const { data, error } = await supabase
    .from('requisites')
    .update({
      label: input.label || input.recipientName,
      recipient_name: input.recipientName,
      bank_name: input.bankName || null,
      iban: input.iban,
      bic: input.bic || null,
    })
    .eq('id', id)
    .select()
    .single()

  if (error || !data) return { ok: false, error: error?.message || 'Ошибка обновления' }
  return { ok: true, data: fromRow(data as RequisiteRow) }
}

export async function deleteRequisite(id: string): Promise<{ ok: boolean; error?: string }> {
  const { error } = await supabase.from('requisites').delete().eq('id', id)
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}
