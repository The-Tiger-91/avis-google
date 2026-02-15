CREATE TABLE public.businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  google_account_id TEXT,
  google_location_name TEXT,
  business_name TEXT NOT NULL,
  business_type TEXT,
  address TEXT,
  google_access_token TEXT,
  google_refresh_token TEXT,
  google_token_expires_at TIMESTAMPTZ,
  tone_preference TEXT DEFAULT 'professionnel',
  custom_instructions TEXT,
  response_mode TEXT DEFAULT 'validation' CHECK (response_mode IN ('auto', 'validation')),
  is_active BOOLEAN DEFAULT true,
  last_poll_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_businesses_user_id ON public.businesses(user_id);
CREATE INDEX idx_businesses_active ON public.businesses(is_active) WHERE is_active = true;

ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own businesses" ON public.businesses
  FOR ALL USING (auth.uid() = user_id);
