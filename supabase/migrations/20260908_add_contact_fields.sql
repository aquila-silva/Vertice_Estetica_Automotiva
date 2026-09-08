alter table public.cadastros
  add column if not exists phone text,
  add column if not exists service text;

alter table public.cadastros
  add constraint cadastros_phone_length check (phone is null or char_length(trim(phone)) between 8 and 20),
  add constraint cadastros_service_length check (service is null or char_length(trim(service)) between 1 and 60);

notify pgrst, 'reload schema';