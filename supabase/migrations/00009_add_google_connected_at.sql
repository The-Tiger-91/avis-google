-- Add google_connected_at to track when Google Business was first connected
ALTER TABLE businesses
  ADD COLUMN IF NOT EXISTS google_connected_at timestamptz;

-- Set existing businesses to their created_at as fallback
UPDATE businesses
  SET google_connected_at = created_at
  WHERE google_connected_at IS NULL AND google_access_token IS NOT NULL;
