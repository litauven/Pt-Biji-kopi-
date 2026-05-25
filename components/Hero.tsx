"use client";

import React from "react";
import { useApp } from "../context/AppContext";
import { ChevronDown, ArrowRight, Compass } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const { language } = useApp();

  return (
    <section
      id="home"
      className="relative h-screen w-full flex items-center justify-center bg-espresso-black overflow-hidden"
    >
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1920" alt="Cinematic Specialty Coffee" className="absolute inset-0 w-full h-full object-cover scale-105" />
        {/* Gradients to merge colors into espresso dark */}
        <div className="absolute inset-0 bg-gradient-to-r from-espresso-black/85 via-espresso-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-black via-transparent to-espresso-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left pt-20">
        <div className="max-w-3xl">
          {/* Animated Gold Brand Pill */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 border border-coffee-gold/30 bg-coffee-brown/50 backdrop-blur-md rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-coffee-gold animate-pulse" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-coffee-gold-light leading-none">
              {language === "id"
                ? "PT Biji Kopi Nusantara • Kualitas Ekspor"
                : "PT Biji Kopi Nusantara • Export Specialty Grade"}
            </span>
          </motion.div>

          {/* Premium Headline */}
          <h1 className="font-serif-editorial text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6">
            {language === "id" ? (
              <>
                Keagungan Cita Rasa <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-coffee-gold via-coffee-gold-light to-white gold-glow">
                  Kopi Nusantara
                </span>
              </>
            ) : (
              <>
                The Sovereign Taste of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-coffee-gold via-coffee-gold-light to-white gold-glow">
                  Indonesian Origins
                </span>
              </>
            )}
          </h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-warm-cream/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mb-10"
          >
            {language === "id"
              ? "Menghubungkan Anda langsung dengan petani lokal di puncak gunung vulkanis Indonesia. Diproses secara berkelanjutan, disangrai secara mikro dengan presisi tinggi untuk menghasilkan kualitas specialty grade sejati."
              : "Connecting you directly with local farmers on the volcanic crests of Indonesia. Sourced with strict fair-trade integrity, micro-roasted in small batches to unleash the authentic floral and complex earth profiles."}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <a
              href="#products"
              className="group bg-coffee-gold hover:bg-coffee-gold-light text-espresso-black font-bold uppercase tracking-wider px-8 py-4 rounded-md transition-all duration-300 text-xs flex items-center gap-2 shadow-lg shadow-coffee-gold/15 hover:shadow-coffee-gold/30 hover:scale-[1.02]"
            >
              {language === "id" ? "Beli Biji Kopi" : "Shop Coffee Beans"}{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#origins"
              className="group border border-white/20 hover:border-coffee-gold bg-black/30 hover:bg-coffee-brown/10 backdrop-blur-sm text-white hover:text-coffee-gold font-bold uppercase tracking-wider px-8 py-4 rounded-md transition-all duration-300 text-xs flex items-center gap-2"
            >
              <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              {language === "id" ? "Jelajahi Asal Kopi" : "Explore Origins"}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1.5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
        onClick={() => {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[10px] text-warm-cream/50 uppercase tracking-[0.25em]">Scroll Down</span>
        <ChevronDown className="w-5 h-5 text-coffee-gold" />
      </motion.div>
    </section>
  );
}
