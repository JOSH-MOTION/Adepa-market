"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, Mail, Lock, User, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { login, signUp } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signUp(email, password, name);
      }
      router.push("/");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Authentication error. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-charcoal font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4 relative">
        <div className="absolute inset-0 kente-pattern-soft pointer-events-none" />
        
        <div className="max-w-sm w-full bg-white rounded-xl border border-warm-border p-6 sm:p-8 space-y-5 relative z-10 shadow-sm">
          <div className="text-center space-y-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[9px] font-bold bg-[#F5ECE1] border border-warm-border text-stone-600 uppercase tracking-wider">
              <Sparkles className="h-2.5 w-2.5 text-kente-gold" />
              <span>Customer Access</span>
            </span>
            <h2 className="font-display font-black text-xl text-stone-900">
              {isLogin ? "Sign In" : "Register"}
            </h2>
            <p className="text-[10px] text-stone-400">
              {isLogin ? "Manage artisan orders and speed up checkout." : "Sign up to track shipments and save products."}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-700 text-[10px] p-2.5 rounded font-medium">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-400 uppercase">Your Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400">
                    <User className="h-3.5 w-3.5" />
                  </span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                    className="w-full bg-[#FAF9F5] border border-warm-border rounded-lg pl-9 pr-3.5 py-2 text-xs focus:outline-none focus:bg-white"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-stone-400 uppercase">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400">
                  <Mail className="h-3.5 w-3.5" />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-[#FAF9F5] border border-warm-border rounded-lg pl-9 pr-3.5 py-2 text-xs focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-stone-400 uppercase">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400">
                  <Lock className="h-3.5 w-3.5" />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#FAF9F5] border border-warm-border rounded-lg pl-9 pr-3.5 py-2 text-xs focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-stone-charcoal hover:bg-stone-800 text-white py-2 rounded font-bold text-xs shadow transition-colors flex items-center justify-center gap-1"
            >
              <span>{loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>

          <div className="text-center pt-1.5 border-t border-stone-100">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[10px] text-stone-500 hover:underline font-bold"
            >
              {isLogin ? "Need an account? Register" : "Have an account? Login"}
            </button>
          </div>

          <div className="flex flex-col items-center pt-2">
            <span className="text-[9px] text-stone-400 font-bold uppercase tracking-wider mb-2">Or check out as</span>
            <Link
              href="/checkout"
              className="w-full bg-stone-50 hover:bg-stone-100 text-stone-600 py-1.5 rounded text-[10px] font-bold text-center border border-warm-border"
            >
              Guest Checkout
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
