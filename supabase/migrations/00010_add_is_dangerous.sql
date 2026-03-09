ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS is_dangerous boolean DEFAULT false;
