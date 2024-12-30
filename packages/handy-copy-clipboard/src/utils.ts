/**
 * Copy text to clipboard using modern Clipboard API with fallback to legacy execCommand
 */
export async function copyToClipboard(text: string): Promise<void> {
  // Try modern Clipboard API first
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch (err) {
      // Fall through to legacy method
    }
  }

  // Fallback to legacy execCommand method
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    if (!successful) {
      throw new Error('Copy command was unsuccessful');
    }
  } finally {
    document.body.removeChild(textArea);
  }
}

/**
 * Joins multiple class names together, filtering out undefined/null/false values
 */
export function joinClassNames(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
