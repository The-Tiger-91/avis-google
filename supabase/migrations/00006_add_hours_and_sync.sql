-- Horaires Google Business (stockés tels quels depuis l'API)
ALTER TABLE public.businesses
  ADD COLUMN IF NOT EXISTS business_hours JSONB DEFAULT NULL;

-- Suivi du sync initial (pour distinguer premier sync vs incrémental)
ALTER TABLE public.businesses
  ADD COLUMN IF NOT EXISTS initial_sync_done BOOLEAN DEFAULT FALSE;
