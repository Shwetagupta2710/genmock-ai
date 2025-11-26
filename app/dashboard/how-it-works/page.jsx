"use client";

import React from "react";
import {
  UserCheck,
  Settings,
  Play,
  Send,
  ChartBar,
  Repeat,
} from "lucide-react";
import Image from "next/image";

const HowItWorksPage = () => {
  const steps = [
    {
      icon: <UserCheck size={40} className="text-indigo-600 dark:text-indigo-400" />,
      title: "Sign Up or Log In",
      description:
        "Create an account or log in using Clerk. Build a personalized profile that tracks your interview journey and stores preferences.",
    },
    {
      icon: <Settings size={40} className="text-indigo-600 dark:text-indigo-400" />,
      title: "Choose Your Interview Type",
      description:
        "Select from technical, behavioral, or mixed interviews. Customize difficulty, topics, and duration to match your career goals.",
    },
    {
      icon: <Play size={40} className="text-indigo-600 dark:text-indigo-400" />,
      title: "Start the Mock Interview",
      description:
        "Our AI generates dynamic, contextually relevant questions powered by Gemini. One question at a time keeps you focused and engaged.",
    },
    {
      icon: <Send size={40} className="text-indigo-600 dark:text-indigo-400" />,
      title: "Submit Your Answers",
      description:
        "Respond using voice or text. The interface ensures smooth response tracking and a seamless experience.",
    },
    {
      icon: <ChartBar size={40} className="text-indigo-600 dark:text-indigo-400" />,
      title: "Receive Real-Time Feedback",
      description:
        "Get instant AI-powered evaluation of your responses. Understand strengths, weaknesses, and improvement areas.",
    },
    {
      icon: <Repeat size={40} className="text-indigo-600 dark:text-indigo-400" />,
      title: "Continue Practicing",
      description:
        "Access previous interviews, track your progress, and hone your communication skills with AI-powered repetitions.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950/30 px-4 sm:px-6 py-8 sm:py-12 md:py-16 transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* HERO SECTION */}
        <div className="text-center flex flex-col items-center mb-12 sm:mb-16">
          <Image
            src="/custom-logo.svg"
            width={160}
            height={70}
            alt="GenMock AI Logo"
            className="object-contain mb-6"
          />

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            How It Works
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Master your interviews with AI-powered practice in six simple steps
          </p>
        </div>

        {/* HOW IT WORKS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <span className="text-3xl font-bold text-indigo-600/20 dark:text-indigo-400/20">
                  {index + 1}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {step.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/dashboard"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Start Your Interview Journey
          </a>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
