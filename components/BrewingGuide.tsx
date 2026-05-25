"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Coffee, Thermometer, Clock, Scale, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BrewMethod {
  id: string;
  name: string;
  nameId: string;
  icon: React.ElementType;
  grind: string;
  grindId: string;
  ratio: string;
  temp: string;
  tempId?: string;
  time: string;
  steps: string[];
  stepsId: string[];
}

export default function BrewingGuide() {
  const { language } = useApp();
  const [activeMethod, setActiveMethod] = useState("v60");

  const methods: Record<string, BrewMethod> = {
    v60: {
      id: "v60",
      name: "V60 Pour Over",
      nameId: "V60 Pour Over",
      icon: Coffee,
      grind: "Medium-Fine (like table salt)",
      grindId: "Sedang-Halus (seperti garam dapur)",
      ratio: "15g Coffee / 225g Water (1:15)",
      temp: "91°C - 93°C",
      time: "2m 30s - 3m 00s",
      steps: [
        "Place filter paper in V60 dripper and rinse with hot water to remove paper taste.",
        "Add 15g of fresh ground coffee, level it, and tare your scale.",
        "Pour 45g of water to bloom the grounds. Stir gently and wait 35 seconds to let gases release.",
        "Pour the remaining water in slow concentric circles, avoiding the paper boundary, up to 225g.",
        "Let the water draw down completely. Discard paper and serve in a pre-warmed cup."
      ],
      stepsId: [
        "Masukkan kertas saring ke dalam dripper V60 dan bilas dengan air panas untuk menghilangkan rasa kertas.",
        "Masukkan 15g kopi giling segar, ratakan permukaan, dan atur timbangan Anda ke nol.",
        "Tuang 45g air untuk proses 'blooming'. Aduk perlahan dan tunggu 35 detik agar gas CO2 terlepas.",
        "Tuangkan sisa air dalam lingkaran konsentris lambat, hindari tepi kertas saring, hingga mencapai 225g.",
        "Biarkan air turun sepenuhnya. Buang kertas saring dan sajikan kopi di cangkir hangat."
      ]
    },
    espresso: {
      id: "espresso",
      name: "Premium Espresso",
      nameId: "Espresso Premium",
      icon: Compass,
      grind: "Fine (powdery, slightly sandy)",
      grindId: "Halus (seperti bubuk tepung)",
      ratio: "18g Coffee in / 36g Liquid out (1:2)",
      temp: "92°C - 94°C",
      time: "25s - 30s",
      steps: [
        "Thoroughly clean and dry the portafilter basket before grinding.",
        "Dose 18g of finely ground specialty beans. Distribute evenly to avoid channeling.",
        "Tamp firmly with perpendicular pressure to ensure a flat, compacted bed.",
        "Lock portafilter into the group head and initiate extraction immediately.",
        "Target a yield of 36g of rich, viscous espresso with thick golden crema within 28 seconds."
      ],
      stepsId: [
        "Bersihkan dan keringkan wadah portafilter sepenuhnya sebelum menggiling kopi.",
        "Timbang 18g kopi giling halus. Distribusikan secara merata untuk menghindari channeling (retakan).",
        "Padatkan (tamp) secara lurus dengan tekanan merata untuk memastikan permukaan kopi rata.",
        "Kunci portafilter ke group head mesin espresso dan segera mulai ekstraksi air.",
        "Targetkan hasil 36g espresso kental dengan crema emas tebal dalam waktu sekitar 28 detik."
      ]
    },
    frenchpress: {
      id: "frenchpress",
      name: "French Press",
      nameId: "French Press",
      icon: Clock,
      grind: "Coarse (like sea salt crystals)",
      grindId: "Kasar (seperti kristal garam laut)",
      ratio: "20g Coffee / 320g Water (1:16)",
      temp: "94°C - 96°C",
      time: "4m 00s - 5m 00s",
      steps: [
        "Warm the French Press carafe with hot water, then discard the warming water.",
        "Add 20g of coarse ground coffee to the carafe and level the bed.",
        "Pour 320g of hot water (95°C) saturating all grounds completely.",
        "Place the lid on top without plunging, and let the slurry steep for exactly 4 minutes.",
        "Break the crust gently with a spoon, plunge slowly with stable pressure, and decant immediately."
      ],
      stepsId: [
        "Hangatkan teko French Press dengan air panas, lalu buang air penghangat tersebut.",
        "Masukkan 20g kopi giling kasar ke dalam teko dan ratakan permukaan kopi.",
        "Tuangkan 320g air panas (95°C), basahi seluruh bubuk kopi secara merata.",
        "Pasang tutup teko di bagian atas tanpa menekan plunger, biarkan menyeduh selama tepat 4 menit.",
        "Pecahkan lapisan kerak kopi di atas perlahan dengan sendok, tekan plunger secara perlahan, lalu tuang."
      ]
    },
    mokapot: {
      id: "mokapot",
      name: "Moka Pot (Stovetop)",
      nameId: "Moka Pot (Kompor)",
      icon: Scale,
      grind: "Medium-Fine (sandy)",
      grindId: "Sedang-Halus (seperti pasir)",
      ratio: "15g Coffee / 150g Water (1:10)",
      temp: "Pre-heated near boiling water",
      tempId: "Air panas mendidih di bagian dasar",
      time: "3m 00s - 4m 00s",
      steps: [
        "Fill the bottom chamber with pre-heated boiling water up to the safety valve.",
        "Insert the filter basket, fill with fresh coffee without tamping, and level the top.",
        "Assemble the chambers firmly using oven mitts to avoid burns.",
        "Place on medium-low heat. Keep lid open to monitor the extraction flow.",
        "As soon as the stream turns blonde and begins to sputter, immediately submerge base in cold water to stop brewing."
      ],
      stepsId: [
        "Isi tangki bagian bawah dengan air mendidih panas hingga tepat di bawah katup pengaman.",
        "Masukkan keranjang saringan, isi dengan kopi tanpa ditekan, lalu ratakan permukaannya.",
        "Pasang tangki bagian atas secara erat dengan alas bawah menggunakan pelindung kain antipanas.",
        "Letakkan di atas kompor dengan api sedang-kecil. Biarkan tutup atas terbuka untuk memantau aliran.",
        "Begitu cairan kopi berubah warna menjadi kuning terang dan mulai berbuih berisik, segera siram bawah wadah dengan air dingin."
      ]
    }
  };

  const active = methods[activeMethod];

  return (
    <section id="brewing" className="py-24 bg-espresso-black text-warm-cream relative overflow-hidden">
      {/* Background radial overlays */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-coffee-gold/5 rounded-full blur-3xl z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[11px] font-bold text-coffee-gold tracking-[0.3em] uppercase block">
            {language === "id" ? "AKADEMI MENYEDUH BKN" : "BKN BREWING ACADEMY"}
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-none">
            {language === "id" ? "Seni Ekstraksi Rasa Sempurna" : "The Ritual of Perfect Extraction"}
          </h2>
          <div className="w-12 h-1 bg-coffee-gold mx-auto mt-4" />
        </div>

        {/* Tab Selection Row */}
        <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto mb-12">
          {Object.values(methods).map((met) => (
            <button
              key={met.id}
              onClick={() => setActiveMethod(met.id)}
              className={`px-5 py-3 rounded text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                activeMethod === met.id
                  ? "bg-coffee-gold text-espresso-black shadow-lg shadow-coffee-gold/15"
                  : "bg-espresso-dark hover:bg-espresso-dark/80 text-coffee-gold-light border border-coffee-gold/10 hover:border-coffee-gold/25"
              }`}
            >
              {language === "id" ? met.nameId : met.name}
            </button>
          ))}
        </div>

        {/* Dynamic Display Details */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMethod}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch"
            >
              {/* Metrics Panel Column (4 columns) */}
              <div className="md:col-span-5 bg-espresso-dark border border-coffee-gold/15 rounded-xl p-6 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="text-[10px] font-bold text-coffee-gold tracking-widest uppercase block border-b border-coffee-gold/10 pb-2">
                    Brew Specifications
                  </span>
                  <h3 className="font-serif-editorial text-xl font-bold text-white tracking-wide">
                    {language === "id" ? active.nameId : active.name}
                  </h3>
                </div>

                {/* Technical Icons Grid */}
                <div className="space-y-4 flex-1 pt-4">
                  {/* Grind Size */}
                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-full border border-coffee-gold/20 flex items-center justify-center text-coffee-gold">
                      <Coffee className="w-4.5 h-4.5" />
                    </div>
                    <div className="text-xs">
                      <span className="text-white/40 block text-[9px] mb-0.5 leading-none">GRIND PROFILE</span>
                      <span className="font-bold">{language === "id" ? active.grindId : active.grind}</span>
                    </div>
                  </div>

                  {/* Ratio */}
                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-full border border-coffee-gold/20 flex items-center justify-center text-coffee-gold">
                      <Scale className="w-4.5 h-4.5" />
                    </div>
                    <div className="text-xs">
                      <span className="text-white/40 block text-[9px] mb-0.5 leading-none">BREW RATIO</span>
                      <span className="font-bold">{active.ratio}</span>
                    </div>
                  </div>

                  {/* Temperature */}
                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-full border border-coffee-gold/20 flex items-center justify-center text-coffee-gold">
                      <Thermometer className="w-4.5 h-4.5" />
                    </div>
                    <div className="text-xs">
                      <span className="text-white/40 block text-[9px] mb-0.5 leading-none">WATER TEMP</span>
                      <span className="font-bold">{activeMethod === "mokapot" && language === "id" ? active.tempId : active.temp}</span>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-full border border-coffee-gold/20 flex items-center justify-center text-coffee-gold">
                      <Clock className="w-4.5 h-4.5" />
                    </div>
                    <div className="text-xs">
                      <span className="text-white/40 block text-[9px] mb-0.5 leading-none">TARGET TIME</span>
                      <span className="font-bold">{active.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Steps Panel Column (7 columns) */}
              <div className="md:col-span-7 bg-espresso-dark/45 border border-coffee-gold/10 rounded-xl p-6 sm:p-8 space-y-6">
                <span className="text-[10px] font-bold text-coffee-gold tracking-widest uppercase block border-b border-coffee-gold/10 pb-2">
                  Step-by-Step Protocol
                </span>

                <div className="space-y-5">
                  {(language === "id" ? active.stepsId : active.steps).map((step, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full border border-coffee-gold/30 flex items-center justify-center text-coffee-gold bg-espresso-black text-[10px] font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed text-warm-cream/80 font-medium">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
