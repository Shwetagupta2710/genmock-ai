"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession, retryWithBackoff } from "@/utils/GeminiAIModal";
import { supabase } from "@/utils/db";
import moment from "moment";
import { useAuth } from "@/contexts/AuthContext";

function RecordAnswerSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) {
  const [micAllowed, setMicAllowed] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Ensure component only renders on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);
  // Removed the problematic useEffect that causes infinite loop
  // UpdateUserAnswer will be called manually when recording stops

  const {
    error,
    interimResult,
    isRecording,
    results = [],
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // 🧠 Combine all transcripts into one string
  useEffect(() => {
    const combined = results.map((r) => r.transcript).join(" ");
    setUserAnswer(combined + (interimResult ? " " + interimResult : ""));
  }, [results, interimResult]);

  // Don't render until mounted on client
  if (!isMounted) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="relative bg-black rounded-lg overflow-hidden flex justify-center items-center w-[320px] h-[240px] sm:w-[400px] sm:h-[300px] md:w-[480px] md:h-[360px]">
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  // ✅ Request microphone permission before starting
  const handleRecordToggle = async () => {
    if (isRecording) {
      stopSpeechToText();

      // Validate answer length before processing
      if (userAnswer?.length < 10) {
        toast.error(
          "Answer is too short. Please record again with more details."
        );
        return;
      }

      // Call UpdateUserAnswer to save and get feedback
      await UpdateUserAnswer();
      return;
    }

    // Start recording
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicAllowed(true);
      startSpeechToText();
    } catch (err) {
      console.error("Microphone permission denied:", err);
      toast.error("Please allow microphone access to record your answer.");
    }
  };

  const UpdateUserAnswer = async () => {
    setLoading(true);
    setIsProcessing(true);
    toast.loading("Getting feedback on your answer...");

    try {
      const feedbackPrompt =
        "Question: " +
        mockInterviewQuestion[activeQuestionIndex]?.question +
        ", User Answer: " +
        userAnswer +
        ", Depends on questions and user answer for given interview question " +
        "please give us rating for answer and feedback as area of improvement if any " +
        "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field.";

      // Get AI feedback with retry logic
      const result = await retryWithBackoff(
        async () => await chatSession.sendMessage(feedbackPrompt),
        3,
        1000
      );

      const mockJsonResp = result.response
        .text()
        .replace(/```json\n?|```/g, "")
        .trim();

      const JsonFeedbackResp = JSON.parse(mockJsonResp);

      // Save to database
      const { data, error } = await supabase
        .from("userAnswer")
        .insert({
          mockId: interviewData?.mockId,
          question: mockInterviewQuestion[activeQuestionIndex]?.question,
          correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
          userAns: userAnswer,
          feedback: JsonFeedbackResp?.feedback,
          rating: JsonFeedbackResp?.rating,
          userEmail: user?.email,
          createdAt: moment().format("DD-MM-yyyy"),
        });

      if (error) {
        console.error("Error saving answer:", error);
        toast.dismiss();
        toast.error("Failed to save your answer. Please try again.");
        return;
      }

      toast.dismiss();
      toast.success("User Answer recorded successfully!");
      setUserAnswer("");
      setResults([]);
    } catch (error) {
      console.error("Error in UpdateUserAnswer:", error);
      toast.dismiss();

      // Provide specific error messages
      if (
        error.message?.includes("503") ||
        error.message?.includes("overloaded")
      ) {
        toast.error(
          "The AI service is currently overloaded. Please try again in a few moments.",
          { duration: 5000 }
        );
      } else if (
        error.message?.includes("429") ||
        error.message?.includes("rate limit")
      ) {
        toast.error(
          "Rate limit exceeded. Please wait a moment before trying again.",
          { duration: 5000 }
        );
      } else if (error.message?.includes("API key")) {
        toast.error("API configuration error. Please contact support.", {
          duration: 5000,
        });
      } else {
        toast.error("Failed to save your answer. Please try again.", {
          duration: 5000,
        });
      }
    } finally {
      setResults([]);
      setLoading(false);
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Webcam Preview */}
      <div className="relative bg-black dark:bg-gray-900 rounded-2xl overflow-hidden flex justify-center items-center w-full max-w-lg aspect-video border-4 border-gray-800 dark:border-gray-700 shadow-xl">
        <Image
          src="/webcam-removebg-preview.png"
          width={200}
          height={200}
          alt="webcam overlay"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none z-20"
        />
        <Webcam mirrored className="w-full h-full object-cover z-10" />
        {isRecording && (
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium z-30">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            Recording
          </div>
        )}
      </div>

      {/* Answer Preview */}
      {userAnswer && (
        <div className="mt-4 w-full max-w-lg p-4 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide">
            Your Answer
          </p>
          <p className="text-sm text-gray-800 dark:text-gray-200">
            {userAnswer}
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col items-center gap-3 mt-6 w-full max-w-lg">
        <Button
          variant={isRecording ? "destructive" : "default"}
          onClick={handleRecordToggle}
          disabled={isProcessing}
          className={`w-full flex items-center justify-center gap-2 py-6 text-base font-semibold ${
            isRecording
              ? "bg-red-600 hover:bg-red-700"
              : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          }`}
        >
          <Mic className={isRecording ? "animate-pulse" : ""} />
          {isProcessing
            ? "Processing..."
            : isRecording
            ? "Stop Recording"
            : "Record Answer"}
        </Button>

        {error && (
          <p className="text-red-600 dark:text-red-400 text-sm text-center">
            🎙️ Speech recognition not supported in this browser.
          </p>
        )}
      </div>
    </div>
  );
}

export default RecordAnswerSection;
