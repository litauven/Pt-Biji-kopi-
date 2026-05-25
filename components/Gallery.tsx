"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Eye, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageAsset {
  src: string;
  alt: string;
  altId: string;
  category: string;
  categoryId: string;
}

export default function Gallery() {
  const { language } = useApp();
  const [activeImage, setActiveImage] = useState<ImageAsset | null>(null);

  const images: ImageAsset[] = [
    {
      src: "https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&q=80&w=800",
      alt: "Volcanic coffee cherries harvesting in Gayo Highlands",
      altId: "Pemanenan buah kopi ceri vulkanis di Dataran Tinggi Gayo",
      category: "Volcanic Plantation",
      categoryId: "Perkebunan Vulkanis"
    },
    {
      src: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800",
      alt: "Micro-batch thermodynamic roasting drum spinning",
      altId: "Drum pemanggangan termodinamika batch mikro berputar",
      category: "Micro-batch Roasting",
      categoryId: "Penyangraian Mikro"
    },
    {
      src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800",
      alt: "Professional barista pulling manual espresso shot",
      altId: "Barista profesional mengekstrak espresso manual",
      category: "Barista Extraction",
      categoryId: "Ekstraksi Barista"
    },
    {
      src: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=800",
      alt: "High-grade specialty green beans selection",
      altId: "Seleksi biji kopi hijau specialty kelas atas",
      category: "Quality Inspection",
      categoryId: "Inspeksi Kualitas"
    },
    {
      src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800",
      alt: "Aromatic cup served in our warm reserve boutique",
      altId: "Secangkir kopi aromatik disajikan di butik reserve hangat kami",
      category: "Boutique Atmosphere",
      categoryId: "Atmosfer Butik"
    }
  ];

  return (
    <section className="py-24 bg-warm-cream text-espresso-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[11px] font-bold text-coffee-brown tracking-[0.3em] uppercase block">
            {language === "id" ? "GALERI VISUAL BIJI KOPI" : "VISUAL RESERVE GALLERY"}
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-espresso-dark leading-none">
            {language === "id" ? "Kehidupan di Balik Setiap Cangkir" : "Capturing the Coffee Odyssey"}
          </h2>
          <div className="w-12 h-1 bg-coffee-gold mx-auto mt-4" />
        </div>

        {/* Masonry-Grid Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              key={idx}
              onClick={() => setActiveImage(img)}
              className="relative rounded-lg overflow-hidden border border-coffee-gold/15 bg-espresso-black cursor-pointer group shadow-lg inline-block w-full"
            >
              <img src={img.src} alt={img.alt} className="object-cover w-full h-auto group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
              
              {/* Hover Dark Overlay */}
              <div className="absolute inset-0 bg-espresso-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                <div className="w-8 h-8 rounded-full bg-coffee-gold flex items-center justify-center text-espresso-black self-end shadow-md">
                  <Eye className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-coffee-gold uppercase tracking-[0.2em]">
                    {language === "id" ? img.categoryId : img.category}
                  </span>
                  <h4 className="font-serif-editorial text-sm font-bold text-white mt-1 leading-snug">
                    {language === "id" ? img.altId : img.alt}
                  </h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Fullscreen Framer Motion Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImage(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-zoom-out"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-white hover:text-coffee-gold transition-colors z-50"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Lightbox Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", duration: 0.4 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full flex flex-col space-y-4 pointer-events-auto"
              >
                <div className="relative aspect-[16/10] max-h-[70vh] w-full rounded-lg overflow-hidden border border-coffee-gold/25 shadow-2xl">
                  <img src={activeImage.src} alt={activeImage.alt} className="w-full h-full object-contain bg-espresso-black" />
                </div>
                
                <div className="text-center text-warm-cream max-w-xl mx-auto space-y-1">
                  <span className="text-[10px] font-bold text-coffee-gold uppercase tracking-[0.25em]">
                    {language === "id" ? activeImage.categoryId : activeImage.category}
                  </span>
                  <p className="font-serif-editorial text-sm sm:text-base md:text-lg italic font-medium leading-relaxed">
                    &ldquo;{language === "id" ? activeImage.altId : activeImage.alt}&rdquo;
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
