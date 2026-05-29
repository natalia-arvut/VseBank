-- ============================================================================
-- VseBank — модерация отзывов: уведомления админам + админские права UPDATE/DELETE
-- ============================================================================

-- ---------- Триггер: при новом отзыве шлём письмо админам ----------
create or replace function public.on_review_inserted()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform net.http_post(
    url := 'https://txghgltldfsmbdcykykz.supabase.co/functions/v1/send-review-notification',
    headers := jsonb_build_object('Content-Type', 'application/json'),
    body := jsonb_build_object(
      'type', 'INSERT',
      'table', 'reviews',
      'schema', 'public',
      'record', row_to_json(NEW)::jsonb,
      'old_record', null
    )
  );
  return NEW;
end;
$$;

drop trigger if exists on_review_inserted_trigger on public.reviews;
create trigger on_review_inserted_trigger
  after insert on public.reviews
  for each row execute function public.on_review_inserted();

-- ---------- Админ может одобрять (UPDATE) и удалять (DELETE) отзывы ----------
drop policy if exists "reviews_update_admin" on public.reviews;
create policy "reviews_update_admin"
  on public.reviews for update
  using (public.is_admin());

drop policy if exists "reviews_delete_admin" on public.reviews;
create policy "reviews_delete_admin"
  on public.reviews for delete
  using (public.is_admin());
