"use client";

import React, { useState } from "react";
import { useApp, Order } from "../context/AppContext";
import { X, Search, Check, Flame, Box, Truck, MapPin, Calendar, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function OrderTrackingModal() {
  const {
    language,
    t,
    isTrackingOpen,
    setIsTrackingOpen,
    trackOrder,
  } = useApp();

  const [queryId, setQueryId] = useState("");
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryId) return;
    const order = trackOrder(queryId);
    setActiveOrder(order || null);
    setHasSearched(true);
  };

  const steps = [
    { key: "ordered", icon: Check, label: t("trackStatusOrdered") },
    { key: "roasting", icon: Flame, label: t("trackStatusRoasting") },
    { key: "packaging", icon: Box, label: t("trackStatusPackaging") },
    { key: "shipped", icon: Truck, label: t("trackStatusShipped") },
    { key: "delivered", icon: MapPin, label: t("trackStatusDelivered") },
  ];

  const getStepIndex = (status: string) => {
    return steps.findIndex((s) => s.key === status);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <AnimatePresence>
      {isTrackingOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsTrackingOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-md z-50"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full max-w-2xl bg-espresso-black text-warm-cream border border-coffee-gold/15 rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-coffee-gold/15 flex justify-between items-center bg-espresso-dark">
              <span className="font-serif-editorial text-lg font-bold tracking-wide text-white">
                {t("trackTitle")}
              </span>
              <button
                onClick={() => {
                  setIsTrackingOpen(false);
                  setQueryId("");
                  setActiveOrder(null);
                  setHasSearched(false);
                }}
                className="p-1 rounded-full text-warm-cream/60 hover:text-coffee-gold hover:bg-white/5 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tracking Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Search Bar Form */}
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={queryId}
                    onChange={(e) => setQueryId(e.target.value)}
                    placeholder={t("trackPlaceholder")}
                    className="w-full bg-espresso-dark border border-coffee-gold/20 focus:border-coffee-gold rounded px-3 py-3 pl-10 text-sm text-white focus:outline-none uppercase font-mono tracking-wider"
                  />
                  <Search className="w-4 h-4 text-warm-cream/40 absolute left-3 top-3.5" />
                </div>
                <button
                  type="submit"
                  className="bg-coffee-gold hover:bg-coffee-gold-light text-espresso-black font-bold uppercase tracking-wider px-6 rounded text-xs transition-colors shrink-0"
                >
                  {t("trackButton")}
                </button>
              </form>

              {hasSearched && !activeOrder ? (
                /* No Results */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 text-center text-warm-cream/50 space-y-3"
                >
                  <p className="text-sm font-bold text-red-400">⚠️ {t("trackNotFound")}</p>
                  <p className="text-xs">Try entering preloaded sample order codes: <span className="font-mono text-coffee-gold select-all font-bold">BKN-GAYO-101</span> or <span className="font-mono text-coffee-gold select-all font-bold">BKN-KINTA-202</span>.</p>
                </motion.div>
              ) : activeOrder ? (
                /* Order Tracking Panel */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Summary Block */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded bg-espresso-dark/60 border border-coffee-gold/10">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-warm-cream/60">
                        <Calendar className="w-4 h-4 text-coffee-gold" />
                        <span>Order Date: {activeOrder.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-warm-cream/60">
                        <MapPin className="w-4 h-4 text-coffee-gold" />
                        <span className="truncate max-w-[240px]">Deliver: {activeOrder.shippingName}</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-left sm:text-right">
                      <div className="flex items-center sm:justify-end gap-2 text-xs text-warm-cream/60">
                        <CreditCard className="w-4 h-4 text-coffee-gold" />
                        <span>Method: {activeOrder.paymentMethod} ({activeOrder.courier})</span>
                      </div>
                      <div className="text-sm font-bold text-coffee-gold font-serif-editorial">
                        Amount Paid: {formatPrice(activeOrder.total)}
                      </div>
                    </div>
                  </div>

                  {/* Horizontal visual progress bars */}
                  <div className="relative pt-6 pb-2">
                    {/* Line connecting points */}
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 -translate-y-1/2 z-0 rounded-full" />
                    
                    {/* Active completed line overlay */}
                    <div
                      className="absolute top-1/2 left-0 h-1 bg-coffee-gold -translate-y-1/2 z-0 transition-all duration-700"
                      style={{
                        width: `${(getStepIndex(activeOrder.status) / (steps.length - 1)) * 100}%`,
                      }}
                    />

                    {/* Nodes */}
                    <div className="flex justify-between relative z-10">
                      {steps.map((st, i) => {
                        const StepIcon = st.icon;
                        const isCompleted = i <= getStepIndex(activeOrder.status);
                        const isCurrent = i === getStepIndex(activeOrder.status);
                        return (
                          <div key={st.key} className="flex flex-col items-center gap-2">
                            <motion.div
                              animate={isCurrent ? { scale: [1, 1.15, 1] } : {}}
                              transition={{ repeat: Infinity, duration: 2 }}
                              className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
                                isCompleted
                                  ? "bg-coffee-gold border-coffee-gold text-espresso-black font-bold shadow-md shadow-coffee-gold/20"
                                  : "bg-espresso-black border-white/20 text-warm-cream/40"
                              }`}
                            >
                              <StepIcon className="w-4.5 h-4.5" />
                            </motion.div>
                            <span className={`text-[9px] sm:text-[10px] text-center font-bold max-w-[70px] uppercase tracking-wider ${
                              isCompleted ? "text-coffee-gold" : "text-warm-cream/30"
                            }`}>
                              {st.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Detailed Interactive History Logs */}
                  <div className="space-y-4 pt-4 border-t border-coffee-gold/10">
                    <h4 className="text-xs uppercase tracking-widest text-coffee-gold font-bold">ROASTING & DISPATCH LOGS</h4>
                    
                    <div className="relative pl-6 border-l border-coffee-gold/20 space-y-6">
                      {activeOrder.trackingLogs.map((log, idx) => (
                        <div key={idx} className="relative group">
                          {/* Circle indicators */}
                          <div className={`absolute -left-[30px] top-1 w-3.5 h-3.5 rounded-full border-2 ${
                            idx === activeOrder.trackingLogs.length - 1
                              ? "bg-coffee-gold border-espresso-black animate-pulse"
                              : "bg-espresso-black border-coffee-gold/40"
                          }`} />
                          
                          <span className="text-[10px] text-coffee-gold/80 font-mono block leading-none mb-1">{log.time}</span>
                          <p className="text-xs text-warm-cream/90 font-medium leading-relaxed">
                            {language === "id" ? log.messageId : log.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Static Landing View */
                <div className="py-12 text-center text-warm-cream/50 space-y-4 px-4">
                  <p className="text-sm">
                    {t("trackSubtitle")}
                  </p>
                  <p className="text-xs">
                    Please use the preloaded demo ID: <code className="text-coffee-gold border border-coffee-gold/15 bg-coffee-brown/20 px-2 py-0.5 rounded font-mono select-all font-bold">BKN-GAYO-101</code> or buy beans from our catalog to generate a live tracking sequence!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
