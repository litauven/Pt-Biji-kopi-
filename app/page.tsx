import React from "react";
import Link from "next/link";
import { ArrowRight, Download, CheckCircle, Globe, Factory, Cpu, Coffee, Building2, TrendingUp, Users, Shield } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { FadeIn } from "../components/ui/FadeIn";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingContactCenter from "../components/FloatingContactCenter";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-[96px] md:pt-[112px]">
        {/* HERO SECTION */}
        <section className="relative bg-zinc-950 text-white py-32 lg:py-48 overflow-hidden">
          {/* Background image overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop" 
              alt="Global Trading & Industry" 
              className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-zinc-950/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <FadeIn direction="up">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-sm font-medium tracking-wide text-white uppercase">Premium Global Sourcing & Solutions</span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
                  Empowering Industries Through <span className="text-amber-500">Quality Products</span> & Technology
                </h1>
              </FadeIn>
              <FadeIn direction="up" delay={0.1}>
                <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
                  PT Acewin Mello International delivers premium food ingredients, innovative technology solutions, and commercial machinery worldwide.
                </p>
              </FadeIn>
              <FadeIn direction="up" delay={0.2} className="flex flex-wrap gap-5">
                <Button size="lg" className="h-14 px-8 text-lg rounded-md" asChild>
                  <Link href="/contact">Request Quotation</Link>
                </Button>
                <a 
                  href="/PT_AcewinMello.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center justify-center h-14 px-8 text-lg font-medium text-white transition-all duration-300 rounded-md bg-white/10 hover:bg-white/20 border border-gray-400 hover:border-white shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] group"
                >
                  <Download className="w-5 h-5 mr-2 transition-transform group-hover:-translate-y-1" />
                  Download Company Profile
                </a>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* OUR IMPACT (STATISTICS) */}
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Building2, value: "3+", label: "Business Divisions" },
                { icon: Users, value: "50+", label: "Professional Team" },
                { icon: TrendingUp, value: "360°", label: "End-to-End Solutions" },
                { icon: Globe, value: "Global", label: "Market Reach" },
              ].map((stat, i) => (
                <FadeIn key={i} delay={i * 0.1} direction="up" className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center text-emerald-900 mb-4">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-bold text-zinc-950 mb-1">{stat.value}</h3>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* BUSINESS DIVISIONS */}
        <section className="py-20 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-bold text-zinc-950 mb-4">Our Business Divisions</h2>
                <p className="text-gray-600">We operate across three main pillars to provide comprehensive solutions for our corporate partners.</p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Food Ingredients",
                  desc: "Supplying premium Indonesian agricultural and food ingredient products for domestic and international markets.",
                  icon: Coffee,
                  link: "/divisions#food"
                },
                {
                  title: "Technology & Machinery",
                  desc: "Providing digital transformation and industrial technology solutions to enhance operational efficiency.",
                  icon: Cpu,
                  link: "/divisions#tech"
                },
                {
                  title: "Industrial Cooking Equipment",
                  desc: "Supplying innovative commercial cooking equipment for food manufacturers and industrial kitchens.",
                  icon: Factory,
                  link: "/divisions#equipment"
                }
              ].map((div, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <Card className="h-full hover:shadow-lg transition-shadow border-none shadow-md">
                    <CardContent className="p-8 flex flex-col h-full">
                      <div className="w-14 h-14 bg-emerald-900/10 rounded-lg flex items-center justify-center text-emerald-900 mb-6">
                        <div.icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{div.title}</h3>
                      <p className="text-gray-600 mb-6 flex-grow">{div.desc}</p>
                      <Link href={div.link} className="text-emerald-900 font-semibold flex items-center hover:text-emerald-900-dark transition-colors mt-auto">
                        Learn More <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST & CREDIBILITY */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <FadeIn>
                  <h2 className="text-3xl font-bold text-zinc-950 mb-6">Why Partner With Us?</h2>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    PT Acewin Mello International is committed to delivering high-quality products and innovative solutions. We build trust through transparency, reliability, and excellence.
                  </p>
                </FadeIn>
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                  {[
                    "Quality Assurance", "Reliable Supply Chain",
                    "Export Experience", "Technology Expertise",
                    "Professional Support", "Long-Term Partnership"
                  ].map((item, i) => (
                    <FadeIn key={i} delay={i * 0.05} direction="right" className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-900 shrink-0" />
                      <span className="font-medium text-gray-800">{item}</span>
                    </FadeIn>
                  ))}
                </div>
              </div>
              <FadeIn direction="left" className="relative h-[400px] rounded-xl overflow-hidden bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop" 
                  alt="Professional corporate partnership"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 bg-emerald-900 text-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Build Your Next Business Solution Together</h2>
              <p className="text-lg text-emerald-900-light mb-10 max-w-2xl mx-auto text-green-100">
                Contact our team to discuss your specific requirements or request a quotation for our products and services.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button size="lg" className="bg-white text-emerald-900 hover:bg-gray-100" asChild>
                  <Link href="/products">Explore Products</Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>

      </main>

      <Footer />
      <FloatingContactCenter />
    </div>
  );
}
