# GenMock-AI Setup Guide

## Required Environment Variables

Add the following to your `.env` file:

```env
# Supabase (Already configured)
NEXT_PUBLIC_SUPABASE_URL=https://ikgxxrtuxrpwzdyeaftl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrZ3h4cnR1eHJwd3pkeWVhZnRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNzU1NjAsImV4cCI6MjA3OTc1MTU2MH0.QkWT93qxGDV16E3AUOdvwoOyrvjglnuh4SmICxpb84Q

# Google Gemini AI (REQUIRED - Add your key here)
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

## Get Your Gemini API Key

1. Go to: https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key and paste it in `.env` file

## What's Working

✅ **Database**: Supabase PostgreSQL
- Tables: `mockInterview`, `userAnswer`
- Fast connection pooling
- Indexed for performance

✅ **Authentication**: Supabase Auth
- Email/password sign up/sign in
- Protected routes
- No external dependencies

✅ **AI**: Google Gemini
- Generate interview questions
- Provide feedback on answers
- Rate responses

## Running the App

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Key Features

1. **Create Mock Interviews** - Generate AI interview questions for any job role
2. **Practice Interviews** - Record answers with webcam and microphone
3. **Get Feedback** - AI-powered feedback and ratings on your answers
4. **Track Progress** - View all your past interviews and improvements

## Tech Stack

- **Framework**: Next.js 14
- **Database**: Supabase
- **Auth**: Supabase Auth
- **AI**: Google Gemini
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui

## File Structure

```
/app
  /sign-in          # Login page
  /sign-up          # Register page
  /dashboard        # Main dashboard
    /_components    # Dashboard components
    /interview      # Interview pages
      /[id]         # Interview detail
      /[id]/start   # Take interview
      /[id]/feedback # View results

/contexts
  AuthContext.jsx   # Auth state management

/utils
  db.js            # Supabase client
  GeminiAIModal.js # Gemini AI setup

middleware.js      # Route protection
```

## Notes

- No Clerk (removed - was slow)
- No Drizzle ORM (removed - unnecessary)
- No Neon Database (removed - migrated to Supabase)
- Clean, fast, minimal dependencies
