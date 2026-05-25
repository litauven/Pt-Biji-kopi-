"use client";

import React, { useState } from "react";
import { useApp, mockProducts, Product } from "../context/AppContext";
import { Search, Star, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FeaturedProducts() {
  const { language, addToCart } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedGrinds, setSelectedGrinds] = useState<Record<string, string>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addedStates, setAddedStates] = useState<Record<string, boolean>>({});

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleGrindChange = (productId: string, value: string) => {
    setSelectedGrinds((prev) => ({ ...prev, [productId]: value }));
  };

  const handleQtyChange = (productId: string, delta: number) => {
    const current = quantities[productId] || 1;
    const nextVal = Math.max(1, current + delta);
    setQuantities((prev) => ({ ...prev, [productId]: nextVal }));
  };

  const handleAddToCartClick = (product: Product) => {
    const grind = selectedGrinds[product.id] || "Whole Bean";
    const qty = quantities[product.id] || 1;
    
    addToCart(product, grind, qty);
    
    // Trigger animated added feedback state
    setAddedStates((prev) => ({ ...prev, [`${product.id}-${grind}`]: true }));
    setTimeout(() => {
      setAddedStates((prev) => ({ ...prev, [`${product.id}-${grind}`]: false }));
    }, 2000);
  };

  // Filters logic
  const filteredProducts = mockProducts.filter((product) => {
    const nameStr = language === "id" ? product.nameId : product.name;
    const descStr = language === "id" ? product.descriptionId : product.description;
    const processStr = language === "id" ? product.processId : product.process;
    const notesStr = (language === "id" ? product.tastingNotesId : product.tastingNotes).join(" ");
    
    const matchesSearch =
      nameStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      descStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      processStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notesStr.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === "all") return true;
    if (activeFilter === "light-med") return product.roastLevel.includes("Light") || product.roastLevel === "Medium";
    if (activeFilter === "med-dark") return product.roastLevel.includes("Dark") || product.roastLevel === "Medium";
    if (activeFilter === "specialty") return product.rating >= 4.9;
    return true;
  });

  return (
    <section id="products" className="py-24 bg-warm-cream text-espresso-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[11px] font-bold text-coffee-brown tracking-[0.3em] uppercase block">
            {language === "id" ? "KATALOG BIJI KOPI SPECIALTY" : "SPECIALTY RESERVE BEANS"}
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-espresso-dark leading-none">
            {language === "id" ? "Jelajahi Koleksi Sangrai Terbaik" : "Chronicles of Curated Micro-Roasts"}
          </h2>
          <p className="text-espresso-black/70 text-xs sm:text-sm max-w-xl mx-auto mt-2 leading-relaxed">
            {language === "id"
              ? "Dari perkebunan dataran tinggi terpilih, disangrai dengan ketelitian tinggi untuk mengeluarkan spektrum rasa buah, bunga, dan cokelat alami."
              : "Sourced from premier volcanic ridges, our master roasters apply meticulous temperature curves to unlock vibrant jasmine, sweet stonefruits, and cocoa."}
          </p>
          <div className="w-12 h-1 bg-coffee-gold mx-auto mt-4" />
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 pb-6 border-b border-coffee-gold/15">
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === "id" ? "Cari rasa, proses, varietas..." : "Search tasting notes, process..."}
              className="w-full bg-white border border-coffee-gold/25 focus:border-coffee-gold focus:ring-1 focus:ring-coffee-gold rounded-full px-4 py-2.5 pl-11 text-xs text-espresso-black placeholder-espresso-black/40 focus:outline-none shadow-sm"
            />
            <Search className="w-4 h-4 text-espresso-black/40 absolute left-4 top-3" />
          </div>

          {/* Filtering Pill Links */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
            {[
              { id: "all", en: "All Reserve", idn: "Semua Biji" },
              { id: "light-med", en: "Light-Medium", idn: "Sangrai Ringan-Sedang" },
              { id: "med-dark", en: "Medium-Dark", idn: "Sangrai Sedang-Gelap" },
              { id: "specialty", en: "Specialty Grade (88+)", idn: "Grade Utama (88+)" }
            ].map((filt) => (
              <button
                key={filt.id}
                onClick={() => setActiveFilter(filt.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                  activeFilter === filt.id
                    ? "bg-coffee-brown text-warm-cream shadow-md shadow-coffee-brown/15"
                    : "bg-white/60 hover:bg-white text-espresso-black/80 border border-coffee-gold/10 hover:border-coffee-gold/25"
                }`}
              >
                {language === "id" ? filt.idn : filt.en}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Catalog */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProducts.map((prod) => {
              const currentGrind = selectedGrinds[prod.id] || "Whole Bean";
              const currentQty = quantities[prod.id] || 1;
              const isAdded = addedStates[`${prod.id}-${currentGrind}`] || false;

              return (
                <motion.div
                  key={prod.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white border border-coffee-gold/15 rounded-xl overflow-hidden shadow-xl shadow-coffee-brown/[0.02] flex flex-col group hover:shadow-2xl hover:border-coffee-gold/45 transition-all duration-300"
                >
                  {/* Photo with Overlay */}
                  <div className="relative h-64 w-full bg-espresso-black overflow-hidden shrink-0 border-b border-coffee-gold/10">
                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100" />
                    
                    {/* Floating Rating Pill */}
                    <div className="absolute top-4 right-4 bg-espresso-black/75 backdrop-blur-md border border-coffee-gold/20 text-coffee-gold font-bold text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{prod.rating.toFixed(1)}</span>
                    </div>

                    {/* Sourcing Spec Sheet on Hover Overlay */}
                    <div className="absolute inset-0 bg-espresso-black/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 text-warm-cream flex flex-col justify-between z-10">
                      <div>
                        <span className="text-[10px] text-coffee-gold font-bold uppercase tracking-widest">{prod.variety}</span>
                        <h4 className="font-serif-editorial text-lg font-bold text-white mt-1 border-b border-white/10 pb-2">
                          {language === "id" ? prod.nameId : prod.name}
                        </h4>
                        <p className="text-warm-cream/70 text-xs mt-3 leading-relaxed">
                          {language === "id" ? prod.descriptionId : prod.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-3 text-[10px] uppercase font-bold tracking-widest text-coffee-gold-light">
                        <div>
                          <span className="text-white/40 block text-[9px] mb-0.5">ALTITUDE</span>
                          <span>{prod.altitude}</span>
                        </div>
                        <div>
                          <span className="text-white/40 block text-[9px] mb-0.5">PROCESS</span>
                          <span>{language === "id" ? prod.processId.split(" ")[0] : prod.process}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Name & Origin tag */}
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-serif-editorial text-xl font-bold text-espresso-dark group-hover:text-coffee-brown transition-colors">
                          {language === "id" ? prod.nameId : prod.name}
                        </h3>
                        <span className="text-[9px] font-black uppercase tracking-widest text-white bg-coffee-brown px-2 py-0.5 rounded leading-none mt-1">
                          Arabica
                        </span>
                      </div>

                      {/* Tagline */}
                      <p className="text-xs italic text-espresso-black/60 mt-1">
                        {language === "id" ? prod.taglineId : prod.tagline}
                      </p>

                      {/* Roast Level Bar */}
                      <div className="mt-4 flex items-center gap-3">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-espresso-black/50 w-16">Roast</span>
                        <div className="flex-1 h-1.5 bg-espresso-black/5 rounded-full relative overflow-hidden">
                          <div
                            className="absolute top-0 bottom-0 left-0 bg-coffee-gold rounded-full"
                            style={{
                              width:
                                prod.roastLevel.includes("Light-Medium")
                                  ? "40%"
                                  : prod.roastLevel === "Medium"
                                  ? "60%"
                                  : prod.roastLevel.includes("Medium-Dark")
                                  ? "80%"
                                  : "100%",
                            }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-coffee-brown bg-coffee-gold/25 px-2 py-0.5 rounded uppercase tracking-wider">
                          {language === "id" ? prod.roastLevelId : prod.roastLevel}
                        </span>
                      </div>

                      {/* Tasting Notes */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {(language === "id" ? prod.tastingNotesId : prod.tastingNotes).map((note) => (
                          <span
                            key={note}
                            className="text-[10px] font-bold tracking-wide text-coffee-brown bg-white border border-coffee-gold/25 px-2 py-0.5 rounded-full"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price and Add to Cart Section */}
                    <div className="mt-6 pt-5 border-t border-coffee-gold/15 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-espresso-black/50 font-bold uppercase tracking-wider">Price / 250g</span>
                        <span className="text-xl font-bold font-serif-editorial text-coffee-brown">{formatPrice(prod.price)}</span>
                      </div>

                      {/* Controls Row */}
                      <div className="grid grid-cols-3 gap-2">
                        {/* Grind Size Dropdown */}
                        <div className="col-span-2">
                          <select
                            value={currentGrind}
                            onChange={(e) => handleGrindChange(prod.id, e.target.value)}
                            className="w-full bg-white border border-coffee-gold/20 focus:border-coffee-gold rounded px-2.5 py-2 text-xs text-espresso-black focus:outline-none appearance-none font-bold"
                          >
                            <option value="Whole Bean">Whole Bean</option>
                            <option value="V60">Grind: V60</option>
                            <option value="Espresso">Grind: Espresso</option>
                            <option value="French Press">Grind: French Press</option>
                          </select>
                        </div>

                        {/* Quantity selector */}
                        <div className="flex items-center justify-between border border-coffee-gold/20 rounded bg-white px-2">
                          <button
                            onClick={() => handleQtyChange(prod.id, -1)}
                            className="text-espresso-black/60 hover:text-coffee-brown font-bold text-xs p-1"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold text-espresso-black">{currentQty}</span>
                          <button
                            onClick={() => handleQtyChange(prod.id, 1)}
                            className="text-espresso-black/60 hover:text-coffee-brown font-bold text-xs p-1"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Add Button */}
                      <button
                        onClick={() => handleAddToCartClick(prod)}
                        className={`w-full font-bold uppercase tracking-widest py-3 rounded text-[10px] transition-all duration-300 flex items-center justify-center gap-2 ${
                          isAdded
                            ? "bg-emerald-600 text-white"
                            : "bg-coffee-brown hover:bg-espresso-dark text-warm-cream shadow-md shadow-coffee-brown/10 hover:scale-[1.01]"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" /> Added to Cart!
                          </>
                        ) : (
                          "Add to Reserve Cart"
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
