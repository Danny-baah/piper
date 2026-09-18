"use client";

import React, { useImperativeHandle, forwardRef, useRef, useState, useEffect } from "react";

export interface HeroOverlayHandle {
  updateProgress: (progress: number) => void;
}

interface HeroOverlayProps {
  isReducedMotion?: boolean;
}

export const HeroOverlay = forwardRef<HeroOverlayHandle, HeroOverlayProps>(
  ({ isReducedMotion }, ref) => {
    const groupRef = useRef<HTMLDivElement | null>(null);
    const indicatorRef = useRef<HTMLDivElement | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const hasScrolledRef = useRef(false);

    useEffect(() => {
      // Smooth initial reveal on hero load
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 120);
      return () => clearTimeout(timer);
    }, []);

    useImperativeHandle(ref, () => ({
      updateProgress: (progress: number) => {
        if (isReducedMotion) return;

        const group = groupRef.current;
        if (!group) return;

        // As soon as user scrolls, disable CSS transitions for 100% fluid scrub
        if (!hasScrolledRef.current && progress > 0) {
          hasScrolledRef.current = true;
          group.style.transition = "none";
          if (indicatorRef.current) {
            indicatorRef.current.style.transition = "none";
          }
        }

        // Text disappears smoothly within the first 5–10% of hero scroll progress
        // 0% scroll: fully visible
        // 3%: begins fading
        // 7%: mostly gone
        // 9–10%: completely gone (0% opacity, visibility: hidden)
        const fadeEnd = 0.085;

        if (progress <= 0.005) {
          group.style.opacity = "1";
          group.style.transform = "translate3d(0, 0px, 0)";
          group.style.filter = "none";
          group.style.visibility = "visible";
          group.style.pointerEvents = "auto";
        } else if (progress < fadeEnd) {
          const t = progress / fadeEnd;
          const opacity = Math.max(0, 1 - t);
          const translateY = -25 * t;
          const blur = 4 * t;

          group.style.opacity = `${opacity.toFixed(3)}`;
          group.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`;
          group.style.filter = blur > 0.2 ? `blur(${blur.toFixed(1)}px)` : "none";
          group.style.visibility = opacity <= 0.01 ? "hidden" : "visible";
          group.style.pointerEvents = opacity > 0.1 ? "auto" : "none";
        } else {
          // Completely gone for the rest of the scroll journey
          group.style.opacity = "0";
          group.style.transform = "translate3d(0, -25px, 0)";
          group.style.filter = "blur(4px)";
          group.style.visibility = "hidden";
          group.style.pointerEvents = "none";
        }
      },
    }));

    return (
      <div className="absolute inset-0 pointer-events-none z-10 select-none overflow-hidden flex items-center justify-center pt-8 sm:pt-10">
        {/* Subtle architectural vignette for contrast without obscuring footage */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12]/75 via-transparent to-[#0b0d12]/45 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(11,13,18,0.45)_100%)] pointer-events-none" />

        {/* Unified Centered Hero Text Composition */}
        <div
          ref={groupRef}
          className={`relative flex flex-col items-center text-center px-6 max-w-[560px] mx-auto pointer-events-auto will-change-transform ${
            !hasScrolledRef.current
              ? "transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)]"
              : ""
          }`}
          style={{
            opacity: isReducedMotion ? 1 : isLoaded ? 1 : 0,
            transform: isReducedMotion
              ? "none"
              : isLoaded
              ? "translate3d(0, 0px, 0)"
              : "translate3d(0, 20px, 0)",
          }}
        >
          {/* SMALL EYEBROW */}
          <div className="flex items-center gap-2 mb-3 sm:mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E52423]" />
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] font-semibold text-white/80">
              PIEPER BAUUNTERNEHMEN
            </span>
          </div>

          {/* MAIN HEADING (reduced ~22% for restrained elegance) */}
          <h1 className="text-[clamp(1.65rem,3.1vw,2.55rem)] font-extrabold uppercase tracking-tight text-white leading-[1.08] mb-5 sm:mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.65)]">
            BAUEN MIT<br />
            ERFAHRUNG.<br />
            DENKEN FÜR DIE<br />
            <span className="text-white/95">ZUKUNFT.</span>
          </h1>

          {/* SCROLL TO EXPLORE (tightened spacing, refined small instruction) */}
          <div
            ref={indicatorRef}
            className={`flex flex-col items-center gap-1 text-white/50 ${
              !hasScrolledRef.current
                ? "transition-all duration-900 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)]"
                : ""
            }`}
            style={{
              opacity: isReducedMotion ? 1 : isLoaded ? 1 : 0,
              transform: isReducedMotion
                ? "none"
                : isLoaded
                ? "translate3d(0, 0px, 0)"
                : "translate3d(0, 12px, 0)",
            }}
          >
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.24em] uppercase font-medium">
              SCROLLEN ZUM ENTDECKEN
            </span>
            <span
              aria-hidden="true"
              className="text-xs sm:text-sm text-[#E52423] font-bold select-none"
            >
              ↓
            </span>
          </div>
        </div>
      </div>
    );
  }
);

HeroOverlay.displayName = "HeroOverlay";
