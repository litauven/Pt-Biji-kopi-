"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Globe, MapPin, Phone, Mail, Download } from "lucide-react";
import { Button } from "./ui/Button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-white pt-16 pb-8 border-t-4 border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src="/PtAcewinLogo.png" 
                alt="PT Acewin Mello International Logo" 
                width={400} 
                height={160} 
                className="h-24 md:h-32 w-auto object-contain" 
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              PT Acewin Mello International is a premier Indonesian trading and solutions company, specializing in Food Ingredients, Technology Solutions, Industrial Machinery, and Commercial Equipment.
            </p>
            <a 
              href="/PT_AcewinMello.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center px-5 py-2.5 font-medium text-white transition-all duration-300 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] group w-fit"
            >
              <Download className="w-4 h-4 mr-2 transition-transform group-hover:-translate-y-1" />
              Download Company Profile
            </a>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-amber-500 transition-colors">About Us</Link></li>
              <li><Link href="/divisions" className="hover:text-amber-500 transition-colors">Divisions</Link></li>
              <li><Link href="/products" className="hover:text-amber-500 transition-colors">Products</Link></li>
              <li><Link href="/services" className="hover:text-amber-500 transition-colors">Services</Link></li>
              <li><Link href="/industries" className="hover:text-amber-500 transition-colors">Industries</Link></li>
              <li><Link href="/gallery" className="hover:text-amber-500 transition-colors">Gallery</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="leading-relaxed">
                  Apartement Neo Soho 1915, Tanjung Duren Sel.<br />Grogol Petamburan, Jakarta Barat 11470
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                <span>+62 xxxxxxx</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                <a href="mailto:marketing.example@acewinmello.com" className="hover:text-amber-500 transition-colors">marketing.example@acewinmello.com</a>
              </li>
            </ul>
          </div>

          {/* Map/Placeholder */}
          <div className="lg:col-span-3 space-y-4">
             <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Global Reach
            </h4>
            <div className="w-full aspect-video rounded overflow-hidden shadow-md border border-gray-700">
              <iframe
                src="https://maps.google.com/maps?q=Apartemen+Neo+Soho,+Tanjung+Duren+Selatan,+Grogol+Petamburan,+Jakarta+Barat&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <span>
            © {currentYear} PT Acewin Mello International. All Rights Reserved.
          </span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
