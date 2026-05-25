"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Award, Compass, HeartHandshake, Flame, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Milestone {
  year: string;
  title: string;
  titleId: string;
  details: string;
  detailsId: string;
  image: string;
}

export default function About() {
  const { language } = useApp();
  const [activeMilestone, setActiveMilestone] = useState(0);

  const milestones: Milestone[] = [
    {
      year: "2018",
      title: "Rooted Sourcing",
      titleId: "Kemitraan Pertama",
      details: "Began as a tiny collection partnership in the Gayo Highlands, working directly with 12 smallholder organic farmers to secure premium Grade 1 arabica beans with direct trade pricing.",
      detailsId: "Dimulai sebagai kemitraan kolektif kecil di Dataran Tinggi Gayo, bekerja sama langsung dengan 12 petani organik untuk mengamankan biji kopi arabika Grade 1 premium dengan harga perdagangan langsung.",
      image: "https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&q=80&w=600"
    },
    {
      year: "2020",
      title: "Volcanic Expansions",
      titleId: "Ekspansi Jalur Vulkanik",
      details: "Expanded direct sourcing routes to the volcanic slopes of Mount Sesean in Toraja and citrus-bordered farms in Kintamani, Bali. Launched our first specialty washing station.",
      detailsId: "Memperluas rute pasokan langsung ke lereng gunung vulkanis Gunung Sesean di Toraja dan kebun berbatasan jeruk di Kintamani, Bali. Meluncurkan stasiun pemrosesan specialty pertama kami.",
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=600"
    },
    {
      year: "2022",
      title: "Global Export License",
      titleId: "Izin Ekspor Global",
      details: "Secured our official specialty export certificate. Began shipping micro-batches to boutique specialty coffee shops in Tokyo, Singapore, Melbourne, and London.",
      detailsId: "Mendapatkan sertifikat ekspor specialty resmi. Mulai mengirimkan batch mikro ke kedai kopi butik specialty di Tokyo, Singapura, Melbourne, dan London.",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600"
    },
    {
      year: "2024",
      title: "Zero-Carbon Eco-Logistics",
      titleId: "Ekologi Karbon Netral",
      details: "Implemented eco-pulpers utilizing 70% less water, introduced certified compostable bio-bags, and transitioned our Jakarta roastery to carbon-offset logistics pipelines.",
      detailsId: "Menerapkan mesin pengupas kulit buah kopi (eco-pulper) hemat air hingga 70%, memperkenalkan kemasan bio-degradable, dan mengalihkan pemanggangan Jakarta ke logistik karbon-netral.",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600"
    },
    {
      year: "2026",
      title: "PT Biji Kopi Nusantara",
      titleId: "PT Biji Kopi Nusantara",
      details: "Incorporated officially as PT Biji Kopi Nusantara. Debuted our live 'Roast-to-Cup' trace tracking system, letting cafe partners follow the exact temperature sequence of their beans.",
      detailsId: "Resmi berbadan hukum sebagai PT Biji Kopi Nusantara. Meluncurkan sistem pelacakan real-time 'Roast-to-Cup', memungkinkan mitra kafe memantau suhu penyangraian biji kopi mereka.",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <section id="about" className="py-24 bg-espresso-black text-warm-cream relative overflow-hidden">
      {/* Background Texture elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-coffee-gold/5 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-plantation-green/10 rounded-full blur-3xl z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-[11px] font-bold text-coffee-gold tracking-[0.3em] uppercase block">
            {language === "id" ? "PROFIL PERUSAHAAN" : "PT CORPORATE PORTFOLIO"}
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-none">
            {language === "id" ? "Merawat Warisan Kopi Indonesia" : "Nurturing Indonesia's Coffee Heritage"}
          </h2>
          <div className="w-12 h-1 bg-coffee-gold mx-auto mt-4" />
        </div>

        {/* Brand Grid Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Sourcing Visuals */}
          <div className="grid grid-cols-2 gap-4 relative">
            <div className="relative h-64 sm:h-80 w-full rounded-lg overflow-hidden border border-coffee-gold/15 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&q=80&w=600" alt="Coffee Plantation Sourcing" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="relative h-64 sm:h-80 w-full rounded-lg overflow-hidden border border-coffee-gold/15 translate-y-8 shadow-2xl bg-espresso-black">
              <video
                src="/0525.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Sourcing Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="font-serif-editorial text-2xl font-bold text-white tracking-wide">
                {language === "id" ? "Bukan Sekadar Perdagangan, Ini Kemitraan Hidup." : "Beyond Trading. Sourced With Soul."}
              </h3>
              <p className="text-warm-cream/70 text-sm leading-relaxed">
                {language === "id"
                  ? "Di bawah badan hukum resmi PT Biji Kopi Nusantara, kami mengukuhkan komitmen untuk melestarikan metode pertanian lestari warisan leluhur. Kami memotong rantai tengkulak tradisional, membayar hingga 20% di atas nilai pasar wajar langsung ke tangan petani di lima pulau vulkanis utama Nusantara."
                  : "Under the corporate integrity of PT Biji Kopi Nusantara, we stand as defenders of sustainable ancestral agriculture. By dismantling complex middlemen networks, we distribute direct-trade premiums averaging 20% above fair-market rates straight to volcanic smallholder cooperatives."}
              </p>
            </div>

            {/* Micro Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full border border-coffee-gold/20 flex items-center justify-center text-coffee-gold bg-coffee-brown/30">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">Direct Sourcing</h4>
                  <p className="text-warm-cream/50 text-[11px] mt-1 leading-relaxed">
                    {language === "id" ? "Pembayaran langsung tanpa tengkulak." : "Direct pay pipelines, skipping brokers."}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full border border-coffee-gold/20 flex items-center justify-center text-coffee-gold bg-coffee-brown/30">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">Micro Batch Roasts</h4>
                  <p className="text-warm-cream/50 text-[11px] mt-1 leading-relaxed">
                    {language === "id" ? "Dipanggang berdasarkan pesanan." : "Custom roasting, fresh release cycles."}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full border border-coffee-gold/20 flex items-center justify-center text-coffee-gold bg-coffee-brown/30">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">Specialty Grade</h4>
                  <p className="text-warm-cream/50 text-[11px] mt-1 leading-relaxed">
                    {language === "id" ? "Hanya skor Q-Grader 84+." : "Exclusively scoring 84+ on SCA scale."}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full border border-coffee-gold/20 flex items-center justify-center text-coffee-gold bg-coffee-brown/30">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">Eco-pulper wash</h4>
                  <p className="text-warm-cream/50 text-[11px] mt-1 leading-relaxed">
                    {language === "id" ? "Teknologi konservasi air petani." : "Conserving 70% volcanic water reserves."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Elegant Timeline Section */}
        <div className="border-t border-coffee-gold/15 pt-20">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-[10px] font-bold text-coffee-gold tracking-widest uppercase">
              {language === "id" ? "PERJALANAN KAMI" : "OUR CHRONICLED MILESTONES"}
            </span>
            <h3 className="font-serif-editorial text-2xl font-bold text-white tracking-wide">
              {language === "id" ? "Garis Waktu Kemitraan Nusantara" : "Nusantara Sourcing Odyssey"}
            </h3>
          </div>

          {/* Timeline Buttons Wrapper */}
          <div className="flex justify-between items-center max-w-4xl mx-auto relative mb-12 px-4">
            {/* Timeline base bar */}
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-coffee-gold/10 -translate-y-1/2 z-0" />
            
            {/* Highlighted active bar */}
            <div
              className="absolute top-1/2 left-0 h-[1.5px] bg-coffee-gold -translate-y-1/2 z-0 transition-all duration-500"
              style={{
                width: `${(activeMilestone / (milestones.length - 1)) * 100}%`,
              }}
            />

            {/* Clickable Years */}
            {milestones.map((ms, idx) => (
              <button
                key={ms.year}
                onClick={() => setActiveMilestone(idx)}
                className={`relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 ${
                  activeMilestone === idx
                    ? "bg-coffee-gold border-coffee-gold text-espresso-black shadow-lg shadow-coffee-gold/20"
                    : "bg-espresso-black border-coffee-gold/25 text-coffee-gold-light hover:border-coffee-gold hover:text-white"
                }`}
              >
                {ms.year}
              </button>
            ))}
          </div>

          {/* Milestone Details Card Display */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMilestone}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="bg-espresso-dark/45 border border-coffee-gold/10 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center"
              >
                {/* Milestone Image */}
                <div className="relative w-full md:w-1/3 h-48 sm:h-56 rounded-lg overflow-hidden border border-coffee-gold/10 shrink-0">
                  <img src={milestones[activeMilestone].image} alt={milestones[activeMilestone].title} className="w-full h-full object-cover" />
                </div>

                {/* Milestone details */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-coffee-gold" />
                    <span className="text-xs font-bold text-coffee-gold uppercase tracking-widest">
                      Year {milestones[activeMilestone].year}
                    </span>
                  </div>
                  <h4 className="font-serif-editorial text-xl sm:text-2xl font-bold text-white tracking-wide leading-snug">
                    {language === "id" ? milestones[activeMilestone].titleId : milestones[activeMilestone].title}
                  </h4>
                  <p className="text-warm-cream/70 text-xs sm:text-sm leading-relaxed">
                    {language === "id" ? milestones[activeMilestone].detailsId : milestones[activeMilestone].details}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
