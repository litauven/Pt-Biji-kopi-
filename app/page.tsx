"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import FeaturedProducts from "../components/FeaturedProducts";
import OriginsMap from "../components/OriginsMap";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import BrewingGuide from "../components/BrewingGuide";
import Gallery from "../components/Gallery";
import CtaBanner from "../components/CtaBanner";
import Footer from "../components/Footer";

// Overlays & Drawers
import CartDrawer from "../components/CartDrawer";
import CheckoutModal from "../components/CheckoutModal";
import LoginModal from "../components/LoginModal";
import OrderTrackingModal from "../components/OrderTrackingModal";
import WhatsAppButton from "../components/WhatsAppButton";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-warm-cream selection:bg-coffee-gold selection:text-espresso-black">
      {/* Dynamic Sticky Header */}
      <Navbar />

      {/* Main Premium Editorial Blocks */}
      <main className="flex-grow">
        <Hero />
        <About />
        <FeaturedProducts />
        <OriginsMap />
        <WhyChooseUs />
        <Testimonials />
        <BrewingGuide />
        <Gallery />
        <CtaBanner />
      </main>

      {/* Rich Corporate Footer & Dark-themed Maps */}
      <Footer />

      {/* Interactive Overlays (Cart Drawers, Payment Wizards, Login & Tracker Boards) */}
      <CartDrawer />
      <CheckoutModal />
      <LoginModal />
      <OrderTrackingModal />

      {/* Floating Animated WhatsApp Concierge */}
      <WhatsAppButton />
    </div>
  );
}

