"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Compass, Leaf, Mountain, Sparkles, Droplets } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OriginStory {
  id: string;
  name: string;
  nameId: string;
  region: string;
  regionId: string;
  altitude: string;
  soil: string;
  soilId: string;
  heritage: string;
  heritageId: string;
  flavor: string;
  flavorId: string;
  farm: string;
  farmId: string;
}

export default function OriginsMap() {
  const { language } = useApp();
  const [selectedOrigin, setSelectedOrigin] = useState("sumatra");

  const origins: Record<string, OriginStory> = {
    sumatra: {
      id: "sumatra",
      name: "Sumatra Aceh Gayo",
      nameId: "Sumatra Aceh Gayo",
      region: "Gayo Highlands, Northern Sumatra",
      regionId: "Dataran Tinggi Gayo, Sumatra Utara",
      altitude: "1,450 - 1,650 MASL",
      soil: "Rich organic volcanic humus, iron-heavy",
      soilId: "Humus vulkanis organik subur, kaya zat besi",
      heritage: "Dating back to Dutch colonial cultivation, Gayo coffee is harvested by the indigenous Gayonese people using ancestral Wet Hulled methods, yielding an extraordinarily heavy syrup feel.",
      heritageId: "Berasal dari budidaya kolonial Belanda, kopi Gayo dipanen oleh masyarakat adat Gayo menggunakan metode Giling Basah leluhur, menghasilkan kekentalan sirup yang luar biasa pekat.",
      flavor: "Intense cedar, heavy baker's cocoa, volcanic peat, black pepper finish.",
      flavorId: "Cedar intens, kakao pekat, gambut vulkanis, rasa akhir lada hitam.",
      farm: "Ribang Gayo Musara Cooperative",
      farmId: "Koperasi Ribang Gayo Musara"
    },
    java: {
      id: "java",
      name: "Java Preanger Classic",
      nameId: "Java Preanger Klasik",
      region: "Mount Malabar ridges, West Java",
      regionId: "Pegunungan Malabar, Jawa Barat",
      altitude: "1,400 - 1,700 MASL",
      soil: "Andosol volcanic ash, rich in minerals",
      soilId: "Abu vulkanik andosol, kaya mineral sulfat",
      heritage: "Known as the historical 'A Cup of Java'. In 1696, the first coffee saplings in Indonesia were planted here, creating the world's most desired commodity in the 18th century.",
      heritageId: "Dikenal sebagai 'Secangkir Jawa' historis. Pada tahun 1696, bibit kopi pertama di Indonesia ditanam di sini, menciptakan komoditas paling diinginkan di dunia pada abad ke-18.",
      flavor: "Sweet tea-like clarity, blooming jasmine aroma, ripe stonefruit sweetness.",
      flavorId: "Kejernihan seperti teh manis, aroma melati mekar, kemanisan persik matang.",
      farm: "Malabar Mountain Estates",
      farmId: "Perkebunan Gunung Malabar"
    },
    bali: {
      id: "bali",
      name: "Bali Kintamani Honey",
      nameId: "Bali Kintamani Honey",
      region: "Mount Batur Caldera, Kintamani, Bali",
      regionId: "Kaldera Gunung Batur, Kintamani, Bali",
      altitude: "1,200 - 1,350 MASL",
      soil: "Young volcanic basaltic rock and citrus loam",
      soilId: "Batuan basal vulkanis muda & tanah kebun jeruk",
      heritage: "Cultivated alongside orange orchards under strict 'Subak Abian' Hindu agricultural philosophies of harmony with nature, Kintamani coffee achieves unparalleled organic citrus sweetness.",
      heritageId: "Ditanam di samping kebun jeruk di bawah filosofi pertanian Hindu 'Subak Abian' yang mengutamakan keselarasan dengan alam, kopi Kintamani menghasilkan rasa jeruk organik tak tertandingi.",
      flavor: "Candied mandarin orange, blooming orange blossom, nectarine glaze finish.",
      flavorId: "Manisan jeruk mandarin, bunga jeruk mekar, rasa akhir nektar manis.",
      farm: "Ulian Organic Subak Cooperative",
      farmId: "Koperasi Subak Organik Ulian"
    },
    sulawesi: {
      id: "sulawesi",
      name: "Sulawesi Toraja Sapan",
      nameId: "Sulawesi Toraja Sapan",
      region: "Mount Sesean slopes, Toraja, Sulawesi",
      regionId: "Lereng Gunung Sesean, Toraja, Sulawesi",
      altitude: "1,600 - 1,800 MASL",
      soil: "Deep mountain clay, ancient iron slate",
      soilId: "Tanah liat pegunungan dalam, serpih besi purba",
      heritage: "Grown in high-altitude micro-climates, Toraja Sapan represents the sacred lineage of coffee gifted during ancestral Torajan 'Rambu Solo' rituals of honor.",
      heritageId: "Ditanam di iklim mikro dataran tinggi ekstrem, Toraja Sapan mewakili silsilah suci kopi yang dihadiahkan selama ritual penghormatan leluhur 'Rambu Solo' Toraja.",
      flavor: "Red apple crisp, velvet dark molasses, sweet cinnamon spice dust.",
      flavorId: "Apel merah renyah, molase gelap beludru, sentuhan manis kayu manis.",
      farm: "Sapan Highlands Smallholder Network",
      farmId: "Jaringan Petani Dataran Tinggi Sapan"
    },
    flores: {
      id: "flores",
      name: "Flores Bajawa Premium",
      nameId: "Flores Bajawa Premium",
      region: "Inerie Volcano slopes, Ngada, Flores",
      regionId: "Lereng Gunung Api Inerie, Ngada, Flores",
      altitude: "1,300 - 1,550 MASL",
      soil: "Volcanic ash rich in potassium and nitrogen",
      soilId: "Abu vulkanik kaya kalium dan nitrogen alami",
      heritage: "Harvested on the beautiful slopes surrounding Mount Inerie, Flores coffee embodies pristine isolation and volcanic soil enrichment, delivering incredibly clean and comforting cocoa structures.",
      heritageId: "Dipanen di lereng indah yang mengelilingi Gunung Inerie, kopi Flores mewujudkan isolasi alam murni dan pengayaan abu vulkanis, menghasilkan struktur kakao yang sangat bersih.",
      flavor: "Buttery milk chocolate, toasted hazelnut crunch, vanilla bean syrup.",
      flavorId: "Cokelat susu mentega, renyah hazelnut panggang, sirup vanila manis.",
      farm: "Ngada Specialty Farmer Federation",
      farmId: "Federasi Petani Specialty Ngada"
    }
  };

  const active = origins[selectedOrigin];

  return (
    <section id="origins" className="py-24 bg-espresso-dark text-warm-cream relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-coffee-gold/5 rounded-full blur-3xl z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[11px] font-bold text-coffee-gold tracking-[0.3em] uppercase block">
            {language === "id" ? "PETA ASAL VOLKANIS" : "TERROIR OF THE ARCHIPELAGO"}
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-none">
            {language === "id" ? "Sabuk Api Kopi Nusantara" : "The Volcanic Ring of Indonesian Coffee"}
          </h2>
          <div className="w-12 h-1 bg-coffee-gold mx-auto mt-4" />
        </div>

        {/* Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Interactive Geographic SVG Map (Indonesian Islands) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* Custom SVG Map Wrapper */}
            <div className="relative w-full max-w-[650px] aspect-[16/9] border border-coffee-gold/15 bg-espresso-black/55 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-2xl flex flex-col justify-center overflow-hidden">
              
              {/* Map Title Tag */}
              <div className="absolute top-4 left-4 bg-espresso-black border border-coffee-gold/20 text-[9px] font-bold tracking-widest text-coffee-gold uppercase px-2.5 py-1 rounded">
                Interactive SVG Terroir Map
              </div>

              {/* The SVG Graphic */}
              <svg viewBox="0 0 1000 450" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
                
                {/* Sumatra Island Shape */}
                <path
                  d="M100,100 L200,150 L280,240 L210,310 L160,260 L80,180 Z"
                  onClick={() => setSelectedOrigin("sumatra")}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedOrigin === "sumatra"
                      ? "fill-coffee-gold/30 stroke-coffee-gold stroke-2"
                      : "fill-espresso-dark stroke-coffee-gold/20 hover:fill-coffee-brown/40 hover:stroke-coffee-gold/50"
                  }`}
                />

                {/* Java Island Shape */}
                <path
                  d="M240,320 L350,335 L440,350 L480,350 L480,360 L420,360 L320,350 L240,335 Z"
                  onClick={() => setSelectedOrigin("java")}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedOrigin === "java"
                      ? "fill-coffee-gold/30 stroke-coffee-gold stroke-2"
                      : "fill-espresso-dark stroke-coffee-gold/20 hover:fill-coffee-brown/40 hover:stroke-coffee-gold/50"
                  }`}
                />

                {/* Bali Island Shape */}
                <path
                  d="M495,350 L515,352 L515,358 L495,356 Z"
                  onClick={() => setSelectedOrigin("bali")}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedOrigin === "bali"
                      ? "fill-coffee-gold/40 stroke-coffee-gold stroke-2"
                      : "fill-espresso-dark stroke-coffee-gold/30 hover:fill-coffee-brown/50 hover:stroke-coffee-gold/60"
                  }`}
                />

                {/* Flores Island Shape (and neighbouring Nusa Tenggara) */}
                <path
                  d="M525,354 L620,356 L620,362 L525,360 Z"
                  onClick={() => setSelectedOrigin("flores")}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedOrigin === "flores"
                      ? "fill-coffee-gold/30 stroke-coffee-gold stroke-2"
                      : "fill-espresso-dark stroke-coffee-gold/20 hover:fill-coffee-brown/40 hover:stroke-coffee-gold/50"
                  }`}
                />

                {/* Sulawesi Island Shape */}
                <path
                  d="M480,180 L520,185 L560,140 L530,195 L590,200 L540,220 L545,280 L505,270 L515,225 L475,220 Z"
                  onClick={() => setSelectedOrigin("sulawesi")}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedOrigin === "sulawesi"
                      ? "fill-coffee-gold/30 stroke-coffee-gold stroke-2"
                      : "fill-espresso-dark stroke-coffee-gold/20 hover:fill-coffee-brown/40 hover:stroke-coffee-gold/50"
                  }`}
                />

                {/* Coordinates and glowing visual pulse hotspots */}
                {/* 1. Sumatra Aceh Gayo */}
                <g className="cursor-pointer" onClick={() => setSelectedOrigin("sumatra")}>
                  <circle cx="130" cy="115" r="14" className="fill-coffee-gold/10 stroke-none animate-pulse-slow" />
                  <circle cx="130" cy="115" r="8" className="fill-coffee-gold/20 stroke-coffee-gold/30 animate-ping" />
                  <circle cx="130" cy="115" r="4.5" className={`transition-all ${selectedOrigin === "sumatra" ? "fill-coffee-gold shadow-md" : "fill-white/80"}`} />
                  <text x="145" y="118" className="fill-white/70 text-[9px] font-bold tracking-widest uppercase">GAYO</text>
                </g>

                {/* 2. West Java Preanger */}
                <g className="cursor-pointer" onClick={() => setSelectedOrigin("java")}>
                  <circle cx="280" cy="328" r="14" className="fill-coffee-gold/10 stroke-none animate-pulse-slow" />
                  <circle cx="280" cy="328" r="8" className="fill-coffee-gold/20 stroke-coffee-gold/30 animate-ping" />
                  <circle cx="280" cy="328" r="4.5" className={`transition-all ${selectedOrigin === "java" ? "fill-coffee-gold" : "fill-white/80"}`} />
                  <text x="250" y="315" className="fill-white/70 text-[9px] font-bold tracking-widest uppercase">PREANGER</text>
                </g>

                {/* 3. Bali Kintamani */}
                <g className="cursor-pointer" onClick={() => setSelectedOrigin("bali")}>
                  <circle cx="505" cy="353" r="14" className="fill-coffee-gold/10 stroke-none animate-pulse-slow" />
                  <circle cx="505" cy="353" r="8" className="fill-coffee-gold/20 stroke-coffee-gold/30 animate-ping" />
                  <circle cx="505" cy="353" r="4.5" className={`transition-all ${selectedOrigin === "bali" ? "fill-coffee-gold" : "fill-white/80"}`} />
                  <text x="500" y="340" className="fill-white/70 text-[9px] font-bold tracking-widest uppercase">BALI</text>
                </g>

                {/* 4. Sulawesi Toraja */}
                <g className="cursor-pointer" onClick={() => setSelectedOrigin("sulawesi")}>
                  <circle cx="515" cy="225" r="14" className="fill-coffee-gold/10 stroke-none animate-pulse-slow" />
                  <circle cx="515" cy="225" r="8" className="fill-coffee-gold/20 stroke-coffee-gold/30 animate-ping" />
                  <circle cx="515" cy="225" r="4.5" className={`transition-all ${selectedOrigin === "sulawesi" ? "fill-coffee-gold" : "fill-white/80"}`} />
                  <text x="530" y="228" className="fill-white/70 text-[9px] font-bold tracking-widest uppercase">TORAJA</text>
                </g>

                {/* 5. Flores Bajawa */}
                <g className="cursor-pointer" onClick={() => setSelectedOrigin("flores")}>
                  <circle cx="575" cy="357" r="14" className="fill-coffee-gold/10 stroke-none animate-pulse-slow" />
                  <circle cx="575" cy="357" r="8" className="fill-coffee-gold/20 stroke-coffee-gold/30 animate-ping" />
                  <circle cx="575" cy="357" r="4.5" className={`transition-all ${selectedOrigin === "flores" ? "fill-coffee-gold" : "fill-white/80"}`} />
                  <text x="570" y="375" className="fill-white/70 text-[9px] font-bold tracking-widest uppercase">FLORES</text>
                </g>
              </svg>

              {/* Map Footer instruction */}
              <div className="text-[10px] text-center text-warm-cream/40 mt-4 leading-none">
                💡 {language === "id" ? "Pilih pulau/titik koordinat menyala untuk membaca narasi sejarah." : "Click glowing coordinate markers or islands to read the terroir legacy."}
              </div>
            </div>
          </div>

          {/* Sourcing Narrative Storyboard Sidebar */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedOrigin}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="bg-espresso-black border border-coffee-gold/15 rounded-xl p-6 sm:p-8 space-y-6 shadow-2xl relative"
              >
                {/* Visual badge */}
                <div className="flex justify-between items-center border-b border-coffee-gold/10 pb-4">
                  <span className="text-[10px] font-bold text-coffee-gold uppercase tracking-[0.2em] flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 animate-spin-slow text-coffee-gold" />
                    {language === "id" ? active.regionId : active.region}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold tracking-wide text-white">
                    {language === "id" ? active.nameId : active.name}
                  </h3>
                  <span className="text-xs font-bold text-coffee-gold bg-coffee-brown/50 border border-coffee-gold/10 px-3 py-1 rounded inline-block">
                    🚜 {language === "id" ? active.farmId : active.farm}
                  </span>
                </div>

                {/* Specs pillars */}
                <div className="grid grid-cols-2 gap-4 border-y border-coffee-gold/10 py-4 text-xs font-bold uppercase tracking-wider text-coffee-gold-light">
                  <div className="flex gap-2">
                    <Mountain className="w-4.5 h-4.5 text-coffee-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white/40 block text-[9px] mb-0.5 leading-none">ELEVATION</span>
                      <span>{active.altitude}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Leaf className="w-4.5 h-4.5 text-coffee-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white/40 block text-[9px] mb-0.5 leading-none">TERROIR SOIL</span>
                      <span className="normal-case font-normal text-[11px] leading-relaxed text-warm-cream/80 block mt-0.5">
                        {language === "id" ? active.soilId : active.soil}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Story block */}
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest block flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-coffee-gold" /> HISTORICAL LEGACY
                  </span>
                  <p className="text-xs sm:text-sm leading-relaxed text-warm-cream/70">
                    {language === "id" ? active.heritageId : active.heritage}
                  </p>
                </div>

                {/* Taste notes summary */}
                <div className="p-4 rounded-lg bg-espresso-dark border border-coffee-gold/5 space-y-2">
                  <span className="text-[10px] font-bold text-coffee-gold uppercase tracking-widest block flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-coffee-gold" /> MOUTHFEEL & CUP PROFILE
                  </span>
                  <p className="text-xs text-white leading-relaxed">
                    {language === "id" ? active.flavorId : active.flavor}
                  </p>
                </div>

                {/* Shop filter connector */}
                <a
                  href="#products"
                  className="block text-center w-full bg-coffee-gold hover:bg-coffee-gold-light text-espresso-black text-xs font-bold uppercase tracking-wider py-3.5 rounded transition-colors"
                >
                  {language === "id" ? `Lihat Kopi ${active.nameId.split(" ")[1]}` : `Explore ${active.name.split(" ")[1]} Beans`}
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
