"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { PRODUCTS, Product } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";
import { ArrowLeft, ShoppingBag, Star, Tag, User, Clock, Check } from "lucide-react";
import Link from "next/link";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewComment, setNewReviewComment] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const found = PRODUCTS.find((p) => p.id === productId);
    if (found) {
      setProduct(found);
      setReviews(found.reviews);
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-[#FAF9F5]">
        <Navbar />
        <div className="text-center py-20">
          <h2 className="text-lg font-bold text-stone-855">Product not found</h2>
          <Link href="/" className="mt-4 inline-block bg-stone-charcoal text-white px-6 py-2 rounded text-xs font-bold">
            Return Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setNotification(`Added ${quantity} x "${product.name}" to cart!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const newRev = {
      id: "rev-new-" + Math.random(),
      userName: newReviewName,
      comment: newReviewComment,
      rating: newReviewRating,
      date: new Date().toISOString().split("T")[0],
    };

    setReviews([newRev, ...reviews]);
    setNewReviewName("");
    setNewReviewComment("");
    setNewReviewRating(5);
  };

  const recommendedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category)
  ).slice(0, 3);

  if (recommendedProducts.length < 3) {
    const others = PRODUCTS.filter(
      (p) => p.id !== product.id && !recommendedProducts.some((r) => r.id === p.id)
    ).slice(0, 3 - recommendedProducts.length);
    recommendedProducts.push(...others);
  }

  const displayPrice = product.promoPrice ?? product.price;
  const hasPromo = !!product.promoPrice;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-charcoal font-sans">
      <Navbar />

      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-stone-charcoal text-white px-6 py-2.5 rounded-full shadow-xl flex items-center gap-2 border border-warm-border text-xs font-semibold animate-slideUp">
          <Check className="h-4 w-4 text-kente-gold" />
          <span>{notification}</span>
        </div>
      )}

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-800 transition-colors mb-6 text-xs font-bold"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to products</span>
        </button>

        {/* Info Grid (Mockup aesthetic - clean white box, soft sand highlights) */}
        <div className="bg-white rounded-xl border border-warm-border overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8 mb-8">
          
          {/* Image Display */}
          <div className="relative h-80 sm:h-[400px] w-full rounded-lg overflow-hidden bg-stone-50 flex items-center justify-center border border-stone-100">
            <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
            {product.badge && (
              <span className={`absolute top-4 left-4 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded text-white shadow ${
                product.badge === "Sale" ? "bg-terracotta" : product.badge === "New" ? "bg-stone-charcoal" : "bg-kente-gold"
              }`}>
                {product.badge}
              </span>
            )}
          </div>

          {/* Product Details Panel */}
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-[#FAF9F5] text-stone-500 border border-warm-border px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                  {product.category}
                </span>
                <span className="text-[10px] font-bold text-stone-400">by {product.vendor}</span>
              </div>

              <h1 className="font-display font-black text-2xl sm:text-3xl text-stone-900 leading-tight">
                {product.name}
              </h1>

              {/* Stars */}
              <div className="flex items-center gap-1 text-amber-500">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < Math.round(reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 5))
                          ? "fill-current"
                          : "text-stone-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-stone-400 font-bold mt-0.5">({reviews.length} reviews)</span>
              </div>

              {/* Price */}
              <div className="text-xl font-display font-black text-stone-900 flex items-baseline gap-2 pt-1">
                <span>GHS {displayPrice.toFixed(2)}</span>
                {hasPromo && (
                  <span className="text-xs text-stone-400 line-through font-sans font-normal">
                    GHS {product.price.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="border-t border-stone-100 pt-4 space-y-1.5">
                <h4 className="text-[10px] font-bold uppercase text-stone-400 tracking-wider">Description</h4>
                <p className="text-stone-600 text-xs leading-relaxed">{product.description}</p>
              </div>
            </div>

            {/* Actions Form */}
            <div className="border-t border-stone-100 pt-4 mt-6 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold uppercase text-stone-400 tracking-wider">Quantity</span>
                <div className="flex items-center border border-warm-border rounded bg-stone-50 p-0.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center font-bold text-stone-600 hover:bg-stone-200"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold text-xs text-stone-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center font-bold text-stone-600 hover:bg-stone-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-stone-charcoal hover:bg-stone-800 text-white py-2.5 rounded font-bold text-xs shadow transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Add to Shopping Cart</span>
              </button>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <section className="bg-white rounded-xl border border-warm-border p-6 mb-8">
          <h3 className="font-display font-bold text-lg text-stone-900 border-b border-stone-100 pb-3 mb-6">
            Customer Reviews
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Write a review */}
            <div className="bg-[#FAF9F5] rounded-xl p-5 border border-warm-border h-fit">
              <h4 className="font-display font-bold text-sm text-stone-850 mb-3">Add Your Review</h4>
              <form onSubmit={handleAddReview} className="space-y-3">
                <div className="space-y-0.5">
                  <label className="text-[10px] font-bold text-stone-400 uppercase">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newReviewName}
                    onChange={(e) => setNewReviewName(e.target.value)}
                    placeholder="Enter name..."
                    className="w-full bg-white border border-warm-border rounded px-3 py-2 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-0.5">
                  <label className="text-[10px] font-bold text-stone-400 uppercase">Rating</label>
                  <select
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(Number(e.target.value))}
                    className="w-full bg-white border border-warm-border rounded px-3 py-2 text-xs focus:outline-none font-semibold text-amber-500"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                    <option value="4">⭐⭐⭐⭐ 4 Stars</option>
                    <option value="3">⭐⭐⭐ 3 Stars</option>
                    <option value="2">⭐⭐ 2 Stars</option>
                    <option value="1">⭐ 1 Star</option>
                  </select>
                </div>

                <div className="space-y-0.5">
                  <label className="text-[10px] font-bold text-stone-400 uppercase">Comment</label>
                  <textarea
                    required
                    rows={3}
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="Write comment..."
                    className="w-full bg-white border border-warm-border rounded px-3 py-2 text-xs focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-stone-charcoal hover:bg-stone-800 text-white py-2 rounded text-xs font-bold shadow transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* List Reviews */}
            <div className="lg:col-span-2 space-y-4">
              {reviews.length === 0 ? (
                <div className="text-center py-8 text-stone-400 text-xs">No reviews listed. Be the first to add one!</div>
              ) : (
                reviews.map((rev) => (
                  <div key={rev.id} className="border-b border-stone-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-stone-100 p-2 rounded-full text-stone-600">
                          <User className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-stone-850">{rev.userName}</h5>
                          <div className="flex text-amber-500 mt-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-2.5 w-2.5 ${i < rev.rating ? "fill-current" : "text-stone-100"}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[9px] text-stone-400 font-semibold">
                        <Clock className="h-3 w-3" />
                        <span>{rev.date}</span>
                      </div>
                    </div>
                    <p className="text-stone-600 text-xs mt-2 pl-9 leading-relaxed">{rev.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Recommendations */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-stone-400">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recommendedProducts.map((p) => {
              const pPrice = p.promoPrice ?? p.price;
              const hasPPrice = !!p.promoPrice;
              return (
                <div
                  key={p.id}
                  className="bg-white rounded-xl overflow-hidden border border-warm-border hover:shadow-md transition-all flex flex-col group"
                >
                  <div className="relative h-40 w-full bg-stone-50">
                    <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover" />
                    <Link
                      href={`/product/${p.id}`}
                      className="absolute inset-0 flex items-center justify-center bg-stone-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="bg-white text-stone-900 px-3.5 py-1.5 rounded font-bold text-[10px] shadow">
                        View Product
                      </span>
                    </Link>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <span className="text-[9px] text-stone-400 font-bold uppercase tracking-wide block">{p.category}</span>
                      <h4 className="font-display font-bold text-xs text-stone-850 mt-0.5 truncate">
                        <Link href={`/product/${p.id}`} className="hover:text-terracotta">{p.name}</Link>
                      </h4>
                    </div>

                    <div className="pt-2 border-t border-stone-50 flex justify-between items-center">
                      <div className="flex flex-col">
                        {hasPPrice && (
                          <span className="text-[9px] text-stone-400 line-through">GHS {p.price.toFixed(2)}</span>
                        )}
                        <span className="font-display font-bold text-xs text-stone-900">GHS {pPrice.toFixed(2)}</span>
                      </div>
                      <button
                        onClick={() => {
                          addToCart(p, 1);
                          setNotification(`Added "${p.name}" to cart!`);
                          setTimeout(() => setNotification(null), 3000);
                        }}
                        className="text-terracotta border border-terracotta/20 hover:bg-terracotta hover:text-white px-3 py-1 rounded text-[10px] font-bold transition-all"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
      <AIChatbot />
    </div>
  );
}
