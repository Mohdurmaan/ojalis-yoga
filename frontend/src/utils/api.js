export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '');
export const API_BASE_URL = API_URL;
export const BASE_URL = API_URL.replace(/\/api$/, '');

export const fetchPublic = async (endpoint) => {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!res.ok) throw new Error('API Error');
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Robust image URL resolver:
 * - Direct CDN / Cloudinary / Unsplash URLs are returned intact.
 * - Stored /uploads/ or uploads/ paths (or legacy localhost/old domain upload URLs) are mapped to current backend BASE_URL.
 * - Root/relative frontend public assets (e.g. /logo.png, acharya_ananya.jpg) remain on frontend origin.
 */
export const getImageUrl = (path) => {
  if (!path || typeof path !== 'string') return '';
  const trimmed = path.trim();
  if (!trimmed) return '';

  // 1. Direct external CDN / Cloudinary / Unsplash URLs
  if (
    trimmed.startsWith('https://res.cloudinary.com') ||
    trimmed.includes('cloudinary.com') ||
    trimmed.includes('images.unsplash.com')
  ) {
    return trimmed;
  }

  // 2. Normalize Windows backslashes
  const normalized = trimmed.replace(/\\/g, '/');

  // 3. Any uploaded image path (relative or containing legacy localhost / old backend domain)
  if (normalized.includes('uploads/')) {
    const filename = normalized.split('uploads/').pop().replace(/^\/+/, '');
    return `${BASE_URL}/uploads/${filename}`;
  }

  // 4. If it's already an absolute URL (and not pointing to localhost / 127.0.0.1)
  if (normalized.startsWith('http://') || normalized.startsWith('https://')) {
    if (normalized.includes('localhost:') || normalized.includes('127.0.0.1:')) {
      const pathname = new URL(normalized).pathname;
      return `${BASE_URL}${pathname}`;
    }
    return normalized;
  }

  // 5. Frontend public assets (e.g. /logo.png, acharya_ananya.jpg)
  if (normalized.startsWith('/')) {
    return normalized;
  }
  return `/${normalized}`;
};
