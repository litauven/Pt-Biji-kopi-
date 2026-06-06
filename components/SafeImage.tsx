"use client";

import React, { useState, useEffect } from "react";
import { Coffee } from "lucide-react";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  type?: "bean" | "roast" | "cup" | "plantation" | "default";
}

export default function SafeImage({
  src,
  alt = "PT Biji Kopi Nusantara",
  className = "",
  type = "default",
  ...props
}: SafeImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  // Reset states if src changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    if (!src) {
      setHasError(true);
      setIsLoading(false);
      return;
    }
  }, [src]);

  useEffect(() => {
    // Immediate check for cached images
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoading(false);
      setHasError(false);
    }
  }, [src]);

  // Premium SVGs designed to match the brand identity perfectly
  const renderFallback = () => {
    const bgGradient = "bg-gradient-to-br from-espresso-black via-espresso-dark to-coffee-brown";

    switch (type) {
      case "bean":
        return (
          <div className={`absolute inset-0 flex flex-col items-center justify-center ${bgGradient} p-4 text-center border border-coffee-gold/10 rounded-lg select-none`}>
            {/* Custom stylized vector coffee beans */}
            <svg
              className="w-12 h-12 text-coffee-gold mb-3 opacity-90"
              viewBox="0 0 64 64"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Bean 1 */}
              <path d="M14 42C10 38 8 32 10 26C12 20 18 16 24 16C30 16 36 20 38 26C40 32 38 38 34 42C30 46 22 48 14 42Z" />
              <path d="M12 34C16 34 22 32 26 28C30 24 34 18 36 26" strokeDasharray="2 2" />
              {/* Bean 2 */}
              <path d="M50 22C54 26 56 32 54 38C52 44 46 48 40 48C34 48 28 44 26 38C24 32 26 26 30 22C34 18 42 16 50 22Z" />
              <path d="M52 30C48 30 42 32 38 36C34 40 30 46 28 38" />
            </svg>
            <span className="text-[10px] font-black tracking-[0.25em] text-coffee-gold-light uppercase leading-none">
              Specialty Lot
            </span>
            <span className="text-[9px] text-warm-cream/50 mt-1.5 max-w-[80%] line-clamp-1 italic">
              {alt}
            </span>
          </div>
        );

      case "plantation":
        return (
          <div className={`absolute inset-0 flex flex-col items-center justify-center ${bgGradient} p-4 text-center border border-coffee-gold/10 rounded-lg select-none`}>
            {/* Stylized Mountain Peaks & Organic Plantation Leaf */}
            <svg
              className="w-14 h-14 text-coffee-gold mb-2 opacity-90"
              viewBox="0 0 64 64"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Mountain 1 (Large) */}
              <path d="M8 50L28 16L48 50H8Z" fill="rgba(197, 155, 109, 0.05)" />
              {/* Mountain 2 (Small) */}
              <path d="M32 50L46 28L58 50H32Z" />
              {/* Sun/Origin Orbit */}
              <circle cx="48" cy="18" r="4" fill="currentColor" />
              {/* Leaf element on ground */}
              <path d="M22 50C22 46 26 42 32 42C32 46 28 50 22 50Z" fill="currentColor" />
              <path d="M22 50L32 42" />
            </svg>
            <span className="text-[10px] font-black tracking-[0.25em] text-coffee-gold-light uppercase leading-none">
              Volcanic Origin
            </span>
            <span className="text-[9px] text-warm-cream/50 mt-1.5 max-w-[85%] line-clamp-1 italic">
              {alt}
            </span>
          </div>
        );

      case "roast":
        return (
          <div className={`absolute inset-0 flex flex-col items-center justify-center ${bgGradient} p-4 text-center border border-coffee-gold/10 rounded-lg select-none`}>
            {/* Custom Thermodynamic Roasting Drum & Flame */}
            <svg
              className="w-12 h-12 text-coffee-gold mb-3 opacity-90"
              viewBox="0 0 64 64"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Roasting Drum */}
              <circle cx="32" cy="28" r="16" strokeDasharray="3 3" className="animate-spin-slow" />
              <circle cx="32" cy="28" r="8" />
              {/* Flame Motif at bottom */}
              <path d="M24 50C24 50 26 42 32 42C38 42 40 50 40 50C40 50 37 46 32 46C27 46 24 50 24 50Z" fill="currentColor" />
              {/* Axis bars */}
              <path d="M16 28H10" />
              <path d="M54 28H48" />
            </svg>
            <style>{`
              .animate-spin-slow {
                animation: spin 16s linear infinite;
              }
              @keyframes spin {
                from { transform: rotate(0deg); transform-origin: 32px 28px; }
                to { transform: rotate(360deg); transform-origin: 32px 28px; }
              }
            `}</style>
            <span className="text-[10px] font-black tracking-[0.25em] text-coffee-gold-light uppercase leading-none">
              Micro-Roast Lot
            </span>
            <span className="text-[9px] text-warm-cream/50 mt-1.5 max-w-[80%] line-clamp-1 italic">
              {alt}
            </span>
          </div>
        );

      case "cup":
        return (
          <div className={`absolute inset-0 flex flex-col items-center justify-center ${bgGradient} p-4 text-center border border-coffee-gold/10 rounded-lg select-none`}>
            {/* Artistic Steaming Specialty Coffee Cup */}
            <svg
              className="w-12 h-12 text-coffee-gold mb-3 opacity-90"
              viewBox="0 0 64 64"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Steam waves */}
              <path d="M26 12C26 8 28 8 28 4" />
              <path d="M32 14C32 10 34 10 34 6" />
              <path d="M38 12C38 8 40 8 40 4" />
              {/* Cup main body */}
              <path d="M16 22H48C48 36 40 44 32 44C24 44 16 36 16 22Z" fill="rgba(197, 155, 109, 0.08)" />
              {/* Handle */}
              <path d="M48 26C54 26 56 30 54 33C52 36 48 36 48 36" />
              {/* Saucer */}
              <path d="M12 50H52" strokeWidth="3" />
            </svg>
            <span className="text-[10px] font-black tracking-[0.25em] text-coffee-gold-light uppercase leading-none">
              Gourmet Extract
            </span>
            <span className="text-[9px] text-warm-cream/50 mt-1.5 max-w-[80%] line-clamp-1 italic">
              {alt}
            </span>
          </div>
        );

      default:
        return (
          <div className={`absolute inset-0 flex flex-col items-center justify-center ${bgGradient} p-4 text-center border border-coffee-gold/10 rounded-lg select-none`}>
            {/* Premium Gold Brand Emblem Logo */}
            <div className="w-12 h-12 rounded-full border-2 border-coffee-gold flex items-center justify-center text-coffee-gold mb-3 bg-espresso-black/40 shadow-inner">
              <Coffee className="w-6 h-6 fill-current" />
            </div>
            <span className="text-[10px] font-black tracking-[0.25em] text-coffee-gold-light uppercase leading-none">
              BIJI KOPI NUSANTARA
            </span>
            <span className="text-[9px] text-warm-cream/50 mt-1.5 max-w-[80%] line-clamp-1 italic">
              {alt}
            </span>
          </div>
        );
    }
  };

  return (
    <div className={`relative w-full h-full overflow-hidden bg-espresso-black/40 ${className}`}>
      {/* Shimmer loading skeleton */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-espresso-dark">
          <div className="w-full h-full bg-gradient-to-r from-espresso-dark via-coffee-brown/40 to-espresso-dark animate-shimmer" />
        </div>
      )}

      {/* Falling back fully to SVG if load errors */}
      {hasError ? (
        renderFallback()
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isLoading ? "opacity-0 scale-102 blur-sm" : "opacity-100 scale-100 blur-0"
          }`}
          {...props}
        />
      )}

      {/* Styled animation keyframes for shimmer */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 1.8s infinite linear;
        }
      `}</style>
    </div>
  );
}
