import React from "react";
import { Metadata } from "next";
import { FadeIn } from "../../components/ui/FadeIn";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FloatingContactCenter from "../../components/FloatingContactCenter";
import { Globe2, Ship, Code2, BrainCircuit, Wrench, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services | PT Acewin Mello International",
  description: "Explore our professional services including Product Sourcing, Export Assistance, Software Development, AI Implementation, and Industrial Consultations.",
};

export default function ServicesPage() {
  const services = [
    {
      icon: Globe2,
      title: "Product Sourcing",
      desc: "End-to-end sourcing of premium food ingredients and agricultural products from Indonesia, tailored to your volume and quality requirements."
    },
    {
      icon: Ship,
      title: "Export Assistance",
      desc: "Comprehensive export handling including customs clearance, logistics, and international compliance to ensure smooth delivery worldwide."
    },
    {
      icon: Code2,
      title: "Software Development",
      desc: "Custom web and mobile application development for enterprise solutions, supply chain management, and operational tracking."
    },
    {
      icon: BrainCircuit,
      title: "AI Implementation",
      desc: "Integrating artificial intelligence into your business processes for predictive maintenance, automation, and data analytics."
    },
    {
      icon: Wrench,
      title: "Industrial Machinery Supply",
      desc: "Procurement, installation, and commissioning of custom industrial machinery to upgrade your manufacturing capabilities."
    },
    {
      icon: Settings,
      title: "Equipment Consultation",
      desc: "Expert advisory on selecting, optimizing, and maintaining commercial cooking equipment and food processing setups."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-[96px] md:pt-[112px]">
        {/* Header */}
        <section className="bg-zinc-950 text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
              <p className="text-xl text-gray-400 max-w-2xl">
                Comprehensive B2B solutions designed to streamline your operations and drive growth.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 h-full hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 bg-emerald-900/10 rounded-lg flex items-center justify-center text-emerald-900 mb-6">
                      <service.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-950 mb-3">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                  </div>
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
