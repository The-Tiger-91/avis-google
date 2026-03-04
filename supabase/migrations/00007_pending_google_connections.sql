CREATE TABLE IF NOT EXISTS public.pending_google_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  locations JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.pending_google_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own pending connections"
  ON public.pending_google_connections
  FOR ALL USING (auth.uid() = user_id);
