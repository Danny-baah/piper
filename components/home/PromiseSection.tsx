"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const PromiseSection: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageX = useTransform(scrollYProgress, [0, 1], ["-12px", "12px"]);

  return (
    <section
      id="versprechen"
      ref={containerRef}
      data-theme="light"
      className="relative z-20 w-full bg-[#F5F3EE] text-[#151515] pt-24 sm:pt-32 lg:pt-36 pb-28 sm:pb-36 lg:pb-40 border-t border-[#151515]/10 overflow-hidden"
      aria-labelledby="promise-heading"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[8vw]">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-8 sm:mb-10">
          <span className="text-[12px] font-mono tracking-[0.16em] uppercase font-bold text-[#151515]">
            04
          </span>
          <span className="w-8 sm:w-12 h-[1.5px] bg-[#E52423]" />
          <span className="text-[11px] sm:text-[12px] font-mono tracking-[0.16em] uppercase font-semibold text-[#151515]">
            UNSER VERSPRECHEN
          </span>
        </div>

        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (Cols 1–6): Headline, Copy & 3 Large Principles */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <motion.h2
                id="promise-heading"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(2.8rem,5vw,5.5rem)] font-extrabold uppercase tracking-[-0.045em] text-[#151515] leading-[0.92] mb-6 sm:mb-8"
              >
                BAUEN MIT<br />
                VERANTWORTUNG.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-lg text-[#666561] font-normal max-w-lg leading-relaxed mb-12 sm:mb-16"
              >
                Als traditionsbewusstes Bauunternehmen aus Lathen übernehmen wir Verantwortung für
                jedes Bauwerk. Höchste Ausführungsqualität, geprüfte Baustoffe und partnerschaftliche
                Verlässlichkeit schaffen Werte, die Generationen überdauern.
              </motion.p>
            </div>

            {/* 3 Large Principles */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-[#151515]/15">
              <div>
                <span className="block text-lg sm:text-xl lg:text-2xl font-black uppercase tracking-tight text-[#151515] mb-1">
                  ZUVERLÄSSIG
                </span>
                <span className="text-xs font-mono text-[#666561] tracking-wider uppercase">
                  Termin- & Budgetsicher
                </span>
              </div>

              <div>
                <span className="block text-lg sm:text-xl lg:text-2xl font-black uppercase tracking-tight text-[#151515] mb-1">
                  PRÄZISE
                </span>
                <span className="text-xs font-mono text-[#666561] tracking-wider uppercase">
                  Meisterliche Ausführung
                </span>
              </div>

              <div>
                <span className="block text-lg sm:text-xl lg:text-2xl font-black uppercase tracking-tight text-[#151515] mb-1">
                  LANGFRISTIG
                </span>
                <span className="text-xs font-mono text-[#666561] tracking-wider uppercase">
                  Nachhaltige Werte
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (Cols 7–12): Large Architectural Construction Image */}
          <div className="lg:col-span-6 h-full">
            <motion.div
              style={{ x: imageX }}
              initial={{ scale: 1.04, opacity: 0 }}
              whileInView={{ scale: 1.0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-[440px] sm:h-[500px] lg:h-[540px] overflow-hidden bg-[#e6e3da] relative"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/promise/promise.webp"
                alt="Verantwortungsvolles Bauen Pieper Bauunternehmen"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-6 left-6 text-left pointer-events-none">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  WERKSTANDORT LATHEN • EMSLAND
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
