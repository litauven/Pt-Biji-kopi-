"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  name: string;
  role: string;
  roleId: string;
  avatar: string;
  stars: number;
  review: string;
  reviewId: string;
}

export default function Testimonials() {
  const { language } = useApp();
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      name: "Hendrawan Syahputra",
      role: "Owner, Malabar Artisan Cafe (Jakarta)",
      roleId: "Pemilik, Kafe Artisan Malabar (Jakarta)",
      avatar: "H",
      stars: 5,
      review: "BKN's Gayo Highlands single-origin has completely transformed our espresso lineup. The roast consistency is exceptionally stable, and our customers frequently praise the complex chocolate-cedar sweetness.",
      reviewId: "Single-origin Gayo Highlands dari BKN telah meningkatkan kualitas espresso di kafe kami secara signifikan. Konsistensi hasil sangrainya sangat stabil, dan pelanggan kami sangat menyukai rasa cokelat-cedar yang kompleks."
    },
    {
      name: "Eliza Rutherford",
      role: "SCA Certified Q-Grader (Melbourne)",
      roleId: "SCA Certified Q-Grader (Melbourne)",
      avatar: "E",
      stars: 5,
      review: "I evaluated the Bali Kintamani Honey batch. The clarity is spectacular, showcasing sparkling mandarin blossom acidities, velvet honey nectar glaze, and zero defects. Easily scores an 89 on the SCA scale.",
      reviewId: "Saya mengevaluasi batch Bali Kintamani Honey. Kejernihan rasanya spektakuler, menampilkan keasaman jeruk mandarin yang segar, kemanisan nektar madu yang lembut, dan tanpa cacat rasa. Layak mendapatkan skor 89 pada skala SCA."
    },
    {
      name: "Adi Nugroho",
      role: "Dedicated Home Brewer & Enthusiast",
      roleId: "Penyeduh Kopi Rumahan & Penggemar Setia",
      avatar: "A",
      stars: 5,
      review: "My coffee bag arrived in Surabaya just 3 days after the roast date. The hermetic packaging and nitrogen-flush preserved the fragrance perfectly. Opening the valve felt like smelling fresh ground volcanic cherries.",
      reviewId: "Biji kopi pesanan saya tiba di Surabaya hanya 3 hari setelah tanggal sangrai. Kemasan kedap udara nitrogen melestarikan aromanya secara sempurna. Membuka katup kemasan rasanya seperti mencium ceri kopi segar di kebun."
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-warm-cream text-espresso-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[11px] font-bold text-coffee-brown tracking-[0.3em] uppercase block">
            {language === "id" ? "TESTIMONI MITRA & PELANGGAN" : "TESTIMONIALS OF EXCELLENCE"}
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-espresso-dark leading-none">
            {language === "id" ? "Suara Komunitas Kopi Kami" : "Endorsed by Master Brewers"}
          </h2>
          <div className="w-12 h-1 bg-coffee-gold mx-auto mt-4" />
        </div>

        {/* Testimonials Slider */}
        <div className="max-w-4xl mx-auto relative px-4 sm:px-12">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-coffee-gold/15 rounded-xl p-8 sm:p-12 shadow-2xl relative flex flex-col items-center text-center space-y-6"
            >
              {/* Quote Icon decorative */}
              <Quote className="w-10 h-10 text-coffee-gold/20 absolute top-8 left-8 stroke-[1.5]" />

              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: testimonials[activeIndex].stars }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-coffee-gold fill-current" />
                ))}
              </div>

              {/* Review Text */}
              <p className="font-serif-editorial text-lg sm:text-xl md:text-2xl italic leading-relaxed text-espresso-dark max-w-2xl">
                &ldquo;{language === "id" ? testimonials[activeIndex].reviewId : testimonials[activeIndex].review}&rdquo;
              </p>

              {/* Author Info */}
              <div className="flex flex-col items-center space-y-2 pt-4 border-t border-coffee-gold/10 w-full max-w-xs">
                <div className="w-12 h-12 rounded-full bg-coffee-brown text-warm-cream flex items-center justify-center font-bold text-lg font-serif-editorial shadow-md">
                  {testimonials[activeIndex].avatar}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-espresso-dark leading-none">
                    {testimonials[activeIndex].name}
                  </h4>
                  <span className="text-[10px] text-espresso-black/50 font-bold uppercase tracking-wider block mt-1.5">
                    {language === "id" ? testimonials[activeIndex].roleId : testimonials[activeIndex].role}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Controls Arrows */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 bg-white border border-coffee-gold/15 hover:border-coffee-gold rounded-full text-espresso-black hover:text-coffee-brown transition-all hover:scale-105 active:scale-95 shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-espresso-black/40 tracking-widest">
              {activeIndex + 1} / {testimonials.length}
            </span>
            <button
              onClick={handleNext}
              className="p-3 bg-white border border-coffee-gold/15 hover:border-coffee-gold rounded-full text-espresso-black hover:text-coffee-brown transition-all hover:scale-105 active:scale-95 shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
