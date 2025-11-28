/*
  # Add Performance Indexes

  1. Performance Improvements
    - Add index on mockInterview.mockId for faster lookups
    - Add index on mockInterview.createdBy for user-specific queries
    - Add index on userAnswer.mockId for feedback queries
    - Add index on userAnswer.userEmail for user-specific queries
    - Add composite index on userAnswer (mockId, userEmail) for common queries

  2. Purpose
    - Dramatically improve query performance
    - Speed up interview list loading
    - Faster feedback retrieval
    - Optimize user-specific data access
*/

-- Add indexes for mockInterview table
CREATE INDEX IF NOT EXISTS idx_mockInterview_mockId 
  ON "mockInterview"("mockId");

CREATE INDEX IF NOT EXISTS idx_mockInterview_createdBy 
  ON "mockInterview"("createdBy");

CREATE INDEX IF NOT EXISTS idx_mockInterview_createdAt 
  ON "mockInterview"("createdAt" DESC);

-- Add indexes for userAnswer table
CREATE INDEX IF NOT EXISTS idx_userAnswer_mockId 
  ON "userAnswer"("mockId");

CREATE INDEX IF NOT EXISTS idx_userAnswer_userEmail 
  ON "userAnswer"("userEmail");

CREATE INDEX IF NOT EXISTS idx_userAnswer_composite 
  ON "userAnswer"("mockId", "userEmail");

-- Add index for timestamp-based queries
CREATE INDEX IF NOT EXISTS idx_userAnswer_createdAt 
  ON "userAnswer"("createdAt" DESC);
