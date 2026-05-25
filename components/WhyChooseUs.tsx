"use client";

import React from "react";
import { useApp } from "../context/AppContext";
import { Users, Award, Zap, PackageOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const { language } = useApp();

  const values = [
    {
      icon: Users,
      title: "Direct Farmer Sourcing",
      titleId: "Kemitraan Petani Langsung",
      description: "We work hand-in-hand with Indonesian highlands cooperatives. By paying 20% above traditional middleman rates, we empower farm communities and secure first-choice specialty lots.",
      descriptionId: "Kami bekerja langsung dengan koperasi dataran tinggi. Dengan membayar 20% di atas harga tengkulak tradisional, kami mensejahterakan petani dan mengamankan lot kopi terbaik."
    },
    {
      icon: Award,
      title: "Micro-batch Roasting",
      titleId: "Penyangraian Mikro Presisi",
      description: "Our Q-Graders curate and supervise roasting in micro-batches (under 15kg). This strict thermodynamic control highlights each single origin's floral notes and sugar structure perfectly.",
      descriptionId: "Q-Grader kami mengawasi penyangraian dalam batch mikro khusus (di bawah 15kg). Kontrol termodinamika ketat ini menonjolkan keasaman buah alami dan kemanisan madu secara sempurna."
    },
    {
      icon: PackageOpen,
      title: "Hermetic Valve Packaging",
      titleId: "Kemasan Katup Kedap Udara",
      description: "To block oxygen degradation, our custom gold-foil bags are nitrogen-flushed and equipped with one-way degassing valves. Beans remain pristine and arrive aromatic.",
      descriptionId: "Untuk mencegah masuknya oksigen, kantong kertas emas khusus kami dibilas nitrogen kedap udara dan dilengkapi katup degassing satu arah. Biji kopi tetap segar dan harum saat tiba."
    },
    {
      icon: Zap,
      title: "Rapid Dispatch & Logistics",
      titleId: "Pengiriman Ekspres & Terlacak",
      description: "Roast schedules are aligned with shipping dispatches. Orders are processed, packaged, and handed over to premium couriers (JNE, DHL) within 24 hours of roasting.",
      descriptionId: "Jadwal sangrai diselaraskan langsung dengan kurir pengiriman. Pesanan diproses, dikemas, dan diserahkan ke kurir premium (JNE, DHL) dalam waktu 24 jam setelah selesai disangrai."
    }
  ];

  return (
    <section className="py-24 bg-espresso-black text-warm-cream relative overflow-hidden">
      {/* Background visual helpers */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-coffee-gold/5 rounded-full blur-3xl z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-[11px] font-bold text-coffee-gold tracking-[0.3em] uppercase block">
            {language === "id" ? "NILAI UNGGULAN KAMI" : "OUR SPECIALTY PILLARS"}
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-none">
            {language === "id" ? "Mengapa Memilih BKN Premium?" : "Uncompromising Standards of BKN"}
          </h2>
          <div className="w-12 h-1 bg-coffee-gold mx-auto mt-4" />
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx}
                className="bg-espresso-dark/45 border border-coffee-gold/10 hover:border-coffee-gold/30 rounded-xl p-8 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-coffee-brown/50 border border-coffee-gold/20 flex items-center justify-center text-coffee-gold shadow-inner group-hover:scale-105 group-hover:border-coffee-gold transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  {/* Text */}
                  <h3 className="font-serif-editorial text-lg md:text-xl font-bold text-white tracking-wide group-hover:text-coffee-gold transition-colors">
                    {language === "id" ? val.titleId : val.title}
                  </h3>
                  <p className="text-warm-cream/70 text-xs sm:text-sm leading-relaxed">
                    {language === "id" ? val.descriptionId : val.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
