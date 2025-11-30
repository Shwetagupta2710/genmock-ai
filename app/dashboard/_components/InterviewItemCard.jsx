"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { supabase } from "@/utils/db";
import { Trash } from "lucide-react";
import { toast } from "sonner";

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onStart = () => {
    router.push(`/dashboard/interview/${interview?.mockId}`);
  };

  const onFeedbackPress = () => {
    router.push(`/dashboard/interview/${interview?.mockId}/feedback`);
  };

  const onDelete = async () => {
    try {
      const { error } = await supabase
        .from("mockInterview")
        .delete()
        .eq("mockId", interview?.mockId);

      if (error) {
        console.error("Error deleting interview:", error);
        toast.error("Failed to delete interview");
        return;
      }

      // Close dialog and show success toast
      setIsDialogOpen(false);
      toast.success("Interview deleted successfully");

      // Use router to refresh instead of full page reload
      router.refresh();
    } catch (error) {
      console.error("Error deleting interview:", error);
      toast.error("Failed to delete interview");
    }
  };

  return (
    <div className="group relative border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 shadow-md hover:shadow-2xl rounded-2xl p-6 bg-white dark:bg-gray-800 transition-all duration-300 hover:-translate-y-1">
      {/* Delete button in the top-right corner */}
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
        onClick={() => setIsDialogOpen(true)}
      >
        <Trash className="w-4 h-4 text-red-600 dark:text-red-400" />
      </Button>

      {/* Card Content */}
      <div className="space-y-3 mb-5 pr-8">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 truncate">{interview?.jobPosition}</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">Experience:</span>
                <span className="px-2.5 py-0.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-md text-xs font-medium border border-indigo-200 dark:border-indigo-800">
                  {interview?.jobExperience} Year(s)
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Created: {interview?.createdAt}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <Button
          variant="outline"
          className="flex-1 border-gray-300 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors text-sm py-2 font-normal"
          onClick={onFeedbackPress}
        >
          Feedback
        </Button>
        <Button
          className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all text-sm py-2 font-normal"
          onClick={onStart}
        >
          Start
        </Button>
      </div>

      {/* Confirmation Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-slide-up border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Trash className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Delete Interview</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 font-normal">
              Are you sure you want to delete this interview? This action cannot be undone and all related data will be permanently removed.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                onClick={onDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewItemCard;
