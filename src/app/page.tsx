"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PRODUCTS, Product } from "@/lib/data";
import { searchAI } from "@/lib/ai";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";
import { ShoppingCart, Sparkles, Eye, Tag, Star, ChevronRight, Check, Shirt, Gem, Home as HomeIcon, Flower, Palette, Flame } from "lucide-react";
import Link from "next/link";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToCart } = useCart();

  const queryParam = searchParams.get("q") || "";
  const aiParam = searchParams.get("ai") === "true";
  const categoryParam = searchParams.get("category") || "";

  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const filterAndSearch = async () => {
      setActiveCategory(categoryParam);
      
      if (!queryParam) {
        if (categoryParam) {
          setProducts(PRODUCTS.filter((p) => p.category === categoryParam));
        } else {
          setProducts(PRODUCTS);
        }
        return;
      }

      setLoading(true);
      if (aiParam) {
        try {
          const matchedIds = await searchAI(queryParam);
          let filtered = PRODUCTS.filter((p) => matchedIds.includes(p.id));
          if (categoryParam) {
            filtered = filtered.filter((p) => p.category === categoryParam);
          }
          setProducts(filtered);
        } catch (e) {
          console.error(e);
          fallbackSearch();
        }
      } else {
        fallbackSearch();
      }
      setLoading(false);
    };

    const fallbackSearch = () => {
      const q = queryParam.toLowerCase();
      let filtered = PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.vendor.toLowerCase().includes(q)
      );
      if (categoryParam) {
        filtered = filtered.filter((p) => p.category === categoryParam);
      }
      setProducts(filtered);
    };

    filterAndSearch();
  }, [queryParam, aiParam, categoryParam]);

  const handleCategorySelect = (category: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (category) {
      current.set("category", category);
    } else {
      current.delete("category");
    }
    router.push(`/?${current.toString()}`);
  };

  const triggerAddToCart = (product: Product) => {
    addToCart(product, 1);
    setNotification(`Added "${product.name}" to cart!`);
    setTimeout(() => setNotification(null), 3000);
  };

  // Group items into rows like the mockup
  const trendingCrafts = products.slice(0, 4);
  const bestSellers = products.slice(4, 8);
  const bodyBeauty = products.slice(8, 12);
  const foodAndArt = products.slice(12, 16);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-charcoal font-sans">
      <Navbar />

      {/* Floating Notification */}
      {notification && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-stone-charcoal text-white px-6 py-2.5 rounded-full shadow-xl flex items-center gap-2 border border-warm-border text-xs font-semibold animate-slideUp">
          <Check className="h-4 w-4 text-kente-gold" />
          <span>{notification}</span>
        </div>
      )}

      {/* 1. Shop Computers & Accessories Banner (Mockup style Redesign) */}
      {!queryParam && !categoryParam && (
        <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-6">
          <div className="bg-[#F5ECE1] rounded-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative overflow-hidden border border-warm-border/60">
            <div className="space-y-5 z-10">
              <span className="text-[10px] font-bold tracking-wider text-stone-500 uppercase">Featured Artisan Item</span>
              <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight leading-tight text-stone-charcoal">
                SHOP HANDWOVEN<br />TEXTILES & CRAFTS
              </h1>
              <p className="text-xs text-stone-500 max-w-sm leading-relaxed">
                Experience the heritage of Kofi's Kente Krafts. Handwoven with authentic colors representing royalty and spiritual purity.
              </p>
              <Link
                href="/product/prod-1"
                className="inline-block bg-stone-charcoal hover:bg-stone-800 text-white text-xs font-bold px-6 py-2.5 rounded shadow-md transition-colors"
              >
                View Stole
              </Link>
            </div>
            
            {/* Visual representation of featured product (mockup style) */}
            <div className="relative flex justify-center items-center h-60 sm:h-72">
              <div className="absolute w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-white opacity-40 border border-warm-border animate-pulse"></div>
              <div className="absolute w-40 h-40 sm:w-52 sm:h-52 rounded-full bg-gradient-to-tr from-amber-500 via-red-500 to-yellow-400 opacity-80 shadow-2xl flex items-center justify-center text-white">
                <span className="font-display font-black text-sm tracking-widest text-center uppercase drop-shadow-md">KENTE</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Icons Row */}
      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center border-b border-warm-border pb-4 mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-stone-400">Shop by Categories</h2>
          <button onClick={() => handleCategorySelect("")} className="text-xs font-bold text-stone-500 hover:text-stone-850 flex items-center gap-0.5">
            <span>View All</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { name: "Fashion & Textiles", color: "from-amber-100 to-red-100", textColor: "text-amber-700", icon: Shirt },
            { name: "Jewelry & Beads", color: "from-cyan-100 to-teal-100", textColor: "text-teal-700", icon: Gem },
            { name: "Home Décor", color: "from-orange-100 to-amber-100", textColor: "text-orange-700", icon: HomeIcon },
            { name: "Beauty Products", color: "from-yellow-100 to-amber-100", textColor: "text-yellow-600", icon: Flower },
            { name: "Art & Paintings", color: "from-indigo-100 to-purple-100", textColor: "text-indigo-700", icon: Palette },
            { name: "Spices & Foods", color: "from-red-100 to-rose-100", textColor: "text-red-700", icon: Flame }
          ].map((cat) => {
            const IconComponent = cat.icon;
            return (
              <button
                key={cat.name}
                onClick={() => handleCategorySelect(cat.name)}
                className={`bg-white rounded-xl p-5 border text-center flex flex-col items-center gap-3 transition-all hover:-translate-y-1 hover:shadow-md ${
                  activeCategory === cat.name ? "border-terracotta ring-1 ring-terracotta" : "border-warm-border"
                }`}
              >
                <div className={`w-14 h-14 rounded-full bg-gradient-to-tr ${cat.color} flex items-center justify-center ${cat.textColor} shadow-inner`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <span className="text-xs font-bold text-stone-850">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Contents / Shelves */}
      <main className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-4 flex-1 space-y-12">
        
        {/* Search details */}
        {queryParam && (
          <div className="bg-white border border-warm-border rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500">
                Found matches for: <strong className="text-stone-800">"{queryParam}"</strong>
              </span>
              {aiParam && (
                <span className="inline-flex items-center gap-1 bg-gradient-to-r from-terracotta to-kente-gold text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm animate-pulse">
                  <Sparkles className="h-2.5 w-2.5" />
                  AI Interpreted
                </span>
              )}
            </div>
            <button
              onClick={() => router.push("/")}
              className="text-xs text-terracotta hover:underline font-bold"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <div className="w-8 h-8 border-3 border-stone-200 border-t-terracotta rounded-full animate-spin"></div>
            <p className="text-xs text-stone-500 font-medium">Claude is analyzing matches...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-warm-border p-6 shadow-sm">
            <h3 className="text-sm font-bold text-stone-800">No products found</h3>
            <p className="text-xs text-stone-400 mt-1">We couldn't locate matching artisan crafts. Tweak keywords or clear search filter.</p>
            <button onClick={() => router.push("/")} className="mt-4 bg-stone-800 text-white px-4 py-2 rounded text-xs font-bold">
              View All
            </button>
          </div>
        ) : (
          <>
            {/* Shelf 1: Trending crafts */}
            {trendingCrafts.length > 0 && (
              <section className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-400">Trending Handicrafts</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {trendingCrafts.map((p) => (
                    <ProductCard key={p.id} product={p} onAdd={triggerAddToCart} />
                  ))}
                </div>
              </section>
            )}

            {/* Redesigned Middle Promotional Banner */}
            {!queryParam && !categoryParam && (
              <section className="bg-white border border-warm-border rounded-xl p-8 text-center space-y-4 relative overflow-hidden">
                <div className="absolute inset-0 kente-pattern-soft"></div>
                <div className="relative z-10 max-w-md mx-auto space-y-2">
                  <h3 className="font-display font-black text-xl text-stone-850">ADEPA DELIVERS NATIONWIDE</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Enjoy fast standard delivery across Accra & Tema for just 15 GHS. Free shipping applies to orders over 500 GHS.
                  </p>
                </div>
              </section>
            )}

            {/* Shelf 2: Best Sellers */}
            {bestSellers.length > 0 && (
              <section className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-400">Best Seller Crafts</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {bestSellers.map((p) => (
                    <ProductCard key={p.id} product={p} onAdd={triggerAddToCart} />
                  ))}
                </div>
              </section>
            )}

            {/* Shelf 3: Beauty & Wellness */}
            {bodyBeauty.length > 0 && (
              <section className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-400">Beauty & Wellness</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {bodyBeauty.map((p) => (
                    <ProductCard key={p.id} product={p} onAdd={triggerAddToCart} />
                  ))}
                </div>
              </section>
            )}

            {/* Shelf 4: Heritage Art & Pantry */}
            {foodAndArt.length > 0 && (
              <section className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-400">Heritage Art & Pantry</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {foodAndArt.map((p) => (
                    <ProductCard key={p.id} product={p} onAdd={triggerAddToCart} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* Mockup Style newsletter signup */}
        {!queryParam && !categoryParam && (
          <section className="bg-[#F5ECE1] rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 border border-warm-border">
            <div className="space-y-2">
              <h3 className="font-display font-black text-lg text-stone-850">SUBSCRIBE TO THE NEWS</h3>
              <p className="text-xs text-stone-500">Sign up to support independent artisans and unlock exclusive discounts.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter email address"
                className="bg-white border border-warm-border rounded px-4 py-2 text-xs focus:outline-none w-full md:w-60"
              />
              <button
                onClick={() => alert("Simulated Subscription Complete!")}
                className="bg-stone-charcoal hover:bg-stone-800 text-white text-xs font-bold px-6 py-2 rounded whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </section>
        )}

      </main>

      <Footer />
      <AIChatbot />
    </div>
  );
}

