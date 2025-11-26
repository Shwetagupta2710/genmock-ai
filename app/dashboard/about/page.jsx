"use client";

import { useState } from "react";
import {
  Users,
  Target,
  Award,
  Briefcase,
  BookOpen,
  Rocket,
} from "lucide-react";

export default function AboutUsPage() {
  const [activeTab, setActiveTab] = useState("mission");

  const tabContent = {
    mission: {
      icon: <Target className="mr-2 text-indigo-600 dark:text-indigo-400" />,
      content: (
        <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
          <p>
            GenMock AI is built to help learners practice interviews with
            clarity, structure, and confidence.
          </p>
          <p>
            Our mission is to make interview preparation simple, efficient, and
            personalized using AI tools that understand your goals.
          </p>
        </div>
      ),
    },

    story: {
      icon: <BookOpen className="mr-2 text-indigo-600 dark:text-indigo-400" />,
      content: (
        <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
          <p>
            GenMock AI began as a personal project created to solve a real-world
            student problem — interviews feel stressful and confusing.
          </p>
          <p>
            With time, it evolved into a beautifully designed platform helping
            individuals prepare effectively for their careers.
          </p>
        </div>
      ),
    },

    approach: {
      icon: <Rocket className="mr-2 text-indigo-600 dark:text-indigo-400" />,
      content: (
        <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
          <p>
            The platform uses smart question generation, voice analysis, and
            communication scoring to simulate real interview environments.
          </p>
          <p>
            With structured insights and continuous improvement, users grow with
            each practice session.
          </p>
        </div>
      ),
    },
  };

  const coreValues = [
    {
      icon: <Award className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />,
      title: "Continuous Learning",
      description:
        "We commit to building tools that adapt to evolving industry needs.",
    },
    {
      icon: <Users className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />,
      title: "Empowerment",
      description:
        "We help individuals gain clarity and confidence in communication.",
    },
    {
      icon: <Briefcase className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />,
      title: "Excellence",
      description:
        "We focus on clean, effective, and meaningful features — never clutter.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950/30 px-4 sm:px-6 py-12 sm:py-16 transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* HERO */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            About GenMock AI
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            AI-powered mock interviews crafted for students and professionals to
            practice, improve, and build confidence.
          </p>
        </div>

        {/* TABS SECTION */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden mb-16 transition-colors">
          <div className="flex flex-col sm:flex-row border-b border-gray-200 dark:border-gray-700">
            {Object.keys(tabContent).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full sm:flex-1 py-4 px-4 flex items-center justify-center text-sm sm:text-base transition-all ${
                  activeTab === tab
                    ? "text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-950/30"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
              >
                {tabContent[tab].icon}
                <span className="capitalize">{tab}</span>
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8">{tabContent[activeTab].content}</div>
        </div>

        {/* CORE VALUES */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-gray-900 dark:text-white mb-10">
          Our Core Values
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {coreValues.map((value, index) => (
            <div
              key={index}
              className="group p-6 sm:p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 dark:hover:border-indigo-600"
            >
              <div className="flex justify-center mb-4 p-4 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 w-fit mx-auto group-hover:scale-110 transition-transform">
                {value.icon}
              </div>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                {value.title}
              </h3>

              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
