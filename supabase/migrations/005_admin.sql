-- ============================================================================
-- VseBank — админ-доступ к агрегированной аналитике
--
-- Добавляет колонку profiles.is_admin и RLS-политики, разрешающие админу
-- читать все profiles / transfers / reviews. Все остальные пользователи
-- по-прежнему видят только свои данные.
--
-- Админ-доступ выдаётся по списку email-ов (см. ниже). Список применяется:
--   1) сразу — UPDATE для уже существующих пользователей
--   2) автоматически при будущих регистрациях через handle_new_user
-- ============================================================================

-- ---------- Колонка is_admin ----------
alter table public.profiles
  add column if not exists is_admin boolean not null default false;

-- ---------- Список админов ----------
-- При добавлении нового админа: дописать email сюда И в handle_new_user ниже.
update public.profiles
   set is_admin = true
 where lower(email) in ('nk@arvut.ch', 'genzel@energy-tec.org', 'gv1970@gmail.com');

-- ---------- Хелпер is_admin() ----------
-- SECURITY DEFINER нужен, чтобы политики RLS на profiles не зацикливались
-- (подзапрос обходит RLS, читает is_admin напрямую от лица владельца функции).
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(
    (select is_admin from public.profiles where id = auth.uid()),
    false
  );
$$;

-- ---------- RLS-политики для админа ----------
-- profiles: админ видит всех
drop policy if exists "profiles_select_admin" on public.profiles;
create policy "profiles_select_admin"
  on public.profiles for select
  using (public.is_admin());

-- transfers: админ видит все переводы
drop policy if exists "transfers_select_admin" on public.transfers;
create policy "transfers_select_admin"
  on public.transfers for select
  using (public.is_admin());

-- reviews: админ видит все отзывы (включая не одобренные)
drop policy if exists "reviews_select_admin" on public.reviews;
create policy "reviews_select_admin"
  on public.reviews for select
  using (public.is_admin());

-- ---------- Обновлённый handle_new_user ----------
-- При регистрации пользователя с email из списка админов is_admin сразу = true.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id, first_name, last_name, company_reg_number, birth_date, gender,
    email, country, account_type, account_number, is_admin
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
    ),
    lower(new.email) in ('nk@arvut.ch', 'genzel@energy-tec.org', 'gv1970@gmail.com')
  );
  return new;
end;
$$;
