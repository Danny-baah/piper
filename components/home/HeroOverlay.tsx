"use client";

import React, { useImperativeHandle, forwardRef, useRef, useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

export interface HeroOverlayHandle {
  updateProgress: (progress: number) => void;
}

interface HeroOverlayProps {
  isReducedMotion?: boolean;
}

function clamp(val: number, min = 0, max = 1): number {
  return Math.max(min, Math.min(max, val));
}

export const HeroOverlay = forwardRef<HeroOverlayHandle, HeroOverlayProps>(
  ({ isReducedMotion }, ref) => {
    // State 1: Intro Group
    const groupRef = useRef<HTMLDivElement | null>(null);
    const indicatorRef = useRef<HTMLDivElement | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const hasScrolledRef = useRef(false);

    // Storytelling Milestones during video playback
    const beat1Ref = useRef<HTMLDivElement | null>(null);
    const beat2Ref = useRef<HTMLDivElement | null>(null);

    // State 2: Final Hero Message
    const finalStateRef = useRef<HTMLDivElement | null>(null);
    const finalTagRef = useRef<HTMLDivElement | null>(null);
    const finalLine1Ref = useRef<HTMLSpanElement | null>(null);
    const finalLine2Ref = useRef<HTMLSpanElement | null>(null);
    const finalSubtextRef = useRef<HTMLParagraphElement | null>(null);
    const finalCtaRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      // Smooth initial reveal on hero load for State 1
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 120);
      return () => clearTimeout(timer);
    }, []);

    useImperativeHandle(ref, () => ({
      updateProgress: (progress: number) => {
        if (isReducedMotion) return;

        // ----------------------------------------------------
        // STATE 1: INTRO COMPOSITION (0% to ~8.5% scroll)
        // ----------------------------------------------------
        const group = groupRef.current;
        if (group) {
          if (!hasScrolledRef.current && progress > 0) {
            hasScrolledRef.current = true;
            group.style.transition = "none";
            if (indicatorRef.current) {
              indicatorRef.current.style.transition = "none";
            }
          }

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
            // Completely gone for the rest of the sequence
            group.style.opacity = "0";
            group.style.transform = "translate3d(0, -25px, 0)";
            group.style.filter = "blur(4px)";
            group.style.visibility = "hidden";
            group.style.pointerEvents = "none";
          }
        }

        // ----------------------------------------------------
        // STORY MILESTONE 1 (LEFT): Foundation & Earthworks (0.14 to 0.41)
        // ----------------------------------------------------
        const beat1 = beat1Ref.current;
        if (beat1) {
          if (progress < 0.13 || progress > 0.42) {
            beat1.style.opacity = "0";
            beat1.style.visibility = "hidden";
            beat1.style.transform = "translate3d(-40px, 0, 0)";
          } else if (progress >= 0.13 && progress < 0.21) {
            // Enter smoothly from left
            const t = clamp((progress - 0.13) / 0.08);
            const x = -40 * (1 - t);
            beat1.style.visibility = "visible";
            beat1.style.opacity = `${t.toFixed(3)}`;
            beat1.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;
            beat1.style.filter = t < 0.8 ? `blur(${(3 * (1 - t)).toFixed(1)}px)` : "none";
          } else if (progress >= 0.21 && progress <= 0.33) {
            // Hold completely stable and readable
            beat1.style.visibility = "visible";
            beat1.style.opacity = "1";
            beat1.style.transform = "translate3d(0, 0, 0)";
            beat1.style.filter = "none";
          } else {
            // Softly drift upward and fade out
            const t = clamp((progress - 0.33) / 0.09);
            const y = -24 * t;
            const op = Math.max(0, 1 - t);
            beat1.style.visibility = op <= 0.01 ? "hidden" : "visible";
            beat1.style.opacity = `${op.toFixed(3)}`;
            beat1.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
            beat1.style.filter = t > 0.3 ? `blur(${(3 * t).toFixed(1)}px)` : "none";
          }
        }

        // ----------------------------------------------------
        // STORY MILESTONE 2 (RIGHT): Rohbau & Superstructure (0.44 to 0.74)
        // ----------------------------------------------------
        const beat2 = beat2Ref.current;
        if (beat2) {
          if (progress < 0.43 || progress > 0.75) {
            beat2.style.opacity = "0";
            beat2.style.visibility = "hidden";
            beat2.style.transform = "translate3d(40px, 0, 0)";
          } else if (progress >= 0.43 && progress < 0.52) {
            // Enter smoothly from right
            const t = clamp((progress - 0.43) / 0.09);
            const x = 40 * (1 - t);
            beat2.style.visibility = "visible";
            beat2.style.opacity = `${t.toFixed(3)}`;
            beat2.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;
            beat2.style.filter = t < 0.8 ? `blur(${(3 * (1 - t)).toFixed(1)}px)` : "none";
          } else if (progress >= 0.52 && progress <= 0.65) {
            // Hold completely stable and readable
            beat2.style.visibility = "visible";
            beat2.style.opacity = "1";
            beat2.style.transform = "translate3d(0, 0, 0)";
            beat2.style.filter = "none";
          } else {
            // Softly drift upward and fade out
            const t = clamp((progress - 0.65) / 0.1);
            const y = -24 * t;
            const op = Math.max(0, 1 - t);
            beat2.style.visibility = op <= 0.01 ? "hidden" : "visible";
            beat2.style.opacity = `${op.toFixed(3)}`;
            beat2.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
            beat2.style.filter = t > 0.3 ? `blur(${(3 * t).toFixed(1)}px)` : "none";
          }
        }

        // ----------------------------------------------------
        // STATE 2: FINAL HERO MESSAGE (~80% to 100% scroll)
        // ----------------------------------------------------
        const finalState = finalStateRef.current;
        if (finalState) {
          // Reveal starts around 0.80 when construction sequence culminates
          if (progress < 0.79) {
            finalState.style.opacity = "0";
            finalState.style.visibility = "hidden";
            finalState.style.pointerEvents = "none";
          } else if (progress <= 0.88) {
            finalState.style.visibility = "visible";
            finalState.style.opacity = "1";

            // Tag reveal: 0.79 -> 0.83
            if (finalTagRef.current) {
              const tTag = clamp((progress - 0.79) / 0.04);
              const yTag = 14 * (1 - tTag);
              finalTagRef.current.style.opacity = `${tTag.toFixed(3)}`;
              finalTagRef.current.style.transform = `translate3d(0, ${yTag.toFixed(2)}px, 0)`;
            }

            // Line 1 reveal ("WAS BLEIBT,"): 0.80 -> 0.845
            if (finalLine1Ref.current) {
              const t1 = clamp((progress - 0.8) / 0.045);
              const y1 = 26 * (1 - t1);
              finalLine1Ref.current.style.opacity = `${t1.toFixed(3)}`;
              finalLine1Ref.current.style.transform = `translate3d(0, ${y1.toFixed(2)}px, 0)`;
            }

            // Line 2 reveal ("BEGINNT HIER."): 0.815 -> 0.86
            if (finalLine2Ref.current) {
              const t2 = clamp((progress - 0.815) / 0.045);
              const y2 = 26 * (1 - t2);
              finalLine2Ref.current.style.opacity = `${t2.toFixed(3)}`;
              finalLine2Ref.current.style.transform = `translate3d(0, ${y2.toFixed(2)}px, 0)`;
            }

            // Subtext reveal: 0.83 -> 0.87
            if (finalSubtextRef.current) {
              const tSub = clamp((progress - 0.83) / 0.04);
              const ySub = 16 * (1 - tSub);
              finalSubtextRef.current.style.opacity = `${tSub.toFixed(3)}`;
              finalSubtextRef.current.style.transform = `translate3d(0, ${ySub.toFixed(2)}px, 0)`;
            }

            // CTA reveal: 0.845 -> 0.88
            if (finalCtaRef.current) {
              const tCta = clamp((progress - 0.845) / 0.035);
              const yCta = 18 * (1 - tCta);
              finalCtaRef.current.style.opacity = `${tCta.toFixed(3)}`;
              finalCtaRef.current.style.transform = `translate3d(0, ${yCta.toFixed(2)}px, 0)`;
              finalCtaRef.current.style.pointerEvents = tCta > 0.6 ? "auto" : "none";
            }
          } else {
            // Held fully visible and stable from 0.88 to 1.00
            finalState.style.visibility = "visible";
            finalState.style.opacity = "1";
            finalState.style.pointerEvents = "auto";

            const elements = [
              finalTagRef.current,
              finalLine1Ref.current,
              finalLine2Ref.current,
              finalSubtextRef.current,
              finalCtaRef.current,
            ];
            for (const el of elements) {
              if (el) {
                el.style.opacity = "1";
                el.style.transform = "translate3d(0, 0, 0)";
              }
            }
            if (finalCtaRef.current) {
              finalCtaRef.current.style.pointerEvents = "auto";
            }
          }
        }
      },
    }));

    return (
      <div className="absolute inset-0 pointer-events-none z-10 select-none overflow-hidden">
        {/* Subtle architectural vignette for contrast without obscuring footage */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12]/75 via-transparent to-[#0b0d12]/45 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(11,13,18,0.45)_100%)] pointer-events-none" />

        {/* ======================================================= */}
        {/* STATE 1: CENTERED HERO INTRO (Active at 0% scroll)     */}
        {/* ======================================================= */}
        <div className="absolute inset-0 flex items-center justify-center pt-8 sm:pt-10 pointer-events-none">
          <div
            ref={groupRef}
            className={`relative flex flex-col items-center text-center px-6 max-w-[560px] mx-auto pointer-events-auto will-change-transform ${
              !hasScrolledRef.current
                ? "transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)]"
                : ""
            }`}
            style={{
              opacity: isReducedMotion ? 0 : isLoaded ? 1 : 0,
              transform: isReducedMotion
                ? "none"
                : isLoaded
                ? "translate3d(0, 0px, 0)"
                : "translate3d(0, 20px, 0)",
              visibility: isReducedMotion ? "hidden" : "visible",
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
                opacity: isReducedMotion ? 0 : isLoaded ? 1 : 0,
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

        {/* ======================================================= */}
        {/* STORY MILESTONE 1: LEFT ALIGNED & VERTICALLY CENTERED   */}
        {/* ======================================================= */}
        <div className="absolute top-1/2 -translate-y-1/2 left-[6vw] sm:left-[8vw] pointer-events-none">
          <div
            ref={beat1Ref}
            className="max-w-[560px] will-change-transform"
            style={{
              opacity: 0,
              visibility: "hidden",
              transform: "translate3d(-40px, 0, 0)",
            }}
          >
            <h2 className="text-[clamp(1.9rem,4.2vw,3.8rem)] font-extrabold uppercase tracking-tight text-white leading-[0.96] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
              PRÄZISION VOM<br />
              <span className="text-white/95">ERSTEN SPATENSTICH.</span>
            </h2>
          </div>
        </div>

        {/* ======================================================= */}
        {/* STORY MILESTONE 2: RIGHT ALIGNED & VERTICALLY CENTERED  */}
        {/* ======================================================= */}
        <div className="absolute top-1/2 -translate-y-1/2 right-[6vw] sm:right-[8vw] pointer-events-none">
          <div
            ref={beat2Ref}
            className="max-w-[560px] text-right will-change-transform flex flex-col items-end"
            style={{
              opacity: 0,
              visibility: "hidden",
              transform: "translate3d(40px, 0, 0)",
            }}
          >
            <h2 className="text-[clamp(1.9rem,4.2vw,3.8rem)] font-extrabold uppercase tracking-tight text-white leading-[0.96] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
              MASSIVBAU FÜR<br />
              <span className="text-white/95">GENERATIONEN.</span>
            </h2>
          </div>
        </div>

        {/* ======================================================= */}
        {/* STATE 2: FINAL HERO MESSAGE (80% to 100% scroll)        */}
        {/* ======================================================= */}
        <div
          ref={finalStateRef}
          className="absolute top-1/2 -translate-y-1/2 sm:top-[18vh] sm:translate-y-0 left-[6vw] sm:left-[8vw] right-[6vw] sm:right-[8vw] max-w-[960px] pointer-events-none flex flex-col items-start"
          style={{
            opacity: isReducedMotion ? 1 : 0,
            visibility: isReducedMotion ? "visible" : "hidden",
            pointerEvents: isReducedMotion ? "auto" : "none",
          }}
        >
          {/* Eyebrow Tag */}
          <div
            ref={finalTagRef}
            className="flex items-center gap-2.5 mb-3 sm:mb-4 will-change-transform"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E52423]" />
            <p className="text-[11px] sm:text-[13px] font-mono uppercase tracking-[0.18em] font-semibold text-white/80">
              VOLLENDUNG • LATHEN
            </p>
          </div>

          {/* Line-by-Line Architectural Headline */}
          <h2 className="text-[clamp(2.8rem,6.2vw,5.5rem)] font-extrabold uppercase tracking-tight text-white leading-[0.92] max-w-[900px] mb-4 sm:mb-5">
            <span className="block overflow-hidden">
              <span ref={finalLine1Ref} className="block will-change-transform">
                WAS BLEIBT,
              </span>
            </span>
            <span className="block overflow-hidden">
              <span ref={finalLine2Ref} className="block text-white/95 will-change-transform">
                BEGINNT HIER.
              </span>
            </span>
          </h2>

          {/* Subtext */}
          <p
            ref={finalSubtextRef}
            className="text-sm sm:text-base text-white/75 font-light tracking-wide max-w-md leading-relaxed mb-8 sm:mb-10 will-change-transform"
          >
            Pieper Bauunternehmen
            <br />
            Bauen mit Erfahrung. Für die Zukunft.
          </p>

          {/* Rectangular Premium CTAs */}
          <div
            ref={finalCtaRef}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto will-change-transform pointer-events-none"
          >
            <a
              href="#kontakt"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#E52423] text-white font-medium text-xs sm:text-sm tracking-[0.16em] uppercase transition-all duration-300 hover:bg-[#c91b1a] hover:shadow-[0_0_20px_rgba(229,36,35,0.35)]"
            >
              <span>PROJEKT ANFRAGEN</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="#ueber-uns"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 border border-white/30 bg-white/5 backdrop-blur-md text-white font-medium text-xs sm:text-sm tracking-[0.16em] uppercase transition-all duration-300 hover:border-white hover:bg-white/10"
            >
              <span>PROJEKTE ENTDECKEN</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/60 transition-transform duration-300 group-hover:scale-150 group-hover:bg-white" />
            </a>
          </div>
        </div>
      </div>
    );
  }
);

HeroOverlay.displayName = "HeroOverlay";
