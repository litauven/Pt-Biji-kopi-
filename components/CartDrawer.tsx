"use client";

import React from "react";
import { useApp } from "../context/AppContext";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const {
    language,
    t,
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    setIsCheckoutOpen,
  } = useApp();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.11);
  const total = subtotal + tax;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] bg-espresso-black text-warm-cream shadow-2xl z-50 flex flex-col border-l border-coffee-gold/10"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-coffee-gold/15 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-coffee-gold w-5 h-5" />
                <h2 className="font-serif-editorial text-lg md:text-xl font-bold tracking-wide">
                  {t("cartTitle")}
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 rounded-full text-warm-cream/60 hover:text-coffee-gold hover:bg-white/5 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-coffee-brown/40 border border-coffee-gold/10 flex items-center justify-center text-coffee-gold/75 mb-2">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <p className="text-warm-cream/60 text-sm max-w-xs">{t("cartEmpty")}</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-coffee-gold hover:text-coffee-gold-light text-xs font-bold uppercase tracking-wider underline underline-offset-4"
                  >
                    {t("cartBackToShop")}
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={`${item.product.id}-${item.grindSize}`}
                    className="flex gap-4 p-4 rounded-lg bg-espresso-dark/60 border border-coffee-gold/5 hover:border-coffee-gold/15 transition-all group"
                  >
                    {/* Item Image */}
                    <div className="relative w-20 h-20 rounded-md overflow-hidden bg-espresso-black border border-coffee-gold/10 shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>

                    {/* Item Metadata */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-serif-editorial text-sm font-semibold tracking-wide text-white group-hover:text-coffee-gold transition-colors">
                            {language === "id" ? item.product.nameId : item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.grindSize)}
                            className="text-warm-cream/40 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-coffee-gold bg-coffee-brown/50 px-2 py-0.5 rounded-full inline-block mt-1">
                          {item.grindSize}
                        </span>
                      </div>

                      <div className="flex justify-between items-end mt-2">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-coffee-gold/20 rounded bg-espresso-black">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.grindSize, item.quantity - 1)}
                            className="p-1 text-warm-cream/60 hover:text-coffee-gold transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-bold w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.grindSize, item.quantity + 1)}
                            className="p-1 text-warm-cream/60 hover:text-coffee-gold transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-xs text-warm-cream/40 block leading-none mb-1">
                            {item.quantity} x {formatPrice(item.product.price)}
                          </span>
                          <span className="text-sm font-bold text-coffee-gold">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Drawer Footer & Checkout Panel */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-coffee-gold/15 bg-espresso-dark space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-warm-cream/60">
                    <span>{t("cartSubtotal")}</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-warm-cream/60">
                    <span>{t("cartTax")}</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="border-t border-coffee-gold/10 my-2 pt-2 flex justify-between text-base font-bold text-white">
                    <span className="font-serif-editorial">{t("cartTotal")}</span>
                    <span className="text-coffee-gold">{formatPrice(total)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckoutClick}
                  className="w-full bg-coffee-gold hover:bg-coffee-gold-light text-espresso-black font-bold uppercase tracking-wider py-4 rounded-md transition-all duration-300 shadow-md shadow-coffee-gold/10 hover:shadow-coffee-gold/30 hover:scale-[1.01]"
                >
                  {t("cartCheckout")}
                </button>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center text-xs text-warm-cream/50 hover:text-warm-cream transition-colors mt-2 underline underline-offset-4"
                >
                  {t("cartBackToShop")}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
