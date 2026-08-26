-- Add payment tracking columns to bookings table
-- Run this in the Supabase SQL Editor

ALTER TABLE public.bookings
ADD COLUMN IF NOT EXISTS payment_received_from_customer BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS commission_received_from_partner BOOLEAN DEFAULT FALSE;
