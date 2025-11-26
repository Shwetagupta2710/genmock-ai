"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/db";
import { useAuth } from "@/contexts/AuthContext";

export default function TestAuth() {
  const [directSession, setDirectSession] = useState(null);
  const [cookies, setCookies] = useState("");
  const [authState, setAuthState] = useState(null);
  const { user, loading } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      // Check direct session
      const { data: { session }, error } = await supabase.auth.getSession();
      setDirectSession(session);

      // Check cookies
      setCookies(document.cookie);

      // Check auth state
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setAuthState(currentUser);
    };

    checkAuth();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Authentication Debug Panel</h1>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">1. AuthContext User</h2>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-auto">
            {loading ? "Loading..." : JSON.stringify(user, null, 2) || "No user"}
          </pre>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">2. Direct Supabase Session</h2>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-auto">
            {JSON.stringify(directSession, null, 2) || "No session"}
          </pre>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">3. Direct Supabase getUser</h2>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-auto">
            {JSON.stringify(authState, null, 2) || "No auth state"}
          </pre>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">4. Browser Cookies</h2>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-auto text-sm">
            {cookies || "No cookies"}
          </pre>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">5. Environment Variables</h2>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-auto text-sm">
            NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✓ Set" : "✗ Missing"}{"\n"}
            NEXT_PUBLIC_SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✓ Set" : "✗ Missing"}
          </pre>
        </div>
      </div>
    </div>
  );
}
