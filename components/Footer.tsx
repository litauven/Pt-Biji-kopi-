"use client";

import React from "react";
import { useApp } from "../context/AppContext";
import { Coffee, MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  const { language, t } = useApp();

  return (
    <footer id="contact" className="bg-espresso-black text-warm-cream border-t border-coffee-gold/15 pt-20 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core footer grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Info (3 Columns) */}
          <div className="lg:col-span-3 space-y-4">
            <a href="#home" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-coffee-gold flex items-center justify-center text-espresso-black shadow-md shadow-coffee-gold/20">
                <Coffee className="w-4 h-4 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-serif-editorial text-base font-bold tracking-wider leading-none">
                  BIJI KOPI
                </span>
                <span className="text-[9px] text-coffee-gold/75 tracking-[0.2em] leading-none uppercase mt-0.5">
                  Nusantara
                </span>
              </div>
            </a>
            <p className="text-warm-cream/50 text-xs leading-relaxed">
              {language === "id"
                ? "PT Biji Kopi Nusantara adalah eksportir dan pemanggang biji kopi specialty terpercaya, menyalurkan kopi organik berkualitas tinggi langsung dari petani lokal Indonesia ke seluruh penjuru dunia."
                : "PT Biji Kopi Nusantara is a certified specialty exporter and micro-roaster, supplying high-grade organic coffee beans directly from ancestral Indonesian farms to global brewers."}
            </p>
            <div className="text-[10px] text-coffee-gold font-bold uppercase tracking-widest leading-none pt-2">
              📜 PT REG. ID: 4890-394082-VA
            </div>
          </div>

          {/* Quick Links (2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-white border-b border-coffee-gold/10 pb-2">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-warm-cream/60">
              <li>
                <a href="#home" className="hover:text-coffee-gold transition-colors block py-0.5">
                  {t("navHome")}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-coffee-gold transition-colors block py-0.5">
                  {t("navAbout")}
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-coffee-gold transition-colors block py-0.5">
                  {t("navProducts")}
                </a>
              </li>
              <li>
                <a href="#origins" className="hover:text-coffee-gold transition-colors block py-0.5">
                  {t("navOrigins")}
                </a>
              </li>
              <li>
                <a href="#brewing" className="hover:text-coffee-gold transition-colors block py-0.5">
                  {t("navBrewing")}
                </a>
              </li>
            </ul>
          </div>

          {/* Sourcing Contacts (3 Columns) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-white border-b border-coffee-gold/10 pb-2">
              Contact & Sales
            </h4>
            <div className="space-y-3 text-xs text-warm-cream/60">
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-coffee-gold shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Menara Batavia Lt. 12, Jl. K.H. Mas Mansyur Kav. 126, Jakarta Pusat, DKI Jakarta 10220
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <Phone className="w-4 h-4 text-coffee-gold shrink-0" />
                <span>+62 (21) 5789-3904</span>
              </div>
              <div className="flex gap-2 items-center">
                <Mail className="w-4 h-4 text-coffee-gold shrink-0" />
                <span>sales@bijikopinantara.co.id</span>
              </div>
            </div>

            {/* Marketplace integrations shortcuts */}
            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href="https://wa.me/628123456789"
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/20 text-emerald-400 font-bold px-3 py-1.5 rounded text-[9px] uppercase tracking-wider flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" /> WhatsApp
              </a>
              <a
                href="#"
                className="bg-green-950/40 hover:bg-green-900/60 border border-green-500/20 text-green-400 font-bold px-3 py-1.5 rounded text-[9px] uppercase tracking-wider block"
              >
                Tokopedia Store
              </a>
              <a
                href="#"
                className="bg-orange-950/40 hover:bg-orange-900/60 border border-orange-500/20 text-orange-400 font-bold px-3 py-1.5 rounded text-[9px] uppercase tracking-wider block"
              >
                Shopee Mall
              </a>
            </div>
          </div>

          {/* Styled Google Map iframe (4 Columns) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-white border-b border-coffee-gold/10 pb-2">
              Jakarta Headquarters
            </h4>
            
            {/* Elegant dark map container */}
            <div className="w-full aspect-[16/10] rounded-lg overflow-hidden border border-coffee-gold/15 bg-espresso-black shadow-2xl relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521269633192!2d106.8195613!3d-6.20239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f417f7b5cfeb%3A0xc6cbac8920b784a0!2sMenara%20Batavia!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "grayscale(1) invert(0.92) contrast(1.25) sepia(0.2) hue-rotate(15deg)",
                  pointerEvents: "none"
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>

        {/* Legal copyrights */}
        <div className="border-t border-coffee-gold/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] text-warm-cream/40 uppercase tracking-widest gap-4">
          <span>
            © {new Date().getFullYear()} PT Biji Kopi Nusantara. All Rights Reserved.
          </span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-coffee-gold transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-coffee-gold transition-colors">Terms of Sourcing</a>
            <span>•</span>
            <a href="#" className="hover:text-coffee-gold transition-colors">SCA Regulations</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
