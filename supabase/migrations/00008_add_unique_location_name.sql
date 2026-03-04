-- Contrainte UNIQUE nécessaire pour le upsert dans select-location
ALTER TABLE public.businesses
  ADD CONSTRAINT businesses_google_location_name_key UNIQUE (google_location_name);
