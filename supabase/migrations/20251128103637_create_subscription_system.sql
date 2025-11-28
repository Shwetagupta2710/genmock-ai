/*
  # Create Subscription System

  1. New Tables
    - `subscriptions`
      - `id` (uuid, primary key)
      - `user_email` (text, user identifier)
      - `plan` (text, 'free' or 'premium')
      - `status` (text, 'active', 'canceled', 'expired')
      - `stripe_customer_id` (text, optional)
      - `stripe_subscription_id` (text, optional)
      - `current_period_end` (timestamptz, optional)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `subscriptions` table
    - Users can only read their own subscription data
    - Only authenticated users can access

  3. Default Behavior
    - All users start with 'free' plan
    - Free plan: 3 interviews per month
    - Premium plan: Unlimited interviews
*/

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL UNIQUE,
  plan text NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'premium')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'expired')),
  stripe_customer_id text,
  stripe_subscription_id text,
  current_period_end timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can read their own subscription
CREATE POLICY "Users can read own subscription"
  ON subscriptions
  FOR SELECT
  TO authenticated
  USING (user_email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Users can insert their own subscription (for first-time setup)
CREATE POLICY "Users can insert own subscription"
  ON subscriptions
  FOR INSERT
  TO authenticated
  WITH CHECK (user_email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Create function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON subscriptions;
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add index for fast lookups
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_email 
  ON subscriptions(user_email);
