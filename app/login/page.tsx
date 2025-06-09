"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Lock, Mail, Brain } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // @ts-ignore (login expects 1 arg, but we want to pass 2 for future backend update)
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0e7ff] via-[#f5f7fa] to-[#c7d2fe] dark:from-[#232946] dark:via-[#16161a] dark:to-[#232946] transition-colors duration-500">
      <Container className="max-w-md w-full">
        <Card className="relative p-10 space-y-10 shadow-2xl border border-white/20 bg-white/70 dark:bg-[#16161a]/80 backdrop-blur-xl rounded-3xl transition-all duration-500">
          <div className="flex flex-col items-center gap-2">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-indigo-400 shadow-lg mb-2">
              <Brain className="w-8 h-8 text-white" />
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent">
              Sign In
            </h1>
            <p className="text-muted-foreground text-lg font-medium">
              Welcome back! Please sign in to continue.
            </p>
          </div>
          <form
            className="space-y-6"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className="space-y-3">
              <label htmlFor="email" className="block text-base font-semibold">
                Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/70 transition-colors group-focus-within:text-primary" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-12 py-3 text-base rounded-xl border-2 border-transparent focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>
            <div className="space-y-3">
              <label
                htmlFor="password"
                className="block text-base font-semibold"
              >
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/70 transition-colors group-focus-within:text-primary" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-12 py-3 text-base rounded-xl border-2 border-transparent focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center font-semibold animate-pulse">
                {error}
              </p>
            )}
            <Button
              className="w-full py-3 text-lg rounded-xl bg-gradient-to-r from-primary to-indigo-400 shadow-md hover:scale-[1.02] transition-transform font-bold"
              size="lg"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <p className="text-base text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-primary underline font-semibold"
            >
              Sign up
            </Link>
          </p>
        </Card>
      </Container>
    </div>
  );
}
