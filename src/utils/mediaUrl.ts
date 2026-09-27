const apiRoot = import.meta.env.VITE_API_URL?.replace(/\/$/, '') ?? '';

/** Resolve /uploads/... paths to the API host in production (Vercel + separate API). */
export function resolveMediaUrl(path?: string | null): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('blob:')) {
    return path;
  }
  if (path.startsWith('/uploads') && apiRoot) {
    return `${apiRoot}${path}`;
  }
  return path;
}
