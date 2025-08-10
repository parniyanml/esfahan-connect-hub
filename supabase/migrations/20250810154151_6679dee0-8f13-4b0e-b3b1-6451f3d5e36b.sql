-- Enable required extension for UUIDs
create extension if not exists pgcrypto;

-- ========== ROLES ==========
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE public.app_role AS ENUM ('admin', 'publisher', 'user');
  END IF;
END$$;

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

-- SECURITY DEFINER helper to check role (avoids RLS recursion)
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  );
$$;

-- RLS: Only admins can see all roles; users can view their roles; users can upsert their own 'publisher' request, admins can manage all
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='user_roles' AND policyname='Users can view their roles or admins view all'
  ) THEN
    CREATE POLICY "Users can view their roles or admins view all"
      ON public.user_roles FOR SELECT
      USING ( auth.uid() = user_id OR public.has_role(auth.uid(), 'admin') );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='user_roles' AND policyname='Users can insert their own publisher role request'
  ) THEN
    CREATE POLICY "Users can insert their own publisher role request"
      ON public.user_roles FOR INSERT
      WITH CHECK ( auth.uid() = user_id AND role IN ('publisher','user') );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='user_roles' AND policyname='Admins can manage all roles'
  ) THEN
    CREATE POLICY "Admins can manage all roles"
      ON public.user_roles FOR ALL
      USING ( public.has_role(auth.uid(), 'admin') )
      WITH CHECK ( public.has_role(auth.uid(), 'admin') );
  END IF;
END$$;

-- ========== PUBLISHERS ==========
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'publisher_status') THEN
    CREATE TYPE public.publisher_status AS ENUM ('pending','approved','rejected');
  END IF;
END$$;

create table if not exists public.publishers (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  phone text,
  status public.publisher_status not null default 'pending',
  logo_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.publishers enable row level security;

-- updated_at trigger function already exists; ensure hardened
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Triggers
DROP TRIGGER IF EXISTS update_publishers_updated_at ON public.publishers;
CREATE TRIGGER update_publishers_updated_at
BEFORE UPDATE ON public.publishers
FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- Indexes
create index if not exists idx_publishers_owner on public.publishers(owner_id);
create index if not exists idx_publishers_status on public.publishers(status);

-- RLS policies for publishers
DO $$
BEGIN
  -- Public can see approved publishers
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='publishers' AND policyname='Public can view approved publishers'
  ) THEN
    CREATE POLICY "Public can view approved publishers"
      ON public.publishers FOR SELECT
      USING ( status = 'approved' );
  END IF;

  -- Owners and admins can view their entries
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='publishers' AND policyname='Owners and admins can view their publishers'
  ) THEN
    CREATE POLICY "Owners and admins can view their publishers"
      ON public.publishers FOR SELECT
      USING ( owner_id = auth.uid() OR public.has_role(auth.uid(), 'admin') );
  END IF;

  -- Owners can insert their own
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='publishers' AND policyname='Users can insert their own publishers'
  ) THEN
    CREATE POLICY "Users can insert their own publishers"
      ON public.publishers FOR INSERT
      WITH CHECK ( owner_id = auth.uid() );
  END IF;

  -- Owners can update/delete their own; admins manage all
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='publishers' AND policyname='Owners or admins can modify publishers'
  ) THEN
    CREATE POLICY "Owners or admins can modify publishers"
      ON public.publishers FOR UPDATE
      USING ( owner_id = auth.uid() OR public.has_role(auth.uid(), 'admin') )
      WITH CHECK ( owner_id = auth.uid() OR public.has_role(auth.uid(), 'admin') );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='publishers' AND policyname='Owners or admins can delete publishers'
  ) THEN
    CREATE POLICY "Owners or admins can delete publishers"
      ON public.publishers FOR DELETE
      USING ( owner_id = auth.uid() OR public.has_role(auth.uid(), 'admin') );
  END IF;
END$$;

-- ========== PLACEMENTS ==========
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'placement_status') THEN
    CREATE TYPE public.placement_status AS ENUM ('draft','published','archived');
  END IF;
END$$;

