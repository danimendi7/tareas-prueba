-- Tareas de cada usuario. El acceso se limita por RLS al propietario.
create table public.tareas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  titulo text not null check (char_length(titulo) between 1 and 120),
  hecha boolean not null default false,
  creada timestamptz not null default now()
);

create index tareas_user_id_creada_idx on public.tareas (user_id, creada desc);

alter table public.tareas enable row level security;

-- Solo los usuarios con sesión usan la tabla; el rol anónimo no tiene acceso.
revoke all on table public.tareas from anon;
grant select, insert, update, delete on table public.tareas to authenticated;

create policy "tareas_select_propias" on public.tareas
  for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "tareas_insert_propias" on public.tareas
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "tareas_update_propias" on public.tareas
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "tareas_delete_propias" on public.tareas
  for delete to authenticated
  using ((select auth.uid()) = user_id);
