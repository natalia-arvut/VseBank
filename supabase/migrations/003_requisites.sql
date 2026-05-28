-- ============================================================================
-- VseBank — таблица сохранённых реквизитов пользователя
-- ============================================================================

create table if not exists public.requisites (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  label           text not null,
  recipient_name  text not null,
  bank_name       text,
  iban            text not null,
  bic             text,
  created_at      timestamptz not null default now()
);

create index if not exists requisites_user_idx on public.requisites(user_id, created_at desc);

alter table public.requisites enable row level security;

drop policy if exists "requisites_select_own" on public.requisites;
create policy "requisites_select_own"
  on public.requisites for select
  using (auth.uid() = user_id);

drop policy if exists "requisites_insert_own" on public.requisites;
create policy "requisites_insert_own"
  on public.requisites for insert
  with check (auth.uid() = user_id);

drop policy if exists "requisites_update_own" on public.requisites;
create policy "requisites_update_own"
  on public.requisites for update
  using (auth.uid() = user_id);

drop policy if exists "requisites_delete_own" on public.requisites;
create policy "requisites_delete_own"
  on public.requisites for delete
  using (auth.uid() = user_id);
