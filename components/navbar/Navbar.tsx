"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { MobileMenu } from "./MobileMenu";

interface NavbarProps {
  heroScrollProgress?: number;
}

const NAV_LINKS = [
  { label: "Unternehmen", href: "#ueber-uns" },
  { label: "Leistungen", href: "#leistungen" },
  { label: "Projekte", href: "#projekte" },
  { label: "Ansatz", href: "#ansatz" },
  { label: "Kontakt", href: "#kontakt" },
];

export const Navbar: React.FC<NavbarProps> = () => {
  const [navbarTheme, setNavbarTheme] = useState<"hero" | "light" | "dark">("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrolled = scrollY > 10;
      setIsScrolled(scrolled);

      // Hero check (pinned container occupies 450vh)
      const heroThreshold = window.innerHeight * 3.4;
      if (scrollY <= heroThreshold) {
        setNavbarTheme("hero");
        return;
      }

      // Check current section under header
      const sampleY = 80;
      const el = document.elementFromPoint(window.innerWidth / 2, sampleY);
      const section = el?.closest("[data-theme]");
      const theme = section?.getAttribute("data-theme");

      if (theme === "dark") {
        setNavbarTheme("dark");
      } else {
        setNavbarTheme("light");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const isHero = navbarTheme === "hero";
  const isLight = navbarTheme === "light";
  const isDark = navbarTheme === "dark";

  // When scrolling on the hero while the video plays, or on light sections: show black "PIEPER" logo
  const isBlackLogo = isLight || (isHero && isScrolled);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ease-out ${
          isHero
            ? "bg-gradient-to-b from-[#0b0d12]/80 via-[#0b0d12]/25 to-transparent py-5 sm:py-6"
            : isLight
            ? "bg-[#F5F3EE]/95 backdrop-blur-md border-b border-[#151515]/10 py-3.5"
            : "bg-[#151515]/95 backdrop-blur-md border-b border-white/10 py-3.5"
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-6 sm:px-12 flex items-center justify-between">
          {/* Brand Logo with seamless crossfade between dark and light modes */}
          <a
            href="#"
            className="relative flex items-center h-8 sm:h-9 w-28 sm:w-32 group transition-transform duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#e52423]"
            aria-label="Pieper Bauunternehmen Startseite"
          >
            {/* White Logo (For Cinematic Hero & Dark Sections) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo-white.png"
              alt="Pieper Bauunternehmen"
              className={`absolute inset-0 h-full w-auto object-contain transition-opacity duration-500 ease-out ${
                isBlackLogo ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            />
            {/* Dark Logo (For Light Sections & when scrolling on hero) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo-transparent.png"
              alt="Pieper Bauunternehmen"
              className={`absolute inset-0 h-full w-auto object-contain transition-opacity duration-500 ease-out ${
                isBlackLogo ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-[12px] lg:text-[13px] tracking-[0.16em] uppercase font-medium transition-colors py-1 group ${
                  isLight
                    ? "text-[#151515]/80 hover:text-[#151515]"
                    : "text-white/80 hover:text-white"
                }`}
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#e52423] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Button & Mobile Trigger */}
          <div className="flex items-center gap-4">
            <a
              href="#kontakt"
              className={`hidden sm:inline-flex items-center gap-2.5 px-5 py-2.5 font-medium text-xs tracking-[0.16em] uppercase transition-all duration-300 group ${
                isLight
                  ? "border border-[#151515]/25 bg-transparent text-[#151515] hover:border-[#151515] hover:bg-[#151515] hover:text-white"
                  : isDark
                  ? "border border-white/25 bg-transparent text-white hover:border-[#E52423] hover:bg-[#E52423]"
                  : "border border-white/20 bg-white/5 text-white hover:border-[#e52423] hover:bg-[#e52423]"
              }`}
            >
              <span>PROJEKT ANFRAGEN</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Architectural Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden flex flex-col justify-center items-end gap-1.5 w-9 h-9 p-1 focus:outline-none focus:ring-2 focus:ring-[#e52423]"
              aria-label="Menü öffnen"
              aria-expanded={mobileMenuOpen}
            >
              <span
                className={`w-6 h-[1.5px] transition-colors duration-300 ${
                  isLight ? "bg-[#151515]" : "bg-white"
                }`}
              />
              <span className="w-4 h-[1.5px] bg-[#e52423] transition-colors duration-300" />
              <span
                className={`w-5 h-[1.5px] transition-colors duration-300 ${
                  isLight ? "bg-[#151515]" : "bg-white"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Architectural Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={NAV_LINKS}
      />
    </>
  );
};
