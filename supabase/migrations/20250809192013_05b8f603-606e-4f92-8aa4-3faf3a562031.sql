-- Create profiles table for user data
create table if not exists public.profiles (
  id uuid not null primary key references auth.users(id) on delete cascade,
  display_name text,
  username text unique,
  avatar_url text,
  bio text,
  website text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Timestamps updater function (idempotent)
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger for automatic updated_at
create or replace trigger update_profiles_updated_at
before update on public.profiles
for each row execute function public.update_updated_at_column();

-- Policies
create policy if not exists "Profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy if not exists "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy if not exists "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy if not exists "Users can delete their own profile"
  on public.profiles for delete
  using (auth.uid() = id);

-- Function to handle new users and create their profile
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (new.id, new.raw_user_meta_data ->> 'name', new.raw_user_meta_data ->> 'avatar_url')
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Trigger to run after a new auth user is created
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();