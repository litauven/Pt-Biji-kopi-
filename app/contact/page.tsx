import React from "react";
import { Metadata } from "next";
import { FadeIn } from "../../components/ui/FadeIn";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FloatingContactCenter from "../../components/FloatingContactCenter";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { Button } from "../../components/ui/Button";
import { MapPin, Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | PT Acewin Mello International",
  description: "Get in touch with us for inquiries, quotations, and partnership opportunities.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-[96px] md:pt-[112px]">
        {/* Header */}
        <section className="bg-zinc-950 text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
              <p className="text-xl text-gray-400 max-w-2xl">
                We are ready to support your business with our premium products and industrial solutions.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="py-20 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              
              {/* Contact Info */}
              <FadeIn>
                <h2 className="text-3xl font-bold text-zinc-950 mb-8">Get In Touch</h2>
                
                <div className="space-y-8 mb-12">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-900 shadow-sm shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-950 mb-1">Headquarters</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Apartement Neo Soho 1915, Tanjung Duren Sel.<br />
                        Grogol Petamburan, Jakarta Barat 11470
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-900 shadow-sm shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-950 mb-1">Phone</h3>
                      <p className="text-gray-600 leading-relaxed">+62 xxxxxxx</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-900 shadow-sm shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-950 mb-1">Email</h3>
                      <p className="text-gray-600 leading-relaxed">marketing.example@acewinmello.com</p>
                    </div>
                  </div>
                </div>

                <div className="w-full h-64 rounded-xl overflow-hidden shadow-md">
                  <iframe
                    src="https://maps.google.com/maps?q=Apartemen+Neo+Soho,+Tanjung+Duren+Selatan,+Grogol+Petamburan,+Jakarta+Barat&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </FadeIn>

              {/* Contact Form */}
              <FadeIn delay={0.2} className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100 h-fit">
                <h2 className="text-2xl font-bold text-zinc-950 mb-6">Send us a message</h2>
                <form className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name *</label>
                      <Input id="name" required placeholder="John Doe" />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="company" className="text-sm font-medium text-gray-700">Company *</label>
                      <Input id="company" required placeholder="Company Name" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address *</label>
                      <Input id="email" type="email" required placeholder="john@example.com" />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                      <Input id="phone" type="tel" placeholder="+1 234 567 890" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</label>
                    <Input id="subject" placeholder="How can we help?" />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700">Message *</label>
                    <Textarea id="message" required placeholder="Please provide details about your inquiry..." className="h-32" />
                  </div>

                  <Button type="submit" size="lg" className="w-full mt-2">
                    Send Message
                  </Button>
                </form>
              </FadeIn>

            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContactCenter />
    </div>
  );
}
