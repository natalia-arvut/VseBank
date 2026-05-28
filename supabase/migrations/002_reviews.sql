-- ============================================================================
-- VseBank — таблица отзывов и Storage bucket для изображений
-- ============================================================================

create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  author_name text not null,
  text        text not null,
  image_url   text,
  approved    boolean not null default false,
  created_at  timestamptz not null default now()
);

create index if not exists reviews_approved_created_idx
  on public.reviews(approved, created_at desc);
create index if not exists reviews_user_idx on public.reviews(user_id);

alter table public.reviews enable row level security;

-- Все авторизованные пользователи видят одобренные отзывы + свои собственные
drop policy if exists "reviews_select_approved_or_own" on public.reviews;
create policy "reviews_select_approved_or_own"
  on public.reviews for select
  using (approved = true or auth.uid() = user_id);

-- Пользователь добавляет отзыв только от своего имени
drop policy if exists "reviews_insert_own" on public.reviews;
create policy "reviews_insert_own"
  on public.reviews for insert
  with check (auth.uid() = user_id);

-- Пользователь может править/удалять только свои отзывы (до модерации)
drop policy if exists "reviews_update_own" on public.reviews;
create policy "reviews_update_own"
  on public.reviews for update
  using (auth.uid() = user_id);

drop policy if exists "reviews_delete_own" on public.reviews;
create policy "reviews_delete_own"
  on public.reviews for delete
  using (auth.uid() = user_id);
