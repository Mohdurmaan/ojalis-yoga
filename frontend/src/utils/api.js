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

export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  if (path.startsWith('/uploads')) return `${BASE_URL}${path}`;
  if (path.startsWith('uploads/')) return `${BASE_URL}/${path}`;
  if (!path.startsWith('/')) return `/${path}`;
  return path;
};

