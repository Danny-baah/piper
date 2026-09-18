"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Stage {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

const STAGES: Stage[] = [
  {
    number: "01",
    title: "PLANUNG",
    subtitle: "KONZEPTION & STATIK",
    description:
      "Umfassende Voruntersuchung, statische Berechnung und detaillierte Werkplanung für maximale Budgetsicherheit und reibungslose Abläufe.",
  },
  {
    number: "02",
    title: "VORBEREITUNG",
    subtitle: "GRÜNDUNG & BODEN",
    description:
      "Präziser Bodenaushub, tragfähige Gründungssohle und millimetergenaue Schalungsarbeiten als unerschütterliche Basis des Bauwerks.",
  },
  {
    number: "03",
    title: "UMSETZUNG",
    subtitle: "ROHBAU & MEISTERHANDWERK",
    description:
      "Monolithischer Stahlbetonbau, tragendes Mauerwerk und zügige Baustellenlogistik unter ständiger meisterlicher Bauleitung.",
  },
  {
    number: "04",
    title: "FERTIGSTELLUNG",
    subtitle: "AUSBAU & ÜBERGABE",
    description:
      "Schlüsselfertige Montage, lückenlose Qualitätskontrolle und termingerechte Übergabe an den Auftraggeber.",
  },
];

export const ProcessSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Scale the red progress fill from 0 to 1
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="ansatz"
      ref={containerRef}
      data-theme="light"
      className="relative z-20 w-full bg-[#F5F3EE] text-[#151515] pt-24 sm:pt-32 lg:pt-36 pb-28 sm:pb-36 lg:pb-40 border-t border-[#151515]/10"
      aria-labelledby="process-heading"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[8vw]">
        {/* Section Marker */}
        <div className="flex items-center gap-3 mb-8 sm:mb-10">
          <span className="w-8 sm:w-12 h-[1.5px] bg-[#E52423]" />
          <span className="text-[11px] sm:text-[12px] font-mono tracking-[0.16em] uppercase font-semibold text-[#151515]">
            UNSER ANSATZ
          </span>
        </div>

        {/* Large Headline & Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-20 sm:mb-28">
          <div className="lg:col-span-7">
            <h2
              id="process-heading"
              className="text-[clamp(2.8rem,5vw,5.5rem)] font-extrabold uppercase tracking-[-0.045em] text-[#151515] leading-[0.92]"
            >
              VON DER IDEE<br />
              BIS ZUR<br />
              UMSETZUNG.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pl-4 pt-2">
            <p className="max-w-md text-base sm:text-lg text-[#666561] font-normal leading-relaxed">
              Strukturierte Prozesse, transparente Meilensteine und höchste Ingenieurdisziplin garantieren
              den planmäßigen Projekterfolg.
            </p>
          </div>
        </div>

        {/* Vertical Timeline Stages */}
        <div className="relative max-w-4xl mx-auto pl-8 sm:pl-16">
          {/* Background Neutral Track */}
          <div className="absolute left-0 sm:left-4 top-4 bottom-4 w-[2px] bg-[#151515]/15" />

          {/* Active Red Progress Line Fill */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-0 sm:left-4 top-4 w-[2px] bg-[#E52423] origin-top"
          />

          {/* 4 Stages */}
          <div className="flex flex-col space-y-16 sm:space-y-24">
            {STAGES.map((stage) => (
              <div key={stage.number} className="relative flex flex-col items-start group">
                {/* Milestone Node on Line */}
                <div className="absolute -left-[37px] sm:-left-[53px] top-1.5 w-3 h-3 bg-[#F5F3EE] border-2 border-[#151515] group-hover:border-[#E52423] group-hover:bg-[#E52423] transition-colors duration-300" />

                {/* Content */}
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-sm font-mono text-[#E52423] tracking-widest font-bold">
                    {stage.number}
                  </span>
                  <span className="text-[11px] font-mono tracking-widest uppercase text-[#666561]">
                    {stage.subtitle}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#151515] mb-3">
                  {stage.title}
                </h3>

                <p className="text-sm sm:text-base text-[#666561] font-normal max-w-xl leading-relaxed">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
