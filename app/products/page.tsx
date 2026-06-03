import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { FadeIn, staggerContainer, staggerItem } from "../../components/ui/FadeIn";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FloatingContactCenter from "../../components/FloatingContactCenter";
import { products } from "../../data/products";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { motion } from "framer-motion";

export const metadata: Metadata = {
  title: "Products | PT Acewin Mello International",
  description: "Browse our comprehensive range of Food Ingredients, Industrial Machinery, and Commercial Cooking Equipment.",
};

export default function ProductsPage() {
  const categories = ["Food Ingredients", "Technology & Machinery", "Industrial Cooking Equipment"];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-[96px] md:pt-[112px]">
        
        {/* Page Header */}
        <section className="bg-zinc-950 text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
              <p className="text-xl text-gray-400 max-w-2xl">
                High-quality products and equipment tailored for your industrial needs.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {categories.map((category, catIdx) => {
              const categoryProducts = products.filter(p => p.category === category);
              if (categoryProducts.length === 0) return null;

              return (
                <div key={category} className="mb-20 last:mb-0">
                  <FadeIn>
                    <div className="flex items-center gap-4 mb-8">
                      <h2 className="text-2xl font-bold text-zinc-950">{category}</h2>
                      <div className="flex-1 h-px bg-gray-200"></div>
                    </div>
                  </FadeIn>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoryProducts.map((product, idx) => (
                      <FadeIn key={product.slug} delay={idx * 0.1}>
                        <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                          <div className="aspect-[4/3] overflow-hidden relative">
                            <div className={`absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 ${product.containImage ? 'hidden' : ''}`} />
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className={`w-full h-full group-hover:scale-105 transition-transform duration-500 ${product.containImage ? 'object-contain bg-white p-4' : 'object-cover'}`}
                            />
                          </div>
                          <CardContent className="p-6 flex flex-col">
                            <h3 className="text-xl font-bold text-zinc-950 mb-3">{product.name}</h3>
                            <p className="text-gray-600 line-clamp-3 mb-6 text-sm">{product.overview}</p>
                            <Button asChild className="mt-auto w-full" variant="outline">
                              <Link href={`/products/${product.slug}`}>View Details</Link>
                            </Button>
                          </CardContent>
                        </Card>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>
      <Footer />
      <FloatingContactCenter />
    </div>
  );
}
