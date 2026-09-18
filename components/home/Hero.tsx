"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { HeroCanvas, HeroCanvasHandle } from "./HeroCanvas";
import { HeroOverlay, HeroOverlayHandle } from "./HeroOverlay";
import { HeroFrameSequence, TOTAL_HERO_FRAMES } from "@/lib/hero/frameLoader";
import { HeroScrollController } from "@/lib/hero/heroScroll";

interface HeroProps {
  onScrollProgress?: (progress: number) => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollProgress }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HeroCanvasHandle | null>(null);
  const overlayRef = useRef<HeroOverlayHandle | null>(null);

  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Single persistent sequence instance
  const sequence = useMemo(() => new HeroFrameSequence(), []);

  useEffect(() => {
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);
    return () => mediaQuery.removeEventListener("change", handleMotionChange);
  }, []);

  useEffect(() => {
    if (isReducedMotion) {
      // For reduced motion: render final completed frame statically
      sequence.loadFirstFrame().then(() => {
        canvasRef.current?.drawFrame(TOTAL_HERO_FRAMES - 1);
      });
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // Start background progressive preload of frames
    sequence.loadFirstFrame().then(() => {
      sequence.startProgressivePreload();
    });

    const scrollController = new HeroScrollController({
      container,
      totalFrames: TOTAL_HERO_FRAMES,
      lerpFactor: 0.12,
      onFrameUpdate: (_rawFrameIndex, progress) => {
        // Critical requirement 11:
        // Video completes around ~86% of the scroll.
        // The remaining 14% is dedicated to holding the final architectural reveal.
        const frameProgress = Math.min(1, progress / 0.86);
        const mappedFrameIndex = Math.min(
          TOTAL_HERO_FRAMES - 1,
          Math.round(frameProgress * (TOTAL_HERO_FRAMES - 1))
        );

        canvasRef.current?.drawFrame(mappedFrameIndex);
        overlayRef.current?.updateProgress(progress);
      },
      onProgressUpdate: (progress) => {
        onScrollProgress?.(progress);
      },
    });

    scrollController.init();

    // IntersectionObserver to pause rAF loop when hero container is completely out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        scrollController.setVisible(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      scrollController.destroy();
    };
  }, [containerRef, sequence, isReducedMotion, onScrollProgress]);

  if (isReducedMotion) {
    return (
      <section className="relative w-full min-h-screen bg-[#0b0d12] overflow-hidden">
        <HeroCanvas ref={canvasRef} sequence={sequence} isReducedMotion={true} />
        <HeroOverlay ref={overlayRef} isReducedMotion={true} />
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[450vh] bg-[#0b0d12]"
      aria-label="Cinematic Construction Journey"
    >
      {/* Pinned Sticky Viewport: stays fixed while user scrolls through 450vh */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <HeroCanvas ref={canvasRef} sequence={sequence} />
        <HeroOverlay ref={overlayRef} />
      </div>
    </section>
  );
};
