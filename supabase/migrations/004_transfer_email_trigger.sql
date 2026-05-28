-- ============================================================================
-- VseBank — триггер отправки письма после создания перевода.
-- При INSERT в public.transfers вызывает Edge Function send-transfer-email,
-- которая отправляет письмо пользователю через Resend.
-- ============================================================================

create extension if not exists pg_net with schema extensions;

create or replace function public.on_transfer_inserted()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform net.http_post(
    url := 'https://txghgltldfsmbdcykykz.supabase.co/functions/v1/send-transfer-email',
    headers := jsonb_build_object('Content-Type', 'application/json'),
    body := jsonb_build_object(
      'type', 'INSERT',
      'table', 'transfers',
      'schema', 'public',
      'record', row_to_json(NEW)::jsonb,
      'old_record', null
    )
  );
  return NEW;
end;
$$;

drop trigger if exists on_transfer_inserted_trigger on public.transfers;
create trigger on_transfer_inserted_trigger
  after insert on public.transfers
  for each row execute function public.on_transfer_inserted();
