"use client";
import React from "react";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { useAuth } from "@/contexts/AuthContext";

function DashboardLayout({ children }) {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950/30">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 mx-5 md:mx-20 lg:mx-36">{children}</div>
      <Footer />
    </div>
  );
}

export default DashboardLayout;
