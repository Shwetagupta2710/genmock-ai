"use client";
import { db } from "@/utils/db";
import { mockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import QuestionsSection from "./_components/QuestionsSection";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

const RecordAnswerSection = dynamic(
  () => import("./_components/RecordAnswerSection"),
  { ssr: false }
);

function StartInterview() {
  const { interviewId } = useParams();
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    if (interviewId) {
      GetInterviewDetails();
    }
  }, [interviewId]);

  const GetInterviewDetails = async () => {
    try {
      setIsLoading(true);
      const result = await db
        .select()
        .from(mockInterview)
        .where(eq(mockInterview.mockId, interviewId));

      if (result && result.length > 0) {
        const interview = result[0];
        let parsedQuestions = [];

        try {
          const data = JSON.parse(interview.jsonMockResp);
          if (Array.isArray(data)) parsedQuestions = data;
          else if (Array.isArray(data.questions)) parsedQuestions = data.questions;
        } catch (err) {
          console.error("Invalid JSON format for mock interview questions:", err);
        }

        setMockInterviewQuestion(parsedQuestions);
        setInterviewData(interview);
      }
    } catch (error) {
      console.error("Failed to fetch interview details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950/30">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 dark:border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Loading interview details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950/30 py-8 px-4 sm:px-6 transition-colors">
      <div className="max-w-7xl mx-auto pb-24">
        {/* Progress Bar */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Progress
            </span>
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              {activeQuestionIndex + 1} / {mockInterviewQuestion.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((activeQuestionIndex + 1) / mockInterviewQuestion.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Section: Questions */}
          <div>
            <QuestionsSection
              mockInterviewQuestion={mockInterviewQuestion || []}
              activeQuestionIndex={activeQuestionIndex}
              setActiveQuestionIndex={setActiveQuestionIndex}
            />
          </div>

          {/* Right Section: Webcam */}
          <div className="flex justify-center items-start">
            {!isLoading && (
              <RecordAnswerSection
                mockInterviewQuestion={mockInterviewQuestion || []}
                activeQuestionIndex={activeQuestionIndex}
                interviewData={interviewData}
              />
            )}
          </div>
        </div>
      </div>

      {/* Fixed Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Question {activeQuestionIndex + 1} of {mockInterviewQuestion.length}
          </div>
          <div className="flex gap-3">
            {activeQuestionIndex > 0 && (
              <Button
                onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
                variant="outline"
                className="border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
            )}
            {activeQuestionIndex !== mockInterviewQuestion?.length - 1 && (
              <Button
                onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
            {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
              <Button
                onClick={() =>
                  (window.location.href = `/dashboard/interview/${interviewId}/feedback`)
                }
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
              >
                <Check className="w-4 h-4 mr-1" />
                End Interview
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartInterview;
