"use client";

import React from "react";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Mic,
  MessageSquare,
  Sparkles,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden text-center min-h-[90vh] flex flex-col justify-center px-4 sm:px-6 py-16 bg-gradient-to-b from-white via-indigo-50/30 to-white dark:from-gray-900 dark:via-indigo-950/30 dark:to-gray-900">
        {/* Gradient Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute w-[800px] h-[800px] top-[-300px] left-[-200px] bg-gradient-to-br from-indigo-400/30 via-indigo-300/20 to-purple-400/30 blur-[250px] rounded-full animate-pulse" />
          <div
            className="absolute w-[900px] h-[900px] bottom-[-300px] right-[-250px] bg-gradient-to-tl from-indigo-400/20 via-purple-300/20 to-indigo-400/30 blur-[240px] rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.95),rgba(255,255,255,0.7)_50%,transparent_80%)] dark:bg-[radial-gradient(circle_at_50%_30%,rgba(15,15,30,0.95),rgba(15,15,30,0.7)_50%,transparent_80%)]" />
        </div>

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 border border-indigo-200/50 dark:border-indigo-800/50 rounded-full text-sm font-medium text-indigo-700 dark:text-indigo-300 shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>Your AI Interview Coach</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-gray-900 dark:text-white max-w-5xl mx-auto leading-tight tracking-tight px-2">
            Ace Your Next Interview with{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent animate-gradient">
              GenMock AI
            </span>
          </h1>
        </div>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-6 px-2 font-light">
          Practice with AI. Improve instantly. Boost your confidence.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10 sm:mt-12 w-full max-w-md sm:max-w-none mx-auto px-2">
          <Link href="/dashboard" className="w-full sm:w-auto group">
            <Button className="w-full sm:w-auto px-8 py-6 sm:py-7 text-lg sm:text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
              Start Mock Interview
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Link href="#features" className="w-full sm:w-auto group">
            <Button
              variant="outline"
              className="w-full sm:w-auto px-8 py-6 sm:py-7 text-lg sm:text-xl font-semibold 
               border-2 border-gray-300 dark:border-gray-700 
               hover:border-indigo-600 dark:hover:border-indigo-400 
               bg-white dark:bg-gray-900 
               hover:bg-purple-600 dark:hover:bg-gray-800 
               transition-all shadow-md hover:shadow-lg 
               transform hover:scale-105"
            >
              Explore Features
            </Button>
          </Link>
        </div>

        {/* Small Features */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto px-2">
          {[
            {
              icon: <Brain className="w-7 h-7 text-white" />,
              title: "AI-Powered Questions",
              text: "Questions tailored to your role and experience level",
              colors: "from-indigo-500 to-purple-500",
            },
            {
              icon: <Mic className="w-7 h-7 text-white" />,
              title: "Voice-Based Practice",
              text: "Answer naturally like a real interview",
              colors: "from-indigo-600 to-indigo-400",
            },
            {
              icon: <MessageSquare className="w-7 h-7 text-white" />,
              title: "Instant AI Feedback",
              text: "Improve clarity and reduce fillers",
              colors: "from-purple-500 to-indigo-500",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 hover:border-indigo-300 dark:hover:border-indigo-600 transform hover:-translate-y-2 transition-all"
            >
              <div
                className={`bg-gradient-to-br ${item.colors} w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
              >
                {item.icon}
              </div>
              <p className="font-semibold text-lg text-gray-900 dark:text-white">
                {item.title}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section
        id="features"
        className="py-20 md:py-32 bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950/30"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                GenMock AI
              </span>
              ?
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-4">
              Designed for professionals who want smarter, faster interview
              prep.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature Cards */}
            {[
              {
                icon: (
                  <Brain className="w-9 h-9 text-indigo-600 dark:text-indigo-400" />
                ),
                title: "AI Generated Interviews",
                text: "Questions built for your job role, industry, and experience.",
              },
              {
                icon: (
                  <Mic className="w-9 h-9 text-indigo-600 dark:text-indigo-400" />
                ),
                title: "Voice Recording + Analysis",
                text: "Get insights on clarity, pace, fillers, and communication.",
              },
              {
                icon: (
                  <TrendingUp className="w-9 h-9 text-purple-600 dark:text-purple-400" />
                ),
                title: "Personalized Improvement Tips",
                text: "Learn what you’re doing well and what to refine next.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="group bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl hover:shadow-2xl border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-600 transform hover:-translate-y-3 transition-all"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-300">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white text-center relative overflow-hidden px-4">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold">
            Ready to Land Your Dream Job?
          </h2>

          <p className="text-lg text-white/90 mt-6 max-w-3xl mx-auto">
            Start practicing with AI today and transform the way you interview.
          </p>

          <div className="flex justify-center mt-10">
            <Link href="/dashboard">
              <Button className="px-10 py-6 text-xl font-semibold bg-white text-indigo-700 hover:bg-indigo-50 shadow-2xl transform hover:scale-105 transition-all">
                Start Practicing
                <ArrowRight className="ml-3 w-5 h-5 inline-block" />
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-12 text-base">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Free to get started
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Instant AI feedback
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
