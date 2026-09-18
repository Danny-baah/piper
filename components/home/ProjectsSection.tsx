"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProjectItem {
  number: string;
  title: string;
  category: string;
  location: string;
  image: string;
}

const PROJECTS: ProjectItem[] = [
  {
    number: "01",
    title: "GEWERBEZENTRUM EMSLAND",
    category: "HOCHBAU & GEWERBEBAU",
    location: "LATHEN",
    image: "/assets/projects/project-01.webp",
  },
  {
    number: "02",
    title: "VERWALTUNGSBAU NORD",
    category: "SCHLÜSSELFERTIGER MASSIVBAU",
    location: "LATHEN",
    image: "/assets/projects/project-02.webp",
  },
  {
    number: "03",
    title: "LOGISTIKZENTRUM WEST",
    category: "INDUSTRIEBAU & STATIK",
    location: "EMSLAND",
    image: "/assets/projects/project-03.webp",
  },
  {
    number: "04",
    title: "GESCHÄFTSGEBÄUDE FORUM",
    category: "BETON- & FASSADENBAU",
    location: "LATHEN",
    image: "/assets/projects/project-04.webp",
  },
];

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="projekte"
      data-theme="dark"
      className="relative z-20 w-full bg-[#151515] text-[#F5F3EE] pt-28 sm:pt-36 pb-28 sm:pb-36"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[8vw]">
        {/* Top section: label + large headline */}
        <div className="mb-14 sm:mb-20 lg:mb-24">
          <p className="text-xs sm:text-[13px] font-mono tracking-[0.2em] uppercase text-[#F5F3EE]/50 mb-6 sm:mb-8">
            03 / PROJEKTE
          </p>

          <h2
            id="projects-heading"
            className="text-[clamp(2.75rem,5.5vw,5.5rem)] font-extrabold uppercase tracking-[-0.04em] text-[#F5F3EE] leading-[0.92]"
          >
            GEBAUT,
            <br />
            UM ZU BLEIBEN.
          </h2>
        </div>

        {/* Responsive 2-column Editorial Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 sm:gap-x-10 lg:gap-x-12 gap-y-14 sm:gap-y-18 lg:gap-y-20">
          {PROJECTS.map((project, index) => (
            <motion.article
              key={project.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.65,
                delay: index * 0.1,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="group cursor-pointer flex flex-col"
            >
              {/* Architectural Image Container */}
              <div className="w-full aspect-[4/3] overflow-hidden bg-[#1f1f1f] relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={`${project.title} - ${project.category} in ${project.location}`}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
                  loading="lazy"
                />
                {/* Subtle dark overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />
              </div>

              {/* Minimal Project Information directly beneath image */}
              <div className="mt-5 sm:mt-6 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm font-mono tracking-widest text-[#F5F3EE]/40 transition-colors duration-400 group-hover:text-[#E52423]">
                    {project.number}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-base sm:text-lg text-[#F5F3EE]/35 transition-all duration-400 ease-out group-hover:text-[#E52423] group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold uppercase tracking-[-0.02em] text-[#F5F3EE] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 mb-2">
                  {project.title}
                </h3>

                <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono tracking-[0.14em] uppercase text-[#F5F3EE]/50">
                  <span>{project.category}</span>
                  <span className="text-[#E52423]">•</span>
                  <span>{project.location}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Section Transition / Understated Text Link */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-[#F5F3EE]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-[11px] sm:text-xs font-mono tracking-[0.18em] text-[#F5F3EE]/40 uppercase">
            AUSGEWÄHLTE BAUVORHABEN 2020 – 2026
          </span>
          <a
            href="#kontakt"
            className="group inline-flex items-center gap-3 text-xs sm:text-sm font-mono tracking-[0.16em] uppercase text-[#F5F3EE] hover:text-[#E52423] transition-colors duration-300"
          >
            <span>ALLE PROJEKTE</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-300 ease-out group-hover:translate-x-1.5"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};
