"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState, use } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useRouter } from "next/navigation";
import { Activity, CheckCircle2, ChevronsUpDown, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Feedback = ({ params }) => {
  const unwrappedParams = use(params);
  const [feedbackList, setFeedbackList] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    try {
      setLoading(true);

      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, unwrappedParams.interviewId))
        .orderBy(UserAnswer.id);

      setFeedbackList(result);

      const validRatings = result
        .map((item) => parseFloat(item.rating))
        .filter((rating) => !isNaN(rating));

      const totalRating = validRatings.reduce((sum, rating) => sum + rating, 0);
      const avgRating =
        validRatings.length > 0
          ? (totalRating / validRatings.length).toFixed(1)
          : "N/A";

      setAverageRating(avgRating);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      toast.error("Failed to load feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getRatingColor = (rating) => {
    const numRating = parseFloat(rating);
    if (numRating >= 8) return "text-green-600 dark:text-green-400";
    if (numRating >= 5) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getRatingBgColor = (rating) => {
    const numRating = parseFloat(rating);
    if (numRating >= 8) return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800";
    if (numRating >= 5) return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800";
    return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950/30">
        <div className="text-center">
          <Activity className="mx-auto h-12 w-12 text-indigo-600 dark:text-indigo-400 animate-pulse" />
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Loading your interview feedback...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950/30 py-8 px-4 sm:px-6 transition-colors">
      {feedbackList.length === 0 ? (
        <div className="max-w-2xl mx-auto text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            No Interview Feedback Available
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            It seems like no feedback has been generated for this interview.
            Please complete the interview first.
          </p>
          <Button
            onClick={() => router.replace("/dashboard")}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            Return to Dashboard
          </Button>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 mb-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">
                  Congratulations!
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Your Mock Interview is completed successfully.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 p-5 rounded-xl border border-indigo-100 dark:border-indigo-800">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Overall Rating</p>
                </div>
                <p
                  className={`text-3xl font-bold ${getRatingColor(averageRating)}`}
                >
                  {averageRating}/10
                </p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 p-5 rounded-xl border border-indigo-100 dark:border-indigo-800">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Questions</p>
                </div>
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  {feedbackList.length}
                </p>
              </div>
            </div>
          </div>

          {/* Feedback List */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Detailed Interview Feedback
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Review each question with your answer and personalized feedback for improvement.
            </p>

            <div className="space-y-4">
              {feedbackList.map((item, index) => (
                <Collapsible key={index}>
                  <CollapsibleTrigger className="p-4 flex justify-between items-center gap-4 w-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm text-left transition-all group">
                    <span className="font-medium text-gray-900 dark:text-white flex-1">
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold">Q{index + 1}.</span> {item.question}
                    </span>
                    <ChevronsUpDown className="h-5 w-5 text-gray-400 dark:text-gray-500 flex-shrink-0 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mt-2 space-y-3 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 border-t-0 rounded-b-xl">
                      <div className={`p-4 border rounded-xl ${getRatingBgColor(item.rating)}`}>
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide">
                          Rating
                        </p>
                        <p className={`text-2xl font-bold ${getRatingColor(item.rating)}`}>
                          {item.rating}/10
                        </p>
                      </div>

                      <div className="p-4 border rounded-xl bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                        <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-2 uppercase tracking-wide">
                          Your Answer
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{item.userAns}</p>
                      </div>

                      <div className="p-4 border rounded-xl bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                        <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-2 uppercase tracking-wide">
                          Correct Answer
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {item.correctAns || "Not provided"}
                        </p>
                      </div>

                      <div className="p-4 border rounded-xl bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                        <p className="text-xs font-semibold text-purple-700 dark:text-purple-400 mb-2 uppercase tracking-wide">
                          AI Feedback
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{item.feedback}</p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                onClick={() => router.replace("/dashboard")}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-8 shadow-lg"
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;
