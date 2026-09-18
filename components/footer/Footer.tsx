"use client";

import React from "react";
import { motion } from "framer-motion";

export const Footer: React.FC = () => {
  return (
    <footer
      data-theme="dark"
      className="relative z-20 w-full bg-[#151515] text-[#F5F3EE] pt-20 sm:pt-28 pb-14 sm:pb-20 border-t border-[#F5F3EE]/10 overflow-hidden"
      role="contentinfo"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[8vw]">
        {/* Top Area: Brand & Statement */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-20">
          <div>
            <span className="text-xs sm:text-sm font-mono tracking-[0.24em] uppercase text-[#E52423] font-bold block mb-4">
              PIEPER BAUUNTERNEHMEN
            </span>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(2.8rem,6vw,6rem)] font-black uppercase tracking-tight text-[#F5F3EE] leading-[0.92]"
              >
                BAUEN,<br />
                WAS BLEIBT.
              </motion.h2>
            </div>
          </div>

          <div className="max-w-xs lg:text-right">
            <p className="text-xs sm:text-sm font-mono tracking-widest text-[#F5F3EE]/50 uppercase">
              STANDORT LATHEN • EMSLAND
            </p>
            <p className="text-xs sm:text-sm font-mono tracking-widest text-[#F5F3EE]/50 uppercase mt-1">
              NIEDERSACHSEN • DEUTSCHLAND
            </p>
          </div>
        </div>

        {/* Animated Divider Line */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="h-[1px] bg-[#F5F3EE]/15 mb-14 sm:mb-16"
        />

        {/* 4-Column Directory Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 mb-16 sm:mb-24">
          {/* Column 1: UNTERNEHMEN */}
          <div className="flex flex-col space-y-3">
            <span className="text-xs font-mono tracking-[0.2em] uppercase font-bold text-[#E52423] mb-2">
              UNTERNEHMEN
            </span>
            <a href="#ueber-uns" className="text-sm text-[#F5F3EE]/70 hover:text-white transition-colors">
              Über uns
            </a>
            <a href="#karriere" className="text-sm text-[#F5F3EE]/70 hover:text-white transition-colors">
              Karriere
            </a>
          </div>

          {/* Column 2: LEISTUNGEN */}
          <div className="flex flex-col space-y-3">
            <span className="text-xs font-mono tracking-[0.2em] uppercase font-bold text-[#E52423] mb-2">
              LEISTUNGEN
            </span>
            <a href="#leistungen" className="text-sm text-[#F5F3EE]/70 hover:text-white transition-colors">
              Hochbau
            </a>
            <a href="#leistungen" className="text-sm text-[#F5F3EE]/70 hover:text-white transition-colors">
              Maurerarbeiten
            </a>
            <a href="#leistungen" className="text-sm text-[#F5F3EE]/70 hover:text-white transition-colors">
              Betonarbeiten
            </a>
            <a href="#leistungen" className="text-sm text-[#F5F3EE]/70 hover:text-white transition-colors">
              Erdarbeiten
            </a>
            <a href="#leistungen" className="text-sm text-[#F5F3EE]/70 hover:text-white transition-colors">
              Sanierung
            </a>
          </div>

          {/* Column 3: PROJEKTE */}
          <div className="flex flex-col space-y-3">
            <span className="text-xs font-mono tracking-[0.2em] uppercase font-bold text-[#E52423] mb-2">
              PROJEKTE
            </span>
            <a href="#projekte" className="text-sm text-[#F5F3EE]/70 hover:text-white transition-colors">
              Projekte
            </a>
            <a href="#kontakt" className="text-sm text-[#F5F3EE]/70 hover:text-white transition-colors">
              Kontakt
            </a>
          </div>

          {/* Column 4: KONTAKT (Verified Facts Only) */}
          <div className="flex flex-col space-y-3">
            <span className="text-xs font-mono tracking-[0.2em] uppercase font-bold text-[#E52423] mb-2">
              STANDORT
            </span>
            <span className="text-sm text-[#F5F3EE]/70">Lathen</span>
            <span className="text-sm text-[#F5F3EE]/70">Emsland, Deutschland</span>
          </div>
        </div>

        {/* Bottom Bar with Final Pieper Red Line Accent */}
        <div className="pt-8 border-t border-[#F5F3EE]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#F5F3EE]/50">
          <div className="flex items-center gap-6">
            <a href="#impressum" className="hover:text-white transition-colors">
              Impressum
            </a>
            <a href="#datenschutz" className="hover:text-white transition-colors">
              Datenschutz
            </a>
          </div>
          <div>© {new Date().getFullYear()} PIEPER BAUUNTERNEHMEN. ALLE RECHTE VORBEHALTEN.</div>
        </div>

        {/* Final Thin Pieper Red Rule Accent */}
        <div className="mt-6 w-16 h-[2px] bg-[#E52423]" />
      </div>
    </footer>
  );
};
