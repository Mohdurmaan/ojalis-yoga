const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '');

export const getToken = () => localStorage.getItem('admin_token');
export const setToken = (token) => localStorage.setItem('admin_token', token);
export const removeToken = () => localStorage.removeItem('admin_token');

export const apiFetch = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = { ...options.headers };

  if (token) headers.Authorization = `Bearer ${token}`;

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      removeToken();
      window.location.href = '/admin/login';
    }
    throw new Error(data.message || 'API request failed');
  }

  return data;
};
