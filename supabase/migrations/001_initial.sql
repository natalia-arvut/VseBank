-- ============================================================================
-- VseBank — начальная схема БД
-- Выполнить один раз в Supabase SQL Editor.
-- Создаёт таблицы profiles и transfers, включает Row Level Security,
-- настраивает политики доступа и триггер автозаполнения профиля при регистрации.
-- ============================================================================

-- ---------- Таблица profiles ----------
-- Привязана к auth.users через id (1-к-1). Здесь храним всё, что НЕ авторизация.
create table if not exists public.profiles (
  id                    uuid primary key references auth.users(id) on delete cascade,
  first_name            text not null,
  last_name             text,
  company_reg_number    text,
  birth_date            date,
  gender                text,
  email                 text not null,
  country               text not null,
  account_type          text not null check (account_type in ('personal', 'company')),
  account_number        text not null unique,
  registered_at         timestamptz not null default now()
);

-- ---------- Таблица transfers ----------
create table if not exists public.transfers (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  amount      text not null,
  currency    text not null,
  type        text not null,
  timing      text not null,
  status      text not null default 'pending' check (status in ('pending', 'completed')),
  created_at  timestamptz not null default now()
);

create index if not exists transfers_user_id_idx on public.transfers(user_id);
create index if not exists transfers_created_at_idx on public.transfers(created_at desc);

-- ---------- Row Level Security ----------
alter table public.profiles  enable row level security;
alter table public.transfers enable row level security;

-- Политики profiles: пользователь видит и правит только свой профиль
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- Политики transfers: пользователь видит и создаёт только свои переводы
drop policy if exists "transfers_select_own" on public.transfers;
create policy "transfers_select_own"
  on public.transfers for select
  using (auth.uid() = user_id);

drop policy if exists "transfers_insert_own" on public.transfers;
create policy "transfers_insert_own"
  on public.transfers for insert
  with check (auth.uid() = user_id);

-- ---------- Триггер: создаём профиль автоматически при регистрации ----------
-- Данные профиля передаются через raw_user_meta_data при auth.signUp
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id, first_name, last_name, company_reg_number, birth_date, gender,
    email, country, account_type, account_number
  ) values (
    new.id,
    coalesce(new.raw_user_meta_data->>'first_name', ''),
    nullif(new.raw_user_meta_data->>'last_name', ''),
    nullif(new.raw_user_meta_data->>'company_reg_number', ''),
    nullif(new.raw_user_meta_data->>'birth_date', '')::date,
    nullif(new.raw_user_meta_data->>'gender', ''),
    new.email,
    coalesce(new.raw_user_meta_data->>'country', ''),
    coalesce(new.raw_user_meta_data->>'account_type', 'personal'),
    coalesce(
      new.raw_user_meta_data->>'account_number',
      'VBI-' || to_char(extract(epoch from now())::bigint, 'FM0000000000')
    )
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
