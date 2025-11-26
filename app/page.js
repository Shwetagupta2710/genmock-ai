"use client";

import React from "react";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Brain, Mic, MessageSquare, Sparkles, CheckCircle, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />

      {/* HERO SECTION WITH RICH GRADIENTS */}
      <section className="relative overflow-hidden text-center min-h-[90vh] flex flex-col justify-center px-4 sm:px-6 py-16 bg-gradient-to-b from-white via-indigo-50/30 to-white dark:from-gray-900 dark:via-indigo-950/30 dark:to-gray-900 transition-colors">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute w-[800px] h-[800px] top-[-300px] left-[-200px] bg-gradient-to-br from-indigo-400/30 via-indigo-300/20 to-purple-400/30 blur-[250px] rounded-full animate-pulse"></div>
          <div className="absolute w-[900px] h-[900px] bottom-[-300px] right-[-250px] bg-gradient-to-tl from-indigo-400/20 via-purple-300/20 to-indigo-400/30 blur-[240px] rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.95),rgba(255,255,255,0.7)_50%,transparent_80%)] dark:bg-[radial-gradient(circle_at_50%_30%,rgba(15,15,30,0.95),rgba(15,15,30,0.7)_50%,transparent_80%)]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 dark:via-gray-900/30 to-white dark:to-gray-900"></div>
        </div>

        <div className="relative z-10 space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 border border-indigo-200/50 dark:border-indigo-800/50 rounded-full text-sm font-medium text-indigo-700 dark:text-indigo-300 shadow-sm hover:shadow-md transition-all duration-300">
            <Sparkles className="w-4 h-4" />
            <span>Your AI Interview Coach</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-gray-900 dark:text-white max-w-5xl mx-auto leading-tight tracking-tight px-2">
            Ace Your Next Interview with{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent animate-gradient">GenMock AI</span>
          </h1>
        </div>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-6 leading-relaxed px-2 font-light">
          Master your interview skills with AI-powered practice sessions. Get instant feedback, improve continuously, and land your dream job with confidence.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10 sm:mt-12 w-full max-w-md sm:max-w-none mx-auto px-2">
          <Link href="/dashboard" className="w-full sm:w-auto group">
            <Button className="w-full sm:w-auto px-8 py-6 sm:py-7 text-lg sm:text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transform hover:scale-105">
              Start Mock Interview
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Link href="#features" className="w-full sm:w-auto group">
            <Button
              variant="outline"
              className="w-full sm:w-auto px-8 py-6 sm:py-7 text-lg sm:text-xl font-semibold border-2 border-gray-300 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-400 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Explore Features
            </Button>
          </Link>
        </div>

        {/* Small Feature Indicators */}
        <div className="mt-16 sm:mt-20 md:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto px-2">
          <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 hover:border-indigo-300 dark:hover:border-indigo-600 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-500 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <p className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white">
              AI-Powered Questions
            </p>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
              Questions tailored to your role and experience level
            </p>
          </div>

          <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 hover:border-indigo-300 dark:hover:border-indigo-600 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-400 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Mic className="w-7 h-7 text-white" />
            </div>
            <p className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white">
              Voice-Based Practice
            </p>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
              Answer naturally using your voice like a real interview
            </p>
          </div>

          <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 hover:border-indigo-300 dark:hover:border-indigo-600 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-500 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <MessageSquare className="w-7 h-7 text-white" />
            </div>
            <p className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white">
              Instant AI Feedback
            </p>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
              Improve clarity, reduce fillers, and boost confidence
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section
        id="features"
        className="py-16 sm:py-20 md:py-32 relative bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950/30 transition-colors"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute w-[600px] h-[600px] top-[50%] left-[-200px] bg-gradient-to-br from-indigo-300/20 to-purple-300/20 blur-[220px] rounded-full"></div>
          <div className="absolute w-[600px] h-[600px] top-[30%] right-[-200px] bg-gradient-to-tl from-purple-300/20 to-indigo-300/20 blur-[220px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white">
              Why Choose <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">GenMock AI</span>?
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2 leading-relaxed">
              Built for ambitious professionals who want to excel in interviews and advance their careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <div className="group bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-600 transform hover:-translate-y-3">
              <div className="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-9 h-9 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                AI Generated Interviews
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                Get job-specific, dynamic interview questions created instantly based on your role, industry, and experience level.
              </p>
            </div>

            <div className="group bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-600 transform hover:-translate-y-3">
              <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/50 dark:to-indigo-800/50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Mic className="w-9 h-9 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                Voice Recording + Analysis
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                Record your answers and receive detailed analysis on clarity, filler word usage, speaking pace, and overall delivery.
              </p>
            </div>

            <div className="group bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-600 transform hover:-translate-y-3">
              <div className="bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/50 dark:to-indigo-900/50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-9 h-9 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                Personalized Improvement Tips
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                Receive actionable feedback highlighting your strengths and providing specific recommendations for improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white text-center relative overflow-hidden px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
        <div className="absolute top-[-100px] left-[10%] w-[400px] h-[400px] bg-white/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-100px] right-[10%] w-[400px] h-[400px] bg-white/10 blur-[150px] rounded-full"></div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold px-2 leading-tight">
            Ready to Land Your Dream Job?
          </h2>

          <p className="text-lg sm:text-xl text-white/90 mt-6 px-2 max-w-3xl mx-auto leading-relaxed">
            Join thousands of professionals who have transformed their interview skills with AI-powered practice and feedback.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
            <Link
              href="/dashboard"
              className="inline-block w-full sm:w-auto group"
            >
              <Button className="w-full sm:w-auto px-8 py-6 sm:py-7 text-lg sm:text-xl font-semibold bg-white text-indigo-700 hover:bg-indigo-50 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
                Start Practicing Now
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 mt-12 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-white" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-white" />
              <span>Free to get started</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-white" />
              <span>Instant AI feedback</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
