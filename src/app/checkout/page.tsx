"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { localDb } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  CreditCard,
  Truck,
  FileText,
  ChevronRight,
  Phone,
  Smartphone,
} from "lucide-react";

type Step = "shipping" | "payment" | "review";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    if (cart.length === 0) {
      router.push("/cart");
    }
  }, [cart, router]);

  const [activeStep, setActiveStep] = useState<Step>("shipping");

  const [shippingForm, setShippingForm] = useState({
    fullName: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "Accra",
    region: "Greater Accra",
  });

  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "momo">("stripe");

  const [stripeForm, setStripeForm] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const [momoForm, setMomoForm] = useState({
    provider: "MTN MoMo",
    momoNumber: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const shippingCost = cartTotal > 500 ? 0 : shippingForm.city.toLowerCase() === "accra" ? 15 : 35;
  const grandTotal = cartTotal + shippingCost;

  const validateShipping = () => {
    const errs: { [key: string]: string } = {};
    if (!shippingForm.fullName.trim()) errs.fullName = "Name is required.";
    if (!shippingForm.email.trim() || !/\S+@\S+\.\S+/.test(shippingForm.email)) {
      errs.email = "Valid email required.";
    }
    if (!shippingForm.phone.trim() || shippingForm.phone.length < 9) {
      errs.phone = "Enter a valid phone number.";
    }
    if (!shippingForm.address.trim()) errs.address = "Address is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validatePayment = () => {
    const errs: { [key: string]: string } = {};
    if (paymentMethod === "stripe") {
      if (!stripeForm.cardNumber.replace(/\s/g, "").match(/^\d{16}$/)) {
        errs.cardNumber = "Valid 16-digit card required.";
      }
      if (!stripeForm.expiry.match(/^\d{2}\/\d{2}$/)) {
        errs.expiry = "MM/YY format.";
      }
      if (!stripeForm.cvc.match(/^\d{3}$/)) {
        errs.cvc = "3-digit CVC.";
      }
    } else {
      if (!momoForm.momoNumber.replace(/\s/g, "").match(/^0\d{9}$/)) {
        errs.momoNumber = "Valid 10-digit number required.";
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (activeStep === "shipping") {
      if (validateShipping()) setActiveStep("payment");
    } else if (activeStep === "payment") {
      if (validatePayment()) setActiveStep("review");
    }
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const orderPayload = {
        items: cart.map((i) => ({
          productId: i.product.id,
          name: i.product.name,
          quantity: i.quantity,
          price: i.product.promoPrice ?? i.product.price,
          vendor: i.product.vendor,
        })),
        shipping: shippingForm,
        payment: {
          method: paymentMethod,
          details: paymentMethod === "stripe" ? "Stripe (Cardending " + stripeForm.cardNumber.slice(-4) + ")" : momoForm.provider + " (" + momoForm.momoNumber + ")",
        },
        totals: {
          subtotal: cartTotal,
          shipping: shippingCost,
          grandTotal: grandTotal,
        },
        status: "Processing",
      };

      const completedOrder = await localDb.addOrder(orderPayload);
      
      if (completedOrder) {
        localStorage.setItem("adepa_new_order_email", JSON.stringify({
          orderId: completedOrder.id,
          email: shippingForm.email,
          name: shippingForm.fullName,
          total: grandTotal,
          items: orderPayload.items
        }));
        
        clearCart();
        router.push(`/order/${completedOrder.id}`);
      }
    } catch (e) {
      console.error(e);
      alert("Error placing order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-charcoal font-sans">
      <Navbar />

      <main className="flex-1 mx-auto max-w-5xl w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Progress Bar (Mockup style) */}
        <div className="bg-white border border-warm-border rounded-xl p-4 flex items-center justify-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-stone-850">
            <Truck className="h-4 w-4 text-terracotta" />
            <span>Shipping</span>
          </div>
          <ChevronRight className="h-3 w-3 text-stone-300" />
          <div className={`flex items-center gap-1.5 ${activeStep !== "shipping" ? "text-stone-850" : "text-stone-400"}`}>
            <CreditCard className="h-4 w-4" />
            <span>Payment</span>
          </div>
          <ChevronRight className="h-3 w-3 text-stone-300" />
          <div className={`flex items-center gap-1.5 ${activeStep === "review" ? "text-stone-850" : "text-stone-400"}`}>
            <FileText className="h-4 w-4" />
            <span>Review & Order</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Form Fields */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-warm-border p-6 space-y-6">
            
            {/* STEP 1: SHIPPING */}
            {activeStep === "shipping" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-black text-lg text-stone-900">Shipping Details</h2>
                  <p className="text-[10px] text-stone-400 mt-0.5">Specify delivery location in Ghana.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-400 uppercase">Full Name</label>
                    <input
                      type="text"
                      value={shippingForm.fullName}
                      onChange={(e) => setShippingForm({ ...shippingForm, fullName: e.target.value })}
                      placeholder="e.g. Ama Serwaa"
                      className="w-full bg-[#FAF9F5] border border-warm-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:bg-white"
                    />
                    {errors.fullName && <span className="text-[9px] text-red-500 font-semibold">{errors.fullName}</span>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-400 uppercase">Email Address</label>
                    <input
                      type="email"
                      value={shippingForm.email}
                      onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                      placeholder="name@domain.com"
                      className="w-full bg-[#FAF9F5] border border-warm-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:bg-white"
                    />
                    {errors.email && <span className="text-[9px] text-red-500 font-semibold">{errors.email}</span>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-400 uppercase">Phone Number</label>
                    <div className="relative">
                      <Phone className="h-3.5 w-3.5 text-stone-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        value={shippingForm.phone}
                        onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                        placeholder="e.g. 0501234567"
                        className="w-full bg-[#FAF9F5] border border-warm-border rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:bg-white"
                      />
                    </div>
                    {errors.phone && <span className="text-[9px] text-red-500 font-semibold">{errors.phone}</span>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-400 uppercase">City</label>
                    <select
                      value={shippingForm.city}
                      onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                      className="w-full bg-[#FAF9F5] border border-warm-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:bg-white font-bold"
                    >
                      <option value="Accra">Accra (15 GHS)</option>
                      <option value="Tema">Tema (15 GHS)</option>
                      <option value="Kumasi">Kumasi (35 GHS)</option>
                      <option value="Tamale">Tamale (35 GHS)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-stone-400 uppercase">Address</label>
                  <textarea
                    rows={2}
                    value={shippingForm.address}
                    onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                    placeholder="Oxford Street, House No..."
                    className="w-full bg-[#FAF9F5] border border-warm-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:bg-white"
                  />
                  {errors.address && <span className="text-[9px] text-red-500 font-semibold">{errors.address}</span>}
                </div>

                <button
                  onClick={handleNextStep}
                  className="w-full bg-stone-charcoal hover:bg-stone-800 text-white py-2.5 rounded font-bold text-xs shadow flex items-center justify-center gap-1.5"
                >
                  <span>Continue to Payment</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            {/* STEP 2: PAYMENT METHOD */}
            {activeStep === "payment" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-black text-lg text-stone-900">Payment</h2>
                  <p className="text-[10px] text-stone-400 mt-0.5">Select a mock payment method.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => { setPaymentMethod("stripe"); setErrors({}); }}
                    className={`p-3 rounded-lg border text-center flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === "stripe"
                        ? "border-stone-charcoal bg-stone-50/50 text-stone-900 shadow-sm ring-1 ring-stone-charcoal"
                        : "border-warm-border bg-white text-stone-400 hover:bg-stone-50"
                    }`}
                  >
                    <CreditCard className="h-5 w-5 text-terracotta" />
                    <span className="text-[10px] font-bold">Credit Card</span>
                  </button>

                  <button
                    onClick={() => { setPaymentMethod("momo"); setErrors({}); }}
                    className={`p-3 rounded-lg border text-center flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === "momo"
                        ? "border-stone-charcoal bg-stone-50/50 text-stone-900 shadow-sm ring-1 ring-stone-charcoal"
                        : "border-warm-border bg-white text-stone-400 hover:bg-stone-50"
                    }`}
                  >
                    <Smartphone className="h-5 w-5 text-terracotta" />
                    <span className="text-[10px] font-bold">Mobile Money</span>
                  </button>
                </div>

                {paymentMethod === "stripe" ? (
                  <div className="bg-[#FAF9F5] p-4 rounded-lg border border-warm-border space-y-3">
                    <span className="text-[9px] bg-stone-200 text-stone-600 px-2 py-0.5 rounded font-bold uppercase">Stripe Card</span>
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-stone-500">Card Number</label>
                      <input
                        type="text"
                        maxLength={19}
                        value={stripeForm.cardNumber}
                        onChange={(e) => setStripeForm({ ...stripeForm, cardNumber: e.target.value })}
                        placeholder="4242 4242 4242 4242"
                        className="w-full bg-white border border-warm-border rounded-lg px-3 py-2 text-xs focus:outline-none"
                      />
                      {errors.cardNumber && <span className="text-[9px] text-red-500 font-semibold">{errors.cardNumber}</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-semibold text-stone-500">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          maxLength={5}
                          value={stripeForm.expiry}
                          onChange={(e) => setStripeForm({ ...stripeForm, expiry: e.target.value })}
                          placeholder="12/28"
                          className="w-full bg-white border border-warm-border rounded-lg px-3 py-2 text-xs focus:outline-none text-center"
                        />
                        {errors.expiry && <span className="text-[9px] text-red-500 font-semibold">{errors.expiry}</span>}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-semibold text-stone-500">CVC</label>
                        <input
                          type="text"
                          maxLength={3}
                          value={stripeForm.cvc}
                          onChange={(e) => setStripeForm({ ...stripeForm, cvc: e.target.value })}
                          placeholder="123"
                          className="w-full bg-white border border-warm-border rounded-lg px-3 py-2 text-xs focus:outline-none text-center"
                        />
                        {errors.cvc && <span className="text-[9px] text-red-500 font-semibold">{errors.cvc}</span>}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#FAF9F5] p-4 rounded-lg border border-warm-border space-y-3">
                    <span className="text-[9px] bg-amber-100 text-kente-gold-dark px-2 py-0.5 rounded font-bold uppercase">MoMo</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-semibold text-stone-500">Provider</label>
                        <select
                          value={momoForm.provider}
                          onChange={(e) => setMomoForm({ ...momoForm, provider: e.target.value })}
                          className="w-full bg-white border border-warm-border rounded-lg px-3 py-2 text-xs focus:outline-none font-bold"
                        >
                          <option value="MTN MoMo">MTN Mobile Money</option>
                          <option value="Telecel Cash">Telecel Cash</option>
                          <option value="AT Money">AT Money</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-semibold text-stone-500">MoMo Number</label>
                        <input
                          type="text"
                          maxLength={10}
                          value={momoForm.momoNumber}
                          onChange={(e) => setMomoForm({ ...momoForm, momoNumber: e.target.value })}
                          placeholder="e.g. 0244123456"
                          className="w-full bg-white border border-warm-border rounded-lg px-3 py-2 text-xs focus:outline-none"
                        />
                        {errors.momoNumber && <span className="text-[9px] text-red-500 font-semibold">{errors.momoNumber}</span>}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <button onClick={() => setActiveStep("shipping")} className="flex-1 bg-stone-50 hover:bg-stone-100 border border-warm-border py-2 rounded text-xs font-bold">
                    Back
                  </button>
                  <button onClick={handleNextStep} className="flex-1 bg-stone-charcoal hover:bg-stone-800 text-white py-2 rounded text-xs font-bold">
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: REVIEW & ORDER */}
            {activeStep === "review" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-black text-lg text-stone-900">Review & Order</h2>
                  <p className="text-[10px] text-stone-400 mt-0.5">Please confirm all checkout details before billing.</p>
                </div>

                <div className="border border-warm-border rounded-lg p-4 space-y-3 text-xs bg-[#FAF9F5]">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-bold text-stone-400 uppercase tracking-wide">Shipping Address</h4>
                      <p className="font-bold mt-1">{shippingForm.fullName}</p>
                      <p>{shippingForm.address}</p>
                      <p>{shippingForm.city}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-400 uppercase tracking-wide">Payment Details</h4>
                      <p className="font-bold mt-1">{paymentMethod === "stripe" ? "Stripe (Test)" : momoForm.provider}</p>
                      <p className="text-stone-500">{paymentMethod === "stripe" ? "Card ending " + stripeForm.cardNumber.slice(-4) : momoForm.momoNumber}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setActiveStep("payment")} className="flex-1 bg-stone-50 hover:bg-stone-100 border border-warm-border py-2 rounded text-xs font-bold">
                    Back
                  </button>
                  <button onClick={handlePlaceOrder} disabled={loading} className="flex-1 bg-stone-charcoal hover:bg-stone-800 text-white py-2 rounded text-xs font-bold disabled:opacity-40">
                    {loading ? "Processing..." : "Place Order"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Summary Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl p-5 border border-warm-border space-y-4 shadow-sm">
              <h3 className="font-display font-bold text-sm text-stone-900 border-b border-stone-100 pb-2">
                Order Items
              </h3>

              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {cart.map((item) => {
                  const price = item.product.promoPrice ?? item.product.price;
                  return (
                    <div key={item.product.id} className="flex justify-between items-center text-xs gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-stone-850 truncate">{item.product.name}</p>
                        <p className="text-[9px] text-stone-400">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-stone-900 shrink-0">
                        GHS {(price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-stone-100 pt-3 space-y-2 text-xs">
                <div className="flex justify-between text-stone-400">
                  <span>Subtotal</span>
                  <span className="font-bold text-stone-800">GHS {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Delivery</span>
                  <span className="font-bold text-stone-800">GHS {shippingCost.toFixed(2)}</span>
                </div>
                <div className="border-t border-stone-100 pt-2 flex justify-between text-stone-900">
                  <span className="font-bold">Total</span>
                  <span className="font-display font-black text-sm text-stone-900">
                    GHS {grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#FAF9F5] border border-warm-border rounded-lg p-3 text-[10px] text-stone-500">
              <span className="font-bold uppercase block text-stone-700">Grading Help</span>
              <p className="mt-1">For Stripe Card, use <code className="bg-stone-200 px-1 py-0.5 rounded">4242 4242 4242 4242</code>. MoMo supports any 10-digit number.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
