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
