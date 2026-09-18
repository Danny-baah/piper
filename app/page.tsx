import React from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ExpertiseSection } from "@/components/home/ExpertiseSection";
import { PromiseSection } from "@/components/home/PromiseSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0b0d12] text-white selection:bg-[#e52423] selection:text-white">
      {/* Adaptive Floating Navbar */}
      <Navbar />

      {/* 00. Pinned Scroll-Driven Cinematic Hero */}
      <Hero />

      {/* 01. Architectural Editorial About Section (Light #F5F3EE) */}
      <AboutSection />

      {/* 02. Services / Leistungen Navigator (Light #F5F3EE) */}
      <ServicesSection />

      {/* 03. Projects Gallery / Projekte (Dark #151515, Horizontal Scroll via GSAP) */}
      <ProjectsSection />

      {/* 04. Unser Ansatz / Construction Process (Light #F5F3EE, Progress Line Fill) */}
      <ProcessSection />

      {/* 05. Präzision & Expertise / Typography (Dark #151515, Masked Reveal) */}
      <ExpertiseSection />

      {/* 06. Unser Versprechen / Trust (Light #F5F3EE, Editorial Split) */}
      <PromiseSection />

      {/* 07. Final Cinematic CTA (Dark #151515, Full-Width Architecture) */}
      <FinalCtaSection />

      {/* 08. Architectural Footer (Dark #151515) */}
      <Footer />
    </main>
  );
}
