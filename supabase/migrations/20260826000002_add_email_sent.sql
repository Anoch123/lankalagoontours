-- Add email_sent column to bookings table
-- Run this in the Supabase SQL Editor

ALTER TABLE public.bookings
ADD COLUMN IF NOT EXISTS email_sent BOOLEAN DEFAULT FALSE;
