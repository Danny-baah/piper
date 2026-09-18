"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PRINCIPLES = [
  {
    number: "01",
    title: "PRÄZISION",
    description:
      "Saubere Planung und präzise Ausführung bilden die Grundlage jedes Bauvorhabens.",
  },
  {
    number: "02",
    title: "HANDWERK",
    description:
      "Erfahrung, Fachwissen und sorgfältige Arbeit schaffen Ergebnisse, die Bestand haben.",
  },
  {
    number: "03",
    title: "BESTÄNDIGKEIT",
    description:
      "Wir denken langfristig und bauen mit Blick auf die Zukunft.",
  },
];

export const ExpertiseSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section
      id="expertise"
      ref={containerRef}
      data-theme="dark"
      className="relative z-20 w-full bg-[#151515] text-[#F5F3EE] pt-20 sm:pt-24 lg:pt-28 pb-20 sm:pb-24 lg:pb-28 overflow-hidden"
      aria-labelledby="expertise-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
        {/* Top Label: Clean red line + label */}
        <div className="flex items-center gap-3.5 mb-12 sm:mb-16 lg:mb-20">
          <span className="h-[1.5px] w-10 sm:w-12 bg-[#E52423] inline-block shrink-0" />
          <span className="text-[11px] sm:text-xs font-mono tracking-[0.2em] uppercase font-semibold text-[#F5F3EE]/70">
            PRÄZISION & EXPERTISE
          </span>
        </div>

        {/* 50/50 Balanced Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* Left Column (Cols 1–6): Massive Authoritative Headline & Anchoring Subline */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2
                id="expertise-heading"
                className="text-[clamp(2.75rem,5.2vw,5.4rem)] font-black uppercase tracking-[-0.04em] text-[#F5F3EE] leading-[0.91] mb-8 sm:mb-10"
              >
                PRÄZISION
                <br />
                IST KEIN
                <br />
                DETAIL.
                <span className="block mt-4 sm:mt-6">
                  SIE IST DER
                  <br />
                  STANDARD.
                  <span className="inline-block w-3 h-3 sm:w-3.5 sm:h-3.5 bg-[#E52423] ml-3 align-baseline" />
                </span>
              </h2>

              <div className="pt-6 border-t border-[#F5F3EE]/15 max-w-lg">
                <p className="text-xs sm:text-sm font-mono tracking-wider uppercase text-[#F5F3EE]/55 leading-relaxed">
                  Monolithischer Massivbau · Millimetergenaue Maßhaltigkeit · Meisterliche Bauleitung in Lathen und im Emsland.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column (Cols 7–12): Three Structured Editorial Principles */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            {PRINCIPLES.map((p, index) => (
              <motion.div
                key={p.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative border-t border-[#F5F3EE]/15 py-6 sm:py-7 lg:py-8 transition-colors duration-300"
              >
                {/* Expanding subtle red accent line on hover */}
                <div className="absolute top-0 left-0 w-0 h-[1.5px] bg-[#E52423] transition-all duration-400 ease-out group-hover:w-full pointer-events-none" />

                {/* Number and Arrow Row */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs sm:text-sm font-mono tracking-widest text-[#F5F3EE]/40 transition-colors duration-300 group-hover:text-[#E52423] font-semibold">
                    {p.number}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-base sm:text-lg font-mono text-[#F5F3EE]/35 transition-all duration-300 ease-out group-hover:text-[#E52423] group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#F5F3EE] mb-2.5 transition-transform duration-300 ease-out group-hover:translate-x-1">
                  {p.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-[#F5F3EE]/65 leading-relaxed max-w-xl transition-colors duration-300 group-hover:text-[#F5F3EE]/90">
                  {p.description}
                </p>
              </motion.div>
            ))}
            <div className="border-t border-[#F5F3EE]/15" />
          </div>
        </div>

        {/* Bottom subtle divider transition */}
        <div className="mt-16 sm:mt-20 lg:mt-24 border-b border-[#F5F3EE]/10" />
      </div>
    </section>
  );
};
