ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS photo_urls text[] DEFAULT '{}';
