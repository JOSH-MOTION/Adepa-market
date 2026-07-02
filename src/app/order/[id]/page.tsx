"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { localDb } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";
import { CheckCircle, Clock, Truck, XCircle, Mail } from "lucide-react";
import Link from "next/link";

export default function OrderStatusPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [simulatedEmail, setSimulatedEmail] = useState<any>(null);

  const fetchOrder = async () => {
    try {
      const ord = await localDb.getOrder(orderId);
      setOrder(ord);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();

    if (typeof window !== "undefined") {
      const savedEmail = localStorage.getItem("adepa_new_order_email");
      if (savedEmail) {
        const parsed = JSON.parse(savedEmail);
        if (parsed.orderId === orderId) {
          setSimulatedEmail(parsed);
          localStorage.removeItem("adepa_new_order_email");
        }
      }
    }
  }, [orderId]);

  const handleCancelOrder = async () => {
    if (!order) return;
    if (confirm("Are you sure you want to cancel your artisan order?")) {
      setLoading(true);
      try {
        await localDb.updateOrderStatus(orderId, "Cancelled");
        await fetchOrder();
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF9F5]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-stone-200 border-t-terracotta rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF9F5]">
        <Navbar />
        <div className="mx-auto max-w-sm text-center py-20 px-4 space-y-4">
          <XCircle className="h-10 w-10 text-red-500 mx-auto" />
          <div>
            <h2 className="text-base font-bold text-stone-850">Order not found</h2>
            <p className="text-xs text-stone-400 mt-1">We couldn't locate an order with ID: {orderId}</p>
          </div>
          <Link href="/" className="inline-block bg-stone-charcoal text-white px-4 py-2 rounded text-xs font-bold">
            Back to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isCancelled = order.status === "Cancelled";
  const steps = ["Processing", "Shipped", "Delivered"];
  const currentStepIndex = steps.indexOf(order.status);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-charcoal font-sans">
      <Navbar />

      <main className="flex-1 mx-auto max-w-2xl w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Email Simulation Overlay (Mockup Style) */}
        {simulatedEmail && (
          <div className="bg-stone-charcoal text-white rounded-xl p-5 border border-warm-border shadow-md space-y-3">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2">
              <div className="flex items-center gap-1.5">
                <Mail className="h-4 w-4 text-kente-gold animate-bounce" />
                <h4 className="text-xs font-bold text-kente-gold">Simulated Email Confirmed</h4>
              </div>
              <button onClick={() => setSimulatedEmail(null)} className="text-[9px] bg-stone-800 px-2 py-0.5 rounded text-stone-300">
                Close
              </button>
            </div>

            <div className="bg-white text-stone-800 rounded-lg p-3.5 text-[11px] space-y-2">
              <div className="border-b border-stone-100 pb-1.5 text-[9px] text-stone-400 font-mono">
                <p>From: orders@adepamarket.com.gh</p>
                <p>To: {simulatedEmail.email}</p>
                <p>Subject: Adepa Market Order Confirmed • #{simulatedEmail.orderId}</p>
              </div>

              <div className="space-y-1.5">
                <p className="font-bold text-stone-900">Hello {simulatedEmail.name},</p>
                <p className="leading-relaxed">
                  Your artisan order #{simulatedEmail.orderId} has been confirmed. Thank you for supporting local Ghanaian creators!
                </p>
                <p className="font-semibold text-stone-500">Paid Amount: GHS {simulatedEmail.total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tracking Card */}
        <div className="bg-white rounded-xl border border-warm-border p-6 space-y-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-stone-100 pb-4 gap-3">
            <div>
              <span className="text-[9px] bg-[#FAF9F5] text-stone-400 border border-warm-border px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                Order Tracking Status
              </span>
              <h2 className="font-display font-black text-xl text-stone-900 mt-1">
                Order #{order.id}
              </h2>
            </div>

            {order.status === "Processing" && (
              <button
                onClick={handleCancelOrder}
                className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-100 text-[10px] px-3.5 py-1.5 rounded font-bold transition-all"
              >
                Cancel Order
              </button>
            )}

            {isCancelled && (
              <span className="bg-red-50 text-red-700 border border-red-100 text-[10px] px-3.5 py-1.5 rounded font-bold">
                Cancelled
              </span>
            )}
          </div>

          {/* Steps */}
          {!isCancelled && (
            <div className="py-2">
              <div className="relative flex items-center justify-between">
                <div className="absolute left-0 right-0 h-0.5 bg-stone-100 -z-10">
                  <div
                    className="h-full bg-terracotta"
                    style={{ width: `${(currentStepIndex / 2) * 100}%` }}
                  />
                </div>

                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center border ${
                    currentStepIndex >= 0 ? "bg-terracotta border-terracotta text-white" : "bg-white border-stone-200 text-stone-400"
                  }`}>
                    <Clock className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-[9px] font-bold mt-1">Processing</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center border ${
                    currentStepIndex >= 1 ? "bg-terracotta border-terracotta text-white" : "bg-white border-stone-200 text-stone-400"
                  }`}>
                    <Truck className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-[9px] font-bold mt-1">Shipped</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center border ${
                    currentStepIndex >= 2 ? "bg-terracotta border-terracotta text-white" : "bg-white border-stone-200 text-stone-400"
                  }`}>
                    <CheckCircle className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-[9px] font-bold mt-1">Delivered</span>
                </div>
              </div>
            </div>
          )}

          {/* Details */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-base text-stone-900 border-b border-stone-100 pb-2">
              Order Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600">
              <div className="space-y-1">
                <p className="font-bold text-stone-400 uppercase tracking-wide">Shipping Address</p>
                <p className="text-stone-850 font-bold">{order.shipping.fullName}</p>
                <p>{order.shipping.address}</p>
                <p>{order.shipping.city}, Ghana</p>
              </div>

              <div className="space-y-1">
                <p className="font-bold text-stone-400 uppercase tracking-wide">Paid Summary</p>
                <p className="text-stone-850 font-bold">Method: {order.payment.method === "stripe" ? "Credit Card" : "Mobile Money"}</p>
                <p>Details: {order.payment.details}</p>
                <p className="font-bold text-stone-850 mt-1">Grand Total: GHS {order.totals.grandTotal.toFixed(2)}</p>
              </div>
            </div>

            <div className="border-t border-stone-100 pt-4 space-y-2">
              <p className="font-display font-bold text-xs text-stone-850">Items</p>
              <div className="space-y-2">
                {order.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-stone-800">{item.name}</p>
                      <p className="text-[9px] text-stone-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-stone-900">GHS {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <AIChatbot />
    </div>
  );
}
