"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { generateDescriptionAI } from "@/lib/ai";
import { CATEGORIES, VENDORS } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, ArrowRight, LayoutDashboard, FileText, CheckCircle } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [vendor, setVendor] = useState(VENDORS[0]);
  const [keywords, setKeywords] = useState("");
  const [generatedDesc, setGeneratedDesc] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleGenerateCopy = async () => {
    setValidationError(null);
    if (!productName.trim()) {
      setValidationError("Product Name is required.");
      return;
    }
    if (!keywords.trim()) {
      setValidationError("Provide raw product facts to write the copy.");
      return;
    }

    setLoading(true);
    try {
      const result = await generateDescriptionAI({
        name: productName,
        category,
        vendor,
        keywords,
      });
      setGeneratedDesc(result);
    } catch (e) {
      console.error(e);
      setGeneratedDesc(
        `Handcrafted with pride by ${vendor}, this beautiful ${productName} represents authentic Ghanaian artisan design. Sourced directly from local workshops, it features premium ${keywords} and supports community development.`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddProductSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim() || !generatedDesc.trim()) {
      setValidationError("Generate/write a description first.");
      return;
    }
    
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setProductName("");
      setKeywords("");
      setGeneratedDesc("");
      router.push("/");
    }, 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-charcoal font-sans">
      <Navbar />

      <main className="flex-1 mx-auto max-w-4xl w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Banner */}
        <div className="bg-[#F5ECE1] border border-warm-border rounded-xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 kente-pattern-soft" />
          <div className="relative flex items-center gap-3">
            <LayoutDashboard className="h-5 w-5 text-terracotta" />
            <div>
              <h1 className="font-display font-black text-lg text-stone-850">
                Artisan Dashboard
              </h1>
              <p className="text-[10px] text-stone-500">Draft catalog listings and generate copywriting using Claude.</p>
            </div>
          </div>
        </div>

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg flex items-center gap-2 text-xs font-semibold animate-pulse">
            <CheckCircle className="h-4.5 w-4.5 text-green-600" />
            <span>Success! Simulated uploading product. Returning home...</span>
          </div>
        )}

        {validationError && (
          <div className="bg-red-50 border border-red-200 text-red-750 p-2.5 rounded-lg text-xs font-semibold">
            ⚠️ {validationError}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Attributes form */}
          <div className="bg-white rounded-xl border border-warm-border p-6 space-y-4">
            <h3 className="font-display font-bold text-sm text-stone-900 border-b border-stone-100 pb-2">
              1. Product Facts
            </h3>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-400 uppercase">Product Name</label>
                <input
                  type="text"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Traditional Krobo Brass Ring"
                  className="w-full bg-[#FAF9F5] border border-warm-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-400 uppercase">Vendor</label>
                <select
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
                  className="w-full bg-[#FAF9F5] border border-warm-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:bg-white font-bold"
                >
                  {VENDORS.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-400 uppercase">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#FAF9F5] border border-warm-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:bg-white font-bold"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-400 uppercase">Facts / Keywords</label>
                <textarea
                  rows={3}
                  required
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="e.g. 'pure cocoa butter, cold-pressed, anti-aging'"
                  className="w-full bg-[#FAF9F5] border border-warm-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:bg-white"
                />
              </div>

              <button
                type="button"
                onClick={handleGenerateCopy}
                disabled={loading}
                className="w-full bg-stone-charcoal hover:bg-stone-800 text-white py-2 rounded font-bold text-xs shadow transition-colors flex items-center justify-center gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5 text-kente-gold" />
                <span>{loading ? "Writing description..." : "Generate AI Description"}</span>
              </button>
            </div>
          </div>

          {/* Marketing Copy output */}
          <form onSubmit={handleAddProductSimulation} className="bg-white rounded-xl border border-warm-border p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <h3 className="font-display font-bold text-sm text-stone-900 border-b border-stone-100 pb-2">
                2. Marketing Description
              </h3>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-400 uppercase">Draft Copy</label>
                <textarea
                  rows={7}
                  required
                  value={generatedDesc}
                  onChange={(e) => setGeneratedDesc(e.target.value)}
                  placeholder="AI description output will render here..."
                  className="w-full bg-[#FAF9F5] border border-warm-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={success}
              className="w-full bg-stone-charcoal hover:bg-stone-850 text-white py-2 rounded font-bold text-xs shadow transition-colors flex items-center justify-center gap-1.5"
            >
              <FileText className="h-4 w-4" />
              <span>Simulate Publish Listing</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>

        </div>
      </main>

      <Footer />
    </div>
  );
}
