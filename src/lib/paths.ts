// src/lib/paths.ts
// Handles path generation for both GitHub Pages subpath deployment (/DevWaymark/)
// and root domain deployments (e.g., Vercel / custom domains).

const rawBase = import.meta.env.BASE_URL || '/';
export const BASE_URL = rawBase.endsWith('/') ? rawBase.slice(0, -1) : rawBase;

/**
 * Prepends the base path to a relative URL for GitHub Pages compatibility.
 * Example: url('/roadmaps') -> '/DevWaymark/roadmaps'
 * Example: url('/') -> '/DevWaymark/'
 */
export function url(path: string = '/'): string {
  if (!path || path === '/') {
    return BASE_URL ? `${BASE_URL}/` : '/';
  }

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${cleanPath}`;
}
