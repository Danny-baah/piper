/**
 * Physics-based Scroll Interpolator for Pieper Hero
 * Uses lerp factor 0.12 for fluid, organic motion isolated from React render loops.
 */

export interface ScrollControllerOptions {
  container: HTMLElement;
  totalFrames: number;
  lerpFactor?: number;
  onFrameUpdate: (frameIndex: number, progress: number) => void;
  onProgressUpdate?: (progress: number, target: number) => void;
}

export class HeroScrollController {
  private container: HTMLElement;
  private totalFrames: number;
  private lerpFactor: number;
  private onFrameUpdate: (frameIndex: number, progress: number) => void;
  private onProgressUpdate?: (progress: number, target: number) => void;

  private targetProgress = 0;
  private currentProgress = 0;
  private currentFrameIndex = -1;
  private rafId: number | null = null;
  private isRunning = false;
  private isHeroVisible = true;

  constructor(options: ScrollControllerOptions) {
    this.container = options.container;
    this.totalFrames = options.totalFrames;
    this.lerpFactor = options.lerpFactor ?? 0.12;
    this.onFrameUpdate = options.onFrameUpdate;
    this.onProgressUpdate = options.onProgressUpdate;

    this.handleScroll = this.handleScroll.bind(this);
    this.tick = this.tick.bind(this);
  }

  public init(): void {
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    window.addEventListener("resize", this.handleScroll, { passive: true });
    this.calculateTargetProgress();
    this.currentProgress = this.targetProgress;
    this.startLoop();
  }

  public destroy(): void {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleScroll);
    this.stopLoop();
  }

  public setVisible(visible: boolean): void {
    this.isHeroVisible = visible;
    if (visible && !this.isRunning) {
      this.startLoop();
    }
  }

  private handleScroll(): void {
    this.calculateTargetProgress();
    if (!this.isRunning && this.isHeroVisible) {
      this.startLoop();
    }
  }

  private calculateTargetProgress(): void {
    const rect = this.container.getBoundingClientRect();
    const maxScroll = this.container.offsetHeight - window.innerHeight;
    if (maxScroll <= 0) {
      this.targetProgress = 0;
      return;
    }

    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / maxScroll));
    this.targetProgress = progress;
  }

  private startLoop(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.rafId = requestAnimationFrame(this.tick);
  }

  private stopLoop(): void {
    this.isRunning = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private tick(): void {
    const diff = this.targetProgress - this.currentProgress;

    // Physics interpolation step as specified:
    // currentProgress += (targetProgress - currentProgress) * 0.12
    if (Math.abs(diff) < 0.0001) {
      this.currentProgress = this.targetProgress;
    } else {
      this.currentProgress += diff * this.lerpFactor;
    }

    // Frame index calculation
    const nextFrameIndex = Math.round(this.currentProgress * (this.totalFrames - 1));

    if (nextFrameIndex !== this.currentFrameIndex) {
      this.currentFrameIndex = nextFrameIndex;
      this.onFrameUpdate(this.currentFrameIndex, this.currentProgress);
    }

    this.onProgressUpdate?.(this.currentProgress, this.targetProgress);

    // Keep loop active while interpolating or if scrolling
    if (Math.abs(diff) >= 0.0001) {
      this.rafId = requestAnimationFrame(this.tick);
    } else {
      this.isRunning = false;
      this.rafId = null;
    }
  }

  public getCurrentProgress(): number {
    return this.currentProgress;
  }

  public getTargetProgress(): number {
    return this.targetProgress;
  }
}
