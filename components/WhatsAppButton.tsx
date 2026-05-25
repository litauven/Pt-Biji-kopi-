"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { MessageSquare, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppButton() {
  const { language } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const phoneNo = "628123456789"; // Mock Indonesian phone number
  
  const options = [
    {
      en: "Wholesale pricing for my cafe",
      id: "Daftar harga grosir untuk kafe saya",
      message: "Halo BKN Coffee! Saya ingin berkonsultasi mengenai kerja sama pasokan biji kopi grosir (wholesale supply) untuk bisnis kafe saya."
    },
    {
      en: "Consult which roast profile suits me",
      id: "Konsultasi kecocokan profil sangrai",
      message: "Halo BKN Coffee! Saya ingin berkonsultasi mengenai profil sangrai (roast level) biji kopi Nusantara yang cocok untuk metode seduh saya."
    },
    {
      en: "Custom micro-lot private roasting",
      id: "Private roasting micro-lot kustom",
      message: "Halo BKN Coffee! Saya tertarik dengan layanan private roasting micro-lot kustom dari PT Biji Kopi Nusantara."
    }
  ];

  const handleSendCustom = (msg: string) => {
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${phoneNo}?text=${encoded}`, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Micro-Chat Balloon */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            className="w-80 rounded-xl bg-espresso-black text-warm-cream border border-coffee-gold/25 shadow-2xl overflow-hidden mb-4 mr-1 flex flex-col"
          >
            {/* Balloon Header */}
            <div className="bg-espresso-dark p-4 border-b border-coffee-gold/15 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 border border-emerald-500 flex items-center justify-center text-white text-xs font-bold font-serif-editorial">
                    BKN
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-espresso-black" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">BKN Coffee Concierge</span>
                  <span className="text-[9px] text-emerald-400 uppercase tracking-widest leading-none mt-0.5">Online Support</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-warm-cream/50 hover:text-coffee-gold transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Balloon Body */}
            <div className="p-4 space-y-4 flex-1">
              <div className="p-3 bg-espresso-dark/70 rounded-lg text-xs leading-relaxed text-warm-cream/90 border border-coffee-gold/5">
                {language === "id"
                  ? "Halo! Selamat datang di PT Biji Kopi Nusantara. Ada yang bisa kami bantu hari ini? Silakan pilih topik di bawah untuk terhubung langsung via WhatsApp:"
                  : "Hello! Welcome to PT Biji Kopi Nusantara. How can our coffee specialists assist you today? Click any topic below to chat instantly via WhatsApp:"}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                {options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendCustom(opt.message)}
                    className="w-full text-left p-2.5 rounded bg-espresso-dark/45 border border-coffee-gold/10 hover:border-coffee-gold/40 text-[11px] font-medium text-coffee-gold-light hover:text-white transition-all text-ellipsis overflow-hidden whitespace-nowrap block"
                  >
                    💬 {language === "id" ? opt.id : opt.en}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Send Input */}
            <div className="p-3 bg-espresso-dark/50 border-t border-coffee-gold/10 flex items-center gap-2">
              <input
                type="text"
                placeholder={language === "id" ? "Ketik pesan kustom..." : "Type custom message..."}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendCustom((e.target as HTMLInputElement).value);
                  }
                }}
                className="bg-espresso-black border border-coffee-gold/10 focus:border-coffee-gold rounded-full px-3 py-1.5 text-xs text-white focus:outline-none flex-1"
              />
              <button
                onClick={(e) => {
                  const inputEl = e.currentTarget.previousSibling as HTMLInputElement;
                  if (inputEl.value) handleSendCustom(inputEl.value);
                }}
                className="p-2 bg-coffee-gold hover:bg-coffee-gold-light text-espresso-black rounded-full transition-colors"
              >
                <Send className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Pulse Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl relative z-40 group cursor-pointer border border-emerald-500 shadow-emerald-600/30"
      >
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25 group-hover:animate-none" />
        <MessageSquare className="w-6 h-6 stroke-[2]" />
      </motion.button>
    </div>
  );
}
