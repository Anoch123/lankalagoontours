-- Add needs_tuk_tuk column to bookings table
-- Run this in the Supabase SQL Editor

ALTER TABLE public.bookings
ADD COLUMN IF NOT EXISTS needs_tuk_tuk BOOLEAN DEFAULT FALSE;
