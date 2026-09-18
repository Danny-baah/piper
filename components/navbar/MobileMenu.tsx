"use client";

import React, { useEffect } from "react";
import { ArrowUpRight, X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { label: string; href: string }[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navLinks }) => {
  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0b0d12]/98 backdrop-blur-2xl text-white p-8 sm:p-12 animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Hauptmenü"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-white.png"
            alt="Pieper Bauunternehmen Logo"
            className="h-8 w-auto object-contain"
          />
        </div>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#e52423]"
          aria-label="Menü schließen"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col space-y-6 my-auto py-8">
        {navLinks.map((link, idx) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="group flex items-baseline justify-between text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white/90 hover:text-white transition-colors"
          >
            <span className="flex items-baseline gap-4">
              <span className="text-xs sm:text-sm font-mono text-[#e52423]">0{idx + 1}</span>
              <span>{link.label}</span>
            </span>
            <ArrowUpRight className="w-6 h-6 text-white/40 group-hover:text-[#e52423] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </a>
        ))}
      </nav>

      {/* Bottom Area */}
      <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <p className="text-xs font-mono tracking-widest text-white/50 uppercase">Pieper Bauunternehmen</p>
          <p className="text-sm text-white/80 mt-1">Burgstraße 36 • 49762 Lathen</p>
        </div>

        <a
          href="#kontakt"
          onClick={onClose}
          className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-[#e52423] text-white font-medium text-xs tracking-widest uppercase hover:bg-[#c91b1a] transition-colors"
        >
          <span>PROJEKT ANFRAGEN</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
