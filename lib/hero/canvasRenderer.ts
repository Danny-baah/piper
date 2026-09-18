/**
 * High-performance Canvas Cover Renderer
 * Computes exact object-fit: cover source cropping and draws to Canvas with devicePixelRatio awareness.
 */

export interface RenderCropMetrics {
  sx: number;
  sy: number;
  sWidth: number;
  sHeight: number;
  dx: number;
  dy: number;
  dWidth: number;
  dHeight: number;
}

export function calculateCoverCrop(
  imageWidth: number,
  imageHeight: number,
  canvasWidth: number,
  canvasHeight: number
): RenderCropMetrics {
  const imageAspect = imageWidth / imageHeight;
  const canvasAspect = canvasWidth / canvasHeight;

  let sWidth = imageWidth;
  let sHeight = imageHeight;
  let sx = 0;
  let sy = 0;

  if (canvasAspect > imageAspect) {
    // Canvas is wider than image: crop top and bottom
    sHeight = imageWidth / canvasAspect;
    sy = (imageHeight - sHeight) / 2;
  } else {
    // Canvas is taller than image: crop left and right
    sWidth = imageHeight * canvasAspect;
    sx = (imageWidth - sWidth) / 2;
  }

  return {
    sx,
    sy,
    sWidth,
    sHeight,
    dx: 0,
    dy: 0,
    dWidth: canvasWidth,
    dHeight: canvasHeight,
  };
}

export function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number
): void {
  if (!img.complete || img.naturalWidth === 0) return;

  const crop = calculateCoverCrop(img.naturalWidth, img.naturalHeight, canvasWidth, canvasHeight);
  ctx.drawImage(
    img,
    crop.sx,
    crop.sy,
    crop.sWidth,
    crop.sHeight,
    crop.dx,
    crop.dy,
    crop.dWidth,
    crop.dHeight
  );
}
