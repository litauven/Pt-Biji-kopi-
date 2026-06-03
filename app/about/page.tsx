import React from "react";
import { Metadata } from "next";
import { FadeIn } from "../../components/ui/FadeIn";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FloatingContactCenter from "../../components/FloatingContactCenter";
import { CheckCircle2, Target, Eye, Shield, Gem, Users2, Download } from "lucide-react";
import { Button } from "../../components/ui/Button";

export const metadata: Metadata = {
  title: "About Us | PT Acewin Mello International",
  description: "Learn about our mission, vision, and core values as a leading Indonesian trading and industrial solution company.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-[96px] md:pt-[112px]">
        {/* Page Header */}
        <section className="bg-zinc-950 text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
              <p className="text-xl text-gray-400 max-w-2xl">
                Your trusted global partner in providing quality products, technology, and industrial solutions from Indonesia.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <h2 className="text-3xl font-bold text-zinc-950 mb-6">Company Overview</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  PT Acewin Mello International is an Indonesian trading and solution company specializing in Food Ingredients, Technology Solutions, Industrial Machinery, and Commercial Cooking Equipment.
                </p>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  We help businesses source high-quality products, implement technology solutions, and improve operational efficiency through innovative industrial equipment. With our extensive local network and international standards, we serve as the bridge between premium Indonesian resources and global market demands.
                </p>
                <a 
                  href="/PT_AcewinMello.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center justify-center px-6 py-3 font-medium text-white transition-all duration-300 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] group w-fit"
                >
                  <Download className="w-5 h-5 mr-2 transition-transform group-hover:-translate-y-1" />
                  Download Company Profile
                </a>
              </FadeIn>
              <FadeIn direction="left" delay={0.2} className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                <img 
                  src="/neosoho.jpg" 
                  alt="Apartemen Neo Soho"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <FadeIn className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-500 mb-6">
                  <Eye className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-zinc-950 mb-4">Our Vision</h2>
                <p className="text-gray-600 text-lg italic">
                  "To become a trusted global partner in providing quality products, technology, and industrial solutions."
                </p>
              </FadeIn>

              <FadeIn delay={0.2} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-emerald-900/10 rounded-lg flex items-center justify-center text-emerald-900 mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-zinc-950 mb-4">Our Mission</h2>
                <ul className="space-y-3">
                  {[
                    "Deliver high-quality products.",
                    "Provide innovative technology solutions.",
                    "Support industrial growth.",
                    "Build long-term partnerships.",
                    "Maintain customer satisfaction."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                      <CheckCircle2 className="w-5 h-5 text-emerald-900 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <FadeIn>
                <h2 className="text-3xl font-bold text-zinc-950 mb-4">Our Core Values</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">These fundamental beliefs guide our actions and behavior in everything we do.</p>
              </FadeIn>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { icon: Shield, label: "Integrity" },
                { icon: Target, label: "Innovation" },
                { icon: Gem, label: "Quality" },
                { icon: CheckCircle2, label: "Commitment" },
                { icon: Users2, label: "Collaboration" }
              ].map((value, i) => (
                <FadeIn key={i} delay={i * 0.1} direction="up" className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-white shadow-sm rounded-full flex items-center justify-center text-emerald-900 mb-4">
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-zinc-950">{value.label}</h3>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="py-20 bg-zinc-950 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
              <p className="text-gray-400">The milestones that shaped PT Acewin Mello International.</p>
            </FadeIn>
            
            <div className="relative border-l border-gray-700 ml-3 md:ml-1/2 space-y-12 pb-8">
              {[
                { year: "Phase 1", title: "Company Establishment", desc: "Founding of the company with a focus on premium Indonesian food ingredients sourcing." },
                { year: "Phase 2", title: "Business Expansion", desc: "Expanding our network to international markets and establishing robust supply chains." },
                { year: "Phase 3", title: "Technology Division Launch", desc: "Introducing digital transformation and software development services for corporate clients." },
                { year: "Phase 4", title: "Industrial Solutions Growth", desc: "Adding industrial machinery and commercial cooking equipment to our portfolio." }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.15} className="relative pl-8 md:w-1/2 md:-ml-[21px] md:odd:pr-12 md:odd:pl-0 md:odd:text-right md:even:ml-auto md:even:pl-12">
                  <div className="absolute top-1 left-[-5px] md:left-auto md:odd:right-[-5px] md:even:left-[-5px] w-3 h-3 bg-emerald-900 rounded-full ring-4 ring-zinc-950" />
                  <span className="text-amber-500 font-bold text-sm tracking-widest uppercase">{item.year}</span>
                  <h3 className="text-xl font-bold mt-1 mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
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
