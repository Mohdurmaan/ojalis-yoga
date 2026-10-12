const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '');

export const getUserToken = () => localStorage.getItem('ojalis_user_token');
export const setUserToken = (token) => localStorage.setItem('ojalis_user_token', token);
export const removeUserToken = () => localStorage.removeItem('ojalis_user_token');

export const userApiFetch = async (endpoint, options = {}) => {
  const token = getUserToken();
  const headers = { ...options.headers };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401) {
      removeUserToken();
    }
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
};

export { API_BASE_URL };
