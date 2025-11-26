# 🚀 GenMock AI

AI-powered mock interview platform to help students, freshers, and professionals practice real interviews with live feedback, voice input, and intelligent scoring.

GenMock AI simulates real interview experiences using AI-generated questions, speech-to-text analysis, and instant feedback — all inside a clean and intuitive interface.

---

## 📌 Features

### 🎯 AI-Generated Questions

- Dynamic interview questions based on job role, experience level, and technology stack
- Powered by Google Gemini AI for contextual, realistic question generation
- Customizable difficulty levels

### 🎙 Voice-Based Answering

- Speak directly using your microphone
- Browser Speech-to-Text converts spoken answers into text in real-time
- Natural conversation flow

### 🧠 Real-Time AI Feedback

- Intelligent scoring (0-10 scale)
- Detailed feedback on each answer
- Comparison with ideal answers
- Personalized improvement suggestions

### 📹 Webcam-Based Interface

- Optional webcam support for realistic interview simulation
- No recordings stored — privacy-first approach
- Professional interview environment

### 📊 Interview Reports

- Complete performance summary
- Question-by-question breakdown
- AI insights and recommendations
- Track progress over time

### 🔐 Secure Authentication

- Email/password authentication via Supabase Auth
- Protected routes and user sessions
- User-specific interview history
- Personalized dashboard

---

## 🛠 Tech Stack

### **Frontend**
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- shadcn/ui Components
- Radix UI
- Lucide Icons
- Dark Mode Support

### **Database & Backend**
- Supabase PostgreSQL
- Supabase Auth
- Direct SQL queries (no ORM)
- Row Level Security (RLS)

### **AI**
- Google Gemini AI (Generative AI)
- Smart question generation
- Intelligent answer evaluation

### **Media**
- react-webcam (Camera support)
- react-hook-speech-to-text (Voice recognition)

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/genmock-ai.git
cd genmock-ai
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Set up environment variables

Create a `.env` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Gemini AI
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

#### Get Your API Keys:

**Supabase:**
1. Create a project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API
3. Copy the URL and anon/public key

**Gemini AI:**
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create an API key
3. Copy and paste into `.env`

### 4️⃣ Set up the database

The database tables are already configured in Supabase:
- `mockInterview` - Stores interview details
- `userAnswer` - Stores user responses and feedback

Tables include Row Level Security (RLS) for data protection.

### 5️⃣ Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6️⃣ Build for production

```bash
npm run build
npm start
```

---

## 🎨 Key Pages

- **`/`** - Landing page with product overview
- **`/sign-up`** - Create new account
- **`/sign-in`** - Login to existing account
- **`/dashboard`** - Main dashboard with interview list
- **`/dashboard/interview/[id]`** - Interview setup page
- **`/dashboard/interview/[id]/start`** - Take the interview
- **`/dashboard/interview/[id]/feedback`** - View results and feedback

---

## 📂 Project Structure

```
/app
  ├── sign-in/          # Authentication pages
  ├── sign-up/
  ├── dashboard/        # Main app dashboard
  │   ├── _components/  # Dashboard components
  │   ├── interview/    # Interview flow
  │   ├── about/        # About page
  │   └── how-it-works/ # Guide page
  ├── layout.js         # Root layout
  └── page.js           # Landing page

/components
  ├── ui/               # Reusable UI components
  ├── theme-provider.jsx
  └── theme-toggle.jsx

/contexts
  └── AuthContext.jsx   # Authentication state

/utils
  ├── db.js             # Supabase client
  └── GeminiAIModal.js  # Gemini AI configuration

/supabase
  └── migrations/       # Database migrations

middleware.js           # Route protection
tailwind.config.js      # Tailwind configuration
```

---

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy to Netlify

```bash
npm run build
```

Upload the `.next` folder or connect your GitHub repo.

---

## 🔒 Security Features

- Row Level Security (RLS) on all database tables
- Secure authentication with Supabase Auth
- Protected routes with middleware
- No sensitive data exposed to client
- Privacy-first (no video/audio recordings stored)

---

## 🎯 How It Works

1. **Sign Up** - Create an account with email/password
2. **Create Interview** - Enter job role, tech stack, and experience level
3. **AI Generates Questions** - Gemini AI creates 5 relevant questions
4. **Take Interview** - Answer questions via microphone or text
5. **Get Feedback** - Receive AI-powered evaluation and scores
6. **Track Progress** - View all past interviews in your dashboard

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Built with ❤️ for better interview preparation

---

## 🙏 Acknowledgments

- Google Gemini AI for intelligent question generation
- Supabase for database and authentication
- shadcn/ui for beautiful components
- Next.js team for the amazing framework

---

## 📧 Support

For issues or questions, please open an issue on GitHub or contact the maintainers.

**Happy Interviewing! 🎉**
