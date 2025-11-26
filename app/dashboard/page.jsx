import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50/30">
      <div className="max-w-7xl mx-auto p-6 sm:p-8 md:p-12">
        <div className="mb-8 space-y-3">
          <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl">
            Create and manage your AI-powered mock interviews. Track your progress and improve your interview skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <AddNewInterview />
        </div>

        <InterviewList />
      </div>
    </div>
  );
}

export default Dashboard;
