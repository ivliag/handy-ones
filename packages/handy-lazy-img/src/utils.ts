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
