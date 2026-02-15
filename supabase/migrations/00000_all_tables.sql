-- ============================================
-- Reply Genius - Script SQL complet
-- Copie-colle tout ce fichier dans le SQL Editor de Supabase
-- puis clique "Run"
-- ============================================

-- 1. Table profiles (liée aux utilisateurs)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email,
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. Table businesses (commerces connectés)
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

-- 3. Table reviews (avis Google)
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  google_review_id TEXT NOT NULL UNIQUE,
  reviewer_name TEXT,
  reviewer_photo_url TEXT,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  review_created_at TIMESTAMPTZ,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'response_pending', 'responded', 'ignored')),
  fetched_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_reviews_business_id ON public.reviews(business_id);
CREATE INDEX idx_reviews_status ON public.reviews(status);
CREATE INDEX idx_reviews_google_id ON public.reviews(google_review_id);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view reviews for own businesses" ON public.reviews
  FOR SELECT USING (
    business_id IN (SELECT id FROM public.businesses WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can update reviews for own businesses" ON public.reviews
  FOR UPDATE USING (
    business_id IN (SELECT id FROM public.businesses WHERE user_id = auth.uid())
  );

-- 4. Table responses (réponses IA)
CREATE TABLE public.responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
  ai_generated_text TEXT NOT NULL,
  final_text TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'approved', 'published', 'failed', 'rejected')),
  published_at TIMESTAMPTZ,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_responses_review_id ON public.responses(review_id);
CREATE INDEX idx_responses_status ON public.responses(status);

ALTER TABLE public.responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage responses for own reviews" ON public.responses
  FOR ALL USING (
    review_id IN (
      SELECT r.id FROM public.reviews r
      JOIN public.businesses b ON r.business_id = b.id
      WHERE b.user_id = auth.uid()
    )
  );
