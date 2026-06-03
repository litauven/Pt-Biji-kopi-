import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "../../components/ui/FadeIn";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FloatingContactCenter from "../../components/FloatingContactCenter";
import { Coffee, Cpu, Factory, ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Business Divisions | PT Acewin Mello International",
  description: "Explore our three main business divisions: Food Ingredients, Technology & Machinery, and Industrial Cooking Equipment.",
};

export default function DivisionsPage() {
  const divisions = [
    {
      id: "food",
      title: "Food Ingredients",
      icon: Coffee,
      image: "/indonesian_spices.png",
      desc: "Supplying premium Indonesian agricultural and food ingredient products for domestic and international markets.",
      items: ["Coffee (Arabica & Robusta)", "Premium Tea", "Cocoa Products", "Spices", "Seasonings"],
    },
    {
      id: "tech",
      title: "Technology & Machinery",
      icon: Cpu,
      image: "/industrial_machinery.png",
      desc: "Providing digital transformation and industrial technology solutions.",
      items: ["IT Solutions", "Software Development", "Web Development", "AI Solutions", "Computer Programming", "Industrial Machinery Trading"],
      reverse: true
    },
    {
      id: "equipment",
      title: "Industrial Cooking Equipment",
      icon: Factory,
      image: "/kompor1.png",
      containImage: true,
      desc: "Supplying innovative commercial cooking equipment for food manufacturers and industrial kitchens.",
      items: ["Oil-Water Deep Fryer", "Commercial Kitchen Equipment", "Food Processing Equipment", "Custom Industrial Setup"],
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-[96px] md:pt-[112px]">
        {/* Page Header */}
        <section className="bg-zinc-950 text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Business Divisions</h1>
              <p className="text-xl text-gray-400 max-w-2xl">
                Comprehensive solutions tailored for diverse industrial sectors.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Divisions List */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-20">
              {divisions.map((div, i) => (
                <div key={div.id} id={div.id} className="scroll-mt-32">
                  <div className={`grid lg:grid-cols-2 gap-12 items-center ${div.reverse ? 'lg:rtl' : ''}`}>
                    <FadeIn direction={div.reverse ? "left" : "right"} className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl ${div.reverse ? 'lg:ltr' : ''} ${div.containImage ? 'bg-gray-50' : ''}`}>
                      <img src={div.image} alt={div.title} className={`absolute inset-0 w-full h-full ${div.containImage ? 'object-contain p-8' : 'object-cover'}`} />
                      {!div.containImage && <div className="absolute inset-0 bg-black/10" />}
                    </FadeIn>
                    
                    <FadeIn direction={div.reverse ? "right" : "left"} className={div.reverse ? 'lg:ltr' : ''}>
                      <div className="w-16 h-16 bg-stone-50 rounded-xl flex items-center justify-center text-emerald-900 mb-6">
                        <div.icon className="w-8 h-8" />
                      </div>
                      <h2 className="text-3xl font-bold text-zinc-950 mb-4">{div.title}</h2>
                      <p className="text-lg text-gray-600 mb-8">{div.desc}</p>
                      
                      <h3 className="font-semibold text-zinc-950 mb-4 uppercase tracking-wider text-sm">Key Focus Areas:</h3>
                      <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-6 mb-8">
                        {div.items.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-700">
                            <Check className="w-5 h-5 text-emerald-900" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      
                      <Link href="/products" className="inline-flex items-center font-semibold text-emerald-900 hover:text-emerald-900-dark transition-colors">
                        View Related Products <ArrowRight className="w-5 h-5 ml-2" />
                      </Link>
                    </FadeIn>
                  </div>
                </div>
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
