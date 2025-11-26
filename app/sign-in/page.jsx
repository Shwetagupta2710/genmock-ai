"use client";
import { useState } from "react";
import { supabase } from "@/utils/db";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("🔐 Starting sign in...");

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("📦 Sign in response:", { data, error });

      if (error) {
        console.error("❌ Sign in error:", error);
        toast.error(error.message);
        setLoading(false);
        return;
      }

      if (data?.session) {
        console.log("✅ Session created:", data.session.user.email);

        // Verify session was saved
        const { data: { session: savedSession } } = await supabase.auth.getSession();
        console.log("💾 Saved session check:", savedSession ? "✓" : "✗");

        toast.success("Signed in successfully!");

        // Wait a bit for cookies to be set
        await new Promise(resolve => setTimeout(resolve, 500));

        // Force hard navigation
        window.location.href = "/dashboard";
      } else {
        console.warn("⚠️ No session in response");
        toast.error("Sign in succeeded but no session was created");
        setLoading(false);
      }
    } catch (err) {
      console.error("💥 Unexpected error:", err);
      toast.error("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950/30 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to continue your interview practice
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={loading}
                className="border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading}
                className="border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-6 text-base"
            >
              {loading ? (
                <>
                  <LoaderCircle className="animate-spin mr-2" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                href="/sign-up"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/test-auth"
              className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Debug Auth
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
