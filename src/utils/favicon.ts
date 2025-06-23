/**
 * Utility functions for favicon handling
 */

/**
 * Extract domain from a URL
 */
export function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    // If URL parsing fails, try to extract domain manually
    const match = url.match(/^(?:https?:\/\/)?(?:www\.)?([^\/\?]+)/i);
    return match ? match[1] : url;
  }
}

/**
 * Generate Google Favicon API URL
 */
export function getFaviconUrl(url: string, size: number = 32): string {
  const domain = extractDomain(url);
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
}

/**
 * Generate fallback favicon URL directly from domain
 */
export function getFallbackFaviconUrl(url: string): string {
  const domain = extractDomain(url);
  return `https://${domain}/favicon.ico`;
}
