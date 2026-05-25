"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Sparkles, Mail, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CtaBanner() {
  const { language } = useApp();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setEmail("");
    }, 2500);
  };

  return (
    <section className="py-20 bg-espresso-black text-warm-cream relative overflow-hidden border-t border-coffee-gold/15">
      {/* Background Visual Texture */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=1920')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-espresso-black via-espresso-black/80 to-espresso-black" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        
        {/* Animated Icon */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="w-12 h-12 rounded-full bg-coffee-brown/50 border border-coffee-gold/20 flex items-center justify-center text-coffee-gold mx-auto shadow-lg shadow-coffee-gold/5"
        >
          <Sparkles className="w-5 h-5" />
        </motion.div>

        {/* Text */}
        <div className="space-y-4">
          <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            {language === "id"
              ? "Gabung BKN Gourmet Reserve Club"
              : "Indonesian Specialty, Delivered Monthly"}
          </h2>
          <p className="text-warm-cream/70 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            {language === "id"
              ? "Dapatkan alokasi micro-lot langka yang disangrai khusus pada hari ke-1 setiap bulan. Disusun khusus untuk profil rasa kesukaan Anda, lengkap dengan katup pelindung kesegaran."
              : "Subscribe to custom micro-lot coffee beans micro-roasted fresh on the 1st of every month. Personalized to your grind size, shipped directly from Indonesian volcanic heights to your doorstep."}
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-md mx-auto relative min-h-[64px]">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-2 border border-coffee-gold/20 rounded-lg p-1 bg-espresso-dark/60 backdrop-blur-md"
              >
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={language === "id" ? "Masukkan email Anda..." : "Enter your email..."}
                    className="w-full bg-transparent px-4 py-3 pl-10 text-xs text-white focus:outline-none placeholder-warm-cream/40"
                  />
                  <Mail className="w-4 h-4 text-warm-cream/40 absolute left-3.5 top-3.5" />
                </div>
                <button
                  type="submit"
                  className="bg-coffee-gold hover:bg-coffee-gold-light text-espresso-black font-bold uppercase tracking-wider px-6 py-3 rounded text-[10px] transition-colors shrink-0"
                >
                  {language === "id" ? "Langganan" : "Join The Club"}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded-lg bg-emerald-950/60 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center gap-2 backdrop-blur-md"
              >
                <Check className="w-4 h-4" />
                {language === "id"
                  ? "Terima kasih! Periksa email Anda untuk rincian keanggotaan."
                  : "Thank you! Checking your inbox for exclusive reserve allocations."}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
