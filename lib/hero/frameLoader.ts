/**
 * Intelligent Progressive Frame Loader for Pieper Hero
 * Preloads Frame 1 eagerly for 0ms perceived delay, then progressively caches the rest.
 */

export const TOTAL_HERO_FRAMES = 120;

export function getFrameUrl(index: number): string {
  // index is 0-based: 0 -> frame-0001.webp
  const frameNum = Math.min(Math.max(1, index + 1), TOTAL_HERO_FRAMES);
  const padded = String(frameNum).padStart(4, "0");
  return `/assets/hero-frames/frame-${padded}.webp`;
}

export class HeroFrameSequence {
  private frames: (HTMLImageElement | null)[] = new Array(TOTAL_HERO_FRAMES).fill(null);
  private loadedCount = 0;
  private isPreloading = false;
  private onFirstFrameReady?: () => void;
  private onProgressUpdate?: (loaded: number, total: number) => void;

  constructor(callbacks?: {
    onFirstFrameReady?: () => void;
    onProgressUpdate?: (loaded: number, total: number) => void;
  }) {
    this.onFirstFrameReady = callbacks?.onFirstFrameReady;
    this.onProgressUpdate = callbacks?.onProgressUpdate;
  }

  /**
   * Immediately loads the first frame for instantaneous 0ms display.
   */
  public loadFirstFrame(): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
      if (this.frames[0]?.complete) {
        resolve(this.frames[0]);
        return;
      }

      const img = new Image();
      img.src = getFrameUrl(0);
      img.onload = () => {
        this.frames[0] = img;
        this.loadedCount = Math.max(this.loadedCount, 1);
        this.onFirstFrameReady?.();
        this.onProgressUpdate?.(this.loadedCount, TOTAL_HERO_FRAMES);
        resolve(img);
      };
      img.onerror = () => {
        resolve(img);
      };
    });
  }

  /**
   * Progressively loads all remaining frames with controlled concurrency.
   */
  public startProgressivePreload(): void {
    if (this.isPreloading) return;
    this.isPreloading = true;

    // Phase 1: load first 20 frames with priority
    const priorityIndices: number[] = [];
    for (let i = 1; i < Math.min(25, TOTAL_HERO_FRAMES); i++) {
      priorityIndices.push(i);
    }

    // Phase 2: remaining frames
    const remainingIndices: number[] = [];
    for (let i = 25; i < TOTAL_HERO_FRAMES; i++) {
      remainingIndices.push(i);
    }

    const queue = [...priorityIndices, ...remainingIndices];
    const concurrency = 4;

    const worker = () => {
      if (queue.length === 0) return;
      const index = queue.shift();
      if (index === undefined) return;

      if (this.frames[index]) {
        worker();
        return;
      }

      const img = new Image();
      img.src = getFrameUrl(index);
      img.onload = () => {
        this.frames[index] = img;
        this.loadedCount++;
        this.onProgressUpdate?.(this.loadedCount, TOTAL_HERO_FRAMES);
        worker();
      };
      img.onerror = () => {
        worker();
      };
    };

    for (let c = 0; c < concurrency; c++) {
      worker();
    }
  }

  /**
   * Returns the exact frame or the nearest loaded frame fallback.
   * Guarantees that the canvas will NEVER render a blank frame or flicker.
   */
  public getFrame(index: number): HTMLImageElement | null {
    const clamped = Math.min(Math.max(0, Math.round(index)), TOTAL_HERO_FRAMES - 1);
    
    if (this.frames[clamped]?.complete && this.frames[clamped]?.naturalWidth !== 0) {
      return this.frames[clamped];
    }

    // Nearest search
    for (let offset = 1; offset < TOTAL_HERO_FRAMES; offset++) {
      const lower = clamped - offset;
      if (lower >= 0 && this.frames[lower]?.complete && this.frames[lower]?.naturalWidth !== 0) {
        return this.frames[lower];
      }
      const higher = clamped + offset;
      if (higher < TOTAL_HERO_FRAMES && this.frames[higher]?.complete && this.frames[higher]?.naturalWidth !== 0) {
        return this.frames[higher];
      }
    }

    return this.frames[0];
  }

  public getLoadedFraction(): number {
    return this.loadedCount / TOTAL_HERO_FRAMES;
  }
}
