"use client";

import React, { useState } from "react";
import { FadeIn } from "../../components/ui/FadeIn";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FloatingContactCenter from "../../components/FloatingContactCenter";
import { Dialog } from "../../components/ui/Dialog";

const images = [
  { id: 1, src: "/coffee_beans.png", category: "Coffee & Agricultural", alt: "Premium Coffee Beans" },
  { id: 2, src: "/specialty_tea.png", category: "Products", alt: "Specialty Tea" },
  { id: 3, src: "/cocoa_products.png", category: "Products", alt: "Cocoa Products" },
  { id: 4, src: "/indonesian_spices.png", category: "Coffee & Agricultural", alt: "Indonesian Spices" },
  { id: 5, src: "/industrial_machinery.png", category: "Industrial Equipment", alt: "Industrial Machinery" },
  { id: 6, src: "/kompor1.png", category: "Industrial Equipment", alt: "Deep Fryer" },
];

const categories = ["All", "Company Activities", "Products", "Coffee & Agricultural", "Industrial Equipment", "Tech Solutions"];

export default function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = filter === "All" ? images : images.filter(img => img.category === filter);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-[96px] md:pt-[112px]">
        
        {/* Header */}
        <section className="bg-zinc-950 text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
              <p className="text-xl text-gray-400 max-w-2xl">
                A visual journey of our operations, products, and solutions.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Gallery Content */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === cat 
                      ? "bg-emerald-900 text-white" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Masonry Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredImages.map((img, i) => (
                <FadeIn key={img.id} delay={i * 0.05} className="break-inside-avoid">
                  <div 
                    className="relative group cursor-pointer overflow-hidden rounded-xl bg-gray-100"
                    onClick={() => setSelectedImage(img.src)}
                  >
                    <img 
                      src={img.src} 
                      alt={img.alt} 
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-medium bg-emerald-900/90 px-4 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        View Image
                      </span>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <FloatingContactCenter />

      {/* Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)} className="max-w-4xl p-1 bg-transparent shadow-none border-none">
        {selectedImage && (
          <div className="relative w-full overflow-hidden rounded-xl">
            <img src={selectedImage} alt="Expanded view" className="w-full h-auto max-h-[80vh] object-contain bg-black/90" />
          </div>
        )}
      </Dialog>
    </div>
  );
}