create table if not exists public.placements (
  id uuid primary key default gen_random_uuid(),
  publisher_id uuid not null references public.publishers(id) on delete cascade,
  name text not null,
  size text,
  city text,
  lat double precision,
  lng double precision,
  photo_paths text[],
  price numeric,
  status public.placement_status not null default 'draft',
  availability jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.placements enable row level security;

-- Triggers
DROP TRIGGER IF EXISTS update_placements_updated_at ON public.placements;
CREATE TRIGGER update_placements_updated_at
BEFORE UPDATE ON public.placements
FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- Indexes
create index if not exists idx_placements_publisher on public.placements(publisher_id);
create index if not exists idx_placements_status on public.placements(status);
create index if not exists idx_placements_city on public.placements(city);

-- RLS policies for placements
DO $$
BEGIN
  -- Public can view published placements (and their publisher approved)
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='placements' AND policyname='Public can view published placements'
  ) THEN
    CREATE POLICY "Public can view published placements"
      ON public.placements FOR SELECT
      USING (
        status = 'published' AND EXISTS (
          SELECT 1 FROM public.publishers p
          WHERE p.id = placements.publisher_id AND p.status = 'approved'
        )
      );
  END IF;

  -- Owners/admins can view their placements
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='placements' AND policyname='Owners or admins can view their placements'
  ) THEN
    CREATE POLICY "Owners or admins can view their placements"
      ON public.placements FOR SELECT
      USING (
        EXISTS (
          SELECT 1 FROM public.publishers p
          WHERE p.id = placements.publisher_id AND (p.owner_id = auth.uid() OR public.has_role(auth.uid(),'admin'))
        )
      );
  END IF;

  -- Insert only if user owns the publisher
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='placements' AND policyname='Owners can insert placements'
  ) THEN
    CREATE POLICY "Owners can insert placements"
      ON public.placements FOR INSERT
      WITH CHECK (
        EXISTS (
          SELECT 1 FROM public.publishers p
          WHERE p.id = placements.publisher_id AND p.owner_id = auth.uid()
        )
      );
  END IF;

  -- Update/Delete only owner or admin
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='placements' AND policyname='Owners or admins can modify placements'
  ) THEN
    CREATE POLICY "Owners or admins can modify placements"
      ON public.placements FOR UPDATE
      USING (
        EXISTS (
          SELECT 1 FROM public.publishers p
          WHERE p.id = placements.publisher_id AND (p.owner_id = auth.uid() OR public.has_role(auth.uid(),'admin'))
        )
      )
      WITH CHECK (
        EXISTS (
          SELECT 1 FROM public.publishers p
          WHERE p.id = placements.publisher_id AND (p.owner_id = auth.uid() OR public.has_role(auth.uid(),'admin'))
        )
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='placements' AND policyname='Owners or admins can delete placements'
  ) THEN
    CREATE POLICY "Owners or admins can delete placements"
      ON public.placements FOR DELETE
      USING (
        EXISTS (
          SELECT 1 FROM public.publishers p
          WHERE p.id = placements.publisher_id AND (p.owner_id = auth.uid() OR public.has_role(auth.uid(),'admin'))
        )
      );
  END IF;
END$$;

-- Realtime support
ALTER TABLE public.publishers REPLICA IDENTITY FULL;
ALTER TABLE public.placements REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.publishers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.placements;

-- ========== STORAGE BUCKETS & POLICIES ==========
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'publisher-logos') THEN
    INSERT INTO storage.buckets (id, name, public) VALUES ('publisher-logos','publisher-logos', true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'placement-photos') THEN
    INSERT INTO storage.buckets (id, name, public) VALUES ('placement-photos','placement-photos', true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'documents') THEN
    INSERT INTO storage.buckets (id, name, public) VALUES ('documents','documents', false);
  END IF;
END$$;

-- Public read for public buckets
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='Public read publisher-logos'
  ) THEN
    CREATE POLICY "Public read publisher-logos"
      ON storage.objects FOR SELECT
      USING ( bucket_id = 'publisher-logos' );
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='Public read placement-photos'
  ) THEN
    CREATE POLICY "Public read placement-photos"
      ON storage.objects FOR SELECT
      USING ( bucket_id = 'placement-photos' );
  END IF;
END$$;

-- Owner write access by folder prefix = user_id
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='Owner can manage publisher-logos'
  ) THEN
    CREATE POLICY "Owner can manage publisher-logos"
      ON storage.objects FOR ALL
      USING (
        bucket_id = 'publisher-logos' AND auth.uid()::text = (storage.foldername(name))[1]
      )
      WITH CHECK (
        bucket_id = 'publisher-logos' AND auth.uid()::text = (storage.foldername(name))[1]
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='Owner can manage placement-photos'
  ) THEN
    CREATE POLICY "Owner can manage placement-photos"
      ON storage.objects FOR ALL
      USING (
        bucket_id = 'placement-photos' AND auth.uid()::text = (storage.foldername(name))[1]
      )
      WITH CHECK (
        bucket_id = 'placement-photos' AND auth.uid()::text = (storage.foldername(name))[1]
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='Owner can manage documents (private)'
  ) THEN
    CREATE POLICY "Owner can manage documents (private)"
      ON storage.objects FOR ALL
      USING (
        bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]
      )
      WITH CHECK (
        bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]
      );
  END IF;
END$$;
