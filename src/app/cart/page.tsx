"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { PRODUCTS, Product } from "@/lib/data";
import { getAIRecommendations, AIRecommendation } from "@/lib/ai";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";
import { Trash2, ArrowRight, Sparkles, ShoppingBag, Plus, Minus, Check } from "lucide-react";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, addToCart } = useCart();
  const [aiRecs, setAiRecs] = useState<AIRecommendation[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecs = async () => {
      if (cart.length === 0) {
        setAiRecs([]);
        return;
      }
      setLoadingRecs(true);
      try {
        const cartItemsData = cart.map((item) => ({
          id: item.product.id,
          name: item.product.name,
        }));
        const recommendations = await getAIRecommendations(cartItemsData);
        setAiRecs(recommendations);
      } catch (e) {
        console.error(e);
      }
      setLoadingRecs(false);
    };

    fetchRecs();
  }, [cart]);

  const handleAddRecommended = (pId: string, pName: string) => {
    const p = PRODUCTS.find((prod) => prod.id === pId);
    if (p) {
      addToCart(p, 1);
      setNotification(`Added "${pName}" to your cart!`);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-charcoal font-sans">
      <Navbar />

      {/* Cart Toast Notification */}
      {notification && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-stone-charcoal text-white px-6 py-2.5 rounded-full shadow-xl flex items-center gap-2 border border-warm-border text-xs font-semibold animate-slideUp">
          <Check className="h-4 w-4 text-kente-gold" />
          <span>{notification}</span>
        </div>
      )}

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-display font-black text-2xl text-stone-900 mb-6 pb-3 border-b border-warm-border">
          Your Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-warm-border px-4 space-y-4">
            <ShoppingBag className="h-12 w-12 text-stone-300 mx-auto" />
            <div>
              <h2 className="text-base font-bold text-stone-850">Your cart is empty</h2>
              <p className="text-xs text-stone-400 mt-0.5">Fill it with premium, hand-crafted Ghanaian goods!</p>
            </div>
            <Link
              href="/"
              className="inline-block bg-stone-charcoal hover:bg-stone-800 text-white px-6 py-2 rounded text-xs font-bold transition-colors"
            >
              Browse Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => {
                const itemPrice = item.product.promoPrice ?? item.product.price;
                const totalItemPrice = itemPrice * item.quantity;

                return (
                  <div
                    key={item.product.id}
                    className="bg-white rounded-xl p-4 border border-warm-border flex flex-col sm:flex-row gap-4 sm:items-center justify-between"
                  >
                    {/* Item Info */}
                    <div className="flex gap-4 items-center">
                      <img src={item.product.image} alt={item.product.name} className="h-16 w-16 rounded object-cover shrink-0 border border-stone-100" />
                      <div>
                        <span className="text-[9px] text-stone-400 font-bold uppercase tracking-wide">{item.product.category}</span>
                        <h3 className="font-display font-bold text-sm text-stone-900 hover:text-terracotta mt-0.5">
                          <Link href={`/product/${item.product.id}`}>{item.product.name}</Link>
                        </h3>
                        <p className="text-[9px] text-stone-400">by {item.product.vendor}</p>
                      </div>
                    </div>

                    {/* Actions / Price */}
                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      {/* Quantity select */}
                      <div className="flex items-center border border-warm-border rounded bg-stone-50 p-0.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6.5 h-6.5 flex items-center justify-center font-bold text-stone-600 hover:bg-stone-200"
                        >
                          <Minus className="h-2.5 w-2.5" />
                        </button>
                        <span className="w-6 text-center font-bold text-xs text-stone-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6.5 h-6.5 flex items-center justify-center font-bold text-stone-600 hover:bg-stone-200"
                        >
                          <Plus className="h-2.5 w-2.5" />
                        </button>
                      </div>

                      {/* Pricing */}
                      <div className="text-right shrink-0">
                        <span className="block font-display font-bold text-sm text-stone-900">
                          GHS {totalItemPrice.toFixed(2)}
                        </span>
                        <span className="text-[9px] text-stone-400">
                          GHS {itemPrice.toFixed(2)} each
                        </span>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-stone-300 hover:text-red-500 transition-colors p-1"
                        title="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cart Summary & AI recommendations */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-xl p-5 border border-warm-border space-y-4 shadow-sm">
                <h3 className="font-display font-bold text-base text-stone-900 border-b border-stone-100 pb-2">
                  Order Summary
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-stone-500">
                    <span>Subtotal</span>
                    <span className="font-bold text-stone-850">GHS {cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Delivery</span>
                    <span className="text-stone-450 italic">Est. at Checkout</span>
                  </div>
                  <div className="border-t border-stone-100 pt-3 flex justify-between text-stone-900">
                    <span className="font-bold">Estimated Total</span>
                    <span className="font-display font-black text-base text-stone-900">
                      GHS {cartTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full bg-stone-charcoal hover:bg-stone-800 text-white py-2.5 rounded font-bold text-xs transition-colors shadow flex items-center justify-center gap-1.5"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Redesigned AI Recommendations widget */}
              <div className="bg-[#FAF9F5] border border-warm-border rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-1.5 border-b border-warm-border pb-2">
                  <Sparkles className="h-3.5 w-3.5 text-kente-gold" />
                  <h4 className="font-display font-bold text-xs text-stone-850 uppercase tracking-wider">AI Recommendations</h4>
                </div>

                {loadingRecs ? (
                  <div className="flex items-center justify-center py-4 gap-2 text-[10px] text-stone-400">
                    <div className="w-3.5 h-3.5 border-2 border-stone-300 border-t-terracotta rounded-full animate-spin"></div>
                    <span>Claude suggestions...</span>
                  </div>
                ) : aiRecs.length === 0 ? (
                  <p className="text-[10px] text-stone-400">Add products to view complementary matching crafts.</p>
                ) : (
                  <div className="space-y-3">
                    {aiRecs.map((rec) => {
                      const prod = PRODUCTS.find((p) => p.id === rec.id);
                      if (!prod) return null;
                      const price = prod.promoPrice ?? prod.price;

                      return (
                        <div key={rec.id} className="bg-white border border-warm-border rounded-lg p-3 space-y-2">
                          <div className="flex justify-between items-center gap-2">
                            <h5 className="text-[11px] font-bold text-stone-850 truncate">{prod.name}</h5>
                            <span className="text-[10px] font-bold text-stone-800">GHS {price}</span>
                          </div>
                          <p className="text-[9px] text-stone-500 italic leading-relaxed">
                            "{rec.reason}"
                          </p>
                          <button
                            onClick={() => handleAddRecommended(rec.id, prod.name)}
                            className="w-full bg-stone-105 hover:bg-stone-200 text-stone-700 text-[9px] font-bold py-1 rounded transition-colors"
                          >
                            + Add to Cart
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <AIChatbot />
    </div>
  );
}
