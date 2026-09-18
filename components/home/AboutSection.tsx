"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={sectionRef}
      id="ueber-uns"
      data-theme="light"
      className="relative z-20 w-full bg-[#F5F3EE] text-[#151515] pt-24 sm:pt-28 lg:pt-32 pb-24 sm:pb-28 lg:pb-32"
      aria-labelledby="about-heading"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[8vw]">
        {/* ========================================================= */}
        {/* 12-COLUMN EDITORIAL GRID                                  */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start">
          {/* ======================================================= */}
          {/* LEFT ZONE (Columns 1–6): Typography, Details & Image 02 */}
          {/* ======================================================= */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Section Label: 01 / ÜBER PIEPER */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 mb-6 sm:mb-8"
              >
                <span className="text-[12px] font-mono tracking-[0.16em] uppercase font-bold text-[#151515]">
                  01
                </span>
                <span className="w-8 sm:w-12 h-[1.5px] bg-[#E52423]" />
                <span className="text-[11px] sm:text-[12px] font-mono tracking-[0.16em] uppercase font-semibold text-[#151515]">
                  ÜBER PIEPER
                </span>
              </motion.div>

              {/* Main Headline: BAUEN IST MEHR ALS EIN PROJEKT. */}
              <motion.h2
                id="about-heading"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(3.5rem,5.5vw,6.5rem)] font-extrabold uppercase tracking-[-0.05em] text-[#151515] leading-[0.90] mb-6 sm:mb-8"
              >
                BAUEN IST<br />
                MEHR ALS<br />
                EIN PROJEKT.
              </motion.h2>

              {/* Supporting Content (350–420px wide) */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[400px] text-[#666561] text-[15px] sm:text-[16px] leading-[1.65] space-y-3 mb-10 sm:mb-12"
              >
                <p className="text-[#151515] font-semibold text-[16px] sm:text-[17px] leading-[1.5]">
                  Zuverlässiges Handwerk.<br />
                  Präzise Ausführung.<br />
                  Bauen mit Verantwortung.
                </p>
                <p>
                  Pieper Bauunternehmen steht für Erfahrung, Präzision und Qualität in der Umsetzung
                  anspruchsvoller Bauprojekte.
                </p>
              </motion.div>
            </div>

            {/* Mobile Image 01 Placement (Visible on mobile/tablet only) */}
            <div className="lg:hidden w-full h-[52vh] sm:h-[60vh] overflow-hidden bg-[#e6e3da] mb-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/about/about-hero.webp"
                alt="Architektur Pieper Bauunternehmen"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* LOWER LEFT / CENTER ZONE: IMAGE 02 & UNSER ANSPRUCH */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 sm:gap-8 mb-10 lg:mb-12">
              {/* IMAGE 02 (260–300px wide, 280–320px high) */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full sm:w-[260px] lg:w-[280px] h-[280px] sm:h-[310px] overflow-hidden bg-[#e6e3da] shrink-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/about/about-craft.webp"
                  alt="Konstruktion und Fassadendetail"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>

              {/* Secondary Statement: UNSER ANSPRUCH */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[220px] pb-1 sm:pb-3"
              >
                <span className="block text-[11px] font-mono tracking-[0.18em] uppercase font-bold text-[#151515] mb-2">
                  UNSER ANSPRUCH
                </span>
                <p className="text-sm sm:text-[15px] text-[#666561] leading-[1.6] font-normal">
                  Lebensräume bauen.<br />
                  Vertrauen schaffen.
                </p>
              </motion.div>
            </div>

            {/* CTA: MEHR ÜBER UNS → */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href="#kontakt"
                className="group inline-flex items-center gap-3 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase font-bold text-[#151515] transition-colors hover:text-[#E52423] w-fit"
              >
                <span className="relative">
                  MEHR ÜBER UNS
                  <span className="absolute left-0 -bottom-1 w-full h-[1px] bg-[#151515] transition-all duration-300 group-hover:bg-[#E52423] group-hover:h-[1.5px]" />
                </span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
              </a>
            </motion.div>
          </div>

          {/* ======================================================= */}
          {/* RIGHT ZONE (Columns 7–12): Large Architectural Image 01 */}
          {/* ======================================================= */}
          <div className="hidden lg:block lg:col-span-6 h-full pt-12 xl:pt-14">
            <motion.div
              initial={{ opacity: 0, scale: 1.03 }}
              whileInView={{ opacity: 1, scale: 1.0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-[540px] lg:h-[590px] xl:h-[630px] overflow-hidden bg-[#e6e3da]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/about/about-hero.webp"
                alt="Vollendete Architektur Pieper Bauunternehmen"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
