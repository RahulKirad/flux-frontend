import { API_URL } from '../config/api';

/** Resolve /uploads/... paths to the API host (local or production). */
export function resolveMediaUrl(path?: string | null): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('blob:')) {
    return path;
  }
  if (path.startsWith('/uploads') && API_URL) {
    return `${API_URL}${path}`;
  }
  return path;
}
