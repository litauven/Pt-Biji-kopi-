"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { ShoppingBag, User, Menu, X, Coffee, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const {
    language,
    setLanguage,
    t,
    cart,
    setIsCartOpen,
    setIsLoginOpen,
    setIsTrackingOpen,
    user,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll for visual aesthetics
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: t("navHome"), href: "#home" },
    { name: t("navAbout"), href: "#about" },
    { name: t("navProducts"), href: "#products" },
    { name: t("navOrigins"), href: "#origins" },
    { name: t("navBrewing"), href: "#brewing" },
    { name: t("navContact"), href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-espresso-black/90 backdrop-blur-md border-b border-coffee-gold/15 py-3 shadow-lg"
            : "bg-gradient-to-b from-espresso-black/80 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-10 h-10 rounded-full bg-coffee-gold flex items-center justify-center text-espresso-black shadow-md shadow-coffee-gold/20"
              >
                <Coffee className="w-5 h-5 fill-current" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-white font-serif-editorial text-lg md:text-xl font-bold tracking-wider leading-none group-hover:text-coffee-gold transition-colors duration-300">
                  BIJI KOPI
                </span>
                <span className="text-[10px] text-coffee-gold/75 tracking-[0.2em] leading-none uppercase mt-0.5">
                  Nusantara
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-warm-cream/80 hover:text-coffee-gold text-sm font-medium tracking-wide uppercase transition-colors duration-300 relative py-1 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-coffee-gold transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Header Right Actions */}
            <div className="hidden md:flex items-center gap-5">
              {/* Language Pill */}
              <div className="flex items-center border border-coffee-gold/20 rounded-full bg-espresso-black/50 p-0.5">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-full transition-all duration-200 ${
                    language === "en"
                      ? "bg-coffee-gold text-espresso-black shadow-sm"
                      : "text-warm-cream/60 hover:text-warm-cream"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage("id")}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-full transition-all duration-200 ${
                    language === "id"
                      ? "bg-coffee-gold text-espresso-black shadow-sm"
                      : "text-warm-cream/60 hover:text-warm-cream"
                  }`}
                >
                  ID
                </button>
              </div>

              {/* Order Tracking Button */}
              <button
                onClick={() => setIsTrackingOpen(true)}
                className="text-warm-cream/80 hover:text-coffee-gold transition-colors p-1.5 rounded-full hover:bg-white/5 relative group"
                title={t("navTrack")}
              >
                <Truck className="w-5 h-5" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-espresso-black border border-coffee-gold/20 text-coffee-gold text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {t("navTrack")}
                </span>
              </button>

              {/* Customer Account Button */}
              <button
                onClick={() => setIsLoginOpen(true)}
                className="text-warm-cream/80 hover:text-coffee-gold transition-colors p-1.5 rounded-full hover:bg-white/5 flex items-center gap-1.5 group"
              >
                <User className="w-5 h-5" />
                {user?.isLoggedIn && (
                  <span className="text-xs max-w-[80px] truncate text-coffee-gold/90 font-medium hidden lg:inline">
                    {user.name.split(" ")[0]}
                  </span>
                )}
              </button>

              {/* Shopping Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="bg-coffee-gold hover:bg-coffee-gold-light text-espresso-black p-2.5 rounded-full transition-all duration-300 relative shadow-md shadow-coffee-gold/10 hover:shadow-coffee-gold/30 hover:scale-105 active:scale-95"
              >
                <ShoppingBag className="w-5 h-5" />
                <AnimatePresence>
                  {totalCartItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1.5 -right-1.5 bg-red-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-espresso-black"
                    >
                      {totalCartItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {/* Mobile Actions Drawer Toggles */}
            <div className="flex md:hidden items-center gap-3">
              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="bg-coffee-gold text-espresso-black p-2 rounded-full relative"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {totalCartItems}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-warm-cream/90 hover:text-coffee-gold p-1.5"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[65px] z-40 bg-espresso-black/95 backdrop-blur-xl border-t border-coffee-gold/10 md:hidden flex flex-col justify-between py-8 px-6"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-warm-cream text-lg font-serif-editorial tracking-wider border-b border-white/5 pb-2 hover:text-coffee-gold transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-5 border-t border-white/10 pt-6">
              {/* Controls */}
              <div className="flex items-center justify-between">
                <span className="text-warm-cream/50 text-sm">{t("navTrack")} & Account</span>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsTrackingOpen(true);
                    }}
                    className="p-2 border border-coffee-gold/20 rounded-full text-coffee-gold hover:bg-coffee-gold/10"
                  >
                    <Truck className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsLoginOpen(true);
                    }}
                    className="p-2 border border-coffee-gold/20 rounded-full text-coffee-gold hover:bg-coffee-gold/10"
                  >
                    <User className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Mobile Language Switcher */}
              <div className="flex items-center justify-between">
                <span className="text-warm-cream/50 text-sm">Language / Bahasa</span>
                <div className="flex items-center border border-coffee-gold/20 rounded-full bg-espresso-black p-0.5">
                  <button
                    onClick={() => setLanguage("en")}
                    className={`px-3 py-1 text-xs font-bold rounded-full ${
                      language === "en" ? "bg-coffee-gold text-espresso-black" : "text-warm-cream/60"
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage("id")}
                    className={`px-3 py-1 text-xs font-bold rounded-full ${
                      language === "id" ? "bg-coffee-gold text-espresso-black" : "text-warm-cream/60"
                    }`}
                  >
                    Indonesia
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
