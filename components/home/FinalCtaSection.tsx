"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const FinalCtaSection: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.0, 1.02]);

  return (
    <section
      ref={containerRef}
      id="kontakt"
      data-theme="dark"
      className="relative z-20 w-full h-[80vh] sm:h-[85vh] min-h-[560px] bg-[#151515] text-white flex items-center justify-center overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background Architectural Image with Subtle Scale Animation */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0 w-full h-full bg-[#151515] will-change-transform"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/56.jpg"
          alt="Pieper Bauunternehmen Bauprojekt"
          className="w-full h-full object-cover opacity-35"
          loading="lazy"
        />
        {/* Restrained solid tint for text readability (NO gradients) */}
        <div className="absolute inset-0 bg-[#151515]/55" />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 text-center flex flex-col items-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-6 sm:mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E52423]" />
          <span className="text-xs font-mono tracking-[0.24em] uppercase text-white/75 font-semibold">
            PIEPER BAUUNTERNEHMEN • LATHEN
          </span>
        </motion.div>

        {/* Headline Revealed Line-by-Line */}
        <h2 id="cta-heading" className="sr-only">
          IHR PROJEKT. UNSERE KOMPETENZ.
        </h2>

        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[clamp(2.8rem,6vw,5.5rem)] font-black uppercase tracking-tight text-white leading-[0.92]"
            >
              IHR PROJEKT.
            </motion.span>
          </div>

          <div className="overflow-hidden">
            <motion.span
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[clamp(2.8rem,6vw,5.5rem)] font-black uppercase tracking-tight text-white/95 leading-[0.92]"
            >
              UNSERE KOMPETENZ.
            </motion.span>
          </div>
        </div>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg text-white/75 font-light max-w-lg mb-10 sm:mb-12 leading-relaxed"
        >
          Gemeinsam schaffen wir Lösungen, die Bestand haben. Sprechen Sie mit unseren Bauleitern und Ingenieuren über Ihr nächstes Vorhaben.
        </motion.p>

        {/* Minimal Rectangular CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <a
            href="mailto:info@pieper-bau.de"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#E52423] text-white font-medium text-xs sm:text-sm tracking-[0.16em] uppercase transition-all duration-300 hover:bg-[#c91b1a]"
          >
            <span>PROJEKT ANFRAGEN</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>

          <a
            href="#projekte"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/30 bg-white/5 backdrop-blur-md text-white font-medium text-xs sm:text-sm tracking-[0.16em] uppercase transition-all duration-300 hover:border-white hover:bg-white/10"
          >
            <span>PROJEKTE ENTDECKEN</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
