# 🚀 Deployment Guide - GenMock AI

Complete step-by-step guide to deploy your GenMock AI application to production.

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure:
- [x] Application builds successfully (`npm run build`)
- [x] All features tested locally
- [x] Database migrations applied in Supabase
- [x] Environment variables ready
- [x] Git repository initialized

---

## 🌐 Option 1: Deploy to Vercel (Recommended)

Vercel is the recommended platform for Next.js applications. It provides automatic deployments, edge functions, and excellent performance.

### Step 1: Prepare Your Repository

1. **Initialize Git (if not already done)**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - GenMock AI ready for deployment"
   ```

2. **Push to GitHub**
   ```bash
   # Create a new repository on GitHub first
   git remote add origin https://github.com/yourusername/genmock-ai.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Your Project**
   - Click "Add New" → "Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (leave as default)
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `.next` (auto-filled)

4. **Add Environment Variables**
   Click "Environment Variables" and add:

   ```
   NEXT_PUBLIC_SUPABASE_URL = https://ikgxxrtuxrpwzdyeaftl.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_anon_key
   NEXT_PUBLIC_GEMINI_API_KEY = your_gemini_api_key
   NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT = 5
   ```

   **IMPORTANT:** Copy these from your `.env` file!

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Step 3: Configure Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

---

## 🔧 Option 2: Deploy to Netlify

### Step 1: Prepare Build

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Push to GitHub** (same as Vercel steps above)

### Step 2: Deploy to Netlify

1. **Go to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Sign in with GitHub

2. **Import Project**
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - **Important:** Add these environment variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   NEXT_PUBLIC_GEMINI_API_KEY
   NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT
   ```

4. **Deploy Site**
   - Click "Deploy site"
   - Your site will be live in 2-3 minutes

---

## 🗄️ Database Setup (Already Complete)

Your Supabase database is already configured with:

- ✅ `mockInterview` table
- ✅ `userAnswer` table
- ✅ `subscriptions` table
- ✅ Row Level Security (RLS) enabled
- ✅ Performance indexes
- ✅ Authentication configured

**No additional database setup needed!**

---

## 🔐 Environment Variables Reference

Make sure these are set in your deployment platform:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJhbG...` |
| `NEXT_PUBLIC_GEMINI_API_KEY` | Google Gemini API key | `AIzaSy...` |
| `NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT` | Number of questions per interview | `5` |

---

## ✅ Post-Deployment Verification

After deployment, test these features:

1. **Authentication**
   - [ ] Sign up with new account
   - [ ] Sign in with existing account
   - [ ] Sign out
   - [ ] Session persists on page refresh

2. **Interview Creation**
   - [ ] Create new mock interview
   - [ ] AI generates questions successfully
   - [ ] Interview appears in dashboard

3. **Interview Functionality**
   - [ ] Webcam activates correctly
   - [ ] Microphone captures audio
   - [ ] Speech-to-text works
   - [ ] Feedback is generated
   - [ ] Results saved to database

4. **Pricing Modal**
   - [ ] Upgrade button appears in navigation
   - [ ] Pricing modal opens correctly
   - [ ] Free and Premium tiers displayed

5. **Performance**
   - [ ] Pages load quickly
   - [ ] No console errors
   - [ ] Mobile responsive

---

## 🐛 Troubleshooting

### Build Fails

**Error:** `Module not found`
- **Solution:** Run `npm install` locally and ensure `package-lock.json` is committed

**Error:** `Environment variable not found`
- **Solution:** Verify all env variables are set in deployment platform

### Authentication Issues

**Error:** `Invalid API key`
- **Solution:** Double-check Supabase URL and anon key in env variables

**Error:** `Session not persisting`
- **Solution:** Ensure cookies are enabled and deployment platform supports them

### Database Connection

**Error:** `Failed to fetch from Supabase`
- **Solution:** Check if Supabase project is active and RLS policies are correct

### AI Generation Fails

**Error:** `Gemini API error`
- **Solution:** Verify Gemini API key is valid and has quota remaining

---

## 🎯 Production Optimization Tips

1. **Enable Vercel Analytics** (if using Vercel)
   - Go to project settings
   - Enable "Analytics"
   - Monitor performance and user behavior

2. **Set Up Domain**
   - Purchase a custom domain
   - Point DNS to your deployment
   - Enable HTTPS (automatic on Vercel/Netlify)

3. **Monitor Errors**
   - Set up error tracking (Sentry, LogRocket)
   - Monitor Supabase dashboard for database issues

4. **Optimize Images**
   - All images already optimized with Next.js Image component

5. **Enable Caching**
   - Automatic on Vercel/Netlify
   - No additional configuration needed

---

## 📊 Monitoring & Maintenance

### What to Monitor

1. **Supabase Dashboard**
   - Database usage
   - Authentication activity
   - API requests

2. **Vercel/Netlify Dashboard**
   - Build status
   - Deployment logs
   - Performance metrics

3. **Gemini AI Quota**
   - Check usage in Google AI Studio
   - Monitor remaining quota

### Regular Maintenance

- Review error logs weekly
- Check database performance
- Update dependencies monthly
- Monitor user feedback

---

## 🎉 Success!

Your GenMock AI application is now live and ready to help users practice interviews!

**Next Steps:**
1. Share your deployment URL
2. Test all features in production
3. Monitor analytics and user feedback
4. Plan for Stripe payment integration (next phase)

---

## 🆘 Need Help?

If you encounter issues during deployment:

1. Check deployment logs in Vercel/Netlify dashboard
2. Verify all environment variables are set correctly
3. Test the build locally with `npm run build`
4. Check Supabase logs for database errors

**Your deployment URL will be:**
- Vercel: `https://your-project-name.vercel.app`
- Netlify: `https://your-project-name.netlify.app`

---

**Deployment completed successfully! 🚀**
