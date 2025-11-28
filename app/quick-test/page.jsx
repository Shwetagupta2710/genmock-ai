"use client";
import { useState } from "react";
import { supabase } from "@/utils/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function QuickTest() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null);

  const testSignUp = async () => {
    setResult("Creating account...");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setResult(`❌ Sign Up Error: ${error.message}`);
    } else if (data?.user && !data?.session) {
      setResult(`⚠️ Account created but email confirmation required. Check your email: ${email}`);
    } else if (data?.session) {
      setResult(`✅ Account created and signed in! User: ${data.user.email}`);
    }
  };

  const testSignIn = async () => {
    setResult("Signing in...");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setResult(`❌ Sign In Error: ${error.message}`);
    } else if (data?.session) {
      setResult(`✅ Signed in successfully! User: ${data.user.email}`);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    }
  };

  const checkSession = async () => {
    setResult("Checking session...");
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      setResult(`❌ Error: ${error.message}`);
    } else if (session) {
      setResult(`✅ Active session found! User: ${session.user.email}`);
    } else {
      setResult(`❌ No active session`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">Quick Authentication Test</h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="test@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password123"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={testSignUp} className="flex-1">
                1. Sign Up
              </Button>
              <Button onClick={testSignIn} className="flex-1">
                2. Sign In
              </Button>
              <Button onClick={checkSession} variant="outline" className="flex-1">
                3. Check Session
              </Button>
            </div>

            {result && (
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                <pre className="whitespace-pre-wrap text-sm">{result}</pre>
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <h2 className="font-bold mb-2">Instructions:</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Enter an email and password (password must be 6+ characters)</li>
            <li>Click "1. Sign Up" to create an account</li>
            <li>If you see "email confirmation required", check your email inbox</li>
            <li>If you see "signed in", click "2. Sign In" to test login</li>
            <li>Click "3. Check Session" to verify session is saved</li>
          </ol>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
          <h2 className="font-bold mb-2">Common Issues:</h2>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li><strong>Email confirmation required:</strong> Supabase requires email verification. Check your email.</li>
            <li><strong>User already exists:</strong> Try signing in instead, or use a different email.</li>
            <li><strong>Invalid credentials:</strong> Check your password is correct.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
