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
