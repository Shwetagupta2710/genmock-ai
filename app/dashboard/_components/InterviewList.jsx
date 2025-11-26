"use client";
import { db } from "@/utils/db";
import { mockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

const InterviewList = () => {
  const { user } = useUser();
  const [InterviewList, setInterviewList] = useState([]);
  useEffect(() => {
    user && GetInterviewList();
  }, [user]);
  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(mockInterview)
      .where(
        eq(mockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(mockInterview.id));

    setInterviewList(result);
  };
  return (
    <div className="mt-12">
      <div className="mb-6">
        <h2 className="font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white mb-2">Previous Interviews</h2>
        <p className="text-gray-600 dark:text-gray-300">Review your past interview sessions and track your progress</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {InterviewList && InterviewList.length > 0 ? (
          InterviewList.map((interview, index) => (
            <InterviewItemCard interview={interview} key={index} />
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 flex items-center justify-center">
              <svg className="w-10 h-10 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No interviews yet</h3>
            <p className="text-gray-600 dark:text-gray-300">Create your first mock interview to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewList;
