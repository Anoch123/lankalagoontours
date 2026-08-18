-- Add guest_pricing column to boat_tours table
-- Run this in the Supabase SQL Editor

ALTER TABLE public.boat_tours
ADD COLUMN IF NOT EXISTS guest_pricing JSONB DEFAULT '[]'::jsonb;
