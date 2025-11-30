/*
  # Fix RLS Security Issues and Performance

  ## Changes
  
  1. Security Fixes
    - Update all RLS policies to use subqueries for auth functions
    - Fix function search path for update_updated_at_column
    - Remove unused indexes
  
  2. Performance Improvements
    - Optimized RLS policies using (SELECT auth.<function>()) pattern
    - Removed redundant indexes that are not being used
  
  3. Details
    - All auth.uid() and current_setting() calls wrapped in subqueries
    - This prevents re-evaluation for each row
    - Significantly improves query performance at scale
*/

-- ============================================================
-- DROP OLD POLICIES
-- ============================================================

-- Drop existing mockInterview policies
DROP POLICY IF EXISTS "Users can view their own interviews" ON "mockInterview";
DROP POLICY IF EXISTS "Users can insert their own interviews" ON "mockInterview";
DROP POLICY IF EXISTS "Users can update their own interviews" ON "mockInterview";
DROP POLICY IF EXISTS "Users can delete their own interviews" ON "mockInterview";

-- Drop existing userAnswer policies
DROP POLICY IF EXISTS "Users can view their own answers" ON "userAnswer";
DROP POLICY IF EXISTS "Users can insert their own answers" ON "userAnswer";
DROP POLICY IF EXISTS "Users can update their own answers" ON "userAnswer";
DROP POLICY IF EXISTS "Users can delete their own answers" ON "userAnswer";

-- Drop existing subscription policies
DROP POLICY IF EXISTS "Users can read own subscription" ON subscriptions;
DROP POLICY IF EXISTS "Users can insert own subscription" ON subscriptions;

-- ============================================================
-- CREATE OPTIMIZED RLS POLICIES - mockInterview
-- ============================================================

CREATE POLICY "Users can view their own interviews"
  ON "mockInterview" FOR SELECT
  TO authenticated
  USING ("createdBy" = (SELECT current_setting('request.jwt.claims', true)::json->>'email'));

CREATE POLICY "Users can insert their own interviews"
  ON "mockInterview" FOR INSERT
  TO authenticated
  WITH CHECK ("createdBy" = (SELECT current_setting('request.jwt.claims', true)::json->>'email'));

CREATE POLICY "Users can update their own interviews"
  ON "mockInterview" FOR UPDATE
  TO authenticated
  USING ("createdBy" = (SELECT current_setting('request.jwt.claims', true)::json->>'email'))
  WITH CHECK ("createdBy" = (SELECT current_setting('request.jwt.claims', true)::json->>'email'));

CREATE POLICY "Users can delete their own interviews"
  ON "mockInterview" FOR DELETE
  TO authenticated
  USING ("createdBy" = (SELECT current_setting('request.jwt.claims', true)::json->>'email'));

-- ============================================================
-- CREATE OPTIMIZED RLS POLICIES - userAnswer
-- ============================================================

CREATE POLICY "Users can view their own answers"
  ON "userAnswer" FOR SELECT
  TO authenticated
  USING ("userEmail" = (SELECT current_setting('request.jwt.claims', true)::json->>'email'));

CREATE POLICY "Users can insert their own answers"
  ON "userAnswer" FOR INSERT
  TO authenticated
  WITH CHECK ("userEmail" = (SELECT current_setting('request.jwt.claims', true)::json->>'email'));

CREATE POLICY "Users can update their own answers"
  ON "userAnswer" FOR UPDATE
  TO authenticated
  USING ("userEmail" = (SELECT current_setting('request.jwt.claims', true)::json->>'email'))
  WITH CHECK ("userEmail" = (SELECT current_setting('request.jwt.claims', true)::json->>'email'));

CREATE POLICY "Users can delete their own answers"
  ON "userAnswer" FOR DELETE
  TO authenticated
  USING ("userEmail" = (SELECT current_setting('request.jwt.claims', true)::json->>'email'));

-- ============================================================
-- CREATE OPTIMIZED RLS POLICIES - subscriptions
-- ============================================================

CREATE POLICY "Users can read own subscription"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (user_email = (SELECT (SELECT current_setting('request.jwt.claims', true)::json->>'email')));

CREATE POLICY "Users can insert own subscription"
  ON subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (user_email = (SELECT (SELECT current_setting('request.jwt.claims', true)::json->>'email')));

-- ============================================================
-- FIX FUNCTION SEARCH PATH
-- ============================================================

-- Recreate update_updated_at_column function with immutable search path
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate trigger
DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON subscriptions;
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- REMOVE UNUSED INDEXES
-- ============================================================

-- Remove unused indexes that are not being utilized
DROP INDEX IF EXISTS idx_userAnswer_userEmail;
DROP INDEX IF EXISTS idx_mockInterview_createdAt;
DROP INDEX IF EXISTS idx_userAnswer_composite;
DROP INDEX IF EXISTS idx_userAnswer_createdAt;
DROP INDEX IF EXISTS idx_subscriptions_user_email;

-- Keep only the indexes that are actively used
-- idx_mockInterview_mockId - Used for interview lookups
-- idx_mockInterview_createdBy - Used for user interview lists
-- idx_userAnswer_mockId - Used for feedback queries
