"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import { mockInterview } from "@/utils/schema";
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
      await db
        .delete(mockInterview)
        .where(eq(mockInterview.mockId, interview?.mockId));

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
    <div className="group relative border-2 border-gray-200 hover:border-teal-300 shadow-md hover:shadow-2xl rounded-2xl p-6 bg-white transition-all duration-300 hover:-translate-y-1">
      {/* Delete button in the top-right corner */}
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
        onClick={() => setIsDialogOpen(true)}
      >
        <Trash className="w-4 h-4 text-red-600" />
      </Button>

      {/* Card Content */}
      <div className="space-y-3 mb-5">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-lg text-gray-900 mb-1">{interview?.jobPosition}</h2>
            <div className="space-y-1">
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <span className="font-medium">Experience:</span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                  {interview?.jobExperience} Year(s)
                </span>
              </p>
              <p className="text-xs text-gray-500">
                Created: {interview?.createdAt}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex-1 border-gray-300 hover:border-teal-500 hover:bg-teal-50 hover:text-teal-700 transition-colors"
          onClick={onFeedbackPress}
        >
          View Feedback
        </Button>
        <Button
          className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white shadow-md hover:shadow-lg transition-all"
          onClick={onStart}
        >
          Start Interview
        </Button>
      </div>

      {/* Confirmation Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-slide-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <Trash className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Delete Interview</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this interview? This action cannot be undone and all related data will be permanently removed.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-gray-300 hover:bg-gray-50"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1 bg-red-600 hover:bg-red-700"
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
