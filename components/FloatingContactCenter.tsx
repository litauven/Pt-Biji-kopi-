"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Mail, X } from "lucide-react"

export default function FloatingContactCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4 flex flex-col gap-3"
          >
            <a
              href="https://wa.me/6281234567890" // Placeholder number
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-full bg-white p-3 pr-4 shadow-lg ring-1 ring-black/5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white">
                <MessageCircle className="h-5 w-5" />
              </div>
              <span className="font-medium text-sm text-gray-700">Chat on WhatsApp</span>
            </a>
            
            {!isMobile && (
              <a
                href="mailto:marketing@acemello.com"
                className="flex items-center gap-3 rounded-full bg-white p-3 pr-4 shadow-lg ring-1 ring-black/5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-900 text-white">
                  <Mail className="h-5 w-5" />
                </div>
                <span className="font-medium text-sm text-gray-700">Email Us</span>
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-900 text-white shadow-xl hover:bg-emerald-900-light transition-all active:scale-95"
        aria-label="Contact Us"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  )
}
