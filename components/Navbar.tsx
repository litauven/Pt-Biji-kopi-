"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, Download, ChevronRight } from "lucide-react";
import { Button } from "./ui/Button";
import RequestQuoteModal from "./RequestQuoteModal";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Business Divisions", href: "/divisions" },
    { name: "Products", href: "/products" },
    { name: "Services", href: "/services" },
    { name: "Industries", href: "/industries" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm py-2"
            : "bg-white py-3 md:py-4 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <Image 
                src="/PtAcewinLogo.png" 
                alt="PT Acewin Mello International Logo" 
                width={300} 
                height={120} 
                className={`w-auto object-contain transition-all duration-300 ${
                  isScrolled ? "h-12 md:h-14" : "h-16 md:h-20"
                }`} 
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = link.href === "/" 
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
                  
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-emerald-900 ${
                      isActive ? "text-emerald-900 font-semibold" : "text-gray-600"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Header Right Actions */}
            <div className="hidden xl:flex items-center gap-4">
              <a
                href="/PT_AcewinMello.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center px-4 py-2 font-medium text-white transition-all duration-300 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] group"
              >
                <Download className="w-4 h-4 mr-2 transition-transform group-hover:-translate-y-1" />
                Company Profile
              </a>
              <Button onClick={() => setIsQuoteModalOpen(true)}>
                Get Quote
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="xl:hidden flex items-center gap-3">
              <Button size="sm" onClick={() => setIsQuoteModalOpen(true)} className="md:hidden">
                Quote
              </Button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-emerald-900 p-2"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 h-[calc(100vh-100px)] z-40 bg-white flex flex-col xl:hidden border-t">
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = link.href === "/" 
                ? pathname === "/"
                : pathname.startsWith(link.href);
                
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-medium border-b border-gray-100 pb-3 flex items-center justify-between ${
                    isActive ? "text-emerald-900" : "text-gray-700"
                  }`}
                >
                  {link.name}
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                </Link>
              );
            })}
            
            <div className="pt-6 flex flex-col gap-4">
              <a
                href="/PT_AcewinMello.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 rounded-md font-medium text-gray-700"
              >
                <Download className="w-5 h-5" />
                Download Company Profile
              </a>
              <Button 
                className="w-full" 
                size="lg" 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsQuoteModalOpen(true);
                }}
              >
                Request Quotation
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>

      {/* Global Modals */}
      <RequestQuoteModal 
        open={isQuoteModalOpen} 
        onOpenChange={setIsQuoteModalOpen} 
      />
    </>
  );
}
