"use client";

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { drawCoverImage } from "@/lib/hero/canvasRenderer";
import { HeroFrameSequence } from "@/lib/hero/frameLoader";

export interface HeroCanvasHandle {
  drawFrame: (frameIndex: number) => void;
  resize: () => void;
}

interface HeroCanvasProps {
  sequence: HeroFrameSequence;
  isReducedMotion?: boolean;
}

export const HeroCanvas = forwardRef<HeroCanvasHandle, HeroCanvasProps>(
  ({ sequence, isReducedMotion }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const lastDrawnFrameRef = useRef<number>(-1);

    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Set display dimensions
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Set actual render resolution
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      // Re-draw current frame
      if (lastDrawnFrameRef.current >= 0) {
        renderFrame(lastDrawnFrameRef.current);
      }
    };

    const renderFrame = (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const img = sequence.getFrame(frameIndex);
      if (img) {
        drawCoverImage(ctx, img, canvas.width, canvas.height);
        lastDrawnFrameRef.current = frameIndex;
      }
    };

    useImperativeHandle(ref, () => ({
      drawFrame: (frameIndex: number) => {
        renderFrame(frameIndex);
      },
      resize: () => {
        resizeCanvas();
      },
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      // Eagerly load Frame 0 and render immediately (0ms perceived delay)
      sequence.loadFirstFrame().then(() => {
        const initialFrame = isReducedMotion ? 119 : 0;
        renderFrame(initialFrame);
      });

      return () => {
        window.removeEventListener("resize", resizeCanvas);
      };
    }, [sequence, isReducedMotion]);

    return (
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        aria-hidden="true"
      />
    );
  }
);

HeroCanvas.displayName = "HeroCanvas";
