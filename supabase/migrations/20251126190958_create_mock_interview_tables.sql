/*
  # Create Mock Interview Tables

  1. New Tables
    - `mockInterview`
      - `id` (serial, primary key)
      - `jsonMockResp` (text, not null) - Stores AI-generated interview questions in JSON format
      - `jobPosition` (varchar, not null) - Job title/role for the interview
      - `jobDesc` (varchar, not null) - Job description and tech stack
      - `jobExperience` (varchar, not null) - Years of experience required
      - `createdBy` (varchar, not null) - User email who created the interview
      - `createdAt` (varchar) - Creation date
      - `mockId` (varchar, not null) - Unique identifier for the interview
    
    - `userAnswer`
      - `id` (serial, primary key)
      - `mockId` (varchar, not null) - Reference to mockInterview
      - `question` (varchar, not null) - Interview question asked
      - `correctAns` (text) - Expected/correct answer
      - `userAns` (text) - User's recorded answer
      - `feedback` (text) - AI-generated feedback on the answer
      - `rating` (varchar) - Rating score for the answer
      - `userEmail` (varchar) - User email who gave the answer
      - `createdAt` (varchar) - Answer submission date

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
*/

-- Create mockInterview table
CREATE TABLE IF NOT EXISTS "mockInterview" (
  id SERIAL PRIMARY KEY,
  "jsonMockResp" TEXT NOT NULL,
  "jobPosition" VARCHAR NOT NULL,
  "jobDesc" VARCHAR NOT NULL,
  "jobExperience" VARCHAR NOT NULL,
  "createdBy" VARCHAR NOT NULL,
  "createdAt" VARCHAR,
  "mockId" VARCHAR NOT NULL
);

-- Create userAnswer table
CREATE TABLE IF NOT EXISTS "userAnswer" (
  id SERIAL PRIMARY KEY,
  "mockId" VARCHAR NOT NULL,
  question VARCHAR NOT NULL,
  "correctAns" TEXT,
  "userAns" TEXT,
  feedback TEXT,
  rating VARCHAR,
  "userEmail" VARCHAR,
  "createdAt" VARCHAR
);

-- Enable RLS
ALTER TABLE "mockInterview" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "userAnswer" ENABLE ROW LEVEL SECURITY;

-- RLS Policies for mockInterview
CREATE POLICY "Users can view their own interviews"
  ON "mockInterview" FOR SELECT
  TO authenticated
  USING ("createdBy" = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Users can insert their own interviews"
  ON "mockInterview" FOR INSERT
  TO authenticated
  WITH CHECK ("createdBy" = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Users can update their own interviews"
  ON "mockInterview" FOR UPDATE
  TO authenticated
  USING ("createdBy" = current_setting('request.jwt.claims', true)::json->>'email')
  WITH CHECK ("createdBy" = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Users can delete their own interviews"
  ON "mockInterview" FOR DELETE
  TO authenticated
  USING ("createdBy" = current_setting('request.jwt.claims', true)::json->>'email');

-- RLS Policies for userAnswer
CREATE POLICY "Users can view their own answers"
  ON "userAnswer" FOR SELECT
  TO authenticated
  USING ("userEmail" = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Users can insert their own answers"
  ON "userAnswer" FOR INSERT
  TO authenticated
  WITH CHECK ("userEmail" = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Users can update their own answers"
  ON "userAnswer" FOR UPDATE
  TO authenticated
  USING ("userEmail" = current_setting('request.jwt.claims', true)::json->>'email')
  WITH CHECK ("userEmail" = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Users can delete their own answers"
  ON "userAnswer" FOR DELETE
  TO authenticated
  USING ("userEmail" = current_setting('request.jwt.claims', true)::json->>'email');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_mockInterview_createdBy ON "mockInterview"("createdBy");
CREATE INDEX IF NOT EXISTS idx_mockInterview_mockId ON "mockInterview"("mockId");
CREATE INDEX IF NOT EXISTS idx_userAnswer_mockId ON "userAnswer"("mockId");
CREATE INDEX IF NOT EXISTS idx_userAnswer_userEmail ON "userAnswer"("userEmail");