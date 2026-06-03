import React from "react";
import { Metadata } from "next";
import { FadeIn } from "../../components/ui/FadeIn";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FloatingContactCenter from "../../components/FloatingContactCenter";
import { Building, Coffee, ChefHat, BedDouble, Factory, Laptop, ArrowRightLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Industries We Serve | PT Acewin Mello International",
  description: "Providing quality products and solutions to Food Manufacturing, Hospitality, Technology, and Trading industries.",
};

export default function IndustriesPage() {
  const industries = [
    { name: "Food Manufacturing", icon: Factory, desc: "Bulk ingredients and processing machinery for large-scale FMCG production." },
    { name: "Coffee Roasters", icon: Coffee, desc: "Premium single-origin and commercial green beans for international roasteries." },
    { name: "Restaurants & Cafes", icon: ChefHat, desc: "Commercial cooking equipment, oil-water fryers, and specialty ingredients." },
    { name: "Hotels & Hospitality", icon: BedDouble, desc: "Wholesale food supplies and kitchen automation for hotel chains." },
    { name: "Industrial Kitchens", icon: Building, desc: "Custom kitchen setups and high-capacity processing equipment." },
    { name: "Technology Companies", icon: Laptop, desc: "Outsourced software development and AI integration for tech enterprises." },
    { name: "Trading Companies", icon: ArrowRightLeft, desc: "Reliable sourcing partnerships for global import-export businesses." }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-[96px] md:pt-[112px]">
        {/* Header */}
        <section className="bg-zinc-950 text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Industries We Serve</h1>
              <p className="text-xl text-gray-400 max-w-2xl">
                Empowering various sectors with our tailored products and technology solutions.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Industries Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {industries.map((ind, i) => (
                <FadeIn key={i} delay={i * 0.05} className="group p-6 border border-gray-200 rounded-xl hover:border-emerald-900 hover:bg-emerald-900/5 transition-all">
                  <ind.icon className="w-10 h-10 text-amber-500 mb-4 group-hover:text-emerald-900 transition-colors" />
                  <h3 className="font-bold text-lg mb-2 text-zinc-950">{ind.name}</h3>
                  <p className="text-sm text-gray-600">{ind.desc}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContactCenter />
    </div>
  );
}
