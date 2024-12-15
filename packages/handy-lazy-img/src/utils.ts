/**
 * Generates a tiny base64-encoded 1x1 pixel image for blur placeholder
 * @param color - Optional color in hex format (e.g., '#cccccc'). Defaults to neutral gray.
 * @returns Data URL string suitable for img src attribute
 */
export function generateBlurDataUrl(color = '#cccccc'): string {
  // Convert hex color to RGB values
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Create a 1x1 pixel SVG with the specified color
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"><rect width="1" height="1" fill="rgb(${r},${g},${b})"/></svg>`;

  // Convert to base64 data URL
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Combines multiple class names into a single space-separated string
 * Filters out undefined, null, and empty string values
 * @param classes - Array of class name strings or undefined values
 * @returns Single space-separated class name string
 */
export function joinClassNames(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Image source definition for responsive images (srcset)
 */
export interface ImageSource {
  src: string;
  width: number;
}

/**
 * Generates proper srcset attribute string from array of image sources
 * @param sources - Array of {src, width} objects
 * @returns Formatted srcset string (e.g., "image-300w.jpg 300w, image-600w.jpg 600w")
 */
export function getSrcSet(sources: ImageSource[]): string {
  return sources.map(source => `${source.src} ${source.width}w`).join(', ');
}

/**
 * Calculates image dimensions to prevent layout shift
 * @param width - Optional explicit width
 * @param height - Optional explicit height
 * @param aspectRatio - Optional aspect ratio (width/height)
 * @returns Object with width, height, and paddingBottom for aspect ratio box
 */
export function getImageDimensions(
  width?: number,
  height?: number,
  aspectRatio?: number
): {width?: number; height?: number; paddingBottom?: string} {
  // If both width and height are provided, use them directly
  if (width && height) {
    return {width, height};
  }

  // If aspect ratio is provided, calculate padding-bottom for aspect ratio box
  if (aspectRatio) {
    const paddingBottom = `${(1 / aspectRatio) * 100}%`;
    return {paddingBottom};
  }

  // If only width is provided with height, calculate based on that
  if (width && height) {
    return {width, height};
  }

  return {};
}

/**
 * Preloads an image programmatically to verify it can be loaded
 * @param src - Image source URL
 * @param srcSet - Optional srcset attribute for responsive images
 * @returns Promise that resolves with the loaded HTMLImageElement or rejects on error
 */
export function preloadImage(src: string, srcSet?: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));

    if (srcSet) {
      img.srcset = srcSet;
    }
    img.src = src;
  });
}
