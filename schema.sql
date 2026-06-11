-- ═══════════════════════════════════════════════════════
-- ESPAÑOL PRACTICE — DATABASE SCHEMA
-- Paste this whole file into the Supabase SQL Editor and click Run
-- ═══════════════════════════════════════════════════════

-- ── Profiles: one row per user (teacher or student) ──
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  role text not null check (role in ('teacher','student')),
  username text,
  created_at timestamptz default now()
);
alter table public.profiles enable row level security;

create policy "read own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "insert own profile" on public.profiles
  for insert with check (auth.uid() = id);
create policy "update own profile" on public.profiles
  for update using (auth.uid() = id);

-- ── Classes: created by teachers, joined by code ──
create table public.classes (
  id uuid default gen_random_uuid() primary key,
  teacher_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  class_code text unique not null,
  created_at timestamptz default now()
);
alter table public.classes enable row level security;

create policy "teachers manage own classes" on public.classes
  for all using (auth.uid() = teacher_id);

-- ── Class membership ──
create table public.class_members (
  class_id uuid references public.classes(id) on delete cascade,
  student_id uuid references public.profiles(id) on delete cascade,
  joined_at timestamptz default now(),
  primary key (class_id, student_id)
);
alter table public.class_members enable row level security;

create policy "students read own memberships" on public.class_members
  for select using (auth.uid() = student_id);
create policy "teachers read their class members" on public.class_members
  for select using (
    exists (select 1 from public.classes c
            where c.id = class_id and c.teacher_id = auth.uid())
  );
create policy "teachers remove their class members" on public.class_members
  for delete using (
    exists (select 1 from public.classes c
            where c.id = class_id and c.teacher_id = auth.uid())
  );

-- Students can read basic info about classes they belong to
create policy "students read joined classes" on public.classes
  for select using (
    exists (select 1 from public.class_members m
            where m.class_id = id and m.student_id = auth.uid())
  );

-- Teachers can read profiles (usernames) of students in their classes
create policy "teachers read their students" on public.profiles
  for select using (
    exists (
      select 1 from public.class_members m
      join public.classes c on c.id = m.class_id
      where m.student_id = profiles.id and c.teacher_id = auth.uid()
    )
  );

-- ── Results: quiz scores (minimal data) ──
create table public.results (
  id uuid default gen_random_uuid() primary key,
  student_id uuid references public.profiles(id) on delete cascade not null,
  class_id uuid references public.classes(id) on delete cascade,
  activity text not null,
  score int default 0,
  total int default 0,
  created_at timestamptz default now()
);
alter table public.results enable row level security;

create policy "students insert own results" on public.results
  for insert with check (auth.uid() = student_id);
create policy "students read own results" on public.results
  for select using (auth.uid() = student_id);
create policy "teachers read class results" on public.results
  for select using (
    exists (select 1 from public.classes c
            where c.id = class_id and c.teacher_id = auth.uid())
  );

-- ── Join a class by code (secure function) ──
create or replace function public.join_class(p_code text)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_class classes%rowtype;
begin
  select * into v_class from classes
  where upper(class_code) = upper(trim(p_code));

  if not found then
    return json_build_object('success', false, 'error', 'Class code not found');
  end if;

  insert into class_members (class_id, student_id)
  values (v_class.id, auth.uid())
  on conflict do nothing;

  return json_build_object('success', true, 'class_name', v_class.name, 'class_id', v_class.id);
end;
$$;
