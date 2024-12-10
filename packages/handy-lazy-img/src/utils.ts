/**
 * Generates a tiny base64-encoded 1x1 pixel image for blur placeholder
 * @param color - Optional color in hex format (e.g., '#cccccc'). Defaults to neutral gray.
 * @returns Data URL string suitable for img src attribute
 */
export function generateBlurDataUrl(color: string = '#cccccc'): string {
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
