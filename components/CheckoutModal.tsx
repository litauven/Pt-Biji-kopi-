"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { X, ArrowRight, ArrowLeft, Check, CreditCard, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutModal() {
  const {
    language,
    t,
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    createOrder,
  } = useApp();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    province: "",
    city: "",
    address: "",
    postal: "",
    courier: "JNE Express",
    paymentMethod: "QRIS",
  });
  const [createdOrderNumber, setCreatedOrderNumber] = useState("");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.11);
  const total = subtotal + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step === 1) {
      if (!form.name || !form.email || !form.phone || !form.address) {
        alert(language === "id" ? "Mohon lengkapi data kontak dan alamat." : "Please fill out contact details and shipping address.");
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleCompleteOrder = () => {
    // Call Context action to register simulated order in context and clear cart
    const orderAddress = `${form.address}, ${form.city}, ${form.province} - ${form.postal}`;
    const newOrder = createOrder(form.name, orderAddress, form.courier, form.paymentMethod);
    
    setCreatedOrderNumber(newOrder.id);
    setStep(3);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep(1);
    setForm({
      name: "",
      email: "",
      phone: "",
      province: "",
      city: "",
      address: "",
      postal: "",
      courier: "JNE Express",
      paymentMethod: "QRIS",
    });
    setCreatedOrderNumber("");
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md z-50"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full max-w-2xl bg-espresso-black text-warm-cream border border-coffee-gold/15 rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-coffee-gold/15 flex justify-between items-center bg-espresso-dark">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-coffee-gold w-6 h-6" />
                <h2 className="font-serif-editorial text-lg md:text-xl font-bold tracking-wide">
                  {t("checkoutTitle")}
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="p-1 rounded-full text-warm-cream/60 hover:text-coffee-gold hover:bg-white/5 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Stepper Indicators */}
            <div className="px-6 py-4 bg-espresso-black/40 border-b border-coffee-gold/10 flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${step >= 1 ? "bg-coffee-gold text-espresso-black" : "bg-white/10 text-warm-cream/50"}`}>
                  1
                </span>
                <span className={step >= 1 ? "text-coffee-gold font-bold" : "text-warm-cream/40"}>
                  {t("checkoutStep1")}
                </span>
              </div>
              <div className="h-[1px] flex-1 bg-coffee-gold/20 mx-4 hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${step >= 2 ? "bg-coffee-gold text-espresso-black" : "bg-white/10 text-warm-cream/50"}`}>
                  2
                </span>
                <span className={step >= 2 ? "text-coffee-gold font-bold" : "text-warm-cream/40"}>
                  {t("checkoutStep2")}
                </span>
              </div>
              <div className="h-[1px] flex-1 bg-coffee-gold/20 mx-4 hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${step >= 3 ? "bg-coffee-gold text-espresso-black" : "bg-white/10 text-warm-cream/50"}`}>
                  3
                </span>
                <span className={step >= 3 ? "text-coffee-gold font-bold" : "text-warm-cream/40"}>
                  {t("checkoutStep3")}
                </span>
              </div>
            </div>

            {/* Step Contents */}
            <div className="flex-1 overflow-y-auto p-6">
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-warm-cream/60 uppercase tracking-wide">{t("checkoutFormName")}</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        required
                        className="bg-espresso-dark/85 border border-coffee-gold/20 focus:border-coffee-gold rounded px-3 py-2 text-sm text-white focus:outline-none"
                        placeholder="e.g. PT Cafe Kopi Mandiri / John Doe"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-warm-cream/60 uppercase tracking-wide">{t("checkoutFormEmail")}</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        required
                        className="bg-espresso-dark/85 border border-coffee-gold/20 focus:border-coffee-gold rounded px-3 py-2 text-sm text-white focus:outline-none"
                        placeholder="e.g. partner@coffeecafe.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-warm-cream/60 uppercase tracking-wide">{t("checkoutFormPhone")}</label>
                      <input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleInputChange}
                        required
                        className="bg-espresso-dark/85 border border-coffee-gold/20 focus:border-coffee-gold rounded px-3 py-2 text-sm text-white focus:outline-none"
                        placeholder="e.g. +62 812 3456 789"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-warm-cream/60 uppercase tracking-wide">{t("checkoutFormCourier")}</label>
                      <select
                        name="courier"
                        value={form.courier}
                        onChange={handleInputChange}
                        className="bg-espresso-dark/85 border border-coffee-gold/20 focus:border-coffee-gold rounded px-3 py-2 text-sm text-white focus:outline-none appearance-none"
                      >
                        <option value="JNE Express">JNE Express Premium (Rp 15.000)</option>
                        <option value="Tiki Premium">Tiki Regular Safe (Rp 12.000)</option>
                        <option value="DHL Global">DHL Global Specialty (Rp 45.000)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-warm-cream/60 uppercase tracking-wide">{t("checkoutFormProvince")}</label>
                      <input
                        type="text"
                        name="province"
                        value={form.province}
                        onChange={handleInputChange}
                        className="bg-espresso-dark/85 border border-coffee-gold/20 focus:border-coffee-gold rounded px-3 py-2 text-sm text-white focus:outline-none"
                        placeholder="e.g. DKI Jakarta"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-warm-cream/60 uppercase tracking-wide">{t("checkoutFormCity")}</label>
                      <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleInputChange}
                        className="bg-espresso-dark/85 border border-coffee-gold/20 focus:border-coffee-gold rounded px-3 py-2 text-sm text-white focus:outline-none"
                        placeholder="e.g. Jakarta Selatan"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-warm-cream/60 uppercase tracking-wide">{t("checkoutFormPostal")}</label>
                      <input
                        type="text"
                        name="postal"
                        value={form.postal}
                        onChange={handleInputChange}
                        className="bg-espresso-dark/85 border border-coffee-gold/20 focus:border-coffee-gold rounded px-3 py-2 text-sm text-white focus:outline-none"
                        placeholder="e.g. 12340"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-warm-cream/60 uppercase tracking-wide">{t("checkoutFormAddress")}</label>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleInputChange}
                      required
                      className="bg-espresso-dark/85 border border-coffee-gold/20 focus:border-coffee-gold rounded px-3 py-2 text-sm text-white focus:outline-none"
                      placeholder="e.g. Menara Batavia Lt. 12, Jl. K.H. Mas Mansyur Kav. 126"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  {/* Total summary */}
                  <div className="p-4 rounded-lg bg-espresso-dark/80 border border-coffee-gold/10 flex justify-between items-center">
                    <div>
                      <span className="text-xs text-warm-cream/60 uppercase tracking-wide block">{t("cartTotal")}</span>
                      <span className="text-xl font-bold text-coffee-gold font-serif-editorial">{formatPrice(total)}</span>
                    </div>
                    <span className="text-xs text-coffee-gold bg-coffee-brown/50 border border-coffee-gold/10 px-3 py-1 rounded-full uppercase font-bold tracking-widest">
                      {cart.length} {cart.length === 1 ? "Item" : "Items"}
                    </span>
                  </div>

                  {/* Payment Methods */}
                  <div className="space-y-3">
                    <label className="text-xs text-warm-cream/60 uppercase tracking-wider block font-bold">{t("checkoutPayMethod")}</label>
                    
                    {/* QRIS Option */}
                    <label className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all ${form.paymentMethod === "QRIS" ? "bg-coffee-brown/20 border-coffee-gold" : "bg-espresso-dark/40 border-coffee-gold/10 hover:border-coffee-gold/20"}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="QRIS"
                        checked={form.paymentMethod === "QRIS"}
                        onChange={handleInputChange}
                        className="mt-1 accent-coffee-gold"
                      />
                      <div>
                        <span className="text-sm font-bold text-white block">{t("checkoutPayQRIS")}</span>
                        <span className="text-xs text-warm-cream/50 mt-1 block">Pay smoothly with QRIS (Gopay, OVO, ShopeePay, or any Mobile Banking App).</span>
                      </div>
                    </label>

                    {/* Virtual Account Option */}
                    <label className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all ${form.paymentMethod === "Virtual Account" ? "bg-coffee-brown/20 border-coffee-gold" : "bg-espresso-dark/40 border-coffee-gold/10 hover:border-coffee-gold/20"}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Virtual Account"
                        checked={form.paymentMethod === "Virtual Account"}
                        onChange={handleInputChange}
                        className="mt-1 accent-coffee-gold"
                      />
                      <div>
                        <span className="text-sm font-bold text-white block">{t("checkoutPayVA")}</span>
                        <span className="text-xs text-warm-cream/50 mt-1 block">Simulate instant verification through Bank BCA, Mandiri, or BNI.</span>
                      </div>
                    </label>

                    {/* Credit Card Option */}
                    <label className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all ${form.paymentMethod === "Credit Card" ? "bg-coffee-brown/20 border-coffee-gold" : "bg-espresso-dark/40 border-coffee-gold/10 hover:border-coffee-gold/20"}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Credit Card"
                        checked={form.paymentMethod === "Credit Card"}
                        onChange={handleInputChange}
                        className="mt-1 accent-coffee-gold"
                      />
                      <div>
                        <span className="text-sm font-bold text-white block">{t("checkoutPayCC")}</span>
                        <span className="text-xs text-warm-cream/50 mt-1 block">Enter credit or debit cards securely via Stripe gateway simulator.</span>
                      </div>
                    </label>
                  </div>

                  {/* QRIS / VA Interactive Previews */}
                  {form.paymentMethod === "QRIS" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 rounded-lg bg-white text-espresso-black flex flex-col items-center text-center space-y-4"
                    >
                      <span className="text-[10px] tracking-widest font-black uppercase text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded">QRIS PREMIUM CERTIFIED</span>
                      
                      {/* Premium QR Visual Mock */}
                      <div className="relative w-44 h-44 border border-espresso-black/10 rounded-lg p-2 bg-white shadow-inner flex flex-col items-center justify-center">
                        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-espresso-black/80 via-espresso-black to-espresso-black flex items-center justify-center text-white text-[9px] font-black rounded p-2 text-center select-none uppercase tracking-wide">
                          SCAN ME TO PRE-ORDER COFFEE BEANS
                        </div>
                        {/* Little Gold Coffee Icon in the middle */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1 rounded-full border-2 border-coffee-gold">
                          <span className="text-xs font-bold text-coffee-gold font-serif-editorial">BKN</span>
                        </div>
                      </div>

                      <div className="space-y-1 text-xs">
                        <p className="font-bold text-espresso-dark">Total Payment: <span className="text-coffee-brown text-sm font-serif-editorial">{formatPrice(total)}</span></p>
                        <p className="text-espresso-black/60">Verification triggers automatically inside 5 seconds of scanning.</p>
                      </div>
                    </motion.div>
                  )}

                  {form.paymentMethod === "Virtual Account" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 rounded-lg bg-espresso-dark border border-coffee-gold/10 space-y-3"
                    >
                      <div className="flex justify-between items-center border-b border-coffee-gold/10 pb-3">
                        <span className="text-xs text-warm-cream/60">BENEFICIARY BANK</span>
                        <span className="text-sm font-bold text-white">Bank BCA (Nusantara Coffee)</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-coffee-gold/10 pb-3">
                        <span className="text-xs text-warm-cream/60">VIRTUAL ACCOUNT NO.</span>
                        <span className="text-sm font-bold text-coffee-gold font-mono tracking-wider">8902 4780 1930 8920</span>
                      </div>
                      <div className="flex justify-between items-center pt-1">
                        <span className="text-xs text-warm-cream/60">TOTAL PAYMENT</span>
                        <span className="text-sm font-bold text-coffee-gold">{formatPrice(total)}</span>
                      </div>
                    </motion.div>
                  )}

                  {form.paymentMethod === "Credit Card" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 rounded-lg bg-espresso-dark border border-coffee-gold/10 space-y-4"
                    >
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-warm-cream/60 uppercase tracking-wide">CARD NUMBER</label>
                        <div className="relative">
                          <input
                            type="text"
                            maxLength={19}
                            className="bg-espresso-black border border-coffee-gold/20 focus:border-coffee-gold rounded px-3 py-2 text-sm text-white focus:outline-none w-full font-mono tracking-wider"
                            placeholder="4111  2222  3333  4444"
                          />
                          <CreditCard className="w-5 h-5 absolute right-3 top-2.5 text-warm-cream/40" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-warm-cream/60 uppercase tracking-wide">EXPIRY DATE</label>
                          <input
                            type="text"
                            maxLength={5}
                            className="bg-espresso-black border border-coffee-gold/20 focus:border-coffee-gold rounded px-3 py-2 text-sm text-white focus:outline-none font-mono tracking-wider"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-warm-cream/60 uppercase tracking-wide">CVV CODE</label>
                          <input
                            type="password"
                            maxLength={3}
                            className="bg-espresso-black border border-coffee-gold/20 focus:border-coffee-gold rounded px-3 py-2 text-sm text-white focus:outline-none font-mono tracking-wider"
                            placeholder="•••"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="text-center py-8 space-y-6 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-600 border-4 border-emerald-950 flex items-center justify-center text-white text-3xl shadow-lg shadow-emerald-600/20">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif-editorial text-2xl font-bold tracking-wide text-white">
                      {t("checkoutSuccess")}
                    </h3>
                    <p className="text-warm-cream/60 text-sm max-w-md mx-auto">
                      Thank you for choosing PT Biji Kopi Nusantara. Your payment is verified.
                    </p>
                  </div>

                  <div className="p-5 rounded-lg bg-espresso-dark border border-coffee-gold/15 max-w-sm w-full space-y-2 mx-auto">
                    <span className="text-[10px] text-warm-cream/50 uppercase tracking-widest block">{t("checkoutOrderNumber")}</span>
                    <span className="text-xl font-bold font-mono text-coffee-gold tracking-widest block">{createdOrderNumber}</span>
                  </div>

                  <p className="text-xs text-coffee-gold/90 bg-coffee-brown/30 border border-coffee-gold/10 px-4 py-2.5 rounded-full inline-block">
                    📢 {t("checkoutTrackingInstruction")}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer Controls */}
            <div className="p-6 border-t border-coffee-gold/15 bg-espresso-dark flex justify-between items-center gap-4">
              {step === 1 && (
                <>
                  <div className="text-left hidden sm:block">
                    <span className="text-[10px] text-warm-cream/50 uppercase block">{t("cartTotal")}</span>
                    <span className="text-base font-bold text-coffee-gold font-serif-editorial">{formatPrice(total)}</span>
                  </div>
                  <button
                    onClick={nextStep}
                    className="bg-coffee-gold hover:bg-coffee-gold-light text-espresso-black font-bold uppercase tracking-wider px-6 py-3 rounded text-xs flex items-center gap-2 transition-all duration-300 ml-auto"
                  >
                    Select Payment <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <button
                    onClick={prevStep}
                    className="border border-coffee-gold/20 hover:border-coffee-gold text-coffee-gold font-bold uppercase tracking-wider px-6 py-3 rounded text-xs flex items-center gap-2 transition-all duration-200"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={handleCompleteOrder}
                    className="bg-coffee-gold hover:bg-coffee-gold-light text-espresso-black font-bold uppercase tracking-wider px-6 py-3 rounded text-xs flex items-center gap-2 transition-all duration-300"
                  >
                    {t("checkoutPlaceOrder")} <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {step === 3 && (
                <button
                  onClick={handleClose}
                  className="w-full bg-coffee-gold hover:bg-coffee-gold-light text-espresso-black font-bold uppercase tracking-wider py-4 rounded transition-all duration-300"
                >
                  {t("checkoutClose")}
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
