-- Apply AFTER setup.sql in the intended Supabase project's SQL Editor.
-- Content is public only after publishing. All writes require an admin/staff role.
begin;

create table if not exists public.storefront_documents (
  id text primary key check (id in ('draft', 'published')),
  content jsonb,
  version integer not null default 0,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);
alter table public.storefront_documents enable row level security;
drop policy if exists storefront_content_read on public.storefront_documents;
create policy storefront_content_read on public.storefront_documents
  for select to anon, authenticated
  using (id = 'published' or (select public.has_admin_access()));
revoke all on public.storefront_documents from anon, authenticated;
grant select on public.storefront_documents to anon, authenticated;

-- Use one transaction and a revision check to prevent accidental lost updates.
create or replace function public.save_storefront_content(
  p_id text, p_content jsonb, p_expected_version integer
) returns jsonb
language plpgsql security definer set search_path = ''
as $$
declare
  current_version integer;
  saved public.storefront_documents;
begin
  if not public.has_admin_access() then
    raise exception 'Store administrator access is required.' using errcode = '42501';
  end if;
  if p_id is null or p_id not in ('draft', 'published') then
    raise exception 'Unsupported content document.';
  end if;
  if p_content is null or jsonb_typeof(p_content) <> 'object'
    or (p_content->>'schema') is distinct from '1'
    or jsonb_typeof(p_content->'homepage') is distinct from 'object'
    or jsonb_typeof(p_content->'categories') is distinct from 'array'
    or jsonb_typeof(p_content->'products') is distinct from 'array'
    or jsonb_typeof(p_content->'banners') is distinct from 'array'
    or jsonb_typeof(p_content->'promotions') is distinct from 'array'
    or octet_length(p_content::text) > 8388608 then
    raise exception 'Invalid or oversized store content.';
  end if;
  insert into public.storefront_documents(id) values(p_id) on conflict (id) do nothing;
  select version into current_version from public.storefront_documents where id = p_id for update;
  if p_expected_version is distinct from current_version then
    raise exception 'Another editor saved changes. Download a backup, reload, and try again.' using errcode = '40001';
  end if;
  update public.storefront_documents
    set content = p_content, version = current_version + 1,
        updated_at = now(), updated_by = auth.uid()
    where id = p_id returning * into saved;
  return jsonb_build_object('content', saved.content, 'version', saved.version);
end;
$$;
revoke all on function public.save_storefront_content(text,jsonb,integer) from public, anon;
grant execute on function public.save_storefront_content(text,jsonb,integer) to authenticated;

insert into storage.buckets(id, name, public, file_size_limit, allowed_mime_types)
values ('storefront-media', 'storefront-media', true, 5242880,
  array['image/jpeg','image/png','image/webp','image/gif','image/avif'])
on conflict(id) do update set public = true, file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists storefront_media_admin_insert on storage.objects;
create policy storefront_media_admin_insert on storage.objects
  for insert to authenticated
  with check (bucket_id = 'storefront-media' and (select public.has_admin_access()));
drop policy if exists storefront_media_admin_select on storage.objects;
create policy storefront_media_admin_select on storage.objects
  for select to authenticated
  using (bucket_id = 'storefront-media' and (select public.has_admin_access()));

commit;
