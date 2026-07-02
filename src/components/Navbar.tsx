"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { ShoppingBag, User, LogOut, Menu, X, Search, Sparkles, HelpCircle, Heart } from "lucide-react";

const NavbarContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cartItemsCount } = useCart();
  const { user, logout } = useAuth();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [isAiSearch, setIsAiSearch] = useState(searchParams.get("ai") === "true");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?q=${encodeURIComponent(searchQuery)}&ai=${isAiSearch}`);
    } else {
      router.push("/");
    }
  };

  const toggleAiSearch = () => {
    setIsAiSearch(!isAiSearch);
  };

  return (
    <div className="w-full bg-white text-stone-charcoal border-b border-warm-border">
      {/* 1. Top Utility Bar (Mockup Style) */}
      <div className="hidden sm:flex border-b border-stone-100 bg-[#FAF9F6] py-2 text-[11px] text-stone-500 font-medium">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
          <div className="flex gap-4">
            <span className="text-[10px] text-terracotta bg-terracotta/10 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Ghana's #1 Artisan Market</span>
            <span>Oxford Street, Osu, Accra</span>
            <span>Call: +233 (0) 50 123 4567</span>
          </div>
          <div className="flex gap-4 items-center">
            <Link href="/" className="hover:underline">Shop All</Link>
            <Link href="/admin" className="hover:underline text-kente-gold-dark font-bold">Artisan Dashboard</Link>
            <span className="text-stone-300">|</span>
            <span className="flex items-center gap-1">
              <HelpCircle className="h-3 w-3" />
              <span>Help & Returns</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Header Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex flex-col">
              <span className="font-display text-2xl font-black tracking-tight text-stone-charcoal">
                adepa<span className="text-terracotta font-sans font-light">market</span>
              </span>
              <span className="text-[8px] tracking-widest text-stone-400 uppercase -mt-1 font-mono">
                Ghanaian Artisan Goods
              </span>
            </Link>
          </div>

          {/* Search Form (Mockup Style) */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl relative">
            <div className="relative w-full flex items-center bg-[#FAF9F5] border border-warm-border rounded-lg overflow-hidden focus-within:border-stone-400 focus-within:bg-white transition-all">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAiSearch ? "Try 'wedding gift' or 'skincare'..." : "Search products, categories..."}
                className="w-full pl-4 pr-32 py-1.5 text-xs text-stone-850 placeholder-stone-400 focus:outline-none bg-transparent"
              />
              
              {/* AI Search Mode Toggle (Styled beautifully) */}
              <button
                type="button"
                onClick={toggleAiSearch}
                className={`absolute right-10 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 transition-all ${
                  isAiSearch
                    ? "bg-gradient-to-r from-terracotta to-kente-gold text-white"
                    : "bg-stone-200 text-stone-600 hover:bg-stone-300"
                }`}
              >
                <Sparkles className="h-2.5 w-2.5" />
                <span>AI</span>
              </button>

              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-3.5 bg-stone-100 hover:bg-stone-200 border-l border-warm-border text-stone-600 transition-colors flex items-center justify-center"
              >
                <Search className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>

          {/* Right Action Icons (Mockup Style) */}
          <div className="hidden md:flex items-center gap-5 text-stone-600">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs font-semibold text-stone-800">
                  <User className="h-4 w-4 text-stone-500" />
                  <span className="max-w-[80px] truncate">{user.displayName || user.email}</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                  className="text-stone-400 hover:text-stone-800 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-4.5 w-4.5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1 text-xs font-semibold hover:text-stone-800 transition-colors"
              >
                <User className="h-4.5 w-4.5" />
                <span>Sign In</span>
              </Link>
            )}

            <span className="text-stone-200">|</span>

            {/* Cart Icon */}
            <Link href="/cart" className="relative flex items-center gap-1 hover:text-stone-850 transition-colors">
              <div className="relative p-1">
                <ShoppingBag className="h-5 w-5 text-stone-600" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-terracotta text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold">Cart</span>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-3">
            <Link href="/cart" className="relative flex items-center text-stone-600">
              <ShoppingBag className="h-5.5 w-5.5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-terracotta text-white text-[8px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-stone-600 hover:text-stone-850 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-stone-100 bg-[#FAF9F6] px-4 pt-4 pb-6 space-y-4 shadow-inner animate-fadeIn">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="flex relative">
            <div className="relative w-full flex items-center bg-white border border-warm-border rounded-lg overflow-hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAiSearch ? "Try 'wedding gift'..." : "Search..."}
                className="w-full pl-3 pr-20 py-1.5 text-xs text-stone-850 focus:outline-none"
              />
              <button
                type="button"
                onClick={toggleAiSearch}
                className={`absolute right-8 px-1.5 py-0.5 rounded text-[8px] font-bold ${
                  isAiSearch
                    ? "bg-terracotta text-white"
                    : "bg-stone-200 text-stone-600"
                }`}
              >
                AI
              </button>
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-2.5 bg-stone-100 text-stone-600 border-l border-warm-border"
              >
                <Search className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>

          {/* Mobile Links */}
          <div className="flex flex-col gap-2 font-semibold text-xs text-stone-600">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-stone-900 py-1.5 border-b border-stone-100"
            >
              Shop All Goods
            </Link>
            <Link
              href="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-stone-900 py-1.5 border-b border-stone-100 text-kente-gold-dark"
            >
              Artisan Dashboard
            </Link>
            {user ? (
              <>
                <div className="text-[10px] text-stone-400 py-1">Logged in: {user.displayName || user.email}</div>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                    router.push("/");
                  }}
                  className="flex items-center gap-1.5 text-left text-red-500 py-1.5"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-stone-900 py-1.5 flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                <span>Account Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const Navbar: React.FC = () => {
  return (
    <Suspense fallback={
      <header className="w-full bg-white text-stone-charcoal border-b border-warm-border h-16 flex items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
          <span className="font-display text-2xl font-black text-stone-charcoal">adepa<span className="text-terracotta font-sans font-light">market</span></span>
          <div className="w-32 h-6 bg-stone-100 rounded animate-pulse"></div>
        </div>
      </header>
    }>
      <NavbarContent />
    </Suspense>
  );
};

export default Navbar;