// Product Card Sub-Component (Clean amazon mockup style)
const ProductCard: React.FC<{ product: Product; onAdd: (p: Product) => void }> = ({ product, onAdd }) => {
  const displayPrice = product.promoPrice ?? product.price;
  const hasPromo = !!product.promoPrice;

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-warm-border hover:shadow-md transition-all flex flex-col group relative">
      
      {/* Badge */}
      {product.badge && (
        <span className={`absolute top-3 left-3 z-10 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded text-white shadow ${
          product.badge === "Sale" ? "bg-terracotta" : product.badge === "New" ? "bg-stone-charcoal" : "bg-kente-gold"
        }`}>
          {product.badge}
        </span>
      )}

      {/* Image Block */}
      <div className="relative h-48 w-full bg-stone-50 flex items-center justify-center overflow-hidden border-b border-stone-100">
        <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-350" />
        
        {/* Hover quick action overlay */}
        <Link
          href={`/product/${product.id}`}
          className="absolute inset-0 flex items-center justify-center bg-stone-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <span className="bg-white text-stone-900 px-3.5 py-1.5 rounded font-bold text-[10px] flex items-center gap-1 shadow-lg">
            <Eye className="h-3 w-3" />
            <span>Details</span>
          </span>
        </Link>
      </div>

      {/* Card Info */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
        <div className="space-y-1">
          <span className="text-[9px] text-stone-400 font-bold uppercase tracking-wider block">{product.category}</span>
          <h4 className="font-display font-bold text-sm text-stone-850 hover:text-terracotta line-clamp-1">
            <Link href={`/product/${product.id}`}>{product.name}</Link>
          </h4>
          <span className="text-[9px] text-stone-400 block font-medium">by {product.vendor}</span>

          {/* Star ratings mockup styling */}
          <div className="flex items-center gap-1 text-amber-500 pt-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-current" />
              ))}
            </div>
            <span className="text-[9px] text-stone-400 font-semibold">(5.0)</span>
          </div>
        </div>

        {/* Pricing / CTA row */}
        <div className="pt-2 border-t border-stone-50 flex justify-between items-center">
          <div className="flex flex-col">
            {hasPromo && (
              <span className="text-[9px] text-stone-400 line-through">GHS {product.price.toFixed(2)}</span>
            )}
            <span className="font-display font-black text-sm text-stone-850">GHS {displayPrice.toFixed(2)}</span>
          </div>
          <button
            onClick={() => onAdd(product)}
            className="bg-stone-50 hover:bg-stone-100 text-stone-700 hover:text-stone-900 border border-warm-border p-2 rounded transition-colors"
            title="Add to cart"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F5] space-y-4">
        <div className="w-8 h-8 border-3 border-stone-200 border-t-terracotta rounded-full animate-spin"></div>
        <p className="text-xs text-stone-400 font-medium">Loading Adepa Market...</p>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
