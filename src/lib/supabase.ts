import { createClient } from '@supabase/supabase-js'

// Клиент Supabase для фронта — использует publishable key (безопасно для клиента)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase: не заданы VITE_SUPABASE_URL или VITE_SUPABASE_PUBLISHABLE_KEY в .env')
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
})

// Типы строк в БД — соответствуют таблицам profiles и transfers
export interface ProfileRow {
  id: string
  first_name: string
  last_name: string | null
  company_reg_number: string | null
  birth_date: string | null
  gender: string | null
  email: string
  country: string
  account_type: 'personal' | 'company'
  account_number: string
  registered_at: string
}

export interface TransferRow {
  id: string
  user_id: string
  amount: string
  currency: string
  type: string
  timing: string
  status: 'pending' | 'completed'
  created_at: string
}
