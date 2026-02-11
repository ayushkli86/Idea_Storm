-- Fix users table - Add name column if missing
-- Run this in Supabase SQL Editor if you get "name column not found" error

-- First, check if the column exists and add it if missing
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'users' 
        AND column_name = 'name'
    ) THEN
        ALTER TABLE users ADD COLUMN name VARCHAR(255) NOT NULL DEFAULT 'User';
    END IF;
END $$;

-- Verify the table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'users'
ORDER BY ordinal_position;
