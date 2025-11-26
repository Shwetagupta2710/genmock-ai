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
      <section className="relative overflow-hidden text-center min-h-[90vh] flex flex-col justify-center px-4 sm:px-6 py-16">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute w-[800px] h-[800px] top-[-300px] left-[-200px] bg-gradient-to-br from-blue-400/30 via-cyan-300/20 to-teal-400/30 blur-[250px] rounded-full animate-pulse"></div>
          <div className="absolute w-[900px] h-[900px] bottom-[-300px] right-[-250px] bg-gradient-to-tl from-emerald-400/20 via-green-300/20 to-lime-400/30 blur-[240px] rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.95),rgba(255,255,255,0.7)_50%,transparent_80%)]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white"></div>
        </div>

        <div className="relative z-10 space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200/50 rounded-full text-sm font-medium text-blue-700 shadow-sm hover:shadow-md transition-all duration-300">
            <Sparkles className="w-4 h-4" />
            <span>Your AI Interview Coach</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 max-w-5xl mx-auto leading-tight tracking-tight px-2">
            Ace Your Next Interview with{" "}
            <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-green-600 bg-clip-text text-transparent animate-gradient">GenMock AI</span>
          </h1>
        </div>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mt-6 leading-relaxed px-2 font-light">
          Master your interview skills with AI-powered practice sessions. Get instant feedback, improve continuously, and land your dream job with confidence.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10 sm:mt-12 w-full max-w-md sm:max-w-none mx-auto px-2">
          <Link href="/dashboard" className="w-full sm:w-auto group">
            <Button className="w-full sm:w-auto px-8 py-6 sm:py-7 text-lg sm:text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white transform hover:scale-105">
              Start Mock Interview
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Link href="#features" className="w-full sm:w-auto group">
            <Button
              variant="outline"
              className="w-full sm:w-auto px-8 py-6 sm:py-7 text-lg sm:text-xl font-semibold border-2 border-gray-300 hover:border-teal-600 bg-white hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Explore Features
            </Button>
          </Link>
        </div>

        {/* Small Feature Indicators */}
        <div className="mt-16 sm:mt-20 md:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto px-2">
          <div className="group bg-white/80 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 hover:border-teal-300 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-blue-500 to-teal-500 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <p className="font-bold text-base sm:text-lg text-gray-900">
              AI-Powered Questions
            </p>
            <p className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed">
              Questions tailored to your role and experience level
            </p>
          </div>

          <div className="group bg-white/80 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 hover:border-teal-300 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-teal-500 to-green-500 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Mic className="w-7 h-7 text-white" />
            </div>
            <p className="font-bold text-base sm:text-lg text-gray-900">
              Voice-Based Practice
            </p>
            <p className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed">
              Answer naturally using your voice like a real interview
            </p>
          </div>

          <div className="group bg-white/80 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 hover:border-teal-300 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <MessageSquare className="w-7 h-7 text-white" />
            </div>
            <p className="font-bold text-base sm:text-lg text-gray-900">
              Instant AI Feedback
            </p>
            <p className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed">
              Improve clarity, reduce fillers, and boost confidence
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section
        id="features"
        className="py-16 sm:py-20 md:py-32 relative bg-gradient-to-br from-gray-50 via-white to-teal-50/30"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute w-[600px] h-[600px] top-[50%] left-[-200px] bg-gradient-to-br from-blue-300/20 to-teal-300/20 blur-[220px] rounded-full"></div>
          <div className="absolute w-[600px] h-[600px] top-[30%] right-[-200px] bg-gradient-to-tl from-green-300/20 to-emerald-300/20 blur-[220px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">GenMock AI</span>?
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2 leading-relaxed">
              Built for ambitious professionals who want to excel in interviews and advance their careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <div className="group bg-white p-8 sm:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-teal-200 transform hover:-translate-y-3">
              <div className="bg-gradient-to-br from-blue-100 to-teal-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-9 h-9 text-blue-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                AI Generated Interviews
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Get job-specific, dynamic interview questions created instantly based on your role, industry, and experience level.
              </p>
            </div>

            <div className="group bg-white p-8 sm:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-teal-200 transform hover:-translate-y-3">
              <div className="bg-gradient-to-br from-teal-100 to-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Mic className="w-9 h-9 text-teal-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                Voice Recording + Analysis
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Record your answers and receive detailed analysis on clarity, filler word usage, speaking pace, and overall delivery.
              </p>
            </div>

            <div className="group bg-white p-8 sm:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-teal-200 transform hover:-translate-y-3">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-9 h-9 text-green-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                Personalized Improvement Tips
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Receive actionable feedback highlighting your strengths and providing specific recommendations for improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-br from-blue-600 via-teal-600 to-green-600 text-white text-center relative overflow-hidden px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
        <div className="absolute top-[-100px] left-[10%] w-[400px] h-[400px] bg-white/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-100px] right-[10%] w-[400px] h-[400px] bg-white/10 blur-[150px] rounded-full"></div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold px-2 leading-tight">
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
              <Button className="w-full sm:w-auto px-8 py-6 sm:py-7 text-lg sm:text-xl font-semibold bg-white text-teal-700 hover:bg-gray-50 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
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
