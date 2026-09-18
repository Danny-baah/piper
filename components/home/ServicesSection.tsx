"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ServiceItem {
  number: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    number: "01",
    title: "HOCHBAU",
    category: "Schlüsselfertig & Rohbau",
    image: "/assets/services/service-01.webp",
    description: "Komplexe Hochbauvorhaben vom Fundament bis zum Dach.",
  },
  {
    number: "02",
    title: "MAURERARBEITEN",
    category: "Meisterhandwerk",
    image: "/assets/services/service-02.webp",
    description: "Traditionelle Verblend- und Hintermauerarbeiten mit höchster Maßgenauigkeit.",
  },
  {
    number: "03",
    title: "BETONARBEITEN",
    category: "Stahlbetonbau",
    image: "/assets/services/service-03.webp",
    description: "Monolithische Bauteile, Bodenplatten und tragende Deckenkonstruktionen.",
  },
  {
    number: "04",
    title: "ERDARBEITEN",
    category: "Baugrund & Erschließung",
    image: "/assets/services/service-04.webp",
    description: "Präziser Bodenaushub, Planierung und statische Baugrundvorbereitung.",
  },
  {
    number: "05",
    title: "SANIERUNG",
    category: "Bauen im Bestand",
    image: "/assets/services/service-05.webp",
    description: "Werterhaltende Modernisierung, energetische Optimierung und Umbau.",
  },
  {
    number: "06",
    title: "GEWERBEBAU",
    category: "Büro- & Geschäftsbauten",
    image: "/assets/services/service-06.webp",
    description: "Funktionale, architektonisch anspruchsvolle Gewerbeflächen im Emsland.",
  },
  {
    number: "07",
    title: "INDUSTRIEBAU",
    category: "Hallen- & Großprojekte",
    image: "/assets/services/service-07.webp",
    description: "Weitgespannte Tragwerke und produktionsgerechte Industrieinfrastruktur.",
  },
];

export const ServicesSection: React.FC = () => {
  const [activeService, setActiveService] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <section
      id="leistungen"
      data-theme="light"
      className="relative z-20 w-full bg-[#F5F3EE] text-[#151515] pt-24 sm:pt-32 lg:pt-36 pb-28 sm:pb-36 lg:pb-40 border-t border-[#151515]/10"
      aria-labelledby="services-heading"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[8vw]">
        {/* Top Area */}
        <div className="flex items-center gap-3 mb-8 sm:mb-10">
          <span className="text-[12px] font-mono tracking-[0.16em] uppercase font-bold text-[#151515]">
            02
          </span>
          <span className="w-8 sm:w-12 h-[1.5px] bg-[#E52423]" />
          <span className="text-[11px] sm:text-[12px] font-mono tracking-[0.16em] uppercase font-semibold text-[#151515]">
            LEISTUNGEN
          </span>
        </div>

        {/* Large Headline */}
        <div className="mb-16 sm:mb-20 lg:mb-24 max-w-4xl">
          <h2
            id="services-heading"
            className="text-[clamp(2.8rem,5vw,5.5rem)] font-extrabold uppercase tracking-[-0.045em] text-[#151515] leading-[0.92]"
          >
            WAS WIR BAUEN,<br />
            SCHAFFT BESTAND.
          </h2>
        </div>

        {/* Main Grid: Left Service Rows, Right Floating Architectural Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: 7 Editorial Horizontal Rows (Cols 1–7) */}
          <div className="lg:col-span-7 flex flex-col">
            {SERVICES.map((service, index) => {
              const isActive = activeService === index;

              return (
                <div
                  key={service.number}
                  onMouseEnter={() => {
                    setActiveService(index);
                    setIsHovered(true);
                  }}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={() => setActiveService(index)}
                  className="group relative cursor-pointer py-6 sm:py-7 border-b border-[#151515]/15 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    {/* Number & Service Name */}
                    <div className="flex items-baseline gap-6 sm:gap-10">
                      <span
                        className={`text-sm sm:text-base font-mono tracking-widest font-bold transition-colors duration-300 ${
                          isActive && isHovered ? "text-[#E52423]" : "text-[#151515]/60"
                        }`}
                      >
                        {service.number}
                      </span>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-[#151515] transition-transform duration-300 ease-out group-hover:translate-x-2">
                        {service.title}
                      </h3>
                    </div>

                    {/* Category Label & Arrow */}
                    <div className="flex items-center gap-4">
                      <span className="hidden md:inline-block text-xs font-mono tracking-widest uppercase text-[#666561]">
                        {service.category}
                      </span>
                      <ArrowUpRight
                        className={`w-5 h-5 text-[#151515]/40 transition-all duration-300 ${
                          isActive && isHovered
                            ? "text-[#E52423] translate-x-1 -translate-y-1"
                            : "group-hover:text-[#151515] group-hover:translate-x-1 group-hover:-translate-y-1"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Expanding Thin Red Accent Line on Hover */}
                  <div
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#E52423] transition-all duration-300 ease-out ${
                      isActive && isHovered ? "w-full" : "w-0"
                    }`}
                  />

                  {/* Mobile Preview Image (Integrated below row on mobile) */}
                  <div className="lg:hidden mt-4 pt-2">
                    {isActive && (
                      <div className="w-full h-[220px] overflow-hidden bg-[#e6e3da] animate-in fade-in duration-300">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Floating Architectural Image Preview on Desktop (Cols 8–12) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-36">
            <div className="w-full h-[460px] xl:h-[500px] overflow-hidden bg-[#e6e3da] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={SERVICES[activeService].number}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={SERVICES[activeService].image}
                    alt={SERVICES[activeService].title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Architectural metadata overlay */}
                  <div className="absolute top-6 right-6 text-right pointer-events-none">
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      {SERVICES[activeService].category}
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                    <p className="text-xs font-mono uppercase tracking-[0.16em] text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      {SERVICES[activeService].description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Architectural Footnote */}
            <div className="mt-4 flex items-center justify-between text-[11px] font-mono tracking-widest text-[#666561] uppercase">
              <span>PIEPER LEISTUNGSSPEKTRUM</span>
              <span>LATHEN / EMSLAND</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
